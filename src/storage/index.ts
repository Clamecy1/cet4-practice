import Taro from '@tarojs/taro'
import type { ErrorRecord, VocabularyWord, UserProgress, SessionRecord } from './types'

// ====== Keys ======
const KEYS = {
  errorBook: 'cet4_errorBook',
  vocabularyBook: 'cet4_vocabularyBook',
  userProgress: 'cet4_userProgress',
  sessions: 'cet4_sessions',
} as const

// ====== Helpers ======
function read<T>(key: string): T[] {
  try {
    const data = Taro.getStorageSync(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function write<T>(key: string, data: T[]): void {
  Taro.setStorageSync(key, JSON.stringify(data))
}

function nextId(): number {
  return Date.now()
}

function getQuestionType(id: string): 'listening' | 'translation' {
  if (id.startsWith('T-')) return 'translation'
  return 'listening'
}

// ====== Error Book ======

export function addErrorRecord(questionId: string, userAnswer: string): void {
  const errors = read<ErrorRecord>(KEYS.errorBook)
  const existing = errors.find((e) => e.questionId === questionId)
  if (existing) {
    existing.userAnswer = userAnswer
    existing.timestamp = Date.now()
    existing.practiceCount = (existing.practiceCount || 0) + 1
  } else {
    errors.push({
      id: nextId(),
      questionId,
      userAnswer,
      timestamp: Date.now(),
      isResolved: false,
      practiceCount: 1,
    })
  }
  write(KEYS.errorBook, errors)
}

export function getErrorRecords(type?: 'listening' | 'translation'): ErrorRecord[] {
  const errors = read<ErrorRecord>(KEYS.errorBook)
  const unresolved = errors.filter((e) => !e.isResolved)
  if (!type) return unresolved.sort((a, b) => b.timestamp - a.timestamp)
  return unresolved
    .filter((e) => getQuestionType(e.questionId) === type)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function resolveError(id: number): void {
  const errors = read<ErrorRecord>(KEYS.errorBook)
  const err = errors.find((e) => e.id === id)
  if (err) err.isResolved = true
  write(KEYS.errorBook, errors)
}

export function unresolveError(id: number): void {
  const errors = read<ErrorRecord>(KEYS.errorBook)
  const err = errors.find((e) => e.id === id)
  if (err) err.isResolved = false
  write(KEYS.errorBook, errors)
}

export function deleteError(id: number): void {
  const errors = read<ErrorRecord>(KEYS.errorBook)
  write(KEYS.errorBook, errors.filter((e) => e.id !== id))
}

// ====== Vocabulary Book ======

export function addVocabularyWord(word: string, translation: string, context?: string): number | null {
  const words = read<VocabularyWord>(KEYS.vocabularyBook)
  const existing = words.find((w) => w.word === word)
  if (existing) return existing.id ?? null
  const id = nextId()
  words.push({ id, word, translation, context, timestamp: Date.now() })
  write(KEYS.vocabularyBook, words)
  return id
}

export function getVocabularyWords(): VocabularyWord[] {
  return read<VocabularyWord>(KEYS.vocabularyBook)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function deleteVocabularyWord(id: number): void {
  const words = read<VocabularyWord>(KEYS.vocabularyBook)
  write(KEYS.vocabularyBook, words.filter((w) => w.id !== id))
}

// ====== User Progress ======

export function recordProgress(
  questionId: string,
  isCorrect: boolean,
  userAnswer: string,
  score?: number,
): void {
  const progress = read<UserProgress>(KEYS.userProgress)
  progress.push({
    id: nextId(),
    questionId,
    isCorrect,
    userAnswer,
    score,
    timestamp: Date.now(),
  })
  write(KEYS.userProgress, progress)
}

export function getProgressByQuestion(questionId: string): UserProgress[] {
  return read<UserProgress>(KEYS.userProgress)
    .filter((p) => p.questionId === questionId)
}

// ====== Sessions ======

export function saveSession(session: SessionRecord): void {
  const sessions = read<SessionRecord>(KEYS.sessions)
  sessions.push({ ...session, id: nextId() })
  write(KEYS.sessions, sessions)
}

export function getAllSessions(): SessionRecord[] {
  return read<SessionRecord>(KEYS.sessions)
    .sort((a, b) => b.timestamp - a.timestamp)
}

export function getCompletedExams(): Set<string> {
  const sessions = read<SessionRecord>(KEYS.sessions)
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
