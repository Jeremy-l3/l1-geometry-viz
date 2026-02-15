# PRD: L1 Geometry Visualizer
## Honest Visual Representation of Risk Shape + Subscore Composition Breakout
**Draft — February 2026**

---

## 1. The Problem This Solves

The Risk Ontology Stack makes a foundational claim: **risk has shape, not just magnitude.** Two systems with identical scalar risk scores can have radically different risk topologies — and those structural differences determine how risk actually behaves.

The current challenge is that there is no visual representation that faithfully communicates L1 geometry. Existing options occupy two extremes:

- **Scalar scores:** Total information collapse. The geometric equivalent of averaging latitude and longitude into a single coordinate. The result is no position at all.
- **Radar charts on the 5 invariants:** Better than scalar, but still treats the invariants as independent scalar axes on a flat polygon. Loses: invariant interactions (low redundancy + high dependency concentration is catastrophically worse than either alone), contraction mode information, temporal dynamics, drift/deformation distinction, and trajectory classification.

What's needed is a visualization that lives between these — one that preserves as much L1 structure as is humanly interpretable, while making the subscore-to-invariant-to-operational-dimension composition pathway legible.

**The primary audience** is users who are digging deep into these concepts and want to understand: *what does L1 and the ontology stack mapping add to the protocol?* The visualization must make the structural contribution visible and navigable.

---

## 2. The L2 Decomposition: From Triad to Pentad

The original L2 operational layer projects L1 geometry into three dimensions: Probability (Uncertainty), Impact, and Containment. The Basel II structural enrichment identifies where this triadic compression is unnecessarily lossy and proposes a richer decomposition that preserves more L1 shape:

| Triadic Dimension | Pentadic Decomposition | L1 Source | Basel II Analog |
|---|---|---|---|
| Uncertainty (U) | **Uncertainty** — likelihood structure of perturbation events | Branching structure of M(t), P-field density | PD (Probability of Default) |
| Impact (I) | **Severity** — depth of manifold deformation per event | Manifold curvature under perturbation | LGD (Loss Given Default) |
| | **Scope** — breadth of system exposure to that deformation | Manifold volume in the deformation zone | EAD (Exposure at Default) |
| (new) | **Correlation** — co-movement with systemic perturbation field | P-field correlation structure; composability coupling | Asset correlation factor (R) |
| Containment (K) | **Containment** — capacity to absorb or recover from disruption | Response dynamics R; restoring/absorbing modes | Capital buffers, risk mitigation |

**Why this matters for visualization:** The triadic compression forced Impact to collapse severity and scope — two structurally distinct L1 geometries (depth of deformation vs. breadth of deformation) into a single number. It also had no place for correlation — the perturbation field's systemic structure, which the domain stress test identified as potentially more important than internal manifold properties in composable systems (P-dominance).

The pentad decompresses L2 to a resolution where more L1 geometry survives the projection. Five dimensions is still small enough to be human-parseable without requiring dimensional reduction back to something lossy. This is strictly better for an audience that wants to understand what the ontology stack adds.

**Communication framing:** The pentad extends Basel II's risk decomposition — same structural logic, but calibrated for token network dynamics and grounded in a geometric framework that captures relational structure Basel II's distributional assumptions can't.

---

## 3. What "Honest" Means Here

The word "honest" in the brief is doing real work. The stack identifies specific information-loss boundaries at each layer of projection:

| Projection | What is preserved | What is collapsed |
|---|---|---|
| L1 → Pentadic Profile (U,Sev,Sco,Cor,K) | Five structurally independent geometric dimensions | Full trajectory information, response mode specifics, invariant interaction effects |
| Within each pentadic dimension | Overall capacity along that dimension | Which invariants contribute what; structural differences in how the score was composed |
| Pentadic → Scalar | Rank ordering | Everything. The pentadic profile IS the shape; the scalar is no shape at all. |

An honest visualization must:
1. **Show the pentadic profile as primary output** — five distinct values, never collapsed
2. **Make the invariant composition within each dimension inspectable** — the secondary output
3. **Preserve temporal trajectory** — risk shape over time, not just a snapshot
4. **Indicate active contraction modes** — what is currently happening to M(t)
5. **Distinguish drift from deformation** — the two mechanisms of change
6. **Classify trajectory type** — elastic, plastic, degenerative, regenerative
7. **Label every compression explicitly** — wherever information is lost, say so

