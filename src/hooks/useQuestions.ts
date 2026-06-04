import { useEffect, useState } from 'react'
import { loadQuestions, getQuestionsByType, loadListeningSections, getListeningSections } from '../db/db'
import type { Question, ListeningSection } from '../db/types'
import allQuestions from '../data/questions'
import allSections from '../data/sections'

export function useInitData() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const init = async () => {
      await loadQuestions(allQuestions)
      await loadListeningSections(allSections)
      setReady(true)
    }
    init()
  }, [])

  return ready
}

export function useListeningSections(year: number, month: number, setNumber: 1 | 2 | 3) {
  const [sections, setSections] = useState<ListeningSection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const secs = await getListeningSections(year, month, setNumber)
      secs.sort((a, b) => a.audioStart - b.audioStart)
      setSections(secs)
      setLoading(false)
    }
    load()
  }, [year, month, setNumber])

  return { sections, loading }
}

export function useTranslationQuestions(year: number, month: number) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      const qs = await getQuestionsByType('translation', year, month)
      setQuestions(qs)
      setLoading(false)
    }
    load()
  }, [year, month])

  return { questions, loading }
}
