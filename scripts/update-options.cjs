// 用源 PDF 精确提取的选项更新 sections.ts
// 用法: node scripts/update-options.cjs <year> <month> <set> [--dry]
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = 'C:\\Users\\Administrator\\Desktop\\1.大学英语CET4-历年真题\\01四级历年真题及答案解析+听力音频';
const SECTIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'sections.ts');

// ====== 源文件查找 ======

function findExamFile(year, month, setNum) {
  const baseName = `${year}年${String(month).padStart(2,'0')}月CET4题+解+音频`;
  // 尝试标准目录名和【新】变体
  let examDir = path.join(BASE, baseName);
  if (!fs.existsSync(examDir)) {
    const altDir = path.join(BASE, baseName + '【新】');
    if (fs.existsSync(altDir)) examDir = altDir;
  }

  // 优先 PDF
  const pdfDir = path.join(examDir, '01、真题PDF版（推荐使用）');
  const CH = ['零','一','二','三','四','五','六'];

  if (fs.existsSync(pdfDir)) {
    const files = fs.readdirSync(pdfDir);
    for (const f of files) {
      if (!f.endsWith('.pdf')) continue;
      for (const p of [`第${setNum}套`, `第${CH[setNum]}套`, `第 ${setNum} 套`, `卷${setNum}`]) {
        if (f.includes(p)) return { path: path.join(pdfDir, f), type: 'pdf' };
      }
    }
  }

  // 有些目录没有子目录，PDF 直接在 examDir 下（如 2025-12）
  if (fs.existsSync(examDir)) {
    const files = fs.readdirSync(examDir);
    for (const f of files) {
      if (!f.endsWith('.pdf')) continue;
      for (const p of [`第${setNum}套`, `第${CH[setNum]}套`, `第 ${setNum} 套`, `卷${setNum}`]) {
        if (f.includes(p) && f.includes('真题')) return { path: path.join(examDir, f), type: 'pdf' };
      }
    }
  }

  // Fallback: docx
  const docxDir = path.join(examDir, '02、真题word版');
  if (fs.existsSync(docxDir)) {
    const files = fs.readdirSync(docxDir);
    for (const f of files) {
      if (!f.endsWith('.docx')) continue;
      for (const p of [`第${setNum}套`, `第${CH[setNum]}套`, `第 ${setNum} 套`, `卷${setNum}`, `${setNum}套`]) {
        if (f.includes(p)) return { path: path.join(docxDir, f), type: 'docx' };
      }
    }
    // 模糊匹配
    for (const f of files) {
      if (!f.endsWith('.docx')) continue;
      const m = f.match(/第[\s]*(\S)[\s]*套/);
      if (m) {
        const idx = CH.indexOf(m[1]);
        if ((idx > 0 && idx === setNum) || parseInt(m[1]) === setNum) return { path: path.join(docxDir, f), type: 'docx' };
      }
    }
  }

  return null;
}

function extractText(filePath, type) {
  if (type === 'pdf') {
    return execSync(`pdftotext -layout "${filePath}" -`, { encoding: 'utf-8', timeout: 30000 });
  } else {
    // docx — 使用 mammoth-stdout.cjs 辅助脚本
    const helper = path.join(__dirname, 'mammoth-stdout.cjs');
    return execSync(`node "${helper}" "${filePath}"`, { encoding: 'utf-8', timeout: 30000 });
  }
}

