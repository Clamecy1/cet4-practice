"""
verify_transcripts.py — 轻量校验：检查 sections.ts transcript 与音频内容是否对齐

策略：
1. 提取每个 section transcript 的前 50 个单词
2. 在 whisper 转录中搜索这些单词是否出现在 section 边界附近
3. 标记无法匹配的 section（可能是 transcript 不对或边界不对）
4. 也检查 transcript 是否有明显问题（截断、空白、过短）
"""
import json
import re
from pathlib import Path
from collections import defaultdict

ROOT = Path(__file__).parent.parent
TRANSCRIPTS_DIR = ROOT / 'scripts' / 'transcripts'
CALIB_PATH = ROOT / 'audio-calibration-v2.json'
SECTIONS_PATH = ROOT / 'src' / 'data' / 'sections.ts'
AUDIO_DIR = ROOT / 'public' / 'audio'

SECTION_NAMES = [
    'News Report 1', 'News Report 2', 'News Report 3',
    'Conversation 1', 'Conversation 2',
    'Passage 1', 'Passage 2', 'Passage 3',
]
SEC_KEYS = ['secA1', 'secA2', 'secA3', 'secB1', 'secB2', 'secC1', 'secC2', 'secC3']


def get_audio_key(year, month, set_number):
    s2_file = AUDIO_DIR / f'{year}-{month:02d}-S2.mp3'
    if set_number == 2 and s2_file.exists():
        return f'{year}-{month:02d}-S2'
    return f'{year}-{month:02d}-S1'


def parse_sections_ts():
    content = SECTIONS_PATH.read_text(encoding='utf-8')
    pattern = re.compile(
        r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
        r"year:\s*(\d{4}),\s*"
        r"month:\s*(\d+),\s*"
        r"setNumber:\s*(\d+),\s*"
        r"label:\s*'([^']+)',\s*"
        r"\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*(\d+)\),\s*"
        r"transcript:\s*`((?:[^`]|\n)*?)`",
        re.MULTILINE
    )
    sections = []
    for m in pattern.finditer(content):
        sections.append({
            'id': m.group(1),
            'year': int(m.group(2)),
            'month': int(m.group(3)),
            'setNumber': int(m.group(4)),
            'label': m.group(5),
            'audioStart': int(m.group(6)),
            'transcript': m.group(7),
        })
    return sections


def get_content_words(text, count=50):
    """Extract first N content words from text, lowercase, stripped of punctuation."""
    words = re.findall(r"[a-zA-Z]+", text.lower())
    return words[:count]


def find_words_in_transcript(target_words, all_whisper_words, start_time, end_time, min_match=0.3):
    """Check if target words appear in whisper transcript within time range."""
    # Get whisper words in range
    nearby = [
        re.sub(r'[^\w\s]', '', w['word'].lower()).strip()
        for w in all_whisper_words
        if w['start'] >= start_time - 3 and w['start'] <= end_time + 3
    ]
    nearby = [w for w in nearby if w]

    if not nearby or not target_words:
        return 0.0, ''

    # Count matches (intersection over union of word sets)
    target_set = set(target_words)
    nearby_set = set(nearby)
    intersection = target_set & nearby_set
    overlap = len(intersection) / min(len(target_set), len(nearby_set)) if nearby_set else 0

    return overlap, ' '.join(nearby[:30])


