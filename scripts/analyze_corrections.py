#!/usr/bin/env python3
"""
Analyze sections.ts timestamps against Whisper word-level transcripts.
Finds correct audioStart values and generates correction data.
"""

import json
import re
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TRANSCRIPTS_DIR = os.path.join(SCRIPT_DIR, 'transcripts')
SECTIONS_TS = os.path.join(SCRIPT_DIR, '..', 'src', 'data', 'sections.ts')
BILIBILI_CHAPTERS = os.path.join(SCRIPT_DIR, 'bilibili_chapters.json')
OUTPUT = os.path.join(SCRIPT_DIR, 'correction_map.json')

PAGE_MAP = {
    '1': '2025-06-S1', '2': '2025-06-S2', '3': '2024-12-S1', '4': '2024-12-S2',
    '6': '2024-06-S2', '7': '2023-12-S1', '8': '2023-12-S2', '16': '2021-12-S1',
}

SEC_ORDER = ['secA1', 'secA2', 'secA3', 'secB1', 'secB2', 'secC1', 'secC2', 'secC3']


def parse_sections_ts():
    """Parse sections.ts into structured data using whole-file regex."""
    with open(SECTIONS_TS, 'r', encoding='utf-8') as f:
        content = f.read()

    sections = []

    # Find each section block: starts with 'id:' and includes everything until the next section or end
    # Pattern: id: 'YYYY-MM-SX-SecX-X', ... (object with ...aud() or audioStart: N)
    block_pattern = re.compile(
        r"id:\s*'(?P<full_id>\d{4}-\d{2}-S\d-Sec[ABC]-\d)',\s*"
        r"year:\s*(?P<year>\d+),\s*month:\s*(?P<month>\d+),\s*setNumber:\s*(?P<set>\d+),\s*"
        r"(?:label:\s*'(?P<label>[^']*)',\s*)?"
        r"(?:(?:\.\.\.aud\(\d{4},\s*\d{1,2},\s*\d,\s*(?P<aud_start>\d+)\))|"
        r"(?:audioSrc:\s*'(?P<audio_src>[^']*)',?\s*(?:audioStart:\s*(?P<direct_start>\d+))?)),\s*"
        r"transcript:\s*`(?P<transcript>.+?)`\s*,\s*",
        re.DOTALL
    )

    for m in block_pattern.finditer(content):
        full_id = m.group('full_id')
        parts = full_id.split('-')
        exam = f"{parts[0]}-{parts[1]}-{parts[2]}"
        sec = f"sec{parts[3][-2]}{parts[4]}"

        # Get audioStart
        aud_start = m.group('aud_start')
        direct_start = m.group('direct_start')
        if aud_start:
            audio_start = int(aud_start)
        elif direct_start:
            audio_start = int(direct_start)
        else:
            audio_start = 0  # default

        transcript = m.group('transcript')
        label = m.group('label') or ''

        sections.append({
            'exam': exam,
            'section': sec,
            'full_id': full_id,
            'label': label,
            'audioStart': audio_start,
            'transcript': transcript,
        })

    return sections


