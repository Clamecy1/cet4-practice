/**
 * 补传单个音频文件
 * 用法: node scripts/upload-one.mjs
 */
import { readFileSync } from 'fs'
import { createInterface } from 'readline'

const SUPABASE_URL = 'https://mokecnghmnmnsordffog.supabase.co'
const BUCKET = 'cet4-audio'
const FILE_PATH = '../cet4-practice/public/audio/2023-12-S2.mp3'
const FILE_NAME = '2023-12-S2.mp3'

function ask(query) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function main() {
  const apiKey = await ask('service_role key: ')
  if (!apiKey) { console.error('❌ 未输入 key'); process.exit(1) }

  const buffer = readFileSync(FILE_PATH)
  console.log(`📦 上传 ${FILE_NAME} (${(buffer.length / 1024 / 1024).toFixed(1)}MB)...`)

  // 先更新 bucket 大小限制为 100MB
  await fetch(`${SUPABASE_URL}/storage/v1/bucket/${BUCKET}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ public: true, file_size_limit: 104857600 }),
  })

  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${BUCKET}/${FILE_NAME}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'audio/mpeg',
      'x-upsert': 'true',
    },
    body: buffer,
  })

  if (res.ok) {
    console.log('✅ 上传成功')
  } else {
    const text = await res.text()
    console.log('❌ 失败:', text.slice(0, 200))
  }
}

main().catch((err) => console.error('❌', err.message))
