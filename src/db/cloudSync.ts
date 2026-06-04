import { supabase } from '../lib/supabase'
import type { SessionRecord, ErrorRecord, VocabularyWord } from './types'

// ====== 成绩同步 ======

export async function syncSessionToCloud(session: SessionRecord, userId: string) {
  const { error } = await supabase.from('sessions').insert({
    user_id: userId,
    exam_type: session.examType,
    year: session.year,
    month: session.month,
    set_number: session.setNumber ?? null,
    score: session.score,
    total: session.total,
    timestamp: new Date(session.timestamp).toISOString(),
  })
  if (error) console.error('syncSessionToCloud failed:', error)
}

export async function getSessionsFromCloud(userId: string): Promise<SessionRecord[]> {
  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })

  if (error || !data) return []

  return data.map((r: any) => ({
    examType: r.exam_type,
    year: r.year,
    month: r.month,
    setNumber: r.set_number,
    score: r.score,
    total: r.total,
    timestamp: new Date(r.timestamp).getTime(),
  }))
}

// ====== 错题本同步 ======

export async function syncErrorToCloud(record: ErrorRecord, userId: string) {
  const { error } = await supabase.from('error_book').upsert({
    user_id: userId,
    question_id: record.questionId,
    user_answer: record.userAnswer,
    timestamp: new Date(record.timestamp).toISOString(),
    is_resolved: record.isResolved,
    practice_count: record.practiceCount,
  }, { onConflict: 'user_id,question_id' })

  if (error) console.error('syncErrorToCloud failed:', error)
}

export async function getErrorsFromCloud(userId: string): Promise<ErrorRecord[]> {
  const { data, error } = await supabase
    .from('error_book')
    .select('*')
    .eq('user_id', userId)
    .eq('is_resolved', false)
    .order('timestamp', { ascending: false })

  if (error || !data) return []

  return data.map((r: any) => ({
    id: r.id,
    questionId: r.question_id,
    userAnswer: r.user_answer,
    timestamp: new Date(r.timestamp).getTime(),
    isResolved: r.is_resolved,
    practiceCount: r.practice_count,
  }))
}

export async function resolveErrorInCloud(id: number) {
  await supabase.from('error_book').update({ is_resolved: true }).eq('id', id)
}

// ====== 生词本同步 ======

export async function syncWordToCloud(word: VocabularyWord, userId: string) {
  const { error } = await supabase.from('vocabulary_book').upsert({
    user_id: userId,
    word: word.word,
    translation: word.translation,
    context: word.context ?? null,
    timestamp: new Date(word.timestamp).toISOString(),
  }, { onConflict: 'user_id,word' })

  if (error) console.error('syncWordToCloud failed:', error)
}

export async function getWordsFromCloud(userId: string): Promise<VocabularyWord[]> {
  const { data, error } = await supabase
    .from('vocabulary_book')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: false })

  if (error || !data) return []

  return data.map((r: any) => ({
    id: r.id,
    word: r.word,
    translation: r.translation,
    context: r.context,
    timestamp: new Date(r.timestamp).getTime(),
  }))
}

export async function deleteWordFromCloud(id: number) {
  await supabase.from('vocabulary_book').delete().eq('id', id)
}
