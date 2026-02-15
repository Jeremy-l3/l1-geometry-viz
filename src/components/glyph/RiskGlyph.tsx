/**
 * RiskGlyph Component
 *
 * SVG-based visualization of a pentadic risk profile.
 *
 * Visual encoding:
 * - Uncertainty → Horizontal position (handled by parent for comparison views)
 * - Severity → Height
 * - Scope → Width
 * - Correlation → Glow intensity (warm colors, pulsing at high values)
 * - Containment → Fill density/saturation
 */

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { PentadicProfile } from '../../data/synthetic/types'
import type { PentadicDimension } from '../../data/mappings/invariantPentadicMap'
import { computeGlyphGeometry, type GlyphConfig } from '../../lib/glyph-geometry'

export interface DimensionHighlight {
  dimension: PentadicDimension
  strength: number // 0-1
}

export interface RiskGlyphProps {
  /** The pentadic profile to visualize */
  profile: PentadicProfile
  /** Optional configuration overrides */
  config?: Partial<GlyphConfig>
  /** Additional CSS classes */
  className?: string
  /** Whether to show the glow effect */
  showGlow?: boolean
  /** Scale factor (1 = default size) */
  scale?: number
  /** Dimensions to highlight (for cross-highlight on hover) */
  highlights?: DimensionHighlight[]
}

// Highlight colors for each dimension
const HIGHLIGHT_COLORS: Record<PentadicDimension, string> = {
  uncertainty: '#94a3b8',
  severity: '#f87171',
  scope: '#fbbf24',
  correlation: '#fb923c',
  containment: '#34d399',
}

