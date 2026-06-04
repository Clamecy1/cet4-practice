import Dexie, { type Table } from 'dexie'
import type {
  Question,
  ListeningSection,
  ErrorRecord,
  VocabularyWord,
  UserProgress,
  SessionRecord,
} from './types'

class CET4Database extends Dexie {
  questions!: Table<Question, string>
  listeningSections!: Table<ListeningSection, string>
  errorBook!: Table<ErrorRecord, number>
  vocabularyBook!: Table<VocabularyWord, number>
  userProgress!: Table<UserProgress, number>
  sessions!: Table<SessionRecord, number>

  constructor() {
    super('cet4-practice')
    this.version(2).stores({
      questions: 'id, type, year, month',
      listeningSections: 'id, year, month, setNumber',
      errorBook: '++id, questionId, isResolved, timestamp',
      vocabularyBook: '++id, word, timestamp',
      userProgress: '++id, questionId, timestamp',
    })
    this.version(3).stores({
      questions: 'id, type, year, month',
      listeningSections: 'id, year, month, setNumber',
      errorBook: '++id, questionId, isResolved, timestamp',
      vocabularyBook: '++id, word, timestamp',
      userProgress: '++id, questionId, timestamp',
      sessions: '++id, examType, year, month, timestamp',
    })
  }
}

export const db = new CET4Database()

// ====== 题库操作 ======

export async function loadQuestions(data: Question[]) {
  await db.questions.bulkPut(data)
}

export async function getQuestionsByType(
  type: 'listening' | 'translation',
  year: number,
  month: number
) {
  return db.questions
    .where({ type, year, month })
    .toArray()
}

export async function getQuestionById(id: string) {
  return db.questions.get(id)
}

// ====== 错题本操作 ======

export async function addErrorRecord(questionId: string, userAnswer: string) {
  const existing = await db.errorBook
    .where('questionId')
    .equals(questionId)
    .first()

  if (existing) {
    await db.errorBook.update(existing.id!, {
      userAnswer,
      timestamp: Date.now(),
      practiceCount: existing.practiceCount + 1,
    })
  } else {
    await db.errorBook.add({
      questionId,
      userAnswer,
      timestamp: Date.now(),
      isResolved: false,
      practiceCount: 1,
    })
  }
}

function getQuestionType(id: string): 'listening' | 'translation' {
  if (id.startsWith('T-')) return 'translation'
  return 'listening'
}

export async function getErrorRecords(type?: 'listening' | 'translation') {
  let collection = db.errorBook.orderBy('timestamp').reverse()
  const errors = await collection.toArray()

  if (!type) return errors

  return errors.filter((e) => getQuestionType(e.questionId) === type)
}

export async function resolveError(id: number) {
  await db.errorBook.update(id, { isResolved: true })
}

export async function unresolveError(id: number) {
  await db.errorBook.update(id, { isResolved: false })
}

export async function deleteError(id: number) {
  await db.errorBook.delete(id)
}

// ====== 生词本操作 ======

export async function addVocabularyWord(
  word: string,
  translation: string,
  context?: string
) {
  const existing = await db.vocabularyBook
    .where('word')
    .equals(word)
    .first()

  if (existing) return existing.id // 已存在，跳过

  return db.vocabularyBook.add({
    word,
    translation,
    context,
    timestamp: Date.now(),
  })
}

export async function getVocabularyWords() {
  return db.vocabularyBook.orderBy('timestamp').reverse().toArray()
}

export async function deleteVocabularyWord(id: number) {
  await db.vocabularyBook.delete(id)
}

// ====== 答题进度 ======

export async function recordProgress(
  questionId: string,
  isCorrect: boolean,
  userAnswer: string,
  score?: number
) {
  await db.userProgress.add({
    questionId,
    isCorrect,
    userAnswer,
    score,
    timestamp: Date.now(),
  })
}

export async function getProgressByQuestion(questionId: string) {
  return db.userProgress
    .where('questionId')
    .equals(questionId)
    .toArray()
}

// ====== 听力 Section 操作 ======

export async function loadListeningSections(data: ListeningSection[]) {
  await db.listeningSections.bulkPut(data)
}

export async function getListeningSections(
  year: number,
  month: number,
  setNumber: 1 | 2 | 3
) {
  return db.listeningSections
    .where({ year, month, setNumber })
    .toArray()
}

// 根据 questionId 查找题目上下文（用于错题本展示）
export async function getQuestionContext(id: string) {
  // 翻译题
  if (id.startsWith('T-')) {
    const q = await db.questions.get(id)
    if (q) return { type: 'translation' as const, year: q.year, month: q.month, text: (q as any).chineseText?.slice(0, 80) }
    return null
  }

  // 新听力题 (2024-06-S1-Q1)
  const match = id.match(/^(\d{4})-(\d{2})-S([12])-Q\d+$/)
  if (match) {
    const [, year, month, set] = match
    const sections = await db.listeningSections
      .where({ year: Number(year), month: Number(month), setNumber: Number(set) as 1 | 2 })
      .toArray()
    for (const sec of sections) {
      const q = sec.questions.find((q) => q.id === id)
      if (q) return { type: 'listening' as const, year: Number(year), month: Number(month), text: q.question }
    }
  }

  // 旧听力题
  const q = await db.questions.get(id)
  if (q) return { type: 'listening' as const, year: q.year, month: q.month, text: (q as any).question }
  return null
}

// ====== 成绩记录 ======

export async function saveSession(session: SessionRecord) {
  return db.sessions.add(session)
}

export async function getAllSessions() {
  return db.sessions.orderBy('timestamp').reverse().toArray()
}

export async function getCompletedExams() {
  const sessions = await db.sessions.toArray()
  const completed = new Set<string>()
  for (const s of sessions) {
    if (s.examType === 'listening') {
      completed.add(`${s.year}-${s.month}-S${s.setNumber}`)
    } else {
      completed.add(`${s.year}-${s.month}`)
    }
  }
  return completed
}