function parsePdfOptions(text) {
  // 支持各种 OCR 变体: II, Il, ]I, Ⅱ, 二
  // 匹配 Part II / Part n / Part ]I 等各种 OCR 变体
  const part2 = text.search(/Part\s*(I[Il\]\)]|\]I|n\b|Ⅱ|二).*Listening/i);
  // 匹配 Part III / Part HI / Part in / Part D[ 等各种 OCR 变体
  const part3 = text.search(/Part\s*(I{2}[Il\]\)]?|I[Il\]\)]I|\]?I{2}\]?|HI\b|in\b|Ⅲ|三|D\[).*Reading/i);
  if (part2 < 0) return {};
  const section = text.slice(part2, part3 > part2 ? part3 : undefined);

  const rawLines = section.split(/\r?\n/);
  const questions = {};
  let currentQ = 0;

  for (let i = 0; i < rawLines.length; i++) {
    let line = rawLines[i].trim();
    if (!line) continue;
    if (/^(Part|Section|Questions?\s+\d|Directions)/i.test(line)) continue;
    line = line.replace(/\t/g, '    ');

    // 提取所有选项 token
    const tokens = [];
    const optRe = /(\d+)[.)]\s+([A-D])\)|(?<!\d[.)]\s)([A-D])\)/g;
    let m;
    while ((m = optRe.exec(line)) !== null) {
      if (m[1]) {
        tokens.push({ type: 'numbered', qNum: parseInt(m[1]), letter: m[2], pos: m.index });
      } else if (m[3]) {
        tokens.push({ type: 'plain', letter: m[3], pos: m.index });
      }
    }

    if (tokens.length === 0) {
      // 可能是续行文本
      if (currentQ > 0 && questions[currentQ]) {
        const lastL = Object.keys(questions[currentQ].options).sort().pop();
        if (lastL) {
          questions[currentQ].options[lastL] += ' ' + line.replace(/\s+/g, ' ');
        }
      }
      continue;
    }

    for (let t = 0; t < tokens.length; t++) {
      const token = tokens[t];
      const nextToken = tokens[t + 1];
      const endPos = nextToken ? nextToken.pos : line.length;

      const parenIdx = line.indexOf(')', token.pos);
      if (parenIdx < 0) continue;
      let textStart = parenIdx + 1;
      if (line[textStart] === ' ') textStart++;

      let optText = line.slice(textStart, endPos).trim();
      optText = optText.replace(/\s+/g, ' ').trim();

      // 过滤无效选项
      if (optText === ',' || optText === 'and' || optText === '' ||
          optText.includes('Answer Sheet') || optText.includes('mark the corresponding')) {
        continue;
      }

      if (token.type === 'numbered') {
        currentQ = token.qNum;
        // 过滤异常编号 (> 50 说明解析错误)
        if (currentQ > 50) continue;
        if (!questions[currentQ]) questions[currentQ] = { num: currentQ, options: {} };
        questions[currentQ].options[token.letter] = optText;
      } else if (currentQ > 0) {
        if (!questions[currentQ]) questions[currentQ] = { num: currentQ, options: {} };
        questions[currentQ].options[token.letter] = optText;
      }
    }
  }

  // 清理和验证：每个Q必须有4个选项
  const cleaned = {};
  for (const [num, q] of Object.entries(questions)) {
    const opts = q.options;
    if (Object.keys(opts).length === 4) {
      // 清理 trailing page numbers like "2022 6 1 1 1 0 b y :"
      for (const [l, t] of Object.entries(opts)) {
        opts[l] = t.replace(/\s+\d{4}\s+\d+\s+\d+[\s\d]*b\s*y\s*:?\s*$/i, '').trim();
        opts[l] = opts[l].replace(/\s+\d{4}\s+\d+\s+\d+[\s\d]*$/i, '').trim();
        // Fix "corporations9" → "corporations'"
        opts[l] = opts[l].replace(/corporations9/g, "corporations'");
        // Fix "notesquickly" → "notes quickly"
        opts[l] = opts[l].replace(/([a-z])([A-Z])/g, '$1 $2');
      }
      cleaned[num] = q;
    }
  }
  return cleaned;
}

// ====== sections.ts 更新 ======

