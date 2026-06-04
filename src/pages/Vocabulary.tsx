import { useState, useEffect } from 'react'
import {
  getVocabularyWords,
  addVocabularyWord,
  deleteVocabularyWord,
} from '../db/db'
import {
  getWordsFromCloud,
  syncWordToCloud,
  deleteWordFromCloud,
} from '../db/cloudSync'
import { useAuth } from '../contexts/AuthContext'
import { getWordDefinition } from '../utils/api'
import type { VocabularyWord } from '../db/types'

export default function Vocabulary() {
  const [words, setWords] = useState<VocabularyWord[]>([])
  const [showAdd, setShowAdd] = useState(false)
  const [newWord, setNewWord] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    loadWords()
  }, [user])

  const loadWords = async () => {
    const w = await getVocabularyWords()
    // 合并云端数据
    if (user) {
      const cloudWords = await getWordsFromCloud(user.id)
      const merged = new Map<string, VocabularyWord>()
      for (const word of w) merged.set(word.word, word)
      for (const word of cloudWords) {
        if (!merged.has(word.word)) merged.set(word.word, word)
      }
      setWords([...merged.values()].sort((a, b) => b.timestamp - a.timestamp))
    } else {
      setWords(w)
    }
  }

  const handleAdd = async () => {
    if (!newWord.trim()) return
    setLoading(true)

    try {
      const definition = await getWordDefinition(newWord.trim())
      await addVocabularyWord(newWord.trim(), definition, '手动添加')
      if (user) {
        syncWordToCloud({
          word: newWord.trim(),
          translation: definition,
          context: '手动添加',
          timestamp: Date.now(),
        }, user.id)
      }
    } catch {
      await addVocabularyWord(newWord.trim(), '手动添加', '手动添加')
    }

    setNewWord('')
    setLoading(false)
    setShowAdd(false)
    await loadWords()
  }

  const handleDelete = async (id: number) => {
    await deleteVocabularyWord(id)
    if (user) await deleteWordFromCloud(id)
    await loadWords()
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold text-gray-800">📖 生词本</h1>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="px-3 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-medium active:bg-indigo-700"
        >
          {showAdd ? '取消' : '+ 添加生词'}
        </button>
      </div>

      {/* 添加生词面板 */}
      {showAdd && (
        <div className="bg-indigo-50 rounded-xl p-4 mb-4">
          <p className="text-sm text-indigo-700 mb-2">
            输入英语单词，AI 自动获取释义
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="输入英语单词..."
              className="flex-1 px-3 py-2 text-sm border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              autoFocus
            />
            <button
              onClick={handleAdd}
              disabled={!newWord.trim() || loading}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${
                newWord.trim() && !loading
                  ? 'bg-indigo-600 active:bg-indigo-700'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {loading ? '查询中...' : '添加'}
            </button>
          </div>
        </div>
      )}

      {/* 生词列表 */}
      {words.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📭</p>
          <p className="text-gray-500">生词本为空</p>
          <p className="text-xs text-gray-400 mt-1">
            在练习中点击「+ 添加生词」可随时收录
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {words.map((w) => (
            <div
              key={w.id}
              className="bg-white border border-gray-200 rounded-xl p-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <p className="text-base font-semibold text-gray-800">
                    {w.word}
                  </p>
                  <p className="text-sm text-gray-600 mt-0.5">
                    {w.translation}
                  </p>
                  {w.context && (
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      来源：{w.context}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(w.id!)}
                  className="text-gray-300 hover:text-red-500 text-lg px-1 shrink-0"
                  title="删除"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 统计 */}
      {words.length > 0 && (
        <p className="text-xs text-gray-400 text-center mt-4">
          共 {words.length} 个生词
        </p>
      )}
    </div>
  )
}
