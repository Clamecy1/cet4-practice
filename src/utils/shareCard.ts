export interface ShareCardData {
  type: 'listening' | 'translation'
  year: number
  month: number
  setNumber?: number
  score: number
  total: number
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number
) {
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

export async function generateShareImage(data: ShareCardData): Promise<Blob> {
  const canvas = document.createElement('canvas')
  canvas.width = 600
  canvas.height = 400
  const ctx = canvas.getContext('2d')!

  const isListening = data.type === 'listening'
  const accuracy = Math.round((data.score / data.total) * 100)

  // 背景渐变
  const gradient = ctx.createLinearGradient(0, 0, 600, 400)
  if (isListening) {
    gradient.addColorStop(0, '#eef2ff')
    gradient.addColorStop(1, '#e0e7ff')
  } else {
    gradient.addColorStop(0, '#ecfdf5')
    gradient.addColorStop(1, '#d1fae5')
  }
  ctx.fillStyle = gradient
  roundRect(ctx, 0, 0, 600, 400, 20)
  ctx.fill()

  // 装饰圆点
  ctx.fillStyle = isListening ? 'rgba(79, 70, 229, 0.08)' : 'rgba(5, 150, 105, 0.08)'
  ctx.beginPath()
  ctx.arc(520, 80, 100, 0, Math.PI * 2)
  ctx.fill()
  ctx.beginPath()
  ctx.arc(80, 340, 60, 0, Math.PI * 2)
  ctx.fill()

  // App 名称
  ctx.fillStyle = '#1f2937'
  ctx.font = 'bold 22px sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText('CET-4 听力翻译刷题器', 40, 58)

  // 考试信息
  ctx.fillStyle = '#6b7280'
  ctx.font = '15px sans-serif'
  const setStr = data.setNumber ? ` · 第${data.setNumber}套` : ''
  const typeLabel = isListening ? '听力练习' : '翻译练习'
  ctx.fillText(`${data.year}年${data.month}月${setStr}  ${typeLabel}`, 40, 90)

  // 分隔线
  ctx.strokeStyle = isListening ? 'rgba(79, 70, 229, 0.2)' : 'rgba(5, 150, 105, 0.2)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(40, 115)
  ctx.lineTo(560, 115)
  ctx.stroke()

  // 分数 — 居中大字
  ctx.textAlign = 'center'
  ctx.fillStyle = isListening ? '#4f46e5' : '#059669'
  ctx.font = 'bold 56px sans-serif'
  ctx.fillText(`${data.score} / ${data.total}`, 300, 210)

  // 正确率
  ctx.fillStyle = '#374151'
  ctx.font = '22px sans-serif'
  ctx.fillText(`正确率 ${accuracy}%`, 300, 252)

  // 评级标签
  let badge = ''
  let badgeColor = ''
  if (accuracy >= 90) { badge = '🏆 优秀'; badgeColor = '#f59e0b' }
  else if (accuracy >= 70) { badge = '👍 良好'; badgeColor = '#4f46e5' }
  else if (accuracy >= 60) { badge = '👌 及格'; badgeColor = '#6b7280' }
  else { badge = '📚 继续加油'; badgeColor = '#ef4444' }

  ctx.fillStyle = badgeColor
  ctx.font = '18px sans-serif'
  ctx.fillText(badge, 300, 288)

  // 底部日期
  const now = new Date()
  const dateStr = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
  ctx.textAlign = 'left'
  ctx.fillStyle = '#9ca3af'
  ctx.font = '13px sans-serif'
  ctx.fillText(dateStr, 40, 365)

  // 底部水印
  ctx.textAlign = 'right'
  ctx.fillText('CET-4 刷题器', 560, 365)

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), 'image/png')
  })
}
