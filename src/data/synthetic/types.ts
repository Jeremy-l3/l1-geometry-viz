/**
 * Type definitions for synthetic system data
 */

export interface PentadicProfile {
  /** Uncertainty - likelihood structure of perturbation events (0-1) */
  u: number
  /** Severity - depth of manifold deformation per event (0-1) */
  severity: number
  /** Scope - breadth of system exposure to deformation (0-1) */
  scope: number
  /** Correlation - co-movement with systemic perturbation field (0-1) */
  correlation: number
  /** Containment - capacity to absorb or recover from disruption (0-1) */
  containment: number
}

export interface InvariantProfile {
  /** Redundancy - alternative pathways/resources (0-1, higher = more redundant) */
  redundancy: number
  /** Connectivity Density - graph density of system connections (0-1) */
  connectivityDensity: number
  /** Feedback Latency - response speed (0-1, higher = faster response) */
  feedbackLatency: number
  /** Regeneration Rate - recovery capacity (0-1, higher = faster recovery) */
  regenerationRate: number
  /** Dependency Concentration - single points of failure (0-1, higher = more concentrated = worse) */
  dependencyConcentration: number
}

export type TrajectoryType = 'Elastic' | 'Plastic' | 'Degenerative' | 'Regenerative'

export type ContractionMode =
  | 'volumeContraction'
  | 'dimensionalCollapse'
  | 'topologicalFragmentation'
  | 'curvatureSteepening'

export interface PerturbationEvent {
  /** Day index (0-89) when the event occurred */
  day: number
  /** Brief description of the event */
  description: string
  /** Magnitude of the perturbation (0-1) */
  magnitude: number
}

export interface SystemData {
  /** System identifier */
  id: string
  /** Human-readable name */
  name: string
  /** Brief descriptor */
  descriptor: string
  /** Current trajectory classification */
  trajectoryType: TrajectoryType
  /** Active contraction modes */
  activeContractionModes: ContractionMode[]
  /** 90-day pentadic time series (index 0 = day 1, index 89 = day 90) */
  pentadicTimeSeries: PentadicProfile[]
  /** 90-day invariant time series */
  invariantTimeSeries: InvariantProfile[]
  /** Recorded perturbation events */
  perturbationEvents: PerturbationEvent[]
  /** Connectivity structure type (for Layer B annotation) */
  connectivityStructure: 'resilientMesh' | 'contagionNetwork' | 'restructuring'
}
