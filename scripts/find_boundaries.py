"""
CET-4 Section Boundary Detection V3 — Exhaustive marker search + constraint-based resolution.

Key improvements over V2:
- Exhaustive content marker variants (digit + word forms for ALL section types)
- Multi-pass detection: content markers → question markers → directions → announcements
- Constraint-based resolution with priority levels (P1-P5)
- Audio-to-set content verification
- Confidence scoring for each boundary
"""
import json
import re
import sys
from pathlib import Path

TRANSCRIPTS_DIR = Path(__file__).parent / 'transcripts'
OUT_PATH = Path(__file__).parent.parent / 'audio-calibration-v2.json'
SECTIONS_TS = Path(__file__).parent.parent / 'src' / 'data' / 'sections.ts'

SEC_KEYS = ['secA1', 'secA2', 'secA3', 'secB1', 'secB2', 'secC1', 'secC2', 'secC3']

SECTION_DEFS = [
    (1, 2, 'news', False),      # SecA-1: News 1, Q1-2
    (3, 4, 'news', False),      # SecA-2: News 2, Q3-4
    (5, 7, 'news', False),      # SecA-3: News 3, Q5-7
    (8, 11, 'conv', True),      # SecB-1: Conv 1, Q8-11
    (12, 15, 'conv', False),    # SecB-2: Conv 2, Q12-15
    (16, 18, 'pass', True),     # SecC-1: Pass 1, Q16-18
    (19, 21, 'pass', False),    # SecC-2: Pass 2, Q19-21
    (22, 25, 'pass', False),    # SecC-3: Pass 3, Q22-25
]

# ── Content marker variants (exhaustive, based on analysis of 21 whisper transcripts) ──

CONTENT_VARIANTS = {
    'secA1': [
        'news report 1', 'news report one',
        'the news report 1', 'the news report one',
        'new report 1', 'new report one',
        'the new report 1', 'the new report one',
        'news reports 1', 'news reports one',
        'the news reports 1', 'the news reports one',
    ],
    'secA2': [
        'news report 2', 'news report two',
        'the news report 2', 'the news report two',
        'new report 2', 'new report two',
        'the new report 2', 'the new report two',
        'news reports 2', 'news reports two',
        'the news reports 2', 'the news reports two',
        'new reports 2', 'new reports two',
    ],
    'secA3': [
        'news report 3', 'news report three',
        'the news report 3', 'the news report three',
        'new report 3', 'new report three',
        'the new report 3', 'the new report three',
        'news reports 3', 'news reports three',
        'the news reports 3', 'the news reports three',
    ],
    'secB1': [
        'conversation 1', 'conversation one',
    ],
    'secB2': [
        'conversation 2', 'conversation two',
    ],
    'secC1': [
        'passage 1', 'passage one',
    ],
    'secC2': [
        'passage 2', 'passage two',
    ],
    'secC3': [
        'passage 3', 'passage three',
    ],
}

# Word forms for question numbers
QUESTION_NUMBER_WORDS = {
    1: ['1', 'one'], 2: ['2', 'two'], 3: ['3', 'three'],
    4: ['4', 'four'], 5: ['5', 'five'], 6: ['6', 'six'],
    7: ['7', 'seven'], 8: ['8', 'eight'], 9: ['9', 'nine'],
    10: ['10', 'ten'], 11: ['11', 'eleven'], 12: ['12', 'twelve'],
    13: ['13', 'thirteen'], 14: ['14', 'fourteen'], 15: ['15', 'fifteen'],
    16: ['16', 'sixteen'], 17: ['17', 'seventeen'], 18: ['18', 'eighteen'],
    19: ['19', 'nineteen'], 20: ['20', 'twenty'],
    21: ['21', 'twenty one', 'twenty-one'],
    22: ['22', 'twenty two', 'twenty-two'],
    23: ['23', 'twenty three', 'twenty-three'],
    24: ['24', 'twenty four', 'twenty-four'],
    25: ['25', 'twenty five', 'twenty-five'],
}

