import { useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInitData, useTranslationQuestions } from '../hooks/useQuestions'
import { addErrorRecord, recordProgress, saveSession } from '../db/db'
import { syncSessionToCloud, syncErrorToCloud } from '../db/cloudSync'
import { useAuth } from '../contexts/AuthContext'
import { scoreTranslation } from '../utils/api'
import WordPopup from '../components/WordPopup'
import type { TranslationQuestion } from '../db/types'

export default function Translation() {
  const { year, month } = useParams<{ year: string; month: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const ready = useInitData()
  const { questions, loading } = useTranslationQuestions(
    Number(year),
    Number(month)
  )

  const [index, setIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scoring, setScoring] = useState(false)
  const [result, setResult] = useState<{
    score: number
    feedback: string
  } | null>(null)
  const [scores, setScores] = useState<number[]>([])
  const [popup, setPopup] = useState<{ word: string; x: number; y: number } | null>(null)

  const handleTextSelect = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const selection = window.getSelection()
    if (!selection || !selection.toString().trim()) return
    const text = selection.toString().trim()
    if (text.length < 2 || text.length > 20) return
    if (/\s/.test(text)) return
    const pos = 'touches' in e ? (e as React.TouchEvent).touches[0] : e
    setPopup({ word: text, x: ('clientX' in pos ? pos.clientX : 0) - 20, y: ('clientY' in pos ? pos.clientY : 0) + 10 })
  }, [])

  if (!ready || loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">该场次暂无翻译题目</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-indigo-600 text-sm underline"
        >
          返回首页
        </button>
      </div>
    )
  }

  const q = questions[index] as TranslationQuestion
  const isLast = index === questions.length - 1

  const handleSubmit = async () => {
    if (!userInput.trim() || submitted) return
    setSubmitted(true)
    setScoring(true)

    const res = await scoreTranslation(
      q.chineseText,
      q.referenceAnswer,
      userInput.trim()
    )
    setResult(res)
    setScoring(false)

    setScores((prev) => [...prev, res.score])
    await recordProgress(q.id, res.score >= 60, userInput.trim(), res.score)

    if (res.score < 60) {
      await addErrorRecord(q.id, userInput.trim())
      if (user) {
        syncErrorToCloud({
          questionId: q.id,
          userAnswer: userInput.trim(),
          timestamp: Date.now(),
          isResolved: false,
          practiceCount: 1,
        }, user.id)
      }
    }
  }

  const handleNext = async () => {
    if (isLast) {
      const avgScore = scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0
      const session = {
        examType: 'translation' as const,
        year: Number(year),
        month: Number(month),
        score: avgScore,
        total: 100,
        timestamp: Date.now(),
      }
      await saveSession(session)
      if (user) syncSessionToCloud(session, user.id)
      navigate(`/result?type=translation&year=${year}&month=${month}&score=${avgScore}&total=100`)
    } else {
      setIndex((i) => i + 1)
      setUserInput('')
      setSubmitted(false)
      setResult(null)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => navigate('/')} className="text-gray-500 text-sm">
          ← 返回
        </button>
        <span className="text-sm text-gray-400">
          {index + 1} / {questions.length}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((index + 1) / questions.length) * 100}%` }}
        />
      </div>

      <span className="text-xs text-gray-400 mb-2 block">{q.section}</span>

      {/* 中文原文 */}
      <div className="bg-emerald-50 rounded-xl p-4 mb-4">
        <h3 className="text-sm font-medium text-emerald-700 mb-2">
          📝 请将以下中文翻译成英文：
        </h3>
        <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap select-text" onMouseUp={handleTextSelect} onTouchEnd={handleTextSelect}>
          {q.chineseText}
        </p>
      </div>

      {/* 用户译文输入 */}
      <textarea
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        disabled={submitted}
        placeholder="在此输入你的英文翻译..."
        className={`w-full h-40 p-4 border-2 rounded-xl text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
          submitted ? 'bg-gray-50 border-gray-200' : 'border-gray-200'
        }`}
      />

      {/* 提交按钮 */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!userInput.trim() || scoring}
          className={`w-full mt-4 py-3 rounded-xl text-white font-medium text-sm transition-all ${
            userInput.trim()
              ? 'bg-emerald-600 active:bg-emerald-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          提交评分
        </button>
      ) : scoring ? (
        <div className="mt-4 py-3 text-center text-gray-500 text-sm">
          ⏳ AI 正在评分中...
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {/* 评分结果 */}
          {result && (
            <div className="bg-white border rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl font-bold ${
                    result.score >= 80
                      ? 'text-green-600'
                      : result.score >= 60
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {result.score} 分
                </span>
                <span className="text-sm text-gray-500">
                  {result.score >= 80
                    ? '👍 优秀'
                    : result.score >= 60
                    ? '👌 及格'
                    : '📚 需加强'}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {result.feedback}
              </p>

              {/* 参考译文 */}
              <details className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <summary className="cursor-pointer font-medium">
                  📖 查看参考译文
                </summary>
                <p className="mt-2 leading-relaxed select-text" onMouseUp={handleTextSelect} onTouchEnd={handleTextSelect}>{q.referenceAnswer}</p>
              </details>
            </div>
          )}

          <button
            onClick={handleNext}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-medium text-sm active:bg-emerald-700"
          >
            {isLast ? '查看成绩' : '下一题 →'}
          </button>
        </div>
      )}

      {/* Word popup */}
      {popup && (
        <WordPopup word={popup.word} position={{ x: popup.x, y: popup.y }} onClose={() => setPopup(null)} />
      )}

      {/* 生词提示 */}
      {!submitted && (
        <p className="text-xs text-gray-400 mt-3 text-center">
          💡 提示：选中不认识的词可快速查释义并添加到生词本
        </p>
      )}
    </div>
  )
}
