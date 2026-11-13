# Protocol Switchboard Interface — Matrix Protocol Manual (v0.1 PROPOSAL)

**Status:** Brainstorm / design proposal, not an implemented MCP gateway or a registered ChatGPT skill.
**Discussion:** [NexusBoard #3](https://github.com/AGI144348Outlook/NexusBoard/issues/3).
**Date:** 2026-11-13. **Authorial origin:** Timothy's two-axes intersection/cell concept, with interpretive architectural formalization recorded distinctly below.

## Original concept — preserve the author's terms

- Isolated Apps each plotted onto both **columns** and **rows** of a Matrix.
- Matrix as **Protocol Switchboard**. Row/column intersections are plotted **Cells**.
- Each intersecting Cell **is the interface** between the two isolated Apps.
- A Cell contextually defines which connections bridge those Apps' isolation.
- Protocoling Logic resides underneath the frontend surface of the Cell.
- The Cell displays invokable tool/capability buttons; each button has its own underlying backend protocol logic, turning it into an interfacing connection.
- The backend indexes evidenced App capabilities, composes those capabilities into contextual protocols, and networks *evidence of capabilities and their relationships* into a larger Evidence Network.
- Protocol Logic is a composed, ordered network of evidenced logic operations. The Protocol Manual specifies this relationship between surface controls, invocable routes, capabilities, dependencies and audit evidence.
- Distinct but cooperating **Skills switchboard** (contextual logic/manual) and **Meta-MCP switchboard** (actual runtime/tool routing) may be useful.
- Conversation name supplied by Timothy: **Protocol Switchboard Interface**.

The items above record the originator's proposed components. The formal representation below is an **assistant interpretation to evaluate**, not an unapproved settled requirement.

## Interpreted model: an intersection as an addressable contract

Let the installed/connected application's stable identifiers be A = {a0, a1, …, an}.
Rows and columns both enumerate A. A matrix cell M[i,j] is an **interface binding** from source app ai to destination app aj, backed by a shared pair-contract P{ai,aj}. Distinguish directed M[i,j] from M[j,i] (same participating apps, potentially different permitted actions and sequences). Diagonal M[i,i] represents same-app capabilities or self-inspection, not a cross-app bridge.

A shared pair-contract specifies:
- Participating apps, their actual endpoint identifiers, status, supported schema/transport, auth requirements, data domains, effect types, version and provenance.
- A **capability registry** of discovered tools/resources/prompts, with independently evidenced descriptions and versioned schemas. Listing is not proof that a capability works.
- One or more **ProtocolBindings** (the buttons) that represent purpose-specific compositions of the pair's verified available capabilities.
- Each ProtocolBinding: stable ID, UI label, intended effect, arguments/output shape, applicability/policy predicates, executable logic, state transitions, preconditions, approval requirements, compensating steps, and evidence/observability channels.
- Recorded actual invocation receipts as separate evidence from tool-description metadata.

A two-way interface does **not** require unrestricted bidirectional privileges or a fully connected network of apps. The callee retains independent authorization.

## Three planes behind every matrix cell

1. **Presentation plane (cell + buttons):** exposes pair-specific capability buttons and explanations. A button is actionable only when a live binding exists and the caller is authorized; otherwise indicate prototype/disabled/unavailable.
2. **Contextual protocol / skills plane:** decides which route is relevant, why, with which schema, what dependencies and evidence are needed, and how to react to failure. Skills are instructions, **not** authorization or service connectivity.
3. **Execution and evidence plane (Meta-MCP):** capability discovery, gateway adapter calls, identity/policy enforcement, durable execution, audit, artifacts, revisions, receipts, and optional rollback/reconciliation.

## Evidence network for capabilities and their sequential logic

Record relationships among the following **different kinds** of entities:
- App A (registered identity).
- Server S and versioned capability C (provenance of discovery: observed `tools/list`, specification, test receipt, availability).
- Pair-interface P{A,B} and directed cell M[A,B].
- ProtocolBinding B (the button and workflow).
- ExecutionStep K (tool call and transforms; ordered dependencies).
- Outcome E (results, errors, timestamps, correlation IDs and provenance).

Example:
`Neon.capability:read_graph` --[requires_output_mapping]--> `OpenDiagram.capability:render_graph`
A **source-evidence** edge attests that each capability was advertised; an **implementation-evidence** edge identifies actual connector code; a **runtime-receipt** attests that a particular invocation succeeded or failed. Do not treat a list of capabilities as evidence that a combined workflow was executed.

Sequential protocols can be linear for simple cases; more generally, represent dependencies as a **directed acyclic workflow graph** with conditional branches, retries and compensation; retain causally ordered execution records. A cycle of *semantic evidence references* is allowed and is distinct from an unbounded workflow cycle.

## Example intersections (PROPOSED, NOT LIVE)

| Row ↔ Column pair | Candidate cell-button | Required backend protocol |
|---|---|---|
| WordNet Dictionary ↔ Neon | Index definition evidence | Resolve source/synset → tokenize all definition words (including prepositions) → persist provisional source graph with pinned provenance |
| Neon ↔ OpenDiagram | Visualize evidence graph | Read committed graph revision → convert source-only graph → render → record visualization receipt |
| OpenDiagram ↔ Neon | Propose semantic edit | Select existing graph context → validate actor and source IDs → propose typed edge (not auto-approve) → commit in guarded transaction → refresh revision |
| GitHub ↔ Neon | Register verified blueprint | Read pinned source commit and manifest → validate provenance → attach proposed record to catalog |
| WordNet Dictionary ↔ OpenDiagram | Explore hypernym path | Source sense resolution and native link read → source-only path renderer, no invented links |
| GitHub ↔ OpenDiagram | Visualize pinned design spec | Read allowed repository specification → translate only supported structure → render with source refs |

Neon Catalog Box and Evidence Board are separate **Neon subdomains**, not automatically independent external applications. They can occupy their own virtual axis slots if the switchboard models logical services rather than only physical apps. The UI should disclose that distinction.

## Suggested minimal schema (design only)

`AppRecord(id, kind, endpoint_ref, auth_profile, discovery_status, version)`
`Capability(id, app_id, name, input_schema_ref, effect_class, discover_receipt, status)`
`InterfacePair(id, app_a, app_b, policy_ref, version)`
`CellBinding(pair_id, source_app, target_app, button_id, protocol_id, presentation_status)`
`Protocol(id, version, purpose, preconditions, steps, outcome_schema, approval_rule)`
`ProtocolStep(id, tool_ref, inputs_from, dependency_edges, compensation_ref)`
`EvidenceRecord(id, source_type, subject_ref, claim, source_ref, observation, assessed_state)`
`InvocationReceipt(id, protocol_id, actor, time, step_outcomes, evidence_refs)`

Do not assume a SQL schema migration or real transport has occurred merely because these records are drafted.

## Design consequences, constraints, open questions

- Dense matrix with N apps has N² cells; avoid registering or refreshing all routes blindly. Materialize active cells or search/filter groups, and make large matrices navigable on Android.
- Shared pair policy and versioned directional bindings prevent accidental contradictory implementations at [A,B] and [B,A].
- Capability discovery != invocation != authorized effect != independently confirmed success.
- Buttons cannot be inert when represented as live controls; before deployment, the interface is a **concept explorer** showing proposed bindings.
- Consider whether virtual apps (subsystems) and physical apps share the same axes, or require nested/multi-axis matrix layers.
- Skills need to define *when and why*, MCP tools define *what can be invoked*; user confirmation/policy defines *what may be executed*.
- Preserve raw brainstorm lists and chronological corrections; don't collapse evidence or cognitive reasoning into button-click status.
- How should the matrix handle 3+ app workflows? Proposal: a cell can contain a two-party binding and link to a higher-order composed workflow, without pretending pairwise connections prove end-to-end interoperability.
- How do we express discovery provenance and time-varying tool availability? Proposed evidence receipts with timestamps and source versions.

## Progress and test boundary

This file is solely an architectural proposal. No MCP endpoint, ChatGPT skill installation, application connector, authorization delegation, or repository test is claimed. Before any future test in a GitHub repository, pre-register it in an issue/discussion per Timothy's instruction and report observed findings in the same thread.

## 2026-11-13 — Historical telephone patchboard analogy: severable connections (PROPOSED)

### Timothy's original conceptual extension
Timothy compared the Matrixed Protocol Switchboard to the older **human-operated telephone switchboard**, where an operator plugs a patch cord into two distinct subscriber jacks to establish a **severable connection** between previously disconnected lines. He asks whether digital servers are analogues of analogue operator switchboards. This originated as a *conceptual model*, not a claim that an MCP gateway literally creates a permanent end-to-end circuit.

### Architectural interpretation for discussion
A generic server is **not** necessarily a switchboard. An authenticated **MCP gateway/orchestrator**, together with its operator runtime and capability registry, is a better analogue of the switchboard system. The historical operator is analogous to an authorized human or reasoning agent acting via workflow instructions; the switchboard mechanism is the governed gateway; the cord/patch is a scoped interface binding/session.

| Manual phone system | Proposed Protocol Switchboard |
|---|---|
| Subscriber/line | Isolated application or logical service |
| Physical jack/port | Explicit MCP tool, resource or interface endpoint |
| Cord with two plugs | Versioned pair-interface / protocol binding from source to destination |
| Operator selecting and connecting | Authorized human or agent selecting a contextual skill and invoking routing through gateway |
| Jack-board / patch panel | Row-by-column app Matrix; each intersecting cell holds capability bindings |
| Lamps/busy/supervision | Actual discovery, permission, call and execution-state indicators |
| Plug-in establishment | Establish authorized, purpose-scoped invocation/session/workflow route |
| Unplugging cord | End/revoke lease, close session, withdraw binding or revoke route without removing apps |
| Completed call record | Audit event + trace/receipt; persistent outcome separate from the severed live connection |
| Interoffice trunk | Governed multi-hop path through multiple pairwise bindings, each independently authorized |

### Crucial two-part model: socket is not the connection
A **port/capability** may exist continuously even when unused. A **connection/route instance** is established only for an authorized purpose and can then be ended without deleting the port, its app, the definition of the protocol or historical evidence. This permits connected services to remain **isolated by default**.

Proposed per-button *runtime state machine* (not yet deployed):

`declared → discovered → eligible → authorized → connecting → active → completed/disconnected`

Alternative transitions: `denied`, `timed_out`, `failed`, `revoked`. Persist a receipt for each transition. **Discovery is not authorization; an invocation is not necessarily a persistent network connection.** Many MCP tools are discrete JSON-RPC calls; a visual 'patch cord' may represent a temporary *logical capability route*, not a physical or TCP socket. Streaming clients can have actual connections, but this is transport-specific.

### Two separate matrix overlays
- **Capability matrix (potential):** pair cells describe *which bridges may exist* with available versioned tools/protocols.
- **Live patch matrix (actual):** active/authorized route instances with owner, purpose, TTL, route state, in-flight operation, revocation switch and audit receipt. A selected cell should let an operator view both.
- **Historical evidence matrix:** separately browsable outcomes (success/fail/denial) that persist after disconnection.

The proposed button is not a raw wire: it is a typed, inspectable **protocol logic sequence** with transformations, permissions, dependencies, checks, data-use limits and compensating actions. 'Severable' must mean true service-side revocation/termination and in-flight cancellation semantics where possible, not only hiding a line in the UI.

### Example — Neon ↔ OpenDiagram
1. Both apps/services are **listed**, but there is no active route.
2. Operator selects the row/column intersection and a capability such as **Visualize Evidence**.
3. The gateway discovers registered adapters and checks the requesting identity, purpose, graph ID, read scope and destination.
4. It establishes a scoped logical workflow/lease. Neon reads the pinned graph revision and OpenDiagram renders the *returned* source-only graph. Each endpoint independently enforces permitted operations.
5. After the result/receipt, the route closes or expires; the graph, service and protocol definitions remain. The operator can revoke a standing route explicitly.
6. An audit record attests to the actual attempt and result; **no semantic claim is made by the visualization alone**.

### Open decisions
- Does 'unplugging' mean ending one call, terminating a streaming session, revoking an authorization lease, disabling the capability, or all four as separate operations?
- Should operator control be manual, agent-selected under approved policies, or configurable by mission?
- How do multi-hop routes avoid leaking credentials from one isolated app to another? Each callee must validate its own permissions.
- Should the frontend have simulated patch cords visually drawn between selected row/column jacks, distinct from the protocol matrix cells?
- How are active calls, historical receipts and capability discovery presented on mobile?
- A port can be *technically available* but *policy-unavailable*; distinguish these visually rather than labeling all discovered routes 'connected'.

### Research grounding
Historical manual systems used jacks, answering/calling plugs, cord circuits and supervisory signals; see Bell System's *Machine Switching Telephone System* and manual switchboard descriptions. This is an analogy for architectural design, not a statement that modern MCP provides a circuit-switched connection primitive.

**Status:** DISCUSSION / DOCUMENTED PROPOSAL ONLY. No application wire-up, server deployment, runtime test or authorization change.
