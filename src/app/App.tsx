import { useState, useCallback } from 'react'
import { RiskGlyph } from '../components/glyph/RiskGlyph'
import { Timeline, type TimelineMode } from '../components/timeline'
import { PlaybackControls } from '../components/playback'
import { TrajectoryBadge, TrajectoryPanel } from '../components/trajectory'
import { InvariantPanel } from '../components/drilldown'
import { SubscorePanel } from '../components/drilldown'
import { SnapshotComparison, ComparisonSelector } from '../components/comparison'
import { StackExplainer, type ExplainerContext } from '../components/explainer'
import {
  systemAlpha,
  systemBeta,
  systemGamma,
} from '../data/synthetic/systems'
import { systemSubscores } from '../data/synthetic/subscores'
import type { PentadicProfile, SystemData } from '../data/synthetic/types'
import type { PentadicDimension, Invariant } from '../data/mappings/invariantPentadicMap'

const systems: SystemData[] = [systemAlpha, systemBeta, systemGamma]

type ViewMode = 'standard' | 'drilldown' | 'comparison'

function App() {
  // Core state
  const [selectedSystemId, setSelectedSystemId] = useState<string>('alpha')
  const [currentDay, setCurrentDay] = useState(89)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelineMode, setTimelineMode] = useState<TimelineMode>('sparklines')

  // View mode state
  const [viewMode, setViewMode] = useState<ViewMode>('standard')

  // Drill-down state
  const [selectedDimension, setSelectedDimension] = useState<PentadicDimension | null>(null)
  const [selectedInvariant, setSelectedInvariant] = useState<Invariant | null>(null)

  // Comparison state
  const [comparisonDayA, setComparisonDayA] = useState(0)
  const [comparisonDayB, setComparisonDayB] = useState(89)

  // Derived state
  const selectedSystem = systems.find((s) => s.id === selectedSystemId) ?? systemAlpha
  const currentProfile = selectedSystem.pentadicTimeSeries[currentDay]
  const currentSubscores = systemSubscores[selectedSystemId]

  // Explainer context based on drill-down level
  const explainerContext: ExplainerContext =
    selectedInvariant ? 'subscore' : selectedDimension ? 'invariant' : 'glyph'

  // Handlers
  const handleDayChange = useCallback((day: number) => {
    setCurrentDay(day)
  }, [])

  const handleSystemChange = useCallback((id: string) => {
    setSelectedSystemId(id)
    setCurrentDay(89)
    setIsPlaying(false)
    // Reset drill-down when changing systems
    setSelectedDimension(null)
    setSelectedInvariant(null)
  }, [])

  const handleDimensionClick = useCallback((dimension: PentadicDimension) => {
    setViewMode('drilldown')
    setSelectedDimension(dimension)
    setSelectedInvariant(null)
  }, [])

  const handleInvariantSelect = useCallback((invariant: Invariant) => {
    setSelectedInvariant(invariant)
  }, [])

  const handleBackToGlyph = useCallback(() => {
    setSelectedDimension(null)
    setSelectedInvariant(null)
    setViewMode('standard')
  }, [])

  const handleBackToInvariants = useCallback(() => {
    setSelectedInvariant(null)
  }, [])

  return (
    <div className="min-h-screen bg-void p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold text-white/90 mb-2">
          L1 Geometry Visualizer
        </h1>
        <p className="text-white/50 text-sm">
          Phase 3: Drill-Down Layers & Snapshot Comparison
        </p>
      </header>

      <main className="max-w-7xl">
        {/* Top controls: System selector + View mode */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* System selector */}
          <div className="flex gap-2">
            {systems.map((system) => (
              <button
                key={system.id}
                onClick={() => handleSystemChange(system.id)}
                className={`
                  px-4 py-2 rounded-lg transition-all text-sm font-medium
                  ${selectedSystemId === system.id
                    ? 'bg-white/10 text-white'
                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
                  }
                `}
              >
                <span className="mr-2">
                  {system.id === 'alpha' ? 'α' : system.id === 'beta' ? 'β' : 'γ'}
                </span>
                {system.descriptor}
              </button>
            ))}
          </div>

          {/* View mode toggle */}
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            <button
              onClick={() => {
                setViewMode('standard')
                setSelectedDimension(null)
                setSelectedInvariant(null)
              }}
              className={`px-3 py-1.5 text-xs rounded transition-all ${
                viewMode === 'standard' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setViewMode('drilldown')}
              className={`px-3 py-1.5 text-xs rounded transition-all ${
                viewMode === 'drilldown' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Drill-Down
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-3 py-1.5 text-xs rounded transition-all ${
                viewMode === 'comparison' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Compare
            </button>
          </div>
        </div>

        {/* Main content - varies by view mode */}
        {viewMode === 'comparison' ? (
          <ComparisonView
            system={selectedSystem}
            dayA={comparisonDayA}
            dayB={comparisonDayB}
            onDayAChange={setComparisonDayA}
            onDayBChange={setComparisonDayB}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column: Glyph + Context */}
            <div className="lg:col-span-1 space-y-4">
              {/* Interactive glyph */}
              <InteractiveGlyphCard
                system={selectedSystem}
                profile={currentProfile}
                selectedDimension={selectedDimension}
                onDimensionClick={handleDimensionClick}
              />

              {/* Trajectory panel */}
              <TrajectoryPanel
                trajectoryType={selectedSystem.trajectoryType}
                contractionModes={selectedSystem.activeContractionModes}
              />

              {/* Profile values */}
              <ProfileDisplay profile={currentProfile} day={currentDay} />

              {/* Contextual explainer */}
              <StackExplainer context={explainerContext} />
            </div>

            {/* Middle/Right columns: Timeline + Drill-down */}
            <div className="lg:col-span-2 space-y-4">
              {/* Timeline controls */}
              <div className="flex items-center justify-between">
                <h2 className="text-white/70 font-medium">90-Day Trajectory</h2>
                <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setTimelineMode('sparklines')}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      timelineMode === 'sparklines' ? 'bg-white/10 text-white' : 'text-white/50'
                    }`}
                  >
                    Sparklines
                  </button>
                  <button
                    onClick={() => setTimelineMode('filmstrip')}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      timelineMode === 'filmstrip' ? 'bg-white/10 text-white' : 'text-white/50'
                    }`}
                  >
                    Filmstrip
                  </button>
                </div>
              </div>

              {/* Timeline */}
              <Timeline
                timeSeries={selectedSystem.pentadicTimeSeries}
                events={selectedSystem.perturbationEvents}
                mode={timelineMode}
                selectedDay={currentDay}
                onDaySelect={handleDayChange}
                height={timelineMode === 'sparklines' ? 160 : 100}
              />

              {/* Playback controls */}
              <PlaybackControls
                totalDays={90}
                currentDay={currentDay}
                onDayChange={handleDayChange}
                isPlaying={isPlaying}
                onPlayStateChange={setIsPlaying}
              />

              {/* Drill-down panels */}
              {viewMode === 'drilldown' && (
                <DrillDownPanel
                  system={selectedSystem}
                  subscores={currentSubscores}
                  currentDay={currentDay}
                  selectedDimension={selectedDimension}
                  selectedInvariant={selectedInvariant}
                  onInvariantSelect={handleInvariantSelect}
                  onBackToGlyph={handleBackToGlyph}
                  onBackToInvariants={handleBackToInvariants}
                />
              )}

              {/* Events panel (only in standard mode) */}
              {viewMode === 'standard' && (
                <EventsPanel
                  events={selectedSystem.perturbationEvents}
                  currentDay={currentDay}
                />
              )}
            </div>
          </div>
        )}

        {/* System comparison footer (always visible in standard/drilldown) */}
        {viewMode !== 'comparison' && (
          <section className="mt-8 pt-6 border-t border-white/10">
            <h2 className="text-white/70 font-medium mb-4">
              All Systems — Day {currentDay + 1}
            </h2>
            <div className="flex flex-wrap gap-6 items-end">
              {systems.map((system) => {
                const profile = system.pentadicTimeSeries[currentDay]
                const isSelected = system.id === selectedSystemId
                return (
                  <button
                    key={system.id}
                    onClick={() => handleSystemChange(system.id)}
                    className={`
                      flex flex-col items-center p-3 rounded-lg transition-all
                      ${isSelected ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100'}
                    `}
                  >
                    <RiskGlyph profile={profile} scale={0.6} className="mb-2" />
                    <div className="text-center">
                      <div className="text-white/80 font-medium text-sm">
                        {system.id === 'alpha' ? 'α' : system.id === 'beta' ? 'β' : 'γ'}
                      </div>
                      <TrajectoryBadge trajectoryType={system.trajectoryType} size="sm" />
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

/**
 * Interactive glyph card with clickable dimension regions
 */
function InteractiveGlyphCard({
  system,
  profile,
  selectedDimension,
  onDimensionClick,
}: {
  system: SystemData
  profile: PentadicProfile
  selectedDimension: PentadicDimension | null
  onDimensionClick: (dim: PentadicDimension) => void
}) {
  const dimensions: { key: PentadicDimension; label: string; color: string }[] = [
    { key: 'uncertainty', label: 'U', color: '#94a3b8' },
    { key: 'severity', label: 'Sev', color: '#f87171' },
    { key: 'scope', label: 'Sco', color: '#fbbf24' },
    { key: 'correlation', label: 'Cor', color: '#fb923c' },
    { key: 'containment', label: 'K', color: '#34d399' },
  ]

  return (
    <div className="bg-void-light rounded-lg p-6">
      <div className="flex flex-col items-center">
        <RiskGlyph profile={profile} className="mb-4" />
        <div className="text-center mb-4">
          <div className="text-white/80 font-medium text-lg">
            System {system.id === 'alpha' ? 'α' : system.id === 'beta' ? 'β' : 'γ'}
          </div>
          <div className="text-white/50 text-sm">{system.descriptor}</div>
        </div>

        {/* Clickable dimension chips */}
        <div className="flex flex-wrap justify-center gap-2">
          {dimensions.map((dim) => (
            <button
              key={dim.key}
              onClick={() => onDimensionClick(dim.key)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${selectedDimension === dim.key
                  ? 'ring-2 ring-white/30'
                  : 'hover:bg-white/10'
                }
              `}
              style={{
                backgroundColor: `${dim.color}20`,
                color: dim.color,
              }}
            >
              {dim.label}
            </button>
          ))}
        </div>
        <p className="text-white/30 text-xs mt-2">Click dimension to drill down</p>
      </div>
    </div>
  )
}

/**
 * Drill-down panel showing Layer B and/or Layer C
 */
function DrillDownPanel({
  system,
  subscores,
  currentDay,
  selectedDimension,
  selectedInvariant,
  onInvariantSelect,
  onBackToGlyph,
  onBackToInvariants,
}: {
  system: SystemData
  subscores: typeof systemSubscores['alpha']
  currentDay: number
  selectedDimension: PentadicDimension | null
  selectedInvariant: Invariant | null
  onInvariantSelect: (inv: Invariant) => void
  onBackToGlyph: () => void
  onBackToInvariants: () => void
}) {
  if (!selectedDimension) {
    return (
      <div className="bg-void-light rounded-lg p-6 text-center">
        <p className="text-white/50 mb-2">Select a pentadic dimension to drill down</p>
        <p className="text-white/30 text-sm">
          Click one of the dimension chips above the glyph
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Breadcrumb navigation */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={onBackToGlyph}
          className="text-white/50 hover:text-white/80 transition-colors"
        >
          Glyph
        </button>
        <span className="text-white/30">→</span>
        <button
          onClick={onBackToInvariants}
          className={`transition-colors ${
            selectedInvariant ? 'text-white/50 hover:text-white/80' : 'text-white/80'
          }`}
        >
          {selectedDimension.charAt(0).toUpperCase() + selectedDimension.slice(1)}
        </button>
        {selectedInvariant && (
          <>
            <span className="text-white/30">→</span>
            <span className="text-white/80">
              {selectedInvariant.replace(/([A-Z])/g, ' $1').trim()}
            </span>
          </>
        )}
      </div>

      {/* Layer B: Invariant panel */}
      {!selectedInvariant && (
        <InvariantPanel
          dimension={selectedDimension}
          invariantTimeSeries={system.invariantTimeSeries}
          currentDay={currentDay}
          onInvariantSelect={onInvariantSelect}
          selectedInvariant={selectedInvariant}
        />
      )}

      {/* Layer C: Subscore panel */}
      {selectedInvariant && (
        <SubscorePanel
          invariant={selectedInvariant}
          fromDimension={selectedDimension}
          subscores={subscores}
          currentDay={currentDay}
        />
      )}
    </div>
  )
}

/**
 * Comparison view with side-by-side snapshots
 */
function ComparisonView({
  system,
  dayA,
  dayB,
  onDayAChange,
  onDayBChange,
}: {
  system: SystemData
  dayA: number
  dayB: number
  onDayAChange: (day: number) => void
  onDayBChange: (day: number) => void
}) {
  return (
    <div className="space-y-6">
      <ComparisonSelector
        totalDays={90}
        dayA={dayA}
        dayB={dayB}
        onDayAChange={onDayAChange}
        onDayBChange={onDayBChange}
      />

      <SnapshotComparison
        profileA={system.pentadicTimeSeries[dayA]}
        profileB={system.pentadicTimeSeries[dayB]}
        labelA={`Day ${dayA + 1}`}
        labelB={`Day ${dayB + 1}`}
        showRadar={true}
      />

      {/* Mini timeline for context */}
      <div className="bg-void-light rounded-lg p-4">
        <div className="text-white/50 text-sm mb-2">Timeline Context</div>
        <Timeline
          timeSeries={system.pentadicTimeSeries}
          events={system.perturbationEvents}
          mode="sparklines"
          selectedDay={dayB}
          height={100}
        />
        <div className="flex justify-between text-xs text-white/40 mt-2">
          <span>Day {dayA + 1} (baseline)</span>
          <span>Day {dayB + 1} (comparison)</span>
        </div>
      </div>
    </div>
  )
}

/**
 * Profile display with bars
 */
function ProfileDisplay({
  profile,
  day,
}: {
  profile: PentadicProfile
  day: number
}) {
  const dimensions = [
    { key: 'u', label: 'Uncertainty', value: profile.u, color: '#94a3b8' },
    { key: 'severity', label: 'Severity', value: profile.severity, color: '#f87171' },
    { key: 'scope', label: 'Scope', value: profile.scope, color: '#fbbf24' },
    { key: 'correlation', label: 'Correlation', value: profile.correlation, color: '#fb923c' },
    { key: 'containment', label: 'Containment', value: profile.containment, color: '#34d399' },
  ] as const

  return (
    <div className="bg-void-light rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white/60 text-sm font-medium">Pentadic Profile</h3>
        <span className="text-white/40 text-xs font-mono">Day {day + 1}</span>
      </div>
      <div className="space-y-2">
        {dimensions.map((dim) => (
          <div key={dim.key} className="flex items-center gap-3">
            <span className="text-white/50 text-xs w-20">{dim.label}</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${dim.value * 100}%`,
                  backgroundColor: dim.color,
                  opacity: 0.6,
                }}
              />
            </div>
            <span className="text-white/70 text-xs font-mono w-10 text-right">
              {dim.value.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * Events panel
 */
function EventsPanel({
  events,
  currentDay,
}: {
  events: { day: number; description: string; magnitude: number }[]
  currentDay: number
}) {
  if (events.length === 0) return null

  return (
    <div className="bg-void-light rounded-lg p-4">
      <h3 className="text-white/60 text-sm font-medium mb-3">Perturbation Events</h3>
      <div className="space-y-2 max-h-40 overflow-y-auto">
        {events.map((event) => {
          const isPast = event.day < currentDay
          const isCurrent = event.day === currentDay

          return (
            <div
              key={event.day}
              className={`
                flex items-center gap-3 text-sm py-1 px-2 rounded
                ${isCurrent ? 'bg-amber-500/20 text-amber-300' : ''}
                ${isPast ? 'text-white/50' : 'text-white/30'}
              `}
            >
              <span className="font-mono text-xs w-12">Day {event.day + 1}</span>
              <span className="flex-1">{event.description}</span>
              <span
                className={`
                  text-xs font-mono px-1.5 py-0.5 rounded
                  ${event.magnitude > 0.6 ? 'bg-red-500/20 text-red-400' : ''}
                  ${event.magnitude > 0.3 && event.magnitude <= 0.6 ? 'bg-amber-500/20 text-amber-400' : ''}
                  ${event.magnitude <= 0.3 ? 'bg-gray-500/20 text-gray-400' : ''}
                `}
              >
                {(event.magnitude * 100).toFixed(0)}%
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
