// 辅助脚本: mammoth docx → stdout
const mammoth = require('mammoth');
const path = process.argv[2];
if (!path) { console.error('Usage: node mammoth-stdout.cjs <docx-path>'); process.exit(1); }
mammoth.extractRawText({ path }).then(r => process.stdout.write(r.value)).catch(e => { console.error(e); process.exit(1); });
