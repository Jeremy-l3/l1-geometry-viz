/**
 * Animated Contraction Mode Icons
 *
 * Four distinct geometric phenomena visualized as animated mini-icons:
 * - Volume Contraction: shrinking blob
 * - Dimensional Collapse: flattening shape
 * - Topological Fragmentation: breaking apart
 * - Curvature Steepening: edges sharpening
 *
 * Each icon is ~24-32px and animates continuously to convey the dynamic nature.
 */

import { motion } from 'framer-motion'
import type { ContractionMode } from '../../data/synthetic/types'

export interface ContractionIconProps {
  mode: ContractionMode
  size?: number
  isActive?: boolean
  showLabel?: boolean
  className?: string
}

const MODE_CONFIG: Record<
  ContractionMode,
  { label: string; description: string; color: string }
> = {
  volumeContraction: {
    label: 'Volume',
    description: 'System capacity shrinking',
    color: '#f87171', // red-400
  },
  dimensionalCollapse: {
    label: 'Collapse',
    description: 'Degrees of freedom reducing',
    color: '#fb923c', // orange-400
  },
  topologicalFragmentation: {
    label: 'Fragment',
    description: 'Structure breaking apart',
    color: '#a78bfa', // violet-400
  },
  curvatureSteepening: {
    label: 'Steepen',
    description: 'Risk gradients intensifying',
    color: '#fbbf24', // amber-400
  },
}

export function ContractionIcon({
  mode,
  size = 24,
  isActive = true,
  showLabel = false,
  className = '',
}: ContractionIconProps) {
  const config = MODE_CONFIG[mode]

  const IconComponent = {
    volumeContraction: VolumeContractionIcon,
    dimensionalCollapse: DimensionalCollapseIcon,
    topologicalFragmentation: TopologicalFragmentationIcon,
    curvatureSteepening: CurvatureSteepingIcon,
  }[mode]

  return (
    <div
      className={`inline-flex flex-col items-center gap-1 ${className}`}
      title={config.description}
    >
      <div
        className={`
          rounded-lg p-1.5 transition-opacity
          ${isActive ? 'opacity-100' : 'opacity-30'}
        `}
        style={{ backgroundColor: `${config.color}20` }}
      >
        <IconComponent size={size} color={config.color} isActive={isActive} />
      </div>
      {showLabel && (
        <span
          className="text-xs font-medium"
          style={{ color: isActive ? config.color : 'rgba(255,255,255,0.3)' }}
        >
          {config.label}
        </span>
      )}
    </div>
  )
}

/**
 * Volume Contraction - pulsing shrinking blob
 */
