# Artifact 2: L1 — Topological Risk
## The Geometry of State-Space Contraction
**February 2026**

---

## 1. What L1 Must Do

L0 established the existence conditions for risk: an identity-preserving dynamical system with branching futures in a perturbable field, where some trajectories contract the reachable state space. L0 tells us *that* risk exists in such configurations.

L1 must tell us *how risk behaves* within them.

Specifically, L1 must provide:

- A geometric description of state-space contraction that is precise enough to distinguish structurally different risk configurations from one another
- A characterization of how systems respond to perturbation — not just whether contraction occurs, but the dynamics of its occurrence
- A set of invariants that define the *shape* of a system's risk topology, independent of domain
- Sufficient structure that the operational triad (probability, impact, containment) can later be derived as projections, not stipulated as primitives

L1 remains ethically neutral and domain-general. It describes the mechanics of contraction in a virus and a DAO using the same structural vocabulary. Normative interpretation enters at L2 and above.

---

## 2. The Three Geometric Primitives

Risk topology at L1 is characterized by three primitives. These are not the operational triad — they are the geometric structures from which the triad will be derived at L2.

### 2.1 The Reachable State Manifold — M(t)

At any time *t*, a system satisfying the L0 conditions has a set of states it could reach in the future, given the trajectories available from its current state. This set is the reachable state manifold, M(t).

M(t) is not a fixed landscape. It evolves as the system moves through its state space — some trajectories open new regions of possibility, others close them. The manifold is the system's horizon of future possibility at a given moment.

**Key properties of M(t):**

*Dimensionality* — how many independent axes of variation the system's futures span. A system with futures that vary along many independent dimensions has a high-dimensional manifold; one whose futures are tightly correlated has a low-dimensional one. Dimensionality is a measure of the *diversity* of possibility, not just its volume.

*Volume* — the total extent of reachable states. Contraction of volume is the most basic geometric signature of risk at L1: |M(t₁)| < |M(t₀)| means the system has fewer reachable futures than it did before.

*Topology* — the connectivity structure of the manifold. A manifold can have the same volume but different topology — connected versus fragmented, smooth versus riddled with holes. A fragmented manifold means some futures are reachable only through narrow passages (bottlenecks) or are entirely cut off from each other. Topological degradation can be as significant as volume contraction — the system may retain many possible futures in aggregate but lose the ability to navigate between them.

**What M(t) does for the framework:** It gives contraction a precise (if semi-formal) meaning. Risk is not "something bad might happen" — it is the geometric fact that M(t) is shrinking, fragmenting, or losing dimensionality. These are structurally distinct modes of contraction, and they produce different risk shapes.

### 2.2 The Perturbation Field — P

The perturbation field is the totality of dynamics — external and internal — that influence which trajectory the system realizes from its current state.

P is not a single shock or event. It is a field: a continuous, structured distribution of forces acting on the system's trajectory. Some perturbations are sharp and discrete (a sudden liquidity withdrawal, a fire, a governance failure). Others are diffuse and chronic (environmental drift, slow dependency accumulation, gradual erosion of redundancy). Both are perturbations; they differ in temporal structure, not in kind.

**Key properties of P:**

*Intensity* — the magnitude of perturbative force. High-intensity perturbation pushes the system further from its current trajectory per unit time.

*Correlation structure* — how perturbations relate to each other across time and across dimensions of the system. Correlated perturbation (multiple forces pushing in the same direction simultaneously) is geometrically different from uncorrelated perturbation (forces pushing in independent directions). Correlated perturbation produces coherent deformation; uncorrelated perturbation produces noisy agitation that may or may not deform.

*Coupling specificity* — which aspects of the system the perturbation acts on. A perturbation coupled to the system's redundancy structures is geometrically different from one coupled to its communication channels, even at the same intensity. Coupling specificity determines *where* on the manifold contraction is most likely to occur.

**What P does for the framework:** It replaces the vague notion of "threats" or "hazards" with a structural description of the forces acting on a system's trajectory. The same P acting on systems with different manifold geometries and different response dynamics produces different risk shapes — which is exactly the insight that conventional risk-as-attribute models miss.

### 2.3 The Response Dynamics — R

When a perturbation acts on a system, the system does not simply receive it passively. The system responds — and the character of that response is what determines whether perturbation produces transient displacement, permanent deformation, or cascading collapse.

R is the system's response dynamics: the processes by which the system's state and structure change in reaction to perturbation.

