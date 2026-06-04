"""
Apply audio-calibration-v2.json data to sections.ts.

Reads calibration data and updates each section's audioStart value.
Handles the mapping:
- Audio files: YYYY-MM-SX.mp3
- S1 audio → Set 1 and Set 3 (if S3 exists)
- S2 audio → Set 2 (if S2 audio file exists)
- If only S1 audio → All sets share S1

Section label to calibration key mapping:
- "SecA-1" → secA1, "SecA-2" → secA2, etc.
"""
import json
import re
import os
import sys
from pathlib import Path

CALIB_PATH = Path(__file__).parent.parent / 'audio-calibration-v2.json'
SECTIONS_PATH = Path(__file__).parent.parent / 'src' / 'data' / 'sections.ts'
AUDIO_DIR = Path(__file__).parent.parent / 'public' / 'audio'

# Section label to calibration key mapping
LABEL_TO_KEY = {
    'SecA-1': 'secA1',
    'SecA-2': 'secA2',
    'SecA-3': 'secA3',
    'SecB-1': 'secB1',
    'SecB-2': 'secB2',
    'SecC-1': 'secC1',
    'SecC-2': 'secC2',
    'SecC-3': 'secC3',
}


def get_audio_key(year, month, set_number):
    """Determine which audio file (S1 or S2) a section uses."""
    s2_file = AUDIO_DIR / f'{year}-{month:02d}-S2.mp3'
    s1_file = AUDIO_DIR / f'{year}-{month:02d}-S1.mp3'

    if set_number == 2 and s2_file.exists():
        return f'{year}-{month:02d}-S2'
    else:
        # Set 1, Set 3 (if exists), or Set 2 when S2 file missing → all use S1
        return f'{year}-{month:02d}-S1'


def get_sec_key_from_label(label):
    """Map section label to calibration key."""
    for pattern, key in [
        ('News Report 1', 'secA1'),
        ('News Report 2', 'secA2'),
        ('News Report 3', 'secA3'),
        ('Conversation 1', 'secB1'),
        ('Conversation 2', 'secB2'),
        ('Passage 1', 'secC1'),
        ('Passage 2', 'secC2'),
        ('Passage 3', 'secC3'),
    ]:
        if pattern in label:
            return key
    return None


def main():
    # Read calibration
    if not CALIB_PATH.exists():
        print(f'ERROR: Calibration file not found: {CALIB_PATH}')
        print('Run find_boundaries.py first.')
        sys.exit(1)

    cal = json.loads(CALIB_PATH.read_text(encoding='utf-8'))
    available_keys = set(cal.keys())
    print(f'Loaded calibration data for {len(cal)} audio files')

    # Read sections.ts
    content = SECTIONS_PATH.read_text(encoding='utf-8')
    original = content

    if '--dry-run' in sys.argv:
        dry_run = True
        print('\nDRY RUN - no changes will be written\n')
    else:
        dry_run = False

    # Find each section block and update audioStart
    # Pattern: section entry with year, month, setNumber, label, aud(...)
    # We need to match sections and update the audioStart parameter in aud()

    # Strategy: find all section definitions and update them
    # Each section has the pattern:
    #   id: 'YYYY-MM-SX-SecX-N', year: YYYY, month: MM, setNumber: N,
    #   label: 'Section X -- ...', ...aud(YYYY, MM, S, START),

    # Use regex to find each section and replace audioStart
    section_pattern = re.compile(
        r"id:\s*'(\d{4})-(\d{2})-S(\d)-Sec([ABC])-(\d+)',\s*"
        r"year:\s*(\d{4}),\s*"
        r"month:\s*(\d+),\s*"
        r"setNumber:\s*(\d+),\s*"
        r"label:\s*'([^']+)',\s*"
        r"\.\.\.aud\((\d+),\s*(\d+),\s*(\d+),\s*(\d+)\)",
        re.MULTILINE
    )

    replacements = 0
    missing = []

    def replace_aud(match):
        nonlocal replacements, missing
        id_year = match.group(1)
        id_month = match.group(2)
        id_set = match.group(3)
        year = int(match.group(6))
        month = int(match.group(7))
        set_number = int(match.group(8))
        label = match.group(9)
        aud_year = match.group(10)
        aud_month = match.group(11)
        aud_set = match.group(12)
        old_start = match.group(13)

        # Determine audio key and section key
        audio_key = get_audio_key(year, month, set_number)
        sec_key = get_sec_key_from_label(label)

        if audio_key not in cal:
            missing.append(audio_key)
            return match.group(0)  # No change

        if sec_key not in cal[audio_key]:
            missing.append(f'{audio_key}:{sec_key}')
            return match.group(0)

        new_start = cal[audio_key][sec_key]
        if new_start != int(old_start):
            replacements += 1
            # Replace the last number in aud(...) with new_start
            prefix = match.group(0)[:match.group(0).rfind(old_start)]
            suffix = match.group(0)[match.group(0).rfind(old_start) + len(old_start):]
            return prefix + str(new_start) + suffix
        return match.group(0)

    new_content = section_pattern.sub(replace_aud, content)

    if missing:
        missing_unique = sorted(set(missing))
        print(f'\nMissing calibration entries ({len(missing_unique)}):')
        for m in missing_unique:
            print(f'  - {m}')

    if replacements == 0:
        print('No changes needed')
        return

    print(f'\nUpdated {replacements} audioStart values')

    if dry_run:
        print('(dry run, no file written)')
        return

    # Backup original
    backup_path = SECTIONS_PATH.with_suffix('.ts.bak')
    SECTIONS_PATH.write_text(new_content, encoding='utf-8')
    backup_path.write_text(original, encoding='utf-8')
    print(f'Original backed up to: {backup_path.name}')
    print(f'Updated: {SECTIONS_PATH}')


if __name__ == '__main__':
    main()
