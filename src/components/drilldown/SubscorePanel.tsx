/**
 * Layer C: Subscore Trace Panel
 *
 * Shows the specific subscores that feed into a selected invariant.
 * For each subscore displays:
 * - Current value + sparkline trajectory
 * - What it measures (domain-specific indicator)
 * - Relational dynamic it captures (Condition B)
 * - Full pentadic pathway (many-to-many mapping visualization)
 * - Trajectory classification and alerts
 */

import { useMemo } from 'react'
import type { Invariant, PentadicDimension } from '../../data/mappings/invariantPentadicMap'
import { invariantPentadicMap, contributionValues } from '../../data/mappings/invariantPentadicMap'
import type { Subscore, SubscoreRegistry } from '../../data/synthetic/subscores'

export interface SubscorePanelProps {
  /** Selected invariant to show subscores for */
  invariant: Invariant
  /** The pentadic dimension context */
  fromDimension: PentadicDimension
  /** Subscores for this system */
  subscores: SubscoreRegistry
  /** Currently selected day */
  currentDay: number
  /** Callback when hovering a subscore (for cross-highlight) */
  onSubscoreHover?: (subscore: Subscore | null) => void
  /** Additional CSS classes */
  className?: string
}

const INVARIANT_LABELS: Record<Invariant, string> = {
  redundancy: 'Redundancy',
  connectivityDensity: 'Connectivity Density',
  feedbackLatency: 'Feedback Latency',
  regenerationRate: 'Regeneration Rate',
  dependencyConcentration: 'Dependency Concentration',
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

const TRAJECTORY_CONFIG = {
  stable: { label: 'Stable', color: 'text-gray-400', icon: '~' },
  improving: { label: 'Improving', color: 'text-emerald-400', icon: '↑' },
  declining: { label: 'Declining', color: 'text-red-400', icon: '↓' },
  volatile: { label: 'Volatile', color: 'text-amber-400', icon: '↕' },
}

export function SubscorePanel({
  invariant,
  subscores,
  currentDay,
  onSubscoreHover,
  className = '',
}: SubscorePanelProps) {
  const invariantSubscores = subscores[invariant] || []

  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-white/80 font-medium">Subscore Trace</h3>
          <span className="text-white/30">→</span>
          <span className="text-white/60">{INVARIANT_LABELS[invariant]}</span>
        </div>
        <p className="text-white/40 text-sm">
          Domain indicators feeding into this invariant
        </p>
      </div>

      {/* Subscores list */}
      <div className="space-y-4">
        {invariantSubscores.map((subscore) => (
          <SubscoreCard
            key={subscore.id}
            subscore={subscore}
            currentDay={currentDay}
            onHover={onSubscoreHover}
          />
        ))}
      </div>

      {invariantSubscores.length === 0 && (
        <div className="text-white/30 text-sm py-8 text-center">
          No subscores defined for {INVARIANT_LABELS[invariant]}
        </div>
      )}
    </div>
  )
}

/**
 * Individual subscore card with full pathway trace
 */
function SubscoreCard({
  subscore,
  currentDay,
  onHover,
}: {
  subscore: Subscore
  currentDay: number
  onHover?: (subscore: Subscore | null) => void
}) {
  const currentValue = subscore.timeSeries[currentDay]
  const trajectoryConfig = TRAJECTORY_CONFIG[subscore.trajectory]

  // Get all invariants this subscore contributes to
  const allInvariants = [
    subscore.primaryInvariant,
    ...(subscore.secondaryInvariants || []),
  ]

  return (
    <div
      className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-colors"
      onMouseEnter={() => onHover?.(subscore)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Header row: name, value, trajectory */}
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1">
          <div className="text-white/80 font-medium">{subscore.name}</div>
          <div className={`text-xs ${trajectoryConfig.color} mt-0.5`}>
            {trajectoryConfig.icon} {trajectoryConfig.label}
          </div>
        </div>
        <div className="text-right">
          <div className="text-white/80 font-mono text-lg">
            {currentValue.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Sparkline */}
      <div className="mb-3">
        <SubscoreSparkline
          values={subscore.timeSeries}
          currentDay={currentDay}
          trajectory={subscore.trajectory}
        />
      </div>

      {/* What it measures */}
      <div className="mb-3">
        <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
          Measures
        </div>
        <div className="text-white/60 text-sm">{subscore.measures}</div>
      </div>

      {/* Relational dynamic (Condition B) */}
      <div className="mb-3">
        <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
          Relational Dynamic
        </div>
        <div className="text-white/50 text-sm italic">
          "{subscore.relationalDynamic}"
        </div>
      </div>

      {/* Invariant mapping */}
      <div className="mb-3">
        <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
          Invariant Mapping
        </div>
        <div className="flex flex-wrap gap-1">
          {allInvariants.map((inv, i) => (
            <span
              key={inv}
              className={`
                text-xs px-2 py-0.5 rounded
                ${i === 0 ? 'bg-white/10 text-white/70' : 'bg-white/5 text-white/50'}
              `}
            >
              {INVARIANT_LABELS[inv]}
              {i === 0 && ' (primary)'}
            </span>
          ))}
        </div>
      </div>

      {/* Pentadic pathway (many-to-many visualization) */}
      <div>
        <div className="text-white/40 text-xs uppercase tracking-wide mb-2">
          Pentadic Pathway
        </div>
        <PentadicPathway invariants={allInvariants} />
      </div>
    </div>
  )
}

