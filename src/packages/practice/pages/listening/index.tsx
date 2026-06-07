import { useState, useRef, useCallback } from 'react'
import { View, Text, ScrollView, Input } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import AudioPlayer from '../../../../components/AudioPlayer'
import { useListeningSections } from '../../hooks/useData'
import { addErrorRecord, recordProgress, saveSession } from '../../../../storage'
import transcriptsCN from '../../data/transcripts-cn.json'
import type { ListeningSubQuestion } from '../../../../storage/types'
import styles from './index.module.scss'

export default function Listening() {
  const router = useRouter()
  const { year, month, set } = router.params
  const yearNum = Number(year)
  const monthNum = Number(month)
  const setNum = Number(set) as 1 | 2 | 3

  const { sections, loading } = useListeningSections(yearNum, monthNum, setNum)

  const [secIdx, setSecIdx] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [showTranscript, setShowTranscript] = useState(false)
  const [showTranslation, setShowTranslation] = useState(false)
  const [showWordInput, setShowWordInput] = useState(false)
  const [wordToLookup, setWordToLookup] = useState('')

  const scoreRef = useRef({ correctCount: 0, totalQuestions: 0 })

  const section = sections[secIdx]
  const allAnswered = section
    ? section.questions.every((q) => answers[q.id])
    : false
  const isLast = secIdx === sections.length - 1

  const setAnswer = (qId: string, opt: string) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: opt }))
  }

  const handleSubmit = useCallback(async () => {
    if (!section) return
    let correctCount = 0
    for (const q of section.questions) {
      const userAnswer = answers[q.id]
      const isCorrect = userAnswer === q.answer
      if (isCorrect) correctCount++
      // 记录错题
      if (!isCorrect && userAnswer) {
        addErrorRecord(q.id, userAnswer)
      }
      // 记录答题进度
      recordProgress(q.id, isCorrect, userAnswer || '')
    }
    scoreRef.current.correctCount += correctCount
    scoreRef.current.totalQuestions += section.questions.length
    setSubmitted(true)
  }, [section, answers])

  const handleNext = useCallback(async () => {
    if (isLast) {
      // 保存成绩
      saveSession({
        examType: 'listening',
        year: yearNum,
        month: monthNum,
        setNumber: setNum,
        score: scoreRef.current.correctCount,
        total: scoreRef.current.totalQuestions,
        timestamp: Date.now(),
      })
      Taro.redirectTo({
        url: `/packages/practice/pages/result/index?type=listening&year=${yearNum}&month=${monthNum}&set=${setNum}&score=${scoreRef.current.correctCount}&total=${scoreRef.current.totalQuestions}`,
      })
    } else {
      setSecIdx((i) => i + 1)
      setAnswers({})
      setSubmitted(false)
      setShowTranscript(false)
      setShowTranslation(false)
    }
  }, [isLast, yearNum, monthNum, setNum])

  const handleLongPressTranscript = () => {
    setShowWordInput(true)
  }

  const handleAddWord = () => {
    if (wordToLookup.trim()) {
      Taro.navigateTo({
        url: `/packages/practice/pages/vocabulary/index?word=${encodeURIComponent(wordToLookup.trim())}`,
      })
      setShowWordInput(false)
      setWordToLookup('')
    }
  }

  if (loading || !section) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    )
  }

  return (
    <View className={styles.container}>
      {/* Audio Player */}
      <AudioPlayer
        audioSrc={section.audioSrc}
        sections={sections}
        currentIndex={secIdx}
        onSectionChange={setSecIdx}
      />

      {/* Section Nav */}
      <View className={styles.sectionNav}>
        {sections.map((s, i) => (
          <View
            key={s.id}
            className={`${styles.sectionTab} ${i === secIdx ? styles.sectionTabActive : ''} ${s.questions.every((q) => answers[q.id] && !submitted) ? styles.sectionTabAnswered : ''}`}
            onClick={() => {
              if (submitted) return
              setSecIdx(i)
              setAnswers({})
            }}
          >
            <Text className={styles.sectionTabText}>{i + 1}</Text>
          </View>
        ))}
      </View>

      {/* Questions */}
      <ScrollView className={styles.questionsArea} scrollY>
        <Text className={styles.sectionLabel}>{section.label}</Text>
        {section.questions.map((q, qi) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={qi}
            selected={answers[q.id]}
            submitted={submitted}
            onSelect={setAnswer}
          />
        ))}
      </ScrollView>

      {/* Transcript */}
      {submitted && (
        <View className={styles.transcriptSection}>
          <View className={styles.transcriptToggle}>
            <View
              className={`${styles.toggleBtn} ${showTranscript ? styles.toggleBtnActive : ''}`}
              onClick={() => setShowTranscript(!showTranscript)}
            >
              <Text className={styles.toggleText}>原文</Text>
            </View>
            <View
              className={`${styles.toggleBtn} ${showTranslation ? styles.toggleBtnActive : ''}`}
              onClick={() => setShowTranslation(!showTranslation)}
            >
              <Text className={styles.toggleText}>译文</Text>
            </View>
          </View>
          {showTranscript && (
            <View className={styles.transcriptText} onLongPress={handleLongPressTranscript}>
              <Text selectable>{section.transcript}</Text>
            </View>
          )}
          {showTranslation && (
            <View className={styles.translationText}>
              <Text selectable>
                {(transcriptsCN as Record<string, string>)[section.id] || '暂无译文'}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Action Buttons */}
      <View className={styles.actions}>
        {!submitted ? (
          <View
            className={`${styles.submitBtn} ${!allAnswered ? styles.submitBtnDisabled : ''}`}
            onClick={allAnswered ? handleSubmit : undefined}
          >
            <Text className={styles.submitText}>提交答案</Text>
          </View>
        ) : (
          <View className={styles.nextBtn} onClick={handleNext}>
            <Text className={styles.nextText}>{isLast ? '查看成绩' : '下一题'}</Text>
          </View>
        )}
      </View>

      {/* Word Input Modal */}
      {showWordInput && (
        <View className={styles.modalOverlay} onClick={() => setShowWordInput(false)}>
          <View className={styles.modalContent} onClick={(e: any) => e.stopPropagation()}>
            <Text className={styles.modalTitle}>添加生词</Text>
            <View className={styles.modalInputRow}>
              <Input
                className={styles.modalInputNative}
                value={wordToLookup}
                placeholder='输入单词'
                onInput={(e: any) => setWordToLookup(e.detail.value)}
                onConfirm={handleAddWord}
                focus
              />
            </View>
            <View className={styles.modalActions}>
              <View className={styles.modalCancel} onClick={() => setShowWordInput(false)}>
                <Text>取消</Text>
              </View>
              <View className={styles.modalConfirm} onClick={handleAddWord}>
                <Text className={styles.modalConfirmText}>添加</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  )
}

// Question Card Sub-component
function QuestionCard({
  question,
  index,
  selected,
  submitted,
  onSelect,
}: {
  question: ListeningSubQuestion
  index: number
  selected: string | undefined
  submitted: boolean
  onSelect: (qId: string, opt: string) => void
}) {
  const labels = ['A', 'B', 'C', 'D']
  const isCorrect = selected === question.answer

  return (
    <View className={styles.questionCard}>
      <Text className={styles.questionText}>
        {index + 1}. {question.question}
      </Text>
      <View className={styles.options}>
        {question.options.map((opt, i) => {
          let optionClass = styles.option
          if (submitted && i === labels.indexOf(question.answer)) {
            optionClass += ` ${styles.optionCorrect}`
          } else if (submitted && selected === labels[i] && !isCorrect) {
            optionClass += ` ${styles.optionWrong}`
          } else if (!submitted && selected === labels[i]) {
            optionClass += ` ${styles.optionSelected}`
          }
          return (
            <View
              key={labels[i]}
              className={optionClass}
              onClick={() => onSelect(question.id, labels[i])}
            >
              <Text className={styles.optionLabel}>{labels[i]}</Text>
              <Text className={styles.optionText}>{opt}</Text>
            </View>
          )
        })}
      </View>
      {submitted && (
        <View className={`${styles.resultTag} ${isCorrect ? styles.resultCorrect : styles.resultWrong}`}>
          <Text className={styles.resultTagText}>{isCorrect ? '✓ 正确' : `✗ 正确答案: ${question.answer}`}</Text>
        </View>
      )}
    </View>
  )
}
