#!/usr/bin/env python3
"""
Apply extracted transcripts to sections.ts.
S1 audio → Set 1 + Set 3 (16 sections)
S2 audio → Set 2 (8 sections)
"""

import json
import re

# Load extracted sections
with open('scripts/s1_sections_v5.json', encoding='utf-8') as f:
    s1_sections = json.load(f)
with open('scripts/s2_sections_v5.json', encoding='utf-8') as f:
    s2_sections = json.load(f)

# Build lookup: code -> transcript
s1_map = {s['code']: s['transcript'] for s in s1_sections}
s2_map = {s['code']: s['transcript'] for s in s2_sections}

# Manual fixes for whisper errors
FIXES = {
    ('s1', 'SecB-2'): lambda t: (
        'Did you see that television program on air travel last night? ' + t
    ),
    ('s1', 'SecC-1'): lambda t: t.replace('always senses around', 'always centers around'),
}

def get_transcript(audio, code):
    if audio == 's1':
        t = s1_map[code]
    else:
        t = s2_map[code]

    # Apply manual fixes
    key = (audio, code)
    if key in FIXES:
        t = FIXES[key](t)

    return t

# Read original sections.ts
with open('src/data/sections.ts', encoding='utf-8') as f:
    content = f.read()

# Define the 24 sections to update: (audio, set_number)
TARGETS = [
    ('s1', 1),  # Set 1 uses S1 audio
    ('s2', 2),  # Set 2 uses S2 audio
    ('s1', 3),  # Set 3 uses S1 audio
]

SECTION_CODES = ['SecA-1', 'SecA-2', 'SecA-3', 'SecB-1', 'SecB-2', 'SecC-1', 'SecC-2', 'SecC-3']

count = 0
for audio, set_num in TARGETS:
    for code in SECTION_CODES:
        transcript = get_transcript(audio, code)
        # Escape for JS template literal
        escaped = transcript.replace('\\', '\\\\').replace('`', '\\`').replace('$', '\\$')

        # Build the old placeholder pattern to replace
        # Each section has: transcript: 'The transcript for this section is being prepared.',
        # We need to match the correct section by year/month/set
        # Use the section id: 2025-12-S{set_num}-{code}
        section_id = f"2025-12-S{set_num}-{code.split('-')[0]}-{code.split('-')[1]}"

        # Find the transcript line for this section
        # Pattern: transcript: 'The transcript for this section is being prepared.',
        old = "transcript: 'The transcript for this section is being prepared.',"
        new = f"transcript: `{escaped}`,"

        # Only replace the first occurrence (we iterate one by one)
        if old in content:
            content = content.replace(old, new, 1)
            count += 1
            print(f"  OK 2025-12-S{set_num} {code}")
        else:
            print(f"  XX 2025-12-S{set_num} {code} - placeholder not found (may already be replaced)")

print(f"\nReplaced {count}/24 placeholders")

# Write back
with open('src/data/sections.ts', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done! sections.ts updated.")

# Verify
with open('src/data/sections.ts', encoding='utf-8') as f:
    remaining = f.read().count("The transcript for this section is being prepared.")
print(f"Remaining placeholders: {remaining}")