function VolumeContractionIcon({
  size,
  color,
  isActive,
}: {
  size: number
  color: string
  isActive: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <motion.circle
        cx={12}
        cy={12}
        r={8}
        fill={color}
        opacity={0.3}
        animate={
          isActive
            ? {
                r: [8, 6, 8],
                opacity: [0.3, 0.5, 0.3],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.circle
        cx={12}
        cy={12}
        r={5}
        fill={color}
        opacity={0.6}
        animate={
          isActive
            ? {
                r: [5, 3, 5],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Inward arrows */}
      <motion.g
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        opacity={0.8}
        animate={
          isActive
            ? {
                opacity: [0.8, 0.4, 0.8],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M4 12 L7 12 M7 10 L7 14" />
        <path d="M20 12 L17 12 M17 10 L17 14" />
        <path d="M12 4 L12 7 M10 7 L14 7" />
        <path d="M12 20 L12 17 M10 17 L14 17" />
      </motion.g>
    </svg>
  )
}

/**
 * Dimensional Collapse - flattening rectangle
 */
function DimensionalCollapseIcon({
  size,
  color,
  isActive,
}: {
  size: number
  color: string
  isActive: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {/* 3D-ish box collapsing to 2D */}
      <motion.rect
        x={4}
        y={6}
        width={16}
        height={12}
        rx={2}
        fill={color}
        opacity={0.3}
        animate={
          isActive
            ? {
                height: [12, 4, 12],
                y: [6, 10, 6],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.rect
        x={6}
        y={8}
        width={12}
        height={8}
        rx={1}
        fill={color}
        opacity={0.6}
        animate={
          isActive
            ? {
                height: [8, 2, 8],
                y: [8, 11, 8],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Vertical compression arrows */}
      <motion.g
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        opacity={0.8}
        animate={
          isActive
            ? {
                opacity: [0.8, 0.4, 0.8],
              }
            : {}
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M12 2 L12 5 M10 4 L12 2 L14 4" />
        <path d="M12 22 L12 19 M10 20 L12 22 L14 20" />
      </motion.g>
    </svg>
  )
}

/**
 * Topological Fragmentation - breaking apart pieces
 */
function TopologicalFragmentationIcon({
  size,
  color,
  isActive,
}: {
  size: number
  color: string
  isActive: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {/* Central piece */}
      <motion.rect
        x={9}
        y={9}
        width={6}
        height={6}
        rx={1}
        fill={color}
        opacity={0.6}
      />
      {/* Fragment pieces flying outward */}
      <motion.rect
        x={3}
        y={3}
        width={4}
        height={4}
        rx={1}
        fill={color}
        opacity={0.5}
        animate={
          isActive
            ? {
                x: [6, 2, 6],
                y: [6, 2, 6],
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.rect
        x={17}
        y={3}
        width={4}
        height={4}
        rx={1}
        fill={color}
        opacity={0.5}
        animate={
          isActive
            ? {
                x: [14, 18, 14],
                y: [6, 2, 6],
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
      <motion.rect
        x={3}
        y={17}
        width={4}
        height={4}
        rx={1}
        fill={color}
        opacity={0.5}
        animate={
          isActive
            ? {
                x: [6, 2, 6],
                y: [14, 18, 14],
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.rect
        x={17}
        y={17}
        width={4}
        height={4}
        rx={1}
        fill={color}
        opacity={0.5}
        animate={
          isActive
            ? {
                x: [14, 18, 14],
                y: [14, 18, 14],
                opacity: [0.3, 0.6, 0.3],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5,
        }}
      />
      {/* Crack lines */}
      <motion.g
        stroke={color}
        strokeWidth={1}
        opacity={0.4}
        animate={
          isActive
            ? {
                opacity: [0.2, 0.5, 0.2],
              }
            : {}
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <line x1={9} y1={9} x2={6} y2={6} />
        <line x1={15} y1={9} x2={18} y2={6} />
        <line x1={9} y1={15} x2={6} y2={18} />
        <line x1={15} y1={15} x2={18} y2={18} />
      </motion.g>
    </svg>
  )
}

/**
 * Curvature Steepening - edges getting sharper
 */
function CurvatureSteepingIcon({
  size,
  color,
  isActive,
}: {
  size: number
  color: string
  isActive: boolean
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      {/* Morphing curve that gets steeper */}
      <motion.path
        d="M 4 18 Q 12 18 12 12 Q 12 6 20 6"
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={0.6}
        animate={
          isActive
            ? {
                d: [
                  'M 4 18 Q 12 18 12 12 Q 12 6 20 6',
                  'M 4 18 Q 8 18 12 12 Q 16 6 20 6',
                  'M 4 18 Q 12 18 12 12 Q 12 6 20 6',
                ],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Gradient indicator showing steepness */}
      <motion.circle
        cx={12}
        cy={12}
        r={3}
        fill={color}
        opacity={0.4}
        animate={
          isActive
            ? {
                r: [3, 4, 3],
                opacity: [0.4, 0.7, 0.4],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      {/* Steepness arrows */}
      <motion.g
        stroke={color}
        strokeWidth={1.5}
        fill="none"
        opacity={0.5}
        animate={
          isActive
            ? {
                opacity: [0.3, 0.7, 0.3],
              }
            : {}
        }
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <path d="M6 16 L4 18 L6 20" />
        <path d="M18 4 L20 6 L18 8" />
      </motion.g>
    </svg>
  )
}

/**
 * Grid of all contraction mode icons
 */
export function ContractionIconGrid({
  activeModes,
  size = 24,
  showLabels = true,
  className = '',
}: {
  activeModes: ContractionMode[]
  size?: number
  showLabels?: boolean
  className?: string
}) {
  const allModes: ContractionMode[] = [
    'volumeContraction',
    'dimensionalCollapse',
    'topologicalFragmentation',
    'curvatureSteepening',
  ]

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {allModes.map((mode) => (
        <ContractionIcon
          key={mode}
          mode={mode}
          size={size}
          isActive={activeModes.includes(mode)}
          showLabel={showLabels}
        />
      ))}
    </div>
  )
}

export default ContractionIcon
