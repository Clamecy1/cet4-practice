/**
 * Supabase Storage 音频上传脚本 (v2 - 原始 REST API)
 *
 * 用法：
 *   node scripts/upload-audio.mjs
 *
 * 需要 Supabase service_role key（Dashboard → Settings → API → service_role）
 * ⚠️ 不是 anon key！service_role key 在页面最下方，很长一串。
 */
import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import { createInterface } from 'readline'

const SUPABASE_URL = 'https://mokecnghmnmnsordffog.supabase.co'
const AUDIO_DIR = join(process.cwd(), '..', 'cet4-practice', 'public', 'audio')
const BUCKET_NAME = 'cet4-audio'

function ask(query) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout })
    rl.question(query, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function supabaseRequest(endpoint, options, apiKey) {
  const url = `${SUPABASE_URL}${endpoint}`
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...options.headers,
    },
  })

  const text = await res.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = text
  }

  if (!res.ok) {
    const msg = typeof data === 'object' ? data.message || data.error || text : text
    throw new Error(`${res.status} ${res.statusText}: ${msg}`)
  }

  return data
}

async function main() {
  console.log('=== CET-4 音频上传工具 ===\n')
  console.log('⚠️  需要 service_role key（不是 anon key！）')
  console.log('   在 Supabase Dashboard → Settings → API → service_role\n')

  const apiKey = await ask('请输入 service_role key: ')
  if (!apiKey) {
    console.error('❌ 未输入 key，退出')
    process.exit(1)
  }

  if (!apiKey.startsWith('eyJ')) {
    console.error('❌ Key 格式不正确，service_role key 应该以 eyJ 开头')
    process.exit(1)
  }

  // 1. 检查/创建 bucket
  console.log('\n📦 检查 bucket...')
  let buckets
  try {
    buckets = await supabaseRequest('/storage/v1/bucket', { method: 'GET' }, apiKey)
  } catch (err) {
    console.error('❌ 无法连接 Supabase，请检查 key 是否正确:', err.message)
    process.exit(1)
  }

  const existingBucket = Array.isArray(buckets) ? buckets.find((b) => b.name === BUCKET_NAME) : null

  if (!existingBucket) {
    console.log(`  创建 public bucket "${BUCKET_NAME}"...`)
    try {
      await supabaseRequest(
        '/storage/v1/bucket',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: BUCKET_NAME,
            public: true,
            file_size_limit: 52428800, // 50MB
          }),
        },
        apiKey,
      )
      console.log(`  ✅ bucket 创建成功`)
    } catch (err) {
      console.error(`  ❌ 创建失败: ${err.message}`)
      process.exit(1)
    }
  } else {
    console.log(`  ✅ bucket 已存在`)
    // 确保 public
    try {
      await supabaseRequest(
        `/storage/v1/bucket/${BUCKET_NAME}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ public: true }),
        },
        apiKey,
      )
    } catch {
      // 如果 bucket 已经是 public，PATCH 可能返回成功但 body 为空
    }
  }

  // 2. 上传文件
  const files = readdirSync(AUDIO_DIR).filter((f) => f.endsWith('.mp3'))
  console.log(`\n🎵 找到 ${files.length} 个音频文件\n`)

  let success = 0
  let failed = 0

  for (const file of files) {
    const filePath = join(AUDIO_DIR, file)
    const fileBuffer = readFileSync(filePath)
    const sizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(1)

    process.stdout.write(`  ${file.padEnd(25)} (${sizeMB}MB)... `)

    try {
      // 先检查文件是否已存在
      try {
        await supabaseRequest(
          `/storage/v1/object/${BUCKET_NAME}/${file}`,
          { method: 'HEAD' },
          apiKey,
        )
        process.stdout.write('已存在, ')
      } catch {
        // 不存在，继续上传
      }

      // Upload using raw binary
      const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${BUCKET_NAME}/${file}`
      const uploadRes = await fetch(uploadUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'audio/mpeg',
          'x-upsert': 'true',
        },
        body: fileBuffer,
      })

      if (uploadRes.ok) {
        console.log('✅')
        success++
      } else {
        const errText = await uploadRes.text()
        console.log(`❌ ${errText.slice(0, 80)}`)
        failed++
      }
    } catch (err) {
      console.log(`❌ ${err.message.slice(0, 80)}`)
      failed++
    }
  }

  console.log(`\n=== 完成: ${success} 成功, ${failed} 失败 ===`)
  if (success > 0) {
    console.log(`\n✅ CDN 地址: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/`)
    console.log('音频已就绪！')
  }
  console.log('\n现在可以打开微信开发者工具，导入 cet4-mini-app 目录预览。')
}

main().catch((err) => {
  console.error('\n❌ 脚本运行失败:', err.message)
  process.exit(1)
})
