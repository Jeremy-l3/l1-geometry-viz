# Artifact 3: Domain Stress Test
## Testing L0/L1 Across Five Domains
**February 2026**

---

## Purpose

This document runs the L0 existence conditions and L1 geometric framework through five radically different systems. The goal is not confirmation but falsification: to find where the ontology breaks, bends, or silently loses meaning.

For each domain, we identify:
- How the four L0 conditions map onto the system
- What the L1 primitives (M, P, R) look like
- Which morphological invariants are most salient
- Which modes of contraction are characteristic
- **The hardest case** — the aspect of the domain that most resists the framework

The stress test passes if L0/L1 describes all five domains using the same structural vocabulary without domain-specific reinterpretation of the core concepts. It fails if any domain requires us to redefine what identity boundary, state space, branching, perturbability, manifold, perturbation field, or response dynamics *mean* in order to make the framework fit.

---

## Domain 1: Forest Ecosystem

### L0 Mapping

**Identity boundary:** The forest as a bounded ecological system — defined by watershed, biome type, or management boundary. The boundary is permeable (animals migrate, seeds disperse, water flows through) but coherent enough that "this forest's reachable futures contracted" is a meaningful statement. Identity persists through continuous turnover of individual organisms, just as a river's identity persists through continuous turnover of water molecules.

**State space:** The set of ecological configurations the forest could occupy — species compositions, age structures, trophic relationships, soil conditions, canopy architectures. Each configuration represents a distinguishable state with different functional properties.

**Branching futures:** From any present state, the forest's trajectory branches depending on weather patterns, disturbance events, species interactions, seed availability, and human intervention. The future is radically underdetermined.

**Perturbability:** The forest is deeply coupled to climate dynamics, adjacent land use, invasive species pressure, fire regimes, hydrological changes, and human management decisions. Perturbation is continuous, multi-scale, and both external and internal.

### L1 Primitives

**M(t):** The forest's reachable state manifold is high-dimensional (many species, many possible configurations) and typically well-connected (many transition pathways between states). A healthy old-growth forest has a large, richly structured M(t) — many possible futures spanning diverse ecological configurations.

**P:** Perturbation is multi-scale. Climate variability is a diffuse, chronic perturbation field. Fire, storm, and disease are acute perturbations with specific coupling to particular system structures (fire couples to fuel load and canopy continuity; disease couples to species concentration). Human land use is a perturbation that can alter both the manifold and the perturbation field simultaneously (logging changes forest structure *and* changes fire dynamics).

**R:** Response dynamics are layered. At short timescales: individual organism resistance and recovery. At medium timescales: successional dynamics — pioneer species colonize disturbed areas, initiating trajectories toward new configurations. At long timescales: evolutionary adaptation and soil development. The strength and speed of R depend heavily on the invariants — particularly redundancy (functional group diversity **with diverse perturbation-response profiles**) and regeneration rate (seed bank viability, soil condition). **The gain polarity of response dynamics varies: native recolonization after fire is restoring feedback (negative gain — the system moves back toward its prior manifold geometry), while invasive species establishment after disturbance is amplifying feedback (positive gain — the response accelerates deformation by locking out native successional pathways). Whether R heals or accelerates contraction depends on which feedback dynamics dominate the post-perturbation response.**

### Salient Invariants

**Redundancy** is the dominant invariant. Forests with high functional redundancy (multiple species filling similar ecological roles **with diverse perturbation-response profiles**) can lose individual species without manifold contraction — other species absorb the functional role. The diversity requirement is critical: a forest with ten tree species that all respond identically to drought has nominal redundancy but collapses as a unit under water stress. True ecological redundancy requires that species filling the same niche **respond differently to the same perturbation** — some drought-tolerant, some fire-resistant, some pest-resistant — so that no single perturbation type can eliminate the entire functional group simultaneously. Forests with low redundancy (keystone species with no functional equivalents) have manifolds that are critically dependent on specific components.

**Connectivity density** maps onto the mycorrhizal network and trophic web. Dense, distributed connectivity allows resource and information transfer that buffers localized perturbation. Fragmented connectivity isolates patches, creating topological fragmentation in M(t). **The compartmentalization dimension is equally important: mycorrhizal networks naturally form modular clusters organized by tree species, creating semi-independent subsystems. This modularity means that a fungal pathogen affecting one cluster does not necessarily propagate to the entire network — deformation stays local.** A forest with dense but unmodular connectivity (a single tightly-coupled mycorrhizal web) is more vulnerable to system-wide contagion than one with equivalent density organized into compartmentalized clusters.

