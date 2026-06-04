"""Clean official_transcripts.json by removing garbled text and keeping only clean English."""
import json, re
from pathlib import Path

ROOT = Path(r'C:\Users\Administrator\cet4-practice')

official = json.loads((ROOT / 'scripts' / 'official_transcripts.json').read_text('utf-8'))

def has_garbled(text):
    """Check if text contains mojibake patterns."""
    # Unicode ranges common in PDF mojibake
    if re.search(r'[᐀-ᙿ̀-ͯ]{2,}', text):
        return True
    # Common PDF extraction artifacts
    if 'fflffi' in text or 'ffi::' in text or '(fflffi' in text:
        return True
    # Very high ratio of non-ASCII
    non_ascii = sum(1 for c in text if ord(c) > 127)
    if non_ascii > len(text) * 0.3 and len(text) > 100:
        return True
    return False

def clean_transcript(text):
    """Remove garbled portions from transcript text.

    Strategy: find where the clean English ends and the garbled text begins.
    Look for the last complete sentence before garbled markers appear.
    """
    # Find the start of garbled content
    # Common garbled starts: question markers followed by Chinese, or Unicode artifacts
    garbled_start = len(text)

    # Pattern 1: Unicode mojibake blocks
    m = re.search(r'[᐀-ᙿ]{3,}', text)
    if m:
        # Look backwards from here to find a clean sentence break
        pos = m.start()
        # Find last sentence-ending punctuation before this point
        last_period = text.rfind('. ', 0, pos)
        last_question = text.rfind('? ', 0, pos)
        last_exclaim = text.rfind('! ', 0, pos)
        last_clean = max(last_period, last_question, last_exclaim)
        if last_clean > 50:
            garbled_start = min(garbled_start, last_clean + 1)

    # Pattern 2: Common PDF artifact markers
    for marker in ['(fflffi', '(ffiffi', 'ffi::', 'ᗜ', 'ᘅ']:
        idx = text.find(marker)
        if 100 < idx < garbled_start:
            # Look backwards for clean sentence end
            for punct in ['. ', '? ', '! ']:
                last = text.rfind(punct, 0, idx)
                if last > 50:
                    garbled_start = min(garbled_start, last + 1)
                    break

    # Pattern 3: Lines that are predominantly non-English
    # Find the transition point where text suddenly becomes garbled
    lines = text.split('\n')
    clean_end = 0
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped:
            continue
        non_ascii = sum(1 for c in stripped if ord(c) > 127)
        if non_ascii > len(stripped) * 0.5 and len(stripped) > 20:
            # This line is garbled, find end of previous clean content
            prev_content = '\n'.join(lines[:i])
            if len(prev_content) > 50:
                # Find last proper sentence ending
                for punct in ['. ', '? ', '! ', '." ', '.\n', '."\n']:
                    last = prev_content.rfind(punct)
                    if last > 50:
                        garbled_start = min(garbled_start, last + len(punct.strip()))
                        break
            break

    if garbled_start < len(text):
        cleaned = text[:garbled_start].strip()
        # Ensure we end with proper punctuation
        if cleaned and cleaned[-1] not in '.!?"\'»':
            # Try to find last sentence end
            for punct in ['. ', '! ', '? ']:
                last = cleaned.rfind(punct)
                if last > len(cleaned) * 0.5:
                    cleaned = cleaned[:last + 1]
                    break

        # Only use if we still have substantial content
        if len(cleaned) > 100:
            return cleaned
        else:
            return None  # Too much was garbled

    return text

cleaned_count = 0
removed_count = 0
for sid in list(official.keys()):
    text = official[sid]
    if has_garbled(text):
        cleaned = clean_transcript(text)
        if cleaned and len(cleaned) > 100:
            official[sid] = cleaned
            cleaned_count += 1
            print(f'  CLEANED: {sid} ({len(text)} -> {len(cleaned)} chars)')
        else:
            del official[sid]
            removed_count += 1
            print(f'  REMOVED: {sid} (text too garbled, only {len(cleaned) if cleaned else 0} clean chars)')

print(f'\nCleaned: {cleaned_count}, Removed: {removed_count}, Total: {len(official)}')

(ROOT / 'scripts' / 'official_transcripts.json').write_text(
    json.dumps(official, ensure_ascii=False, indent=2), encoding='utf-8'
)
