# Artifact 0: Purpose and Scope Declaration
## Risk Ontology Stack — Xerberus
**February 2026**

---

## What We Are Building

A layered ontology of risk, structured as a stack from foundational substrate through to engineering specification, that grounds the Xerberus subscore architecture in something deeper than convention or intuition.

The stack has five layers:

| Layer | Name | Function |
|-------|------|----------|
| L0 | Ontological Substrate | What must be true for risk to exist at all |
| L1 | Topological Risk | How risk behaves as geometry — manifold contraction, invariants, deformation |
| L2 | Operational Risk | The triadic decomposition (probability, impact, containment) derived from L1 |
| L3 | Capital Morphology | L0/L1 interpreted for economic systems — capital as generative pattern |
| L4 | Subscore Architecture | Engineering decisions constrained by the layers beneath |

---

## Why We Are Building It

We have been operating on a set of implicit premises — that risk is relational, that capital is morphological, that shape matters more than score — and those premises have produced good results. But we have not formalized the foundation beneath them. This creates three practical problems:

**1. Design drift.** Without a grounded ontology, subscore design decisions get made on instinct or analogy. Some will be morphologically aligned; others will quietly revert to conventional assumptions. We can't tell which is which without a reference structure.

**2. Integration failure.** The triadic operational layer (Simon's formulation) and the morphological layer (Capital Morphology) feel related but not yet unified. The "sloppy and unintegrated" feeling reported in working documents is a symptom of missing intermediate layers — specifically L0 and L1.

**3. Communication collapse.** If we can't articulate why our approach is structurally different from conventional risk taxonomy, we will either undersell it (presenting morphological insights in conventional packaging) or overclaim it (using philosophical language without engineering substance).

---

## Primary Purpose

**The primary purpose of this ontology stack is operational: to produce design constraints that make Xerberus risk ratings structurally better than conventional approaches.**

"Better" means: ratings that capture relational dynamics conventional models miss, that preserve morphological shape rather than collapsing into weighted averages, that support temporal analysis, and that can be validated against observed system behavior.

Philosophical robustness is a quality constraint, not a goal in itself. L0 and L1 must be sound — they must survive stress-testing across domains, they must not be circular, they must not depend on the frameworks built on top of them. But the test of soundness is whether they produce engineering clarity, not whether they satisfy a metaphysics seminar.

---

## What "Done" Looks Like

### For L0 (Ontological Substrate):
- A single-paragraph definition that is framework-independent (no Capital Morphology language)
- A set of minimal necessary conditions that are genuinely minimal (removing any one of them eliminates risk)
- Three "wrong ontologies" that fail in identifiable ways, clarifying L0 by contrast
- Survival across five domain stress tests without requiring domain-specific reinterpretation

### For L1 (Topological Risk):
- A geometric description of risk (manifold contraction under perturbation) that is precise enough to be non-metaphorical
- A defined set of morphological invariants that can, in principle, be measured
- A clean derivation of the operational triad (probability, impact, containment) as projections of L1
- Ethical neutrality — L1 describes risk in a virus and a DAO using the same structure

### For the full stack:
- Every subscore design constraint in Artifact 5 traces back through L4 → L3 → L2 → L1 → L0
- No layer depends on a layer above it
- Capital Morphology is revealed as a special case (economic interpretation of L0/L1), not the foundation

---

## What Is Out of Scope

- A complete mathematical formalization of L0/L1. Semi-formal precision is sufficient if it constrains engineering decisions. Full formalization is a future project if the framework proves its worth operationally.
- A general theory of economic ecology. The ontology should be general enough to apply beyond crypto, but we are not writing a treatise. Generality is tested via the stress test, not pursued for its own sake.
- Resolving every open question in the optimization market or subscore governance design. Artifact 5 will identify which design decisions the ontology constrains and which remain open for other reasons (incentive design, user experience, constitutional alignment).

---

## Decision Rule for Depth

When working on any artifact in this stack, the standing question is:

> **Does this distinction produce a different design decision at L4?**

If yes, the distinction is worth formalizing. If no, note it as philosophically interesting and move on. This rule prevents infinite descent into abstraction while preserving rigor where it matters.

---

## Sequence and Gate

The artifacts are built sequentially: 0 → 1 → 2 → 3 → [GATE] → 4 → 5.

After Artifact 3 (Domain Stress Test), we pause and assess. If L0/L1 break in any domain, we loop back and revise before proceeding to the derivation bridge. The gate exists because it is cheaper to fix a foundation than to build on a cracked one.
