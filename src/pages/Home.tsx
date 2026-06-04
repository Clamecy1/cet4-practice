import { useState } from 'react'
import { Link } from 'react-router-dom'

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

type Section = 'listening' | 'translation'

export default function Home() {
  const [openSection, setOpenSection] = useState<Section | null>(null)
  const [openYear, setOpenYear] = useState<number | null>(null)

  const toggleSection = (s: Section) => {
    setOpenSection(openSection === s ? null : s)
    setOpenYear(null)
  }

  const toggleYear = (y: number) => {
    setOpenYear(openYear === y ? null : y)
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #faf8f4 0%, #f3efe7 100%)' }}>
      <div className="max-w-lg mx-auto px-5 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light tracking-wider text-gray-800" style={{ letterSpacing: '0.08em' }}>
            CET-4
          </h1>
          <p className="text-sm text-gray-400 mt-1 font-light tracking-wide">听力 · 翻译</p>
        </div>

        {/* Listening Card */}
        <div
          className={`rounded-2xl mb-4 overflow-hidden transition-all duration-500 ease-out
            ${openSection === 'listening' ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
          style={{ background: 'linear-gradient(135deg, #f6f8fb 0%, #eef2f7 100%)' }}
        >
          <button
            onClick={() => toggleSection('listening')}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #dce6f0 0%, #c8d6e3 100%)' }}
              >
                🎧
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">听力练习</h2>
                <p className="text-xs text-gray-400 mt-0.5">2021–2025 真题听力</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-300 transition-transform duration-500 ${openSection === 'listening' ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Expandable content */}
          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${openSection === 'listening' ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="px-6 pb-5 space-y-2">
              {YEARS.map((year) => {
                const yearMonths = MONTHS.filter((m) => examExists(year, m.value))
                if (yearMonths.length === 0) return null
                return (
                  <div key={year}>
                    <button
                      onClick={() => toggleYear(year)}
                      className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-sm transition-colors duration-300"
                      style={{ background: openYear === year ? 'rgba(255,255,255,0.7)' : 'transparent' }}
                    >
                      <span className="font-medium text-gray-600">{year} 年</span>
                      <svg
                        className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${openYear === year ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Exam set buttons */}
                    <div
                      className={`transition-all duration-400 ease-out overflow-hidden ${openYear === year ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="flex gap-2 px-4 pb-2 pt-1 flex-wrap">
                        {yearMonths.map((month) => {
                          const setCount = getSetCount(year, month.value)
                          return Array.from({ length: setCount }, (_, i) => i + 1).map((set) => (
                            <Link
                              key={`${year}-${month.value}-${set}`}
                              to={`/listening/${year}/${month.value}/${set}`}
                              className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300
                                hover:scale-[1.03] active:scale-[0.97]"
                              style={{
                                background: 'rgba(255,255,255,0.65)',
                                color: '#5b6e8a',
                                backdropFilter: 'blur(4px)',
                              }}
                            >
                              {month.label} 卷{set}
                            </Link>
                          ))
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Translation Card */}
        <div
          className={`rounded-2xl mb-4 overflow-hidden transition-all duration-500 ease-out
            ${openSection === 'translation' ? 'shadow-lg' : 'shadow-sm hover:shadow-md'}`}
          style={{ background: 'linear-gradient(135deg, #f9f7f1 0%, #f2efe3 100%)' }}
        >
          <button
            onClick={() => toggleSection('translation')}
            className="w-full px-6 py-5 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-lg"
                style={{ background: 'linear-gradient(135deg, #ece3d5 0%, #ddd3c0 100%)' }}
              >
                ✏️
              </div>
              <div>
                <h2 className="text-lg font-medium text-gray-800">翻译练习</h2>
                <p className="text-xs text-gray-400 mt-0.5">2021–2025 真题翻译 · AI 评分</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-gray-300 transition-transform duration-500 ${openSection === 'translation' ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            className={`transition-all duration-500 ease-out overflow-hidden ${openSection === 'translation' ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
          >
            <div className="px-6 pb-5 space-y-2">
              {YEARS.map((year) => {
                const yearMonths = MONTHS.filter((m) => examExists(year, m.value))
                if (yearMonths.length === 0) return null
                return (
                  <div key={year}>
                    <button
                      onClick={() => toggleYear(year)}
                      className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-sm transition-colors duration-300"
                      style={{ background: openYear === year ? 'rgba(255,255,255,0.7)' : 'transparent' }}
                    >
                      <span className="font-medium text-gray-600">{year} 年</span>
                      <svg
                        className={`w-4 h-4 text-gray-300 transition-transform duration-300 ${openYear === year ? 'rotate-180' : ''}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div
                      className={`transition-all duration-400 ease-out overflow-hidden ${openYear === year ? 'max-h-[200px] opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      <div className="flex gap-2 px-4 pb-2 pt-1 flex-wrap">
                        {yearMonths.map((month) => (
                          <Link
                            key={`trans-${year}-${month.value}`}
                            to={`/translation/${year}/${month.value}`}
                            className="px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300
                              hover:scale-[1.03] active:scale-[0.97]"
                            style={{
                              background: 'rgba(255,255,255,0.65)',
                              color: '#8b7e6a',
                              backdropFilter: 'blur(4px)',
                            }}
                          >
                            {month.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
