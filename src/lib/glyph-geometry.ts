/**
 * Glyph Geometry Computation
 *
 * Converts pentadic profile values (0-1) into visual glyph properties.
 *
 * Encoding:
 * - Uncertainty (U) → Horizontal position
 * - Severity → Height
 * - Scope → Width
 * - Correlation → Glow intensity
 * - Containment → Fill density/opacity
 */

import type { PentadicProfile } from '../data/synthetic/types'

export interface GlyphGeometry {
  /** X position (0-1 range, for positioning within container) */
  xPosition: number

  /** Height in pixels */
  height: number

  /** Width in pixels */
  width: number

  /** Fill opacity (0-1) */
  fillOpacity: number

  /** Fill color (CSS color string) */
  fillColor: string

  /** Glow blur radius in pixels */
  glowBlur: number

  /** Glow spread radius in pixels */
  glowSpread: number

  /** Glow opacity (0-1) */
  glowOpacity: number

  /** Glow color (CSS color string) */
  glowColor: string

  /** Whether to animate glow (high correlation) */
  shouldPulse: boolean
}

export interface GlyphConfig {
  /** Base height at severity = 1.0 */
  maxHeight: number
  /** Minimum height at severity = 0.0 */
  minHeight: number
  /** Base width at scope = 1.0 */
  maxWidth: number
  /** Minimum width at scope = 0.0 */
  minWidth: number
  /** Maximum glow blur at correlation = 1.0 */
  maxGlowBlur: number
  /** Correlation threshold for pulse animation */
  pulseThreshold: number
}

const defaultConfig: GlyphConfig = {
  maxHeight: 160,
  minHeight: 40,
  maxWidth: 120,
  minWidth: 30,
  maxGlowBlur: 30,
  pulseThreshold: 0.6,
}

/**
 * Compute glyph visual properties from a pentadic profile
 */
export function computeGlyphGeometry(
  profile: PentadicProfile,
  config: Partial<GlyphConfig> = {}
): GlyphGeometry {
  const cfg = { ...defaultConfig, ...config }

  // Uncertainty → horizontal position (0 = left, 1 = right)
  const xPosition = profile.u

  // Severity → height (linear scaling)
  const height = cfg.minHeight + profile.severity * (cfg.maxHeight - cfg.minHeight)

  // Scope → width (linear scaling)
  const width = cfg.minWidth + profile.scope * (cfg.maxWidth - cfg.minWidth)

  // Containment → fill density
  // High containment = dense, saturated fill
  // Low containment = hollow, translucent fill
  const fillOpacity = 0.2 + profile.containment * 0.7 // Range: 0.2 - 0.9
  const fillColor = interpolateContainmentColor(profile.containment)

  // Correlation → glow intensity
  const glowBlur = profile.correlation * cfg.maxGlowBlur
  const glowSpread = profile.correlation * 10
  const glowOpacity = profile.correlation * 0.8
  const glowColor = interpolateGlowColor(profile.correlation)

  // Pulse animation for high correlation
  const shouldPulse = profile.correlation >= cfg.pulseThreshold

  return {
    xPosition,
    height,
    width,
    fillOpacity,
    fillColor,
    glowBlur,
    glowSpread,
    glowOpacity,
    glowColor,
    shouldPulse,
  }
}

/**
 * Interpolate containment fill color
 * High containment: saturated deep blue-teal
 * Low containment: desaturated, nearly transparent
 */
function interpolateContainmentColor(containment: number): string {
  // From void-like (#0f1f35) to rich teal-blue (#2d5a87)
  const r = Math.round(15 + containment * (45 - 15))
  const g = Math.round(31 + containment * (90 - 31))
  const b = Math.round(53 + containment * (135 - 53))
  return `rgb(${r}, ${g}, ${b})`
}

/**
 * Interpolate glow color based on correlation
 * Low: barely visible amber
 * Moderate: warm orange
 * High: intense orange-red (approaching combustion)
 */
function interpolateGlowColor(correlation: number): string {
  if (correlation < 0.3) {
    // Low: muted amber
    return `rgba(212, 165, 116, ${correlation * 2})`
  } else if (correlation < 0.7) {
    // Moderate: warm orange
    const t = (correlation - 0.3) / 0.4
    const r = Math.round(212 + t * (224 - 212))
    const g = Math.round(165 - t * (165 - 112))
    const b = Math.round(116 - t * (116 - 32))
    return `rgb(${r}, ${g}, ${b})`
  } else {
    // High: intense orange approaching red
    const t = (correlation - 0.7) / 0.3
    const r = Math.round(224 - t * (224 - 192))
    const g = Math.round(112 - t * (112 - 64))
    const b = Math.round(32)
    return `rgb(${r}, ${g}, ${b})`
  }
}

/**
 * Get CSS box-shadow string for the glow effect
 */
export function getGlowBoxShadow(geometry: GlyphGeometry): string {
  if (geometry.glowBlur < 1) {
    return 'none'
  }

  return `0 0 ${geometry.glowBlur}px ${geometry.glowSpread}px ${geometry.glowColor}`
}

/**
 * Get CSS filter string for SVG glow effect
 */
export function getGlowFilter(geometry: GlyphGeometry): string {
  if (geometry.glowBlur < 1) {
    return 'none'
  }

  return `drop-shadow(0 0 ${geometry.glowBlur}px ${geometry.glowColor})`
}

/**
 * Compute the visual "area" of the glyph (severity × scope)
 * Useful for comparing risk footprints
 */
export function computeGlyphArea(profile: PentadicProfile): number {
  return profile.severity * profile.scope
}

/**
 * Classify the glyph shape based on aspect ratio
 */
export type GlyphShape = 'tall-narrow' | 'short-wide' | 'square' | 'compact' | 'large'

export function classifyGlyphShape(profile: PentadicProfile): GlyphShape {
  const aspectRatio = profile.severity / profile.scope
  const area = computeGlyphArea(profile)

  if (area < 0.15) {
    return 'compact'
  } else if (area > 0.5) {
    return 'large'
  } else if (aspectRatio > 1.5) {
    return 'tall-narrow'
  } else if (aspectRatio < 0.67) {
    return 'short-wide'
  } else {
    return 'square'
  }
}
