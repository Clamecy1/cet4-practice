"""
Transcribe all CET-4 audio files with word-level timestamps using openai-whisper.
Output: scripts/transcripts/{filename}.json with list of {word, start, end}
"""
import whisper
import json
import os
import sys
from pathlib import Path

AUDIO_DIR = Path(__file__).parent.parent / 'public' / 'audio'
OUT_DIR = Path(__file__).parent / 'transcripts'
MODEL_NAME = 'base.en'  # Use base.en for English CET-4 audio

def transcribe_file(model, audio_path: Path, out_path: Path):
    """Transcribe a single audio file with word timestamps."""
    if out_path.exists():
        print(f'  SKIP: {out_path.name} already exists')
        with open(out_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return data

    print(f'  Transcribing: {audio_path.name}...')
    result = model.transcribe(
        str(audio_path),
        word_timestamps=True,
        task='transcribe',
        language='en',
        fp16=False,  # Use FP32 on CPU for stability
        verbose=False,
    )

    # Extract word-level segments
    words = []
    for segment in result.get('segments', []):
        for word_info in segment.get('words', []):
            words.append({
                'word': word_info['word'].strip(),
                'start': round(word_info['start'], 2),
                'end': round(word_info['end'], 2),
            })

    # Save
    data = {
        'audio_file': audio_path.name,
        'duration': round(result.get('segments', [{}])[-1].get('end', 0), 2) if result.get('segments') else 0,
        'words': words,
        'text': result.get('text', ''),
    }

    os.makedirs(out_path.parent, exist_ok=True)
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'  Done: {len(words)} words, {data["duration"]:.0f}s')
    return data


def main():
    # Get audio files
    audio_files = sorted(AUDIO_DIR.glob('*.mp3'))

    # Allow filtering specific files
    if len(sys.argv) > 1:
        filter_pattern = sys.argv[1]
        audio_files = [f for f in audio_files if filter_pattern in f.name]

    if not audio_files:
        print(f'No audio files found in {AUDIO_DIR}')
        return

    print(f'Found {len(audio_files)} audio file(s) to transcribe')
    print(f'Loading whisper model: {MODEL_NAME}...')
    model = whisper.load_model(MODEL_NAME)
    print('Model loaded.\n')

    os.makedirs(OUT_DIR, exist_ok=True)

    for af in audio_files:
        out_path = OUT_DIR / f'{af.stem}.json'
        try:
            transcribe_file(model, af, out_path)
        except Exception as e:
            print(f'  ERROR: {e}')
            continue

    print(f'\nAll done. Transcripts saved to: {OUT_DIR}')


if __name__ == '__main__':
    main()
