# Design Language Reference
## L1 Geometry Visualizer

---

## Core Metaphor: Atmospheric Re-Entry

The glyph's visual language is grounded in the physics of atmospheric re-entry. This is not just an analogy — it's the actual design vocabulary that informs every visual decision.

| Re-Entry Concept | L1 Mapping | Visual Treatment |
|---|---|---|
| The **object** (spacecraft) | The system being assessed | Glyph body (height, width, fill) |
| The **atmosphere** | Perturbation field P | The space the glyph exists within |
| The **glow** (plasma sheath) | Correlation — coupling with environment | Border glow, halo intensity |
| The **heat shield** | Containment — internal absorption capacity | Interior fill density |
| **Thermal stability** | Elastic trajectory | Faint glow, dense fill |
| **Heating up** | Plastic/Degenerative trajectory | Intensifying glow, thinning fill |
| **Regenerating** | Regenerative trajectory | Steady glow, densifying fill |

---

## Color System

### Background
- **Primary:** Near-black with slight blue/purple undertone (`#0a0a12` or similar)
- **Rationale:** Glyphs must read as objects floating in space. Dark background creates depth and makes the glow effect possible.

### Glyph Fill (Containment)
- **Palette:** Cool tones — deep blue-grey, teal, cool indigo
- **High containment:** Dense, saturated fill (`#1e3a5f` → `#2d5a87`)
- **Low containment:** Hollow, desaturated, translucent (`rgba(30, 58, 95, 0.2)`)
- **Rationale:** Interior fill represents structural mass vs. structural emptiness. Cool tones suggest stability, solidity.

### Glow (Correlation)
- **Palette:** Warm tones — amber, orange, approaching red at extremes
- **Low correlation:** Barely visible or absent
- **Moderate correlation:** Warm amber halo (`#d4a574`)
- **High correlation:** Intense orange (`#e07020`) with increased blur radius
- **Extreme correlation:** Approaching combustion — deep orange/red (`#c04020`) with pulse/shimmer
- **Rationale:** Glow represents thermal radiation — friction with the environment made visible. Warm colors signal heat/danger.

### Severity/Scope
- **Encoding:** Geometry only (height/width), not color
- **The shape itself communicates:** Tall glyph = deep potential impact. Wide glyph = broad exposure.

### Uncertainty
- **Encoding:** Horizontal position on bounded axis
- **Left:** Low uncertainty
- **Right:** High uncertainty
- **Axis treatment:** Subtle labeling, not dominant. Position is read relationally.

### Contraction Mode Indicators
- **Style:** Compact animated SVG micro-icons (~20-24px)
- **Volume contraction:** Shrinking blob animation
- **Dimensional collapse:** Flattening shape animation
- **Topological fragmentation:** Splitting shape animation
- **Curvature steepening:** Sharpening edge animation

### Trajectory Classification
- **Elastic:** Steady oscillation pattern, neutral color accent
- **Plastic:** Directional drift pattern, warning yellow accent
- **Degenerative:** Accelerating drift, deepening perturbation responses, danger red accent
- **Regenerative:** Recovering drift, improving responses, positive green accent

---

## Animation Specifications

### Glow Pulse (High Correlation)
- **Trigger:** Correlation > 0.6
- **Behavior:** Subtle breathing pulse, not flashing
- **Cycle:** 2-4 seconds
- **Effect:** Creates feeling of thermal stress without distraction
- **Implementation:** CSS animation on box-shadow/filter or SVG filter opacity

### Playback Mode (Glyph Morphing)
- **Interpolation:** Smooth transitions between time-step states
- **Properties animated:** Height, width, fill density, glow intensity, horizontal position
- **Perturbation events:** Produce visible "jolts" — sudden shape changes followed by recovery pattern
- **Timing:** User-controllable playback speed

### Filmstrip Timeline
- **Each mini-glyph:** True rendering at that timestep (not simplified icon)
- **Visual effect:** Time-lapse of re-entry process
- **Spacing:** Consistent time intervals
- **Hover state:** Enlarged preview of selected timestep

---

## Typography

### Primary Font
- **Family:** System font stack or Inter/IBM Plex Sans
- **Weights:** 400 (body), 500 (labels), 600 (headers)

### Data Labels
- **Size:** 11-12px for inline values
- **Color:** Muted grey on dark background (`#8a8a9a`)

### Trajectory Classification Label
- **Size:** 14-16px
- **Weight:** 600
- **Position:** Prominent, near glyph

### Layer Headers
- **Size:** 18-20px
- **Weight:** 600
- **Style:** All caps for layer identifiers (REDUNDANCY → Containment)

---

## Spacing and Layout

### Glyph Dimensions
- **Base size:** 120-160px height range for "1.0" severity
- **Aspect ratio:** Variable based on severity/scope ratio
- **Minimum size:** 40px height (for filmstrip mini-glyphs)

### Timeline
- **Position:** Below or beside main glyph
- **Height:** 60-80px for filmstrip, 40-60px for sparklines
- **Time labels:** Every 7/30 days depending on range

### Layer Panels
- **Width:** 400-600px for Layer B/C panels
- **Padding:** 24px internal padding
- **Spacing:** 16px between stream rows

---

## Accessibility Considerations

### Color Independence
- Five pentadic dimensions use five distinct visual channels (position, height, width, fill density, glow)
- Not solely reliant on color differentiation

### Trajectory Classification
- Needs redundant encoding beyond color:
  - Icon alongside label
  - Pattern/texture overlay on glyph border
  - Shape of trajectory path in timeline

### Contrast
- Glyph elements must maintain WCAG AA contrast against dark background
- Text labels must be legible at specified sizes

### Animation
- Respect `prefers-reduced-motion` media query
- Provide static alternative for glow pulse
- Playback controls include pause/stop

---

## Implementation Notes

### Recommended Approach
1. **Start with SVG + CSS** for all rendering
2. **Use CSS filters** (`filter: blur()`, `drop-shadow()`) for glow effects
3. **Layer radial gradients** for glow intensity variation
4. **Escalate to Canvas/WebGL** only if glow rendering proves insufficient

### CSS Glow Example
```css
.glyph {
  /* Base shape */
  fill: var(--containment-fill);

  /* Correlation glow */
  filter: drop-shadow(0 0 calc(var(--correlation) * 20px) var(--glow-color));
}

.glyph--high-correlation {
  animation: glow-pulse 3s ease-in-out infinite;
}

@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 15px var(--glow-color)); }
  50% { filter: drop-shadow(0 0 25px var(--glow-color)); }
}
```

### Animation Library
- **Framer Motion** recommended for React integration
- Provides smooth interpolation for glyph morphing
- Handles timeline playback state
