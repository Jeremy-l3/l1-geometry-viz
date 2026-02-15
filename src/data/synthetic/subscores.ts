/**
 * Synthetic subscore data
 *
 * Subscores are domain-specific indicators that feed into invariants.
 * Each subscore tracks a specific relational dynamic.
 */

import type { Invariant } from '../mappings/invariantPentadicMap'

export interface Subscore {
  id: string
  name: string
  /** What this indicator measures */
  measures: string
  /** The relational dynamic it captures (Condition B) */
  relationalDynamic: string
  /** Primary invariant this subscore tracks */
  primaryInvariant: Invariant
  /** Secondary invariants (if any) */
  secondaryInvariants?: Invariant[]
  /** 90-day time series of values */
  timeSeries: number[]
  /** Trajectory classification for this subscore */
  trajectory: 'stable' | 'improving' | 'declining' | 'volatile'
}

export interface SubscoreRegistry {
  [invariant: string]: Subscore[]
}

// Helper to generate synthetic time series
function generateTimeSeries(
  base: number,
  trend: 'stable' | 'up' | 'down' | 'crisis-recovery',
  noise: number = 0.03
): number[] {
  const series: number[] = []

  for (let i = 0; i < 90; i++) {
    let value: number
    const t = i / 89

    switch (trend) {
      case 'stable':
        value = base + (Math.random() - 0.5) * noise * 2
        break
      case 'up':
        value = base + t * 0.2 + (Math.random() - 0.5) * noise * 2
        break
      case 'down':
        value = base - t * 0.25 + (Math.random() - 0.5) * noise * 2
        break
      case 'crisis-recovery':
        if (i < 15) {
          value = base + (Math.random() - 0.5) * noise * 2
        } else if (i === 15) {
          value = base - 0.4
        } else {
          const recovery = 1 - Math.exp(-(i - 15) / 25)
          value = (base - 0.4) + recovery * 0.35 + (Math.random() - 0.5) * noise * 2
        }
        break
    }

    series.push(Math.max(0, Math.min(1, value)))
  }

  return series
}

/**
 * Subscore definitions organized by primary invariant
 */
