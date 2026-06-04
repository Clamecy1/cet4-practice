/**
 * CET-4 Audio Section Boundary Verification Tool
 *
 * Usage: node scripts/verify-boundaries.cjs <year> <month> <set>
 * Example: node scripts/verify-boundaries.cjs 2024 6 1
 *
 * Shows the current section boundaries with text context from whisper
 * transcript so you can verify without listening to the entire audio.
 * Also allows interactive adjustment of boundaries.
 */
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const TRANSCRIPTS_DIR = path.join(__dirname, 'transcripts');
const CALIB_PATH = path.join(__dirname, '..', 'audio-calibration-v2.json');
const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

const SEC_NAMES = [
  'SecA-1 (News 1, Q1-2)',
  'SecA-2 (News 2, Q3-4)',
  'SecA-3 (News 3, Q5-7)',
  'SecB-1 (Conv 1, Q8-11)',
  'SecB-2 (Conv 2, Q12-15)',
  'SecC-1 (Pass 1, Q16-18)',
  'SecC-2 (Pass 2, Q19-21)',
  'SecC-3 (Pass 3, Q22-25)',
];

const SEC_KEYS = ['secA1', 'secA2', 'secA3', 'secB1', 'secB2', 'secC1', 'secC2', 'secC3'];

function getCalibration() {
  if (fs.existsSync(CALIB_PATH)) {
    return JSON.parse(fs.readFileSync(CALIB_PATH, 'utf-8'));
  }
  return {};
}

function saveCalibration(data) {
  fs.writeFileSync(CALIB_PATH, JSON.stringify(data, null, 2));
  console.log(`\nSaved to: ${CALIB_PATH}`);
}

function getTranscript(audioKey) {
  const transPath = path.join(TRANSCRIPTS_DIR, `${audioKey}.json`);
  if (!fs.existsSync(transPath)) return null;
  return JSON.parse(fs.readFileSync(transPath, 'utf-8'));
}

function getTextAround(words, time, windowBefore = 10, windowAfter = 60) {
  const nearby = words.filter(w => w.start >= time - windowBefore && w.start <= time + windowAfter);
  return nearby.map(w => {
    const ts = `[${w.start.toFixed(1)}s]`;
    return `${ts} ${w.word}`;
  }).join(' ');
}

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.log('Usage: node scripts/verify-boundaries.cjs <year> <month> <set>');
    console.log('  Example: node scripts/verify-boundaries.cjs 2024 6 1');
    console.log('');
    console.log('Options:');
    console.log('  --play     Also play the audio at each section');
    console.log('  --edit     Interactive boundary editing');
    process.exit(1);
  }

  const [year, month, setNum] = args;
  const audioKey = `${year}-${String(month).padStart(2, '0')}-S${setNum}`;
  const audioFile = path.join(AUDIO_DIR, `${audioKey}.mp3`);

  // Check audio exists
  if (!fs.existsSync(audioFile)) {
    console.error(`Audio file not found: ${audioFile}`);
    console.log('Available files:');
    fs.readdirSync(AUDIO_DIR).filter(f => f.endsWith('.mp3')).forEach(f => console.log(`  ${f}`));
    process.exit(1);
  }

  // Get calibration
  const cal = getCalibration();
  const boundaries = cal[audioKey];

  // Show current state
  console.log(`\n=== Section Boundaries: ${audioKey} ===\n`);

  if (boundaries) {
    console.log('Current calibration:\n');
    for (let i = 0; i < 8; i++) {
      const key = SEC_KEYS[i];
      console.log(`  ${SEC_NAMES[i]}: ${boundaries[key]}s (${formatTime(boundaries[key])})`);
    }
    console.log(`  Duration: ${boundaries.duration?.toFixed(0) || '?'}s\n`);

    // Show gaps
    console.log('Gaps between sections:');
    for (let i = 1; i < 8; i++) {
      const gap = boundaries[SEC_KEYS[i]] - boundaries[SEC_KEYS[i-1]];
      console.log(`  ${SEC_NAMES[i-1].split('(')[0].trim()} → ${SEC_NAMES[i].split('(')[0].trim()}: ${gap}s`);
    }
  } else {
    console.log('No calibration data yet. Run find_boundaries.py first.\n');
  }

  // Show whisper transcript context for each section
  const transcript = getTranscript(audioKey);
  if (transcript && transcript.words) {
    console.log('\n=== Transcript Context (verify boundaries) ===\n');

    const starts = boundaries ? SEC_KEYS.map(k => boundaries[k]) : [];
    for (let i = 0; i < 8; i++) {
      const t = starts[i] || 0;
      console.log(`--- ${SEC_NAMES[i]} @ ~${t}s (${formatTime(t)}) ---`);
      const context = getTextAround(transcript.words, t, 3, 30);
      console.log(context.slice(0, 300));
      console.log();
    }
  } else {
    console.log('\nNo whisper transcript found. Run: python scripts/transcribe_segments.py');
    console.log(`Transcript would be at: ${path.join(TRANSCRIPTS_DIR, `${audioKey}.json`)}`);
  }

  // Show instructions
  console.log('\n=== How to verify ===');
  console.log('1. Listen to the audio file:');
  console.log(`   ${audioFile}`);
  console.log('2. For each section, note the time when the news/conversation/passage CONTENT starts');
  console.log('   (NOT when directions or questions start)');
  console.log('3. The section includes: content + question announcement + option reading');
  console.log('4. Update audio-calibration-v2.json with the correct times\n');

  // Option: open audio file
  console.log('Opening audio file...');
  try {
    execSync(`start "" "${audioFile}"`, { shell: true, timeout: 3000 });
  } catch (e) {
    // Ignore if can't open
  }
}

main().catch(console.error);
