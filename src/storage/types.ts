// 听力题（section 内的子题）
export interface ListeningSubQuestion {
  id: string
  question: string
  options: string[] // A, B, C, D
  answer: string
}

// 听力 Section（一段音频 + 一组题）
export interface ListeningSection {
  id: string
  year: number
  month: number
  setNumber: 1 | 2 | 3
  label: string
  audioSrc: string // 本地路径如 "/audio/2024-06-S1.mp3"，运行时解析 CDN URL
  audioStart: number // 起始秒数
  transcript: string
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
  score?: number
  timestamp: number
}

// 练习成绩记录
export interface SessionRecord {
  id?: number
  examType: 'listening' | 'translation'
  year: number
  month: number
  setNumber?: number
  score: number
  total: number
  timestamp: number
}