/**
 * Sparkline with trajectory-appropriate styling
 */
function SubscoreSparkline({
  values,
  currentDay,
  trajectory,
}: {
  values: number[]
  currentDay: number
  trajectory: Subscore['trajectory']
}) {
  const width = 280
  const height = 40
  const padding = 4

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

  const currentX = padding + (currentDay / (values.length - 1)) * chartWidth
  const currentY = padding + (1 - values[currentDay]) * chartHeight

  const strokeColor =
    trajectory === 'improving'
      ? '#34d399'
      : trajectory === 'declining'
      ? '#f87171'
      : trajectory === 'volatile'
      ? '#fbbf24'
      : '#94a3b8'

  return (
    <svg width={width} height={height} className="w-full">
      {/* Background grid */}
      <line
        x1={padding}
        y1={height / 2}
        x2={width - padding}
        y2={height / 2}
        stroke="rgba(255,255,255,0.1)"
        strokeDasharray="2,2"
      />

      {/* Path */}
      <path
        d={path}
        fill="none"
        stroke={strokeColor}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.7}
      />

      {/* Current day indicator */}
      <line
        x1={currentX}
        y1={padding}
        x2={currentX}
        y2={height - padding}
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />
      <circle cx={currentX} cy={currentY} r={4} fill={strokeColor} />

      {/* Day labels */}
      <text x={padding} y={height - 2} fontSize={8} fill="rgba(255,255,255,0.3)">
        1
      </text>
      <text
        x={width - padding}
        y={height - 2}
        fontSize={8}
        fill="rgba(255,255,255,0.3)"
        textAnchor="end"
      >
        90
      </text>
    </svg>
  )
}

/**
 * Visual representation of many-to-many mapping from invariants to pentadic dimensions
 */
function PentadicPathway({ invariants }: { invariants: Invariant[] }) {
  const dimensions: PentadicDimension[] = [
    'uncertainty',
    'severity',
    'scope',
    'correlation',
    'containment',
  ]

  // Aggregate contributions from all invariants
  const aggregatedContributions = useMemo(() => {
    const result: Record<PentadicDimension, number> = {
      uncertainty: 0,
      severity: 0,
      scope: 0,
      correlation: 0,
      containment: 0,
    }

    for (const inv of invariants) {
      const mapping = invariantPentadicMap[inv]
      for (const dim of dimensions) {
        const strength = contributionValues[mapping[dim]]
        result[dim] = Math.max(result[dim], strength) // Take max contribution
      }
    }

    return result
  }, [invariants])

  return (
    <div className="space-y-1.5">
      {dimensions.map((dim) => {
        const contribution = aggregatedContributions[dim]
        const label =
          contribution >= 0.8 ? 'High' : contribution >= 0.5 ? 'Moderate' : 'Low'
        const widthPercent = contribution * 100

        return (
          <div key={dim} className="flex items-center gap-2">
            <span
              className="text-xs w-12 text-right"
              style={{ color: DIMENSION_COLORS[dim] }}
            >
              {DIMENSION_LABELS[dim].slice(0, 3)}
            </span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${widthPercent}%`,
                  backgroundColor: DIMENSION_COLORS[dim],
                  opacity: 0.6,
                }}
              />
            </div>
            <span className="text-xs text-white/40 w-12">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

export default SubscorePanel