**Key modes of R:**

*Restoring* — the system's dynamics push it back toward its prior manifold geometry after perturbation. The manifold deforms temporarily but recovers. This is elastic response. The strength of restoring dynamics (how quickly, how completely the manifold recovers) is a primary determinant of risk shape.

*Absorbing* — the system incorporates the perturbation into a new configuration that preserves or expands the manifold, but does not return to the prior state. The system is changed, but its reachable futures are not contracted. This is adaptive response.

*Deforming* — the perturbation permanently alters the manifold geometry: volume contracts, dimensionality reduces, or topology fragments. The system does not recover its prior reach. This is plastic deformation — the structural signature of realized risk.

*Cascading* — the perturbation triggers internal dynamics that amplify contraction beyond what the perturbation alone would produce. Deformation in one region of the manifold propagates to others through the system's internal coupling structure. This is the mechanism of systemic collapse — and the geometry that makes it possible (tight coupling, low redundancy, correlated internal dependencies) is one of L1's most important objects of study.

**What R does for the framework:** It makes explicit that risk topology is not just about the system's current state and the perturbations it faces — it is fundamentally about the *interaction dynamics* between them. Two systems with identical manifolds facing identical perturbations can have radically different risk shapes because their response dynamics differ. R is where the structural difference between brittleness and elasticity lives.

---

## 3. Risk Shape: The Configuration of M, P, and R

A system's risk shape at any time is the configuration of its reachable state manifold, the perturbation field acting on it, and its response dynamics.

This is the core L1 claim: **risk has shape, not just magnitude.** Two systems with the "same amount" of risk (however measured) can have structurally different risk topologies — and those structural differences determine how risk actually behaves.

### 3.1 Why shape is not reducible to a score

Consider two systems:

**System A** has a large, high-dimensional manifold (many diverse futures), is exposed to intense but uncorrelated perturbation, and has strong restoring dynamics. This system is agitated — it moves a lot — but its manifold is elastic. Perturbation pushes it around; it bounces back.

**System B** has a large manifold of similar volume, is exposed to low-intensity but highly correlated perturbation, and has weak restoring dynamics with tight internal coupling. This system appears calm — low surface agitation — but its manifold is brittle. When perturbation arrives along the correlated axis, deformation propagates internally with little resistance.

Any scalar risk measure that aggregates these into a single number will rate them similarly. But their risk shapes are fundamentally different. System A fails gracefully under extreme stress; System B fails catastrophically under moderate stress applied in the right direction. The shape is the information that matters.

### 3.2 Modes of contraction

State-space contraction is not a single phenomenon. L1 distinguishes several structurally distinct modes:

**Volume contraction** — the total extent of reachable states shrinks. Fewer futures are available. This is the simplest mode and corresponds loosely to "the system is losing options."

**Dimensional collapse** — the manifold retains extent along some axes but loses it along others. The system's futures become less diverse — correlated, channeled, constrained to fewer independent directions of variation. This can occur without volume contraction in the aggregate (the remaining dimensions may still span a large region), but it represents a deep structural loss: the system can no longer reach *kinds* of futures it previously could.

**Topological fragmentation** — the manifold breaks into disconnected or weakly connected regions. The system may still have many reachable states in total, but it cannot navigate freely among them. Some futures become accessible only through narrow, fragile pathways — or become entirely unreachable from certain starting positions. This mode is particularly relevant in networked systems where localized failures can sever connections between functional regions.

**Curvature steepening** — the manifold develops regions of sharp curvature: zones where small movements in state space produce large changes in the set of reachable futures. The system becomes sensitive — nearby trajectories diverge rapidly, and the difference between "just fine" and "catastrophic contraction" shrinks to a narrow boundary. This is the geometric signature of systems near criticality.

These modes are not mutually exclusive. A system can experience several simultaneously. The *combination* of modes active in a given system at a given time is a primary component of its risk shape.

---

## 4. Morphological Invariants

Given the three geometric primitives and the modes of contraction, we can identify structural properties that characterize risk shape in a measurable (in principle) way. These are the morphological invariants — properties of the risk topology that persist across domain-specific details.

A note on terminology: "invariant" here means a property that characterizes the topology at a level of description above domain specifics — not a property that never changes. These invariants evolve as the system evolves. Their values at any time, and their trajectories over time, define the risk shape.

### 4.1 The invariants

