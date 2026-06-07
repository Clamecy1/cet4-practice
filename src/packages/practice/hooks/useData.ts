import { useMemo } from 'react'
import type { ListeningSection, TranslationQuestion } from '../../storage/types'
import allSections from '../data/sections'
import allQuestions from '../data/questions'

// 静态题库数据筛选 hooks（数据是 ES import，无需异步加载）

export function useListeningSections(year: number, month: number, setNumber: 1 | 2 | 3) {
  return useMemo(() => {
    const sections = (allSections as ListeningSection[]).filter(
      (s) => s.year === year && s.month === month && s.setNumber === setNumber,
    )
    sections.sort((a, b) => a.audioStart - b.audioStart)
    return { sections, loading: false }
  }, [year, month, setNumber])
}

export function useTranslationQuestions(year: number, month: number) {
  return useMemo(() => {
    const questions = (allQuestions as TranslationQuestion[]).filter(
      (q) => q.type === 'translation' && q.year === year && q.month === month,
    )
    return { questions, loading: false }
  }, [year, month])
}

// 错题本上下文查找
export function getQuestionContext(id: string): {
  type: 'listening' | 'translation'
  year: number
  month: number
  text?: string
} | null {
  if (id.startsWith('T-')) {
    const q = (allQuestions as TranslationQuestion[]).find((q) => q.id === id)
    if (q) {
      return { type: 'translation', year: q.year, month: q.month, text: q.chineseText?.slice(0, 80) }
    }
    return null
  }

  // 新听力题 (2024-06-S1-Q1)
  const match = id.match(/^(\d{4})-(\d{2})-S([12])-Q\d+$/)
  if (match) {
    const [, year, month, set] = match
    for (const sec of allSections as ListeningSection[]) {
      if (sec.year === Number(year) && sec.month === Number(month) && sec.setNumber === Number(set)) {
        const q = sec.questions.find((q) => q.id === id)
        if (q) {
          return { type: 'listening', year: Number(year), month: Number(month), text: q.question }
        }
      }
    }
  }

  // 旧听力题
  const q = (allQuestions as any[]).find((q) => q.id === id)
  if (q) {
    return { type: 'listening', year: q.year, month: q.month, text: q.question }
  }
  return null
}
