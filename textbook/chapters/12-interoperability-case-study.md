# Chapter Draft — Interoperability Gaps as a Graphical Grammar Case Study
Status: Public-safe conceptual case study — implementation not independently verified

## Scope
A restricted architectural recovery effort surveyed multiple independent symbolic, memory, agent, execution, environment and governance components. Its generalized conclusion was that independently defined component contracts may be more mature than the contracts *between* them. This chapter does not reproduce private source records or identify protected implementation details.

## What a shared graphical language can and cannot do
A shared glyph vocabulary can display boundary responsibilities, make workflow stages inspectable and help operators anticipate where authorization and evidence are required. It cannot by itself reconcile incompatible persistence, execution clocks, permissions or schema versions. Those require adapters, typed messages and service-enforced policies.

## Five recurring contract gaps
**Discovery and lineage:** identify a capability, its source and compatible version before mapping it to a glyph.
**Exchange:** specify typed requests/results, data transformations and error states between independent components.
**Commit:** distinguish a proposed/imagined action from authorized external mutation.
**Recovery:** preserve source-owned state, idempotency, checkpoints, clocks and restart/replay semantics.
**Independent evidence:** distinguish data stored, capability verified and learning demonstrated.

## Annotated visual sequence
`⇢◇ → Φ → ⧖ → ♢ → ⌖ → ⚖ → Δ → ∫↺`

Read as intake, derived interpretation, proposed relation, uncommitted possibility, constraint check, assessment, authorized change, and subsequent retrieval. This is a design illustration rather than a functioning implementation. Any stage may return FAILED, DENIED, STALE or UNKNOWN.

## Minimum implementation study
Build a minimal adapter with actual MCP capability discovery, immutable source identity, policy-denied negative cases, review state, durable commit receipts and restart verification. Publish prospective plans before repository tests and report actual negative and positive results in the same issue. Compare the glyph UI with a conventional labeled flowchart using independent metrics.

## Editorial privacy and evidence
Private repository issue discussions remain accessible only to authorized reviewers. Publication uses generalized classes of findings and specifically cleared citations. Distinguish hypotheses from verified behavior.
