import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getErrorRecords, resolveError, getQuestionContext } from '../db/db'
import { getErrorsFromCloud, resolveErrorInCloud } from '../db/cloudSync'
import { useAuth } from '../contexts/AuthContext'
import type { ErrorRecord } from '../db/types'

export default function Errors() {
  const [errors, setErrors] = useState<
    (ErrorRecord & { ctx?: { type: string; year: number; month: number; text?: string } | null })[]
  >([])
  const [filter, setFilter] = useState<'all' | 'listening' | 'translation'>(
    'all'
  )
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    loadErrors()
  }, [filter, user])

  const loadErrors = async () => {
    const typeFilter = filter === 'all' ? undefined : filter
    const records = await getErrorRecords(typeFilter)

    // 合并云端数据
    let cloudRecords: ErrorRecord[] = []
    if (user) {
      cloudRecords = await getErrorsFromCloud(user.id)
    }

    // 合并去重 (以 questionId 为 key)
    const merged = new Map<string, ErrorRecord>()
    for (const r of records) merged.set(r.questionId, r)
    for (const r of cloudRecords) {
      if (!merged.has(r.questionId)) merged.set(r.questionId, r)
    }

    const enriched = await Promise.all(
      [...merged.values()].map(async (r) => {
        const ctx = await getQuestionContext(r.questionId)
        return { ...r, ctx }
      })
    )

    setErrors(enriched.filter((e) => !e.isResolved))
  }

  const handleResolve = async (id: number | undefined) => {
    if (id) {
      await resolveError(id)
      if (user) await resolveErrorInCloud(id)
    }
    await loadErrors()
  }

  const handleRedo = (err: ErrorRecord & { ctx?: { type: string; year: number; month: number; text?: string } | null }) => {
    const ctx = err.ctx
    if (!ctx) return
    if (ctx.type === 'listening') {
      const match = err.questionId.match(/S([12])/)
      const setNum = match ? match[1] : '1'
      navigate(`/listening/${ctx.year}/${ctx.month}/${setNum}`)
    } else {
      navigate(`/translation/${ctx.year}/${ctx.month}`)
    }
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <h1 className="text-xl font-bold text-gray-800 mb-4">📋 错题本</h1>

      {/* 筛选 */}
      <div className="flex gap-2 mb-4">
        {(['all', 'listening', 'translation'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f === 'all' ? '全部' : f === 'listening' ? '🎧 听力' : '✏️ 翻译'}
          </button>
        ))}
      </div>

      {errors.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🎉</p>
          <p className="text-gray-500">暂无错题，继续保持！</p>
        </div>
      ) : (
        <div className="space-y-3">
          {errors.map((err) => (
            <div
              key={err.id}
              className="bg-white border border-gray-200 rounded-xl p-4"
            >
              {/* 头部信息 */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400">
                  {formatTime(err.timestamp)} ·{' '}
                  {err.ctx?.type === 'listening' ? '🎧 听力' : '✏️ 翻译'}
                  {' · '}
                  {err.ctx?.year}年{err.ctx?.month}月
                </span>
                <span className="text-xs text-gray-400">
                  练习 {err.practiceCount} 次
                </span>
              </div>

              {/* 题目摘要 */}
              {err.ctx && (
                <div className="mb-2">
                  <p className="text-sm text-gray-700 font-medium">
                    {err.ctx.text || '(题目已加载)'}
                  </p>
                </div>
              )}

              {/* 用户答案 */}
              <div className="bg-red-50 rounded-lg p-2 mb-3">
                <p className="text-xs text-red-600">
                  <span className="font-medium">你的答案：</span>
                  {err.userAnswer.length > 100
                    ? err.userAnswer.slice(0, 100) + '...'
                    : err.userAnswer}
                </p>
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleRedo(err)}
                  className="flex-1 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-medium active:bg-indigo-100"
                >
                  重新练习
                </button>
                <button
                  onClick={() => handleResolve(err.id)}
                  className="flex-1 py-2 bg-green-50 text-green-600 rounded-lg text-xs font-medium active:bg-green-100"
                >
                  ✓ 已掌握
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
