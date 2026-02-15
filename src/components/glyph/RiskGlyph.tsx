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
import type { PentadicProfile } from '../../data/synthetic/types'
import { computeGlyphGeometry, type GlyphConfig } from '../../lib/glyph-geometry'

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
}

export function RiskGlyph({
  profile,
  config,
  className = '',
  showGlow = true,
  scale = 1,
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

  // SVG viewBox with padding for glow
  const padding = showGlow ? Math.max(glowBlur + glowSpread, 20) : 10
  const viewBoxWidth = width + padding * 2
  const viewBoxHeight = height + padding * 2

  // Unique ID for this glyph's filter (needed for multiple glyphs on page)
  const filterId = useMemo(
    () => `glow-${Math.random().toString(36).substring(2, 9)}`,
    []
  )

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