---

## 4. Design Architecture: Three Layers of Resolution

The visualization operates at three zoom levels, matching the stack's own resolution structure. The user drills down, never up — the default view is the most compressed, with honest geometry available on inspection.

### Layer A: The Risk Shape Profile (Default View)

**What it shows:** The system's current pentadic profile (U, Severity, Scope, Correlation, Containment), its trajectory over time, its trajectory classification, and active contraction mode indicators.

**Visual form: The Glyph + Timeline**

The pentad opens up visual approaches that the triad constrained. With five dimensions, the strongest option is a **structured glyph** — a compact visual object where each dimension maps to a distinct, simultaneously readable visual channel — paired with a **trajectory timeline** showing how the glyph has evolved.

The glyph encodes five dimensions using distinct visual channels:

| Dimension | Visual Channel | Rationale |
|---|---|---|
| Uncertainty (U) | Horizontal position on a bounded axis | The "exposure" dimension — how far into the perturbation field the system sits |
| Severity (Sev) | Vertical extent / height of the glyph body | Depth of potential deformation — tall = deep potential impact |
| Scope (Sco) | Horizontal extent / width of the glyph body | Breadth of exposure — wide = large portion of system at risk |
| Correlation (Cor) | Border treatment (e.g., glow intensity, border weight, or halo) | Systemic coupling — the degree to which this system's shape co-moves with the environment. Visually wraps the glyph because correlation is an *environmental* property that conditions all the internal dimensions |
| Containment (K) | Interior fill density or saturation | Response capacity — dense/saturated = strong containment. Visually "inside" because containment is the system's internal capacity |

**Why this encoding:**
- Severity × Scope produces a visual *area* — the glyph's footprint. This is geometrically meaningful: a tall-narrow glyph (deep but localized deformation) looks fundamentally different from a short-wide glyph (shallow but systemic deformation), which looks different from a large-square glyph (deep and systemic). The area decomposition preserves the L1 distinction that the triadic Impact dimension collapsed.
- Correlation as border/halo treatment preserves its conceptual role: it's an environmental property that wraps around and conditions the internal shape. A system with identical internal geometry but high correlation is visually "louder" — it resonates with its environment.
- Containment as interior density preserves its conceptual role: it's the system's internal capacity to absorb what the other dimensions describe. A hollow glyph (low containment) facing the same external geometry is visually more fragile than a dense one.

**Core design metaphor: Atmospheric re-entry.**

The glyph's visual language is grounded in the physics of atmospheric re-entry, which maps onto L1 concepts with structural precision — not just as an analogy, but as the actual design vocabulary:

- The **object** is the system — its internal geometry (height, width, fill) represents its structural properties.
- The **atmosphere** is the perturbation field P — a continuous, structured distribution of forces acting on the object's trajectory.
- The **glow** is the visible signature of *coupling* between the object and its environment. This is exactly what the Correlation dimension measures: not something about the system internally, and not something about the environment alone, but the degree to which environmental dynamics are acting on the system's shape.
- The **heat shield** is Containment — the system's internal capacity to absorb environmental coupling without structural deformation. A dense, well-shielded capsule glows but survives (elastic trajectory). A hollow, poorly shielded one glows, deforms, and disintegrates (degenerative trajectory into cascading contraction).

The glow is the **leading indicator**. It intensifies as coupling increases, and at some threshold the coupling overwhelms the object's internal containment capacity. This is the visual behavior the design must produce: correlation glow is the thing that catches the viewer's eye first when a system is in danger — not because correlation *is* the danger, but because it tells you how hard the environment is pressing on whatever internal structure exists.

The three example systems, in re-entry terms:
- **System α:** Dense capsule, faint glow. Thermally stable. The atmosphere is there but the shield holds effortlessly.
- **System β:** Hollow capsule, intensifying glow. Heating up. The glow is getting brighter over time (drift), and each flare (deformation event) leaves the surface slightly more ablated (plastic → degenerative). Watching this filmstrip should feel like watching something approach combustion.
- **System γ:** Damaged capsule, moderate glow, but the surface is *regenerating* — re-densifying, re-shielding. The glow is steady but the interior is strengthening. Recovery in progress.

