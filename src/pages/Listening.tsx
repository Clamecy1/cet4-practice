import { useState, useCallback, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useInitData, useListeningSections } from '../hooks/useQuestions'
import { addErrorRecord, recordProgress, saveSession } from '../db/db'
import { syncSessionToCloud, syncErrorToCloud } from '../db/cloudSync'
import { useAuth } from '../contexts/AuthContext'
import AudioPlayer from '../components/AudioPlayer'
import WordPopup from '../components/WordPopup'
import transcriptsCN from '../data/transcripts-cn.json'
import type { ListeningSubQuestion } from '../db/types'

export default function Listening() {
  const { year, month, set } = useParams<{
    year: string; month: string; set: string
  }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const ready = useInitData()
  const { sections, loading } = useListeningSections(
    Number(year), Number(month), Number(set) as 1 | 2 | 3
  )

  const [secIdx, setSecIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [popup, setPopup] = useState<{ word: string; x: number; y: number } | null>(null)
  const scoreRef = useRef({ correctCount: 0, totalQuestions: 0 })

  const handleTextSelect = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const selection = window.getSelection()
    if (!selection || !selection.toString().trim()) return
    const text = selection.toString().trim()
    // Filter: only single English words or short Chinese phrases
    if (text.length < 2 || text.length > 20) return
    if (/\s/.test(text)) return // no multi-word selections
    // Get position from touch or mouse
    const pos = 'touches' in e ? (e as React.TouchEvent).touches[0] : e
    setPopup({ word: text, x: ('clientX' in pos ? pos.clientX : 0) - 20, y: ('clientY' in pos ? pos.clientY : 0) + 10 })
  }, [])

  // section 切换时的处理（包括 AudioPlayer 点击标记触发）
  const goToSection = (index: number) => {
    setSecIdx(index)
    setAnswers({})
    setSubmitted(false)
    setShowTranscript(false)
    setShowTranslation(false)
  }

  if (!ready || loading) {
    return <div className="max-w-lg mx-auto px-4 py-12 text-center"><p className="text-gray-500">加载中...</p></div>
  }

  if (sections.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">该场次暂无听力题目（数据持续补充中）</p>
        <button onClick={() => navigate('/')} className="mt-4 text-indigo-600 text-sm underline">返回首页</button>
      </div>
    )
  }

  const section = sections[secIdx]
  const isLast = secIdx === sections.length - 1
  const allAnswered = section.questions.every((q) => answers[q.id])

  const handleSubmit = async () => {
    if (!allAnswered || submitted) return
    setSubmitted(true)
    let correctCount = 0
    for (const q of section.questions) {
      const isCorrect = answers[q.id] === q.answer
      if (isCorrect) correctCount++
      else {
        await addErrorRecord(q.id, answers[q.id])
        if (user) {
          syncErrorToCloud({
            questionId: q.id,
            userAnswer: answers[q.id],
            timestamp: Date.now(),
            isResolved: false,
            practiceCount: 1,
          }, user.id)
        }
      }
      await recordProgress(q.id, isCorrect, answers[q.id])
    }
    scoreRef.current.correctCount += correctCount
    scoreRef.current.totalQuestions += section.questions.length
  }

  const handleNext = async () => {
    if (isLast) {
      const session = {
        examType: 'listening' as const,
        year: Number(year),
        month: Number(month),
        setNumber: Number(set) as 1 | 2 | 3,
        score: scoreRef.current.correctCount,
        total: scoreRef.current.totalQuestions,
        timestamp: Date.now(),
      }
      await saveSession(session)
      if (user) syncSessionToCloud(session, user.id)
      navigate(`/result?type=listening&year=${year}&month=${month}&set=${set}&score=${scoreRef.current.correctCount}&total=${scoreRef.current.totalQuestions}`)
      return
    }
    goToSection(secIdx + 1)
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => navigate('/')} className="text-gray-500 text-sm">← 返回</button>
        <span className="text-sm text-gray-400">Section {secIdx + 1} / {sections.length}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1 mb-4">
        <div className="bg-indigo-500 h-1 rounded-full transition-all" style={{ width: `${((secIdx + 1) / sections.length) * 100}%` }} />
      </div>

      <span className="text-xs text-gray-400">{section.label}</span>

      {/* 音频播放器（自定义进度条+章节标记） */}
      <div className="mt-2 mb-4">
        <AudioPlayer
          audioSrc={section.audioSrc}
          sections={sections}
          currentIndex={secIdx}
          onSectionChange={goToSection}
        />
      </div>

      {/* 原文 + 翻译 */}
      <div className="mb-4">
        <div className="flex gap-3">
          <button onClick={() => setShowTranscript(!showTranscript)} className="text-sm text-indigo-600 underline">
            {showTranscript ? '收起原文 ▲' : '查看原文 ▼'}
          </button>
          <button onClick={() => setShowTranslation(!showTranslation)} className="text-sm text-emerald-600 underline">
            {showTranslation ? '收起翻译 ▲' : '中文翻译 ▼'}
          </button>
        </div>
        {showTranscript && (
          <div
            className="mt-2 bg-gray-50 rounded-lg p-3 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap select-text"
            onMouseUp={handleTextSelect}
            onTouchEnd={handleTextSelect}
          >{section.transcript}</div>
        )}
        {showTranslation && (
          <div className="mt-2 bg-emerald-50 rounded-lg p-3 text-xs text-gray-700 leading-relaxed whitespace-pre-wrap select-text">
            {(transcriptsCN as Record<string, string>)[section.id] || '翻译暂未生成'}
          </div>
        )}
      </div>

      {/* 题目 */}
      <div className="space-y-4 mb-6">
        {section.questions.map((q, qi) => (
          <QuestionCard key={q.id} question={q} index={qi} selected={answers[q.id] || null} submitted={submitted}
            onSelect={(opt) => !submitted && setAnswers((a) => ({ ...a, [q.id]: opt }))} />
        ))}
      </div>

      {!submitted ? (
        <>
          <button onClick={handleSubmit} disabled={!allAnswered}
            className={`w-full py-3 rounded-xl text-white font-medium text-sm ${allAnswered ? 'bg-indigo-600 active:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}>
            提交答案
          </button>
          {secIdx > 0 && (
            <button onClick={() => goToSection(secIdx - 1)} className="w-full mt-3 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm active:bg-gray-300">
              ← 上一 Section
            </button>
          )}
        </>
      ) : (
        <div className="flex gap-3">
          {secIdx > 0 && (
            <button onClick={() => goToSection(secIdx - 1)} className="flex-1 py-3 bg-gray-200 text-gray-700 rounded-xl font-medium text-sm active:bg-gray-300">
              ← 上一 Section
            </button>
          )}
          <button onClick={handleNext} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium text-sm active:bg-indigo-700">
            {isLast ? '查看成绩' : '下一 Section →'}
          </button>
        </div>
      )}

      {/* Word popup */}
      {popup && (
        <WordPopup word={popup.word} position={{ x: popup.x, y: popup.y }} onClose={() => setPopup(null)} />
      )}
    </div>
  )
}

function QuestionCard({ question, index, selected, submitted, onSelect }: {
  question: ListeningSubQuestion; index: number; selected: string | null; submitted: boolean; onSelect: (opt: string) => void
}) {
  const labels = ['A', 'B', 'C', 'D']
  return (
    <div className="border border-gray-200 rounded-xl p-3">
      <p className="text-sm font-medium text-gray-800 mb-2">{index + 1}. {question.question}</p>
      <div className="space-y-1.5">
        {question.options.map((opt, i) => {
          const label = labels[i]
          const isCorrect = label === question.answer
          let bg = 'bg-white'
          if (submitted) {
            if (isCorrect) bg = 'bg-green-50 ring-1 ring-green-400'
            else if (selected === label) bg = 'bg-red-50 ring-1 ring-red-400'
          } else if (selected === label) bg = 'bg-indigo-50'
          return (
            <button key={label} onClick={() => onSelect(label)} disabled={submitted}
              className={`w-full text-left p-2 rounded-lg text-xs transition-colors ${bg} ${submitted ? '' : 'active:bg-indigo-50'}`}>
              <span className="font-semibold text-indigo-600 mr-1">{label}.</span>
              <span className="text-gray-700">{opt.slice(3)}</span>
              {submitted && isCorrect && <span className="ml-1 text-green-600">✓</span>}
              {submitted && selected === label && !isCorrect && <span className="ml-1 text-red-600">✗</span>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
