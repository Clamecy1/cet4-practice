import { useState, useEffect } from 'react'
import { View, Text, Input } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getVocabularyWords, addVocabularyWord, deleteVocabularyWord } from '../../../../storage'
import { getWordDefinition } from '../../../../utils/api'
import type { VocabularyWord } from '../../../../storage/types'
import styles from './index.module.scss'

export default function Vocabulary() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadWords()
  }, [])

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
      {/* Add button */}
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
    </View>
  )
}
