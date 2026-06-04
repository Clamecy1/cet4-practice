// 同步共享音频套: S1 → S2/S3 for 2022-09, 2023-03, 2025-06, 2025-12
const fs = require('fs');
const path = require('path');

const SECTIONS = path.join(__dirname, '..', 'src', 'data', 'sections.ts');
let content = fs.readFileSync(SECTIONS, 'utf-8');

// 提取某个 Q 的 options 数组内容（精确匹配，不用 indexOf substring 问题）
function extractOptions(prefix, qNum) {
  const qId = `${prefix}${qNum}`;
  const idMarker = `id: '${qId}'`;
  const idIdx = content.indexOf(idMarker);

  // 确保精确匹配（后面不是数字）
  if (idIdx < 0) return null;
  const afterId = content.slice(idIdx + idMarker.length);
  if (/^\d/.test(afterId)) return null; // Q1 匹配到 Q10

  const optMatch = afterId.match(/options:\s*\[/);
  if (!optMatch) return null;

  const optStart = idIdx + idMarker.length + optMatch.index + optMatch[0].length;
  let depth = 1;
  let optEnd = optStart;
  for (let i = optStart; i < content.length && depth > 0; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') depth--;
    if (depth === 0) optEnd = i;
  }

  return content.slice(optStart, optEnd);
}

// 替换某个 Q 的 options 数组
function replaceOptions(prefix, qNum, newOptionsContent) {
  const qId = `${prefix}${qNum}`;
  const idMarker = `id: '${qId}'`;
  const idIdx = content.indexOf(idMarker);
  if (idIdx < 0) return false;
  const afterId = content.slice(idIdx + idMarker.length);
  if (/^\d/.test(afterId)) return false;

  const optMatch = afterId.match(/options:\s*\[/);
  if (!optMatch) return false;

  const optStart = idIdx + idMarker.length + optMatch.index + optMatch[0].length;
  let depth = 1;
  let optEnd = optStart;
  for (let i = optStart; i < content.length && depth > 0; i++) {
    if (content[i] === '[') depth++;
    else if (content[i] === ']') depth--;
    if (depth === 0) optEnd = i;
  }

  if (content.slice(optStart, optEnd) === newOptionsContent) return false; // 已相同

  content = content.slice(0, optStart) + newOptionsContent + content.slice(optEnd);
  return true;
}

function syncOptions(year, month, fromSet, toSet) {
  const fromPrefix = `${year}-${String(month).padStart(2,'0')}-S${fromSet}-Q`;
  const toPrefix = `${year}-${String(month).padStart(2,'0')}-S${toSet}-Q`;

  let synced = 0, same = 0, missing = 0;
  for (let q = 1; q <= 25; q++) {
    const fromOpts = extractOptions(fromPrefix, q);
    if (fromOpts === null) { missing++; continue; }

    const toOpts = extractOptions(toPrefix, q);
    if (toOpts === null) { missing++; continue; }

    if (fromOpts === toOpts) { same++; continue; }

    if (replaceOptions(toPrefix, q, fromOpts)) synced++;
  }

  const label = `${fromPrefix}* → ${toPrefix}*`;
  console.log(`  ${label}: 同步${synced}, 一致${same}, 缺失${missing}`);
  return synced;
}

console.log('同步共享音频套选项:\n');
let total = 0;
total += syncOptions(2025, 6, 1, 3);
total += syncOptions(2025, 12, 1, 3);
total += syncOptions(2023, 3, 1, 2);
total += syncOptions(2023, 3, 1, 3);
total += syncOptions(2022, 9, 1, 2);
total += syncOptions(2022, 9, 1, 3);

if (total > 0) {
  fs.writeFileSync(SECTIONS, content, 'utf-8');
  console.log(`\n总计同步 ${total} 题，已写入 sections.ts`);
} else {
  console.log('\n所有共享音频套选项已一致，无需更改');
}
