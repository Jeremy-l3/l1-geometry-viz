# L1 Geometry Visualizer

Interactive visualization of the Xerberus Risk Ontology Stack's L1 geometry layer — how subscore measurements compose upward through morphological invariants into a five-dimensional operational risk profile, and how that profile evolves over time.

## What This Is

This is a **sample version** with synthetic data, built to validate the design language before real subscore integration. The visualization demonstrates:

- **Risk has shape, not just magnitude** — two systems with identical scalar scores can have radically different risk topologies
- **Trajectory matters more than snapshot** — a system's directional movement reveals structural health better than any single measurement
- **Honest compression** — every layer transition documents what information is lost

## The Three-Layer Architecture

### Layer A: Risk Shape Profile (Default View)
The pentadic glyph encodes five dimensions using distinct visual channels:
- **Uncertainty** → Horizontal position
- **Severity** → Height
- **Scope** → Width
- **Correlation** → Glow intensity
- **Containment** → Fill density

### Layer B: Invariant Composition
Drill down into any pentadic dimension to see contributions from the five morphological invariants:
- Redundancy
- Connectivity Density
- Feedback Latency
- Regeneration Rate
- Dependency Concentration

### Layer C: Subscore Trace
Drill down into any invariant to see the specific domain subscores that feed it, with full pathway visualization.

## Example Systems

The sample includes three synthetic systems demonstrating different risk profiles:

| System | Profile | Trajectory |
|--------|---------|------------|
| **α — Resilient Mesh** | Compact, dense, faint glow | Elastic |
| **β — Brittle Hub** | Large, hollow, intense glow | Degenerative |
| **γ — Post-Crisis Adaptor** | Tall-narrow, moderate, densifying | Regenerative |

## Project Structure

```
l1-geometry-viz/
├── src/
│   ├── components/
│   │   ├── glyph/              # Risk shape glyph (Layer A core)
│   │   ├── timeline/           # Trajectory timeline
│   │   ├── invariant-streams/  # Layer B: invariant composition
│   │   ├── subscore-trace/     # Layer C: subscore detail panels
│   │   ├── contraction-modes/  # Contraction mode indicators
│   │   └── controls/           # Time range, playback, comparison
│   ├── data/
│   │   ├── synthetic/          # Generated time-series data
│   │   └── mappings/           # Invariant → pentadic mapping tables
│   ├── lib/
│   │   ├── trajectory.ts       # Trajectory classification logic
│   │   └── glyph-geometry.ts   # Pentadic values → glyph computation
│   └── app/                    # Page layout, routing
├── docs/
│   ├── PRD.md                  # Full product requirements
│   └── design-language.md      # Visual design reference
├── risk-ontology-stack/        # Reference documents (not modified)
└── README.md
```

## Tech Stack

- **React + TypeScript**
- **SVG + CSS** for glyph rendering and glow effects
- **Framer Motion** for animations
- **Tailwind CSS** for layout

## Documentation

- [PRD](docs/PRD.md) — Full product requirements and specifications
- [Design Language](docs/design-language.md) — Visual design reference, color system, animation specs

## Reference Material

The `risk-ontology-stack/` folder contains the source documents defining all concepts the visualization represents:
- Artifact 0-5: The complete Risk Ontology Stack
- Basel II Enrichment: The pentadic decomposition framework

## Status

**Sample version in development** — synthetic data, no live integrations.
