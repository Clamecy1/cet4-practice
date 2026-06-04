// 从源 PDF 精确提取听力选项 & 答案，与 sections.ts 对比
// 用法: node scripts/verify-pdf.cjs <year> <month> <set>
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'C:\\Users\\Administrator\\Desktop\\1.大学英语CET4-历年真题\\01四级历年真题及答案解析+听力音频';

function findFile(year, month, setNum, subdir) {
  const dir = path.join(BASE, `${year}年${String(month).padStart(2,'0')}月CET4题+解+音频`, subdir);
  if (!fs.existsSync(dir)) return null;
  const CH = ['零','一','二','三','四','五','六'];
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (!f.endsWith('.pdf')) continue;
    const patterns = [`第${setNum}套`, `第${CH[setNum]}套`, `第 ${setNum} 套`, `解析${setNum}`, `卷${setNum}`];
    for (const p of patterns) {
      if (f.includes(p)) return path.join(dir, f);
    }
  }
  // 模糊匹配
  for (const f of files) {
    if (!f.endsWith('.pdf')) continue;
    const m = f.match(/第[\s]*(\S)[\s]*套/);
    if (m) {
      const idx = CH.indexOf(m[1]);
      if ((idx > 0 && idx === setNum) || parseInt(m[1]) === setNum) return path.join(dir, f);
    }
  }
  return null;
}

function pdfText(filePath) {
  return execSync(`pdftotext -layout "${filePath}" -`, { encoding: 'utf-8', timeout: 30000 });
}

// 解析 PDF 文本中的听力选项
function parseOptions(text) {
  const part2 = text.search(/Part\s*(I[Il\]\)]|\]I|Ⅱ|二).*Listening/i);
  const part3 = text.search(/Part\s*(I{2}[Il\]\)]?|I[Il\]\)]I|\]?I{2}\]?|Ⅲ|三|D\[).*Reading/i);
  if (part2 < 0) return {};
  const section = text.slice(part2, part3 > part2 ? part3 : undefined);

  const rawLines = section.split(/\r?\n/);
  const questions = {};
  let currentQ = 0;

  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i].trim();
    if (!line) continue;

    // 跳过非选项行
    if (/^(Part|Section|Questions?\s+\d|Directions)/i.test(line)) continue;

    // 将tab替换为空格，统一处理
    line = line.replace(/\t/g, '    ');

    // 提取该行中的所有选项模式: "N. X) text" 或 "X) text"
    // 使用全局匹配提取所有 option token
    const tokens = [];
    const optRe = /(\d+)[.)]\s+([A-D])\)|(?<!\d[.)]\s)([A-D])\)/g;
    let m;
    while ((m = optRe.exec(line)) !== null) {
      if (m[1]) {
        // 编号选项: "N. X)"
        tokens.push({ type: 'numbered', qNum: parseInt(m[1]), letter: m[2], pos: m.index });
      } else if (m[3]) {
        // 纯选项: "X)"
        tokens.push({ type: 'plain', letter: m[3], pos: m.index });
      }
    }

    if (tokens.length === 0) {
      // 可能是上一条选项的续行文本
      if (currentQ > 0) {
        const lastQ = questions[currentQ];
        if (lastQ) {
          const lastLetter = Object.keys(lastQ.options).sort().pop();
          if (lastLetter) {
            lastQ.options[lastLetter] += ' ' + line.replace(/\s+/g, ' ');
          }
        }
      }
      continue;
    }

    // 从 tokens 提取选项文本
    for (let t = 0; t < tokens.length; t++) {
      const token = tokens[t];
      const nextToken = tokens[t + 1];
      const endPos = nextToken ? nextToken.pos : line.length;

      // 提取选项文本（从 token 后的 ") " 开始到下一个 token 的位置）
      let textStart = token.pos;
      // 找到 ") " 的位置
      const parenIdx = line.indexOf(')', textStart);
      if (parenIdx < 0) continue;
      textStart = parenIdx + 1;
      if (line[textStart] === ' ') textStart++;

      let optText = line.slice(textStart, endPos).trim();
      optText = optText.replace(/\s+/g, ' ').trim();

      if (token.type === 'numbered') {
        currentQ = token.qNum;
        if (!questions[currentQ]) questions[currentQ] = { num: currentQ, options: {} };
        questions[currentQ].options[token.letter] = optText;
      } else {
        if (currentQ > 0) {
          if (!questions[currentQ]) questions[currentQ] = { num: currentQ, options: {} };
          questions[currentQ].options[token.letter] = optText;
        }
      }
    }
  }

  // 清理无效内容
  for (const q of Object.values(questions)) {
    for (const [letter, text] of Object.entries(q.options)) {
      if (text.includes('mark the corresponding letter') || text.includes('Answer Sheet') || text.length < 1) {
        delete q.options[letter];
      }
    }
  }

  return questions;
}

