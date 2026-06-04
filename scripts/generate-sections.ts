// scripts/generate-sections.ts
// Generate sections.ts entries from structured data
// Usage: npx tsx scripts/generate-sections.ts

// This script reads structured JSON data files and generates TypeScript code

import * as fs from 'fs';

interface SubQ {
  id: string;
  question: string;
  options: string[];
  answer: string;
}

interface SectionInput {
  id: string;
  year: number;
  month: number;
  setNumber: number;
  label: string;
  audioStart: number;
  transcript: string;
  questions: SubQ[];
}

function generateSectionEntry(s: SectionInput): string {
  const q = s.questions.map(qq => {
    const opts = qq.options.map(o => `'${o.replace(/'/g, "\\'")}'`).join(', ');
    return `      { id: '${qq.id}', question: '${qq.question.replace(/'/g, "\\'")}', options: [${opts}], answer: '${qq.answer}' },`;
  }).join('\n');

  const monthStr = String(s.month).padStart(2, '0');

  return `  {
    id: '${s.id}', year: ${s.year}, month: ${s.month}, setNumber: ${s.setNumber},
    label: '${s.label}',
    audioSrc: '/audio/${s.year}-${monthStr}-S${s.setNumber}.mp3', audioStart: ${s.audioStart},
    transcript: \`${s.transcript}\`,
    questions: [
${q}
    ],
  },`;
}

// If called directly, load data file and output sections
const args = process.argv.slice(2);
if (args.length > 0) {
  const dataFile = args[0];
  const data: SectionInput[] = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  for (const s of data) {
    console.log(generateSectionEntry(s));
  }
} else {
  console.log('Usage: npx tsx scripts/generate-sections.ts <data.json>');
}
