/**
 * Layer B: Invariant Composition Panel
 *
 * Shows how the five morphological invariants contribute to a selected
 * pentadic dimension. Each invariant is displayed as a stream with:
 * - Current contribution magnitude
 * - Contribution trajectory (sparkline)
 * - Cross-dimensional contribution markers
 */

import { useMemo } from 'react'
import type { InvariantProfile } from '../../data/synthetic/types'
import type {
  Invariant,
  PentadicDimension,
} from '../../data/mappings/invariantPentadicMap'
import { getContribution } from '../../data/mappings/invariantPentadicMap'

export interface InvariantPanelProps {
  /** Selected pentadic dimension to show composition for */
  dimension: PentadicDimension
  /** 90-day time series of invariant profiles */
  invariantTimeSeries: InvariantProfile[]
  /** Currently selected day */
  currentDay: number
  /** Callback when an invariant is clicked for drill-down */
  onInvariantSelect?: (invariant: Invariant) => void
  /** Currently selected invariant (for highlighting) */
  selectedInvariant?: Invariant | null
  /** Additional CSS classes */
  className?: string
}

const INVARIANT_ORDER: Invariant[] = [
  'redundancy',
  'connectivityDensity',
  'feedbackLatency',
  'regenerationRate',
  'dependencyConcentration',
]

const INVARIANT_LABELS: Record<Invariant, { name: string; short: string }> = {
  redundancy: { name: 'Redundancy', short: 'RED' },
  connectivityDensity: { name: 'Connectivity Density', short: 'CON' },
  feedbackLatency: { name: 'Feedback Latency', short: 'FBL' },
  regenerationRate: { name: 'Regeneration Rate', short: 'REG' },
  dependencyConcentration: { name: 'Dependency Concentration', short: 'DEP' },
}

const DIMENSION_LABELS: Record<PentadicDimension, string> = {
  uncertainty: 'Uncertainty',
  severity: 'Severity',
  scope: 'Scope',
  correlation: 'Correlation',
  containment: 'Containment',
}

const DIMENSION_COLORS: Record<PentadicDimension, string> = {
  uncertainty: '#94a3b8',
  severity: '#f87171',
  scope: '#fbbf24',
  correlation: '#fb923c',
  containment: '#34d399',
}