**Regeneration rate** is directly measurable: regrowth speed, seed germination rates, soil recovery timelines after disturbance.

### Characteristic Contraction Modes

**Volume contraction** — loss of species reduces the total set of possible ecological configurations.

**Dimensional collapse** — loss of functional groups eliminates entire axes of ecological variation. A forest that loses all nitrogen-fixing species doesn't just lose those species; it loses access to an entire dimension of soil-chemistry futures.

**Topological fragmentation** — habitat fragmentation literally fragments the manifold. Isolated forest patches cannot exchange species, genes, or successional resources, severing transition pathways between configurations.

### The Hardest Case

**The identity boundary is observer-dependent.** A forest ecologist studying a watershed, a conservation biologist studying a biome, and a land manager studying a parcel will draw different boundaries around "the system." Each boundary produces a different M(t), different contraction dynamics, and potentially different risk assessments.

**Assessment:** This does not break L0. L0's Condition 1 requires an identity boundary *sufficient to make contraction meaningful*, but it does not require the boundary to be unique or observer-independent. The functional test ("Can you coherently say this system has fewer reachable futures?") can be passed at multiple scales simultaneously. What changes between scales is not whether L0 applies, but which contraction events are visible.

This is actually a feature: L0/L1 makes explicit that risk assessment is always relative to a chosen level of description. A forest fire contracts M(t) for individual trees but may expand M(t) for the forest ecosystem by clearing space for successional diversity. Both statements are correct at L1; they describe contraction at different identity boundaries. The framework doesn't resolve which scale matters — that is a normative question for L2 and above — but it makes the scale-dependence structurally visible.

**Verdict: L0/L1 holds. Observer-dependence of the identity boundary is acknowledged, not hidden.**

---

## Domain 2: Crypto Token Network

### L0 Mapping

**Identity boundary:** The token network as a functional system — the token contract, its holders, its liquidity venues, its governance mechanisms, its integrations with other protocols. The boundary is porous (tokens flow, wallets interact across protocols, composability entangles systems) but coherent enough that "this token network's reachable futures" is meaningful. Identity persists through continuous change in holder composition, liquidity distribution, and governance state.

**State space:** The set of configurations the network could occupy — liquidity levels and distributions, holder concentrations, governance states, protocol integrations, market positioning. Each configuration is a distinguishable state with different functional properties for holders and the broader ecosystem.

**Branching futures:** From any present state, the network's trajectory branches depending on market conditions, governance decisions, competitive dynamics, regulatory developments, technical events (exploits, upgrades), and participant behavior. Branching is dense and rapid — the state space is explored at speeds far exceeding most physical or biological systems.

**Perturbability:** The token network is coupled to global market sentiment, adjacent protocol dynamics (composability risk), governance actions, regulatory changes, technical vulnerabilities, and the behavior of concentrated holders. Perturbation is continuous and multi-layered.

### L1 Primitives

**M(t):** Typically high-dimensional but with significant dependency concentration. A token integrated across many protocols and held by diverse participants has a large, well-connected manifold. A token dependent on a single liquidity pool, a single oracle, or a single governance actor has a manifold whose geometry is critically shaped by those dependencies.

**P:** The perturbation field has distinctive properties in crypto: high intensity, rapid tempo, and strong correlation structure. Market-wide events (contagion, sentiment shifts, regulatory announcements) produce highly correlated perturbation across the entire field, pushing many systems in the same direction simultaneously. This correlation structure means that redundancy within a single token network may be insufficient — **if nominally independent liquidity sources all share exposure to the same market-wide force, they are independent of each other but not independent of the perturbation. The perturbation can overwhelm all redundant pathways at once when those pathways have similar perturbation-response profiles.** True redundancy in crypto requires liquidity sources and infrastructure components that *react differently to the same shock* — not merely multiple instances of the same exposure.

**R:** Response dynamics in token networks operate through governance decisions, automatic protocol mechanisms (circuit breakers, dynamic fee adjustment), community coordination, and market maker behavior. The speed of R varies enormously: automatic mechanisms respond in blocks (seconds to minutes), governance responses take days to weeks, community coordination is unpredictable. Feedback latency is a critical differentiator between token networks — protocols with on-chain automatic responses have structurally different R than those dependent on multisig governance decisions.

### Salient Invariants

