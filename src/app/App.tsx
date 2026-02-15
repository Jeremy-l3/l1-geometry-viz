import { useState, useCallback } from 'react'
import { RiskGlyph } from '../components/glyph/RiskGlyph'
import { Timeline, type TimelineMode } from '../components/timeline'
import { PlaybackControls } from '../components/playback'
import { TrajectoryBadge, TrajectoryPanel } from '../components/trajectory'
import {
  systemAlpha,
  systemBeta,
  systemGamma,
} from '../data/synthetic/systems'
import type { PentadicProfile, SystemData } from '../data/synthetic/types'

const systems: SystemData[] = [systemAlpha, systemBeta, systemGamma]

function App() {
  // State
  const [selectedSystemId, setSelectedSystemId] = useState<string>('alpha')
  const [currentDay, setCurrentDay] = useState(89)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timelineMode, setTimelineMode] = useState<TimelineMode>('sparklines')

  // Derived state
  const selectedSystem = systems.find((s) => s.id === selectedSystemId) ?? systemAlpha
  const currentProfile = selectedSystem.pentadicTimeSeries[currentDay]

  // Handlers
  const handleDayChange = useCallback((day: number) => {
    setCurrentDay(day)
  }, [])

  const handleSystemChange = useCallback((id: string) => {
    setSelectedSystemId(id)
    setCurrentDay(89) // Reset to end when changing systems
    setIsPlaying(false)
  }, [])

  return (
    <div className="min-h-screen bg-void p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold text-white/90 mb-2">
          L1 Geometry Visualizer
        </h1>
        <p className="text-white/50 text-sm">
          Phase 2: Timeline, Playback & Trajectory Classification
        </p>
      </header>

      <main className="max-w-6xl">
        {/* System selector tabs */}
        <div className="flex gap-2 mb-8">
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

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: Glyph + Trajectory */}
          <div className="lg:col-span-1 space-y-6">
            {/* Main glyph display */}
            <div className="bg-void-light rounded-lg p-6">
              <div className="flex flex-col items-center">
                <RiskGlyph
                  profile={currentProfile}
                  className="mb-4"
                />
                <div className="text-center">
                  <div className="text-white/80 font-medium text-lg">
                    System {selectedSystem.id === 'alpha' ? 'α' : selectedSystem.id === 'beta' ? 'β' : 'γ'}
                  </div>
                  <div className="text-white/50 text-sm mb-3">
                    {selectedSystem.descriptor}
                  </div>
                  <TrajectoryBadge
                    trajectoryType={selectedSystem.trajectoryType}
                    contractionModes={selectedSystem.activeContractionModes}
                    showModeLabels={true}
                  />
                </div>
              </div>
            </div>

            {/* Trajectory panel */}
            <TrajectoryPanel
              trajectoryType={selectedSystem.trajectoryType}
              contractionModes={selectedSystem.activeContractionModes}
            />

            {/* Current pentadic values */}
            <ProfileDisplay profile={currentProfile} day={currentDay} />
          </div>

          {/* Right column: Timeline + Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Timeline mode toggle */}
            <div className="flex items-center justify-between">
              <h2 className="text-white/70 font-medium">
                90-Day Trajectory
              </h2>
              <div className="flex gap-1 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setTimelineMode('sparklines')}
                  className={`
                    px-3 py-1 text-xs rounded transition-all
                    ${timelineMode === 'sparklines'
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white/70'
                    }
                  `}
                >
                  Sparklines
                </button>
                <button
                  onClick={() => setTimelineMode('filmstrip')}
                  className={`
                    px-3 py-1 text-xs rounded transition-all
                    ${timelineMode === 'filmstrip'
                      ? 'bg-white/10 text-white'
                      : 'text-white/50 hover:text-white/70'
                    }
                  `}
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

            {/* Perturbation events list */}
            <EventsPanel events={selectedSystem.perturbationEvents} currentDay={currentDay} />
          </div>
        </div>

        {/* Comparison view - all three systems at current day */}
        <section className="mt-12 pt-8 border-t border-white/10">
          <h2 className="text-white/70 font-medium mb-6">
            System Comparison — Day {currentDay + 1}
          </h2>
          <div className="flex flex-wrap gap-8 items-end">
            {systems.map((system) => {
              const profile = system.pentadicTimeSeries[currentDay]
              const isSelected = system.id === selectedSystemId
              return (
                <button
                  key={system.id}
                  onClick={() => handleSystemChange(system.id)}
                  className={`
                    flex flex-col items-center p-4 rounded-lg transition-all
                    ${isSelected
                      ? 'bg-white/10 ring-1 ring-white/20'
                      : 'bg-white/5 hover:bg-white/10 opacity-60 hover:opacity-100'
                    }
                  `}
                >
                  <RiskGlyph
                    profile={profile}
                    scale={0.7}
                    className="mb-3"
                  />
                  <div className="text-center">
                    <div className="text-white/80 font-medium text-sm">
                      System {system.id === 'alpha' ? 'α' : system.id === 'beta' ? 'β' : 'γ'}
                    </div>
                    <div className="text-white/40 text-xs mb-2">
                      {system.descriptor}
                    </div>
                    <TrajectoryBadge
                      trajectoryType={system.trajectoryType}
                      size="sm"
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

function ProfileDisplay({
  profile,
  day,
}: {
  profile: PentadicProfile
  day: number
}) {
  const dimensions = [
    { key: 'u', label: 'Uncertainty', value: profile.u },
    { key: 'severity', label: 'Severity', value: profile.severity },
    { key: 'scope', label: 'Scope', value: profile.scope },
    { key: 'correlation', label: 'Correlation', value: profile.correlation },
    { key: 'containment', label: 'Containment', value: profile.containment },
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
                className="h-full bg-white/30 rounded-full transition-all duration-300"
                style={{ width: `${dim.value * 100}%` }}
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
          const isFuture = event.day > currentDay

          return (
            <div
              key={event.day}
              className={`
                flex items-center gap-3 text-sm py-1 px-2 rounded
                ${isCurrent ? 'bg-amber-500/20 text-amber-300' : ''}
                ${isPast ? 'text-white/50' : ''}
                ${isFuture ? 'text-white/30' : ''}
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