This metaphor should inform color palette (warm glow tones for correlation, cool dense tones for containment), animation behavior (glow pulses, shimmer, intensification over time), and the overall visual feel of the component.

**The Trajectory Timeline:**
Below or beside the glyph, a horizontal timeline shows the glyph's evolution over the selected time range (7d / 30d / 90d / 1y). This can be rendered as:
- A sequence of mini-glyphs at time intervals (showing shape evolution as a filmstrip)
- Or as five parallel sparklines (one per dimension), synchronized on the time axis

The filmstrip approach preserves cross-dimensional interaction (you can see how severity and scope moved together or independently). The sparkline approach makes individual dimension trajectories more precise. The sample should test both.

**Trajectory classification label:** Computed from invariant time-series analysis, displayed prominently: Elastic, Plastic, Degenerative, or Regenerative. This is the single most important piece of information the visualization communicates — per the stack, trajectory matters more than snapshot.

**Active contraction mode indicators:** Small iconic markers indicating which of the four contraction modes are currently active (volume contraction, dimensional collapse, topological fragmentation, curvature steepening). These can be active simultaneously. Rendered as compact icons near the glyph, each with a tooltip explaining what it means for this system.

**What this layer compresses:** The pentadic profile collapses the invariant composition within each dimension. Two systems with the same glyph shape may have arrived there via different invariant configurations. Clicking any dimension of the glyph opens Layer B.

---

### Layer B: Invariant Composition (Drill-Down per Pentadic Dimension)

**What it shows:** For a selected pentadic dimension (e.g., Containment), the contribution of each morphological invariant, along with temporal trajectory per invariant.

**Visual form: Five Invariant Streams**

A panel with five horizontal stream-channels (one per invariant: Redundancy, Connectivity Density, Feedback Latency, Regeneration Rate, Dependency Concentration), each showing:

- **Current contribution magnitude** — how strongly this invariant currently contributes to the selected pentadic dimension. Derived from the many-to-many mapping table (see Artifact 4, Section 6 / Basel II enrichment). The contribution strength varies by dimension — e.g., Feedback Latency contributes strongly to Containment but weakly to Uncertainty.
- **Contribution trajectory** — the time-series of that contribution, rendered as a stream/sparkline synchronized to the Layer A timeline
- **Drift / deformation annotation** — perturbation events marked on the timeline, with the system's response visible in the invariant's trajectory (did it bounce back? permanently shift? accelerate decline?)

**Why streams and not a radar per dimension:**
A radar of invariant contributions would re-introduce the independence fallacy — suggesting the invariants act independently. Streams preserve temporal dynamics and make the drift/deformation pattern visible per-invariant. They also make cross-invariant timing visible: *did redundancy degrade before or after dependency concentration increased?* That temporal ordering is structurally meaningful and invisible in any snapshot representation.

**Cross-dimensional annotation:** Because the invariant-to-pentad mapping is many-to-many, each invariant's stream should indicate its contribution to the *other* pentadic dimensions as well (e.g., a muted secondary color band or annotation). This makes visible the structural fact that a subscore measuring redundancy is not "a containment subscore" — it contributes to Containment, Severity, Scope, and Uncertainty, each at different strength.

**What this layer compresses:** The invariant contribution values are themselves composites of domain-specific indicators (subscores). The connection from "redundancy contributes 0.7 to containment" to "which subscores produced that 0.7" is the next drill-down.

---

### Layer C: Subscore Trace (Drill-Down per Invariant)

**What it shows:** For a selected invariant within a selected pentadic dimension, the specific subscores that feed it, their current values, and their individual trajectories.

**Visual form: Structured Text Panel with Embedded Sparklines**

This is the "text breakout" — where the full subscore → invariant → pentadic dimension pathway becomes legible. For each contributing subscore:

```
┌──────────────────────────────────────────────────────────────────┐
│ REDUNDANCY → Containment                                         │
│                                                                   │
│ ▸ Liquidity Source Distribution     0.72  ▁▂▃▃▃▅▆▅▄▃▃▂▁          │
│   Measures: concentration of TVL across independent venues        │
│   Relational dynamic: how liquidity redistribution responds       │
│     to venue failure (not just how much TVL exists)               │
│   Invariant: Redundancy                                           │
│   Pentadic pathway:                                               │
│     RED → Containment (High)    ████████░░                        │
│     RED → Severity (High)       ████████░░                        │
│     RED → Scope (Moderate)      █████░░░░░                        │
│     RED → Uncertainty (Moderate) █████░░░░░                       │
│     RED → Correlation (Low)     ██░░░░░░░░                        │
│                                                                   │
│ ▸ Validator Node Distribution      0.58  ▃▃▃▄▅▅▄▃▂▂▁▁▁           │
│   Measures: geographic + operator diversity of validator set      │
│   Relational dynamic: consensus resilience under regional         │
│     disruption (not just node count)                              │
│   Invariant: Redundancy                                           │
│   Pentadic pathway:                                               │
│     RED → Containment (High)    ████████░░                        │
│     RED → Severity (Moderate)   █████░░░░░                        │
│     RED → Uncertainty (Moderate) █████░░░░░                       │
│   ⚠ Trajectory: declining (plastic) — steady drift detected      │
│                                                                   │
│ ▸ Cross-Protocol Fallback Paths    0.45  ▅▅▅▄▃▃▂▂▂▂▁▁▁           │
│   Measures: availability of alternative execution routes          │
│   Relational dynamic: whether the system can reroute function     │
│     through alternative protocols under stress                    │
│   Invariant: Redundancy + Connectivity Density                    │
│   Pentadic pathway:                                               │
│     RED → Containment (High)    ████████░░                        │
│     CON → Uncertainty (High)    ████████░░                        │
│     CON → Correlation (High)    ████████░░                        │
│   ⚠ Trajectory: degenerative — accelerating decline              │
│   ⚠ This subscore contributes heavily to Correlation through     │
│     Connectivity Density — declining fallback paths increase      │
│     systemic coupling                                             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

**What this panel must include per subscore:**
1. The current value + sparkline trajectory (minimum 90 days)
2. What it measures — the domain-specific indicator
3. What relational dynamic it captures — the Condition B description (this is what distinguishes morphological from conventional: "not just how much TVL exists, but how liquidity redistribution responds to venue failure")
4. Which invariant(s) it tracks — the Condition A mapping
5. The full pentadic pathway — which dimensions it contributes to, at what strength (Condition C), rendered as a mini bar chart per dimension
6. Trajectory classification and drift/deformation alerts
7. Cross-subscore interaction flags — where one subscore's decline structurally amplifies another's risk contribution

**This is where the "three conditions" from Artifact 5 Section 2 become visible.** Every subscore's structural grounding in the stack is on display — not as abstract philosophy, but as a navigable trace from indicator → invariant → pentadic dimension → risk shape.

---

## 5. Interaction Model

### Primary Flow
1. **Default:** Risk shape glyph with trajectory timeline + contraction mode indicators + trajectory classification
2. **Click any glyph dimension:** Opens Layer B for that pentadic dimension, showing invariant composition streams
3. **Click any invariant stream:** Opens Layer C for that invariant within that dimension, showing subscore traces
4. **Hover any subscore:** Highlights its contribution pathways across all five pentadic dimensions (making the many-to-many mapping visible as glow/highlight across the glyph)

### Temporal Controls
- **Time range selector:** 7d / 30d / 90d / 1y — adjusts trajectory length at all layers simultaneously
- **Playback mode:** Animate the glyph through time, showing how its shape evolves. Drift is visible as slow morphing. Deformation is visible as sudden shape changes. Recovery (or lack of it) is visible in whether the shape returns.
- **Snapshot comparison:** Pin two time points and show the glyph and invariant profiles at each side-by-side. This is where the radar overlay from the earlier prototype earns its place — as a *comparison* tool between two snapshots, not as the primary representation.

### Alert Annotations
- **Drift warnings:** When an invariant's trajectory shows sustained directional movement without acute perturbation
- **Deformation events:** Marked on the timeline across all layers when acute invariant shifts occur
- **Trajectory reclassification:** When the system's trajectory type changes (e.g., elastic → plastic), surfaced as a structural alert — this is more significant than any single snapshot value change
- **Cross-invariant interaction warnings:** When two invariants are moving in a combination that the stack identifies as structurally dangerous (e.g., redundancy declining while dependency concentration is increasing — the geometric precondition for cascading collapse)

---

## 6. What This Visualization Explicitly Does NOT Do

### It does not produce a single scalar score.
The stack establishes that scalar combination is lossy compression. The visualization can *support* scalar derivation (for ranking screens, alert thresholds) but always presents it as a documented compression, never as the primary view. If a scalar is displayed, it is accompanied by a note: "Tokens with similar scores may have very different risk shapes."

### It does not treat the radar chart as primary.
The radar is available as a comparison tool (snapshot overlay, before/after analysis) but it is not the default. The glyph + timeline is the default because it preserves dimensional interaction and temporal dynamics that the radar collapses.

### It does not hide compression boundaries.
Every layer transition is a documented projection with identified information loss. The visualization makes these boundaries navigable, not invisible. Users who want the compressed view get it by default; users who want the full geometry can drill down. But neither user is misled about what they're seeing.

### It does not claim to represent the full manifold.
The reachable state manifold M(t) is a high-dimensional object that cannot be directly visualized. What this tool visualizes is the *invariant profile* — a structured summary of manifold properties — and the *pentadic projection* — the operational surface derived from that profile. These are projections of the manifold, not the manifold itself. This distinction should be present in the UI (e.g., a contextual explainer that situates the visualization within the stack).

---

## 7. Technical Scope for Sample Version

The PRD above describes the full production target. The **sample version** demonstrates the core interaction model with synthetic data, to validate the design language before real subscore integration.

### Sample Scope

| Component | Included | Notes |
|---|---|---|
| Risk shape glyph (5 pentadic dimensions) | Yes | Glyph with distinct visual channels per dimension |
| Trajectory timeline (filmstrip and/or sparklines) | Yes | Synthetic 90-day trajectory for 3 example systems |
| Trajectory classification label | Yes | Computed from synthetic data |
| Contraction mode indicators | Yes | Manually assigned per example system |
| Layer B: invariant streams per pentadic dimension | Yes | 5 streams per dimension, synthetic time-series |
| Layer B: cross-dimensional contribution markers | Yes | Derived from the many-to-many mapping table |
| Layer C: subscore trace panel | Yes | 2–3 example subscores per invariant, with pathway traces |
| Temporal controls (range, playback) | Yes | Animate synthetic glyph trajectory |
| Snapshot comparison mode | Yes | Side-by-side glyph + radar overlay as comparison tool |
| "What am I looking at?" contextual stack explainer | Yes | Situates each layer within L0–L4 |
| Real subscore data integration | No | Requires L4 subscore registry and data pipeline |
| Drift/deformation detection algorithm | No | Requires invariant time-series infrastructure |
| Alert system | No | Requires threshold calibration against real data |
| Cross-invariant interaction detection | No | Requires defined interaction rules |

### Example Systems for Sample

**System α — "Resilient Mesh"**
Profile: Low U, Low Severity, Moderate Scope, Low Correlation, High Containment
Glyph: Short, moderate-width body, faint border, dense fill. Compact and solid.
Trajectory: Elastic — oscillates around stable configuration after perturbation events.
Active contraction modes: None currently active.
*Demonstrates:* What a structurally healthy system looks like. The glyph is small, dense, and stable over time.

**System β — "Brittle Hub"**
Profile: Moderate U, High Severity, High Scope, High Correlation, Low Containment
Glyph: Tall, wide body, heavy glowing border, hollow fill. Large and fragile.
Trajectory: Plastic → Degenerative — glyph has been slowly growing (severity and scope increasing) while fill has been thinning (containment declining). Drift that is invisible in any single snapshot.
Active contraction modes: Curvature steepening, early dimensional collapse.
*Demonstrates:* The drift → hidden fragility pattern. The filmstrip/sparkline timeline shows steady, quiet deterioration. This is the critical test case — if the visualization can make this visible, it succeeds at the thing L1 is specifically designed to reveal.

**System γ — "Post-Crisis Adaptor"**
Profile: High U, Moderate Severity, Low Scope, Moderate Correlation, Moderate Containment
Glyph: Currently tall-narrow with moderate fill. But the timeline shows it was recently much larger (post-deformation event) and has been contracting and densifying (recovery).
Trajectory: Regenerative — each perturbation leaves the system with slightly better invariant values. The glyph is shrinking and filling in.
Active contraction modes: Topological fragmentation (residual, healing).
*Demonstrates:* Why trajectory matters more than snapshot. System γ looks worse than System β right now, but its trajectory is structurally healthier. The visualization must make this intuitively clear.

---

## 8. Success Criteria

The sample version succeeds if:

1. **A viewer can distinguish the three systems' risk shapes without reading a single number.** The glyph geometry alone communicates structural difference — α is compact-solid, β is large-hollow-glowing, γ is tall-narrow-but-densifying. This is the core L1 claim made visible.

2. **The drill-down from glyph → invariant composition → subscore trace is navigable and coherent.** Each layer answers "why does this look this way?" by reference to the layer below.

3. **Drift is visible.** System β's slow deterioration in the glyph filmstrip is perceptible as gradual shape change even though no single frame looks alarming.

4. **Trajectory type is more salient than current position.** A viewer comparing β (currently moderate snapshot, degenerative trajectory) and γ (currently worse snapshot, regenerative trajectory) should intuitively understand that γ is structurally healthier.

5. **The pentadic decomposition is legible to institutional users.** Someone with Basel II familiarity should recognize the structural correspondence (U≈PD, Severity≈LGD, Scope≈EAD, Correlation≈R, Containment≈capital buffers) without requiring explanation.

6. **The many-to-many mapping is visible, not just claimed.** When a user hovers over a subscore in Layer C, they can see its contribution pathways light up across multiple pentadic dimensions. The structural fact that "a redundancy subscore is not a containment subscore — it contributes to everything" is experiential, not just textual.

7. **No information loss is hidden.** A viewer who asks "what am I not seeing?" can find the answer within the visualization's own documentation layer.

---

## 9. Open Design Questions

**Q1: Glyph encoding validation.** The proposed mapping (severity→height, scope→width, containment→fill, correlation→border, uncertainty→position) is one of many possible encodings. The sample should test whether this specific mapping produces intuitive readings — does a "tall hollow glowing rectangle" read as "deep, exposed, systemically coupled, fragile" without explanation? If not, alternative encodings should be explored.

**Q2: Filmstrip vs. sparklines for trajectory.** The glyph filmstrip preserves cross-dimensional interaction but may be hard to read at small sizes. The parallel sparklines are precise but lose the gestalt. The sample should implement both and test which communicates drift more effectively.

**Q3: Many-to-many mapping visualization in Layer B.** When viewing invariant contributions to Containment, how to show that the same invariant contributes differently to Severity? Options: muted color bands on the stream, a small contribution matrix at the top of the panel, or an interactive mode where clicking an invariant briefly shows its contribution across all five dimensions.

**Q4: Contraction mode representation at Layer A.** The four contraction modes are qualitatively different geometric phenomena. Icons or labels convey category but not magnitude or quality. The earlier prototype's animated manifold visualizations were vivid — could a very compact version of these serve as the contraction mode indicators? (A tiny fragmenting blob vs. a tiny steepening blob, each ~24px, serving as both icon and information.)

**Q5: Mobile / compact view.** What is the minimum honest representation for a card-sized view? Candidate: the glyph alone (no timeline), with trajectory classification as a text label and contraction modes as dot indicators. This is documented as a lossy compression of Layer A (temporal dynamics collapsed to a classification label).

**Q6: Color and accessibility.** The five pentadic dimensions use five distinct visual channels, reducing reliance on color alone. But trajectory classification (elastic/plastic/degenerative/regenerative) needs a redundant encoding beyond color. Shape of trajectory path? Icon? Pattern overlay on the glyph?