export const subscoreDefinitions: SubscoreRegistry = {
  redundancy: [
    {
      id: 'liquidity-source-distribution',
      name: 'Liquidity Source Distribution',
      measures: 'Concentration of TVL across independent venues',
      relationalDynamic: 'How liquidity redistribution responds to venue failure (not just how much TVL exists)',
      primaryInvariant: 'redundancy',
      timeSeries: [], // Generated per system
      trajectory: 'stable',
    },
    {
      id: 'validator-node-distribution',
      name: 'Validator Node Distribution',
      measures: 'Geographic + operator diversity of validator set',
      relationalDynamic: 'Consensus resilience under regional disruption (not just node count)',
      primaryInvariant: 'redundancy',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'cross-protocol-fallback',
      name: 'Cross-Protocol Fallback Paths',
      measures: 'Availability of alternative execution routes',
      relationalDynamic: 'Whether the system can reroute function through alternative protocols under stress',
      primaryInvariant: 'redundancy',
      secondaryInvariants: ['connectivityDensity'],
      timeSeries: [],
      trajectory: 'stable',
    },
  ],
  connectivityDensity: [
    {
      id: 'integration-surface-area',
      name: 'Integration Surface Area',
      measures: 'Number and depth of external protocol dependencies',
      relationalDynamic: 'Exposure to cascading failures vs. access to distributed resources',
      primaryInvariant: 'connectivityDensity',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'oracle-dependency-graph',
      name: 'Oracle Dependency Graph',
      measures: 'Structure of price feed dependencies',
      relationalDynamic: 'Propagation pathways for oracle manipulation or failure',
      primaryInvariant: 'connectivityDensity',
      secondaryInvariants: ['dependencyConcentration'],
      timeSeries: [],
      trajectory: 'stable',
    },
  ],
  feedbackLatency: [
    {
      id: 'governance-response-time',
      name: 'Governance Response Time',
      measures: 'Time from proposal to execution for critical updates',
      relationalDynamic: 'Ability to adapt parameters before stress compounds',
      primaryInvariant: 'feedbackLatency',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'liquidation-mechanism-speed',
      name: 'Liquidation Mechanism Speed',
      measures: 'Time to process liquidations under load',
      relationalDynamic: 'Whether bad debt accumulates faster than it can be cleared',
      primaryInvariant: 'feedbackLatency',
      timeSeries: [],
      trajectory: 'stable',
    },
  ],
  regenerationRate: [
    {
      id: 'tvl-recovery-velocity',
      name: 'TVL Recovery Velocity',
      measures: 'Rate of TVL return after withdrawal events',
      relationalDynamic: 'Market confidence recovery dynamics (not just current TVL)',
      primaryInvariant: 'regenerationRate',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'user-retention-post-incident',
      name: 'User Retention Post-Incident',
      measures: 'Active user count trajectory after negative events',
      relationalDynamic: 'Community resilience and trust restoration capacity',
      primaryInvariant: 'regenerationRate',
      timeSeries: [],
      trajectory: 'stable',
    },
  ],
  dependencyConcentration: [
    {
      id: 'single-point-of-failure-index',
      name: 'Single Point of Failure Index',
      measures: 'Percentage of function dependent on top-1 external system',
      relationalDynamic: 'Catastrophic failure exposure from single dependency loss',
      primaryInvariant: 'dependencyConcentration',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'key-person-risk',
      name: 'Key Person Risk',
      measures: 'Concentration of critical permissions/knowledge',
      relationalDynamic: 'Operational continuity under team disruption',
      primaryInvariant: 'dependencyConcentration',
      timeSeries: [],
      trajectory: 'stable',
    },
    {
      id: 'collateral-concentration',
      name: 'Collateral Concentration',
      measures: 'Distribution of collateral across asset types',
      relationalDynamic: 'Exposure to correlated collateral devaluation',
      primaryInvariant: 'dependencyConcentration',
      secondaryInvariants: ['redundancy'],
      timeSeries: [],
      trajectory: 'stable',
    },
  ],
}

/**
 * Generate subscores for System Alpha (Resilient Mesh)
 * Stable, healthy subscores with minor oscillations
 */