**Dependency concentration** is the most critical invariant. Token networks with high dependency concentration (majority of TVL in one pool, single oracle provider, governance controlled by a small group) have manifolds that are structurally precarious — the high-curvature zones coincide with the most-stressed components.

**Connectivity density** maps onto composability: how many protocols the token integrates with, the structure of those integrations, and whether they create distributed resilience or contagion pathways. **The compartmentalization dimension is critical in DeFi: a token whose integrations span isolated subsystems (e.g., DEX pools compartmentalized from CEX exposure, or isolated relay chains that prevent cross-bridge contagion) has structurally different risk geometry from one whose integrations form a single tightly-coupled web. Modular integration architecture localizes failure; monolithic composability transmits it.**

**Feedback latency** is directly observable: the time between a perturbation event and the system's response (governance action, parameter adjustment, liquidity rebalancing). **But latency alone is insufficient — gain polarity determines whether fast response helps or hurts. Automatic liquidation cascades are fast positive feedback: the system responds quickly but amplifies contraction (each liquidation triggers further price decline, triggering further liquidations). Dynamic fee adjustment and protocol-level buyback mechanisms are fast negative feedback: the system responds quickly and restores toward equilibrium. A protocol with short latency and amplifying gain is structurally more dangerous than one with moderate latency and restoring gain.**

### Characteristic Contraction Modes

**Volume contraction** — liquidity withdrawal reduces the total set of possible network configurations (fewer participants, fewer trading venues, fewer integration pathways).

**Curvature steepening** — dependency concentration creates zones where small movements produce large consequences. A token 90% dependent on a single liquidity pool is in a region of extreme manifold curvature — a small perturbation to that pool produces disproportionate contraction.

**Topological fragmentation** — depegging events, bridge failures, or protocol isolation can sever connection pathways between regions of the state space, making certain configurations unreachable even though the components technically still exist.

### The Hardest Case

**Composability means M(t) is not self-contained.** A token's reachable state manifold is entangled with the manifolds of every protocol it touches. A change in Protocol B's governance can contract Token A's state space without any direct perturbation to Token A itself. The identity boundary is real (the token network is a coherent system) but the manifold extends beyond it.

**Assessment:** This does not break L1, but it reveals a complexity that L1 must acknowledge: the perturbation field P for a composable system includes *manifold dynamics of adjacent systems*. Another protocol's contraction is, from this system's perspective, a perturbation — it alters the set of reachable states by changing what's available through integration pathways.