**Redundancy** — the degree to which the system's capacity to reach future states is distributed across multiple structures, pathways, or mechanisms **with diverse perturbation-response profiles**. High redundancy means that the failure of any single component does not contract the manifold proportionally — other components can sustain reachability — **and that those components fail differently under the same perturbation**. Low redundancy means the manifold's geometry depends critically on specific components, or that nominally distinct pathways share a common failure mode.

The distinction between independence and diversity is structural: ten identical servers are independent of each other but not independent of the same perturbation. They collapse together under any failure mode they share. Redundancy that buffers against topological fragmentation must be *perturbation-diverse*, not merely replicated.

*Geometric role:* Redundancy determines how *localized* contraction events remain **and whether localization holds under perturbation-specific stress**. In a high-redundancy system, perturbation that disables one pathway does not cascade because alternative pathways preserve manifold connectivity *and respond to the same perturbation through structurally different mechanisms*. Redundancy is a buffer against topological fragmentation and cascading deformation — but only when the redundant structures have diverse perturbation-response profiles.

*Basis for refinement:* Elmqvist et al. (2003) Response Diversity; Stirling (2007) Variety-Balance-Disparity; Biggs et al. (2020) Functional Redundancy. The domain examples in Section 4.2 and Artifact 3 already require this reading — species that fill the same niche but respond differently to fire, liquidity sources that react differently to the same market shock. The refinement makes explicit what the examples already demand.

**Connectivity density** — the richness, distribution, **and compartmentalization** of couplings within the system. This is not simply "how connected" the system is — it is the structure of that connectivity. A system can be densely connected in ways that distribute perturbation (resilient mesh) or in ways that transmit it (contagion network). What matters is the interaction between connectivity and perturbation coupling — **and whether the coupling topology contains modular boundaries that localize deformation within subsystems**.

*Geometric role:* Connectivity density determines the *propagation geometry* of deformation **and whether that propagation stays local or goes global**. It shapes whether perturbation at one point in the system dissipates across many connections (diffusion), concentrates along specific pathways (channeling), **or is contained within a modular compartment before reaching the broader system**. The same density can produce opposite effects depending on its structure — this is why connectivity must be understood as a topology, not a metric. Two systems with identical coupling density can have opposite risk profiles if one has modular compartmentalization and the other does not: the first localizes failure, the second transmits it.

*Basis for refinement:* Simon (1962) Nearly Decomposable Systems; Newman (2006) Modularity and Community Structure; May (1972) ecosystem stability; Haldane & May (2011) systemic financial risk. The original definition already noted that "the same density can produce opposite effects" but did not name the geometric property that explains why. That property is modularity — compartmental boundaries within the coupling topology. The refinement names what was already implied.

**Feedback latency** — the time delay **and gain polarity** of the system's response dynamics relative to perturbation. Latency determines *when* response dynamics engage. **Gain polarity determines *what* those dynamics do once engaged: whether they restore the manifold toward its prior geometry (negative feedback / restoring gain) or amplify the deformation already in progress (positive feedback / amplifying gain).** Short feedback latency means the system begins responding quickly. Long feedback latency means perturbation accumulates before response begins. But latency alone is half the picture — a fast positive feedback loop is more dangerous than a slow negative one.

*Geometric role:* Feedback latency determines the *temporal depth* of deformation. **Gain polarity determines the *trajectory* of deformation once response engages.** A system with short latency and **restoring** gain (negative feedback) may experience surface perturbation but never deep manifold deformation. A system with long latency may appear stable for extended periods while perturbation silently reshapes the manifold — then respond too late, when deformation has become structural. **A system with short latency but amplifying gain (positive feedback) responds quickly but accelerates contraction — liquidation cascades, bank runs, and cytokine storms are all fast positive feedback loops where rapid engagement makes the deformation worse, not better.** The combination of latency and gain polarity together determine whether response dynamics heal or accelerate manifold contraction.

*Basis for refinement:* Meadows (2008) Leverage Points; Scheffer (2009) Critical Transitions; Sornette (2003) positive feedback cascades; Brunnermeier & Pedersen (2009) margin/liquidity spirals. The original definition mentioned "amplifying" in a parenthetical but treated it as an edge case rather than a structural parameter. Gain polarity is not an edge case — it is half of what determines the deformation trajectory.

**Regeneration rate** — the rate at which the system can restore or expand its reachable state manifold after contraction. This is not the same as restoring dynamics (which prevent contraction during perturbation); regeneration is the capacity to recover manifold geometry *after* deformation has occurred.

