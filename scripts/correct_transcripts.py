"""
correct_transcripts.py — 用官方提取的 transcript 修正 sections.ts

策略：
1. 加载 official_transcripts.json（官方 PDF 提取的结果）
2. 加载 sections.ts 当前 transcript
3. 逐 section 对比，替换不一致的
4. 特别处理：
   - 2021-12-S3 占位符 → 用 2021-12-S2 的对应 transcript
   - 同一年份不同 set 共用同一音频时，transcript 应一致
5. 备份原文件
"""
import json
import re
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).parent.parent
OFFICIAL_PATH = ROOT / 'scripts' / 'official_transcripts.json'
SECTIONS_PATH = ROOT / 'src' / 'data' / 'sections.ts'
AUDIO_DIR = ROOT / 'public' / 'audio'
CALIB_PATH = ROOT / 'audio-calibration-v2.json'


def load_official_transcripts():
    """Load verified transcripts from PDF extraction."""
    if not OFFICIAL_PATH.exists():
        print(f'WARNING: {OFFICIAL_PATH} not found')
        return {}
    return json.loads(OFFICIAL_PATH.read_text(encoding='utf-8'))


def get_audio_mapping():
    """Determine which audio file each set uses.
    Returns: {(year, month, set): audio_key}
    """
    mapping = {}
    for year_dir in AUDIO_DIR.iterdir():
        if not year_dir.is_file():
            continue
        name = year_dir.stem  # e.g. "2024-06-S1"
        parts = name.split('-')
        if len(parts) != 3:
            continue
        year, month, s = int(parts[0]), int(parts[1]), parts[2]
        # S1 file serves both Set 1 and Set 3
        if s == 'S1':
            mapping[(year, month, 1)] = name
            mapping[(year, month, 3)] = name
        elif s == 'S2':
            mapping[(year, month, 2)] = name
    return mapping


def parse_sections_with_positions():
    """Parse sections.ts and return sections with their text positions."""
    content = SECTIONS_PATH.read_text(encoding='utf-8')

    # Match both formats
    pattern = re.compile(
        r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
        r"year:\s*(\d{4}),\s*"
        r"month:\s*(\d+),\s*"
        r"setNumber:\s*(\d+),\s*"
        r"label:\s*'[^']+',\s*"
        r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
        r"(transcript:\s*`(?:[^`]|\n)*?`)",
        re.MULTILINE
    )

    sections = []
    for m in pattern.finditer(content):
        transcript_match = m.group(5)  # "transcript: `...`"
        transcript_start = m.start(5)
        transcript_end = m.end(5)

        # Extract just the text content from transcript: `...`
        inner_match = re.search(r"transcript:\s*`((?:[^`]|\n)*?)`", transcript_match, re.DOTALL)
        current_text = inner_match.group(1) if inner_match else ''

        sections.append({
            'id': m.group(1),
            'year': int(m.group(2)),
            'month': int(m.group(3)),
            'setNumber': int(m.group(4)),
            'transcript_start': transcript_start,
            'transcript_end': transcript_end,
            'current_text': current_text,
        })

    return sections, content


def normalize_for_compare(text):
    """Normalize text for comparison - strip whitespace and punctuation."""
    text = re.sub(r'\s+', ' ', text).strip()
    text = re.sub(r'[^\w\s]', '', text.lower())
    return text


def main():
    official = load_official_transcripts()
    print(f'官方提取: {len(official)} 篇 transcript')

    audio_map = get_audio_mapping()
    sections, content = parse_sections_with_positions()
    print(f'sections.ts: {len(sections)} 个 section')

    # Track changes
    updated_from_official = 0
    updated_placeholder = 0
    updated_cross_set = 0
    unchanged = 0
    missing_official = 0

    # Build a lookup: {section_id: official_transcript}
    # Also map by (year, month, set, sec_key) for cross-referencing
    sec_key_pattern = re.compile(r'Sec([ABC])-(\d)')

    # First pass: update from official
    replacements = []  # (start, end, new_transcript)

    for sec in sections:
        sid = sec['id']
        official_text = official.get(sid)

        if official_text:
            # Compare normalized versions
            if normalize_for_compare(official_text) != normalize_for_compare(sec['current_text']):
                new_transcript = f"transcript: `{official_text}`"
                replacements.append((sec['transcript_start'], sec['transcript_end'], new_transcript))
                updated_from_official += 1
                print(f'  UPDATE {sid}: official text differs')
            else:
                unchanged += 1
        else:
            missing_official += 1

    # Second pass: handle placeholders and cross-set consistency
    # For sections where audio is shared, copy transcript from the set that has official data
    for sec in sections:
        sid = sec['id']
        if sid in official:
            continue  # Already handled

        # Check if this is a placeholder
        is_placeholder = 'placeholder' in sec['current_text'].lower() or \
                        'to be verified' in sec['current_text'].lower() or \
                        sec['current_text'].startswith('[Transcript same as')

        # Find sections that share the same audio
        audio_key = audio_map.get((sec['year'], sec['month'], sec['setNumber']))
        if not audio_key:
            continue

        # Find which set has the official transcript for this audio
        m = re.match(r'(\d{4}-\d{2})-S(\d)', audio_key)
        if not m:
            continue
        base_key = m.group(1)
        s_num = m.group(2)

        # S1 audio may have Set 1 or Set 3 as source
        source_sets = [1, 3] if s_num == '1' else [2]

        # Extract section letter and number
        sm = sec_key_pattern.search(sid)
        if not sm:
            continue
        sec_part = sm.group(0)  # e.g., "SecA-1"

        # Look for this section in a source set that has official transcript
        for src_set in source_sets:
            src_id = f'{sec["year"]}-{sec["month"]:02d}-S{src_set}-{sec_part}'
            src_official = official.get(src_id)
            if src_official:
                if normalize_for_compare(src_official) != normalize_for_compare(sec['current_text']):
                    new_transcript = f"transcript: `{src_official}`"
                    replacements.append((sec['transcript_start'], sec['transcript_end'], new_transcript))
                    if is_placeholder:
                        updated_placeholder += 1
                        print(f'  FIX PLACEHOLDER {sid} <- {src_id}')
                    else:
                        updated_cross_set += 1
                        print(f'  SYNC {sid} <- {src_id}')
                else:
                    unchanged += 1
                break

    # Apply replacements (in reverse order to preserve positions)
    replacements.sort(key=lambda x: x[0], reverse=True)
    new_content = content
    for start, end, new_text in replacements:
        new_content = new_content[:start] + new_text + new_content[end:]

    # Write back
    if replacements:
        # Backup
        backup_path = SECTIONS_PATH.with_suffix('.ts.bak2')
        backup_path.write_text(content, encoding='utf-8')
        print(f'\nBackup saved: {backup_path}')

        SECTIONS_PATH.write_text(new_content, encoding='utf-8')
        print(f'Updated: {SECTIONS_PATH}')
    else:
        print('\nNo changes needed!')

    # Summary
    print(f'\n{"=" * 60}')
    print(f'修正报告:')
    print(f'  从官方 PDF 直接修正: {updated_from_official}')
    print(f'  修复占位符 transcript: {updated_placeholder}')
    print(f'  跨 set 同步 (共用音频): {updated_cross_set}')
    print(f'  未修改 (已一致): {unchanged}')
    print(f'  无官方数据 (保留原样): {missing_official}')
    print(f'  总修改: {len(replacements)}')
    print(f'{"=" * 60}')


if __name__ == '__main__':
    main()
