import { useState, useEffect } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {
  getErrorRecords,
  resolveError,
  addVocabularyWord,
  getVocabularyWords,
  deleteVocabularyWord,
} from '../../storage'
import { getWordDefinition } from '../../utils/api'
import type { ErrorRecord, VocabularyWord } from '../../storage/types'
import styles from './index.module.scss'

// ID 解析（不依赖分包数据文件，避免主包膨胀）
function parseQuestionId(id: string): {
  type: 'listening' | 'translation'
  year: number
  month: number
  setNumber?: number
} | null {
  if (id.startsWith('T-')) {
    const match = id.match(/^T-(\d{4})-(\d{2})/)
    if (match) return { type: 'translation', year: Number(match[1]), month: Number(match[2]) }
    return null
  }
  const match = id.match(/^(\d{4})-(\d{2})-S([12])/)
  if (match) return { type: 'listening', year: Number(match[1]), month: Number(match[2]), setNumber: Number(match[3]) }
  // 旧格式
  const oldMatch = id.match(/^Q-(\d{4})-(\d{2})/)
  if (oldMatch) return { type: 'listening', year: Number(oldMatch[1]), month: Number(oldMatch[2]) }
  return null
}

export default function Review() {
  const [tab, setTab] = useState<'errors' | 'vocabulary'>('errors')

  // ---- 错题本 state ----
  const [errors, setErrors] = useState<ErrorRecord[]>([])
  const [filter, setFilter] = useState<'all' | 'listening' | 'translation'>('all')

  // ---- 生词本 state ----
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (tab === 'errors') loadErrors()
    else loadWords()
  }, [tab, filter])

  // ====== 错题本 logic ======
  const loadErrors = () => {
    const type = filter === 'all' ? undefined : filter
    setErrors(getErrorRecords(type))
  }

  const handleResolve = (id: number) => {
    resolveError(id)
    loadErrors()
  }

  const handleRedo = (err: ErrorRecord) => {
    const ctx = parseQuestionId(err.questionId)
    if (!ctx) return
    if (ctx.type === 'listening') {
      Taro.navigateTo({
        url: `/packages/practice/pages/listening/index?year=${ctx.year}&month=${ctx.month}&set=${ctx.setNumber || 1}`,
      })
    } else {
      Taro.navigateTo({
        url: `/packages/practice/pages/translation/index?year=${ctx.year}&month=${ctx.month}`,
      })
    }
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    return `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  // ====== 生词本 logic ======
  const loadWords = () => {
    setWords(getVocabularyWords())
  }

  const handleAdd = async () => {
    const word = newWord.trim()
    if (!word) return
    setLoading(true)
    const definition = await getWordDefinition(word)
    setLoading(false)
    addVocabularyWord(word, definition)
    setNewWord('')
    setShowAdd(false)
    loadWords()
    Taro.showToast({ title: '已添加', icon: 'success' })
  }

  const handleDelete = (id: number) => {
    Taro.showModal({
      title: '确认删除',
      content: '确定要删除这个生词吗？',
      success: (res) => {
        if (res.confirm) {
          deleteVocabularyWord(id)
          loadWords()
        }
      },
    })
  }

  return (
    <View className={styles.container}>
      {/* Top Tabs */}
      <View className={styles.tabRow}>
        <View
          className={`${styles.tab} ${tab === 'errors' ? styles.tabActive : ''}`}
          onClick={() => setTab('errors')}
        >
          <Text className={`${styles.tabText} ${tab === 'errors' ? styles.tabTextActive : ''}`}>
            📋 错题本
          </Text>
        </View>
        <View
          className={`${styles.tab} ${tab === 'vocabulary' ? styles.tabActive : ''}`}
          onClick={() => setTab('vocabulary')}
        >
          <Text className={`${styles.tabText} ${tab === 'vocabulary' ? styles.tabTextActive : ''}`}>
            📖 生词本
          </Text>
        </View>
      </View>

      {/* ====== 错题本 ====== */}
      {tab === 'errors' && (
        <>
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
              {errors.map((err) => {
                const ctx = parseQuestionId(err.questionId)
                return (
                  <View key={err.id} className={styles.card}>
                    <View className={styles.cardHeader}>
                      <View className={styles.cardMeta}>
                        <Text className={`${styles.typeTag} ${ctx?.type === 'translation' ? styles.typeTagTrans : ''}`}>
                          {ctx?.type === 'translation' ? '翻译' : '听力'}
                        </Text>
                        {ctx && (
                          <Text className={styles.cardYear}>
                            {ctx.year}年{ctx.month}月{ctx.setNumber ? `卷${ctx.setNumber}` : ''}
                          </Text>
                        )}
                        <Text className={styles.cardTime}>{formatTime(err.timestamp)}</Text>
                      </View>
                      <Text className={styles.practiceCount}>练{err.practiceCount}次</Text>
                    </View>
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
                )
              })}
            </View>
          )}
        </>
      )}

      {/* ====== 生词本 ====== */}
      {tab === 'vocabulary' && (
        <>
          {/* Header */}
          <View className={styles.header}>
            <Text className={styles.count}>{words.length} 个生词</Text>
            <View className={styles.addBtn} onClick={() => setShowAdd(!showAdd)}>
              <Text className={styles.addBtnText}>{showAdd ? '取消' : '+ 添加'}</Text>
            </View>
          </View>

          {/* Add panel */}
          {showAdd && (
            <View className={styles.addPanel}>
              <Input
                className={styles.addInput}
                value={newWord}
                placeholder='输入英语单词'
                onInput={(e) => setNewWord(e.detail.value)}
                onConfirm={handleAdd}
                focus
              />
              <View
                className={`${styles.addConfirmBtn} ${loading || !newWord.trim() ? styles.addConfirmDisabled : ''}`}
                onClick={loading || !newWord.trim() ? undefined : handleAdd}
              >
                <Text className={styles.addConfirmText}>{loading ? '查询中...' : '添加'}</Text>
              </View>
            </View>
          )}

          {/* Word list */}
          {words.length === 0 ? (
            <View className={styles.empty}>
              <Text className={styles.emptyText}>暂无生词，开始学习吧 📖</Text>
            </View>
          ) : (
            <View className={styles.list}>
              {words.map((w) => (
                <View key={w.id} className={styles.card}>
                  <View className={styles.cardHeader}>
                    <Text className={styles.word}>{w.word}</Text>
                    <View className={styles.deleteBtn} onClick={() => handleDelete(w.id!)}>
                      <Text className={styles.deleteText}>删除</Text>
                    </View>
                  </View>
                  <Text className={styles.translation}>{w.translation}</Text>
                  {w.context && <Text className={styles.context}>语境: {w.context}</Text>}
                </View>
              ))}
            </View>
          )}
        </>
      )}
    </View>
  )
}