*Geometric role:* Regeneration rate determines the *reversibility* of contraction. A system with high regeneration rate can suffer manifold contraction and rebuild its reachable state space — contraction is temporary. A system with low regeneration rate accumulates contraction irreversibly — each deformation event permanently narrows the horizon of possibility.

**Dependency concentration** — the degree to which the system's manifold geometry relies on a small number of nodes, flows, relationships, or structures. High dependency concentration means that the system's reachable state space is disproportionately sustained by specific components. The failure of those components contracts the manifold far more than the failure of others.

*Geometric role:* Dependency concentration determines the *criticality profile* of the system — where the high-curvature zones are, which failures produce disproportionate contraction. It is the geometric precondition for cascading collapse: when the components the manifold most depends on are also the components most exposed to perturbation, the system is in a structurally precarious configuration.

### 4.2 Invariants vs. indicators

The five invariants above describe the *geometry of the risk topology*. They are abstract — they characterize shape at a level of description that applies across domains.

Beneath them sit domain-specific *indicators*: measurable quantities that serve as proxies for one or more invariants within a particular system.

| Invariant | Example indicators (token network) | Example indicators (forest ecosystem) |
|---|---|---|
| Redundancy | Diversity of liquidity sources with distinct perturbation-response profiles (not just count); validator distribution across hardware/software stacks | Species diversity weighted by response-group heterogeneity; functional group overlap across disturbance types (fire, drought, pest) |
| Connectivity density | Wallet interaction graph structure; cross-protocol dependency map; **modular compartmentalization of DeFi integrations (e.g., isolated relay chains, DEX/CEX separation)** | Mycorrhizal network density and modularity by tree species cluster; trophic web structure **with compartment boundaries between subsystems** |
| Feedback latency | Time between governance proposal and execution; oracle update frequency; **gain polarity of automatic mechanisms (e.g., liquidation cascades = amplifying; dynamic fee adjustment = restoring)** | Seed germination lag; predator-prey response time; **feedback polarity (e.g., invasive species regrowth = amplifying; native recolonization = restoring)** |
| Regeneration rate | Speed of liquidity recovery after drawdown; new contributor onboarding rate | Regrowth rate post-disturbance; soil recovery cycle |
| Dependency concentration | Share of TVL in top 3 pools; reliance on single oracle provider | Keystone species dependency; watershed reliance on single water source |

The invariants are L1. The indicators are the bridge between L1 and measurement — they will be formalized at L2 and operationalized at L4 (subscore design). But the distinction is critical: **an indicator that does not track a morphological invariant is not measuring risk shape, regardless of how useful it appears.** This is the test that prevents conventional metrics from being repackaged as morphological subscores.

---

## 5. Temporal Dynamics: Risk Shape as Trajectory

Risk shape is not static. The morphological invariants evolve as the system evolves. L1 must describe not only what a risk shape is at a given moment, but how risk shapes change over time.

### 5.1 Drift and deformation

A system's risk shape changes through two mechanisms:

**Drift** — the gradual evolution of invariant values under normal system dynamics, without acute perturbation. A token network that slowly concentrates its dependencies, or a forest that gradually loses species diversity, is drifting toward a more brittle risk shape. Drift is often invisible to snapshot analysis — each moment looks acceptable, but the trajectory is toward fragility.

**Deformation** — the acute reshaping of invariant values under perturbation. A liquidity crisis that fragments connectivity, or a fire that eliminates keystone species, deforms the risk shape abruptly. Deformation events are typically visible; their relationship to prior drift is often not.

The interaction between drift and deformation is where the most consequential risk dynamics live. A system that has drifted into high dependency concentration and low redundancy may appear stable (low volatility, no recent deformation) while being structurally primed for catastrophic deformation from a moderate perturbation. **This is the geometric signature of hidden fragility — and it is invisible to any risk model that does not track invariant trajectories.**

### 5.2 Elasticity and plasticity

Over time, a system's risk shape exhibits one of several characteristic behaviors:

**Elastic trajectory** — perturbation produces deformation, but the system's response dynamics restore the prior risk shape. The invariant values bounce back. The manifold recovers. Over time, the risk shape oscillates around a stable configuration.

**Plastic trajectory** — perturbation produces deformation that does not fully reverse. Each perturbation event permanently shifts some invariant values. Over time, the risk shape migrates — typically toward brittleness, though in principle toward resilience as well (if perturbation triggers structural adaptation that improves invariant values).

