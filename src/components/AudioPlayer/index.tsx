import { useEffect, useRef, useState, useCallback } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { resolveAudioUrl } from '../../utils/audio'
import type { ListeningSection } from '../../storage/types'
import styles from './index.module.scss'

interface AudioPlayerProps {
  audioSrc: string
  sections: ListeningSection[]
  currentIndex: number
  onSectionChange: (index: number) => void
}

let _audioCtx: Taro.InnerAudioContext | null = null

function getAudioCtx(): Taro.InnerAudioContext {
  if (!_audioCtx) {
    _audioCtx = Taro.createInnerAudioContext()
    _audioCtx.obeyMuteSwitch = false
  }
  return _audioCtx
}

function formatTime(sec: number): string {
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${String(s).padStart(2, '0')}`
}

export default function AudioPlayer({ audioSrc, sections, currentIndex, onSectionChange }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const seekingRef = useRef(false)
  const barLeftRef = useRef(0)

  const audioRef = useRef(getAudioCtx())
  const currentIndexRef = useRef(currentIndex)
  currentIndexRef.current = currentIndex

  // Set audio source
  useEffect(() => {
    const audio = audioRef.current
    const url = resolveAudioUrl(audioSrc)
    audio.src = url
    audio.autoplay = false

    const onCanplay = () => {
      setDuration(audio.duration)
      // Seek to current section start
      if (sections[currentIndexRef.current]) {
        const start = sections[currentIndexRef.current].audioStart
        audio.seek(start)
        setCurrentTime(start)
      }
    }

    const onTimeUpdate = () => {
      if (!seekingRef.current) {
        setCurrentTime(audio.currentTime)
      }
    }

    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      audio.seek(0)
    }
    const onError = (err: any) => {
      console.error('Audio error:', err)
      Taro.showToast({ title: '音频加载失败', icon: 'error' })
    }

    audio.onCanplay(onCanplay)
    audio.onTimeUpdate(onTimeUpdate)
    audio.onPlay(onPlay)
    audio.onPause(onPause)
    audio.onEnded(onEnded)
    audio.onError(onError)

    return () => {
      audio.offCanplay(onCanplay)
      audio.offTimeUpdate(onTimeUpdate)
      audio.offPlay(onPlay)
      audio.offPause(onPause)
      audio.offEnded(onEnded)
      audio.offError(onError)
      audio.stop()
    }
  }, [audioSrc])

  // Jump to section when currentIndex changes
  useEffect(() => {
    const audio = audioRef.current
    if (sections[currentIndex]) {
      audio.seek(sections[currentIndex].audioStart)
      setCurrentTime(sections[currentIndex].audioStart)
    }
  }, [currentIndex, sections])

  // Get bar position for seek
  const getBarRect = useCallback(() => {
    return new Promise<{ left: number; width: number }>((resolve) => {
      const query = Taro.createSelectorQuery()
      query.select('#audioProgressBar').boundingClientRect()
      query.exec((res) => {
        if (res[0]) {
          barLeftRef.current = res[0].left
          resolve({ left: res[0].left, width: res[0].width })
        } else {
          resolve({ left: 0, width: 1 })
        }
      })
    })
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
  }

  const seekToPosition = async (clientX: number) => {
    const rect = await getBarRect()
    if (duration > 0 && rect.width > 0) {
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
      const t = ratio * duration
      audioRef.current.seek(t)
      setCurrentTime(t)
    }
  }

  const handleTouchStart = (e: any) => {
    seekingRef.current = true
    const touch = e.touches[0]
    seekToPosition(touch.clientX)
  }

  const handleTouchMove = (e: any) => {
    if (!seekingRef.current) return
    const touch = e.touches[0]
    seekToPosition(touch.clientX)
  }

  const handleTouchEnd = () => {
    seekingRef.current = false
  }

  const handleMarkerClick = (startPct: number) => {
    const t = (startPct / 100) * duration
    audioRef.current.seek(t)
    setCurrentTime(t)
    // Find and set current section index
    const sec = sections.find((s) => Math.abs(s.audioStart - t) < 5)
    if (sec) {
      const idx = sections.indexOf(sec)
      onSectionChange(idx)
    }
  }

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <View className={styles.container}>
      {/* Play/Pause + Time */}
      <View className={styles.controls}>
        <View className={styles.playBtn} onClick={togglePlay}>
          <Text className={styles.playIcon}>{isPlaying ? '⏸' : '▶'}</Text>
        </View>
        <Text className={styles.time}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        id="audioProgressBar"
        className={styles.progressBar}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Chapter segments */}
        {sections.map((sec, i) => {
          const startPct = duration > 0 ? (sec.audioStart / duration) * 100 : 0
          const endIdx = i + 1
          const endPct =
            endIdx < sections.length && duration > 0
              ? (sections[endIdx].audioStart / duration) * 100
              : 100
          return (
            <View key={sec.id}>
              <View
                className={styles.chapterSegment}
                style={{
                  left: `${startPct}%`,
                  width: `${endPct - startPct}%`,
                }}
              />
              {i > 0 && (
                <View
                  className={styles.marker}
                  style={{ left: `${startPct}%` }}
                  onClick={() => handleMarkerClick(startPct)}
                />
              )}
            </View>
          )
        })}
        {/* Played overlay */}
        <View className={styles.played} style={{ width: `${progress}%` }} />
        {/* Thumb */}
        <View className={styles.thumb} style={{ left: `${progress}%` }} />
      </View>

      {/* Section info */}
      {sections[currentIndex] && (
        <View className={styles.sectionInfo}>
          <Text className={styles.sectionLabel}>{sections[currentIndex].label}</Text>
        </View>
      )}
    </View>
  )
}
