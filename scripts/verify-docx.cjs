// sections.ts 数据与源 docx+答案解析对比验证
// 用法: node scripts/verify-docx.cjs <year> <month> <set>
// 示例: node scripts/verify-docx.cjs 2022 6 1

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'C:\\Users\\Administrator\\Desktop\\1.大学英语CET4-历年真题\\01四级历年真题及答案解析+听力音频';

const CHINESE_NUM = ['', '一', '二', '三', '四', '五', '六'];

function findDocx(year, month, setNum) {
  const dir = path.join(BASE, `${year}年${String(month).padStart(2,'0')}月CET4题+解+音频`, '02、真题word版');
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith('.docx')) continue;
    // 匹配各种文件名格式: 第1套 / 第一套 / 第 1 套
    const patterns = [
      `第${setNum}套`,
      `第${CHINESE_NUM[setNum]}套`,
      `第 ${setNum} 套`,
      `卷${setNum}`,
      `${setNum}套`,
    ];
    for (const p of patterns) {
      if (f.includes(p)) return path.join(dir, f);
    }
  }
  // 模糊匹配: 文件名中有"第*套"且包含年份
  for (const f of files) {
    if (!f.endsWith('.docx')) continue;
    const match = f.match(/第[\s]*(.)[\s]*套/);
    if (match) {
      const idx = ['零','一','二','三','四','五','六'].indexOf(match[1]);
      const num = idx > 0 ? idx : parseInt(match[1]);
      if (num === setNum) return path.join(dir, f);
    }
  }
  return null;
}

function findAnswerKey(year, month, setNum) {
  const dir = path.join(BASE, `${year}年${String(month).padStart(2,'0')}月CET4题+解+音频`, '03、答案解析');
  if (!fs.existsSync(dir)) return null;
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith('.pdf')) continue;
    const patterns = [`第${setNum}套`, `第${CHINESE_NUM[setNum]}套`, `解析${setNum}`];
    for (const p of patterns) {
      if (f.includes(p)) return path.join(dir, f);
    }
  }
  // 模糊匹配
  for (const f of files) {
    if (!f.endsWith('.pdf')) continue;
    const match = f.match(/第[\s]*(.)[\s]*套/);
    if (match) {
      const idx = ['零','一','二','三','四','五','六'].indexOf(match[1]);
      const num = idx > 0 ? idx : parseInt(match[1]);
      if (num === setNum) return path.join(dir, f);
    }
  }
  return null;
}

async function extractDocxText(docxPath) {
  const mammoth = require('mammoth');
  const result = await mammoth.extractRawText({ path: docxPath });
  return result.value;
}

function extractPdfText(pdfPath) {
  try {
    return execSync(`pdftotext -layout "${pdfPath}" -`, { encoding: 'utf-8', timeout: 30000 });
  } catch (e) {
    return `[PDF extraction failed: ${e.message}]`;
  }
}