// 从答案 PDF 提取答案
function parseAnswers(text) {
  const answers = {};

  // 方法1: 找 "1-25" 范围答案行
  const rangeMatch = text.match(/(\d+)\s*[-~至到]\s*(\d+)\s*[：:\s]*([A-D\s]{10,})/);
  if (rangeMatch) {
    const start = parseInt(rangeMatch[1]);
    const end = parseInt(rangeMatch[2]);
    const letters = rangeMatch[3].replace(/\s+/g, '').split('');
    for (let i = 0; i < letters.length && start + i <= end; i++) {
      if (/^[A-D]$/.test(letters[i])) {
        answers[start + i] = letters[i];
      }
    }
  }

  // 方法2: 找听力部分的答案块
  if (Object.keys(answers).length < 20) {
    // 搜索 "Part II" 或 "听力" 后的答案
    const listenIdx = text.search(/Part\s*II|听力/);
    if (listenIdx >= 0) {
      const ctx = text.slice(listenIdx, listenIdx + 5000);
      // 尝试找 "答案" 或 "Key" 部分
      const ansIdx = ctx.search(/答案|Key|Answer/);
      if (ansIdx >= 0) {
        const ansSection = ctx.slice(ansIdx);
        const singles = ansSection.match(/(\d+)\s*[.、:\s]+([A-D])\b/g);
        if (singles) {
          for (const s of singles) {
            const m = s.match(/(\d+)\s*[.、:\s]+([A-D])/);
            if (m) {
              const n = parseInt(m[1]);
              if (n >= 1 && n <= 35 && !answers[n]) answers[n] = m[2];
            }
          }
        }
      }
    }
  }

  return answers;
}

