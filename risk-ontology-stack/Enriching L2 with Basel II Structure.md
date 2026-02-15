---
up: 
related: 
created: 2026-02-12 11:01
---
## Enriching L2 with Basel II Structure

The U-I-K triad as currently positioned is already doing the work of Basel II's credit risk decomposition at a conceptual level, but there are specific Basel II structures that would genuinely enrich L2 (of the ontology stack) — not just as communication bridges, but as engineering improvements. The key is to take what Basel II got structurally right while being clear about where it hits limits that L1 transcends.

**What Basel II got right that we're underusing:**

The core Basel II credit risk formula decomposes into PD (Probability of Default), LGD (Loss Given Default), and EAD (Exposure at Default). Our triad maps PD → Uncertainty, LGD → Impact, and Containment roughly occupies the space where Basel II puts capital buffers and risk mitigation. But there are three Basel II concepts that could sharpen our L2 without compromising L1:

**EAD as a distinct parameter.** Basel II separates "how bad is the event" (LGD) from "how much is exposed to it" (EAD). Our current Impact dimension collapses these. In L1 terms, LGD is about manifold curvature — how deep the deformation goes — while EAD is about manifold volume under that curvature — how much of the system's state space sits in the deformation zone. Separating these at L2 would preserve more L1 shape information in the operational projection. For a token network, the difference matters: a governance failure might produce deep deformation (high LGD-equivalent) but only affect a small portion of the system's functional capacity (low EAD-equivalent), or it might produce shallow deformation across the entire system. These are structurally different impact geometries, and Basel II's separation captures this distinction.

The communication benefit is real: institutional users already think in EAD terms. The engineering benefit is also real: it gives our impact subscores a natural decomposition into severity and scope that maps cleanly onto L1's contraction modes (depth of deformation vs. breadth of deformation).

**The correlation factor (R).** Basel II's asset correlation parameter is a primitive version of what L1 calls perturbation field correlation structure. Basel II uses it to adjust capital requirements based on how correlated an asset's default risk is with systemic conditions. This is exactly the stress test finding from Part 3 — that in composable systems, P dominates M. Basel II's correlation factor is a scalar compression of that insight, but it's a useful one because it gives us a way to operationalize P-dominance at L2 without requiring the full perturbation field geometry.

For crypto tokens specifically, this could manifest as a composability correlation adjustment: how much does this token's risk shape co-move with the broader DeFi perturbation field? A token with high correlation to systemic perturbation has a fundamentally different risk profile than one with the same internal invariants but low systemic coupling. Basel II already has the math for incorporating this, and our users in TradFi-adjacent positions will immediately understand what it means.

**The maturity adjustment.** Basel II adjusts capital requirements based on the time horizon of the exposure. This is a crude version of L1's temporal dynamics — the recognition that a system's risk shape changes over time and that longer horizons carry more trajectory uncertainty. We won't want Basel II's specific maturity formula (which assumes certain distributional properties that don't hold in crypto), but the concept of a temporal adjustment factor that modifies the triadic profile based on the assessment horizon is structurally sound and would push our users toward thinking temporally rather than in snapshots.

**Where to stop:**

Basel II's actual calculations assume normally distributed losses with specific adjustment factors calibrated to banking portfolios. Those distributional assumptions are exactly the kind of thing L1 critiques — they impose a specific shape on what might be structurally different geometries. So the enrichment should be conceptual and structural (adopt EAD separation, correlation factor, maturity adjustment as L2 concepts), not computational (don't import Basel II's specific formulas, which embed banking-specific distributional assumptions).

The communication framing would be something like: "Our L2 operational layer extends the Basel II risk decomposition — same structural logic (probability, severity, scope, correlation, containment), but calibrated for the dynamics of token networks rather than banking portfolios, and grounded in a geometric framework that captures relational structure Basel II's distributional assumptions can't."

This positions us as legible to institutional users while making a clear claim about where we go beyond the conventional model. It meets the market where it is, while creating a visible on-ramp to the deeper morphological view. 
