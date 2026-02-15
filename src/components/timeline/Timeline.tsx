/**
 * Timeline Component
 *
 * Displays a 90-day trajectory as either:
 * - Filmstrip: row of MiniGlyphs (sampled for space)
 * - Sparklines: parallel line graphs for each pentadic dimension
 *
 * Includes perturbation event markers and day selection.
 */

import { useMemo } from 'react'
import type { PentadicProfile, PerturbationEvent } from '../../data/synthetic/types'
import { MiniGlyph } from '../glyph/RiskGlyph'

export type TimelineMode = 'filmstrip' | 'sparklines'

export interface TimelineProps {
  /** Array of pentadic profiles (90 days) */
  timeSeries: PentadicProfile[]
  /** Perturbation events to mark on timeline */
  events?: PerturbationEvent[]
  /** Display mode */
  mode?: TimelineMode
  /** Currently selected day (0-89) */
  selectedDay?: number
  /** Callback when day is selected */
  onDaySelect?: (day: number) => void
  /** Number of days to sample for filmstrip (default: 15) */
  sampleCount?: number
  /** Height of the timeline in pixels */
  height?: number
  /** Additional CSS classes */
  className?: string
}

const DIMENSION_COLORS = {
  u: '#94a3b8',           // slate-400 (neutral)
  severity: '#f87171',    // red-400
  scope: '#fbbf24',       // amber-400
  correlation: '#fb923c', // orange-400
  containment: '#34d399', // emerald-400
} as const

const DIMENSION_LABELS = {
  u: 'U',
  severity: 'Sev',
  scope: 'Sco',
  correlation: 'Cor',
  containment: 'K',
} as const

export function Timeline({
  timeSeries,
  events = [],
  mode = 'sparklines',
  selectedDay = 89,
  onDaySelect,
  sampleCount = 15,
  height = 120,
  className = '',
}: TimelineProps) {
  // Sample indices for filmstrip mode
  const sampleIndices = useMemo(() => {
    const indices: number[] = []
    const step = (timeSeries.length - 1) / (sampleCount - 1)
    for (let i = 0; i < sampleCount; i++) {
      indices.push(Math.round(i * step))
    }
    return indices
  }, [timeSeries.length, sampleCount])

  if (mode === 'filmstrip') {
    return (
      <FilmstripTimeline
        timeSeries={timeSeries}
        events={events}
        sampleIndices={sampleIndices}
        selectedDay={selectedDay}
        onDaySelect={onDaySelect}
        height={height}
        className={className}
      />
    )
  }

  return (
    <SparklineTimeline
      timeSeries={timeSeries}
      events={events}
      selectedDay={selectedDay}
      onDaySelect={onDaySelect}
      height={height}
      className={className}
    />
  )
}

/**
 * Filmstrip mode - row of MiniGlyphs
 */