export function RiskGlyph({
  profile,
  config,
  className = '',
  showGlow = true,
  scale = 1,
  highlights = [],
}: RiskGlyphProps) {
  const geometry = useMemo(
    () => computeGlyphGeometry(profile, config),
    [profile, config]
  )

  // Apply scale
  const width = geometry.width * scale
  const height = geometry.height * scale
  const glowBlur = geometry.glowBlur * scale
  const glowSpread = geometry.glowSpread * scale

  // SVG viewBox with padding for glow and highlights
  const basePadding = showGlow ? Math.max(glowBlur + glowSpread, 20) : 10
  const highlightPadding = highlights.length > 0 ? 15 : 0
  const padding = basePadding + highlightPadding
  const viewBoxWidth = width + padding * 2
  const viewBoxHeight = height + padding * 2

  // Unique ID for this glyph's filter (needed for multiple glyphs on page)
  const filterId = useMemo(
    () => `glow-${Math.random().toString(36).substring(2, 9)}`,
    []
  )

  // Get highlight for a dimension
  const getHighlight = (dim: PentadicDimension) =>
    highlights.find((h) => h.dimension === dim)

  const severityHighlight = getHighlight('severity')
  const scopeHighlight = getHighlight('scope')
  const correlationHighlight = getHighlight('correlation')
  const containmentHighlight = getHighlight('containment')
  const uncertaintyHighlight = getHighlight('uncertainty')

  const hasAnyHighlight = highlights.length > 0

  return (
    <svg
      width={viewBoxWidth}
      height={viewBoxHeight}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      className={`${className} ${geometry.shouldPulse && showGlow ? 'animate-glow-pulse' : ''}`}
      style={{
        overflow: 'visible',
      }}
    >
      <defs>
        {/* Glow filter */}
        {showGlow && geometry.glowBlur > 0 && (
          <filter
            id={filterId}
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation={glowBlur / 2}
              result="blur"
            />
            <feColorMatrix
              in="blur"
              type="matrix"
              values={`1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 ${geometry.glowOpacity * 1.5} 0`}
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}

        {/* Gradient for containment fill - creates depth */}
        <linearGradient
          id={`fill-gradient-${filterId}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={geometry.fillColor}
            stopOpacity={geometry.fillOpacity}
          />
          <stop
            offset="50%"
            stopColor={geometry.fillColor}
            stopOpacity={geometry.fillOpacity * 0.8}
          />
          <stop
            offset="100%"
            stopColor={geometry.fillColor}
            stopOpacity={geometry.fillOpacity * 0.6}
          />
        </linearGradient>
      </defs>

      {/* Severity highlight - vertical bars on sides */}
      {severityHighlight && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: severityHighlight.strength }}
          transition={{ duration: 0.2 }}
        >
          <rect
            x={padding - 8}
            y={padding}
            width={4}
            height={height}
            rx={2}
            fill={HIGHLIGHT_COLORS.severity}
            opacity={0.6}
          />
          <rect
            x={padding + width + 4}
            y={padding}
            width={4}
            height={height}
            rx={2}
            fill={HIGHLIGHT_COLORS.severity}
            opacity={0.6}
          />
          {/* Height arrows */}
          <text
            x={padding - 10}
            y={padding + height / 2}
            fontSize={10}
            fill={HIGHLIGHT_COLORS.severity}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ↕
          </text>
        </motion.g>
      )}

      {/* Scope highlight - horizontal bars on top/bottom */}
      {scopeHighlight && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: scopeHighlight.strength }}
          transition={{ duration: 0.2 }}
        >
          <rect
            x={padding}
            y={padding - 8}
            width={width}
            height={4}
            rx={2}
            fill={HIGHLIGHT_COLORS.scope}
            opacity={0.6}
          />
          <rect
            x={padding}
            y={padding + height + 4}
            width={width}
            height={4}
            rx={2}
            fill={HIGHLIGHT_COLORS.scope}
            opacity={0.6}
          />
          {/* Width arrows */}
          <text
            x={padding + width / 2}
            y={padding - 10}
            fontSize={10}
            fill={HIGHLIGHT_COLORS.scope}
            textAnchor="middle"
            dominantBaseline="middle"
          >
            ↔
          </text>
        </motion.g>
      )}

      {/* Correlation highlight - pulsing border effect */}
      {correlationHighlight && (
        <motion.rect
          x={padding - 3}
          y={padding - 3}
          width={width + 6}
          height={height + 6}
          rx={6}
          fill="none"
          stroke={HIGHLIGHT_COLORS.correlation}
          strokeWidth={2}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.4, 0.8, 0.4].map((v) => v * correlationHighlight.strength),
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Outer glow layer (separate for better effect) */}
      {showGlow && geometry.glowBlur > 0 && (
        <rect
          x={padding}
          y={padding}
          width={width}
          height={height}
          rx={4}
          ry={4}
          fill={geometry.glowColor}
          opacity={geometry.glowOpacity * 0.5}
          filter={`blur(${glowBlur}px)`}
          style={{
            filter: `blur(${glowBlur}px)`,
          }}
        />
      )}

      {/* Main glyph body */}
      <rect
        x={padding}
        y={padding}
        width={width}
        height={height}
        rx={4}
        ry={4}
        fill={`url(#fill-gradient-${filterId})`}
        stroke={geometry.glowColor}
        strokeWidth={showGlow ? 1 + geometry.glowOpacity * 2 : 1}
        strokeOpacity={showGlow ? 0.3 + geometry.glowOpacity * 0.5 : 0.2}
        filter={showGlow && geometry.glowBlur > 0 ? `url(#${filterId})` : undefined}
      />

      {/* Containment highlight - inner fill pulse */}
      {containmentHighlight && (
        <motion.rect
          x={padding + 4}
          y={padding + 4}
          width={width - 8}
          height={height - 8}
          rx={2}
          fill={HIGHLIGHT_COLORS.containment}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1].map((v) => v * containmentHighlight.strength),
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}

      {/* Inner highlight (suggests internal structure) */}
      <rect
        x={padding + width * 0.15}
        y={padding + height * 0.1}
        width={width * 0.7}
        height={height * 0.3}
        rx={2}
        ry={2}
        fill="white"
        opacity={geometry.fillOpacity * 0.08}
      />

      {/* Uncertainty highlight - position indicator */}
      {uncertaintyHighlight && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: uncertaintyHighlight.strength }}
          transition={{ duration: 0.2 }}
        >
          <line
            x1={padding + width / 2}
            y1={padding + height + 10}
            x2={padding + width / 2}
            y2={padding + height + 18}
            stroke={HIGHLIGHT_COLORS.uncertainty}
            strokeWidth={2}
          />
          <circle
            cx={padding + width / 2}
            cy={padding + height + 22}
            r={4}
            fill={HIGHLIGHT_COLORS.uncertainty}
            opacity={0.6}
          />
          <text
            x={padding + width / 2}
            y={padding + height + 32}
            fontSize={8}
            fill={HIGHLIGHT_COLORS.uncertainty}
            textAnchor="middle"
          >
            U
          </text>
        </motion.g>
      )}

      {/* Highlight legend when any highlight is active */}
      {hasAnyHighlight && (
        <g transform={`translate(${viewBoxWidth - 10}, 10)`}>
          {highlights.map((h, i) => (
            <motion.circle
              key={h.dimension}
              cx={0}
              cy={i * 10}
              r={3}
              fill={HIGHLIGHT_COLORS[h.dimension]}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.05 }}
            />
          ))}
        </g>
      )}
    </svg>
  )
}

/**
 * Mini version of the glyph for filmstrip timeline
 */
export function MiniGlyph({
  profile,
  size = 24,
  className = '',
}: {
  profile: PentadicProfile
  size?: number
  className?: string
}) {
  return (
    <RiskGlyph
      profile={profile}
      config={{
        maxHeight: size,
        minHeight: size * 0.25,
        maxWidth: size * 0.75,
        minWidth: size * 0.2,
        maxGlowBlur: size * 0.3,
        pulseThreshold: 0.7, // Less sensitive at small size
      }}
      showGlow={true}
      scale={1}
      className={className}
    />
  )
}