This is structurally analogous to the forest case (where adjacent land use alters the forest's manifold through edge effects and fragmentation) but more extreme in degree. Crypto composability produces a density of cross-system coupling that makes the perturbation field exceptionally rich and the system's manifold boundary genuinely fuzzy at the edges.

L1 handles this through the perturbation field's coupling specificity: cross-system entanglement is a class of perturbation with specific structural properties (it couples through integration points, it propagates contraction from adjacent manifolds, its intensity depends on the depth of composability). The framework accommodates it, but the stress test reveals that for heavily composable systems, the perturbation field P does as much or more work than M(t) itself in determining risk shape. This is a finding worth carrying forward — it may imply that subscore design for composable tokens must weight P-derived indicators (cross-protocol dependency, contagion pathway analysis) more heavily than M-derived indicators (internal structure).

**Verdict: L0/L1 holds. Composability-driven coupling is accommodated through the perturbation field, but the dominance of P over M in composable systems is a structural finding that should inform subscore design.**

---

## Domain 3: Individual Human Life

### L0 Mapping

**Identity boundary:** The person as a persisting psychological and biological system. Identity continuity is maintained through bodily continuity, memory, personality, social relationships, and self-narrative. The boundary is clear enough for L0 purposes — "this person has fewer reachable futures" is a meaningful statement — even though the philosophical literature on personal identity is vast and unsettled.

**State space:** The set of life-configurations the person could occupy — careers, relationships, health states, skills, locations, social positions, psychological states. Enormously high-dimensional, mostly implicit, and only partially known to the person themselves.

**Branching futures:** Radically underdetermined. From any present moment, the number of possible life-trajectories is immense. Branching is shaped by ability, circumstance, choice, chance, structural opportunity, and constraint.

**Perturbability:** The person is coupled to economic conditions, social dynamics, health risks, political environment, relational changes, aging, and accident. Perturbation is continuous, multi-scale, and deeply intertwined with the person's own actions.

### L1 Primitives

**M(t):** A human life's reachable state manifold is extraordinarily high-dimensional but typically explored only along narrow corridors. Most people's actual trajectories span a small fraction of their theoretical M(t). The manifold is shaped by both external constraints (structural opportunity, economic conditions) and internal ones (skills, health, psychological patterns).

**P:** The perturbation field includes health events, economic shocks, relational disruptions, political changes, and aging. Aging is a distinctive perturbation: chronic, unidirectional, and intrinsic to the system. It is a slow, continuous narrowing force that reduces M(t) over long timescales regardless of other dynamics.

**R:** Response dynamics in a human life include biological recovery, psychological adaptation, social support, learning, and deliberate choice. The response dynamics are distinctively reflexive — the system can observe its own manifold dynamics and adjust its response accordingly (within limits). This reflexivity does not require a new L1 concept; it is a specific structural property of R in this domain: the response dynamics are coupled to a representation of M(t) held within the system itself.

### Salient Invariants

**Redundancy** maps onto the diversity of a person's capacities, relationships, and resources **— specifically, capacities with diverse perturbation-response profiles**. A person with diverse skills, multiple social networks, varied income sources, and robust health has high redundancy — the loss of any single component does not catastrophically contract M(t). **The diversity requirement matters: a person with three income sources all dependent on the same industry has nominal redundancy but collapses under a single sector-specific shock. True redundancy requires that the capacities respond differently to the same perturbation — income sources in uncorrelated sectors, social networks in different communities, skills applicable across different economic conditions.**

**Regeneration rate** maps onto the person's capacity to recover and rebuild after setback — psychological resilience, learning speed, social reintegration capacity, biological healing.

**Dependency concentration** maps onto over-reliance on specific structures: a single income source, a single relationship for all emotional support, a single skill set in a volatile industry.

### Characteristic Contraction Modes

**Dimensional collapse** — loss of a major capacity (health crisis, career collapse) eliminates entire axes of future variation. A person who loses the use of their legs does not just lose some futures; they lose an entire *dimension* of possible futures (those requiring mobility), even as many other dimensions remain open.

**Volume contraction** — accumulation of constraints (financial debt, chronic illness, narrowed social network) progressively reduces the total set of reachable states.

**Curvature steepening** — situations where small choices have disproportionate consequences. A person in precarious financial balance where a single unexpected expense triggers cascading collapse is in a region of steep manifold curvature.

### The Hardest Case

**Agency — the system chooses among its branching futures.** L0 and L1 are deliberately agent-free. They describe systems whose trajectories branch under perturbation without requiring that anything *within* the system selects among branches. But humans choose. Deliberate action is not just response dynamics; it is a system navigating its own state space with intention, foresight, and preference.

**Assessment:** This does not break L0/L1, but it surfaces an important boundary. Agency, in L1 terms, is a specific class of response dynamics: R includes an internal model of M(t) and a selection mechanism that biases trajectory among branches based on that model. This is structurally distinctive — most physical systems do not have this — but it does not require new geometric primitives. The manifold still contracts or expands; the perturbation field still acts; the response dynamics still restore, absorb, deform, or cascade. What agency adds is a *directionality* to R that is internally generated rather than purely reactive.

The L1 framework accommodates this by treating agency as a property of R's structure, not as a separate primitive. This is the right move for L0/L1, which must remain beneath the level of description where agency matters normatively. At L2 and above, agency becomes central — it transforms "containment" from a passive property into something actively exercised. But at L1, it is geometry: some systems have response dynamics that include internal-model-based trajectory selection, and this has structural consequences (it can expand M(t) through foresight, or contract it through poor modeling or biased selection), but it is still R.

**Verdict: L0/L1 holds. Agency is accommodated as a structural property of response dynamics, not a separate primitive. The normative significance of agency enters at L2.**

---

## Domain 4: DAO Governance System

### L0 Mapping

**Identity boundary:** The DAO as a persistent governance and coordination system — defined by its membership, rules, treasury, and shared purpose. The boundary is explicit (membership is typically token-defined or role-defined) but highly mutable — DAOs can and do change their own rules, membership criteria, and even core purpose through governance action.

**State space:** The set of governance configurations the DAO could occupy — decision-making structures, resource allocations, membership compositions, rule sets, strategic commitments. Each configuration determines what the DAO can do and how it does it.

**Branching futures:** Dense branching driven by proposal cycles, voting outcomes, external conditions, member behavior, and the evolution of the DAO's own rules. The future is shaped by collective decision-making processes with inherent uncertainty.

**Perturbability:** The DAO is coupled to member engagement dynamics, external market conditions, regulatory developments, competing organizations, and internal conflict. Perturbation can be external (regulatory threat, market collapse) or internal (governance attacks, participation decay, faction formation).

### L1 Primitives

**M(t):** A DAO's reachable state manifold is shaped by its current rules, its resources, and its membership engagement. Rigid governance rules narrow M(t) (fewer configurations are reachable because the rules constrain transitions). Flexible rules widen M(t) but may reduce coherence. The manifold's geometry reflects the DAO's adaptive capacity — what configurations it *could* reach if conditions demanded adaptation.

**P:** The perturbation field for DAOs has a distinctive internal component: governance itself is a source of perturbation to the system. A contentious proposal, a hostile takeover attempt, or a mass exit event are perturbations that originate within the system's own decision-making structure. The boundary between "normal operation" and "perturbation" is blurry in governance systems — every governance cycle is, in some sense, a perturbation to the prior state.

**R:** Response dynamics operate through governance mechanisms (proposal, debate, vote, execute), informal coordination (community discussion, leadership signaling), and automatic protocol rules (quorum requirements, timelocks, veto structures). The speed and quality of R depend critically on member engagement, governance design, and the clarity of the DAO's identity and purpose. A DAO with engaged members and well-designed governance has strong restoring dynamics (negative feedback gain — governance responses move the system back toward healthy configurations); one with low engagement and captured governance has weak or pathological R (positive feedback gain — responses amplify rather than absorb perturbation, accelerating deformation toward capture, extraction, or dissolution).

### Salient Invariants

**Feedback latency** is the most critical invariant. Governance processes have inherent delays (proposal periods, voting windows, execution timelocks). These latencies determine how quickly the DAO can respond to perturbation. A DAO that requires two weeks to pass any proposal has fundamentally different risk geometry from one with emergency governance mechanisms that can respond in hours. **But latency is only half the picture — gain polarity determines whether governance response restores or amplifies deformation. A rage-quit spiral is positive feedback: members exit in response to perceived risk, which increases risk for remaining members, which triggers further exits. Stake-locking mechanisms and graduated exit penalties are negative feedback: they slow the exit cascade and give restoring governance dynamics time to engage.** A DAO with short latency and amplifying governance dynamics (captured governance that accelerates extractive proposals) is structurally more dangerous than one with moderate latency and restoring dynamics.

**Connectivity density** maps onto member engagement and communication structure. A DAO where information and influence flow through rich, distributed channels has dense connectivity that supports rapid, well-informed response. **The compartmentalization dimension manifests as sub-DAO architecture: DAOs with modular sub-DAOs that serve as firewall boundaries for treasury risk contain deformation within subsystems. A governance failure or treasury exploit in one sub-DAO does not automatically propagate to the parent DAO or sibling sub-DAOs, provided the compartmental boundaries are structurally real (separate treasuries, independent signing authority) rather than merely organizational labels.** A DAO where communication is centralized through a few channels or leaders has sparse connectivity with bottleneck risk.

**Dependency concentration** maps onto governance power distribution. A DAO where voting power is concentrated in a few large holders has high dependency concentration — the manifold's geometry depends critically on those holders' continued engagement and alignment.

### Characteristic Contraction Modes

**Dimensional collapse** — capture of governance by a faction eliminates entire dimensions of future governance configurations. If a single interest group controls all decisions, the DAO's futures collapse to a narrow corridor aligned with that group's preferences, regardless of how large the treasury or membership remains.

**Topological fragmentation** — fork events or irreconcilable factional splits literally fragment the manifold. The DAO's futures bifurcate into disconnected regions that can no longer communicate or recombine.

**Volume contraction through participation decay** — declining member engagement progressively reduces the set of governance actions the DAO can effectively execute, narrowing M(t) even without acute perturbation.

### The Hardest Case

**The system can deliberately modify its own identity boundary.** A DAO can vote to change its own rules, merge with another DAO, fork into two DAOs, or dissolve entirely. This means Condition 1 (identity boundary) is not fixed — the system has the capacity to reshape the very thing that makes it a risk-bearing system at L0.

**Assessment:** This is the most serious challenge to L0 across all five domains. If the identity boundary is self-modifiable, then the continuity condition that makes contraction meaningful is itself at risk.

There are three sub-cases:

*Rule change that preserves identity:* A DAO votes to adjust its quorum requirements. The rules change, but the system persists as recognizably the same DAO. This is normal dynamics within M(t) — the manifold's geometry shifts, but the identity boundary holds. No problem for L0.

*Fork that splits identity:* A DAO forks into two competing DAOs. The original identity boundary is destroyed and two new ones are created. From L0's perspective, the original system ceased to exist, and two new systems came into existence. This is not contraction of M(t) — it is the dissolution of one system and the creation of two. L0 can describe the risk *of* forking (the trajectory toward fork is a contraction mode — topological fragmentation — visible before the fork occurs) but the fork event itself is the termination of one L0 configuration and the initiation of two new ones.

*Dissolution:* The DAO votes to dissolve. The identity boundary is deliberately destroyed. From L0's perspective, the system has reached a terminal state — M(t) contracts to the empty set. This is the most extreme form of contraction: complete loss of reachable futures. It is well-described by L1.

The hard sub-case is the fork. L0 handles it, but with a discontinuity: the framework cannot smoothly describe the transition from "one system with fragmenting manifold" to "two systems with their own manifolds." There is a seam where the identity boundary breaks and reforms.

**Verdict: L0/L1 holds, with a noted limitation. Self-modifying identity boundaries are accommodated (rule changes are dynamics within M(t); dissolution is terminal contraction; forks are system termination and creation). But the fork case reveals a discontinuity in L0's identity framework — the transition from one system to two is not smooth within the existing vocabulary. This limitation should be noted but does not require revision of L0, because the framework's purpose is to describe risk *within* identity-preserving systems, not to describe identity transitions themselves. The risk of forking is fully visible before the fork occurs; the fork event is a boundary condition, not a dynamics problem.**

---

## Domain 5: Mechanical Bridge Structure

### L0 Mapping

**Identity boundary:** The bridge as a physical structure with a defined function (carrying loads across a span). Identity is clear and stable — the bridge is a specific physical object with well-defined boundaries. Identity persists through minor repairs, weathering, and normal use.

**State space:** The set of structural configurations the bridge could occupy — stress distributions, material conditions, joint integrity, foundation states, load capacities. The state space is much lower-dimensional than the other four domains — a bridge has fewer independent axes of variation than a forest, a person, a DAO, or a token network.

**Branching futures:** From any present structural state, the bridge's trajectory branches depending on load patterns, weather, seismic activity, maintenance decisions, and material degradation. The branching is real but narrower than in the other domains — the bridge's evolution is more constrained and more predictable.

**Perturbability:** The bridge is coupled to load dynamics, environmental forces (wind, temperature, water, seismic), material degradation (corrosion, fatigue), and human maintenance decisions. Perturbation ranges from chronic (weather, traffic) to acute (earthquake, overload event).

### L1 Primitives

**M(t):** The bridge's reachable state manifold is relatively low-dimensional, well-mapped, and (in normal conditions) slowly evolving. A new bridge has a manifold defined by its design envelope — the range of loads, conditions, and configurations it can handle. As the bridge ages, M(t) contracts: material degradation narrows the set of conditions the bridge can safely sustain.

**P:** The perturbation field is well-characterized by structural engineering: load distributions, wind forces, thermal cycles, seismic inputs. The coupling between P and the system is understood at a level of detail that far exceeds the other four domains. Structural engineers can model precisely how specific perturbations translate into specific stress states.

**R:** Response dynamics in a bridge are primarily passive — material elasticity, structural redundancy, load redistribution through alternative pathways. Active response (maintenance, repair, retrofit) exists but is external to the bridge-as-physical-system (it is a human intervention on the system, not the system's own dynamics). The bridge's R is dominated by material properties: elastic deformation, plastic deformation thresholds, fatigue characteristics.

### Salient Invariants

**Redundancy** is the primary design parameter. Bridges are engineered with redundant load paths so that failure of any single member does not produce collapse. The degree of redundancy is quantified precisely in structural engineering (redundancy index, degree of static indeterminacy). **The perturbation-diversity dimension is relevant even here: redundant load paths that use different structural mechanisms (e.g., cable stays paired with arch compression, or steel members paired with concrete elements) provide perturbation-diverse redundancy — a failure mode that compromises one mechanism (corrosion in steel) does not simultaneously compromise the other (concrete compression). Identical redundant members share the same perturbation-response profile and may fail together under the same environmental stress.**

**Dependency concentration** maps onto critical structural members — components whose failure produces disproportionate load redistribution. Fracture-critical bridges (those with non-redundant members whose failure causes collapse) are the extreme case of high dependency concentration.

**Regeneration rate** is effectively zero without external intervention. Bridges do not self-repair. Contraction of M(t) through material degradation is irreversible without maintenance — a fundamentally different temporal dynamic from the other four domains.

### Characteristic Contraction Modes

**Volume contraction** — gradual narrowing of the load envelope as materials degrade. The bridge can handle fewer load combinations over time.

**Curvature steepening** — fatigue and corrosion create zones where the difference between "safe" and "failure" narrows to a small margin. The manifold develops steep curvature where small additional loads produce catastrophic contraction (collapse).

### The Hardest Case

**Conventional risk models already work extremely well here.** Structural engineering has mature, quantitative methods for assessing bridge risk: load and resistance factor design, fatigue life analysis, probabilistic structural assessment, reliability indices. These methods are effective, validated against extensive empirical data, and widely deployed.

L0/L1 needs to either add insight or gracefully reduce to the conventional model.

**Assessment:** In this domain, L0/L1 reduces to something very close to conventional structural risk analysis — and that is the correct result, not a failure.

Here's why: The bridge is a system where the state space is low-dimensional, well-characterized, and slowly evolving. The perturbation field is well-modeled. The response dynamics are dominated by material properties that are precisely measurable. The identity boundary is unambiguous. The branching structure is relatively narrow.

In such a system, the full geometric apparatus of L1 collapses to simpler forms:
- M(t) reduces to a load-capacity envelope — a well-defined region of the state space
- Contraction reduces to narrowing of that envelope through degradation
- The perturbation field reduces to load distributions and environmental forces
- Response dynamics reduce to material elastic/plastic behavior
- The morphological invariants reduce to standard engineering parameters (redundancy index, safety factor, fatigue life)

The conventional structural engineering framework *is* L1 for this domain — simplified by the domain's low dimensionality and high characterizability. The conventional framework works so well precisely because bridges satisfy the conditions under which L1's geometric complexity reduces to manageable, quantifiable forms.

**What L1 adds, marginally:** Two things, both modest.

First, L1 makes the *temporal trajectory* explicit. Conventional bridge assessment tends toward snapshot analysis (current load capacity vs. current loads). L1's insistence on trajectory (is M(t) contracting slowly or accelerating? Is the rate of degradation itself changing?) aligns with emerging practice in structural health monitoring but is not standard in conventional assessment. The drift-then-catastrophic-deformation pattern (long gradual degradation followed by sudden failure) is well-described by L1's distinction between drift and deformation.

Second, L1 clarifies the *dependency concentration* concept in a way that connects bridge risk to systemic risk. A fracture-critical bridge is a system with extreme dependency concentration — its manifold geometry depends on single components. This is the same structural concept that applies to a token network dependent on a single oracle or a DAO dependent on a single leader. L1 makes the structural isomorphism visible, even though the domains are entirely different.

**Verdict: L0/L1 holds, by graceful reduction. In the bridge domain, L1 reduces to a framework very close to conventional structural risk analysis. This is expected and correct — bridges are systems where the geometric complexity that L1 describes is naturally low. L1 adds modest value (temporal trajectory, structural isomorphism with other domains) but does not claim to revolutionize bridge risk assessment. The value of L1 is greatest in high-dimensional, densely coupled, rapidly evolving systems — which is precisely why it emerged from crypto.**

---

## Cross-Domain Findings

### What held across all five domains without reinterpretation:

**The four L0 conditions.** Identity boundary, state space, branching futures, and perturbability mapped cleanly onto all five systems. No condition required domain-specific redefinition. The functional test for identity ("Can you coherently say this system has fewer reachable futures?") worked in every case.

**The three L1 primitives (M, P, R).** Reachable state manifold, perturbation field, and response dynamics were applicable in all domains. The *content* of each primitive varied enormously (a forest's R is succession dynamics; a bridge's R is material elasticity) but the structural role was consistent.

**The morphological invariants.** All five invariants (redundancy, connectivity density, feedback latency, regeneration rate, dependency concentration) were identifiable in every domain, though their relative salience varied. This supports treating them as genuine structural properties of risk topology, not domain-specific metrics. **The February 2026 refinements to three invariants — perturbation-response diversity for redundancy, compartmentalization for connectivity density, and gain polarity for feedback latency — were validated across all five domains: each domain's examples already implicitly required the refined reading. The refinements made explicit what the domain stress test had already demonstrated.**

**The contraction modes.** Volume contraction, dimensional collapse, topological fragmentation, and curvature steepening all appeared across domains. No domain produced a contraction mode that required a fifth category.

### What the stress test revealed (structural findings):

**1. The identity boundary is observer-relative but not arbitrary.** The forest and DAO cases both surface this. The identity boundary is a choice of description level, and different choices produce different risk assessments. L0 acknowledges this by defining identity functionally (the continuity condition on M(t)) rather than ontologically. This is a strength, not a weakness — it makes scale-dependence explicit rather than hiding it behind an assumed identity.

**2. In highly composable systems, P dominates M in determining risk shape.** The crypto token network case revealed that when systems are deeply entangled, the perturbation field (which includes adjacent systems' manifold dynamics) does more work than the system's internal manifold geometry in determining its risk topology. This is a finding with direct engineering implications: subscores for composable systems should weight perturbation-field indicators (cross-protocol dependency, contagion pathway structure) heavily.

**3. Agency is a structural property of R, not a separate primitive.** The human life case showed that intentional, model-based trajectory selection is accommodated within response dynamics without requiring new geometric concepts. The normative significance of agency is real but enters at L2, not L1.

**4. Self-modifying identity boundaries create a discontinuity, not a failure.** The DAO case showed that systems which can reshape their own identity boundary are accommodated by L0 (the risk *of* identity dissolution is visible as manifold contraction) but the identity transition itself (fork, merger, dissolution) is a boundary condition that L0 describes the approach to, not the passage through. This is a genuine limitation but does not require L0 revision, because L0's purpose is to describe risk within identity-preserving systems.

**5. L1's value scales with system complexity.** The bridge case showed that L1 reduces to something close to conventional risk analysis in low-dimensional, well-characterized systems. This is correct behavior — L1 contains conventional models as a special case. L1's distinctive value emerges in high-dimensional, densely coupled, rapidly evolving systems where conventional risk models fail because they cannot represent the geometric complexity. The framework earns its keep in exactly the systems (token networks, ecosystems, governance structures) where conventional risk models are weakest.

### No domain required reinterpretation of core concepts.

The stress test passes.

---

## Gate Assessment: Proceed to Artifact 4?

**Recommendation: Proceed.**

L0/L1 survived all five domain tests without requiring domain-specific redefinition of core concepts. The findings (observer-relative identity, P-dominance in composable systems, agency as R-property, fork discontinuity, complexity-scaled value) are enrichments, not failures. They should be carried forward as structural insights that inform the derivation bridge and subscore design.

**Items to carry forward:**

- The observer-relativity of identity boundaries must be explicitly addressed when L2 introduces normative categories — "impact on what, from whose perspective?" becomes a necessary question.
- P-dominance in composable systems should inform subscore weighting at L4.
- The fork discontinuity is a noted limitation that does not require L0 revision but should be documented as a boundary condition.
- The complexity-scaling of L1's value should be communicated clearly: L1 is not a replacement for conventional risk analysis in simple systems; it is an extension for complex ones where conventional analysis fails.

---

## Changelog

**February 2026 — L1 Invariant Refinement Integration**

Domain-specific discussions updated to reflect refined invariant definitions from Artifact 2 (S4.1). All five domains received targeted enrichments:

- **Forest:** Redundancy paragraph adds perturbation-response diversity; Connectivity adds mycorrhizal modularity; R description adds gain polarity (native recolonization vs. invasive establishment).
- **Token Network:** P paragraph sharpens the correlated-perturbation argument using response-profile language; Connectivity adds DeFi compartmentalization; Feedback latency adds gain polarity (liquidation cascades vs. dynamic fee adjustment).
- **Human Life:** Redundancy paragraph adds perturbation-response diversity (uncorrelated income sources, cross-sector skills).
- **DAO:** Feedback latency adds gain polarity (rage-quit spirals vs. stake-locking); Connectivity adds sub-DAO compartmentalization; R paragraph uses explicit gain terminology.
- **Bridge:** Redundancy paragraph adds perturbation-diverse load path design (mixed structural mechanisms).
- **Cross-Domain Findings:** Notes that the refinements were validated by the stress test's own examples.

No domain verdicts changed. No structural findings changed. All updates make explicit what the existing examples already required.
