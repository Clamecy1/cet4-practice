import { useState } from 'react'
import { View, Text, Canvas } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import styles from './index.module.scss'

export default function Result() {
  const router = useRouter()
  const { type, year, month, set, score: scoreStr, total: totalStr } = router.params
  const score = Number(scoreStr) || 0
  const total = Number(totalStr) || 1
  const accuracy = Math.round((score / total) * 100)
  const yearNum = Number(year) || 0
  const monthNum = Number(month) || 0
  const setNum = set ? Number(set) : undefined

  const [saving, setSaving] = useState(false)

  const getRating = () => {
    if (accuracy >= 90) return { label: '优秀', emoji: '🌟', color: '#f59e0b' }
    if (accuracy >= 70) return { label: '良好', emoji: '👍', color: '#6366f1' }
    if (accuracy >= 60) return { label: '及格', emoji: '📚', color: '#8b5cf6' }
    return { label: '继续加油', emoji: '💪', color: '#6b7280' }
  }

  const rating = getRating()
  const typeLabel = type === 'listening' ? '听力' : '翻译'
  const monthStr = String(monthNum).padStart(2, '0')

  const handleShare = async () => {
    setSaving(true)
    try {
      // Generate share image via Canvas
      const tempPath = await generateShareImage({
        type: type as 'listening' | 'translation',
        year: yearNum,
        month: monthNum,
        setNumber: setNum,
        score,
        total,
      })
      if (tempPath) {
        await Taro.saveImageToPhotosAlbum({ filePath: tempPath })
        Taro.showToast({ title: '已保存到相册', icon: 'success' })
      }
    } catch (e) {
      console.error('Share failed:', e)
      Taro.showToast({ title: '保存失败，请重试', icon: 'error' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <View className={styles.container}>
      {/* Score Display */}
      <View className={`${styles.scoreCard} ${type === 'translation' ? styles.scoreTrans : ''}`}>
        <Text className={styles.typeLabel}>
          {typeLabel} · {yearNum}年{monthStr}月{setNum ? ` 卷${setNum}` : ''}
        </Text>
        <View className={styles.scoreMain}>
          <Text className={styles.scoreNum}>{score}</Text>
          <Text className={styles.scoreSep}>/</Text>
          <Text className={styles.scoreTotal}>{total}</Text>
        </View>
        {type === 'translation' && (
          <Text className={styles.scoreHint}>AI 评分均值（满分100）</Text>
        )}
        <View className={styles.accuracyBar}>
          <View className={styles.accuracyFill} style={{ width: `${accuracy}%` }} />
        </View>
        <Text className={styles.accuracyText}>正确率 {accuracy}%</Text>

        {/* Rating Badge */}
        <View className={styles.ratingBadge} style={{ background: `${rating.color}15` }}>
          <Text className={styles.ratingEmoji}>{rating.emoji}</Text>
          <Text className={styles.ratingLabel} style={{ color: rating.color }}>
            {rating.label}
          </Text>
        </View>
      </View>

      {/* Hidden Canvas for image generation */}
      <Canvas
        canvasId="shareCanvas"
        id="shareCanvas"
        type="2d"
        style={{ width: '600rpx', height: '400rpx', position: 'fixed', left: '-9999rpx', top: '-9999rpx' }}
      />

      {/* Action Buttons */}
      <View className={styles.actions}>
        <View className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleShare}>
          <Text className={styles.btnText}>{saving ? '生成中...' : '📸 保存分享图'}</Text>
        </View>
        <View
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => Taro.switchTab({ url: '/pages/review/index' })}
        >
          <Text className={styles.btnOutlineText}>📋 查看错题本</Text>
        </View>
        <View
          className={`${styles.btn} ${styles.btnOutline}`}
          onClick={() => Taro.switchTab({ url: '/pages/home/index' })}
        >
          <Text className={styles.btnOutlineText}>🏠 返回首页</Text>
        </View>
      </View>
    </View>
  )
}

// Canvas share image generation
interface ShareData {
  type: 'listening' | 'translation'
  year: number
  month: number
  setNumber?: number
  score: number
  total: number
}

async function generateShareImage(data: ShareData): Promise<string | null> {
  return new Promise((resolve) => {
    const query = Taro.createSelectorQuery()
    query
      .select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        if (!res || !res[0] || !res[0].node) {
          resolve(null)
          return
        }
        const canvas = res[0].node as any
        const ctx = canvas.getContext('2d')
        const dpr = Taro.getSystemInfoSync().pixelRatio
        const w = 600
        const h = 400
        canvas.width = w * dpr
        canvas.height = h * dpr
        ctx.scale(dpr, dpr)

        const isListening = data.type === 'listening'
        const accuracy = Math.round((data.score / data.total) * 100)
        const monthStr = String(data.month).padStart(2, '0')

        // Background
        const gradient = ctx.createLinearGradient(0, 0, w, h)
        if (isListening) {
          gradient.addColorStop(0, '#eef2ff')
          gradient.addColorStop(1, '#e0e7ff')
        } else {
          gradient.addColorStop(0, '#ecfdf5')
          gradient.addColorStop(1, '#d1fae5')
        }
        ctx.fillStyle = gradient
        roundRect(ctx, 0, 0, w, h, 24)
        ctx.fill()

        // Decorative circles
        ctx.fillStyle = isListening ? 'rgba(99,102,241,0.08)' : 'rgba(5,150,105,0.08)'
        ctx.beginPath()
        ctx.arc(500, 80, 80, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(100, 320, 50, 0, Math.PI * 2)
        ctx.fill()

        // Title
        ctx.fillStyle = '#1f2937'
        ctx.font = 'bold 28px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('CET-4 听力翻译刷题器', w / 2, 60)

        // Exam info
        ctx.fillStyle = '#6b7280'
        ctx.font = '16px sans-serif'
        let infoText = `${data.year}年${monthStr}月 · ${isListening ? '听力' : '翻译'}`
        if (data.setNumber) infoText += ` 卷${data.setNumber}`
        ctx.fillText(infoText, w / 2, 120)

        // Score
        ctx.fillStyle = isListening ? '#6366f1' : '#059669'
        ctx.font = 'bold 72px sans-serif'
        ctx.fillText(`${data.score}`, w / 2 - 30, 220)

        ctx.fillStyle = '#9ca3af'
        ctx.font = '32px sans-serif'
        ctx.fillText(`/ ${data.total}`, w / 2 + 60, 220)

        // Rating
        let ratingLabel = ''
        let ratingEmoji = ''
        if (accuracy >= 90) { ratingLabel = '优秀'; ratingEmoji = '🌟' }
        else if (accuracy >= 70) { ratingLabel = '良好'; ratingEmoji = '👍' }
        else if (accuracy >= 60) { ratingLabel = '及格'; ratingEmoji = '📚' }
        else { ratingLabel = '继续加油'; ratingEmoji = '💪' }

        ctx.fillStyle = '#1f2937'
        ctx.font = '24px sans-serif'
        ctx.fillText(`${ratingEmoji} ${ratingLabel}  ·  正确率 ${accuracy}%`, w / 2, 290)

        // Footer
        ctx.fillStyle = '#d1d5db'
        ctx.font = '13px sans-serif'
        const date = new Date()
        const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
        ctx.fillText(dateStr, w / 2, 360)
        ctx.fillText('CET-4 刷题器', w / 2, 382)

        // Export
        Taro.canvasToTempFilePath({
          canvas,
          fileType: 'png',
          success: (outRes) => resolve(outRes.tempFilePath),
          fail: () => resolve(null),
        })
      })
  })
}

function roundRect(ctx: any, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}
