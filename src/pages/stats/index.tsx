import { useState, useEffect, useMemo } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { getAllSessions, getCompletedExams } from '../../storage'
import type { SessionRecord } from '../../storage/types'
import styles from './index.module.scss'

const YEARS = [2021, 2022, 2023, 2024, 2025]
const MONTHS = [3, 6, 9, 12]

function getSetCount(year: number, month: number): number {
  if (year === 2022 && month === 6) return 1
  if ((year === 2022 && month === 9) || (year === 2023 && month === 3)) return 3
  if (year === 2025 && (month === 6 || month === 12)) return 3
  return 2
}

function examExists(year: number, month: number): boolean {
  if (month === 3 && year !== 2023) return false
  if (month === 9 && year !== 2022) return false
  return true
}

export default function Stats() {
  const [sessions, setSessions] = useState<SessionRecord[]>([])
  const [completedExams, setCompletedExams] = useState<Set<string>>(new Set())

  useEffect(() => {
    setSessions(getAllSessions())
    setCompletedExams(getCompletedExams())
  }, [])

  // Overview stats
  const overview = useMemo(() => {
    const totalPractices = sessions.length
    const totalScore = sessions.reduce((s, r) => s + r.score, 0)
    const totalQuestions = sessions.reduce((s, r) => s + r.total, 0)
    const overallAccuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0

    // Streak
    const dateSet = new Set<string>()
    sessions.forEach((s) => {
      const d = new Date(s.timestamp)
      dateSet.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
    })

    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      if (dateSet.has(key)) {
        streak++
      } else {
        break
      }
    }

    // Type breakdown
    const listeningSessions = sessions.filter((s) => s.examType === 'listening')
    const transSessions = sessions.filter((s) => s.examType === 'translation')
    const listScore = listeningSessions.reduce((s, r) => s + r.score, 0)
    const listTotal = listeningSessions.reduce((s, r) => s + r.total, 0)
    const transScore = transSessions.reduce((s, r) => s + r.score, 0)

    return {
      totalPractices,
      overallAccuracy,
      streak,
      listeningAccuracy: listTotal > 0 ? Math.round((listScore / listTotal) * 100) : 0,
      listeningCount: listeningSessions.length,
      transAvgScore: transSessions.length > 0 ? Math.round(transScore / transSessions.length) : 0,
      transCount: transSessions.length,
    }
  }, [sessions])

  // 14-day heatmap
  const heatmap = useMemo(() => {
    const dateSet = new Set<string>()
    sessions.forEach((s) => {
      const d = new Date(s.timestamp)
      dateSet.add(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`)
    })

    const days: { label: string; date: string; active: boolean; isToday: boolean }[] = []
    const today = new Date()
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
      const isToday = i === 0
      days.push({
        label: `${d.getMonth() + 1}/${d.getDate()}`,
        date: key,
        active: dateSet.has(key),
        isToday,
      })
    }
    return days
  }, [sessions])

  // Recent sessions
  const recentSessions = useMemo(() => sessions.slice(0, 10), [sessions])

  const formatDate = (ts: number) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <ScrollView className={styles.container} scrollY>
      {/* Overview Cards */}
      <View className={styles.overviewGrid}>
        <View className={styles.overviewCard}>
          <Text className={styles.overviewNum}>{overview.totalPractices}</Text>
          <Text className={styles.overviewLabel}>练习次数</Text>
        </View>
        <View className={styles.overviewCard}>
          <Text className={styles.overviewNum}>{overview.overallAccuracy}%</Text>
          <Text className={styles.overviewLabel}>总正确率</Text>
        </View>
        <View className={styles.overviewCard}>
          <Text className={styles.overviewNum}>{overview.streak}天</Text>
          <Text className={styles.overviewLabel}>连续打卡</Text>
        </View>
        <View className={styles.overviewCard}>
          <Text className={styles.overviewNum}>{overview.listeningCount + overview.transCount}</Text>
          <Text className={styles.overviewLabel}>完成套卷</Text>
        </View>
      </View>

      {/* Type stats */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>题型统计</Text>
        <View className={styles.typeCards}>
          <View className={`${styles.typeCard} ${styles.typeListen}`}>
            <Text className={styles.typeName}>🎧 听力</Text>
            <Text className={styles.typeCount}>{overview.listeningCount}次</Text>
            <Text className={styles.typeAcc}>正确率 {overview.listeningAccuracy}%</Text>
            <View className={styles.typeBar}>
              <View className={styles.typeFill} style={{ width: `${overview.listeningAccuracy}%`, background: '#6366f1' }} />
            </View>
          </View>
          <View className={`${styles.typeCard} ${styles.typeTrans}`}>
            <Text className={styles.typeName}>✏️ 翻译</Text>
            <Text className={styles.typeCount}>{overview.transCount}次</Text>
            <Text className={styles.typeAcc}>均分 {overview.transAvgScore}</Text>
            <View className={styles.typeBar}>
              <View className={styles.typeFill} style={{ width: `${overview.transAvgScore}%`, background: '#059669' }} />
            </View>
          </View>
        </View>
      </View>

      {/* 14-day Heatmap */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>打卡日历</Text>
        <View className={styles.heatmap}>
          {heatmap.map((day) => (
            <View key={day.date} className={styles.heatCell}>
              <View
                className={`${styles.heatBlock} ${day.active ? styles.heatActive : ''} ${day.isToday ? styles.heatToday : ''}`}
              />
              <Text className={styles.heatLabel}>{day.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Exam Completion Matrix */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>套卷完成度</Text>
        <View className={styles.matrix}>
          {YEARS.map((year) => {
            const yearMonths = MONTHS.filter((m) => examExists(year, m))
            if (yearMonths.length === 0) return null
            return (
              <View key={year} className={styles.matrixRow}>
                <Text className={styles.matrixYear}>{year}</Text>
                <View className={styles.matrixMonths}>
                  {yearMonths.map((month) => (
                    <View key={month} className={styles.matrixCell}>
                      <Text className={styles.matrixMonth}>{month}月</Text>
                      <View className={styles.matrixDots}>
                        {Array.from({ length: getSetCount(year, month) }, (_, i) => (
                          <View
                            key={i}
                            className={`${styles.dot} ${completedExams.has(`${year}-${month}-S${i + 1}`) ? styles.dotDone : styles.dotPending}`}
                          />
                        ))}
                        <View
                          className={`${styles.dot} ${styles.dotTrans} ${completedExams.has(`${year}-${month}`) ? styles.dotDoneTrans : styles.dotPendingTrans}`}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )
          })}
        </View>
      </View>

      {/* Recent Sessions */}
      <View className={styles.section}>
        <Text className={styles.sectionTitle}>近期记录</Text>
        {recentSessions.length === 0 ? (
          <Text className={styles.emptyText}>暂无练习记录</Text>
        ) : (
          <View className={styles.recentList}>
            {recentSessions.map((s, i) => {
              const acc = s.total > 0 ? Math.round((s.score / s.total) * 100) : 0
              return (
                <View key={s.id || i} className={styles.recentItem}>
                  <View className={styles.recentLeft}>
                    <Text className={`${styles.recentType} ${s.examType === 'translation' ? styles.recentTypeTrans : ''}`}>
                      {s.examType === 'listening' ? '🎧' : '✏️'}
                    </Text>
                    <View>
                      <Text className={styles.recentExam}>
                        {s.year}.{String(s.month).padStart(2, '0')}
                        {s.setNumber ? ` 卷${s.setNumber}` : ''}
                      </Text>
                      <Text className={styles.recentDate}>{formatDate(s.timestamp)}</Text>
                    </View>
                  </View>
                  <View className={styles.recentRight}>
                    <Text className={styles.recentScore}>{s.score}/{s.total}</Text>
                    <Text className={`${styles.recentAcc} ${acc >= 60 ? styles.recentAccGood : styles.recentAccBad}`}>
                      {acc}%
                    </Text>
                  </View>
                </View>
              )
            })}
          </View>
        )}
      </View>
    </ScrollView>
  )
}
