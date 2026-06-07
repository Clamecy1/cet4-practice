import { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getErrorRecords, resolveError } from '../../../../storage'
import { getQuestionContext } from '../../hooks/useData'
import type { ErrorRecord } from '../../../../storage/types'
import styles from './index.module.scss'

export default function Errors() {
  const [errors, setErrors] = useState<(ErrorRecord & { ctx?: any })[]>([])
  const [filter, setFilter] = useState<'all' | 'listening' | 'translation'>('all')

  useEffect(() => {
    loadErrors()
  }, [filter])

  const loadErrors = () => {
    const type = filter === 'all' ? undefined : filter
    const records = getErrorRecords(type)
    const enriched = records.map((e) => ({
      ...e,
      ctx: getQuestionContext(e.questionId),
    }))
    setErrors(enriched)
  }

  const handleResolve = (id: number) => {
    resolveError(id)
    loadErrors()
  }

  const handleRedo = (err: ErrorRecord & { ctx?: any }) => {
    if (!err.ctx) return
    if (err.ctx.type === 'listening') {
      const match = err.questionId.match(/^(\d{4})-(\d{2})-S([12])/)
      if (match) {
        Taro.navigateTo({
          url: `/packages/practice/pages/listening/index?year=${match[1]}&month=${match[2]}&set=${match[3]}`,
        })
      }
    } else {
      Taro.navigateTo({
        url: `/packages/practice/pages/translation/index?year=${err.ctx.year}&month=${err.ctx.month}`,
      })
    }
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <View className={styles.container}>
      {/* Filter */}
      <View className={styles.filterRow}>
        {(['all', 'listening', 'translation'] as const).map((f) => (
          <View
            key={f}
            className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
            onClick={() => setFilter(f)}
          >
            <Text className={`${styles.filterText} ${filter === f ? styles.filterTextActive : ''}`}>
              {f === 'all' ? '全部' : f === 'listening' ? '听力' : '翻译'}
            </Text>
          </View>
        ))}
      </View>

      {errors.length === 0 ? (
        <View className={styles.empty}>
          <Text className={styles.emptyText}>暂无错题 🎉</Text>
        </View>
      ) : (
        <View className={styles.list}>
          {errors.map((err) => (
            <View key={err.id} className={styles.card}>
              <View className={styles.cardHeader}>
                <View className={styles.cardMeta}>
                  <Text className={`${styles.typeTag} ${err.ctx?.type === 'translation' ? styles.typeTagTrans : ''}`}>
                    {err.ctx?.type === 'translation' ? '翻译' : '听力'}
                  </Text>
                  {err.ctx && (
                    <Text className={styles.cardYear}>
                      {err.ctx.year}年{err.ctx.month}月
                    </Text>
                  )}
                  <Text className={styles.cardTime}>{formatTime(err.timestamp)}</Text>
                </View>
                <Text className={styles.practiceCount}>练{err.practiceCount}次</Text>
              </View>
              {err.ctx?.text && (
                <Text className={styles.cardText}>{err.ctx.text}</Text>
              )}
              <Text className={styles.cardAnswer}>
                你的答案: <Text className={styles.wrongAnswer}>{err.userAnswer}</Text>
              </Text>
              <View className={styles.cardActions}>
                <View className={styles.redoBtn} onClick={() => handleRedo(err)}>
                  <Text className={styles.redoText}>重新练习</Text>
                </View>
                <View className={styles.resolveBtn} onClick={() => handleResolve(err.id!)}>
                  <Text className={styles.resolveText}>已掌握</Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}
