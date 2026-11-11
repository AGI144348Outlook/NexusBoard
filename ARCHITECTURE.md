# Architecture: one enduring entity, seven Agent components, twenty corporate seats

**Classification:** source-based proposed architecture. No deployment audit or test was performed to establish the claims in this document. [Source catalog](docs/SOURCE_CATALOG.md) · [Status](STATUS.md).

## 1. Constitutional scales

- **Owner:** the human authority for reserved decisions, consent, material spending, deployment and access changes.
- **System Entity:** permanent organizational identity, common namespace, constitution, policy controller, authoritative records and external MCP gateway.
- **Department:** bounded functional jurisdiction and mission scope.
- **Seat:** versioned office charter, separately identifiable service principal, capabilities, permissions and succession history.
- **Agent:** named worker with a runtime, instructions, state and optional inference; neither a model nor an MCP server by definition.
- **Operator:** temporarily docked conversational supervisor or preauthorized cloud director, both subject to revocable limits.

These scales are not interchangeable. In particular **seven per-Agent architectural components** do **not** denote seven of the twenty corporate seats.

## 2. Seven Agent components (Source 01)

| # | Component | Boundary |
|---|---|---|
| 1 | Persistent identity | Nonrecycled identifier persists over restarts and model changes |
| 2 | Constitutional role | Mission, duties, jurisdiction, accountability and escalation |
| 3 | Governing protocols | Versioned procedures plus independent server-side enforcement |
| 4 | Accessible tools and MCP | Declared callable capabilities; discovery is not permission |
| 5 | Persistent state | Checkpoints, tasks, memory pointers, evidence references |
| 6 | Execution runtime | Events, deterministic actions, workflow, retry and checkpoint |
| 7 | Swappable reasoning model | Cost-limited interpretation; never organizational authority |

A prompt is not a security boundary. A Worker, Durable Object, SQL role, MCP server, model and Agent represent different concerns.

## 3. Twenty relatively external corporate seats (Sources 18–20)

Each office has a distinct charter and independently auditable service boundary; physical isolation is **not** mandatory. The parent MCP gateway wraps the organization, while peers may be servers for their capabilities and clients of other peers. The twenty seats are listed in the [seat register](docs/agent-organization/SEATS.md): Board Chair, CEO, COO, CFO, CTO, CIO, CISO, CARO/AR, CSO, CRO, CCO, CLO, CDO, CKO, CPO, CRevO, CMO, CCuO, VP R&D, Internal Audit.

Cross-seat access needs authenticated caller identity, intended purpose, mission reference, permitted capability, scoped data, charter/protocol versions, budget and audit correlation. Each **callee** independently evaluates authority. An unrestricted twenty-seat full mesh is not proposed.

## 4. Three interoperating protocol strata (Sources 04, 18, 21)

1. **Standard MCP:** interoperable host/client/server discovery, tools, resources, prompts and optional compatible UI. MCP does not supply the corporate constitution.
2. **NexusBoard constitutional contracts:** authenticated seat identity, duties, purpose-of-use, authorization, confidentiality, escalation, monetary limits, evidence requirements and versions.
3. **Evidence model:** source units, contextual branches, proposed relations, assessments, revisions, dissent and provenance.

The example application tools in this repository are **proposed names**, not official MCP methods or confirmed deployments. See [interfaces](specifications/interfaces/corporate-gateway.md) and [protocols](specifications/protocols/constitutional-interoffice.md).

## 5. Operator shift and durable state (Sources 03, 05–08, 15, 24)

A compatible conversation may dock through an authenticated, scoped, revocable **operator lease**. A scheduled cloud identity may run only standing approved work when interactive supervision is absent. Neither replaces the System Entity. Mission status, approvals, history, budgets and identity are durably retained; a new operator queries an evidence-backed handoff.

**Candidate infrastructure** (not a universal deployed configuration):

- Authenticated Worker/service for corporate gateway and authorization.
- Durable Objects and Cloudflare Agents SDK for seat-local event processing; SQLite for local checkpoints.
- **Neon PostgreSQL** as the proposed shared corporate source of truth.
- **Cloudflare D1 optional**, only where edge caching/shared requirements justify another store.
- Workflows/queues for durable multi-step progress; approved model providers for selective inference.

The source journal describes point-in-time observations of existing nb.* tables in another NexusBoard project; those are **reported**, not independently reverified here. Planned en.* tables remain proposals.

## 6. Two Evidence Networks (Sources 11–17, 23)

**Network of Evidence:** first-order source records, observations, claims, hypotheses and conclusions, plus independently identifiable typed relations.

**Evidence of the Network:** second-order assertions about those relations, proposer/reviewer activities, source independence, approvals, validity and revisions.

Store a relation proposal separately from the assessment of whether it is supported. A source copied by two articles is one underlying lineage, not two independent proofs. A changed source triggers scoped dependency review, not deletion or indiscriminate invalidation. Historic judgments survive new interpretations, subject to lawful privacy and deletion obligations.

The proposed Neon **inward relational mirror** uses normalized, queryable identities, relations, contextual membership, assessments, activities and revisions rather than substituting visualization coordinates for meaning. See [Evidence](docs/evidence-networks/README.md) and [Memory](docs/institutional-memory/README.md).

## 7. Agent Resources and multiple contextual representations (Source 22)

The AR/CARO seat processes assigned evidence **as its primary obligation**. In parallel, a bounded peripheral scan may identify methods to improve the whole system. That scan produces **candidate proposals** for COO and competent offices, not automatic structural changes. AR may retain several competing models of the same source at once—documented description, implementation, test result, governance obligation—and compare explanatory utility without collapsing uncertainty.

## 8. Illustrative mission path

Owner authorizes objective → gateway validates scope → durable mission created → authorized dispatcher routes to relevant seat → local checkpoint and shared revision loaded → deterministic action and optional budgeted inference → evidence captured and relation proposed → independent review and appropriate approval → audit, persisted outcome and operator handoff.

**Operation state** (accepted, running, completed, failed) differs from **claim state** (unverified, contested, supported, rejected). A successful call is not proof of either truth or completed business outcome.

## 9. Mandatory boundaries

- No self-granted SQL privileges, invented committee approval or model-originated escalation.
- Least-privilege principals and per-seat authorization; database RLS where appropriate.
- Separation of proposer, reviewer, approver and independent auditor.
- Stable IDs, idempotency for writes, explicit refusals and reasoned revision history.
- Never disclose secrets or private source material in public issues.
- Repository tests require a published **pre-test Issue/Discussion**, then a results report in the same thread. See [Contributing](CONTRIBUTING.md).

## 10. Open decisions

One or several physical endpoints for seats; conflict and quorum rules; AR auto-commit limits; evidence retention versus deletion; context-model comparison metrics; authoritative write ownership; provider budgets; and founder-reserved escalation thresholds remain undecided. See [Research](research/hypotheses/README.md).
