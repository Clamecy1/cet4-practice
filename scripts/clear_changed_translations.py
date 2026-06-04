"""Clear translations for sections whose transcripts have been corrected."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent
SECTIONS_PATH = ROOT / 'src' / 'data' / 'sections.ts'
SECTIONS_BAK = ROOT / 'src' / 'data' / 'sections.ts.bak2'
CN_PATH = ROOT / 'src' / 'data' / 'transcripts-cn.json'

# Parse current and old transcripts
pattern = re.compile(
    r"id:\s*'(\d{4}-\d{2}-S\d-Sec[ABC]-\d+)',\s*"
    r"year:\s*\d{4},\s*month:\s*\d+,\s*setNumber:\s*\d+,\s*label:\s*'[^']+',\s*"
    r"(?:\.\.\.aud\(\d+,\s*\d+,\s*\d+,\s*\d+\),\s*|audioSrc:\s*'[^']+',\s*audioStart:\s*\d+,\s*)"
    r"transcript:\s*`((?:[^`]|\n)*?)`",
    re.MULTILINE
)

def get_transcripts(filepath):
    content = filepath.read_text('utf-8')
    result = {}
    for m in pattern.finditer(content):
        result[m.group(1)] = m.group(2)
    return result

current = get_transcripts(SECTIONS_PATH)
old = get_transcripts(SECTIONS_BAK)

# Find IDs where transcript changed
changed_ids = [sid for sid, text in current.items()
               if sid in old and text != old[sid]]

print(f'{len(changed_ids)} sections have changed transcripts')

# Clear translations for changed sections
cn = json.loads(CN_PATH.read_text('utf-8'))
cleared = 0
for sid in changed_ids:
    if sid in cn and cn[sid]:
        cn[sid] = ''
        cleared += 1

CN_PATH.write_text(json.dumps(cn, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Cleared {cleared} translations')
