"""Aggressively clean official transcripts - remove ALL garbled/non-English suffixes."""
import json, re
from pathlib import Path

ROOT = Path(r'C:\Users\Administrator\cet4-practice')
official = json.loads((ROOT / 'scripts' / 'official_transcripts.json').read_text('utf-8'))

def find_clean_boundary(text):
    """Find the end of clean English content.

    Returns the index of the last character that belongs to clean English.
    """
    # Split into lines and find first garbled line
    lines = text.split('\n')
    clean_lines = []
    for line in lines:
        stripped = line.strip()
        if not stripped:
            clean_lines.append('')
            continue

        # Count non-ASCII chars
        non_ascii = sum(1 for c in stripped if ord(c) > 127)
        total_chars = len(stripped)

        # If >20% non-ASCII and line is >10 chars, it's likely garbled
        if total_chars > 10 and non_ascii > total_chars * 0.2:
            # But allow common English punctuation and symbols
            # Also check for common garbled patterns
            if re.search(r'[᐀-ᙿ￰-￿]', stripped):
                break  # Definitely garbled
            if 'fflffi' in stripped or 'ffi::' in stripped:
                break
            if non_ascii > total_chars * 0.5:
                break

        clean_lines.append(stripped)

    clean_text = '\n'.join(clean_lines).strip()

    # Further check: find patterns that indicate the end of passage content
    # Common patterns: question numbers with garbled, page numbers, Chinese text
    end_patterns = [
        r'\d{4}\.\s*\d{1,2}\s*/\s*\d+',  # Page numbers like "2021. 12 / 30"
        r'\d{1,2}\.\s+[A-Z]\)',  # Question numbers followed by answer choices
        r'Part\s+(?:III|Ⅲ|Ⅱ|II)',  # Next section
        r'\([fﬂ]+',  # Garbled markers
        r'[᐀-ᙿ]',  # Unicode mojibake
        r'[￰-￿]',  # Specials block
    ]

    earliest = len(clean_text)
    for pat in end_patterns:
        m = re.search(pat, clean_text)
        if m and m.start() > 50:
            earliest = min(earliest, m.start())

    if earliest < len(clean_text):
        clean_text = clean_text[:earliest].rstrip()

    # Ensure we end at a sentence boundary
    # Find the last period, question mark, or exclamation
    for punct in ['. ', '."', '? ', '!"', '.\n', '?', '!', '.']:
        last = clean_text.rfind(punct)
        if last > max(50, len(clean_text) * 0.6):
            clean_text = clean_text[:last + 1]
            break

    return clean_text.strip()

cleaned_count = 0
for sid in list(official.keys()):
    text = official[sid]
    cleaned = find_clean_boundary(text)

    if len(cleaned) < 100:
        # Too short after cleaning - this indicates the transcript is mostly garbled
        del official[sid]
        print(f'  REMOVED: {sid} (only {len(cleaned)} clean chars)')
    elif len(cleaned) < len(text) * 0.9:
        official[sid] = cleaned
        cleaned_count += 1
        print(f'  TRIMMED: {sid} ({len(text)} -> {len(cleaned)} chars)')

print(f'\nTrimmed: {cleaned_count}, Total: {len(official)}')

# Check remaining garbled
remaining = 0
for sid, text in official.items():
    if re.search(r'[᐀-ᙿ]', text):
        remaining += 1
        print(f'  STILL GARBLED: {sid}')

if remaining == 0:
    print('✅ All official transcripts clean')

(ROOT / 'scripts' / 'official_transcripts.json').write_text(
    json.dumps(official, ensure_ascii=False, indent=2), encoding='utf-8'
)