export function generateAlphaSubscores(): SubscoreRegistry {
  return {
    redundancy: [
      {
        ...subscoreDefinitions.redundancy[0],
        timeSeries: generateTimeSeries(0.82, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.redundancy[1],
        timeSeries: generateTimeSeries(0.78, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.redundancy[2],
        timeSeries: generateTimeSeries(0.75, 'stable'),
        trajectory: 'stable',
      },
    ],
    connectivityDensity: [
      {
        ...subscoreDefinitions.connectivityDensity[0],
        timeSeries: generateTimeSeries(0.70, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.connectivityDensity[1],
        timeSeries: generateTimeSeries(0.72, 'stable'),
        trajectory: 'stable',
      },
    ],
    feedbackLatency: [
      {
        ...subscoreDefinitions.feedbackLatency[0],
        timeSeries: generateTimeSeries(0.80, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.feedbackLatency[1],
        timeSeries: generateTimeSeries(0.85, 'stable'),
        trajectory: 'stable',
      },
    ],
    regenerationRate: [
      {
        ...subscoreDefinitions.regenerationRate[0],
        timeSeries: generateTimeSeries(0.65, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.regenerationRate[1],
        timeSeries: generateTimeSeries(0.70, 'stable'),
        trajectory: 'stable',
      },
    ],
    dependencyConcentration: [
      {
        ...subscoreDefinitions.dependencyConcentration[0],
        timeSeries: generateTimeSeries(0.25, 'stable'), // Low is good
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[1],
        timeSeries: generateTimeSeries(0.20, 'stable'),
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[2],
        timeSeries: generateTimeSeries(0.30, 'stable'),
        trajectory: 'stable',
      },
    ],
  }
}

/**
 * Generate subscores for System Beta (Brittle Hub)
 * Declining subscores showing drift toward fragility
 */
export function generateBetaSubscores(): SubscoreRegistry {
  return {
    redundancy: [
      {
        ...subscoreDefinitions.redundancy[0],
        timeSeries: generateTimeSeries(0.55, 'down'),
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.redundancy[1],
        timeSeries: generateTimeSeries(0.50, 'down'),
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.redundancy[2],
        timeSeries: generateTimeSeries(0.45, 'down'),
        trajectory: 'declining',
      },
    ],
    connectivityDensity: [
      {
        ...subscoreDefinitions.connectivityDensity[0],
        timeSeries: generateTimeSeries(0.80, 'stable'), // High connectivity (contagion network)
        trajectory: 'stable',
      },
      {
        ...subscoreDefinitions.connectivityDensity[1],
        timeSeries: generateTimeSeries(0.75, 'stable'),
        trajectory: 'stable',
      },
    ],
    feedbackLatency: [
      {
        ...subscoreDefinitions.feedbackLatency[0],
        timeSeries: generateTimeSeries(0.55, 'down'),
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.feedbackLatency[1],
        timeSeries: generateTimeSeries(0.50, 'down'),
        trajectory: 'declining',
      },
    ],
    regenerationRate: [
      {
        ...subscoreDefinitions.regenerationRate[0],
        timeSeries: generateTimeSeries(0.40, 'down'),
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.regenerationRate[1],
        timeSeries: generateTimeSeries(0.35, 'down'),
        trajectory: 'declining',
      },
    ],
    dependencyConcentration: [
      {
        ...subscoreDefinitions.dependencyConcentration[0],
        timeSeries: generateTimeSeries(0.55, 'up'), // Getting worse (higher = bad)
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[1],
        timeSeries: generateTimeSeries(0.50, 'up'),
        trajectory: 'declining',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[2],
        timeSeries: generateTimeSeries(0.60, 'up'),
        trajectory: 'declining',
      },
    ],
  }
}

/**
 * Generate subscores for System Gamma (Post-Crisis Adaptor)
 * Crisis at day 15, then recovery
 */
export function generateGammaSubscores(): SubscoreRegistry {
  return {
    redundancy: [
      {
        ...subscoreDefinitions.redundancy[0],
        timeSeries: generateTimeSeries(0.55, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.redundancy[1],
        timeSeries: generateTimeSeries(0.50, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.redundancy[2],
        timeSeries: generateTimeSeries(0.48, 'crisis-recovery'),
        trajectory: 'improving',
      },
    ],
    connectivityDensity: [
      {
        ...subscoreDefinitions.connectivityDensity[0],
        timeSeries: generateTimeSeries(0.55, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.connectivityDensity[1],
        timeSeries: generateTimeSeries(0.50, 'crisis-recovery'),
        trajectory: 'improving',
      },
    ],
    feedbackLatency: [
      {
        ...subscoreDefinitions.feedbackLatency[0],
        timeSeries: generateTimeSeries(0.50, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.feedbackLatency[1],
        timeSeries: generateTimeSeries(0.55, 'crisis-recovery'),
        trajectory: 'improving',
      },
    ],
    regenerationRate: [
      {
        ...subscoreDefinitions.regenerationRate[0],
        timeSeries: generateTimeSeries(0.70, 'up'), // Activated by crisis
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.regenerationRate[1],
        timeSeries: generateTimeSeries(0.65, 'up'),
        trajectory: 'improving',
      },
    ],
    dependencyConcentration: [
      {
        ...subscoreDefinitions.dependencyConcentration[0],
        timeSeries: generateTimeSeries(0.55, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[1],
        timeSeries: generateTimeSeries(0.50, 'crisis-recovery'),
        trajectory: 'improving',
      },
      {
        ...subscoreDefinitions.dependencyConcentration[2],
        timeSeries: generateTimeSeries(0.52, 'crisis-recovery'),
        trajectory: 'improving',
      },
    ],
  }
}

// Pre-generate subscores for all systems
export const alphaSubscores = generateAlphaSubscores()
export const betaSubscores = generateBetaSubscores()
export const gammaSubscores = generateGammaSubscores()

export const systemSubscores: Record<string, SubscoreRegistry> = {
  alpha: alphaSubscores,
  beta: betaSubscores,
  gamma: gammaSubscores,
}