export function InvariantPanel({
  dimension,
  invariantTimeSeries,
  currentDay,
  onInvariantSelect,
  selectedInvariant,
  className = '',
}: InvariantPanelProps) {
  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white/80 font-medium">Invariant Composition</h3>
          <p className="text-white/40 text-sm">
            Contributing to{' '}
            <span
              className="font-medium"
              style={{ color: DIMENSION_COLORS[dimension] }}
            >
              {DIMENSION_LABELS[dimension]}
            </span>
          </p>
        </div>
        <div className="text-white/40 text-xs font-mono">Day {currentDay + 1}</div>
      </div>

      {/* Invariant streams */}
      <div className="space-y-3">
        {INVARIANT_ORDER.map((invariant) => (
          <InvariantStream
            key={invariant}
            invariant={invariant}
            targetDimension={dimension}
            timeSeries={invariantTimeSeries}
            currentDay={currentDay}
            isSelected={selectedInvariant === invariant}
            onClick={() => onInvariantSelect?.(invariant)}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-white/40 text-xs mb-2">
          Contribution strength to other dimensions:
        </div>
        <div className="flex flex-wrap gap-2">
          {(['uncertainty', 'severity', 'scope', 'correlation', 'containment'] as PentadicDimension[])
            .filter((d) => d !== dimension)
            .map((d) => (
              <div
                key={d}
                className="flex items-center gap-1 text-xs"
                style={{ color: DIMENSION_COLORS[d] }}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: DIMENSION_COLORS[d] }}
                />
                <span className="opacity-70">{DIMENSION_LABELS[d].slice(0, 3)}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

/**
 * Individual invariant stream with sparkline and cross-dimensional markers
 */
function InvariantStream({
  invariant,
  targetDimension,
  timeSeries,
  currentDay,
  isSelected,
  onClick,
}: {
  invariant: Invariant
  targetDimension: PentadicDimension
  timeSeries: InvariantProfile[]
  currentDay: number
  isSelected: boolean
  onClick: () => void
}) {
  const label = INVARIANT_LABELS[invariant]
  const contribution = getContribution(invariant, targetDimension)
  const contributionLabel =
    contribution >= 0.8 ? 'High' : contribution >= 0.5 ? 'Moderate' : 'Low'

  // Get current value
  const currentValue = timeSeries[currentDay][invariant]

  // Extract time series for this invariant
  const values = useMemo(
    () => timeSeries.map((profile) => profile[invariant]),
    [timeSeries, invariant]
  )

  // Calculate trend
  const trend = useMemo(() => {
    const start = values.slice(0, 10).reduce((a, b) => a + b, 0) / 10
    const end = values.slice(-10).reduce((a, b) => a + b, 0) / 10
    const diff = end - start
    if (Math.abs(diff) < 0.03) return 'stable'
    return diff > 0 ? 'up' : 'down'
  }, [values])

  // Get cross-dimensional contributions
  const crossContributions = useMemo(() => {
    const dims: PentadicDimension[] = [
      'uncertainty',
      'severity',
      'scope',
      'correlation',
      'containment',
    ]
    return dims
      .filter((d) => d !== targetDimension)
      .map((d) => ({
        dimension: d,
        strength: getContribution(invariant, d),
      }))
      .filter((c) => c.strength >= 0.5) // Only show moderate+ contributions
  }, [invariant, targetDimension])

  return (
    <button
      onClick={onClick}
      className={`
        w-full text-left p-3 rounded-lg transition-all
        ${isSelected
          ? 'bg-white/10 ring-1 ring-white/20'
          : 'bg-white/5 hover:bg-white/10'
        }
      `}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Left: Label and contribution */}
        <div className="flex-shrink-0 w-32">
          <div className="text-white/80 text-sm font-medium">{label.name}</div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-white/40 text-xs font-mono">{label.short}</span>
            <span
              className={`
                text-xs px-1.5 py-0.5 rounded
                ${contribution >= 0.8 ? 'bg-emerald-500/20 text-emerald-400' : ''}
                ${contribution >= 0.5 && contribution < 0.8 ? 'bg-amber-500/20 text-amber-400' : ''}
                ${contribution < 0.5 ? 'bg-gray-500/20 text-gray-400' : ''}
              `}
            >
              {contributionLabel}
            </span>
          </div>
        </div>

        {/* Center: Sparkline */}
        <div className="flex-1 min-w-0">
          <MiniSparkline
            values={values}
            currentDay={currentDay}
            height={32}
          />
        </div>

        {/* Right: Current value and trend */}
        <div className="flex-shrink-0 text-right">
          <div className="text-white/80 font-mono text-sm">
            {currentValue.toFixed(2)}
          </div>
          <div
            className={`
              text-xs mt-1
              ${trend === 'up' ? 'text-emerald-400' : ''}
              ${trend === 'down' ? 'text-red-400' : ''}
              ${trend === 'stable' ? 'text-white/40' : ''}
            `}
          >
            {trend === 'up' && '↑'}
            {trend === 'down' && '↓'}
            {trend === 'stable' && '~'}
          </div>
        </div>
      </div>

      {/* Cross-dimensional contribution markers */}
      {crossContributions.length > 0 && (
        <div className="flex gap-1 mt-2 pt-2 border-t border-white/5">
          <span className="text-white/30 text-xs mr-1">Also:</span>
          {crossContributions.map((c) => (
            <div
              key={c.dimension}
              className="flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded"
              style={{
                backgroundColor: `${DIMENSION_COLORS[c.dimension]}15`,
                color: DIMENSION_COLORS[c.dimension],
              }}
            >
              <span>{DIMENSION_LABELS[c.dimension].slice(0, 3)}</span>
              <span className="opacity-60">
                {c.strength >= 0.8 ? 'H' : 'M'}
              </span>
            </div>
          ))}
        </div>
      )}
    </button>
  )
}

/**
 * Compact sparkline for invariant stream
 */
function MiniSparkline({
  values,
  currentDay,
  height = 32,
}: {
  values: number[]
  currentDay: number
  height?: number
}) {
  const width = 120
  const padding = 2

  // Generate path
  const chartWidth = width - padding * 2
  const chartHeight = height - padding * 2

  const path = useMemo(() => {
    const points = values.map((v, i) => {
      const x = padding + (i / (values.length - 1)) * chartWidth
      const y = padding + (1 - v) * chartHeight
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }, [values, chartWidth, chartHeight])

  // Current day position
  const currentX = padding + (currentDay / (values.length - 1)) * chartWidth
  const currentY = padding + (1 - values[currentDay]) * chartHeight

  return (
    <svg width={width} height={height} className="opacity-70">
      {/* Grid line at 0.5 */}
      <line
        x1={padding}
        y1={height / 2}
        x2={width - padding}
        y2={height / 2}
        stroke="rgba(255,255,255,0.1)"
        strokeDasharray="2,2"
      />

      {/* Sparkline path */}
      <path
        d={path}
        fill="none"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Current day marker */}
      <circle
        cx={currentX}
        cy={currentY}
        r={3}
        fill="white"
        opacity={0.8}
      />
    </svg>
  )
}

export default InvariantPanel
