// 听力题（section 内的子题）
export interface ListeningSubQuestion {
  id: string
  question: string
  options: string[] // A, B, C, D
  answer: string
}

// 听力 Section（一段音频 + 一组题）
export interface ListeningSection {
  id: string // "2024-06-S1-SecA-1"
  year: number
  month: number
  setNumber: 1 | 2 | 3
  label: string // "Section A — News Report 1"
  audioSrc: string // 本地 mp3 路径如 "/audio/2024-06-S1.mp3"
  audioStart: number // 起始秒数
  transcript: string // 该 section 完整原文
  questions: ListeningSubQuestion[]
}

// 翻译题
export interface TranslationQuestion {
  id: string
  type: 'translation'
  year: number
  month: number
  section: string
  chineseText: string
  referenceAnswer: string
  keyPoints?: string[]
}

// 旧听力题（保留兼容错题本）
export interface ListeningQuestion {
  id: string
  type: 'listening'
  year: number
  month: number
  section: string
  audioUrl: string
  question: string
  options: string[]
  answer: string
  transcript?: string
}

export type Question = ListeningQuestion | TranslationQuestion

// 错题记录
export interface ErrorRecord {
  id?: number
  questionId: string
  userAnswer: string
  timestamp: number
  isResolved: boolean
  practiceCount: number
}

// 生词记录
export interface VocabularyWord {
  id?: number
  word: string
  translation: string
  context?: string
  timestamp: number
}

// 用户答题进度
export interface UserProgress {
  id?: number
  questionId: string
  isCorrect: boolean
  userAnswer: string
  score?: number // 翻译题实际得分 (0-100)
  timestamp: number
}

// 练习成绩记录
export interface SessionRecord {
  id?: number
  examType: 'listening' | 'translation'
  year: number
  month: number
  setNumber?: number // 仅听力有套数
  score: number
  total: number
  timestamp: number
}
