/**
 * Invariant → Pentadic Dimension Contribution Strengths
 *
 * Defines how each morphological invariant contributes to each pentadic dimension.
 * Values: 'high' (0.8), 'moderate' (0.5), 'low' (0.2)
 *
 * Derived from Artifact 4 (Derivation Bridge) and Basel II enrichment document.
 */

export type Invariant =
  | 'redundancy'
  | 'connectivityDensity'
  | 'feedbackLatency'
  | 'regenerationRate'
  | 'dependencyConcentration'

export type PentadicDimension =
  | 'uncertainty'
  | 'severity'
  | 'scope'
  | 'correlation'
  | 'containment'

export type ContributionStrength = 'high' | 'moderate' | 'low'

export const contributionValues: Record<ContributionStrength, number> = {
  high: 0.8,
  moderate: 0.5,
  low: 0.2,
}

/**
 * The many-to-many mapping table.
 *
 * Note: Connectivity Density's contribution is *ambivalent* — it can be
 * protective (resilient mesh) or amplifying (contagion network). This is
 * annotated in subscore metadata, not captured in these scalar strengths.
 */
export const invariantPentadicMap: Record<
  Invariant,
  Record<PentadicDimension, ContributionStrength>
> = {
  redundancy: {
    uncertainty: 'moderate',
    severity: 'high',
    scope: 'high',
    correlation: 'low',
    containment: 'high',
  },
  connectivityDensity: {
    uncertainty: 'high',
    severity: 'moderate',
    scope: 'high',
    correlation: 'high',
    containment: 'high',
  },
  feedbackLatency: {
    uncertainty: 'low',
    severity: 'low',
    scope: 'low',
    correlation: 'low',
    containment: 'high',
  },
  regenerationRate: {
    uncertainty: 'low',
    severity: 'moderate',
    scope: 'low',
    correlation: 'low',
    containment: 'high',
  },
  dependencyConcentration: {
    uncertainty: 'high',
    severity: 'high',
    scope: 'moderate',
    correlation: 'high',
    containment: 'high',
  },
}

/**
 * Get numeric contribution strength for an invariant → dimension pair
 */
export function getContribution(
  invariant: Invariant,
  dimension: PentadicDimension
): number {
  return contributionValues[invariantPentadicMap[invariant][dimension]]
}

/**
 * Get all invariant contributions for a given pentadic dimension
 */
export function getInvariantContributions(
  dimension: PentadicDimension
): Record<Invariant, number> {
  const invariants: Invariant[] = [
    'redundancy',
    'connectivityDensity',
    'feedbackLatency',
    'regenerationRate',
    'dependencyConcentration',
  ]

  return Object.fromEntries(
    invariants.map((inv) => [inv, getContribution(inv, dimension)])
  ) as Record<Invariant, number>
}
