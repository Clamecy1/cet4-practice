"""Find all sections with garbled/broken transcripts and fix them."""
import json, re
from pathlib import Path

ROOT = Path(r'C:\Users\Administrator\cet4-practice')
content = (ROOT / 'src/data/sections.ts').read_text('utf-8')
official = json.loads((ROOT / 'scripts' / 'official_transcripts.json').read_text('utf-8'))
bak_content = (ROOT / 'src/data/sections.ts.bak2').read_text('utf-8')

# Parse transcripts from backup
bak_pattern = re.compile(
    r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
    r"year:\s*\d{4},\s*month:\s*\d+,\s*setNumber:\s*\d+,\s*label:\s*'[^']+',\s*"
    r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
    r"(transcript:\s*`(?:[^`]|\n)*?`)",
    re.MULTILINE
)

bak_transcripts = {}
for m in bak_pattern.finditer(bak_content):
    bak_transcripts[m.group(1)] = m.group(0)  # Full match: "transcript: `...`"

# Parse current sections with positions
cur_pattern = re.compile(
    r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
    r"year:\s*\d{4},\s*month:\s*\d+,\s*setNumber:\s*\d+,\s*label:\s*'[^']+',\s*"
    r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
    r"(transcript:\s*`((?:[^`]|\n)*?)`)",
    re.MULTILINE
)

# Track which sections need fixing
fixes = []
for m in cur_pattern.finditer(content):
    sid = m.group(1)
    transcript_field = m.group(2)  # "transcript: `...`"
    transcript_text = m.group(3)   # just the text inside backticks
    transcript_start = m.start(2)
    transcript_end = m.end(2)

    # Check if this transcript contains garbled text
    has_garbled = False

    # Check for mojibake patterns: random Unicode characters mixed mid-word
    # Common patterns: characters like ᗜ, ᘅ, ffl, ffi, etc.
    garbled_chars = re.findall(r'[᐀-ᙿ̀-ͯ]{2,}', transcript_text)
    if garbled_chars:
        has_garbled = True

    # Check for 0-width chars and other suspicious Unicode
    if re.search(r'[​-‏ - ￰-￿]', transcript_text):
        has_garbled = True

    # Check for common PDF extraction artifacts
    if 'fflffi' in transcript_text or 'ffi::' in transcript_text:
        has_garbled = True

    if has_garbled:
        # Try to fix with official data
        if sid in official:
            new_transcript = f"transcript: `{official[sid]}`"
            fixes.append((transcript_start, transcript_end, new_transcript, sid, 'official'))
        # Fall back to backup
        elif sid in bak_transcripts:
            old_field = bak_transcripts[sid]
            old_text_match = re.search(r"transcript:\s*`((?:[^`]|\n)*?)`", old_field, re.DOTALL)
            if old_text_match:
                old_text = old_text_match.group(1)
                # Only use backup if it's not garbled too
                if 'fflffi' not in old_text and not re.search(r'[᐀-ᙿ]{2,}', old_text):
                    new_transcript = f"transcript: `{old_text}`"
                    fixes.append((transcript_start, transcript_end, new_transcript, sid, 'backup'))
                else:
                    print(f'  BACKUP ALSO GARBLED: {sid} (keeping for now)')
            else:
                print(f'  CANNOT PARSE BACKUP: {sid}')
        else:
            print(f'  NO BACKUP: {sid}')

# Apply fixes in reverse order
fixes.sort(key=lambda x: x[0], reverse=True)
new_content = content
for start, end, new_text, sid, source in fixes:
    new_content = new_content[:start] + new_text + new_content[end:]
    print(f'  FIX [{source}]: {sid}')

print(f'\nTotal fixes: {len(fixes)}')

if fixes:
    (ROOT / 'src/data/sections.ts').write_text(new_content, encoding='utf-8')
    print('Written sections.ts')
else:
    print('No fixes needed')
