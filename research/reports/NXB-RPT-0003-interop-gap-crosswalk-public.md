# NXB-RPT-0003 — Cross-System Integration Gaps and Glyph–MCP Crosswalk (Public-Safe)
Date: 2026-11-15 | Status: PROPOSED / NOT RUNTIME VERIFIED

## Source sensitivity
This synthesis was informed by **restricted repository issue discussions**. Do not publish their private bodies, verbatim excerpts, identifying private data or non-public implementation details in this public repository. Preserve the private-source crosswalk in the authenticated Neon Documentation Catalog when its schema and access controls are ready. This public document discusses generalized architectural requirements only.

## Recovered class of problem
Independent components frequently define their own state, permissions, clocks, persistence and evidence. The missing piece is often not another compute engine but explicit, audited boundary contracts. Preserve observations vs interpretations, learning vs storage, hypothetical reasoning vs authorized action.

## Proposed interoperability crosswalk
| Gap family | Proposed glyphs | Contract to define | Acceptance evidence |
|---|---|---|---|
| Component identity/lineage | ☉ ⌖ Φ | stable component/capability IDs, version pins, source and lineage | verified discovery and provenance |
| Typed exchange across components | ⇢◇ Φ ⊕ | typed input/output, schema versions, translations, errors | contract validation and negative cases |
| Authorization & commit | ♢ ⌖ ⚖ Δ | proposed vs authorized vs committed, actor identity, policy, expiry | denied write causes zero mutation; durable receipt for valid write |
| Runtime coordination, memory, recovery | ⧖ ⟲ ∫↺ τ | scheduling, state ownership, idempotency, checkpoints | interruption/restart/replay with state comparison |
| Independent evaluation | ⚖ ≋ σ | assertion ledger, confidence, baseline, reproducibility | evidence distinguishes assertion and observed result |

## Minimum demonstrator specification
Sourced intake → preserve raw observation → infer proposed relation → resolve typed MCP tool → evaluate authorization → request separate commit from state owner → receive durable provenance receipt → restart → retrieve and independently verify. Distinguish stored record from learned capability. Test only after prospective repo Issue/Discussion publication and later actual-result update in same thread; no test executed by this document.

## Design constraints
Independent architectures keep their identities, clocks and state models. No source merging is authorized by this crosswalk. MCP is the host/client/server interoperability layer; glyph grammar is a separate UI/notation layer. No glyph invocation overrides service authorization. Private evidence remains restricted.

## Publication role
An anonymized, evidence-qualified case study for Part IV of *Mashet: A Graphical Interface Language for MCP Systems*. Verify each factual statement before commercial inclusion.
