import { useState, useRef, useCallback } from 'react'
import { View, Text, Textarea, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useTranslationQuestions } from '../../hooks/useData'
import { addErrorRecord, recordProgress, saveSession } from '../../../../storage'
import { scoreTranslation } from '../../../../utils/api'
import type { TranslationQuestion } from '../../../../storage/types'
import styles from './index.module.scss'

export default function Translation() {
  const router = useRouter()
  const { year, month } = router.params
  const yearNum = Number(year)
  const monthNum = Number(month)

  const { questions, loading } = useTranslationQuestions(yearNum, monthNum)

  const [index, setIndex] = useState(0)
  const [userInput, setUserInput] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [scoring, setScoring] = useState(false)
  const [result, setResult] = useState<{ score: number; feedback: string } | null>(null)
  const scoresRef = useRef<number[]>([])

  const question = questions[index] as TranslationQuestion | undefined
  const isLast = index === questions.length - 1

  const handleSubmit = useCallback(async () => {
    if (!question || !userInput.trim()) return
    setScoring(true)
    const res = await scoreTranslation(question.chineseText, question.referenceAnswer, userInput.trim())
    setResult(res)
    setScoring(false)
    setSubmitted(true)

    scoresRef.current.push(res.score)

    recordProgress(question.id, res.score >= 60, userInput.trim(), res.score)
    if (res.score < 60) {
      addErrorRecord(question.id, userInput.trim())
    }
  }, [question, userInput])

  const handleNext = useCallback(() => {
    if (isLast) {
      const avgScore = scoresRef.current.reduce((a, b) => a + b, 0) / scoresRef.current.length
      saveSession({
        examType: 'translation',
        year: yearNum,
        month: monthNum,
        score: Math.round(avgScore),
        total: 100,
        timestamp: Date.now(),
      })
      Taro.redirectTo({
        url: `/packages/practice/pages/result/index?type=translation&year=${yearNum}&month=${monthNum}&score=${Math.round(avgScore)}&total=100`,
      })
    } else {
      setIndex((i) => i + 1)
      setUserInput('')
      setSubmitted(false)
      setResult(null)
    }
  }, [isLast, yearNum, monthNum])

  if (loading || !question) {
    return (
      <View className={styles.loading}>
        <Text>加载中...</Text>
      </View>
    )
  }

  const monthStr = String(monthNum).padStart(2, '0')

  return (
    <View className={styles.container}>
      <ScrollView className={styles.scrollArea} scrollY>
        {/* Progress */}
        <View className={styles.progress}>
          <Text className={styles.progressText}>
            {index + 1} / {questions.length}
          </Text>
          <Text className={styles.examInfo}>
            {yearNum}年{monthStr}月翻译
          </Text>
        </View>

        {/* Chinese text */}
        <View className={styles.chineseCard}>
          <Text className={styles.chineseLabel}>📝 请翻译以下中文：</Text>
          <Text className={styles.chineseText} selectable>
            {question.chineseText}
          </Text>
        </View>

        {/* Input area */}
        {!submitted ? (
          <View className={styles.inputCard}>
            <Text className={styles.inputLabel}>✏️ 你的翻译：</Text>
            <Textarea
              className={styles.textarea}
              value={userInput}
              placeholder='在此输入你的英文翻译...'
              autoHeight
              maxlength={2000}
              onInput={(e) => setUserInput(e.detail.value)}
            />
          </View>
        ) : (
          <View className={styles.inputCard}>
            <Text className={styles.inputLabel}>✏️ 你的翻译：</Text>
            <Text className={styles.userText}>{userInput}</Text>
          </View>
        )}

        {/* Reference Answer */}
        {submitted && (
          <View className={styles.refCard}>
            <Text className={styles.refLabel}>📖 参考译文：</Text>
            <Text className={styles.refText} selectable>
              {question.referenceAnswer}
            </Text>
          </View>
        )}

        {/* AI Feedback */}
        {submitted && result && (
          <View className={styles.feedbackCard}>
            <View className={styles.scoreRow}>
              <Text className={styles.scoreLabel}>AI 评分</Text>
              <Text className={`${styles.scoreValue} ${result.score >= 60 ? styles.scorePass : styles.scoreFail}`}>
                {result.score}分
              </Text>
            </View>
            <Text className={styles.feedbackText}>{result.feedback}</Text>
          </View>
        )}
      </ScrollView>

      {/* Actions */}
      <View className={styles.actions}>
        {scoring ? (
          <View className={styles.scoringBtn}>
            <Text className={styles.scoringText}>AI 评分中...</Text>
          </View>
        ) : !submitted ? (
          <View
            className={`${styles.submitBtn} ${!userInput.trim() ? styles.submitBtnDisabled : ''}`}
            onClick={userInput.trim() ? handleSubmit : undefined}
          >
            <Text className={styles.submitText}>提交评分</Text>
          </View>
        ) : (
          <View className={styles.nextBtn} onClick={handleNext}>
            <Text className={styles.nextText}>{isLast ? '查看成绩' : '下一题'}</Text>
          </View>
        )}
      </View>
    </View>
  )
}
