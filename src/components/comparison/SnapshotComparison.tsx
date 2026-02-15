/**
 * Snapshot Comparison Component
 *
 * Allows side-by-side comparison of risk profiles at two different time points.
 * Features:
 * - Two glyphs displayed side by side
 * - Radar chart overlay showing both profiles
 * - Delta indicators for each dimension
 */

import { useMemo } from 'react'
import type { PentadicProfile } from '../../data/synthetic/types'
import { RiskGlyph } from '../glyph/RiskGlyph'

export interface SnapshotComparisonProps {
  /** Profile at first time point */
  profileA: PentadicProfile
  /** Profile at second time point */
  profileB: PentadicProfile
  /** Label for first snapshot */
  labelA: string
  /** Label for second snapshot */
  labelB: string
  /** Whether to show radar overlay */
  showRadar?: boolean
  /** Additional CSS classes */
  className?: string
}

const DIMENSION_ORDER: (keyof PentadicProfile)[] = [
  'u',
  'severity',
  'scope',
  'correlation',
  'containment',
]

const DIMENSION_LABELS: Record<keyof PentadicProfile, string> = {
  u: 'Uncertainty',
  severity: 'Severity',
  scope: 'Scope',
  correlation: 'Correlation',
  containment: 'Containment',
}

const DIMENSION_COLORS: Record<keyof PentadicProfile, string> = {
  u: '#94a3b8',
  severity: '#f87171',
  scope: '#fbbf24',
  correlation: '#fb923c',
  containment: '#34d399',
}

