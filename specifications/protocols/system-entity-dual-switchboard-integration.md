# NX-SB-001 — Corporate System Entity + Double Protocol Matrix + Neon Dictionary Cover
**Origin:** Timothy, conversation "Protocol Switchboard Interface", 2026-11-13.
**Status:** Integrated development components and tests; **not** remotely deployed or end-to-end authenticated. 
**Experiment record:** [Issue #4](https://github.com/AGI144348Outlook/NexusBoard/issues/4).
**Parent brainstorm:** [Issue #3](https://github.com/AGI144348Outlook/NexusBoard/issues/3).

## Timothy's integration request — preserve source intent
Timothy wants the **System Entity's persistent Neon memory**—index/evidence cards, catalog boxes, contextual definitions, and the Evidence Board networking system—to act as **the dictionary's backend body of content** with an **interactive OpenDiagram Dictionary Cover**. In parallel, a **Cloudflare Durable Object** should embody enduring System Entity identity and expose its **parent MCP server**, wrapping other independently persistent DOs as **corporate Agents/seat services**. A second *Agent × Agent* intersecting-cell protocol switchboard/control panel should route those agents according to the corporately incorporated information-processing and router system. Both app-level and agent-level matrices should interoperate while preserving all agency, source and evidence boundaries.

The terms *Dictionary Body*, *Cover*, *Matrix Cell*, *Patch Cord*, *Severable Connection*, *Catalog Box*, *Evidence Network*, and *Corporate System Entity* are retained as useful architectural identifiers. Clarifications and implementation proposals below are not retroactively attributed to Timothy.

## Integrated conceptual route

1. **Owner / authenticated operator** → parent **SystemEntity DO** (stable DO identifier, operating identity, route leases, audit-local state).
2. **Corporate Matrix** (current `nb.positions` × positions) → only independently authorized links allowed by `nb.authority` **and** `nb.services`. A registered operational agent receives its own named **CorporateAgent DO** for idempotent checkpoint and message-envelope receipts. The *office* and the *agent runtime* are not interchangeable.
3. **Application Matrix** (service/app × service/app) → versioned `switchboard.protocols` with described steps, status and explicit auth policy. A proposed cell is **not** a deployed path.
4. A permitted agent/corporate workflow may invoke authorized application capabilities. **Neon** persists the source and the epistemic state, while **DOs** preserve operational identity/state. Rights remain governed by the callee.
5. **Neon `card_protocol.card_revisions`** holds the contextual source-unit / index card catalog and its revisions. **Neon `evidence_net.nodes/edges`** holds source-grounded claims and relations. **Neon `nb.*`** remains the corporate roster/authority source.
6. **OpenDiagram** obtains the authorized graph through its **server-side proxy** (owner account allowlist + secret backend token) and renders exactly those recorded Neon relationships on its native Whiteboard. Browser layout cannot silently promote a relationship to a fact. A future governed mutation endpoint can submit *proposals* only.
7. **Provenance of capability vs operation:** discovered `tools/list` evidence, implemented adapter/capability evidence and individual invocation success/failure receipts remain separate evidence tiers. A completed call does not confirm empirical truth.

## What "wrapped" actually means (implementation boundary)
- Parent Worker exposes an **initial MCP Streamable HTTP tool surface** at `/mcp` with corporate and evidence read actions, guarded local state and route operations.
- Named Agent DO instances can expose an **internal MCP-style tool surface** to their parent router; they do *not* become independent publicly reachable endpoints or automatically receive an LLM/model simply because a DO exists.
- **Corporate interoffice routing** validates both registered agents, a direct authority edge, and the target's enabled service. There is no unrestricted corporate full mesh. Routing failures leave auditable operation status, not fabricated completion.
- Stable per-entity and per-agent DO IDs preserve local identity across object restarts; production tenancy, OAuth/seat scopes, revocation and rate limiting remain to be implemented before a connected public service is safe.

## Two distinct matrices / one evidence manual
| Matrix | Axes | Cell meaning | Evidence behind button |
|---|---|---|---|
| **Application / MCP switchboard** | Dictionary, Neon Board, Catalog Box, OpenDiagram, System Entity, other apps × same | Directional capabilities of *two* logically isolated services | advertised tool schema, mapping/protocol version, policy, recorded effects |
| **Corporate / Agent switchboard** | Corporate position/Agent × position/Agent | Directed, independently authorized interoffice service routing | seat charter, source/target registration, `nb.authority`, `nb.services`, mission and receipt |
| **Higher-order route** | Composed cell-to-cell path | Multi-hop purpose-specific workflow with explicit per-hop authorization | sequential dependency/evidence network; partial failure and compensation separately logged |

For an N×N display, cells can be computed from a sparse registry instead of preprovisioning N² runtimes. Reversed [A,B] and [B,A] connections need not have symmetric permissions. A telephone patch cord is an analogy for a logical revocable route, not necessarily a persistent TCP circuit.

## Reality check as of 2026-11-13
- **Neon development**: existing `nexusboard-inc` development branch has `nb.*`, `evidence_net.*`, `card_protocol.*`; `switchboard.*` migration created with 6 app records and 5 proposed protocol bindings. At inspection: 13 corporate positions, 2 registered agents, 5 `nb.authority` edges. Evidence content was a **tiny development fixture**, not the complete Echo WordNet corpus.
- **Cloudflare**: committed and locally verified Worker + two named SQLite DO bindings; 6 unit tests and a three-assertion local DO identity/auth smoke passed. **No Cloudflare deployment or production owner auth**.
- **OpenDiagram**: private development branch has source-only schema + native Whiteboard dictionary page, app protocol matrix and corporate matrix. Four validation tests and TypeScript checks passed. The Vercel preview was queued at the last check and no backend secret/proxy was provisioned.
- **Full WordNet source graph**: Echo ECHNP-001 previously indexed WordNet to CI artifacts. The corporate Neon memory has *not* imported that corpus. It should be ingested carefully with source IDs/revisions and quota check rather than assumed present.
- **No live cognition claim:** Persistent operational identities + typed tools do not, by themselves, constitute intelligent corporate agents. Future model/runtime and authorized mission processing must be separately implemented and verified.

## Ordered completion conditions
1. Verify Cloudflare deployment authorization and securely publish System Entity gateway with per-seat service identities and OAuth/least privilege (no hardcoded API secret in repo).
2. Configure the existing OpenDiagram deployment's **server-only** gateway URL and token, plus explicit NexusBoard owner allowlist; verify independent OpenDiagram user session/authorization, no browser credential leakage.
3. Run documented, authorized end-to-end **read** test: owner → DO gateway → existing Neon evidence graph + versioned card → OpenDiagram Whiteboard; report graph revision/provenance and absence of inferred links.
4. Validate agent registered-seat DO durability and authorized/denied interoffice message routing under independent charter scopes. Do not instantiate every conceptual seat as a live agent by fiat.
5. Import/attach the dictionary corpus and source manifests incrementally, reconcile nested evidence networks, and add governed proposal/write flows only after separate preregistered tests and approvals.
6. Verify both independent mobile matrices, severability/revocation and evidence of invocation. Retain previous versions of this design and actual test receipts.

## Published evidence
- [NexusBoard implementation test thread](https://github.com/AGI144348Outlook/NexusBoard/issues/4)
- Existing [Protocol Switchboard Matrix Manual](./protocol-switchboard-matrix-v0.md)
- [Original corporate architecture](../../ARCHITECTURE.md)
- [NexusBoard corporate gateway interface](../interfaces/corporate-gateway.md)
- [Interoffice charter protocol](./constitutional-interoffice.md)

**This is a live development record, not an assertion that every phase above has been completed.**