// 从 sections.ts 提取我们的数据
function extractOurData(year, month, setNum) {
  const content = fs.readFileSync(
    path.join(__dirname, '..', 'src', 'data', 'sections.ts'), 'utf-8'
  );
  const prefix = `${year}-${String(month).padStart(2,'0')}-S${setNum}-Q`;
  const escPrefix = prefix.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

  const questions = [];
  // 匹配: { id: 'PREFIX-N', question: '...', options: [...], answer: 'X' }
  // 注意: 选项文本可能包含 \' (escaped apostrophe)
  const qRe = new RegExp(
    `\\{\\s*id:\\s*'(${escPrefix}(\\d+))',\\s*question:\\s*'((?:[^'\\\\]|\\\\')*)',\\s*options:\\s*\\[([^\\]]+)\\],\\s*answer:\\s*'([A-D])'\\s*\\}`,
    'g'
  );
  let qm;
  while ((qm = qRe.exec(content)) !== null) {
    const opts = {};
    // 解析选项: 'X) text' — text 可能包含 \'
    const oRe = /'([A-D])\)\s+((?:[^'\\]|\\')+)'/g;
    let om;
    while ((om = oRe.exec(qm[4])) !== null) {
      opts[om[1]] = om[2].replace(/\\'/g, "'").trim();
    }
    questions.push({
      id: qm[1],
      num: parseInt(qm[2]),
      question: qm[3].replace(/\\'/g, "'"),
      options: opts,
      answer: qm[5],
    });
  }
  return questions;
}

async function main() {
  const args = process.argv.slice(2);
  const [year, month, setNum] = [parseInt(args[0]), parseInt(args[1]), parseInt(args[2] || '1')];
  if (!year || !month) { console.log('用法: node scripts/verify-pdf.cjs <year> <month> [set]'); process.exit(1); }

  console.log(`\n=== ${year}年${month}月 第${setNum}套 ===\n`);

  // 找真题 PDF
  const examPdf = findFile(year, month, setNum, '01、真题PDF版（推荐使用）');
  if (!examPdf) {
    console.log('未找到真题PDF，尝试 docx...');
    // fallback to docx
  }
  console.log(`真题: ${examPdf ? path.basename(examPdf) : '未找到'}`);

  // 找答案 PDF
  const ansPdf = findFile(year, month, setNum, '03、答案解析');
  console.log(`答案: ${ansPdf ? path.basename(ansPdf) : '未找到'}`);

  // 提取
  let pdfQuestions = {};
  if (examPdf) {
    const text = pdfText(examPdf);
    pdfQuestions = parseOptions(text);
    console.log(`PDF 选项: ${Object.keys(pdfQuestions).length} 题`);
  }

  let pdfAnswers = {};
  if (ansPdf) {
    const text = pdfText(ansPdf);
    pdfAnswers = parseAnswers(text);
    console.log(`PDF 答案: ${Object.keys(pdfAnswers).length} 个`);
    if (Object.keys(pdfAnswers).length > 0) {
      const sorted = Object.entries(pdfAnswers).sort((a,b)=>parseInt(a[0])-parseInt(b[0]));
      console.log('答案: ' + sorted.map(([k,v])=>`${k}=${v}`).join(', '));
    }
  }

  const ourData = extractOurData(year, month, setNum);
  console.log(`我们的数据: ${ourData.length} 题`);

  // 对比
  console.log('\n--- 逐题对比 ---');
  let optMatch = 0, optMismatch = 0, ansMismatch = 0;

  for (const our of ourData.sort((a,b)=>a.num-b.num)) {
    const pdfQ = pdfQuestions[our.num];
    const ans = pdfAnswers[our.num];

    if (!pdfQ) {
      console.log(`Q${our.num}: (PDF 无数据)`);
      continue;
    }

    // 比较选项
    let qMismatch = false;
    for (const L of ['A','B','C','D']) {
      const pdfOpt = (pdfQ.options[L] || '').replace(/\s+/g, ' ').trim();
      const ourOpt = (our.options[L] || '').replace(/\s+/g, ' ').trim();
      if (pdfOpt !== ourOpt) {
        if (!qMismatch) {
          console.log(`Q${our.num}:`);
          qMismatch = true;
        }
        console.log(`  ${L}) PDF: "${pdfOpt.slice(0, 100)}"`);
        console.log(`  ${L}) OURS: "${ourOpt.slice(0, 100)}"`);
      }
    }

    if (qMismatch) optMismatch++;
    else optMatch++;

    // 比较答案
    if (ans && ans !== our.answer) {
      console.log(`  ⚠️ 答案: PDF=${ans}, OURS=${our.answer}`);
      ansMismatch++;
    }
  }

  console.log(`\n选项匹配: ${optMatch}/${optMatch+optMismatch}, 不匹配: ${optMismatch}`);
  console.log(`答案不一致: ${ansMismatch}`);

  // 输出 PDF 选项数据（用于直接替换）
  if (optMismatch > 0) {
    console.log('\n--- PDF 提取的选项 (可直接复制) ---');
    for (let q = 1; q <= 25; q++) {
      const pdfQ = pdfQuestions[q];
      if (!pdfQ) continue;
      const opts = ['A','B','C','D'].map(l => {
        const t = pdfQ.options[l] || '';
        return `'${l}) ${t.replace(/'/g, "\\'")}'`;
      }).join(', ');
      console.log(`Q${q}: [${opts}]`);
    }
  }
}

main().catch(console.error);
