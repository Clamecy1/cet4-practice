import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { generateShareImage } from '../utils/shareCard'

export default function Result() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [sharing, setSharing] = useState(false)
  const [shared, setShared] = useState(false)

  const type = searchParams.get('type') as 'listening' | 'translation' | null
  const year = Number(searchParams.get('year'))
  const month = Number(searchParams.get('month'))
  const set = searchParams.get('set') ? Number(searchParams.get('set')) : undefined
  const score = Number(searchParams.get('score'))
  const total = Number(searchParams.get('total'))

  if (!type || !year || !month || isNaN(score) || isNaN(total)) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">暂无成绩数据</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg text-sm active:bg-indigo-700"
        >
          返回首页
        </button>
      </div>
    )
  }

  const accuracy = total > 0 ? Math.round((score / total) * 100) : 0
  const monthStr = String(month).padStart(2, '0')
  const title = type === 'listening' ? '听力练习' : '翻译练习'
  const subtitle = set
    ? `${year}.${monthStr} 第${set}套`
    : `${year}.${monthStr}`

  const scoreLabel = `${score} / ${total}`

  const handleShare = async () => {
    if (sharing) return
    setSharing(true)
    try {
      const blob = await generateShareImage({
        type: type!,
        year,
        month,
        setNumber: set as 1 | 2 | 3 | undefined,
        score,
        total,
      })
      if (navigator.share) {
        const file = new File([blob], 'cet4-score.png', { type: 'image/png' })
        try {
          await navigator.share({
            title: 'CET-4 练习成绩',
            text: `CET-4 ${type === 'listening' ? '听力' : '翻译'} ${year}.${monthStr} ${score}/${total} (${accuracy}%)`,
            files: [file],
          })
        } catch {
          // 用户取消分享，不处理
        }
      } else {
        // 桌面端降级：下载图片
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `cet4-${type}-${year}${monthStr}.png`
        a.click()
        URL.revokeObjectURL(url)
        setShared(true)
        setTimeout(() => setShared(false), 3000)
      }
    } finally {
      setSharing(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-12 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">
        {title}完成 🎉
      </h1>
      <p className="text-sm text-gray-400 mb-6">{subtitle}</p>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <div className="text-4xl font-bold text-indigo-600 mb-2">
          {scoreLabel}
        </div>
        <div className="text-lg text-gray-500">
          正确率 <span className="font-semibold text-gray-700">{accuracy}%</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center flex-wrap">
        <button
          onClick={handleShare}
          disabled={sharing}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-medium active:bg-emerald-700 transition-colors disabled:opacity-50"
        >
          {sharing ? '生成中...' : shared ? '已下载 ✓' : '📤 分享成绩'}
        </button>
        <button
          onClick={() => navigate('/errors')}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium active:bg-indigo-700 transition-colors"
        >
          查看错题本
        </button>
        <button
          onClick={() => navigate('/')}
          className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium active:bg-gray-300 transition-colors"
        >
          返回首页
        </button>
      </div>
    </div>
  )
}
