#!/usr/bin/env python3
"""
V5: Fix conversational "Can you" not being a test question + strip embedded Question labels.
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

S1_BOUNDARIES = [
    (40, 99, 'SecA-1'),
    (143, 210, 'SecA-2'),
    (251, 332, 'SecA-3'),
    (417, 514, 'SecB-1'),
    (597, 699, 'SecB-2'),
    (815, 922, 'SecC-1'),
    (1011, 1165, 'SecC-2'),
    (1166, 1379, 'SecC-3'),
]

S2_BOUNDARIES = [
    (40, 132, 'SecA-1'),
    (175, 247, 'SecA-2'),
    (295, 378, 'SecA-3'),
    (476, 579, 'SecB-1'),
    (662, 761, 'SecB-2'),
    (879, 991, 'SecC-1'),
    (1067, 1162, 'SecC-2'),
    (1228, 1323, 'SecC-3'),
]

NARRATION_PATTERNS = [
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
    r"^that's the end of",
]

STRIP_LABELS = [
    r'^News reports?\s*\d+[.,:]\s*',
    r'^News report (?:one|two|three)[.,:]\s*',
    r'^Conversation\s*\d+[.,:]\s*',
    r'^Passage\s*\d+[.,:]\s*',
]

# Conversational starters that should NOT be treated as test questions
CONVERSATIONAL_STARTERS = [
    r'(?i)^can you\s',
    r'(?i)^can i\s',
    r'(?i)^could you\s',
    r'(?i)^could i\s',
    r'(?i)^would you\s',
    r'(?i)^will you\s',
    r'(?i)^may i\s',
    r'(?i)^please\s',
    r'(?i)^let me\s',
    r'(?i)^let\'s\s',
    r'(?i)^i\'m\s',
    r'(?i)^i\'ve\s',
    r'(?i)^i\'d\s',
    r'(?i)^i\'ll\s',
    r'(?i)^you\'re\s',
    r'(?i)^you\'ve\s',
    r'(?i)^we\'re\s',
    r'(?i)^we\'ve\s',
    r'(?i)^it\'s\s',
    r'(?i)^that\'s\s',
    r'(?i)^he\'s\s',
    r'(?i)^she\'s\s',
    r'(?i)^they\'re\s',
    r'(?i)^don\'t\s',
    r'(?i)^didn\'t\s',
    r'(?i)^oh[,\s]',
    r'(?i)^well[,\s]',
    r'(?i)^yes[,\s]',
    r'(?i)^no[,\s]',
    r'(?i)^actually[,\s]',
    r'(?i)^honestly[,\s]',
    r'(?i)^apparently[,\s]',
    r'(?i)^basically[,\s]',
    r'(?i)^unbelievable',
    r'(?i)^wow[!\s]',
    r'(?i)^poor\s',
    r'(?i)^my\s',
    r'(?i)^our\s',
    r'(?i)^if you\s',
    r'(?i)^if i\s',
    r'(?i)^if we\s',
]

def is_conversational(text):
    """Check if text looks like natural conversation, not a test question."""
    for pat in CONVERSATIONAL_STARTERS:
        if re.match(pat, text):
            return True
    return False

def is_actual_question(text):
    """Check if text looks like a real CET-4 test question (not conversation content mislabeled by whisper)."""
    text = text.strip()

    # Must start with Question/Questions label
    m = re.match(r'(?i)^questions?\s*\d+[–\-.:\s]+(.+)', text)
    if not m:
        return False

    content = m.group(1).strip()

    # If it's just reading option letters, it's a question segment
    if re.match(r'^[A-D][)\s]', content):
        return True
    if re.match(r'^[A-D]$', content):
        return True

    # If content looks conversational, it's NOT a test question (whisper mislabeled)
    if is_conversational(content):
        return False

    # If content starts with a test-question Wh- word
    if re.match(r'(?i)^(what|why|how|where|when|which|who|whom|whose)', content):
        return True

    # If content starts with an auxiliary verb typical of test questions (but NOT conversational)
    if re.match(r'(?i)^(do\s|does\s|did\s|can\s|could\s|would\s|should\s|is\s|are\s|was\s|were\s|has\s|have\s|had\s|will\s|may\s|might\s|must\s|according)', content) and not is_conversational(content):
        return True

    # If it's a fragment that looks like question content
    if re.match(r'^(?:questions?\s*\d+)?\s*(?:[A-D][)\s])+', text):
        return True

    return False

def should_skip(text):
    text = text.strip()

    for pat in NARRATION_PATTERNS:
        if re.match(pat, text):
            return True

    if re.match(r'^[A-D]$', text):
        return True

    if is_actual_question(text):
        return True

    if re.match(r'(?i)^questions?\s*\d+.*(?:based on|are based)', text):
        return True

    if re.match(r'^[A-D][).]\s', text):
        return True

    return False

def extract_sections(segs, boundaries):
    sections = []
    for t_start, t_end, code in boundaries:
        section_segs = [s for s in segs if s['start'] >= t_start and s['start'] < t_end]
        content_segs = [s for s in section_segs if not should_skip(s['text'])]

        text = ' '.join(s['text'] for s in content_segs)
        text = re.sub(r'\s+', ' ', text).strip()

        # Strip section label prefixes from start
        for pat in STRIP_LABELS:
            text = re.sub(pat, '', text, count=1).strip()

        # Remove leading "Question X" prefix (whisper mislabeling of section start)
        text = re.sub(r'^(?:question\s*\d+[–\-.\s]+)+', '', text, flags=re.IGNORECASE).strip()

        # Remove embedded "Question X." / "Question X-" labels within the text (whisper artifacts)
        text = re.sub(r'\s*(?:question|questions)\s*\d+[–\-.\s]+\s*', ' ', text, flags=re.IGNORECASE)
        text = re.sub(r'\s+', ' ', text).strip()

        sections.append({'code': code, 'transcript': text})
        print(f"  {code}: {t_start}s-{t_end}s → {len(section_segs)} segs → {len(content_segs)} kept ({len(text)} chars)")
        if len(text) < 100:
            print(f"    *** WARNING: very short transcript!")

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

        out_path = f'scripts/{name}_sections_v5.json'
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)
        print(f"Saved to {out_path}")

if __name__ == '__main__':
    main()