# Direction phrases to detect section transitions
DIRECTION_PREFIXES = [
    'mark the corresponding letter on answer sheet',
    'mark the corresponding letter on your answer sheet',
    'mark the corresponding letter on answer',
    'marked a b c and d',
    'marked a b c',
    'a single line through the centre',
    'a single line through the center',
    'must choose the best answer',
    'choose the best answer',
]

SECTION_B_PATTERNS = [
    'section b directions',
    'section b',
    'two long conversations',
    'in this section you will hear two long conversations',
]

SECTION_C_PATTERNS = [
    'section c directions',
    'section c',
    'three passages',
    'in this section you will hear three passages',
]


def normalize_word(w):
    """Strip punctuation and lowercase for matching."""
    return w.strip('.,;:!?()[]"\'-–—$').lower()


def find_word_sequence(words, phrase, start_idx=0):
    """
    Search words array for a phrase (space-separated).
    Returns (timestamp, word_index) of first match, or (None, -1).
    Case-insensitive, punctuation-insensitive.
    """
    target = phrase.lower().split()
    n_words = len(target)
    total = len(words)

    for i in range(start_idx, total - n_words + 1):
        match = True
        for j, tw in enumerate(target):
            if normalize_word(words[i + j]['word']) != tw:
                match = False
                break
        if match:
            return words[i]['start'], i
    return None, -1


def find_all_content_markers(words):
    """
    Exhaustive search for all content markers.
    Returns dict: {sec_key: {'time': float, 'idx': int, 'phrase': str, 'method': 'P1'}}
    Only keeps the FIRST (earliest) match for each section.
    """
    results = {}
    for sec_key, variants in CONTENT_VARIANTS.items():
        best_t, best_idx, best_phrase = None, len(words), None
        for phrase in variants:
            t, idx = find_word_sequence(words, phrase)
            if t is not None and idx < best_idx:
                best_t, best_idx, best_phrase = t, idx, phrase
        if best_t is not None:
            # Verify: text after marker should be actual content
            # Look at next 30 words for direction/question patterns
            ahead_words = [normalize_word(words[j]['word']) for j in range(best_idx + len(best_phrase.split()), min(best_idx + len(best_phrase.split()) + 30, len(words)))]
            ahead_text = ' '.join(ahead_words)

            # Reject if it's part of directions or question announcement
            rejection_phrases = [
                'are based on', 'you have just heard', 'in this section',
                'you will hear', 'mark the corresponding', 'answer sheet',
                'directions', 'section a', 'section b', 'section c',
            ]
            is_valid = True
            for rp in rejection_phrases:
                if rp in ahead_text[:50]:
                    is_valid = False
                    break

            if is_valid:
                results[sec_key] = {
                    'time': round(best_t),
                    'idx': best_idx,
                    'phrase': best_phrase,
                    'method': 'P1',
                }
    return results


