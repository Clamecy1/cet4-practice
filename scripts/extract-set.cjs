// scripts/extract-set.js
// Extract CET-4 listening section data from Word docx + Answer Key PDF
// Usage: node scripts/extract-set.js <year> <month> <setNumber>
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const BASE = 'C:/Users/Administrator/Desktop/1.大学英语CET4-历年真题/01四级历年真题及答案解析+听力音频';

// Map year/month to directory name
function findDir(year, month) {
  const dirs = fs.readdirSync(BASE);
  const target = dirs.find(d => d.startsWith(`${year}年`) && d.includes(`${String(month).padStart(2, '0')}月`));
  return target ? path.join(BASE, target) : null;
}

// Extract clean English text from PDF (filter >70% ASCII lines, join contiguous blocks)
function extractEnglishFromPDF(pdfPath) {
  try {
    const result = execSync(`pdftotext -layout "${pdfPath}" -`, { encoding: 'utf-8', maxBuffer: 50*1024*1024 });
    const lines = result.split('\n');
    const blocks = [];
    let current = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        if (current.length > 0) { blocks.push(current.join(' ')); current = []; }
        continue;
      }
      let ascii = 0, nonAscii = 0;
      for (const ch of trimmed) {
        if (ch.charCodeAt(0) < 128) ascii++;
        else nonAscii++;
      }
      if (ascii / (ascii + nonAscii) > 0.7) {
        current.push(trimmed);
      } else {
        if (current.length > 0) { blocks.push(current.join(' ')); current = []; }
      }
    }
    if (current.length > 0) blocks.push(current.join(' '));
    return blocks.filter(b => b.length > 80);
  } catch(e) {
    return [];
  }
}

// Extract text from docx
async function extractDocx(docxPath) {
  try {
    const result = await mammoth.extractRawText({ path: docxPath });
    return result.value;
  } catch(e) {
    return '';
  }
}

// Parse the answer key PDF to get section transcripts and answers
function parseAnswerKey(blocks) {
  const sections = [];
  const sectionMarkers = [
    { label: 'Section A — News Report 1', subLabel: 'SecA-1', key: 'Questions 1 and 2' },
    { label: 'Section A — News Report 2', subLabel: 'SecA-2', key: 'Questions 3 and 4' },
    { label: 'Section A — News Report 3', subLabel: 'SecA-3', key: 'Questions 5 to 7' },
    { label: 'Section B — Conversation 1', subLabel: 'SecB-1', key: 'Questions 8 to 11' },
    { label: 'Section B — Conversation 2', subLabel: 'SecB-2', key: 'Questions 12 to 15' },
    { label: 'Section C — Passage 1', subLabel: 'SecC-1', key: 'Questions 16 to 18' },
    { label: 'Section C — Passage 2', subLabel: 'SecC-2', key: 'Questions 19 to 21' },
    { label: 'Section C — Passage 3', subLabel: 'SecC-3', key: 'Questions 22 to 25' },
  ];

  let fullText = blocks.join('\n');

  for (let i = 0; i < sectionMarkers.length; i++) {
    const marker = sectionMarkers[i];
    const nextMarker = i < sectionMarkers.length - 1 ? sectionMarkers[i + 1].key : 'Part III';

    const startIdx = fullText.indexOf(marker.key);
    const endIdx = i < sectionMarkers.length - 1 ?
      fullText.indexOf(sectionMarkers[i + 1].key, startIdx + 50) :
      fullText.indexOf('Part III', startIdx + 50);

    if (startIdx === -1) continue;

    const sectionText = endIdx !== -1 ?
      fullText.substring(startIdx, endIdx) :
      fullText.substring(startIdx);

    // Clean up: remove question lines, page numbers, garbled text
    let transcript = sectionText
      .replace(/\d+\.\s+What\s+.*?\?/g, '') // Remove question stems
      .replace(/Im\s+2021.*?\d+\s+[A-J].*?\d+/g, '') // Remove page markers
      .replace(/gg\s+2021.*?\d+/g, '')
      .replace(/\[9\s+2021.*?\d+/g, '')
      .replace(/[A-D]\)\s*\[ff.*?[A-D]\)\s*\[ff.*?o/gs, '') // Remove garbled answer blocks
      .replace(/\d+\.\s+What\s+[^?]+\?/g, '')
      .replace(/\b(llt|Jlt|JIt|IEJ|Jrl|ffl|fil|fil|ffi|ffi|ffif|ffif)\b/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Extract answer markers (digits in parentheses like (1), (2))
    const answerMarkers = [...sectionText.matchAll(/\((\d+)\)/g)];

    sections.push({
      label: marker.label,
      subLabel: marker.subLabel,
      raw: sectionText,
      transcript: transcript,
      answerMarkers: answerMarkers.map(m => parseInt(m[1])),
    });
  }

  return sections;
}

// Parse the docx to get questions and options
function parseDocxQuestions(docxText) {
  // Find the listening section in the docx
  const listeningStart = docxText.indexOf('Part II');
  const listeningEnd = docxText.indexOf('Part III');
  if (listeningStart === -1) return [];

  const listeningText = listeningEnd !== -1 ?
    docxText.substring(listeningStart, listeningEnd) :
    docxText.substring(listeningStart);

  // Split into question blocks
  const questionBlocks = [];
  const qRegex = /(\d+)\.\s+([A-D]\)[^\n]+)/g;
  let match;

  // Parse questions and options
  const lines = listeningText.split('\n');
  const questions = [];
  let currentQ = null;

  for (const line of lines) {
    const trimmed = line.trim();
    const qMatch = trimmed.match(/^(\d+)\.\s+([A-D]\).*)/);
    if (qMatch) {
      const qNum = parseInt(qMatch[1]);
      if (!currentQ || currentQ.num !== qNum) {
        if (currentQ) questions.push(currentQ);
        currentQ = { num: qNum, options: [] };
      }
      currentQ.options.push(qMatch[2].trim());
    }
  }
  if (currentQ) questions.push(currentQ);

  return questions;
}

