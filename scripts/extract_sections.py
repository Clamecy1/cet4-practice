#!/usr/bin/env python3
"""
Extract and clean section transcripts from whisper output.
Splits by time boundaries, removes narration/questions.
"""

import re
import json

def load_transcript(path):
    """Load timestamped transcript lines."""
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

# Time boundaries for each section (audioStart values)
BOUNDARIES = [
    (0, 'SecA-1'),      # News Report 1
    (100, 'SecA-2'),    # News Report 2
    (210, 'SecA-3'),    # News Report 3
    (330, 'SecB-1'),    # Conversation 1
    (460, 'SecB-2'),    # Conversation 2
    (600, 'SecC-1'),    # Passage 1
    (760, 'SecC-2'),    # Passage 2
    (930, 'SecC-3'),    # Passage 3
    (9999, '__END__'),  # sentinel
]

# Patterns for lines to REMOVE (narration, questions, instructions)
SKIP_PATTERNS = [
    r'(?i)college english test',
    r'(?i)part \d+\.?\s*listening',
    r'(?i)comprehension',
    r'(?i)^section [abc],?\s*directions',
    r'(?i)^directions',
    r'(?i)^in this section',
    r'(?i)^at the end of each',
    r'(?i)^both the (news report|passage|conversation)',
    r'(?i)^after you hear',
    r'(?i)^marked [A-D]',
    r'(?i)^then mark the corresponding',
    r'(?i)^news reports?\s*\d+[.:]?$',
    r'(?i)^news report\s*\d+[.:]?\s*$',
    r'(?i)^conversation\s*\d+[.:]?\s*$',
    r'(?i)^passage\s*\d+[.:]?\s*$',
    r'(?i)^questions?\s*\d+.*(?:based on|are based)',
    r'(?i)^questions?\s*\d+[–-]\d+\s+are based',
    r'(?i)^question\s*\d+[.:]?\s*$',
    r'(?i)^question\s*\d+[.:].*$',
    r'(?i)^question\s*\d+[–-].*$',
    r'^[A-D]\)\s',  # Option readings like "A) ..."
    r'^[A-D]\.\s',  # Option readings like "A. ..."
]

def should_skip(text):
    """Check if a segment should be skipped (narration/question)."""
    text = text.strip()
    for pat in SKIP_PATTERNS:
        if re.match(pat, text):
            return True
    # Also skip if it's just reading a single letter option
    if re.match(r'^[A-D]$', text):
        return True
    return False

def extract_sections(segs):
    """Split segments into 8 sections and clean each."""
    sections = []
    for i in range(len(BOUNDARIES) - 1):
        t_start = BOUNDARIES[i][0]
        t_end = BOUNDARIES[i+1][0]
        code = BOUNDARIES[i][1]

        # Collect segments in this time window
        section_segs = [s for s in segs if s['start'] >= t_start and s['start'] < t_end]

        # Filter out narration/questions
        content_segs = [s for s in section_segs if not should_skip(s['text'])]

        # Join text
        text = ' '.join(s['text'] for s in content_segs)
        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text).strip()

        sections.append({'code': code, 'transcript': text})
        print(f"  {code}: {t_start}s-{t_end}s → {len(section_segs)} segs → {len(content_segs)} content segs ({len(text)} chars)")

    return sections

def main():
    for mp3_name in ['s1', 's2']:
        path = f'scripts/{mp3_name}_transcript.txt'
        print(f"\n{'='*60}")
        print(f"Processing {path}...")
        segs = load_transcript(path)
        print(f"Total segments: {len(segs)}")
        sections = extract_sections(segs)

        # Save for inspection
        out_path = f'scripts/{mp3_name}_sections.json'
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(sections, f, ensure_ascii=False, indent=2)
        print(f"Saved to {out_path}")

if __name__ == '__main__':
    main()
