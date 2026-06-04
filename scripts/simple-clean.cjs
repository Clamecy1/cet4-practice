// 最简单的清理：仅用几段正则删除考试旁白
const fs = require('fs');
const path = require('path');

const SECTIONS_PATH = path.join(__dirname, '..', 'src', 'data', 'sections.ts');
let content = fs.readFileSync(SECTIONS_PATH, 'utf-8');

let count = 0;

// 1. "For question, you must choose ... through the centre." 完整版
const r1 = /For\s+question,?\s*you\s+must\s+choose\s+the\s+best\s+answer\s+from\s+the\s+four\s+choices?\s+marked\s+A,?\s*B,?\s*,?\s*C\s+and\s+D\.?\s*Then,?\s*(?:my\s+)?mark\s+the\s+corresponding\s+letter\s+on\s+answer\s+sheet\s+1\.?\s*with\s+a\s+single\s+line\s+through\s+the\s+(?:center|centre|sensor)\.?\s*/gi;
count += (content.match(r1) || []).length;
content = content.replace(r1, '');

// 2. "Questions N and M are based on the news report/conversation/passage you have just heard."
const r2 = /Questions?\s+\d+\s+(?:and|through|to)\s+\d+\s+are\s+based\s+(?:on|upon)\s+(?:the\s+)?(?:On\s+the\s+)?(?:news\s+report|conversation|passage)\s+you\s+have\s+just\s+heard\.?\s*/gi;
count += (content.match(r2) || []).length;
content = content.replace(r2, '');

// 3. Section Directions (出现在 transcript 中的导语)
const r3 = /Section\s+[ABC],?\s*Directions?:?\s*In\s+this\s+section,?\s*you\s+will\s+hear\s+(?:three|two)\s+(?:news\s+reports|(?:long\s+)?conversations|passages)[^.]*\.\s*(?:At\s+the\s+end\s+of\s+each\s+(?:news\s+report|conversation|passage),?\s*you\s+will\s+hear\s+(?:two\s+or\s+)?(?:three|four)\s+questions?\.?\s*)?(?:Both\s+the\s+(?:news\s+report|conversation|passage)s?\s+and\s+(?:the\s+)?questions\s+will\s+be\s+spoken\s+only\s+once\.?\s*)?/gi;
count += (content.match(r3) || []).length;
content = content.replace(r3, '');

// 4. 残留片段
const r4 = /(?:After\s+you\s+hear\s+(?:a|each)\s+question,?\s*you\s+must\s+choose\s+the\s+best[^.]*\.\s*)/gi;
count += (content.match(r4) || []).length;
content = content.replace(r4, '');

const r5 = /(?:Then\s+mark\s+the\s+corresponding\s+letter\s+on\s+answer\s+sheet\s+(?:one|1)[^.]*\.?\s*)/gi;
count += (content.match(r5) || []).length;
content = content.replace(r5, '');

const r6 = /(?:with\s+a\s+single\s+line\s+through\s+the\s+(?:center|centre)\.?\s*)/gi;
count += (content.match(r6) || []).length;
content = content.replace(r6, '');

// 规范化
content = content.replace(/\s+\./g, '.').replace(/\s+,/g, ',').replace(/ {2,}/g, ' ');

fs.writeFileSync(SECTIONS_PATH, content, 'utf-8');
console.log(`Cleaned ${count} narration patterns`);