def find_all_question_markers(words):
    """
    Find individual 'Question N' markers using word-array search.
    Handles both digit and word forms.
    Returns dict: {question_number: {'time': float, 'idx': int}}
    """
    results = {}
    n = len(words)

    # Method 1: Word-array search for "question/Questions" followed by number
    for i in range(n - 2):
        w1 = normalize_word(words[i]['word'])
        w2 = normalize_word(words[i + 1]['word'])

        if w1 in ('question', 'questions'):
            q_num = None

            # Check digit form: "Question 1"
            if w2.isdigit():
                q_num = int(w2)
            # Check word form: "Question one"
            else:
                word_to_num = {
                    'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
                    'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
                    'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
                    'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18,
                    'nineteen': 19, 'twenty': 20,
                }
                q_num = word_to_num.get(w2)
                # Check for "twenty one" pattern (3 words)
                if q_num == 20 and i + 2 < n:
                    w3 = normalize_word(words[i + 2]['word'])
                    if w3 in ('one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'):
                        q_num = 20 + {'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9}[w3]

            if q_num is None or q_num < 1 or q_num > 25:
                continue

            # Reject section announcements: "Questions N to M are based on..."
            look_ahead = min(i + 40, n)
            ahead_text = ' '.join([normalize_word(words[j]['word']) for j in range(i + 2, look_ahead)])
            if re.search(r'\bare\s+based\s+on\b', ahead_text[:40]):
                continue

            # Accept if followed by question content or options
            has_options = bool(re.search(r'\b[A-D]\s*[\)\.]', ahead_text))
            has_question_content = bool(re.search(
                r'\b(what|why|how|which|who|where|when|do|does|did|is|are|was|were|can|could|would|should|will|may|according|learn|mean|say|know|think)\b',
                ahead_text[:40], re.IGNORECASE
            ))

            if has_options or has_question_content:
                t = words[i]['start']
                if q_num not in results or t < results[q_num]['time']:
                    results[q_num] = {'time': t, 'idx': i}

    # Method 2: Also search the full text for question markers that might be split
    # (handles edge cases where whisper separates "Question" and the number)
    full_words = [normalize_word(w['word']) for w in words]
    full_text = ' '.join(full_words)

    # Search for "question N" and "questions N" patterns that Method 1 might have missed
    for q_num in range(1, 26):
        if q_num in results:
            continue
        for num_str in QUESTION_NUMBER_WORDS[q_num]:
            for prefix in ['question', 'questions']:
                pattern = re.compile(
                    r'\b' + re.escape(prefix) + r'\s+' + re.escape(num_str) + r'\b',
                    re.IGNORECASE
                )
                for m in pattern.finditer(full_text):
                    # Map character position to word index
                    prefix_text = full_text[:m.start()]
                    w_idx = len(prefix_text.split())
                    if w_idx < len(words):
                        t = words[w_idx]['start']
                        # Verify this isn't an announcement
                        ahead = ' '.join(full_words[w_idx + 2:w_idx + 40])
                        if not re.search(r'\bare\s+based\s+on\b', ahead[:40]):
                            if q_num not in results or t < results[q_num]['time']:
                                results[q_num] = {'time': t, 'idx': w_idx}
                            break

    return results


def find_direction_markers(words):
    """Find Section A intro end, Section B directions, Section C directions."""
    markers = {'intro_end': None, 'section_b': None, 'section_c': None}

    # Intro end: find "mark the corresponding letter..." or "answer sheet one"
    intro_patterns = [
        'answer sheet one with a single line through the centre',
        'answer sheet one with a single line through the center',
        'a single line through the centre',
        'a single line through the center',
        'mark the corresponding letter on answer sheet one',
        'marked a b c and d',
    ]
    for phrase in intro_patterns:
        t, idx = find_word_sequence(words, phrase)
        if t is not None and t < 200:
            # Find next substantial content after a pause
            phrase_words = len(phrase.split())
            for j in range(idx + phrase_words + 3, min(idx + phrase_words + 30, len(words))):
                if words[j]['start'] >= t + 4:
                    markers['intro_end'] = round(words[j]['start'])
                    break
            if markers['intro_end'] is None:
                markers['intro_end'] = round(t + 8)
            break

    # Section B directions: "Section B" + "two long conversations"
    for phrase in SECTION_B_PATTERNS:
        t, idx = find_word_sequence(words, phrase)
        if t is not None and 200 < t < 800:
            markers['section_b'] = t
            break

    # Section C directions: "Section C" + "three passages"
    for phrase in SECTION_C_PATTERNS:
        t, idx = find_word_sequence(words, phrase)
        if t is not None and 600 < t < 1400:
            markers['section_c'] = t
            break

    return markers


def find_announcements(words):
    """
    Find 'Questions N (to|and|-) M are based on...' patterns.
    Returns list of {q_start, q_end, time}.
    """
    full = ' '.join([w['word'] for w in words])

    patterns = [
        re.compile(r'questions?\s+(\d+)\s+(?:and|to|\-|–)\s*(\d+)\s+are\s+based\s+on', re.IGNORECASE),
        re.compile(r'questions?\s+(\d+)\s*[-–]\s*(\d+)\s+are\s+based\s+on', re.IGNORECASE),
    ]

    results = []
    for pattern in patterns:
        for m in pattern.finditer(full):
            q1, q2 = int(m.group(1)), int(m.group(2))
            prefix = full[:m.start()]
            w_idx = len(prefix.split())
            if w_idx < len(words):
                results.append({
                    'q_start': q1,
                    'q_end': q2,
                    'time': words[w_idx]['start'],
                })

    # Deduplicate by q_start, keep earliest
    seen = set()
    unique = []
    for a in sorted(results, key=lambda x: x['time']):
        if a['q_start'] not in seen:
            seen.add(a['q_start'])
            unique.append(a)

    return sorted(unique, key=lambda x: x['time'])


def verify_content_text(words, idx, sec_type):
    """
    Verify that text after a marker looks like actual content.
    sec_type: 'news', 'conv', or 'pass'
    Returns True if verified.
    """
    ahead = [normalize_word(words[j]['word']) for j in range(idx, min(idx + 40, len(words)))]
    ahead_text = ' '.join(ahead)

    # Reject if it's clearly directions
    direction_phrases = [
        'in this section', 'you will hear', 'you must choose',
        'mark the corresponding', 'answer sheet', 'a single line',
        'directions', 'at the end of each',
    ]
    for dp in direction_phrases:
        if dp in ahead_text[:60]:
            return False

    # For conversations: look for dialogue patterns (personal pronouns, questions, etc.)
    if sec_type == 'conv':
        dialogue_indicators = ['you', 'i', "i'm", "don't", "can't", "didn't", 'well', 'yes', 'no', 'oh', 'hey', 'hi']
        has_dialogue = any(di in ahead[:20] for di in dialogue_indicators)
        if has_dialogue:
            return True

    # For news/passages: look for narrative text (past tense, articles, etc.)
    narrative_indicators = ['the', 'a', 'an', 'has', 'have', 'had', 'was', 'were', 'according', 'researchers', 'scientists', 'study', 'found']
    has_narrative = any(ni in ahead[:20] for ni in narrative_indicators)

    return has_narrative


def find_boundaries_v3(transcript_path):
    """Main V3 algorithm for a single transcript file."""
    with open(transcript_path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    words = data.get('words', [])
    duration = data.get('duration', 0)
    audio_key = Path(transcript_path).stem

    if len(words) < 100:
        print(f'  Too few words ({len(words)})')
        return None

    # Pass 1: Find all content markers
    content_markers = find_all_content_markers(words)

    # Pass 2: Find all question markers
    question_markers = find_all_question_markers(words)

    # Handle corrupted/long audio files: filter markers beyond normal exam duration
    # (2022-12-S2 contains two complete exam recordings, use only first one)
    max_valid_time = None
    if duration > 1700:
        max_valid_time = 1500
        question_markers = {q: m for q, m in question_markers.items() if m['time'] < max_valid_time}
        print(f'  Note: long audio ({duration:.0f}s), filtering markers beyond {max_valid_time}s')

    # Pass 3: Find direction markers
    direction_markers = find_direction_markers(words)

    # Pass 4: Find announcements
    announcements = find_announcements(words)
    ann_map = {a['q_start']: a['time'] for a in announcements}

    # Filter corrupted/long audio: cap everything at normal exam duration
    if max_valid_time is not None:
        content_markers = {k: v for k, v in content_markers.items() if v['time'] < max_valid_time}
        announcements = [a for a in announcements if a['time'] < max_valid_time]
        ann_map = {a['q_start']: a['time'] for a in announcements}

    # Compute per-question duration from consecutive questions
    q_durations = []
    for q_start, q_end, _, _ in SECTION_DEFS:
        section_qs = sorted(
            [(qn, question_markers[qn]['time']) for qn in range(q_start, q_end + 1) if qn in question_markers],
            key=lambda x: x[1]
        )
        for i in range(1, len(section_qs)):
            dur = section_qs[i][1] - section_qs[i - 1][1]
            if 15 < dur < 40:
                q_durations.append(dur)
    avg_q_dur = sum(q_durations) / len(q_durations) if q_durations else 21.0

    # Typical content durations for backward estimation
    typical_content = {
        'news': 65,   # News reports are ~60-75s
        'conv': 95,   # Conversations are ~85-110s
        'pass': 105,  # Passages are ~95-115s
    }

    print(f'  Content markers: {list(content_markers.keys())} '
          f'({len(content_markers)}/8 direct)')
    print(f'  Questions: {len(question_markers)}/25, avg_q_dur={avg_q_dur:.1f}s')
    print(f'  Announcements: {[(a["q_start"], round(a["time"])) for a in announcements]}')
    print(f'  Directions: intro_end={direction_markers["intro_end"]}, '
          f'B={direction_markers["section_b"]}, C={direction_markers["section_c"]}')

    # ── Constraint-Based Resolution ──
    starts = []
    methods = []

    for idx, sec_key in enumerate(SEC_KEYS):
        q_start, q_end, sec_type, has_directions = SECTION_DEFS[idx]

        # ─── P1: Direct content marker ───
        if sec_key in content_markers:
            t = content_markers[sec_key]['time']
            # Verify it's after previous section start
            if idx == 0 or t > starts[-1] + 25:
                # Verify the text following the marker
                marker_idx = content_markers[sec_key]['idx']
                phrase_len = len(content_markers[sec_key]['phrase'].split())
                if verify_content_text(words, marker_idx + phrase_len, sec_type):
                    starts.append(t)
                    methods.append('P1')
                    continue
                else:
                    # Content marker found but text doesn't verify — still use it but flag
                    starts.append(t)
                    methods.append('P1?')
                    continue

        # ─── P2: Content marker with disambiguation ───
        # Try searching from starts[-1]+25s onwards
        if idx > 0 and sec_key in CONTENT_VARIANTS:
            search_start_ts = starts[-1] + 25
            search_end_ts = max_valid_time if max_valid_time is not None else float('inf')
            for phrase in CONTENT_VARIANTS[sec_key]:
                t, found_idx = find_word_sequence(words, phrase)
                if t is not None and search_start_ts < t < search_end_ts:
                    phrase_len = len(phrase.split())
                    if verify_content_text(words, found_idx + phrase_len, sec_type):
                        starts.append(round(t))
                        methods.append('P2')
                        break
            if len(starts) > idx:
                continue

        # ─── P3: From announcement, work backwards ───
        if q_start in ann_map:
            ann_time = ann_map[q_start]
            content_dur = typical_content[sec_type]
            estimated = round(ann_time - content_dur)
            if estimated > (starts[-1] + 25 if idx > 0 else 0):
                starts.append(estimated)
                methods.append('P3')
                continue

        # ─── P4: Forward propagation from previous section's last question ───
        if idx > 0:
            prev_q_start_range = SECTION_DEFS[idx - 1][0]
            prev_q_end_range = SECTION_DEFS[idx - 1][1]
            prev_last_q_time = None
            for qn in range(prev_q_end_range, prev_q_start_range - 1, -1):
                if qn in question_markers:
                    prev_last_q_time = question_markers[qn]['time']
                    break

            if prev_last_q_time is not None:
                q_end_time = prev_last_q_time + avg_q_dur
                extra = 0
                if has_directions:
                    if idx == 3:  # SecB-1: Section B directions
                        extra = 20
                    elif idx == 5:  # SecC-1: Section C directions
                        extra = 22
                estimated = round(q_end_time + 3 + extra)
                if estimated > starts[-1] + 25:
                    starts.append(estimated)
                    methods.append('P4')
                    continue

        # ─── P5: Fallback ───
        fallback_gaps = [105, 100, 120, 130, 115, 125, 120, 110]
        if starts:
            starts.append(starts[-1] + fallback_gaps[idx])
        else:
            # First section with no data — use intro_end or default
            intro = direction_markers.get('intro_end')
            starts.append(intro if intro else 30)
        methods.append('P5')

    # Ensure monotonic and reasonable gaps
    for i in range(1, len(starts)):
        if starts[i] <= starts[i - 1]:
            starts[i] = starts[i - 1] + 80
        elif starts[i] - starts[i - 1] < 50:  # Too close
            starts[i] = starts[i - 1] + 80

    # Post-process: for corrupted long audio files, cap boundaries to first exam
    if max_valid_time is not None:
        for i in range(len(starts)):
            if starts[i] > max_valid_time:
                # Use standard gaps from the last valid boundary
                fallback_gaps = [0, 105, 100, 120, 130, 115, 125, 120]
                base = starts[i - 1] if i > 0 else max_valid_time - 1400
                starts[i] = base + fallback_gaps[i]
                methods[i] = 'P5'

    boundaries = {'duration': duration}
    for idx, key in enumerate(SEC_KEYS):
        boundaries[key] = starts[idx]

    # Add methods to output for debugging
    boundaries['_methods'] = dict(zip(SEC_KEYS, methods))

    return boundaries


def verify_audio_set_mapping(transcript_path, boundaries):
    """Verify that the audio content matches the expected exam set."""
    # This is a lightweight check - we look at the first content marker's
    # position and verify it's in a reasonable place for the expected set
    issues = []

    # Check if secA1 is too late (should be < 60s)
    if boundaries.get('secA1', 999) > 60:
        issues.append(f"secA1={boundaries['secA1']}s is late (expected <60s)")

    # Check section ordering
    keys_in_order = list(boundaries.keys())
    times_in_order = [boundaries[k] for k in SEC_KEYS if k in boundaries]
    for i in range(1, len(times_in_order)):
        if times_in_order[i] <= times_in_order[i-1]:
            issues.append(f"Non-monotonic at index {i}: {times_in_order[i-1]} -> {times_in_order[i]}")

    return issues


def main():
    transcript_files = sorted(TRANSCRIPTS_DIR.glob('*.json'))

    if len(sys.argv) > 1:
        transcript_files = [f for f in transcript_files if sys.argv[1] in f.stem]

    if not transcript_files:
        print('No transcript files found')
        return

    print(f'Processing {len(transcript_files)} file(s)\n')

    results = {}
    if OUT_PATH.exists():
        try:
            results = json.loads(OUT_PATH.read_text(encoding='utf-8'))
        except Exception:
            pass

    summary = []
    for tf in transcript_files:
        print(f'=== {tf.stem} ===')
        boundaries = find_boundaries_v3(tf)
        if boundaries:
            methods = boundaries.pop('_methods', {})
            results[tf.stem] = boundaries
            gaps = [boundaries[SEC_KEYS[i]] - boundaries[SEC_KEYS[i - 1]] for i in range(1, 8)]
            p1_count = sum(1 for m in methods.values() if m in ('P1', 'P1?', 'P2'))
            print(f'  Result: {", ".join(f"{k}={boundaries[k]}" for k in SEC_KEYS)}')
            method_str = ', '.join(f'{k}={methods.get(k, "?")}' for k in SEC_KEYS)
            print(f'  Methods: {method_str}')
            print(f'  P1/P2: {p1_count}/8 direct, Gaps: {gaps}')
            summary.append((tf.stem, p1_count, gaps))
        else:
            print(f'  FAILED')
        print()

    with open(OUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f'Saved to: {OUT_PATH}')
    print(f'Success: {len(results)}/{len(transcript_files)} files')

    # Print summary
    print(f'\n=== Summary ===')
    print(f'{"File":<20} {"Direct":>7} {"Gaps"}')
    print('-' * 60)
    for name, p1, gaps in summary:
        gap_str = ', '.join(f'{g:>3}' for g in gaps)
        print(f'{name:<20} {p1:>4}/8   [{gap_str}]')


if __name__ == '__main__':
    main()
