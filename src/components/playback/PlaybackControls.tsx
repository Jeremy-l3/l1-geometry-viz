/**
 * Playback Controls Component
 *
 * Provides controls for animating through a 90-day trajectory:
 * - Play/pause button
 * - Speed control
 * - Day scrubber/slider
 * - Frame counter
 */

import { useState, useEffect, useCallback, useRef } from 'react'

export interface PlaybackControlsProps {
  /** Total number of days in the time series */
  totalDays: number
  /** Current day (0-indexed) */
  currentDay: number
  /** Callback when day changes */
  onDayChange: (day: number) => void
  /** Whether playback is active */
  isPlaying?: boolean
  /** Callback when play state changes */
  onPlayStateChange?: (isPlaying: boolean) => void
  /** Additional CSS classes */
  className?: string
}

type PlaybackSpeed = 0.5 | 1 | 2 | 4

const SPEED_OPTIONS: PlaybackSpeed[] = [0.5, 1, 2, 4]
const BASE_INTERVAL_MS = 200 // Base interval at 1x speed

export function PlaybackControls({
  totalDays,
  currentDay,
  onDayChange,
  isPlaying: externalIsPlaying,
  onPlayStateChange,
  className = '',
}: PlaybackControlsProps) {
  // Internal play state (can be controlled externally)
  const [internalIsPlaying, setInternalIsPlaying] = useState(false)
  const isPlaying = externalIsPlaying ?? internalIsPlaying

  const [speed, setSpeed] = useState<PlaybackSpeed>(1)
  const intervalRef = useRef<number | null>(null)

  const setPlayState = useCallback(
    (playing: boolean) => {
      setInternalIsPlaying(playing)
      onPlayStateChange?.(playing)
    },
    [onPlayStateChange]
  )

  // Handle playback animation
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = BASE_INTERVAL_MS / speed

      intervalRef.current = window.setInterval(() => {
        onDayChange(currentDay >= totalDays - 1 ? 0 : currentDay + 1)
      }, intervalMs)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [isPlaying, currentDay, totalDays, speed, onDayChange])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const togglePlay = () => {
    setPlayState(!isPlaying)
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const day = parseInt(e.target.value, 10)
    onDayChange(day)
  }

  const stepBackward = () => {
    onDayChange(Math.max(0, currentDay - 1))
  }

  const stepForward = () => {
    onDayChange(Math.min(totalDays - 1, currentDay + 1))
  }

  const jumpToStart = () => {
    onDayChange(0)
    setPlayState(false)
  }

  const jumpToEnd = () => {
    onDayChange(totalDays - 1)
    setPlayState(false)
  }

  const cycleSpeed = () => {
    const currentIndex = SPEED_OPTIONS.indexOf(speed)
    const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length
    setSpeed(SPEED_OPTIONS[nextIndex])
  }

  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      {/* Main controls row */}
      <div className="flex items-center gap-4">
        {/* Jump to start */}
        <button
          onClick={jumpToStart}
          className="p-2 text-white/50 hover:text-white/80 transition-colors"
          title="Jump to start"
        >
          <SkipBackIcon />
        </button>

        {/* Step backward */}
        <button
          onClick={stepBackward}
          className="p-2 text-white/50 hover:text-white/80 transition-colors"
          title="Step backward"
        >
          <StepBackIcon />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className={`
            p-3 rounded-full transition-all
            ${isPlaying
              ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
              : 'bg-white/10 text-white/80 hover:bg-white/20'
            }
          `}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        {/* Step forward */}
        <button
          onClick={stepForward}
          className="p-2 text-white/50 hover:text-white/80 transition-colors"
          title="Step forward"
        >
          <StepForwardIcon />
        </button>

        {/* Jump to end */}
        <button
          onClick={jumpToEnd}
          className="p-2 text-white/50 hover:text-white/80 transition-colors"
          title="Jump to end"
        >
          <SkipForwardIcon />
        </button>

        {/* Speed control */}
        <button
          onClick={cycleSpeed}
          className="px-3 py-1 text-xs font-mono bg-white/5 rounded text-white/60 hover:bg-white/10 hover:text-white/80 transition-colors min-w-[48px]"
          title="Change playback speed"
        >
          {speed}x
        </button>

        {/* Day counter */}
        <div className="ml-auto text-sm font-mono">
          <span className="text-white/80">Day {currentDay + 1}</span>
          <span className="text-white/40"> / {totalDays}</span>
        </div>
      </div>

      {/* Scrubber slider */}
      <div className="mt-4">
        <input
          type="range"
          min={0}
          max={totalDays - 1}
          value={currentDay}
          onChange={handleSliderChange}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:hover:bg-white/90
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-white
            [&::-moz-range-thumb]:border-0
            [&::-moz-range-thumb]:cursor-pointer"
        />
      </div>
    </div>
  )
}

// Simple SVG icons
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
    </svg>
  )
}

function StepBackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6V6zm3.5 6 8.5 6V6l-8.5 6z" />
    </svg>
  )
}

function StepForwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6h2v12h-2V6zM6 18l8.5-6L6 6v12z" />
    </svg>
  )
}

function SkipBackIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 6h2v12H6V6zm12 0-9 6 9 6V6z" />
    </svg>
  )
}

function SkipForwardIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 18l9-6-9-6v12zm10-12v12h2V6h-2z" />
    </svg>
  )
}

export default PlaybackControls
