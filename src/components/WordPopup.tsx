import { useState, useEffect, useRef } from 'react'
import { getWordDefinition } from '../utils/api'
import { addVocabularyWord } from '../db/db'

interface WordPopupProps {
  word: string
  position: { x: number; y: number }
  onClose: () => void
}

export default function WordPopup({ word, position, onClose }: WordPopupProps) {
  const [definition, setDefinition] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getWordDefinition(word).then((def) => {
      setDefinition(def)
      setLoading(false)
    })
  }, [word])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    // Delay adding listener to avoid immediate close on the mouseup that triggered this
    setTimeout(() => document.addEventListener('click', handleClick), 0)
    return () => document.removeEventListener('click', handleClick)
  }, [onClose])

  const handleAdd = async () => {
    await addVocabularyWord(word, definition || '')
    setAdded(true)
    setTimeout(() => onClose(), 1200)
  }

  // Keep popup within viewport
  const style: React.CSSProperties = {
    position: 'fixed',
    left: Math.min(position.x, window.innerWidth - 260),
    top: position.y + 10,
    zIndex: 100,
  }

  return (
    <div
      ref={popupRef}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 w-64 text-left"
      style={style}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-gray-800 text-sm">{word}</span>
        <button
          onClick={onClose}
          className="text-gray-300 hover:text-gray-500 text-xs leading-none"
        >
          ✕
        </button>
      </div>

      {loading ? (
        <p className="text-xs text-gray-400">查询中...</p>
      ) : definition ? (
        <p className="text-xs text-gray-600 leading-relaxed mb-3">{definition}</p>
      ) : (
        <p className="text-xs text-gray-400 mb-3">未获取到释义</p>
      )}

      {!loading && (
        <button
          onClick={handleAdd}
          disabled={added}
          className={`w-full py-1.5 rounded-lg text-xs font-medium transition-colors ${
            added
              ? 'bg-green-50 text-green-600'
              : 'bg-indigo-50 text-indigo-600 active:bg-indigo-100'
          }`}
        >
          {added ? '✓ 已添加' : '+ 添加到生词本'}
        </button>
      )}
    </div>
  )
}
