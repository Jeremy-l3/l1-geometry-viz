/**
 * Synthetic time-series data for the three example systems
 *
 * Each system has 90 days of data following the specifications in the kickoff document.
 */

import type {
  SystemData,
  PentadicProfile,
  InvariantProfile,
  PerturbationEvent,
} from './types'

// Utility functions for data generation
function clamp(value: number, min = 0, max = 1): number {
  return Math.max(min, Math.min(max, value))
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

function addNoise(value: number, magnitude: number): number {
  return clamp(value + (Math.random() - 0.5) * magnitude)
}

// ============================================================================
// SYSTEM α — "Resilient Mesh"
// ============================================================================
// Profile: Low U, Low Severity, Moderate Scope, Low Correlation, High Containment
// Trajectory: Elastic — oscillates around stable configuration after perturbation
// Active contraction modes: None

function generateSystemAlpha(): SystemData {
  const baseProfile: PentadicProfile = {
    u: 0.25,
    severity: 0.20,
    scope: 0.40,
    correlation: 0.15,
    containment: 0.85,
  }

  const baseInvariants: InvariantProfile = {
    redundancy: 0.85,
    connectivityDensity: 0.75,
    feedbackLatency: 0.80, // High = fast response
    regenerationRate: 0.60,
    dependencyConcentration: 0.20, // Low = good
  }

  // Perturbation events at days 12, 28, 45, 67, 82
  const events: PerturbationEvent[] = [
    { day: 12, description: 'Minor liquidity stress', magnitude: 0.3 },
    { day: 28, description: 'Validator rotation event', magnitude: 0.25 },
    { day: 45, description: 'External protocol incident', magnitude: 0.35 },
    { day: 67, description: 'Market volatility spike', magnitude: 0.3 },
    { day: 82, description: 'Network congestion', magnitude: 0.2 },
  ]

  const pentadicSeries: PentadicProfile[] = []
  const invariantSeries: InvariantProfile[] = []

  for (let day = 0; day < 90; day++) {
    // Check if we're in a perturbation recovery window
    let perturbationEffect = 0
    for (const event of events) {
      const daysSince = day - event.day
      if (daysSince >= 0 && daysSince < 5) {
        // Recovery window: spike on day 0, recover over 3-5 days
        const recoveryProgress = daysSince / 4
        const spike = event.magnitude * Math.exp(-recoveryProgress * 2)
        perturbationEffect = Math.max(perturbationEffect, spike)
      }
    }

    // Pentadic values oscillate around baseline with small noise
    const pentadic: PentadicProfile = {
      u: addNoise(baseProfile.u + perturbationEffect * 0.1, 0.02),
      severity: addNoise(baseProfile.severity + perturbationEffect * 0.15, 0.02),
      scope: addNoise(baseProfile.scope + perturbationEffect * 0.1, 0.02),
      correlation: addNoise(baseProfile.correlation + perturbationEffect * 0.05, 0.01),
      containment: addNoise(baseProfile.containment - perturbationEffect * 0.1, 0.02),
    }

    // Invariants stay stable
    const invariants: InvariantProfile = {
      redundancy: addNoise(baseInvariants.redundancy, 0.02),
      connectivityDensity: addNoise(baseInvariants.connectivityDensity, 0.02),
      feedbackLatency: addNoise(baseInvariants.feedbackLatency, 0.02),
      regenerationRate: addNoise(baseInvariants.regenerationRate, 0.02),
      dependencyConcentration: addNoise(baseInvariants.dependencyConcentration, 0.02),
    }

    pentadicSeries.push(pentadic)
    invariantSeries.push(invariants)
  }

  return {
    id: 'alpha',
    name: 'System α',
    descriptor: 'Resilient Mesh',
    trajectoryType: 'Elastic',
    activeContractionModes: [],
    pentadicTimeSeries: pentadicSeries,
    invariantTimeSeries: invariantSeries,
    perturbationEvents: events,
    connectivityStructure: 'resilientMesh',
  }
}

// ============================================================================
// SYSTEM β — "Brittle Hub"
// ============================================================================
// Profile: Moderate→High U, High Severity, High Scope, High Correlation, Low Containment
// Trajectory: Plastic → Degenerative (transition at ~day 55)
// Active contraction modes: Curvature steepening, early dimensional collapse
//
// CRITICAL: This system looks moderate at day 1. The drift must be visible.

function generateSystemBeta(): SystemData {
  // Starting profile (day 1)
  const startProfile: PentadicProfile = {
    u: 0.35,
    severity: 0.40,
    scope: 0.45,
    correlation: 0.45,
    containment: 0.55,
  }

  // Ending profile (day 90)
  const endProfile: PentadicProfile = {
    u: 0.50,
    severity: 0.70,
    scope: 0.65,
    correlation: 0.75,
    containment: 0.30,
  }

  // Starting invariants
  const startInvariants: InvariantProfile = {
    redundancy: 0.50,
    connectivityDensity: 0.80, // High but contagion network
    feedbackLatency: 0.55, // Getting slower
    regenerationRate: 0.40,
    dependencyConcentration: 0.55, // Concentrating
  }

  // Ending invariants
  const endInvariants: InvariantProfile = {
    redundancy: 0.25,
    connectivityDensity: 0.80,
    feedbackLatency: 0.30,
    regenerationRate: 0.20,
    dependencyConcentration: 0.85,
  }

  // Perturbation events - partial recovery each time
  const events: PerturbationEvent[] = [
    { day: 18, description: 'Oracle delay incident', magnitude: 0.35 },
    { day: 38, description: 'Liquidity withdrawal pressure', magnitude: 0.40 },
    { day: 58, description: 'Governance deadlock', magnitude: 0.45 },
    { day: 78, description: 'Cross-protocol contagion', magnitude: 0.50 },
  ]

  const pentadicSeries: PentadicProfile[] = []
  const invariantSeries: InvariantProfile[] = []

  for (let day = 0; day < 90; day++) {
    const t = day / 89 // 0 to 1 over the period

    // Non-linear drift: accelerates after day 55
    const driftT = day < 55 ? t * 0.6 : 0.6 + (t - 55 / 89) * 1.5

    // Check for perturbation effects - recovery is incomplete and gets worse
    let perturbationEffect = 0
    for (const event of events) {
      const daysSince = day - event.day
      if (daysSince >= 0 && daysSince < 12) {
        // Slower, incomplete recovery
        const recoveryRate = day < 55 ? 0.7 : 0.4 // Recovery gets worse after transition
        const recoveryProgress = daysSince / 10
        const residual = 1 - recoveryRate // Permanent damage
        const spike = event.magnitude * (residual + (1 - residual) * Math.exp(-recoveryProgress * 1.5))
        perturbationEffect = Math.max(perturbationEffect, spike)
      }
    }

    // Interpolate with drift + perturbation effects
    const pentadic: PentadicProfile = {
      u: clamp(lerp(startProfile.u, endProfile.u, driftT) + perturbationEffect * 0.1 + (Math.random() - 0.5) * 0.02),
      severity: clamp(lerp(startProfile.severity, endProfile.severity, driftT) + perturbationEffect * 0.2 + (Math.random() - 0.5) * 0.02),
      scope: clamp(lerp(startProfile.scope, endProfile.scope, driftT) + perturbationEffect * 0.15 + (Math.random() - 0.5) * 0.02),
      correlation: clamp(lerp(startProfile.correlation, endProfile.correlation, driftT) + perturbationEffect * 0.1 + (Math.random() - 0.5) * 0.02),
      containment: clamp(lerp(startProfile.containment, endProfile.containment, driftT) - perturbationEffect * 0.15 + (Math.random() - 0.5) * 0.02),
    }

    const invariants: InvariantProfile = {
      redundancy: clamp(lerp(startInvariants.redundancy, endInvariants.redundancy, driftT) + (Math.random() - 0.5) * 0.02),
      connectivityDensity: clamp(startInvariants.connectivityDensity + (Math.random() - 0.5) * 0.02), // Stays high
      feedbackLatency: clamp(lerp(startInvariants.feedbackLatency, endInvariants.feedbackLatency, driftT) + (Math.random() - 0.5) * 0.02),
      regenerationRate: clamp(lerp(startInvariants.regenerationRate, endInvariants.regenerationRate, driftT) + (Math.random() - 0.5) * 0.02),
      dependencyConcentration: clamp(lerp(startInvariants.dependencyConcentration, endInvariants.dependencyConcentration, driftT) + (Math.random() - 0.5) * 0.02),
    }

    pentadicSeries.push(pentadic)
    invariantSeries.push(invariants)
  }

  return {
    id: 'beta',
    name: 'System β',
    descriptor: 'Brittle Hub',
    trajectoryType: 'Degenerative',
    activeContractionModes: ['curvatureSteepening', 'dimensionalCollapse'],
    pentadicTimeSeries: pentadicSeries,
    invariantTimeSeries: invariantSeries,
    perturbationEvents: events,
    connectivityStructure: 'contagionNetwork',
  }
}

// ============================================================================
// SYSTEM γ — "Post-Crisis Adaptor"
// ============================================================================
// Profile: High U, Moderate Severity, Low Scope, Moderate Correlation, Moderate Containment
// Trajectory: Regenerative — recovering from major deformation event
// Active contraction modes: Topological fragmentation (residual, healing)
//
// Major crisis at day 15, steady recovery since

function generateSystemGamma(): SystemData {
  // Pre-crisis baseline (day 1-14)
  const precrisisProfile: PentadicProfile = {
    u: 0.40,
    severity: 0.35,
    scope: 0.35,
    correlation: 0.35,
    containment: 0.65,
  }

  // Crisis peak (day 15)
  const crisisProfile: PentadicProfile = {
    u: 0.75,
    severity: 0.85,
    scope: 0.70,
    correlation: 0.70,
    containment: 0.25,
  }

  // Current/recovered (day 90)
  const recoveredProfile: PentadicProfile = {
    u: 0.55,
    severity: 0.50,
    scope: 0.30,
    correlation: 0.45,
    containment: 0.55,
  }

  // Pre-crisis invariants
  const precrisisInvariants: InvariantProfile = {
    redundancy: 0.55,
    connectivityDensity: 0.60,
    feedbackLatency: 0.50,
    regenerationRate: 0.45,
    dependencyConcentration: 0.50,
  }

  // Crisis invariants
  const crisisInvariants: InvariantProfile = {
    redundancy: 0.20,
    connectivityDensity: 0.30, // Fragmented
    feedbackLatency: 0.25,
    regenerationRate: 0.75, // Activated by crisis!
    dependencyConcentration: 0.70,
  }

  // Recovered invariants
  const recoveredInvariants: InvariantProfile = {
    redundancy: 0.50,
    connectivityDensity: 0.45,
    feedbackLatency: 0.55,
    regenerationRate: 0.75, // Stays high
    dependencyConcentration: 0.50,
  }

  // Events: major crisis + 2 smaller ones (handled increasingly well)
  const events: PerturbationEvent[] = [
    { day: 15, description: 'Major exploit and liquidity drain', magnitude: 0.85 },
    { day: 42, description: 'Secondary market stress', magnitude: 0.35 },
    { day: 68, description: 'Governance challenge', magnitude: 0.25 },
  ]

  const pentadicSeries: PentadicProfile[] = []
  const invariantSeries: InvariantProfile[] = []

  for (let day = 0; day < 90; day++) {
    let pentadic: PentadicProfile
    let invariants: InvariantProfile

    if (day < 15) {
      // Pre-crisis: stable with slight drift toward crisis
      const t = day / 14
      pentadic = {
        u: addNoise(lerp(precrisisProfile.u, precrisisProfile.u + 0.1, t), 0.02),
        severity: addNoise(lerp(precrisisProfile.severity, precrisisProfile.severity + 0.05, t), 0.02),
        scope: addNoise(precrisisProfile.scope, 0.02),
        correlation: addNoise(lerp(precrisisProfile.correlation, precrisisProfile.correlation + 0.1, t), 0.02),
        containment: addNoise(precrisisProfile.containment, 0.02),
      }
      invariants = {
        redundancy: addNoise(precrisisInvariants.redundancy, 0.02),
        connectivityDensity: addNoise(precrisisInvariants.connectivityDensity, 0.02),
        feedbackLatency: addNoise(precrisisInvariants.feedbackLatency, 0.02),
        regenerationRate: addNoise(precrisisInvariants.regenerationRate, 0.02),
        dependencyConcentration: addNoise(precrisisInvariants.dependencyConcentration, 0.02),
      }
    } else if (day === 15) {
      // Crisis peak
      pentadic = { ...crisisProfile }
      invariants = { ...crisisInvariants }
    } else {
      // Recovery phase
      const recoveryDays = day - 15
      const totalRecoveryDays = 89 - 15
      const t = recoveryDays / totalRecoveryDays

      // Check for secondary perturbations - handled better each time
      let perturbationEffect = 0
      for (const event of events.slice(1)) {
        // Skip the major crisis
        const daysSince = day - event.day
        if (daysSince >= 0 && daysSince < 6) {
          // Quick recovery due to high regeneration
          const recoveryProgress = daysSince / 4
          const spike = event.magnitude * Math.exp(-recoveryProgress * 2.5)
          perturbationEffect = Math.max(perturbationEffect, spike)
        }
      }

      // Smooth recovery curve (faster at first, then settling)
      const recoveryT = 1 - Math.exp(-t * 3)

      pentadic = {
        u: clamp(lerp(crisisProfile.u, recoveredProfile.u, recoveryT) + perturbationEffect * 0.1 + (Math.random() - 0.5) * 0.02),
        severity: clamp(lerp(crisisProfile.severity, recoveredProfile.severity, recoveryT) + perturbationEffect * 0.15 + (Math.random() - 0.5) * 0.02),
        scope: clamp(lerp(crisisProfile.scope, recoveredProfile.scope, recoveryT) + perturbationEffect * 0.1 + (Math.random() - 0.5) * 0.02),
        correlation: clamp(lerp(crisisProfile.correlation, recoveredProfile.correlation, recoveryT) + perturbationEffect * 0.05 + (Math.random() - 0.5) * 0.02),
        containment: clamp(lerp(crisisProfile.containment, recoveredProfile.containment, recoveryT) - perturbationEffect * 0.1 + (Math.random() - 0.5) * 0.02),
      }

      invariants = {
        redundancy: clamp(lerp(crisisInvariants.redundancy, recoveredInvariants.redundancy, recoveryT) + (Math.random() - 0.5) * 0.02),
        connectivityDensity: clamp(lerp(crisisInvariants.connectivityDensity, recoveredInvariants.connectivityDensity, recoveryT) + (Math.random() - 0.5) * 0.02),
        feedbackLatency: clamp(lerp(crisisInvariants.feedbackLatency, recoveredInvariants.feedbackLatency, recoveryT) + (Math.random() - 0.5) * 0.02),
        regenerationRate: clamp(recoveredInvariants.regenerationRate + (Math.random() - 0.5) * 0.02), // Stays high
        dependencyConcentration: clamp(lerp(crisisInvariants.dependencyConcentration, recoveredInvariants.dependencyConcentration, recoveryT) + (Math.random() - 0.5) * 0.02),
      }
    }

    pentadicSeries.push(pentadic)
    invariantSeries.push(invariants)
  }

  return {
    id: 'gamma',
    name: 'System γ',
    descriptor: 'Post-Crisis Adaptor',
    trajectoryType: 'Regenerative',
    activeContractionModes: ['topologicalFragmentation'],
    pentadicTimeSeries: pentadicSeries,
    invariantTimeSeries: invariantSeries,
    perturbationEvents: events,
    connectivityStructure: 'restructuring',
  }
}

// Generate and export the systems
// Using seeded random for reproducibility in a real implementation
// For now, generate once at module load

export const systemAlpha = generateSystemAlpha()
export const systemBeta = generateSystemBeta()
export const systemGamma = generateSystemGamma()

export const allSystems: SystemData[] = [systemAlpha, systemBeta, systemGamma]