// 从 docx 文本中提取听力选项 (Q1-Q25)
// CET docx 格式：选项排列为两栏
//   行1: "1. A) xxx\tC) xxx"
//   行2: "B) xxx\tD) xxx"
// 或单栏:
//   行1: "1. A) xxx"
//   行2: "B) xxx"
function parseDocxOptions(text) {
  // 找到听力部分
  const part2Idx = text.search(/Part\s*II|Part\s*Ⅱ/i);
  const part3Idx = text.search(/Part\s*III|Part\s*Ⅲ/i);
  const listeningText = part2Idx >= 0
    ? text.slice(part2Idx, part3Idx > part2Idx ? part3Idx : undefined)
    : text;

  const questions = {};
  let currentQNum = 0;

  // 将所有行的内容展开（处理tab分隔的两栏）
  const allLines = [];
  const rawLines = listeningText.split(/\r?\n/);
  for (const line of rawLines) {
    const trimmed = line.trim();
    if (!trimmed) { allLines.push(''); continue; }
    // 将tab分隔的部分拆成独立行处理
    const parts = trimmed.split(/\t\s*/);
    for (const part of parts) {
      allLines.push(part.trim());
    }
  }

  for (let i = 0; i < allLines.length; i++) {
    const line = allLines[i];

    // 匹配 "N. X) text" 格式（编号+选项）
    const numberedOpt = line.match(/^(\d+)[.)]\s+([A-D])\)\s*(.+)/);
    // 匹配纯选项 "X) text" 格式（无编号，续前行）
    const plainOpt = line.match(/^([A-D])\)\s*(.+)/);

    if (numberedOpt) {
      currentQNum = parseInt(numberedOpt[1]);
      const letter = numberedOpt[2];
      let optText = numberedOpt[3].replace(/\s+/g, ' ').trim();

      // 后续行可能续接此选项文本
      while (i + 1 < allLines.length) {
        const next = allLines[i + 1];
        if (!next || /^\d+[.)]\s+[A-D]\)/.test(next) || /^[A-D]\)/.test(next) || /^Questions?\s+\d/.test(next) || /^Section\s/i.test(next) || /^Part\s/i.test(next)) break;
        optText += ' ' + next.replace(/\s+/g, ' ').trim();
        i++;
      }

      if (!questions[currentQNum]) questions[currentQNum] = { num: currentQNum, options: {} };
      questions[currentQNum].options[letter] = optText;
    } else if (plainOpt && currentQNum > 0) {
      // 属于当前题目的后续选项
      const letter = plainOpt[1];
      let optText = plainOpt[2].replace(/\s+/g, ' ').trim();

      while (i + 1 < allLines.length) {
        const next = allLines[i + 1];
        if (!next || /^\d+[.)]\s+[A-D]\)/.test(next) || /^[A-D]\)/.test(next) || /^Questions?\s+\d/.test(next) || /^Section\s/i.test(next) || /^Part\s/i.test(next)) break;
        optText += ' ' + next.replace(/\s+/g, ' ').trim();
        i++;
      }

      if (!questions[currentQNum]) questions[currentQNum] = { num: currentQNum, options: {} };
      questions[currentQNum].options[letter] = optText;
    }
  }

  return questions;
}

// 从答案解析 PDF 中提取正确答案
function parseAnswerKey(text) {
  const answers = {};

  // 听力部分专有答案区域 (通常有 "听力" 或 "Listening" 标题)
  // 常见格式: "1-5: A B C D A"  或  "1-5  ABCDA"
  // 或逐行: "1. A  2. B  3. C ..."

  // 模式1: 范围答案 "1-8 BADCB CDA"
  const rangePattern = /(\d+)\s*[-~至到]\s*(\d+)[^A-D]*?([A-D\s]{5,})/g;
  let match;
  while ((match = rangePattern.exec(text)) !== null) {
    const start = parseInt(match[1]);
    const letters = match[3].replace(/\s+/g, '').split('');
    for (let j = 0; j < letters.length; j++) {
      if (/^[A-D]$/.test(letters[j])) {
        answers[start + j] = letters[j];
      }
    }
  }

  // 模式2: "Part II Listening" 后的答案块
  const listenIdx = text.search(/听力|Listening|Part.*II/i);
  if (listenIdx >= 0) {
    const nearby = text.slice(listenIdx, listenIdx + 3000);
    // "1. A" "2. B" 等
    const singleRe = /(\d+)[.\s]+([A-D])(?:\s|$)/g;
    let m;
    while ((m = singleRe.exec(nearby)) !== null) {
      const num = parseInt(m[1]);
      if (num >= 1 && num <= 35 && !answers[num]) {
        answers[num] = m[2];
      }
    }
  }

  // 模式3: 全文搜索 "答案速查" 或 "参考答案" 或 "key"
  if (Object.keys(answers).length < 20) {
    const keySection = text.match(/(?:答案速查|参考答案|答案|Key|Answer)[\s\S]*?(?:\n\n|\n\s*\n|$)/i);
    if (keySection) {
      const singleRe = /(\d+)[.\s]+([A-D])(?:\s|$)/g;
      let m;
      while ((m = singleRe.exec(keySection[0])) !== null) {
        const num = parseInt(m[1]);
        if (num >= 1 && num <= 35 && !answers[num]) {
          answers[num] = m[2];
        }
      }
    }
  }

  // 模式4: 全篇扫答案块 "1-25"
  if (Object.keys(answers).length < 20) {
    // 找到形如 "1~25" 的行，后面跟一串字母
    const bigRange = text.match(/(\d+)\s*[-~至到]\s*(\d+)\s*\n?\s*([A-D\s]{10,})/g);
    if (bigRange) {
      for (const range of bigRange) {
        const rm = range.match(/(\d+)\s*[-~至到]\s*(\d+)/);
        if (rm) {
          const start = parseInt(rm[1]);
          const letters = range.replace(/[^A-D]/g, '');
          for (let j = 0; j < letters.length; j++) {
            answers[start + j] = letters[j];
          }
        }
      }
    }
  }

  return answers;
}

