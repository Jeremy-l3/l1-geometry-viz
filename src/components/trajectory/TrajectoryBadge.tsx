/**
 * Trajectory Classification Display
 *
 * Shows the trajectory type and active contraction modes for a system.
 * Designed to be displayed alongside or below the main glyph.
 */

import type { TrajectoryType, ContractionMode } from '../../data/synthetic/types'
import { ContractionIconGrid } from '../contraction'

export interface TrajectoryBadgeProps {
  /** Trajectory classification */
  trajectoryType: TrajectoryType
  /** Active contraction modes */
  contractionModes?: ContractionMode[]
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show detailed mode labels */
  showModeLabels?: boolean
  /** Additional CSS classes */
  className?: string
}

const TRAJECTORY_CONFIG: Record<
  TrajectoryType,
  { color: string; bgColor: string; icon: string; description: string }
> = {
  Elastic: {
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/20',
    icon: '~',
    description: 'Returns to baseline after perturbations',
  },
  Plastic: {
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    icon: '→',
    description: 'Permanent deformation, stabilizing at new state',
  },
  Degenerative: {
    color: 'text-red-400',
    bgColor: 'bg-red-500/20',
    icon: '↓',
    description: 'Progressive deterioration over time',
  },
  Regenerative: {
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    icon: '↑',
    description: 'Recovering from prior damage',
  },
}

const CONTRACTION_MODE_CONFIG: Record<
  ContractionMode,
  { label: string; shortLabel: string; icon: string }
> = {
  volumeContraction: {
    label: 'Volume Contraction',
    shortLabel: 'Vol',
    icon: '◇',
  },
  dimensionalCollapse: {
    label: 'Dimensional Collapse',
    shortLabel: 'Dim',
    icon: '▽',
  },
  topologicalFragmentation: {
    label: 'Topological Fragmentation',
    shortLabel: 'Topo',
    icon: '◈',
  },
  curvatureSteepening: {
    label: 'Curvature Steepening',
    shortLabel: 'Curv',
    icon: '∿',
  },
}

export function TrajectoryBadge({
  trajectoryType,
  contractionModes = [],
  size = 'md',
  showModeLabels = false,
  className = '',
}: TrajectoryBadgeProps) {
  const config = TRAJECTORY_CONFIG[trajectoryType]

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  }

  const modeSizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
    lg: 'text-sm px-2.5 py-1',
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {/* Main trajectory badge */}
      <div
        className={`
          inline-flex items-center gap-1.5 rounded-full font-medium
          ${config.bgColor} ${config.color} ${sizeClasses[size]}
        `}
        title={config.description}
      >
        <span className="opacity-60">{config.icon}</span>
        <span>{trajectoryType}</span>
      </div>

      {/* Contraction modes */}
      {contractionModes.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {contractionModes.map((mode) => {
            const modeConfig = CONTRACTION_MODE_CONFIG[mode]
            return (
              <div
                key={mode}
                className={`
                  inline-flex items-center gap-1 rounded
                  bg-white/5 text-white/50
                  ${modeSizeClasses[size]}
                `}
                title={modeConfig.label}
              >
                <span className="opacity-60">{modeConfig.icon}</span>
                {showModeLabels && <span>{modeConfig.shortLabel}</span>}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

/**
 * Compact inline trajectory indicator
 */
export function TrajectoryIndicator({
  trajectoryType,
  className = '',
}: {
  trajectoryType: TrajectoryType
  className?: string
}) {
  const config = TRAJECTORY_CONFIG[trajectoryType]

  return (
    <span
      className={`inline-flex items-center gap-1 ${config.color} ${className}`}
      title={config.description}
    >
      <span className="text-lg leading-none">{config.icon}</span>
      <span className="text-xs font-medium">{trajectoryType}</span>
    </span>
  )
}

/**
 * Full trajectory panel with description
 */
export function TrajectoryPanel({
  trajectoryType,
  contractionModes = [],
  className = '',
}: {
  trajectoryType: TrajectoryType
  contractionModes?: ContractionMode[]
  className?: string
}) {
  const config = TRAJECTORY_CONFIG[trajectoryType]

  return (
    <div className={`bg-void-light rounded-lg p-4 ${className}`}>
      {/* Trajectory type header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`
            w-10 h-10 rounded-full flex items-center justify-center text-xl
            ${config.bgColor} ${config.color}
          `}
        >
          {config.icon}
        </div>
        <div>
          <div className={`font-medium ${config.color}`}>{trajectoryType}</div>
          <div className="text-white/50 text-sm">{config.description}</div>
        </div>
      </div>

      {/* Active contraction modes with animated icons */}
      <div className="mt-4 pt-3 border-t border-white/10">
        <div className="text-white/40 text-xs uppercase tracking-wide mb-3">
          Contraction Modes
        </div>
        <ContractionIconGrid
          activeModes={contractionModes}
          size={28}
          showLabels={true}
        />
      </div>
    </div>
  )
}

export default TrajectoryBadge
