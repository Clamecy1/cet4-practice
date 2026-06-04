"""
批量转写 CET-4 听力 section 的 transcript。
从 sections.ts 找出所有占位符 section，用 Whisper 从对应音频中提取原文。
"""
import json
import subprocess
import os
import re
import sys

AUDIO_DIR = r'C:\Users\Administrator\cet4-practice\public\audio'
SECTIONS_PATH = r'C:\Users\Administrator\cet4-practice\src\data\sections.ts'

# 需要转写的 section 列表（从 grep 结果）
# 格式: {audio_key: [(section_id, audio_start, label), ...]}
# audio_key 对应 AUDIO_DIR 下的文件名（不含 .mp3）
MISSING = {
    # 2022-12-S2: SecB conversations have partial transcripts, rest missing
    '2022-12-S2': [
        ('2022-12-S2-SecA-1', 0, 'News Report 1'),
        ('2022-12-S2-SecA-2', 100, 'News Report 2'),
        ('2022-12-S2-SecA-3', 210, 'News Report 3'),
        # SecB conversations have partial dialog - keep existing
        ('2022-12-S2-SecC-1', 610, 'Passage 1'),
        ('2022-12-S2-SecC-2', 770, 'Passage 2'),
        ('2022-12-S2-SecC-3', 940, 'Passage 3'),
    ],
    '2025-06-S1': [
        ('2025-06-S1-SecA-1', 0, 'News Report 1'),
        ('2025-06-S1-SecA-2', 100, 'News Report 2'),
        ('2025-06-S1-SecA-3', 210, 'News Report 3'),
        ('2025-06-S1-SecC-1', 610, 'Passage 1'),
        ('2025-06-S1-SecC-2', 770, 'Passage 2'),
        ('2025-06-S1-SecC-3', 940, 'Passage 3'),
    ],
    '2025-06-S2': [
        ('2025-06-S2-SecA-1', 0, 'News Report 1'),
        ('2025-06-S2-SecA-2', 100, 'News Report 2'),
        ('2025-06-S2-SecA-3', 210, 'News Report 3'),
        ('2025-06-S2-SecC-1', 610, 'Passage 1'),
        ('2025-06-S2-SecC-2', 770, 'Passage 2'),
        ('2025-06-S2-SecC-3', 940, 'Passage 3'),
    ],
    '2025-06-S3': [
        ('2025-06-S3-SecA-1', 0, 'News Report 1'),
        ('2025-06-S3-SecA-2', 100, 'News Report 2'),
        ('2025-06-S3-SecA-3', 210, 'News Report 3'),
        ('2025-06-S3-SecC-1', 610, 'Passage 1'),
        ('2025-06-S3-SecC-2', 770, 'Passage 2'),
        ('2025-06-S3-SecC-3', 940, 'Passage 3'),
    ],
    '2025-12-S1': [
        ('2025-12-S1-SecA-1', 0, 'News Report 1'),
        ('2025-12-S1-SecA-2', 100, 'News Report 2'),
        ('2025-12-S1-SecA-3', 210, 'News Report 3'),
        ('2025-12-S1-SecB-1', 330, 'Conversation 1'),
        ('2025-12-S1-SecB-2', 460, 'Conversation 2'),
        ('2025-12-S1-SecC-1', 600, 'Passage 1'),
        ('2025-12-S1-SecC-2', 760, 'Passage 2'),
        ('2025-12-S1-SecC-3', 930, 'Passage 3'),
    ],
    '2025-12-S2': [
        ('2025-12-S2-SecA-1', 0, 'News Report 1'),
        ('2025-12-S2-SecA-2', 100, 'News Report 2'),
        ('2025-12-S2-SecA-3', 210, 'News Report 3'),
        ('2025-12-S2-SecB-1', 330, 'Conversation 1'),
        ('2025-12-S2-SecB-2', 460, 'Conversation 2'),
        ('2025-12-S2-SecC-1', 600, 'Passage 1'),
        ('2025-12-S2-SecC-2', 760, 'Passage 2'),
        ('2025-12-S2-SecC-3', 930, 'Passage 3'),
    ],
    '2025-12-S3': [
        ('2025-12-S3-SecA-1', 0, 'News Report 1'),
        ('2025-12-S3-SecA-2', 100, 'News Report 2'),
        ('2025-12-S3-SecA-3', 210, 'News Report 3'),
        ('2025-12-S3-SecB-1', 330, 'Conversation 1'),
        ('2025-12-S3-SecB-2', 460, 'Conversation 2'),
        ('2025-12-S3-SecC-1', 600, 'Passage 1'),
        ('2025-12-S3-SecC-2', 760, 'Passage 2'),
        ('2025-12-S3-SecC-3', 930, 'Passage 3'),
    ],
}


def transcribe_segment(audio_path, start_sec, duration_sec=180):
    """Extract audio segment and transcribe with whisper."""
    import whisper
    import tempfile

    # Extract segment to temp WAV file
    with tempfile.NamedTemporaryFile(suffix='.wav', delete=False) as tmp:
        tmp_path = tmp.name

    try:
        cmd = [
            'ffmpeg', '-y',
            '-ss', str(start_sec),
            '-t', str(duration_sec),
            '-i', audio_path,
            '-ar', '16000',  # 16kHz for whisper
            '-ac', '1',       # mono
            '-q:a', '0',
            tmp_path
        ]
        subprocess.run(cmd, capture_output=True, check=True, timeout=60)

        # Transcribe
        model = whisper.load_model('base.en')
        result = model.transcribe(tmp_path, language='en', fp16=False)
        return result['text'].strip()

    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


def main():
    if len(sys.argv) < 2:
        print('Usage: python transcribe.py <audio_key> [section_id]')
        print('  audio_key: e.g. 2025-12-S1')
        print('  section_id: e.g. 2025-12-S1-SecA-1 (omit for all)')
        print()
        print('Available keys:')
        for k in MISSING:
            print(f'  {k} ({len(MISSING[k])} sections)')
        return

    audio_key = sys.argv[1]
    if audio_key not in MISSING:
        print(f'Unknown key: {audio_key}')
        return

    audio_path = os.path.join(AUDIO_DIR, f'{audio_key}.mp3')
    if not os.path.exists(audio_path):
        print(f'Audio not found: {audio_path}')
        return

    sections = MISSING[audio_key]
    filter_id = sys.argv[2] if len(sys.argv) > 2 else None

    results = {}
    for sec_id, start, label in sections:
        if filter_id and sec_id != filter_id:
            continue

        print(f'\n=== {sec_id} ({label}) @ {start}s ===')
        try:
            text = transcribe_segment(audio_path, start)
            print(f'  Transcript: {text[:200]}...')
            results[sec_id] = text
        except Exception as e:
            print(f'  ERROR: {e}')
            results[sec_id] = f'[ERROR: {e}]'

    # Output as JSON for use in updating sections.ts
    print('\n=== JSON OUTPUT ===')
    print(json.dumps(results, indent=2, ensure_ascii=False))


if __name__ == '__main__':
    main()
