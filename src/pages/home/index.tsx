import { useState } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import styles from './index.module.scss'

const YEARS = [2021, 2022, 2023, 2024, 2025]

const MONTHS: { value: number; label: string }[] = [
  { value: 3, label: '3月' },
  { value: 6, label: '6月' },
  { value: 9, label: '9月' },
  { value: 12, label: '12月' },
]

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

type Section = 'listening' | 'translation'

export default function Home() {
  const [openSection, setOpenSection] = useState<Section | null>(null)
  const [openYear, setOpenYear] = useState<number | null>(null)

  const toggleSection = (s: Section) => {
    setOpenSection(openSection === s ? null : s)
    setOpenYear(null)
  }

  const toggleYear = (y: number) => {
    setOpenYear(openYear === y ? null : y)
  }

  const navigateTo = (url: string) => {
    Taro.navigateTo({ url })
  }

  const renderExamList = (type: 'listening' | 'translation') =>
    YEARS.map((year) => {
      const yearMonths = MONTHS.filter((m) => examExists(year, m.value))
      if (yearMonths.length === 0) return null
      return (
        <View key={year}>
          <View
            className={`${styles.yearRow} ${openYear === year ? styles.yearRowActive : ''}`}
            onClick={() => toggleYear(year)}
          >
            <Text className={styles.yearLabel}>{year} 年</Text>
            <Text className={styles.arrow}>{openYear === year ? '⌃' : '⌄'}</Text>
          </View>
          {openYear === year && (
            <View className={styles.monthGrid}>
              {yearMonths.map((month) => {
                if (type === 'listening') {
                  const setCount = getSetCount(year, month.value)
                  return Array.from({ length: setCount }, (_, i) => i + 1).map((set) => (
                    <View
                      key={`${year}-${month.value}-${set}`}
                      className={styles.examBtn}
                      onClick={() =>
                        navigateTo(
                          `/packages/practice/pages/listening/index?year=${year}&month=${month.value}&set=${set}`,
                        )
                      }
                    >
                      <Text className={styles.examBtnText}>
                        {month.label} 卷{set}
                      </Text>
                    </View>
                  ))
                }
                return (
                  <View
                    key={`trans-${year}-${month.value}`}
                    className={styles.examBtn}
                    onClick={() =>
                      navigateTo(
                        `/packages/practice/pages/translation/index?year=${year}&month=${month.value}`,
                      )
                    }
                  >
                    <Text className={styles.examBtnText}>{month.label}</Text>
                  </View>
                )
              })}
            </View>
          )}
        </View>
      )
    })

  return (
    <View className={styles.container}>
      {/* Hero */}
      <View className={styles.hero}>
        <Text className={styles.title}>CET—4</Text>
        <Text className={styles.subtitle}>听力 · 翻译 真题练习</Text>
      </View>

      {/* Cards */}
      <View className={styles.cardArea}>
        <View className={styles.cards}>
          {/* Listening */}
          <View className={`${styles.card} ${openSection === 'listening' ? styles.cardOpen : ''}`}>
            <View className={styles.cardHeader} onClick={() => toggleSection('listening')}>
              <Text className={styles.cardIcon}>🎧</Text>
              <Text className={styles.cardName}>听力练习</Text>
              <Text className={styles.tapHint}>点击选择真题</Text>
            </View>
            {openSection === 'listening' && (
              <ScrollView scrollY className={styles.cardBody}>
                {renderExamList('listening')}
              </ScrollView>
            )}
          </View>

          {/* Translation */}
          <View className={`${styles.card} ${openSection === 'translation' ? styles.cardOpen : ''}`}>
            <View className={styles.cardHeader} onClick={() => toggleSection('translation')}>
              <Text className={styles.cardIcon}>✏️</Text>
              <Text className={styles.cardName}>翻译练习</Text>
              <Text className={styles.tapHint}>AI 智能评分</Text>
            </View>
            {openSection === 'translation' && (
              <ScrollView scrollY className={styles.cardBody}>
                {renderExamList('translation')}
              </ScrollView>
            )}
          </View>
        </View>
      </View>
    </View>
  )
}