**Degenerative trajectory** — each deformation event weakens the response dynamics themselves, so that future perturbation produces *greater* deformation. This is the positive feedback loop of structural decline: contraction erodes the mechanisms that would prevent further contraction. Degenerative trajectories are the geometric precondition for systemic collapse.

**Regenerative trajectory** — perturbation triggers response dynamics that not only restore but strengthen the manifold. The system learns, adapts, builds new redundancy, diversifies connectivity. Each perturbation event leaves the system's risk shape more elastic than before. This is the geometric structure underlying what will later (at L3) be called antifragility or regenerative capacity.

### 5.3 Why trajectory matters more than snapshot

A system currently exhibiting a broad, high-redundancy, well-connected risk shape on a degenerative trajectory is at greater risk than a system currently exhibiting a narrow, concentrated risk shape on a regenerative trajectory. The first is spending down structural reserves; the second is building them.

Snapshot analysis cannot distinguish these cases. Trajectory analysis can. This is why L1 insists that risk shape is inherently temporal — the invariant values at a point in time are necessary but insufficient. The direction and rate of change of those values, and the relationship between that change and the system's response dynamics, are constitutive of the risk topology.

---

## 6. Ethical Neutrality (Maintained)

Nothing in L1 assigns value to contraction or expansion. A forest fire contracts the reachable state manifold of individual trees but may expand that of the forest ecosystem. A protocol upgrade may contract the futures available to certain participants while expanding those of the system as a whole. Contraction at one level of identity boundary may be expansion at another.

L1 describes the *mechanics* — manifold geometry, perturbation dynamics, response characteristics, invariant trajectories. It does not say which systems deserve preservation, which level of description matters, or whether contraction is good or bad.

These are questions of purpose, value, and stewardship. They enter the framework at L2 (when the operational triad introduces human-meaningful categories like "impact" and "containment capacity") and become central at L3 (when Capital Morphology interprets L1 geometry through the lens of economic generativity).

L1's ethical neutrality is not an omission. It is a structural requirement. If L1 contained normative content, it could not serve as a shared geometric foundation for systems where normative frameworks differ or conflict. The same L1 description must apply to a virus and to the organism it infects — both are risk-bearing systems with manifold dynamics; the question of which one we care about is not L1's to answer.

---

## 7. The Transition to L2

L1 provides the geometry. L2 must provide the projection — the mapping from manifold dynamics to operationally meaningful categories.

The claim that L2 must validate (in Artifact 4) is that the operational triad emerges naturally from L1:

- **Probability** as a projection of the branching structure of M(t) — the density and distribution of trajectories, the system's exposure to the perturbation field's correlation structure
- **Impact** as a projection of manifold curvature under perturbation — how much deformation a perturbation produces, which modes of contraction it activates, how deep the geometric consequences reach
- **Containment** as a projection of the response dynamics R — the strength and speed of restoring forces, the depth of redundancy buffers, the capacity to absorb or adapt rather than deform or cascade

If this derivation succeeds, the triad stops being three categories chosen for operational convenience and becomes three natural dimensions of a deeper geometry — three views of the same underlying shape. That is what Artifact 4 must demonstrate.

---

## Changelog

**February 2026 — L1 Invariant Refinements (from Five Invariants Changes Proposal)**

Three invariants refined to make implicit requirements explicit. No new invariants added. No downstream logic (L0, L2, L3, L4) disrupted.

- **Redundancy:** "multiple independent structures" → "multiple structures with diverse perturbation-response profiles." Independence from each other is necessary but insufficient; independence from the same failure mode is what the examples and literature require.
- **Connectivity Density:** "richness and distribution of couplings" → "richness, distribution, and compartmentalization of couplings." Adds modularity as the named geometric property that explains why identical density can produce opposite risk profiles.
- **Feedback Latency:** "time delay between perturbation and response dynamics engaging" → "time delay and gain polarity of response dynamics." Adds polarity (restoring vs. amplifying) as a structural parameter co-equal with temporal delay.

Indicator table (S4.2) updated to reflect refined definitions. Regeneration Rate and Dependency Concentration unchanged.

*Sources:* Elmqvist et al. (2003); Stirling (2007); Biggs et al. (2020); Simon (1962); Newman (2006); May (1972); Haldane & May (2011); Meadows (2008); Scheffer (2009); Sornette (2003); Brunnermeier & Pedersen (2009).
