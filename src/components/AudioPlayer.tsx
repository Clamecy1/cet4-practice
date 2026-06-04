import { useState, useRef, useEffect, useCallback } from 'react'
import type { ListeningSection } from '../db/types'

interface AudioPlayerProps {
  audioSrc: string
  sections: ListeningSection[]
  currentIndex: number
  onSectionChange: (index: number) => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

export default function AudioPlayer({ audioSrc, sections, currentIndex, onSectionChange }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const barRef = useRef<HTMLDivElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [seeking, setSeeking] = useState(false)

  // Sync audio source
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.src = audioSrc
    audio.load()
    setIsPlaying(false)
    setCurrentTime(0)
    setDuration(0)
  }, [audioSrc])

  // Sync currentTime to section audioStart when currentIndex changes externally
  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !sections[currentIndex]) return
    audio.currentTime = sections[currentIndex].audioStart
  }, [currentIndex, sections])

  // Event listeners
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTimeUpdate = () => {
      if (!seeking) setCurrentTime(audio.currentTime)
    }
    const onLoadedMetadata = () => setDuration(audio.duration)
    const onPlay = () => setIsPlaying(true)
    const onPause = () => setIsPlaying(false)
    const onEnded = () => setIsPlaying(false)

    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('loadedmetadata', onLoadedMetadata)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('loadedmetadata', onLoadedMetadata)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [seeking])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [])

  const seekTo = useCallback((clientX: number) => {
    const bar = barRef.current
    const audio = audioRef.current
    if (!bar || !audio || !duration) return
    const rect = bar.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    audio.currentTime = ratio * duration
    setCurrentTime(audio.currentTime)
  }, [duration])

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setSeeking(true)
    seekTo(e.clientX)
    ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)

    const onMove = (ev: PointerEvent) => seekTo(ev.clientX)
    const onUp = () => {
      setSeeking(false)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }, [seekTo])

  const handleMarkerClick = useCallback((e: React.MouseEvent, index: number) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = sections[index].audioStart
    setCurrentTime(audio.currentTime)
    onSectionChange(index)
  }, [sections, onSectionChange])

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="w-full">
      {/* Hidden native audio element */}
      <audio ref={audioRef} preload="auto" />

      {/* Controls row */}
      <div className="flex items-center gap-3">
        {/* Play/Pause button */}
        <button
          onClick={togglePlay}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white text-sm active:bg-indigo-700 transition-colors"
          aria-label={isPlaying ? '暂停' : '播放'}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="3" height="12" rx="0.5" />
              <rect x="10" y="2" width="3" height="12" rx="0.5" />
            </svg>
          ) : (
            <svg className="w-4 h-4 ml-0.5" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="5,2 14,8 5,14" />
            </svg>
          )}
        </button>

        {/* Time display */}
        <span className="text-xs text-gray-500 font-mono flex-shrink-0 w-[72px] text-right">
          {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : '--:--'}
        </span>

        {/* Progress bar with markers */}
        <div
          ref={barRef}
          className="relative flex-1 h-7 flex items-center cursor-pointer touch-none select-none"
          onPointerDown={handlePointerDown}
        >
          {/* Track background */}
          <div className="absolute left-0 right-0 h-1.5 rounded-full bg-gray-200" />

          {/* Section highlight zones */}
          {sections.map((sec, i) => {
            const startPct = duration > 0 ? (sec.audioStart / duration) * 100 : 0
            const endAudioStart = i < sections.length - 1 ? sections[i + 1].audioStart : duration
            const endPct = duration > 0 ? (endAudioStart / duration) * 100 : 0
            const isCurrent = i === currentIndex
            return (
              <div
                key={sec.id}
                className={`absolute h-1.5 rounded-full transition-colors ${isCurrent ? 'bg-indigo-100' : ''}`}
                style={{ left: `${startPct}%`, width: `${endPct - startPct}%` }}
              />
            )
          })}

          {/* Played progress */}
          <div
            className="absolute left-0 h-1.5 rounded-full bg-indigo-500 pointer-events-none"
            style={{ width: `${progress}%` }}
          />

          {/* Chapter markers (vertical lines) */}
          {sections.map((sec, i) => {
            if (i === 0) return null // Skip the first one (start of audio)
            const pct = duration > 0 ? (sec.audioStart / duration) * 100 : 0
            return (
              <button
                key={sec.id}
                className="absolute top-0 bottom-0 w-0.5 bg-gray-400 hover:bg-indigo-600 cursor-pointer transition-colors z-10"
                style={{ left: `${pct}%` }}
                onClick={(e) => handleMarkerClick(e, i)}
                aria-label={`跳转到 ${sec.label}`}
                title={sec.label.split('(')[0].trim()}
              />
            )
          })}

          {/* Current position thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -ml-1.5 w-3 h-3 bg-indigo-600 rounded-full shadow pointer-events-none z-20"
            style={{ left: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}