// 提取 sections.ts 中指定考次的题目数据
function extractOurData(filePath, year, month, setNum) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const prefix = `${year}-${String(month).padStart(2,'0')}-S${setNum}-`;

  const questions = {};
  // 匹配每个 section 的 questions 数组
  const secRegex = new RegExp(`${prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}Sec[A-C]-\\d[\\s\\S]*?questions:\\s*\\[([\\s\\S]*?)\\],?\\s*\\}`, 'g');
  let secMatch;
  while ((secMatch = secRegex.exec(content)) !== null) {
    const qBlock = secMatch[1];
    // 匹配单个题目
    const qRegex = /\{\s*id:\s*'([^']+)',\s*question:\s*'([^']*)',\s*options:\s*\[([^\]]+)\],\s*answer:\s*'([A-D])'\s*\}/g;
    let qMatch;
    while ((qMatch = qRegex.exec(qBlock)) !== null) {
      const id = qMatch[1];
      const qNumMatch = id.match(/Q(\d+)$/);
      if (!qNumMatch) continue;
      const qNum = parseInt(qNumMatch[1]);

      // 解析选项
      const optStr = qMatch[3];
      const options = {};
      const optRegex = /'([A-D])\)\s*(.+?)'/g;
      let oMatch;
      while ((oMatch = optRegex.exec(optStr)) !== null) {
        options[oMatch[1]] = oMatch[2].trim();
      }

      questions[qNum] = {
        id,
        question: qMatch[2],
        options,
        answer: qMatch[4],
      };
    }
  }

  return questions;
}