def main():
    import sys
    sys.stdout.reconfigure(encoding='utf-8')

    cal = json.loads(CALIB_PATH.read_text(encoding='utf-8')) if CALIB_PATH.exists() else {}
    sections = parse_sections_ts()

    # Quick stats
    total_transcripts = len(sections)
    empty_or_short = [s for s in sections if len(s['transcript'].strip()) < 50]
    duplicate_ids = defaultdict(list)
    seen_texts = {}
    for s in sections:
        key = s['transcript'][:100] if s['transcript'] else ''
        if key in seen_texts:
            duplicate_ids[key].append((seen_texts[key], s['id']))
        else:
            seen_texts[key] = s['id']

    print(f'=== 基础检查 ===')
    print(f'Section 总数: {total_transcripts}')
    print(f'空白/过短 transcript (<50字): {len(empty_or_short)}')
    if empty_or_short:
        for s in empty_or_short:
            print(f'  ⚠ {s["id"]}: {len(s["transcript"])} 字')

    duplicate_pairs = [(k, v) for k, v in duplicate_ids.items() if len(v) > 1]
    print(f'疑似重复 transcript (前100字相同): {len(duplicate_pairs)}')
    if duplicate_pairs:
        for key, ids in duplicate_pairs[:5]:
            print(f'  ⚠ {ids}')

    # Load whisper transcripts
    transcripts = {}
    for f in TRANSCRIPTS_DIR.glob('*.json'):
        data = json.loads(f.read_text(encoding='utf-8'))
        transcripts[data['audio_file'].replace('.mp3', '')] = data

    # Check content-word matching with whisper
    print(f'\n=== Whisper 边界对齐检查（前50词匹配） ===')
    print(f'{"Section ID":<30} {"结果":>6} {"匹配率":>6}  Whisper 开头')
    print('-' * 90)

    alignment_issues = []
    file_stats = defaultdict(lambda: {'ok': 0, 'warn': 0, 'fail': 0})

    for sec in sections:
        audio_key = get_audio_key(sec['year'], sec['month'], sec['setNumber'])
        whisper_data = transcripts.get(audio_key)
        if not whisper_data:
            continue

        # Get first 50 content words of transcript
        target = get_content_words(sec['transcript'], 50)
        if len(target) < 10:
            alignment_issues.append({**sec, 'reason': 'transcript too short for comparison', 'match': 0})
            continue

        # Search within ±10s of section start
        start = sec['audioStart']
        overlap, whisper_snippet = find_words_in_transcript(
            target, whisper_data['words'], start, start + 120, min_match=0.3
        )

        if overlap >= 0.40:
            status = 'OK'
            file_stats[f'{sec["year"]}-{sec["month"]:02d}']['ok'] += 1
        elif overlap >= 0.20:
            status = 'WARN'
            file_stats[f'{sec["year"]}-{sec["month"]:02d}']['warn'] += 1
            alignment_issues.append({**sec, 'reason': f'low word match ({overlap:.0%})', 'match': overlap,
                                      'whisper_snippet': whisper_snippet})
        else:
            status = 'FAIL'
            file_stats[f'{sec["year"]}-{sec["month"]:02d}']['fail'] += 1
            alignment_issues.append({**sec, 'reason': f'very low word match ({overlap:.0%})', 'match': overlap,
                                      'whisper_snippet': whisper_snippet})

        if status != 'OK':
            print(f'{sec["id"]:<30} {status:>6} {overlap:>6.0%}  {whisper_snippet[:80]}')

    # Summary
    print(f'\n=== 文件汇总 ===')
    print(f'{"文件":<12} {"OK":>5} {"WARN":>5} {"FAIL":>5}')
    print('-' * 32)
    for fk in sorted(file_stats.keys()):
        fs = file_stats[fk]
        print(f'{fk:<12} {fs["ok"]:>5} {fs["warn"]:>5} {fs["fail"]:>5}')

    total_ok = sum(f['ok'] for f in file_stats.values())
    total_warn = sum(f['warn'] for f in file_stats.values())
    total_fail = sum(f['fail'] for f in file_stats.values())
    print('-' * 32)
    print(f'{"合计":<12} {total_ok:>5} {total_warn:>5} {total_fail:>5}')

    if alignment_issues:
        print(f'\n⚠ {len(alignment_issues)} 个 section 需要关注')
        print('这些可能 transcript 文本有误，或边界时间不准确，建议人工抽查。')
    else:
        print(f'\n✅ 所有 section transcript 与 whisper 转录基本对齐')

    # Save report
    report_path = ROOT / 'scripts' / 'transcript-verify-report.json'
    report_path.write_text(
        json.dumps({
            'total': total_transcripts,
            'ok': total_ok,
            'warn': total_warn,
            'fail': total_fail,
            'file_stats': dict(file_stats),
            'alignment_issues': alignment_issues,
        }, ensure_ascii=False, indent=2),
        encoding='utf-8'
    )
    print(f'详细报告: {report_path}')


if __name__ == '__main__':
    main()
