/**
 * Contextual Explainer Component
 *
 * "What am I looking at?" - Situates each view within the L0-L4 ontology stack.
 * Provides context-sensitive explanations based on current drill-down level.
 */

import { useState } from 'react'

export type ExplainerContext =
  | 'glyph'        // Layer A: Risk shape profile
  | 'invariant'    // Layer B: Invariant composition
  | 'subscore'     // Layer C: Subscore trace

export interface StackExplainerProps {
  /** Current context/drill-down level */
  context: ExplainerContext
  /** Whether the explainer panel is expanded */
  expanded?: boolean
  /** Callback when expanded state changes */
  onExpandedChange?: (expanded: boolean) => void
  /** Additional CSS classes */
  className?: string
}

const LAYER_INFO = {
  glyph: {
    layer: 'Layer A',
    title: 'Risk Shape Profile',
    what: 'The pentadic profile — five structurally independent dimensions that preserve L1 geometric information.',
    shows: [
      'Uncertainty (U): Likelihood structure of perturbation events',
      'Severity: Depth of manifold deformation per event',
      'Scope: Breadth of system exposure to deformation',
      'Correlation: Co-movement with systemic perturbation field',
      'Containment: Capacity to absorb or recover from disruption',
    ],
    compresses: 'Full trajectory information, response mode specifics, and invariant interaction effects are collapsed into five scalar dimensions.',
    clickTo: 'Click any dimension of the glyph to see which invariants contribute to that dimension.',
  },
  invariant: {
    layer: 'Layer B',
    title: 'Invariant Composition',
    what: 'The five morphological invariants that determine the pentadic profile. Each invariant measures a structural property of the system.',
    shows: [
      'Redundancy: Alternative pathways and resources',
      'Connectivity Density: Graph density of system connections',
      'Feedback Latency: Response speed to perturbations',
      'Regeneration Rate: Recovery capacity after damage',
      'Dependency Concentration: Single points of failure',
    ],
    compresses: 'The many-to-many mapping means each invariant contributes to multiple pentadic dimensions at different strengths. The composition within each dimension is what this view reveals.',
    clickTo: 'Click any invariant to see the domain-specific subscores that feed into it.',
  },
  subscore: {
    layer: 'Layer C',
    title: 'Subscore Trace',
    what: 'Domain-specific indicators that track concrete, measurable properties of the system. This is where the abstract geometry connects to observable reality.',
    shows: [
      'What each indicator measures (the domain-specific metric)',
      'The relational dynamic it captures (Condition B)',
      'Which invariants it feeds (Condition A)',
      'The full pentadic pathway (Condition C)',
    ],
    compresses: 'This is the most detailed view available. The raw data feeding these subscores is external to this visualization.',
    clickTo: 'Hover over a subscore to see its contribution pathways highlighted across the pentadic profile.',
  },
}

const STACK_OVERVIEW = {
  l0: {
    name: 'L0: Ontological Grammar',
    description: 'Defines what kinds of objects exist in the risk universe and how they can relate.',
  },
  l1: {
    name: 'L1: Geometric Core',
    description: 'The reachable state manifold M(t) — a high-dimensional object encoding all structurally accessible states.',
  },
  l2: {
    name: 'L2: Operational Surface',
    description: 'The pentadic projection — five dimensions that preserve L1 geometry while being human-parseable.',
  },
  l3: {
    name: 'L3: Methodological Protocol',
    description: 'How measurements are taken — standardized methods for deriving invariants from system observables.',
  },
  l4: {
    name: 'L4: Subscore Registry',
    description: 'Domain-specific indicators mapped to invariants. The bridge from theory to measurement.',
  },
}

export function StackExplainer({
  context,
  expanded: controlledExpanded,
  onExpandedChange,
  className = '',
}: StackExplainerProps) {
  const [internalExpanded, setInternalExpanded] = useState(false)
  const expanded = controlledExpanded ?? internalExpanded
  const setExpanded = onExpandedChange ?? setInternalExpanded

  const info = LAYER_INFO[context]

  return (
    <div className={`bg-void-light rounded-lg overflow-hidden ${className}`}>
      {/* Header - always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-white/30 text-lg">?</span>
          <div className="text-left">
            <div className="text-white/60 text-sm">What am I looking at?</div>
            <div className="text-white/40 text-xs">
              {info.layer}: {info.title}
            </div>
          </div>
        </div>
        <span className="text-white/30 text-sm">{expanded ? '▲' : '▼'}</span>
      </button>

      {/* Expandable content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4">
          {/* Current context explanation */}
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="text-white/70 text-sm mb-2">{info.what}</div>
            <div className="text-white/40 text-xs uppercase tracking-wide mb-1">
              This view shows:
            </div>
            <ul className="space-y-1">
              {info.shows.map((item, i) => (
                <li key={i} className="text-white/50 text-xs flex gap-2">
                  <span className="text-white/30">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What's compressed */}
          <div className="p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
            <div className="text-amber-400/80 text-xs uppercase tracking-wide mb-1">
              Information Loss Warning
            </div>
            <div className="text-white/50 text-xs">{info.compresses}</div>
          </div>

          {/* Navigation hint */}
          <div className="text-white/40 text-xs">
            <span className="text-white/50">↓</span> {info.clickTo}
          </div>

          {/* Full stack context */}
          <div className="pt-3 border-t border-white/10">
            <div className="text-white/40 text-xs uppercase tracking-wide mb-2">
              Position in the Risk Ontology Stack
            </div>
            <div className="space-y-2">
              {Object.entries(STACK_OVERVIEW).map(([key, layer]) => {
                const isActive =
                  (key === 'l2' && context === 'glyph') ||
                  (key === 'l1' && context === 'invariant') ||
                  (key === 'l4' && context === 'subscore')

                return (
                  <div
                    key={key}
                    className={`
                      p-2 rounded text-xs
                      ${isActive ? 'bg-white/10 border border-white/20' : 'bg-white/5'}
                    `}
                  >
                    <div
                      className={`font-medium ${isActive ? 'text-white/80' : 'text-white/50'}`}
                    >
                      {layer.name}
                      {isActive && <span className="text-amber-400 ml-2">← You are here</span>}
                    </div>
                    <div className="text-white/40 mt-0.5">{layer.description}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Compact inline explainer for tooltips
 */
export function InlineExplainer({
  term,
  explanation,
  className = '',
}: {
  term: string
  explanation: string
  className?: string
}) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <span
      className={`relative inline-flex items-center gap-1 ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="border-b border-dotted border-white/30 cursor-help">
        {term}
      </span>
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-void-light border border-white/10 rounded-lg shadow-lg z-50 w-64">
          <div className="text-white/70 text-xs">{explanation}</div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-void-light" />
        </div>
      )}
    </span>
  )
}

/**
 * Compression warning badge
 */
export function CompressionBadge({
  message,
  className = '',
}: {
  message: string
  className?: string
}) {
  return (
    <div
      className={`
        inline-flex items-center gap-1.5 px-2 py-1 rounded
        bg-amber-500/10 border border-amber-500/20 text-amber-400/80 text-xs
        ${className}
      `}
    >
      <span>⚠</span>
      <span>{message}</span>
    </div>
  )
}

export default StackExplainer
