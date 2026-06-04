"""Rebuild sections.ts from backup, applying only known-good official corrections."""
import json, re
from pathlib import Path

ROOT = Path(r'C:\Users\Administrator\cet4-practice')
bak = (ROOT / 'src/data/sections.ts.bak2').read_text('utf-8')
official = json.loads((ROOT / 'scripts' / 'official_transcripts.json').read_text('utf-8'))

# Parse backup sections with positions
sec_pattern = re.compile(
    r"(id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
    r"year:\s*\d{4},\s*month:\s*\d+,\s*setNumber:\s*\d+,\s*label:\s*'[^']+',\s*"
    r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
    r")(transcript:\s*`((?:[^`]|\n)*?)`)",
    re.MULTILINE
)

new_content = bak
replacements = []

for m in sec_pattern.finditer(bak):
    sid = m.group(2)
    transcript_field_start = m.start(3)
    transcript_field_end = m.end(3)
    current_text = m.group(4)

    if sid in official:
        official_text = official[sid]
        # Only replace if different (normalized comparison)
        def normalize(t):
            return re.sub(r'\s+', ' ', t).strip().lower()

        if normalize(official_text) != normalize(current_text):
            # Escape special chars for JS template literal
            safe_text = official_text.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
            new_field = f"transcript: `{safe_text}`"
            replacements.append((transcript_field_start, transcript_field_end, new_field, sid, 'official'))
            print(f'  OFFICIAL: {sid}')
        else:
            print(f'  SKIP (same): {sid}')
    elif current_text.startswith('[Transcript same as') or 'to be verified' in current_text.lower():
        # For placeholder sections that share audio with a set that has official data,
        # try to sync from the official set
        m2 = re.match(r'(\d{4}-\d{2})-S(\d)-(Sec[ABC]-\d)', sid)
        if m2:
            base = m2.group(1)
            s_num = m2.group(2)
            sec_part = m2.group(3)
            # S3 shares audio with S1
            if s_num == '3':
                src_id = f'{base}-S1-{sec_part}'
                if src_id in official:
                    safe_text = official[src_id].replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
                    new_field = f"transcript: `{safe_text}`"
                    replacements.append((transcript_field_start, transcript_field_end, new_field, sid, 'sync-from-official'))
                    print(f'  SYNC: {sid} <- {src_id}')
                else:
                    print(f'  NO SOURCE: {sid} (placeholder kept)')
            else:
                print(f'  PLACEHOLDER: {sid}')

# Apply replacements in reverse order
replacements.sort(key=lambda x: x[0], reverse=True)
for start, end, new_text, sid, source in replacements:
    new_content = new_content[:start] + new_text + new_content[end:]

print(f'\nTotal replacements: {len(replacements)}')

# Write
if replacements:
    (ROOT / 'src/data/sections.ts').write_text(new_content, encoding='utf-8')
    print('Written sections.ts')

# Also update 2021-12-S2-SecC-3 if it was missing from official
# Check for any sections that still have garbled text
garbled_check = re.compile(r'[᐀-ᙿ]{2,}')
remaining = []
for m in sec_pattern.finditer(new_content):
    sid = m.group(2)
    text = m.group(4)
    if garbled_check.search(text):
        remaining.append(sid)

if remaining:
    print(f'\n⚠ Still garbled ({len(remaining)}):')
    for s in remaining:
        print(f'  {s}')
else:
    print('\n✅ No garbled sections remaining')