// Get question stems from answer key blocks
function extractQuestionStems(blocks) {
  const stems = [];
  for (const block of blocks) {
    const match = block.match(/(\d+)\.\s+(What\s+.*?\?|Why\s+.*?\?|How\s+.*?\?|Who\s+.*?\?|Where\s+.*?\?|When\s+.*?\?)/g);
    if (match) {
      for (const m of match) {
        stems.push(m.trim());
      }
    }
  }
  return stems;
}

// Main
async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.log('Usage: node scripts/extract-set.js <year> <month> <setNumber>');
    console.log('Example: node scripts/extract-set.js 2021 6 1');
    process.exit(1);
  }

  const year = parseInt(args[0]);
  const month = parseInt(args[1]);
  const set = parseInt(args[2]);

  const dir = findDir(year, month);
  if (!dir) {
    console.error(`Directory not found for ${year}-${month}`);
    process.exit(1);
  }

  console.log(`=== Extracting ${year}-${String(month).padStart(2, '0')}-S${set} ===`);
  console.log(`Source dir: ${dir}`);

  // Find docx
  const docxDir = path.join(dir, fs.readdirSync(dir).find(d => d.includes('word') || d.includes('Word')) || '');
  const docxFiles = fs.readdirSync(docxDir).filter(f => f.endsWith('.docx') || f.endsWith('.doc'));
  const targetDocx = docxFiles.find(f => f.includes(`第${set}套`));

  // Find answer key PDF
  const answerDir = path.join(dir, fs.readdirSync(dir).find(d => d.includes('答案') || d.includes('解析')) || '');
  const answerFiles = fs.readdirSync(answerDir).filter(f => f.endsWith('.pdf'));
  const targetAnswer = answerFiles.find(f => f.includes(`第${set}套`) || f.includes(`第${['一','二','三'][set-1]}套`));

  // Find audio
  const audioDir = path.join(dir, fs.readdirSync(dir).find(d => d.includes('音频') || d.includes('听力')) || '');

  if (targetDocx) {
    console.log(`\n--- DOCX ---`);
    console.log(`File: ${path.join(docxDir, targetDocx)}`);
    const docxText = await extractDocx(path.join(docxDir, targetDocx));

    // Print translation section
    const transIdx = docxText.indexOf('Part IV');
    if (transIdx !== -1) {
      console.log(`\n--- TRANSLATION ---`);
      console.log(docxText.substring(transIdx, transIdx + 1500));
    }
  }

  if (targetAnswer) {
    console.log(`\n--- ANSWER KEY ---`);
    console.log(`File: ${path.join(answerDir, targetAnswer)}`);
    const blocks = extractEnglishFromPDF(path.join(answerDir, targetAnswer));

    // Print English transcript blocks (filtered)
    console.log(`\n--- ENGLISH TRANSCRIPT BLOCKS ---`);
    const transcriptBlocks = blocks.filter(b =>
      b.length > 100 &&
      !b.includes('Part I') &&
      !b.includes('Writing') &&
      !b.includes('Reading Comprehension') &&
      !b.includes('Section B') &&
      !b.includes('Section C') &&
      !b.startsWith('[') &&
      !b.includes('ffi') &&
      !b.includes('ffl')
    );
    for (const block of transcriptBlocks) {
      console.log(`\n---`);
      console.log(block.substring(0, 2000));
    }
  }

  // Print audio files found
  if (fs.existsSync(audioDir)) {
    console.log(`\n--- AUDIO FILES ---`);
    const audioFiles = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3') || f.endsWith('.MP3'));
    for (const f of audioFiles) {
      const stat = fs.statSync(path.join(audioDir, f));
      console.log(`  ${f} (${(stat.size/1024/1024).toFixed(1)} MB)`);
    }
  }
}

main().catch(console.error);