async function main() {
  const args = process.argv.slice(2);
  const year = parseInt(args[0]);
  const month = parseInt(args[1]);
  const setNum = parseInt(args[2]) || 1;

  if (!year || !month) {
    console.log('用法: node scripts/verify-docx.cjs <year> <month> [set]');
    process.exit(1);
  }

  console.log(`\n=== 验证 ${year}年${month}月 第${setNum}套 ===\n`);

  // 找源文件
  const docxPath = findDocx(year, month, setNum);
  if (!docxPath) {
    console.error('未找到 docx 文件');
    process.exit(1);
  }
  console.log(`Docx: ${path.basename(docxPath)}`);

  const answerPath = findAnswerKey(year, month, setNum);
  if (answerPath) {
    console.log(`答案: ${path.basename(answerPath)}`);
  } else {
    console.log('(未找到答案解析 PDF)');
  }

  // 提取 docx 文本
  console.log('\n正在提取 docx...');
  const docxText = await extractDocxText(docxPath);

  // 调试：输出 Part 结构
  const parts = [];
  let m;
  const partRe = /Part\s+(I+|[ⅠⅡⅢⅣ]+)/gi;
  while ((m = partRe.exec(docxText)) !== null) {
    parts.push({ part: m[0], index: m.index });
  }
  console.log('文档 Part 结构:');
  for (const p of parts.slice(0, 10)) {
    console.log(`  ${p.part} at position ${p.index}`);
  }

  // 输出 Part II 附近的前 30 行
  const iiIdx = docxText.search(/Part\s*(II|Ⅱ)/i);
  if (iiIdx >= 0) {
    const nearby = docxText.slice(iiIdx, iiIdx + 2000);
    const lines = nearby.split(/\r?\n/);
    console.log('\nPart II 附近文本:');
    for (let i = 0; i < Math.min(30, lines.length); i++) {
      console.log(`${i}: [${lines[i].replace(/\t/g, '\\t')}]`);
    }
  }
  const docxQuestions = parseDocxOptions(docxText);
  console.log(`从 docx 提取到 ${Object.keys(docxQuestions).length} 道题目的选项`);

  // 提取答案
  let answerKey = {};
  if (answerPath) {
    console.log('正在提取答案 PDF...');
    const pdfText = extractPdfText(answerPath);
    console.log('\n--- 答案 PDF 原始文本 (前2000字符) ---');
    console.log(pdfText.slice(0, 2000));
    console.log('--- (结束) ---\n');
    answerKey = parseAnswerKey(pdfText);
    console.log(`从答案 PDF 提取到 ${Object.keys(answerKey).length} 个答案`);
    if (Object.keys(answerKey).length > 0) {
      console.log('答案:', Object.entries(answerKey).sort((a,b)=>parseInt(a[0])-parseInt(b[0])).map(([k,v])=>`${k}=${v}`).join(', '));
    }
  }

  // 提取我们的数据
  const ourData = extractOurData(
    path.join(__dirname, '..', 'src', 'data', 'sections.ts'),
    year, month, setNum
  );
  console.log(`从 sections.ts 提取到 ${Object.keys(ourData).length} 道题目`);

  // === 对比 ===
  console.log('\n--- 选项对比 (docx vs 我们的数据) ---');
  let mismatches = 0;

  for (let qNum = 1; qNum <= 25; qNum++) {
    const docxQ = docxQuestions[qNum];
    const ourQ = ourData[qNum];

    if (!docxQ && !ourQ) continue;

    if (!docxQ && ourQ) {
      console.log(`Q${qNum}: ❌ 仅在我们数据中存在`);
      mismatches++;
      continue;
    }
    if (docxQ && !ourQ) {
      console.log(`Q${qNum}: ❌ 仅在 docx 中存在`);
      mismatches++;
      continue;
    }

    // 比较选项
    const docxOptions = docxQ.options;
    const ourOptions = ourQ.options;
    let optMismatch = false;

    for (const letter of ['A', 'B', 'C', 'D']) {
      const docxOpt = (docxOptions[letter] || '').replace(/\s+/g, ' ').trim();
      const ourOpt = (ourOptions[letter] || '').replace(/\s+/g, ' ').trim();

      if (docxOpt !== ourOpt) {
        if (!optMismatch) {
          console.log(`Q${qNum}:`);
          optMismatch = true;
        }
        console.log(`  ${letter}) DOCX: "${docxOpt.slice(0, 80)}"`);
        console.log(`  ${letter}) OURS: "${ourOpt.slice(0, 80)}"`);
      }
    }

    if (optMismatch) {
      mismatches++;
    } else {
      // 检查答案
      const keyAns = answerKey[qNum];
      const ourAns = ourQ.answer;
      if (keyAns && keyAns !== ourAns) {
        console.log(`Q${qNum}: ⚠️ 答案不一致 — 答案PDF: ${keyAns}, 我们的: ${ourAns} (选项一致)`);
        mismatches++;
      }
    }
  }

  if (mismatches === 0) {
    console.log('✅ 所有 25 题选项完全一致！');
  } else {
    console.log(`\n❌ 共 ${mismatches} 处不一致`);
  }

  // 如果有答案 key，输出答案对比
  if (Object.keys(answerKey).length > 0) {
    console.log('\n--- 答案对比 ---');
    let ansMatch = 0, ansTotal = 0;
    for (const [qNum, ans] of Object.entries(answerKey)) {
      const num = parseInt(qNum);
      const ourAns = ourData[num]?.answer;
      if (ourAns) {
        ansTotal++;
        if (ans === ourAns) ansMatch++;
        else console.log(`Q${num}: PDF答案=${ans}, 我们的=${ourAns}`);
      }
    }
    if (ansMatch === ansTotal) {
      console.log('✅ 所有答案一致！');
    } else {
      console.log(`答案一致率: ${ansMatch}/${ansTotal}`);
    }
  }

  // 输出完整对比表格
  console.log('\n--- 完整数据 ---');
  for (let qNum = 1; qNum <= 25; qNum++) {
    const ourQ = ourData[qNum];
    const keyAns = answerKey[qNum];
    if (!ourQ) { console.log(`Q${qNum}: (无数据)`); continue; }
    const mark = keyAns ? (keyAns === ourQ.answer ? '✓' : `✗(应为${keyAns})`) : '?';
    console.log(`Q${String(qNum).padStart(2)}: ${ourQ.answer} ${mark} | ${ourQ.question.slice(0, 60)}`);
  }
}

main().catch(console.error);