export function SnapshotComparison({
  profileA,
  profileB,
  labelA,
  labelB,
  showRadar = true,
  className = '',
}: SnapshotComparisonProps) {
  // Calculate deltas
  const deltas = useMemo(() => {
    return DIMENSION_ORDER.map((dim) => ({
      dimension: dim,
      valueA: profileA[dim],
      valueB: profileB[dim],
      delta: profileB[dim] - profileA[dim],
    }))
  }, [profileA, profileB])

  return (
    <div className={`bg-void-light rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white/80 font-medium">Snapshot Comparison</h3>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-white/30" />
            <span className="text-white/60">{labelA}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="text-white/60">{labelB}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Side-by-side glyphs */}
        <div>
          <div className="flex items-end justify-center gap-8 mb-4">
            <div className="text-center">
              <RiskGlyph profile={profileA} scale={0.8} />
              <div className="text-white/50 text-sm mt-2">{labelA}</div>
            </div>
            <div className="text-white/30 text-2xl mb-8">→</div>
            <div className="text-center">
              <RiskGlyph profile={profileB} scale={0.8} />
              <div className="text-white/50 text-sm mt-2">{labelB}</div>
            </div>
          </div>

          {/* Delta table */}
          <div className="mt-6">
            <div className="text-white/40 text-xs uppercase tracking-wide mb-2">
              Dimension Changes
            </div>
            <div className="space-y-2">
              {deltas.map(({ dimension, valueA, valueB, delta }) => (
                <div key={dimension} className="flex items-center gap-3 text-sm">
                  <span
                    className="w-20"
                    style={{ color: DIMENSION_COLORS[dimension] }}
                  >
                    {DIMENSION_LABELS[dimension]}
                  </span>
                  <span className="text-white/50 font-mono w-12 text-right">
                    {valueA.toFixed(2)}
                  </span>
                  <span className="text-white/30">→</span>
                  <span className="text-white/70 font-mono w-12">
                    {valueB.toFixed(2)}
                  </span>
                  <span
                    className={`
                      font-mono text-xs px-1.5 py-0.5 rounded w-16 text-center
                      ${delta > 0.05 ? 'bg-red-500/20 text-red-400' : ''}
                      ${delta < -0.05 ? 'bg-emerald-500/20 text-emerald-400' : ''}
                      ${Math.abs(delta) <= 0.05 ? 'bg-white/5 text-white/40' : ''}
                    `}
                  >
                    {delta > 0 ? '+' : ''}
                    {delta.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Radar overlay */}
        {showRadar && (
          <div className="flex flex-col items-center justify-center">
            <RadarOverlay
              profileA={profileA}
              profileB={profileB}
            />
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Radar chart with two overlaid profiles
 */
function RadarOverlay({
  profileA,
  profileB,
}: {
  profileA: PentadicProfile
  profileB: PentadicProfile
}) {
  const size = 280
  const center = size / 2
  const maxRadius = size / 2 - 40

  // Calculate points for each profile
  const getPoints = (profile: PentadicProfile) => {
    return DIMENSION_ORDER.map((dim, i) => {
      const angle = (i / DIMENSION_ORDER.length) * Math.PI * 2 - Math.PI / 2
      const value = profile[dim]
      const radius = value * maxRadius
      return {
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
        labelX: center + Math.cos(angle) * (maxRadius + 25),
        labelY: center + Math.sin(angle) * (maxRadius + 25),
        dimension: dim,
        value,
        angle,
      }
    })
  }

  const pointsA = useMemo(() => getPoints(profileA), [profileA])
  const pointsB = useMemo(() => getPoints(profileB), [profileB])

  const pathA = pointsA.map((p) => `${p.x},${p.y}`).join(' ')
  const pathB = pointsB.map((p) => `${p.x},${p.y}`).join(' ')

  // Grid circles
  const gridLevels = [0.25, 0.5, 0.75, 1]

  return (
    <div className="relative">
      <svg width={size} height={size}>
        {/* Grid circles */}
        {gridLevels.map((level) => (
          <circle
            key={level}
            cx={center}
            cy={center}
            r={level * maxRadius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeDasharray={level < 1 ? '2,2' : undefined}
          />
        ))}

        {/* Axis lines */}
        {pointsA.map((p, i) => (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={center + Math.cos(p.angle) * maxRadius}
            y2={center + Math.sin(p.angle) * maxRadius}
            stroke="rgba(255,255,255,0.1)"
          />
        ))}

        {/* Profile A (baseline - white/gray) */}
        <polygon
          points={pathA}
          fill="rgba(255,255,255,0.1)"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={2}
        />

        {/* Profile B (comparison - amber) */}
        <polygon
          points={pathB}
          fill="rgba(251,191,36,0.15)"
          stroke="rgba(251,191,36,0.8)"
          strokeWidth={2}
        />

        {/* Dimension labels */}
        {pointsA.map((p, i) => (
          <text
            key={i}
            x={p.labelX}
            y={p.labelY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill={DIMENSION_COLORS[p.dimension]}
          >
            {DIMENSION_LABELS[p.dimension].slice(0, 3)}
          </text>
        ))}

        {/* Data points */}
        {pointsA.map((p, i) => (
          <circle
            key={`a-${i}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="rgba(255,255,255,0.6)"
            stroke="white"
            strokeWidth={1}
          />
        ))}
        {pointsB.map((p, i) => (
          <circle
            key={`b-${i}`}
            cx={p.x}
            cy={p.y}
            r={4}
            fill="rgba(251,191,36,0.8)"
            stroke="#fbbf24"
            strokeWidth={1}
          />
        ))}
      </svg>

      {/* Scale labels */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 text-xs pointer-events-none">
        0
      </div>
    </div>
  )
}

/**
 * Compact comparison selector for choosing two time points
 */
export function ComparisonSelector({
  totalDays,
  dayA,
  dayB,
  onDayAChange,
  onDayBChange,
  className = '',
}: {
  totalDays: number
  dayA: number
  dayB: number
  onDayAChange: (day: number) => void
  onDayBChange: (day: number) => void
  className?: string
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <label className="text-white/50 text-sm">Compare Day</label>
        <input
          type="number"
          min={1}
          max={totalDays}
          value={dayA + 1}
          onChange={(e) => onDayAChange(Math.max(0, Math.min(totalDays - 1, parseInt(e.target.value, 10) - 1)))}
          className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded text-white/80 text-sm font-mono"
        />
      </div>
      <span className="text-white/30">vs</span>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-amber-400" />
        <label className="text-white/50 text-sm">Day</label>
        <input
          type="number"
          min={1}
          max={totalDays}
          value={dayB + 1}
          onChange={(e) => onDayBChange(Math.max(0, Math.min(totalDays - 1, parseInt(e.target.value, 10) - 1)))}
          className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded text-white/80 text-sm font-mono"
        />
      </div>
    </div>
  )
}

export default SnapshotComparison