function updateSections(year, month, setNum, pdfQuestions, dryRun) {
  let content = fs.readFileSync(SECTIONS_PATH, 'utf-8');
  const prefix = `${year}-${String(month).padStart(2,'0')}-S${setNum}-Q`;
  let changed = 0;

  for (const [qNum, pdfQ] of Object.entries(pdfQuestions)) {
    const qId = `${prefix}${qNum}`;

    // 构建新的 options 数组字符串
    const optEntries = ['A','B','C','D'].map(l => {
      const t = (pdfQ.options[l] || '').replace(/'/g, "\\'");
      return `'${l}) ${t}'`;
    });
    const newOptions = `[${optEntries.join(', ')}]`;

    // 直接查找 ID 字符串位置，然后找到并替换 options 数组
    const idMarker = `id: '${qId}'`;
    const idIdx = content.indexOf(idMarker);
    if (idIdx < 0) {
      console.log(`  ⚠️ Q${qNum}: 未找到 ID`);
      continue;
    }

    // 从 ID 位置开始，找到 options: [
    const afterId = content.slice(idIdx + idMarker.length);
    const optStartMatch = afterId.match(/options:\s*\[/);
    if (!optStartMatch) {
      console.log(`  ⚠️ Q${qNum}: 未找到 options`);
      continue;
    }

    const optStart = idIdx + idMarker.length + optStartMatch.index + optStartMatch[0].length;
    // 找到对应的 ] (options 数组结束)
    // 简单方法：从 options[ 开始计数括号深度
    let depth = 1;
    let optEnd = optStart;
    for (let i = optStart; i < content.length && depth > 0; i++) {
      if (content[i] === '[') depth++;
      else if (content[i] === ']') depth--;
      if (depth === 0) optEnd = i;
    }

    const oldOptions = content.slice(optStart - optStartMatch[0].length, optEnd + 1);
    content = content.slice(0, optStart - optStartMatch[0].length) + 'options: ' + newOptions + content.slice(optEnd + 1);
    changed++;
  }

  console.log(`  更新了 ${changed}/${Object.keys(pdfQuestions).length} 题`);

  if (!dryRun && changed > 0) {
    fs.writeFileSync(SECTIONS_PATH, content, 'utf-8');
    console.log('  已写入 sections.ts');
  } else if (dryRun) {
    console.log('  (dry run, 未写入)');
  }

  return changed;
}

// ====== 主流程 ======

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry');
  const cleanArgs = args.filter(a => a !== '--dry');
  const year = parseInt(cleanArgs[0]);
  const month = parseInt(cleanArgs[1]);
  const setNum = parseInt(cleanArgs[2] || '1');

  if (!year || !month) {
    console.log('用法: node scripts/update-options.cjs <year> <month> [set] [--dry]');
    console.log('  --dry  预览模式，不实际写入');
    process.exit(1);
  }

  console.log(`\n${dryRun ? '🔍 预览' : '✏️ 更新'} ${year}年${month}月 第${setNum}套`);

  // 1. 查找并提取源文件 (优先 PDF，失败时回退 docx)
  let examFile = findExamFile(year, month, setNum);
  if (!examFile) { console.error('未找到真题文件 (PDF或docx)'); process.exit(1); }

  let text = extractText(examFile.path, examFile.type);
  let pdfQuestions = parsePdfOptions(text);

  // 如果 PDF 提取质量差，尝试 docx 回退
  const validCount = Object.values(pdfQuestions).filter(q => Object.keys(q.options).length === 4).length;
  if (validCount < 15 && examFile.type === 'pdf') {
    console.log(`PDF 提取质量差 (${validCount}题)，尝试 docx 回退...`);
    const docxDir = path.join(path.dirname(path.dirname(examFile.path)), '02、真题word版');
    if (fs.existsSync(docxDir)) {
      const docxFile = findExamFile(year, month, setNum);
      // 强制查找 docx
      const CH = ['零','一','二','三','四','五','六'];
      const files = fs.readdirSync(docxDir);
      for (const f of files) {
        if (!f.endsWith('.docx')) continue;
        for (const p of [`第${setNum}套`, `第${CH[setNum]}套`, `第 ${setNum} 套`, `${setNum}套`]) {
          if (f.includes(p)) {
            const docxPath = path.join(docxDir, f);
            console.log(`Docx 回退: ${path.basename(docxPath)}`);
            text = extractText(docxPath, 'docx');
            pdfQuestions = parsePdfOptions(text);
            break;
          }
        }
      }
    }
  }

  // 重新计算
  const finalValid = Object.values(pdfQuestions).filter(q => Object.keys(q.options).length === 4).length;
  console.log(`最终提取: ${Object.keys(pdfQuestions).length} 题, ${finalValid} 题有完整4选项`);

  if (validCount < 20) {
    console.log('⚠️ 提取不完整，请检查PDF');
    // 输出缺失的题目
    for (let q = 1; q <= 25; q++) {
      if (!pdfQuestions[q]) console.log(`  缺失 Q${q}`);
      else if (Object.keys(pdfQuestions[q].options).length < 4) {
        console.log(`  Q${q} 不完整: ${Object.keys(pdfQuestions[q].options).join(',')}`);
      }
    }
    if (!dryRun) {
      console.log('\n切换到预览模式。请先用 --dry 检查。');
      process.exit(1);
    }
  }

  // 2. 更新 sections.ts
  if (validCount >= 20) {
    updateSections(year, month, setNum, pdfQuestions, dryRun);
  }
}

main().catch(console.error);
