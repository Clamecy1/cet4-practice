// 读取 transcription JSON 结果，更新 sections.ts 中的 transcript 字段
const fs = require('fs');
const path = require('path');

const RESULTS_PATH = path.join(__dirname, '..', 'transcribe-results.json');
const SECTIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'sections.ts');

if (!fs.existsSync(RESULTS_PATH)) {
  console.error(`Results file not found: ${RESULTS_PATH}`);
  console.error('Run scripts/transcribe-all.sh first');
  process.exit(1);
}

const raw = JSON.parse(fs.readFileSync(RESULTS_PATH, 'utf-8'));
const results = raw.results || raw;
let sectionsContent = fs.readFileSync(SECTIONS_PATH, 'utf-8');

let updated = 0;
let failed = 0;

for (const [secId, transcript] of Object.entries(results)) {
  if (!transcript || transcript.startsWith('[')) {
    console.log(`SKIP ${secId}: ${transcript}`);
    failed++;
    continue;
  }

  // 在 sections.ts 中查找并替换该 section 的 transcript
  // 匹配模式: id: 'SEC_ID', ... transcript: `...`,
  const idPattern = `id: '${secId}'`;

  if (!sectionsContent.includes(idPattern)) {
    console.log(`NOT FOUND: ${secId}`);
    failed++;
    continue;
  }

  // 找到该 section 的 transcript 字段并替换
  const sectionStart = sectionsContent.indexOf(idPattern);
  const transcriptStart = sectionsContent.indexOf('transcript:', sectionStart);

  // 支持两种引号: 反引号 `...` 和单引号 '...'
  const backtickIdx = sectionsContent.indexOf('`', transcriptStart);
  const quoteIdx = sectionsContent.indexOf("'", transcriptStart);

  let contentStart, contentEnd, quote;
  if (backtickIdx !== -1 && (quoteIdx === -1 || backtickIdx < quoteIdx)) {
    quote = '`';
    contentStart = backtickIdx + 1;
    contentEnd = sectionsContent.indexOf('`', contentStart);
  } else if (quoteIdx !== -1) {
    quote = "'";
    contentStart = quoteIdx + 1;
    contentEnd = sectionsContent.indexOf("'", contentStart);
  } else {
    console.log(`PARSE ERROR: ${secId}`);
    failed++;
    continue;
  }

  if (contentEnd === -1) {
    console.log(`PARSE ERROR (no end quote): ${secId}`);
    failed++;
    continue;
  }

  // 替换整个 transcript 内容
  const before = sectionsContent.slice(0, contentStart);
  const after = sectionsContent.slice(contentEnd);

  // 转义 transcript 中的引号
  const safeTranscript = transcript
    .replace(/\\/g, '\\\\')
    .replace(new RegExp(quote, 'g'), '\\' + quote);

  sectionsContent = before + safeTranscript + after;

  console.log(`OK ${secId}: ${safeTranscript.slice(0, 80)}...`);
  updated++;
}

// 写回文件
fs.writeFileSync(SECTIONS_PATH, sectionsContent, 'utf-8');

console.log(`\n=== SUMMARY ===`);
console.log(`Updated: ${updated}`);
console.log(`Failed/Skipped: ${failed}`);
console.log(`Total: ${updated + failed}`);