def load_whisper_words(exam_id):
    """Load word-level Whisper transcript."""
    json_path = os.path.join(TRANSCRIPTS_DIR, f'{exam_id}.json')
    if not os.path.exists(json_path):
        return None
    with open(json_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data.get('words', [])


def find_best_alignment(transcript, words, expected_start, window=40):
    """
    Find where the transcript begins in Whisper word data.
    Returns (corrected_start_seconds, match_score).
    """
    if not transcript or not words:
        return None, 0

    # Clean and get first ~12 words of transcript
    clean = re.sub(r'[^\w\s\']', '', transcript.lower()).split()
    target_words = clean[:12]
    if len(target_words) < 4:
        return None, 0

    # Build Whisper word list
    whisper_pairs = [(w['word'].lower().strip('.,!?;:\"\'()-'), w['start']) for w in words]

    # Search in window
    lo = max(0, expected_start - window)
    hi = expected_start + window
    window_pairs = [(w, t) for w, t in whisper_pairs if lo <= t <= hi]

    if len(window_pairs) < 5:
        return None, 0

    # Sliding window: try each position, count consecutive matches
    best_score = 0
    best_start = None

    for i in range(len(window_pairs)):
        matches = 0
        for j, tw in enumerate(target_words):
            idx = i + j
            if idx < len(window_pairs) and window_pairs[idx][0] == tw:
                matches += 1
        score = matches / len(target_words)
        if score > best_score:
            best_score = score
            best_start = window_pairs[i][1]

    if best_score >= 0.25:
        return round(best_start), best_score

    return None, best_score


def load_bilibili_boundaries():
    """Extract per-section boundaries from Bilibili chapters."""
    if not os.path.exists(BILIBILI_CHAPTERS):
        return {}
    with open(BILIBILI_CHAPTERS, 'r', encoding='utf-8') as f:
        raw = json.load(f)

    boundaries = {}
    for page_num, info in raw.items():
        if page_num not in PAGE_MAP:
            continue
        exam = PAGE_MAP[page_num]
        exam_b = {}
        for ch in info['chapters']:
            try:
                c = ch['content'].encode('latin-1').decode('gbk')
            except:
                c = ch['content']
            f = ch['from']

            # Map chapter content to section keys
            if '前言' in c:
                exam_b['intro_end'] = ch['to']
            elif 'Section A' in c and ('1-2' in c or '1-7' in c):
                exam_b['secA1'] = f
            elif 'Section A' in c and '3-7' in c:
                exam_b['secA2'] = f
            elif 'Section B' in c and ('8-11' in c or '8-15' in c):
                exam_b['secB1'] = f
            elif 'Section B' in c and '12-15' in c:
                exam_b['secB2'] = f
            elif 'Section C' in c and '16-18' in c:
                exam_b['secC1'] = f
            elif 'Section C' in c and '19-21' in c:
                exam_b['secC2'] = f
            elif 'Section C' in c and ('22-25' in c or '19-25' in c):
                exam_b['secC3'] = f
        if exam_b:
            boundaries[exam] = exam_b
    return boundaries


def main():
    print("=== CET4 AudioStart Correction Analysis ===\n", flush=True)

    # Parse sections.ts
    sections = parse_sections_ts()
    print(f"Parsed {len(sections)} sections from sections.ts", flush=True)

    # Load Bilibili data
    bili_boundaries = load_bilibili_boundaries()
    print(f"Bilibili chapters for {len(bili_boundaries)} exams", flush=True)

    # Process each section
    results = []
    exam_whisper_cache = {}
    stats = {'total': 0, 'whisper_fixed': 0, 'bili_fixed': 0,
             'whisper_ok': 0, 'no_whisper_data': 0, 'bili_mismatch': 0}

    for i, sec in enumerate(sections):
        exam = sec['exam']
        current_start = sec['audioStart']
        transcript = sec['transcript']

        if (i + 1) % 20 == 0:
            print(f"  Processing... {i+1}/{len(sections)}", flush=True)

        # Load Whisper data (cached)
        if exam not in exam_whisper_cache:
            exam_whisper_cache[exam] = load_whisper_words(exam)
        words = exam_whisper_cache[exam]

        # Default: no change
        corrected = current_start
        source = 'unchanged'
        confidence = 'high'
        diff_sec = 0
        whisper_score = 0

        # Try Whisper alignment
        if words:
            whisper_start, score = find_best_alignment(transcript, words, current_start)
            if whisper_start is not None:
                diff_sec = whisper_start - current_start
                if abs(diff_sec) > 3:
                    corrected = whisper_start
                    source = 'whisper'
                    confidence = 'high' if abs(diff_sec) > 10 else 'medium'
                    stats['whisper_fixed'] += 1
                else:
                    stats['whisper_ok'] += 1
                whisper_score = score
            else:
                stats['no_whisper_data'] += 1
        else:
            stats['no_whisper_data'] += 1

        # Cross-check with Bilibili
        bili_val = None
        bili_mismatch = False
        if exam in bili_boundaries and sec['section'] in bili_boundaries[exam]:
            bili_val = bili_boundaries[exam][sec['section']]
            if abs(current_start - bili_val) > 10:
                bili_mismatch = True
                stats['bili_mismatch'] += 1
                # If Whisper didn't fix and Bilibili has significant diff, use Bilibili
                if source == 'unchanged' and abs(current_start - bili_val) > 15:
                    corrected = bili_val
                    source = 'bilibili'
                    diff_sec = bili_val - current_start
                    confidence = 'medium'
                    stats['bili_fixed'] += 1

        results.append({
            'id': sec['full_id'],
            'exam': exam,
            'section': sec['section'],
            'label': sec['label'],
            'current_audioStart': current_start,
            'corrected_audioStart': corrected,
            'source': source,
            'diff_seconds': diff_sec,
            'confidence': confidence,
            'whisper_score': round(whisper_score, 2),
            'bilibili_boundary': bili_val,
            'bilibili_mismatch': bili_mismatch,
        })
        stats['total'] += 1

    # Summary
    changed = [r for r in results if r['source'] != 'unchanged']
    print(f"\n{'='*60}")
    print(f"SUMMARY")
    print(f"{'='*60}")
    print(f"Total sections:          {stats['total']}")
    print(f"Sections changed:        {len(changed)}")
    print(f"  Fixed via Whisper:     {stats['whisper_fixed']}")
    print(f"  Fixed via Bilibili:    {stats['bili_fixed']}")
    print(f"  Whisper OK (<3s diff): {stats['whisper_ok']}")
    print(f"  No Whisper alignment:  {stats['no_whisper_data']}")
    print(f"  Bilibili mismatches:   {stats['bili_mismatch']}")

    if changed:
        print(f"\n{'='*60}")
        print(f"CORRECTIONS")
        print(f"{'='*60}")
        for r in changed:
            print(f"  {r['id']}: {r['current_audioStart']}s -> {r['corrected_audioStart']}s "
                  f"({r['diff_seconds']:+d}s) [{r['source']}] "
                  f"score={r['whisper_score']} bili={r['bilibili_boundary']}")

    # Also show sections with Bilibili mismatch but no change
    bili_issues = [r for r in results if r['bilibili_mismatch'] and r['source'] == 'unchanged']
    if bili_issues:
        print(f"\n{'='*60}")
        print(f"BILIBILI MISMATCHES (no Whisper fix)")
        print(f"{'='*60}")
        for r in bili_issues:
            print(f"  {r['id']}: current={r['current_audioStart']}s, bilibili={r['bilibili_boundary']}s "
                  f"(diff={r['bilibili_boundary'] - r['current_audioStart']:+d}s)")

    # Save
    output = {
        'generated_by': 'analyze_corrections.py',
        'stats': stats,
        'corrections': results,
        'sections_to_change': [r for r in results if r['source'] != 'unchanged'],
    }
    with open(OUTPUT, 'w', encoding='utf-8') as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    print(f"\nSaved to: {OUTPUT}")

    return results


if __name__ == '__main__':
    main()
