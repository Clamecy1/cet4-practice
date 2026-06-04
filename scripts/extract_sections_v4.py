#!/usr/bin/env python3
"""
V4: Smart question detection - only skip if content looks like an actual test question.
Whisper often confuses "Conversation 1" / "Passage 2" labels with "Question X" labels.
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

# Fixed boundaries
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

# Narration/instruction patterns (always skip)
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

# Section label prefixes to strip
STRIP_LABELS = [
    r'^News reports?\s*\d+[.,:]\s*',
    r'^News report (?:one|two|three)[.,:]\s*',
    r'^Conversation\s*\d+[.,:]\s*',
    r'^Passage\s*\d+[.,:]\s*',
]

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

    # If after "Question X." the content starts with a Wh- word or auxiliary verb typical of test questions
    # Test questions typically: What, Why, How, Where, When, Which, Who, Whom, Do, Does, Did, Can, Could, etc.
    if re.match(r'(?i)^(what|why|how|where|when|which|who|whom|whose|do\s|does\s|did\s|can\s|could\s|would\s|should\s|is\s|are\s|was\s|were\s|has\s|have\s|had\s|will\s|may\s|might\s|must\s|according|in\s|on\s|to\s|the\s|a\s|an\s|it\s|they\s|he\s|she\s|we\s|you\s|this\s|that\s|these\s|those\s|some\s|many\s|most\s|all\s)', content):
        return True

    # If content is just reading question stems (long patterns)
    if len(content.split()) > 3 and re.match(r'(?i)^(what|why|how|where|when|which|who)', content):
        return True

    # If it's a fragment that doesn't make sense as conversation (just option words)
    if re.match(r'^(?:questions?\s*\d+)?\s*(?:[A-D][)\s])+', text):
        return True

    return False

def should_skip(text):
    """Check if segment should be completely removed."""
    text = text.strip()

    # Check narration patterns
    for pat in NARRATION_PATTERNS:
        if re.match(pat, text):
            return True

    # Single letters (option reading)
    if re.match(r'^[A-D]$', text):
        return True

    # Check if it's an actual test question (not mislabeled conversation content)
    if is_actual_question(text):
        return True

    # Check for "Questions X-Y are based on..." announcements
    if re.match(r'(?i)^questions?\s*\d+.*(?:based on|are based)', text):
        return True

    # Check for option readings like "A) text" or "A. text"
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

        # Strip section label prefixes
        for pat in STRIP_LABELS:
            text = re.sub(pat, '', text, count=1).strip()

        # Remove leading "Question X" / "Question X-" prefix (whisper mislabeling of section starts)
        text = re.sub(r'^(?:question\s*\d+[–\-.\s]+)+', '', text, flags=re.IGNORECASE).strip()

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

        out_path = f'scripts/{name}_sections_v4.json'
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)
        print(f"Saved to {out_path}")

if __name__ == '__main__':
    main()
