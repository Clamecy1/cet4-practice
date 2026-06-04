// 从 2025 答案解析 PDF 提取听力转录文本
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'C:\\Users\\Administrator\\Desktop\\1.大学英语CET4-历年真题\\01四级历年真题及答案解析+听力音频';

function findAnswerPdf(year, month, setNum) {
  const dirName = `${year}年${String(month).padStart(2,'0')}月CET4题+解+音频【新】`;
  const examDir = path.join(BASE, dirName);

  // 答案解析可能在 examDir/02、答案解析/ 或直接在 examDir/
  const subDir = path.join(examDir, '02、答案解析');
  let searchDir = fs.existsSync(subDir) ? subDir : examDir;

  if (!fs.existsSync(searchDir)) return null;

  const files = fs.readdirSync(searchDir);
  const CH = ['零','一','二','三','四','五','六'];
  for (const f of files) {
    if (!f.endsWith('.pdf')) continue;
    for (const p of [`第${setNum}套`, `解析第${setNum}套`, `解析${setNum}`]) {
      if (f.includes(p)) return path.join(searchDir, f);
    }
  }
  return null;
}

// 从答案解析 PDF 提取 "听力原文" 或 "录音原文" 部分
function extractTranscript(pdfPath) {
  try {
    const text = execSync(`pdftotext -layout "${pdfPath}" -`, { encoding: 'utf-8', timeout: 30000 });

    // 查找听力原文标记
    const markers = ['听力原文', '录音原文', 'Script', 'Tapescript', '听力文本', '录音材料'];
    let bestIdx = -1;
    let bestMarker = '';

    for (const marker of markers) {
      const idx = text.indexOf(marker);
      if (idx >= 0 && (bestIdx < 0 || idx < bestIdx)) {
        bestIdx = idx;
        bestMarker = marker;
      }
    }

    if (bestIdx < 0) {
      // Try Section A directions as marker
      const sectionA = text.search(/Section\s+A\s*\n\s*Directions/);
      if (sectionA >= 0) {
        // Check if there's transcript-like content nearby (conversation format M: / W:)
        const nearby = text.slice(sectionA, sectionA + 5000);
        if (/[MW]:\s/.test(nearby)) {
          bestIdx = sectionA;
          bestMarker = 'Section A (inferred)';
        }
      }
    }

    if (bestIdx < 0) {
      return { found: false, reason: 'No transcript marker found' };
    }

    return { found: true, text: text.slice(bestIdx), marker: bestMarker, fullText: text };
  } catch (e) {
    return { found: false, reason: e.message };
  }
}

const args = process.argv.slice(2);
const year = parseInt(args[0]);
const month = parseInt(args[1]);
const setNum = parseInt(args[2] || '1');

if (!year || !month) {
  console.log('用法: node scripts/extract-transcript.cjs <year> <month> <set>');
  process.exit(1);
}

console.log(`\n=== ${year}年${month}月 第${setNum}套 听力原文提取 ===\n`);

const pdfPath = findAnswerPdf(year, month, setNum);
if (!pdfPath) {
  console.log('未找到答案解析 PDF');
  process.exit(1);
}
console.log('PDF:', path.basename(pdfPath));

const result = extractTranscript(pdfPath);
if (!result.found) {
  console.log('未能找到听力原文:', result.reason);
  // Debug: show surrounding text
  console.log('\nPDF前1000字符:');
  console.log(result.fullText ? result.fullText.slice(0, 1000) : 'N/A');
  process.exit(1);
}

console.log('找到标记:', result.marker);
console.log('\n--- 听力原文 (前2000字符) ---');
console.log(result.text.slice(0, 2000));
console.log('\n--- 听力原文 (末尾500字符) ---');
console.log(result.text.slice(-500));
