import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllSessions, getCompletedExams } from '../db/db'
import type { SessionRecord } from '../db/types'

const YEARS = [2021, 2022, 2023, 2024, 2025]

const MONTHS: { value: number; label: string }[] = [
  { value: 3, label: '3月' },
  { value: 6, label: '6月' },
  { value: 9, label: '9月' },
  { value: 12, label: '12月' },
]

function getSetCount(year: number, month: number): number {
  if (year === 2022 && month === 6) return 1
  if ((year === 2022 && month === 9) || (year === 2023 && month === 3)) return 3
  if (year === 2025 && (month === 6 || month === 12)) return 3
  return 2
}

function examExists(year: number, month: number): boolean {
  if (month === 3 && year !== 2023) return false
  if (month === 9 && year !== 2022) return false
  return true
}

function formatDate(ts: number): string {
  const d = new Date(ts)
  return `${d.getMonth() + 1}/${d.getDate()}`
}

function toDateKey(ts: number): string {
  const d = new Date(ts)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function Stats() {
  const navigate = useNavigate()
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [completedExams, setCompletedExams] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [allSessions, completed] = await Promise.all([
        getAllSessions(),
        getCompletedExams(),
      ])
      setSessions(allSessions)
      setCompletedExams(completed)
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <div className="max-w-lg mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">加载中...</p>
      </div>
    )
  }

  // --- 计算统计数据 ---

  const totalSessions = sessions.length
  const totalScore = sessions.reduce((sum, s) => sum + s.score, 0)
  const totalPossible = sessions.reduce((sum, s) => sum + s.total, 0)
  const overallAccuracy = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0
  const avgScore = totalSessions > 0 ? Math.round(totalScore / totalSessions) : 0

  // 打卡天数
  const practiceDates = [...new Set(sessions.map((s) => toDateKey(s.timestamp)))].sort().reverse()
  const streak = (() => {
    let count = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const check = new Date(today)
    while (true) {
      const key = `${check.getFullYear()}-${String(check.getMonth() + 1).padStart(2, '0')}-${String(check.getDate()).padStart(2, '0')}`
      if (practiceDates.includes(key)) {
        count++
        check.setDate(check.getDate() - 1)
      } else {
        break
      }
    }
    return count
  })()

  // 近 14 天热力图
  const last14Days: { date: Date; key: string; hasPractice: boolean; isToday: boolean }[] = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  for (let i = 13; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    last14Days.push({ date: d, key, hasPractice: practiceDates.includes(key), isToday: i === 0 })
  }

  // 听力 / 翻译分类统计
  const listeningSessions = sessions.filter((s) => s.examType === 'listening')
  const translationSessions = sessions.filter((s) => s.examType === 'translation')
  const listeningAccuracy = listeningSessions.reduce((sum, s) => sum + s.score, 0) /
    Math.max(listeningSessions.reduce((sum, s) => sum + s.total, 0), 1)
  const translationAccuracy = translationSessions.reduce((sum, s) => sum + s.score, 0) /
    Math.max(translationSessions.reduce((sum, s) => sum + s.total, 0), 1)

  // 近期记录
  const recentSessions = sessions.slice(0, 10)

  return (
    <div className="max-w-lg mx-auto px-4 py-4 pb-20">
      <h2 className="text-lg font-medium text-gray-800 mb-4">📊 学习统计</h2>

      {/* 空状态 */}
      {totalSessions === 0 && (
        <div className="text-center py-16">
          <p className="text-4xl mb-4">📝</p>
          <p className="text-gray-500 text-sm">还没有练习记录</p>
          <p className="text-gray-400 text-xs mt-1">完成一次听力或翻译练习后，统计数据会在这里展示</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 px-6 py-2.5 bg-indigo-600 text-white text-sm rounded-xl active:bg-indigo-700"
          >
            去练习
          </button>
        </div>
      )}

      {totalSessions > 0 && (
        <>
          {/* 概览卡片 */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">练习次数</p>
              <p className="text-2xl font-bold text-gray-800">{totalSessions}</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">总体正确率</p>
              <p className="text-2xl font-bold text-indigo-600">{overallAccuracy}%</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">连续打卡</p>
              <p className="text-2xl font-bold text-emerald-600">{streak} 天</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">平均得分</p>
              <p className="text-2xl font-bold text-gray-800">{avgScore}</p>
            </div>
          </div>

          {/* 题型细分 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">题型统计</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">🎧 听力</span>
                <span className="text-gray-400">{listeningSessions.length} 次</span>
                <span className="text-indigo-600 font-medium">
                  {listeningSessions.length > 0 ? `${Math.round(listeningAccuracy * 100)}%` : '-'}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div
                  className="bg-indigo-500 h-1 rounded-full transition-all"
                  style={{ width: `${listeningSessions.length > 0 ? Math.round(listeningAccuracy * 100) : 0}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">📝 翻译</span>
                <span className="text-gray-400">{translationSessions.length} 次</span>
                <span className="text-emerald-600 font-medium">
                  {translationSessions.length > 0 ? `${Math.round(translationAccuracy * 100)}%` : '-'}
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1">
                <div
                  className="bg-emerald-500 h-1 rounded-full transition-all"
                  style={{ width: `${translationSessions.length > 0 ? Math.round(translationAccuracy * 100) : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* 打卡热力图 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
            <h3 className="text-sm font-medium text-gray-700 mb-3">近 14 天打卡</h3>
            <div className="flex gap-1 justify-center">
              {last14Days.map((d) => (
                <div
                  key={d.key}
                  title={d.key}
                  className={`w-8 h-8 rounded-md transition-colors ${
                    d.hasPractice
                      ? 'bg-emerald-400'
                      : 'bg-gray-100'
                  } ${d.isToday ? 'ring-2 ring-indigo-400 ring-offset-1' : ''}`}
                />
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-2 px-1">
              <span>{last14Days[0]?.date.getMonth() + 1}/{last14Days[0]?.date.getDate()}</span>
              <span>今天</span>
            </div>
          </div>

          {/* 套卷完成度 */}
          <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5 overflow-x-auto">
            <h3 className="text-sm font-medium text-gray-700 mb-3">套卷完成度</h3>
            <div className="min-w-max">
              {/* 表头 */}
              <div className="flex mb-1">
                <div className="w-10" />
                {MONTHS.map((m) => (
                  <div key={m.value} className="w-12 text-center text-xs text-gray-400">{m.label}</div>
                ))}
              </div>
              {/* 行 */}
              {YEARS.map((year) => (
                <div key={year} className="flex items-center mb-1.5">
                  <div className="w-10 text-xs text-gray-500">{year}</div>
                  {MONTHS.map((m) => {
                    if (!examExists(year, m.value)) {
                      return <div key={m.value} className="w-12 text-center text-xs text-gray-300">-</div>
                    }
                    const setCount = getSetCount(year, m.value)
                    const listeningComplete = Array.from({ length: setCount }, (_, i) =>
                      completedExams.has(`${year}-${m.value}-S${i + 1}`)
                    )
                    const translationComplete = completedExams.has(`${year}-${m.value}`)
                    return (
                      <div key={m.value} className="w-12 flex flex-col items-center gap-0.5">
                        {/* 听力套数圆点 */}
                        <div className="flex gap-0.5">
                          {listeningComplete.map((done, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                done ? 'bg-indigo-400' : 'bg-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                        {/* 翻译圆点 */}
                        <div
                          className={`w-2 h-2 rounded-full ${
                            translationComplete ? 'bg-emerald-400' : 'bg-gray-200'
                          }`}
                        />
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-xs text-gray-400 justify-center">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block" /> 听力
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> 翻译
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-gray-200 inline-block" /> 未完成
              </span>
            </div>
          </div>

          {/* 近期记录 */}
          {recentSessions.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 p-4 mb-5">
              <h3 className="text-sm font-medium text-gray-700 mb-3">近期记录</h3>
              <div className="space-y-2">
                {recentSessions.map((s, i) => (
                  <div key={s.id || i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-10">{formatDate(s.timestamp)}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${s.examType === 'listening' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'}`}>
                        {s.examType === 'listening' ? '听力' : '翻译'}
                      </span>
                      <span className="text-gray-600 text-xs">
                        {s.year}年{s.month}月
                        {s.setNumber && ` 第${s.setNumber}套`}
                      </span>
                    </div>
                    <span className="text-gray-700 font-medium text-xs">
                      {s.score}/{s.total}
                      <span className="text-gray-400 ml-1">
                        ({Math.round((s.score / s.total) * 100)}%)
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