function FilmstripTimeline({
  timeSeries,
  events,
  sampleIndices,
  selectedDay,
  onDaySelect,
  height,
  className,
}: {
  timeSeries: PentadicProfile[]
  events: PerturbationEvent[]
  sampleIndices: number[]
  selectedDay: number
  onDaySelect?: (day: number) => void
  height: number
  className: string
}) {
  const glyphSize = Math.min(32, height - 20)

  // Find nearest sample index to selected day
  const nearestSampleIndex = sampleIndices.reduce((nearest, idx) =>
    Math.abs(idx - selectedDay) < Math.abs(nearest - selectedDay) ? idx : nearest
  )

  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-white/50 text-xs">Day 1</span>
        <span className="text-white/50 text-xs">Day 90</span>
      </div>

      <div
        className="flex items-end justify-between gap-1 relative"
        style={{ height: height - 40 }}
      >
        {sampleIndices.map((dayIndex) => {
          const isSelected = dayIndex === nearestSampleIndex
          const hasEvent = events.some((e) => Math.abs(e.day - dayIndex) <= 2)

          return (
            <button
              key={dayIndex}
              onClick={() => onDaySelect?.(dayIndex)}
              className={`
                flex flex-col items-center transition-all relative
                ${isSelected ? 'scale-110 z-10' : 'hover:scale-105 opacity-70 hover:opacity-100'}
              `}
            >
              <MiniGlyph profile={timeSeries[dayIndex]} size={glyphSize} />
              {hasEvent && (
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
              )}
              {isSelected && (
                <div className="absolute -bottom-4 text-xs text-white/70">
                  {dayIndex + 1}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/**
 * Sparklines mode - parallel line graphs for each dimension
 */
function SparklineTimeline({
  timeSeries,
  events,
  selectedDay,
  onDaySelect,
  height,
  className,
}: {
  timeSeries: PentadicProfile[]
  events: PerturbationEvent[]
  selectedDay: number
  onDaySelect?: (day: number) => void
  height: number
  className: string
}) {
  const width = 400
  const padding = { top: 10, right: 10, bottom: 20, left: 35 }
  const chartWidth = width - padding.left - padding.right
  const chartHeight = height - padding.top - padding.bottom

  // Generate path for a dimension
  const generatePath = (dimension: keyof PentadicProfile) => {
    const points = timeSeries.map((profile, i) => {
      const x = (i / (timeSeries.length - 1)) * chartWidth
      const y = chartHeight - profile[dimension] * chartHeight
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  const dimensions: (keyof PentadicProfile)[] = [
    'u',
    'severity',
    'scope',
    'correlation',
    'containment',
  ]

  // Calculate x position for selected day
  const selectedX = (selectedDay / (timeSeries.length - 1)) * chartWidth

  const handleClick = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!onDaySelect) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - padding.left
    const day = Math.round((x / chartWidth) * (timeSeries.length - 1))
    if (day >= 0 && day < timeSeries.length) {
      onDaySelect(day)
    }
  }

  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      {/* Legend */}
      <div className="flex gap-4 mb-2 text-xs">
        {dimensions.map((dim) => (
          <div key={dim} className="flex items-center gap-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: DIMENSION_COLORS[dim] }}
            />
            <span className="text-white/50">{DIMENSION_LABELS[dim]}</span>
          </div>
        ))}
      </div>

      <svg
        width={width}
        height={height}
        className="cursor-pointer"
        onClick={handleClick}
      >
        <g transform={`translate(${padding.left}, ${padding.top})`}>
          {/* Grid lines */}
          <line
            x1={0}
            y1={chartHeight}
            x2={chartWidth}
            y2={chartHeight}
            stroke="rgba(255,255,255,0.1)"
          />
          <line
            x1={0}
            y1={chartHeight / 2}
            x2={chartWidth}
            y2={chartHeight / 2}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4,4"
          />
          <line
            x1={0}
            y1={0}
            x2={chartWidth}
            y2={0}
            stroke="rgba(255,255,255,0.05)"
            strokeDasharray="4,4"
          />

          {/* Event markers */}
          {events.map((event) => {
            const x = (event.day / (timeSeries.length - 1)) * chartWidth
            return (
              <g key={event.day}>
                <line
                  x1={x}
                  y1={0}
                  x2={x}
                  y2={chartHeight}
                  stroke="rgba(251, 191, 36, 0.3)"
                  strokeDasharray="2,2"
                />
                <circle
                  cx={x}
                  cy={chartHeight + 8}
                  r={3}
                  fill="#fbbf24"
                  opacity={0.8}
                />
              </g>
            )
          })}

          {/* Sparklines */}
          {dimensions.map((dim) => (
            <path
              key={dim}
              d={generatePath(dim)}
              fill="none"
              stroke={DIMENSION_COLORS[dim]}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8}
            />
          ))}

          {/* Selected day indicator */}
          <line
            x1={selectedX}
            y1={0}
            x2={selectedX}
            y2={chartHeight}
            stroke="rgba(255,255,255,0.5)"
            strokeWidth={2}
          />
          <circle
            cx={selectedX}
            cy={chartHeight}
            r={4}
            fill="white"
            opacity={0.8}
          />

          {/* Day labels */}
          <text
            x={0}
            y={chartHeight + 16}
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
          >
            1
          </text>
          <text
            x={chartWidth}
            y={chartHeight + 16}
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
            textAnchor="end"
          >
            90
          </text>
          <text
            x={selectedX}
            y={chartHeight + 16}
            fill="rgba(255,255,255,0.7)"
            fontSize={10}
            textAnchor="middle"
          >
            {selectedDay + 1}
          </text>

          {/* Y-axis labels */}
          <text
            x={-5}
            y={5}
            fill="rgba(255,255,255,0.4)"
            fontSize={9}
            textAnchor="end"
          >
            1.0
          </text>
          <text
            x={-5}
            y={chartHeight / 2 + 3}
            fill="rgba(255,255,255,0.4)"
            fontSize={9}
            textAnchor="end"
          >
            0.5
          </text>
          <text
            x={-5}
            y={chartHeight}
            fill="rgba(255,255,255,0.4)"
            fontSize={9}
            textAnchor="end"
          >
            0
          </text>
        </g>
      </svg>
    </div>
  )
}

export default Timeline
