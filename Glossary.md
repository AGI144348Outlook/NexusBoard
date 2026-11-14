# NexusBoard Glossary

**Version:** 0.1  
**Updated:** 2026-11-14  
**Scope:** NexusBoard's organizational architecture, MCP engineering, contextual Skills, evidence systems, and proposed engineering workbench.  
**Status:** Living terminology reference. This glossary defines words; it does not certify that a described component has been built, deployed, connected, tested, or approved.

## How to read this glossary

- **Established design term** means a term already defined in NexusBoard's source-derived architecture. The architecture itself may still be proposed.
- **Proposed extension** means a term under architectural discussion, particularly the Skills Switchboard, SkillWalls, SkillBlocks, OpenDiagram integrations, or MCP Engineering Workbench.
- **Technology term** describes an existing external technology, not necessarily an installed or operational NexusBoard integration.
- An architectural definition is **not** evidence of runtime capability, authorization, implementation, successful tests, or independent verification.
- Where a word has several meanings (especially *agent*, *model*, *context*, *protocol*, *memory*, and *connection*), use the most specific term available.

The canonical project boundaries are described in [ARCHITECTURE.md](ARCHITECTURE.md), [GOVERNANCE.md](GOVERNANCE.md), and [STATUS.md](STATUS.md). The newer Skills/Meta-MCP/Switchboard proposals are tracked in [NexusBoard Issue #3](https://github.com/AGI144348Outlook/NexusBoard/issues/3). If an entry conflicts with an approved contract or a source-grounded specification, reconcile the conflict explicitly rather than silently treating this glossary as an override.

## 1. Constitutional identity and organization

- **Owner** — The human authority retaining reserved decisions, consent, spending, deployment and access changes. Being a model operator does not make a party the Owner.
- **System Entity** — NexusBoard's enduring organizational identity, policy namespace, authority structure, registries, and records. It is not identical to one AI model, Agent, deployment, MCP server, or chat session. **Established design term.**
- **Constitution** — The versioned collection of organizational authority boundaries, decision rights, duties and permissible delegations. Natural-language instructions alone do not enforce it.
- **Department** — A bounded functional jurisdiction within the System Entity; not merely a UI folder or label.
- **Seat / Constitutional Office** — A persistent, chartered organizational position with stable identity, jurisdiction, service boundaries, and succession history. NexusBoard proposes **twenty seats**; a seat is not proof of a live Agent.
- **Seat Occupant** — An Agent or designated worker assigned to perform a seat's work under that seat's charter. The occupant can change while the seat identity persists.
- **Agent** — A governed worker combining identifiable role, instructions, state, execution capability and, when needed, a reasoning model. A model alone or an MCP endpoint alone does not constitute a full NexusBoard Agent.
- **Agent Identity** — Stable, nonrecycled identity and lifecycle metadata for an Agent, independently of a replaceable model or runtime instance.
- **Operator** — A person, conversational assistant, or preauthorized cloud director temporarily conducting permitted work. An Operator is not the System Entity and cannot confer authority upon itself.
- **Operator Lease / Docking** — A time- and purpose-bounded, authenticated authorization for an Operator to interact with the organization. Leases may expire or be revoked without terminating institutional identity.
- **Charter** — A versioned definition of a seat's mission, jurisdiction, responsibilities, capabilities, constraints, and escalation obligations.
- **Principal / Service Principal** — An authenticated identity against which server-side policies are evaluated. A text field claiming a caller's identity is not proof of authentication.
- **Delegation** — A bounded transfer of authority that may narrow, but may not enlarge, the authority of the delegator.
- **Mission** — An identifiable unit of authorized organizational work with objective, context, ownership, status, evidence, and applicable policy.
- **Handoff / Operator Shift** — The transfer of work context, responsibilities, evidence references, and status between authorized Operators without replacing organizational identity.
- **Separation of Duties** — Governance rule keeping proposal, review, approval, implementation, and independent audit from collapsing into unaccountable self-approval.
- **CARO / AR (Chief Agent Resources Officer / Agent Resources)** — The proposed seat focused on resource encounters, multiple contextual representations, relation proposals and bounded improvement proposals. AR cannot independently approve changes to its own authority.
- **Institutional Memory** — Persisted organizational, operational and epistemic records needed for continuity between Operators and Agents. It is not merely a chat transcript or model context window.

### The seven components of a NexusBoard Agent

These are **seven architectural components per Agent**, not seven corporate seats.

| Component | Meaning |
|---|---|
| 1. Identity | Stable Agent identifier and lifecycle |
| 2. Role | Charter, jurisdiction, duties, accountability |
| 3. Protocols | Versioned operating instructions together with enforced controls |
| 4. Tools and MCP | Declared and actually accessible capabilities |
| 5. Persistent State | Tasks, checkpoints, memory pointers and evidence references |
| 6. Runtime | Event handling, execution, retries, scheduling and model calls |
| 7. Reasoning Model | Optional, replaceable inference capability; not institutional identity or authority |

Source: [Seven components](docs/seven-layers/README.md).

### The twenty proposed constitutional seats

The canonical descriptions and jurisdictions are maintained in [SEATS.md](docs/agent-organization/SEATS.md). The following are office names, **not** an assertion of twenty operating models.

| Seat | Office |
|---|---|
| 01 | Board Chair / Committee Convener |
| 02 | CEO — Executive System Entity Governor |
| 03 | COO — Operational Governor |
| 04 | CFO — Computational Economy Governor |
| 05 | CTO — Engineering Governor |
| 06 | CIO — Information Infrastructure Governor |
| 07 | CISO — Security & Authority Governor |
| 08 | CARO / AR — Agent Resources Governor |
| 09 | CSO — Strategic Intelligence Governor |
| 10 | CRO — Systemic Risk Governor |
| 11 | CCO — Constitutional Compliance Governor |
| 12 | CLO — Legal & IP Governor |
| 13 | CDO — Data Integrity Governor |
| 14 | CKO — Institutional Knowledge Steward |
| 15 | CPO — Product & Applications Governor |
| 16 | CRevO — Revenue Operations Governor |
| 17 | CMO — Marketing & Communication Governor |
| 18 | CCuO — Customer & User Governor |
| 19 | VP R&D — Research Governor |
| 20 | Internal Audit Governor |

## 2. MCP, capabilities and operational interfaces

- **MCP (Model Context Protocol)** — An interoperability protocol for exposing capabilities such as tools, resources and prompts to compatible AI hosts/clients. It is distinct from NexusBoard's constitutional and evidence contracts. **Technology term.**
- **MCP Host** — The application environment that coordinates model interactions and MCP clients.
- **MCP Client** — A component establishing a protocol relationship with an MCP server on behalf of a host or application.
- **MCP Server** — An endpoint exposing MCP-defined capabilities. Hosting one does not automatically make the endpoint an Agent or grant corporate authority.
- **MCP Tool** — A callable operation exposed by a server with a defined input contract; its advertisement does not guarantee permission or successful execution.
- **MCP Resource** — Content/data made available by an MCP server under applicable access rules; not the same thing as an arbitrary tool side effect.
- **MCP Prompt** — An MCP-provided prompt template or workflow aid, distinct from enforceable authorization policy.
- **MCP App / Embedded UI** — A compatible MCP-related UI experience rendered by a supporting host. A graphical button cannot itself grant server privileges.
- **Plugin / Connector** — A packaged application integration that may expose tools, resources, Skills or other authorized functionality. Exact composition and host support are implementation-specific.
- **Skill / SKILL.md** — A reusable procedural or contextual instruction package, commonly represented by a SKILL.md file. A Skill describes how to perform a task; it is not itself a credential, running server, or executable permission grant.
- **Skill Trigger / Codeword** — An explicit signal requesting that an eligible skill protocol be considered. Historical or quoted occurrences must not trigger live operations automatically. **Proposed extension.**
- **Capability** — A described, discoverable, or executable function with identity, scope, schemas, constraints, and provenance. State must indicate whether it is merely proposed, advertised, authorized, implemented or verified.
- **Capability Registry / Catalog** — Indexed descriptions of tools, resources, prompts, agents or services, with versions and discovery evidence; not proof that every item is active.
- **Discovery** — Learning that a capability is advertised or registered. **Discovery is not authorization.**
- **Compatibility** — Evidence that two interface versions, schemas and behaviors can interact meaningfully. Compatibility alone is not authorization.
- **Authorization** — A policy decision permitting a named authenticated principal to perform a specified operation for a defined purpose, scope and period.
- **Callee-Side Enforcement** — The receiving service independently checks the caller's real identity, scope, purpose and constraints; a gateway's routing decision is not a substitute.
- **Interface Contract** — A versioned specification of participants, directions, schemas, semantics, constraints, error behavior and allowed effects.
- **Protocol Binding / Patch Cord** — A proposed typed mapping between capabilities, including transformations, direction, policy conditions and evidence. Unlike a literal telephone cord it may represent a single invocation, not a persistent socket. **Proposed extension.**
- **Route / Severable Connection** — An authorized invocation path or time-bounded integration that can end, expire or be revoked while its design and audit history remain. Do not equate all routes with long-lived network sessions. **Proposed extension.**
- **Gateway / Parent MCP Gateway** — A governed external interface that registers or routes approved corporate capabilities. The gateway is not by itself the source of constitutional authority.
- **Meta-MCP Switchboard** — Proposed execution-plane registry and router for independently governed MCP services and capability interfaces, with authorization and audit. It is a project architectural term, **not a separate standardized MCP wire protocol**.
- **Skills Switchboard** — Proposed contextual workflow plane that determines which Skill instructions, prerequisites and evidence requirements apply to an assignment. It does not itself unlock backend tools.
- **Dual Switchboards** — NexusBoard's proposed separation between (1) a contextual Skills/workflow switchboard and (2) a governed MCP capability/execution switchboard.
- **Protocol Switchboard Matrix** — A proposed visual matrix with participants on both axes; a directed cell models their possible interface contracts and invocable capabilities. A diagrammed edge is not proof of a functioning connection.
- **Application × Application Matrix** — Pairwise interface models among apps/services; opposite directions may require distinct contracts.
- **Seat/Agent × Seat/Agent Matrix** — Pairwise organizational/agent routing models constrained by charters and independently enforced scopes.
- **Operational Receipt** — A durable record of an attempted tool action or workflow step, including identity, correlation, outcome and relevant version IDs. A successful call does not automatically prove factual correctness.
- **Idempotency Key** — A request identifier used to prevent unintentional duplicate effects when retrying an operation.
- **Correlation ID** — An identifier linking related events and records for tracing; not itself an authorization token or a means to read hidden conversations.
- **Contextual Integration** — A purpose-scoped relationship between components based on declared semantics and authorized operations, rather than an assumption of permanent shared implementation.

Source: [MCP interoperability](docs/mcp-interoperability/README.md), [interoffice protocol](specifications/protocols/constitutional-interoffice.md), [Switchboards discussion](https://github.com/AGI144348Outlook/NexusBoard/issues/3).

## 3. Evidence, knowledge, provenance and memory

- **Source** — Original material, record, document, message or measurement from which an assertion is drawn. Identify version and access conditions where possible.
- **Source Unit / Evidence Resource Unit** — An addressable portion of a source, retaining source identity, location, context and provenance.
- **Observation** — A report of what was encountered, measured or recorded, distinguished from interpretation.
- **Claim** — A proposition that may be supported, disputed, unverified, rejected, or revised.
- **Hypothesis** — A proposed explanation or prediction requiring a method and possible observations that could challenge it.
- **Interpretation** — An explanation assigned to observations or claims; multiple interpretations may coexist.
- **Contextual Model / Branch** — A versioned representation of selected source relations or meanings within a declared context; competing branches need not be collapsed.
- **Evidence Network / Network of Evidence** — The first-order network of sources, observations, claims, hypotheses, results and typed relationships among them.
- **Evidence of the Network** — A second-order network recording how particular evidence relationships were proposed, reviewed, authorized, contested, revised or verified.
- **Evidence Card / Index Card** — A structured record for a source, note, claim or relation, with identifiable provenance and review state. A graphical card is not automatically authenticated evidence.
- **Evidence Wall** — A proposed visual interface for arranging evidence cards, notes, links and their statuses, analogous to a detective's evidence board. Visual proximity alone does not establish a supported relation.
- **Evidence Board / OpenDiagram Whiteboard** — An interactive canvas for browsing or proposing evidence-linked relationships. Draft drawn links must remain distinct from authoritative stored edges. **Proposed workbench use.**
- **Relation / Edge** — A typed association between nodes, such as supports, contradicts, cites, depends-on, or revises. The fact that an edge is stored does not make it true.
- **Relation Proposal** — A candidate edge or claim about an edge awaiting evaluation and, where necessary, governance.
- **Relation Assessment** — A separately attributable evaluation of a proposed relation and the evidence supporting or challenging it.
- **Independent Review** — Assessment by an appropriate distinct reviewer or method, rather than self-certification by the proposer.
- **Source Independence** — A property of evidentiary origins. Multiple summaries of the same underlying observation are not automatically independent corroboration.
- **Provenance** — Traceable origin and transformation history for sources, assertions, relationships, operations and decisions.
- **Lineage / Dependency** — The chain of source and derived-record dependencies used for targeted impact review when inputs change.
- **Revision** — A recorded change to a versioned representation, interpretation, relationship or decision; previous evidence should not be silently rewritten.
- **Graph Snapshot** — A versioned representation of nodes, edges, source references and status at a particular point or revision.
- **Dictionary Body / Dictionary Cover** — Proposed metaphor: persistent, queryable evidentiary content as the body; OpenDiagram's interactive graphical representation as the cover. Neither metaphor establishes a live data connection by itself.
- **Inward Relational Mirror** — Proposed normalized, queryable persistence of identities, contexts, typed relations, assessments and revisions, separate from visual layout coordinates.
- **Epistemic Status** — The knowledge/claim state (for example unverified, contested, supported, rejected); distinct from workflow operation status.
- **Audit Trail** — Time-ordered accountable records of actions, permissions, approvals, changes and outcomes with sufficient pointers for reconstruction.

Source: [Evidence networks](docs/evidence-networks/README.md), [Institutional memory](docs/institutional-memory/README.md).

## 4. Conversation review, metadata and contextual Skills

This section describes a **proposed extension**, not a claim that current ChatGPT sessions automatically expose entire histories or exported archives.

- **Source 1 — Exported Conversation Archive** — Stored historical conversation data, such as exported JSON, with its available message content, IDs, role labels, timestamps, branches and attachment references. It is a source snapshot, not a live instruction channel.
- **Source 2 — Presiding Conversation Instance** — The actual conversation the operator has reopened or is currently using to invoke the assistant, limited to context and metadata that are genuinely accessible.
- **Mandatory Contextual Review** — A triggered workflow to identify the current conversation, examine accessible Source 2 context, retrieve matching Source 1 records when available, compare coverage and differences, and produce source-grounded notes.
- **Conversation Association** — A verified or provisional mapping between archive records, current conversation references and engineering projects; do not assert identity from similar titles alone.
- **Conversation Branch** — A distinct path or continuation within historical conversation structure; reconstruct only where the export and current evidence support it.
- **Metadata Fetch** — Retrieval of real identifiers, author roles, timestamps, revisions, source locations and capture context. Missing fields must remain explicitly missing.
- **Codeword Protocol Registry** — Proposed mapping from invocation phrases to Skill versions, prerequisites, scopes, outputs and failure handling.
- **Messageboard** — Proposed interface for context notes, replies, review and evidence pinning, with attribution and state.
- **Clipboard / Scratchpad Note** — Temporary drafted material awaiting verification or approval; not synonymous with a source record or a committed conclusion.
- **Pinned Note** — A note persistently associated with a source or project location, with provenance, review state and access rules.
- **Live-Instance Awareness** — Recognition of the context and supported host capabilities of the currently invoked session. It does **not** imply continuous monitoring, access to unseen thread content, or transfer of a ChatGPT model session to an external site.
- **Context Handoff** — Explicit, permissioned transfer or reconstruction of a selected context snapshot between environments, preserving source boundaries and uncertainty.
- **Conversation Portal / Expanded Workspace** — Proposed entry point from a supported ChatGPT app/plugin experience into a larger WebApp interface. A link alone does not migrate the original ChatGPT runtime or complete thread history.

See [historical-conversation and SkillBlock discussion](https://github.com/AGI144348Outlook/NexusBoard/issues/3).

## 5. Modular engineering workbench (proposed extensions)

- **MCP Architecture & Systems Engineering Workbench** — Proposed WebApp environment for specifying, modeling, connecting, documenting, inspecting, and evaluating MCP-based systems. The workbench itself must be distinguished from the systems it engineers.
- **System Under Engineering** — Any external or internal architecture, MCP deployment, workflow or Agent system being modeled or developed using the workbench.
- **Design-Time State** — What is proposed, modeled, specified, compared or documented before runtime execution.
- **Runtime State** — What a running authorized component actually does, accepts, refuses, completes or fails, backed by observed receipts.
- **Architecture Canvas** — Interactive modeling area for components and relationships; visual elements are not automatically executable operations.
- **Capability Workshop** — Proposed place to discover, specify, compare, and compose tool/resource/prompt/Skill capabilities.
- **Protocol Engineering Station** — Proposed place to define interface contracts, routing rules, schemas, workflows and failure behavior.
- **Integration Switchboard** — Proposed view of eligible, authorized, active, failed or revoked component relationships, grounded in backend status.
- **SkillWall** — A proposed bounded, context-bearing surface organizing Skills, evidence, tools, workflows or permissions. It may contain multiple Skills; that cardinality is not yet decided.
- **SkillBlock** — A proposed composable module represented as six associated SkillWalls forming a cube-like unit. The visual geometry is a design metaphor, not a guarantee of isolation, authority or MCP interoperability.
- **Domain** — A bounded conceptual/operational scope with its own context, responsibilities, data and contracts. A cube becomes a domain only if it has meaningful boundaries.
- **Meta-Domain** — A domain explicitly responsible for modeling, coordinating, or governing relationships among other domains; it is not created merely by placing six walls together.
- **Exterior SkillBlock Surface / Port** — A proposed externally addressable interface where a SkillBlock advertises possible interconnections with typed contracts and explicit authority.
- **Modular Assembly** — Arrangement of multiple components or SkillBlocks with versioned, replaceable interfaces, without assuming adjacency implies connectivity.
- **Laboratory Garage** — Proposed workbench metaphor in which walls, drawers, workstations and shelves organize tools, architectural resources, instructions, and evidence.
- **Office Domain SkillBlock** — Proposed SkillBlock assigned to a NexusBoard constitutional office (seat), configured around its charter, responsibility, capabilities, evidence scope, workflows, and tool inventory. It is a **workspace/domain resource**, not the office's identity, a new constitutional seat, or proof of isolation. Its owner and versioning belong to office-level governance; an Agent's ability to use it is separately authorized.
- **Office Garage Laboratory / Office Domain Garage** — A proposed operational environment in which one or more authorized Agents employ the Office Domain SkillBlock to inspect resources, conduct assigned work, draft or execute governed protocols, and record outcomes. The garage may expose walls, drawers, benches and workstations as UI metaphors; these do not replace runtime security boundaries.
- **Office Domain Configuration** — The versioned inventory of an office's accessible Skills, MCP tool/resource declarations, reference evidence, workflow templates, interface contracts and local working structures. Changing configuration and executing a tool are distinct permissions.
- **Office Domain Session / Workspace Lease** — A scoped, authenticated Agent or Operator session for interacting with a particular Office Domain. It is not the permanent office identity and does not inherit every advertised office capability.
- **Shared Office Laboratory** — A Garage/SkillBlock configured for use by multiple authorized Agents, each with their own identity, scope, state and audit trail. Shared access is not shared permission.
- **Cross-Office SkillBlock Route** — A proposed typed interface between two Office Domain SkillBlocks, evaluated against corporate seat charters and the independent authorization policy of each called MCP endpoint. An adjacent cube or visible cord does not grant access.
- **Office Domain Persistence** — Records and versioned workspace configuration belonging to an enduring office rather than to an individual Agent's working state; the domain can remain available through seat-occupant, model, and Operator changes. Storage location, authority and retention must be defined explicitly.
- **Tool Drawer** — A proposed UI grouping for discoverable capabilities and their prerequisites, schemas, authorization, state and execution history.
- **Blueprint** — A versioned design specification identifying requirements, components, contracts, assumptions, rationale, status and testable acceptance criteria.
- **Verification Workspace** — Proposed environment for displaying expected versus observed behavior, authorization outcomes, sources, tests, failures and audit reconstruction.
- **Architecture Decision Record (ADR)** — A durable note recording architectural context, alternatives, selected decision, rationale, consequences, status and responsible authority.
- **OpenDiagram** — The separately maintained visual WebApp considered as a possible interactive graph and engineering workbench foundation; integration and conversation continuity must be demonstrated rather than assumed.
- **AIBubble** — A separate Android overlay/interface concept used as a comparison for an expanded WebApp launch experience. It is not a synonym for OpenDiagram or the workbench.

The six particular wall responsibilities discussed so far—archive intake, conversation context, evidence, protocols, operations, and governance—are **provisional examples**, not mandated permanent face assignments.

### Office-domain application of SkillBlocks (proposed)

A constitutional **seat/office** may be assigned a persistent Office Domain SkillBlock and a configurable Garage Laboratory interface. The **seat's charter** determines the jurisdiction and governance constraints; the **SkillBlock** supplies contextual organization and declared capabilities; an **Agent** works within that environment only under its own authenticated, scoped authority. Different Agents may use the same office workspace, and one Agent may be granted access to more than one domain for a specified mission. The physical count of office domains is not fixed by the proposed twenty-seat structure.

Illustrative, not currently asserted as deployed:

| Constitutional office | Example Office Garage/Laboratory focus |
|---|---|
| CTO | Architecture, MCP server/tool design, interface contracts, code and authorized deployment workflows |
| CARO / AR | Resource intake, contextual representations, relation proposals, evidence routing and improvement hypotheses |
| CKO | Institutional memory, evidence retrieval, source indexing, archive continuity and contextual note review |
| CISO | Security policy reviews, access scopes, revocations and permission evidence |
| VP R&D | Experimental design, preregistration, observations, falsifiable claims and reproducibility records |

**Boundary conditions:** a Garage is neither the Agent nor its model, neither a stand-alone security principal nor an automatic MCP server. Permissions and budgets must be checked at the target service; office and Agent state are related but not identical; shared storage needs scoped access and source provenance. SkillWall orientation, how many SkillBlocks an office receives, the default domain topology, and whether any garages share physical deployments remain open design questions.

## 6. Persistence, infrastructure and execution

- **Neon PostgreSQL** — Candidate authoritative shared relational persistence for corporate and evidence records, subject to authenticated access, schemas and versioned write policies.
- **Cloudflare Worker** — Edge/server execution environment considered for gateways, authorization or routing; a deployment target, not an automatic governance layer.
- **Durable Object (DO)** — Cloudflare's addressable stateful compute primitive, potentially used for seat-local processing and checkpoints; not equivalent to an autonomous reasoning Agent.
- **SQLite** — Relational storage engine potentially used for local durable checkpoints, including within Durable Object architectures.
- **Cloudflare D1** — Candidate edge-oriented SQL storage or cache; avoid creating an unversioned second authoritative record source.
- **Vercel** — Candidate WebApp/application hosting environment; does not by itself supply unrestricted cross-app model context.
- **Render** — Candidate host for independently operated backend services, workers, or runtime components.
- **Model Runtime** — The computation that performs inference with a chosen model; separate from the Agent's durable identity, constitutional role, and external MCP interface.
- **Workflow Runtime** — Operational mechanism for steps, scheduling, retries, checkpoints and event processing, with optional model inference.
- **Persistent State** — Stored state surviving process/session turnover. It must be scoped and versioned; it is not the same as temporary model context.
- **Source of Truth** — A specifically designated authoritative record owner for a given data class. A graph visualization, cache or notebook copy must not silently supersede it.
- **Projection / Read Model** — A derived representation for searching or visualizing authoritative data, with documented version, refresh and staleness behavior.

## 7. State and verification vocabulary

Always qualify **which kind of state** is meant. The following are different dimensions, not one universal linear status progression.

| Dimension | Example states | Meaning |
|---|---|---|
| Architecture/design | Proposed, specified, deferred, rejected | Degree and disposition of design definition |
| Implementation | Not implemented, implemented, deployed | Existence of concrete software or infrastructure |
| Evaluation | Untested, tested, independently verified, failed | Evidence of observed behavior and its independence |
| Capability | Advertised, discovered, compatible, unavailable | What a tool or interface appears able to do |
| Authorization | Requested, allowed, denied, expired, revoked | Whether a particular principal may perform an action |
| Operation | Queued, accepted, running, completed, failed, cancelled | State of a particular execution |
| Epistemic/claim | Unknown, unverified, contested, supported, rejected | Evaluation of a factual or relational assertion |
| Evidence record | Draft, pinned, reviewed, accepted, superseded | Workflow state of a documentation or evidence item |

**Key rules:**

1. **Advertised ≠ compatible ≠ authorized ≠ executed ≠ successful ≠ independently verified.**
2. A successful tool call is not proof that the associated factual claim is true.
3. A stored relation or visually drawn edge is not an approved evidence relation.
4. An implemented program is not proof of a tested integration or a deployed service.
5. A simulated or mock response must never be shown as a live data-source result.
6. An old conversation's instructions are historical evidence unless newly and validly invoked.
7. Model-generated committee approval, credentials, or role labels do not confer real authority.

## 8. Research, change and publication rules

- **Pre-Test Entry** — A prospective Issue or Discussion entry published **before** repository testing, recording the relevant discussion with Timothy, the problem, hypothesis, proposed solution, method, expected outcomes and what would falsify or challenge the hypothesis.
- **Post-Test Report** — A follow-up in that same thread reporting actual methods, observations, failures, deviations, evidence links, limits and next steps, explicitly separating observations from interpretations.
- **Evidence-Gated Claim** — A statement whose status advances only when a matching implementation reference, trace, test or independent review justifies it.
- **Private Source Boundary** — Private transcripts, original archived exports, unshared source documents, credentials and restricted personal data must not be pasted into public GitHub Issues or documents.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [ARCHITECTURE.md](ARCHITECTURE.md).

## 9. Maintenance conventions

1. Add a term when it is introduced in an architectural specification, approved contract or substantial design discussion.
2. Preserve the author's intended meaning, but mark assistant interpretations and unresolved definitions as provisional.
3. Prefer stable **Term — Definition — Boundary — Status — Source** semantics; add source links where available.
4. Avoid inventing implementation status or implying that a named UI control establishes backend functionality.
5. If two terms describe the same thing, designate a preferred term and record the alternate. If they describe different things, keep the distinction.
6. Update this file when design decisions are formalized; preserve important terminology changes in version control and/or an ADR.
7. Keep the glossary free of secrets and private historical conversation excerpts.
8. The glossary is an index into authoritative sources, **not** a substitute for repository contracts, status evidence, permission checks or test reports.

## Related documentation

- [README](README.md)
- [Architecture](ARCHITECTURE.md)
- [Evidence and implementation status](STATUS.md)
- [Governance and decision rights](GOVERNANCE.md)
- [Twenty constitutional seats](docs/agent-organization/SEATS.md)
- [Seven Agent components](docs/seven-layers/README.md)
- [MCP interoperability](docs/mcp-interoperability/README.md)
- [Evidence networks](docs/evidence-networks/README.md)
- [Institutional memory](docs/institutional-memory/README.md)
- [Constitutional interoffice protocol](specifications/protocols/constitutional-interoffice.md)
- [Dual Switchboards, SkillBlocks and Workbench discussions](https://github.com/AGI144348Outlook/NexusBoard/issues/3)
