# NXB-RPT-0002 — Mashet as a Graphical Interface Language for MCP Systems
Date: 2026-11-15 | Status: ARCHITECTURAL PROPOSAL | Audience: interface designers, MCP implementers, NexusBoard AR SkillBlock Office, textbook editors

## 1. Scope and editorial thesis
The intended textbook subject is **Mashet: A Graphical Interface Language for MCP Systems**. Mashet glyphs provide a human-readable and machine-resolvable visual notation for capability discovery, composition, routing, governance, evidence and audit. MCP remains the transport/protocol and typed capability surface. A Mashet glyph MUST NOT be presented as an MCP message type or an official MCP extension by default.

This report concerns **how symbols are used** in communication and operational interfaces, not claims of emergent cognition or a successfully integrated Echo runtime. Applications such as NexusBoard, Echo and Unicorn Estate are case studies, not requirements for using the notation.

## 2. Evidence and provenance status
OBSERVED IN DISCUSSION: the original 23 glyph legend; expansion toward 96; Timothy's recognition of a visual discontinuity at glyph 23/24; diagrammatic flows; operator-like expressions; earlier Android/Pydroid3 scripts; proposed separate Hebrew carrier layer; preference for independent applications and adapters.
PROPOSED: Glyph–MCP bindings, typed schemas, authorization gates, visual workflow actions, research evaluation.
NOT YET VERIFIED: user-study improvements, all 96 canonical glyph definitions, production parser conformance, production MCP adapter interoperability, full end-to-end NexusBoard/Unicorn integration.
Prior report: [NXB-RPT-0001](NXB-RPT-0001-mashet-symbol-usability.md).

## 3. Canonical first 23 reference glyphs
| No. | Glyph | Working meaning | Possible UI/MCP role, **not** normative |
|---|---|---|---|
| 01 | ☉ | internal dynamics | current scope/context/status |
| 02 | ⇢◇ | external forcing/input | intake event/resource reference |
| 03 | ∫↺ | memory/accumulation | source retrieval and history |
| 04 | ⧖ | coupling | relation/coordination request |
| 05 | ≋ | noise/stochasticity | uncertainty cue |
| 06 | ⌖ | constraints/stability | policy/constraint check |
| 07 | ⚖ | energy/fitness/optimization | assessment/review request |
| 08 | ⤓ | selection/adaptation | select/routing choice |
| 09 | ⊕ | summation/composition | aggregate results |
| 10 | ⟲ | recursion/iteration | repeat/loop controller |
| 11 | ♢ | potential/possibility | draft/hypothetical proposal |
| 12 | ⊗ | interaction/cross-coupling | multi-capability composition |
| 13 | Δ | change/update | proposed state mutation |
| 14 | Φ | projection/feature mapping | transform/view projection |
| 15 | Ψ | feedback/adjustment | feedback submission |
| 16 | Λ | threshold/activation | conditional gate |
| 17 | Ω | limit/saturation | limit and boundary indicator |
| 18 | μ | mean/cohesion | aggregate statistic |
| 19 | σ | spread/variance | variability metric |
| 20 | λ | eigenvalue/stability indicator | stability analysis |
| 21 | ∇ | gradient/directional flow | optimization direction |
| 22 | ⊥ | orthogonality/independence | isolation or independence rule |
| 23 | τ | time delay/lag | delay and temporal annotation |

The *working meaning* column preserves the earlier Mashet legend. The rightmost mapping is a proposal and may be revised after use-testing. Do not silently substitute ⟲, ⟳, and ↺, or ⇢ and ⇢◇. Do not equate the operator vocabulary with Hebrew carrier glyphs (e.g. א, מ) or inert cell ⟐.

## 4. Formal interpretation layers
**Layer G0 — Identity:** exact Unicode sequence, stable glyph ID, name, version, aliases, font/rendering guidance and accessibility label.
**Layer G1 — Grammar:** token classes (operator, state, carrier, modifier, connector, control), composition, nesting, references, source locations, precedence and ambiguity handling.
**Layer G2 — Typed capability binding:** namespace, server identity, protocol/version compatibility, actual MCP primitive (tool/resource/prompt), discovery response, input/output schemas, known errors, side effects and time limits.
**Layer G3 — Governance:** authenticated actor, role, resource authority, jurisdiction, consent/approval, authorization expiry, revocation and fail-closed decision.
**Layer G4 — Execution evidence:** request ID, pinned arguments, tool/server identity, result/exception, timestamps, version, provenance, observer-versus-inference classification and audit receipt.
**Layer G5 — Visual interaction:** diagrams and evidence index cards that reflect the layers above, with accessible labels and mobile touch targets.

**Invariant:** a visual glyph or discovery result conveys no permission to invoke a tool. The owning service validates every request.

## 5. Example composition (illustrative)
An evidence relation workflow may be visually written:
`⇢◇ → Φ → ⧖ → ♢ → ⌖ → ⚖ → Δ → ∫↺`

This is a schematic sequence, not an executable program until a grammar, bound capability schemas and server authority are supplied. An AR SkillBlock Office might resolve `⧖(source_id, target_id)` to a server tool named `mashet.relation.couple`, returning a **proposed** relation with evidence; only `Δ` after authorization could commit a durable change. The actual MCP server—not the glyph parser—enforces authenticated access and writes.

## 6. Evidence index-card contract
An index card should carry: stable card ID; immutable source URI/reference; source version/commit/hash; privacy classification; observation text or source pointer; inferred interpretation stored separately; confidence/uncertainty when measured; graph relation candidates; linked capability IDs; required roles; permitted actions and their side effects; provenance chain; approval/denial record; execution receipt; reviewer and timestamp. Source content from private repositories remains restricted.

## 7. NexusBoard System Entity operation
Committees specify review jurisdictions. AR SkillBlock Office catalogs MCP capability descriptors and matching glyph grammar. Agent requests are routed through explicit host/client/server interactions, authenticated policy and resource ownership. Source evidence remains separate from derived conceptual relations, and hypothetical expression construction remains separate from authorization to commit. Independent adapters preserve application state and history.

## 8. Known difficult cases
- Alias collisions, visually similar Unicode, inaccessible fonts, Android entry, screen-reader fallback.
- One glyph mapped to several candidate capabilities: require disambiguation rather than guessing.
- Different domain clocks, persistent stores and authority models: use typed adapters and explicit source identity.
- Capability discovery without effective authorization: deny and explain.
- Failed, expired, revoked, stale, conflicting and indeterminate operations: show honest status and no false success.
- Offline and interrupted operations: no implicit write retries without idempotency/compensation guarantees.
- Incomplete sources and stale issue inventories: preserve UNKNOWN/UNREAD labels.

## 9. Research and textbook program
Study recognition, learnability, composition errors, semantic drift, keyboard entry, accessibility, graph comprehension, operator precision, evidence review time, and mistake recovery. Compare glyph-only, glyph+text, and conventional text/flowchart alternatives using independently defined measures and blind/held-out evaluations where appropriate. Do not infer benefits from demonstrations alone.

Treat this report as a textbook source, not a chapter automatically cleared for sale. Publication requires rights review, source verification, editorial changes and Timothy's explicit release approval.
