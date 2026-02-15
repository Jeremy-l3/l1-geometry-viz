import { RiskGlyph } from '../components/glyph/RiskGlyph'
import { systemAlpha, systemBeta, systemGamma } from '../data/synthetic/systems'

function App() {
  // Get current day (day 89 = last day of 90-day series, 0-indexed)
  const currentDay = 89

  return (
    <div className="min-h-screen bg-void p-8">
      <header className="mb-12">
        <h1 className="text-2xl font-semibold text-white/90 mb-2">
          L1 Geometry Visualizer
        </h1>
        <p className="text-white/50 text-sm">
          Risk shape visualization — sample version with synthetic data
        </p>
      </header>

      <main>
        <section className="mb-12">
          <h2 className="text-lg font-medium text-white/70 mb-6">
            Example Systems — Current State (Day 90)
          </h2>

          <div className="flex flex-wrap gap-12 items-end">
            {/* System α - Resilient Mesh */}
            <div className="flex flex-col items-center">
              <RiskGlyph
                profile={systemAlpha.pentadicTimeSeries[currentDay]}
                className="mb-4"
              />
              <div className="text-center">
                <div className="text-white/80 font-medium">System α</div>
                <div className="text-white/50 text-sm">Resilient Mesh</div>
                <div className="text-elastic text-xs mt-1 font-medium">
                  {systemAlpha.trajectoryType}
                </div>
              </div>
            </div>

            {/* System β - Brittle Hub */}
            <div className="flex flex-col items-center">
              <RiskGlyph
                profile={systemBeta.pentadicTimeSeries[currentDay]}
                className="mb-4"
              />
              <div className="text-center">
                <div className="text-white/80 font-medium">System β</div>
                <div className="text-white/50 text-sm">Brittle Hub</div>
                <div className="text-degenerative text-xs mt-1 font-medium">
                  {systemBeta.trajectoryType}
                </div>
              </div>
            </div>

            {/* System γ - Post-Crisis Adaptor */}
            <div className="flex flex-col items-center">
              <RiskGlyph
                profile={systemGamma.pentadicTimeSeries[currentDay]}
                className="mb-4"
              />
              <div className="text-center">
                <div className="text-white/80 font-medium">System γ</div>
                <div className="text-white/50 text-sm">Post-Crisis Adaptor</div>
                <div className="text-regenerative text-xs mt-1 font-medium">
                  {systemGamma.trajectoryType}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pentadic values display for reference */}
        <section className="mt-12 p-6 bg-void-light rounded-lg max-w-4xl">
          <h3 className="text-white/70 font-medium mb-4">Current Pentadic Profiles</h3>
          <div className="grid grid-cols-3 gap-8 text-sm font-mono">
            <ProfileDisplay
              name="α"
              profile={systemAlpha.pentadicTimeSeries[currentDay]}
            />
            <ProfileDisplay
              name="β"
              profile={systemBeta.pentadicTimeSeries[currentDay]}
            />
            <ProfileDisplay
              name="γ"
              profile={systemGamma.pentadicTimeSeries[currentDay]}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

function ProfileDisplay({
  name,
  profile,
}: {
  name: string
  profile: { u: number; severity: number; scope: number; correlation: number; containment: number }
}) {
  return (
    <div>
      <div className="text-white/60 mb-2">System {name}</div>
      <div className="space-y-1 text-white/50">
        <div>U: <span className="text-white/80">{profile.u.toFixed(2)}</span></div>
        <div>Sev: <span className="text-white/80">{profile.severity.toFixed(2)}</span></div>
        <div>Sco: <span className="text-white/80">{profile.scope.toFixed(2)}</span></div>
        <div>Cor: <span className="text-white/80">{profile.correlation.toFixed(2)}</span></div>
        <div>K: <span className="text-white/80">{profile.containment.toFixed(2)}</span></div>
      </div>
    </div>
  )
}

export default App
