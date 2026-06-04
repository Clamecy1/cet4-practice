#!/usr/bin/env python3
"""
V3: Fixed boundaries + label stripping + better skip patterns.
"""

import re
import json

def load_transcript(path):
    segs = []
    with open(path, encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            m = re.match(r'\[(\d+\.?\d*)-(\d+\.?\d*)\]\s+(.+)', line)
            if m:
                segs.append({
                    'start': float(m.group(1)),
                    'end': float(m.group(2)),
                    'text': m.group(3).strip()
                })
    return segs

# Fixed boundaries - adjusted to not cut off content starts
S1_BOUNDARIES = [
    (40, 99, 'SecA-1'),       # News Report 1: Cat in car engine
    (143, 210, 'SecA-2'),     # News Report 2: Special Olympics
    (251, 332, 'SecA-3'),     # News Report 3: Chocolate rabbits
    (417, 514, 'SecB-1'),     # Conversation 1: Vegetarian boyfriend (extended earlier)
    (597, 699, 'SecB-2'),     # Conversation 2: Jet lag / fear of flying (extended earlier)
    (815, 922, 'SecC-1'),     # Passage 1: UX design
    (1011, 1165, 'SecC-2'),   # Passage 2: Flexible seating (extended earlier)
    (1166, 1379, 'SecC-3'),   # Passage 3: School uniform policy
]

S2_BOUNDARIES = [
    (40, 132, 'SecA-1'),      # News Report 1: Eggs from Mexico
    (175, 247, 'SecA-2'),     # News Report 2: Netty's House
    (295, 378, 'SecA-3'),     # News Report 3: Snake in Australia
    (476, 579, 'SecB-1'),     # Conversation 1: Hannah wins money
    (662, 761, 'SecB-2'),     # Conversation 2: Jake's education (extended earlier)
    (879, 991, 'SecC-1'),     # Passage 1: Analytical decision-making
    (1067, 1162, 'SecC-2'),   # Passage 2: Living past 100
    (1228, 1323, 'SecC-3'),   # Passage 3: Where you sit (extended earlier)
]

SKIP_PATTERNS = [
    r'(?i)^college english test',
    r'(?i)^band\s*\d+',
    r'(?i)^part\s*\d+',
    r'(?i)^listening comprehension',
    r'(?i)^section [abc][,.]?\s*directions',
    r'(?i)^directions[.,]?\s*$',
    r'(?i)^directions[.,]?\s+in this',
    r'(?i)^in this section',
    r'(?i)^at the end of each',
    r'(?i)^both the (news report|passage|conversation)',
    r'(?i)^after you hear',
    r'(?i)^marked [A-D]',
    r'(?i)^then mark the corresponding',
    r'(?i)^news reports?\s*\d+[.:]?\s*$',
    r'(?i)^news report\s*\d+[.:]?\s*$',
    r'(?i)^news report\s*(?:one|two|three)[.:]?\s*$',
    r'(?i)^conversation\s*\d+[.:]?\s*$',
    r'(?i)^passage\s*\d+[.:]?\s*$',
    r'(?i)^questions?\s*\d+.*(?:based on|are based)',
    r'(?i)^questions?\s*\d+[–-]\d+\s+are based',
    r'(?i)^questions?\s*\d+[–-]?\d*\s+are based',
    r'(?i)^question\s*\d+[.:]\s*$',
    r'(?i)^question\s*\d+[.:]\s+.*$',
    r'(?i)^question\s*\d+[-–].*$',
    r'(?i)^question\s*\d+[-–]?\d*\s*(?:is|will|what|why|how|where|when|who|do|does|can|could|would|should)',
    r'^[A-D]\)\s',
    r'^[A-D]\.\s',
    r"^that's the end of",
]

# Labels to strip from content start (whisper sometimes includes the section label)
STRIP_LABELS = [
    r'^News reports?\s*\d+[.,:]\s*',
    r'^News report (?:one|two|three)[.,:]\s*',
    r'^Conversation\s*\d+[.,:]\s*',
    r'^Passage\s*\d+[.,:]\s*',
]

def should_skip(text):
    text = text.strip()
    for pat in SKIP_PATTERNS:
        if re.match(pat, text):
            return True
    if re.match(r'^[A-D]$', text):
        return True
    return False

def extract_sections(segs, boundaries):
    sections = []
    for t_start, t_end, code in boundaries:
        section_segs = [s for s in segs if s['start'] >= t_start and s['start'] < t_end]
        content_segs = [s for s in section_segs if not should_skip(s['text'])]

        text = ' '.join(s['text'] for s in content_segs)
        text = re.sub(r'\s+', ' ', text).strip()

        # Strip section label prefixes (like "News report 1. ")
        for pat in STRIP_LABELS:
            text = re.sub(pat, '', text, count=1).strip()

        # Remove leading "Question X" or "Question X-" prefix (whisper mislabeling)
        text = re.sub(r'^(?:question\s*\d+[–-]?\s*)+', '', text, flags=re.IGNORECASE).strip()

        sections.append({'code': code, 'transcript': text})
        print(f"  {code}: {t_start}s-{t_end}s → {len(section_segs)} segs → {len(content_segs)} kept ({len(text)} chars)")

    return sections

def main():
    configs = [
        ('s1', S1_BOUNDARIES),
        ('s2', S2_BOUNDARIES),
    ]
    for name, boundaries in configs:
        path = f'scripts/{name}_transcript.txt'
        print(f"\n{'='*60}")
        print(f"Processing {path}...")
        segs = load_transcript(path)
        sections = extract_sections(segs, boundaries)

        out_path = f'scripts/{name}_sections_v3.json'
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)
        print(f"Saved to {out_path}")

if __name__ == '__main__':
    main()
