# Twelve functional capability domains — candidate matrix

**Source:** user-supplied *Comprehensive Audit Report: NexusBoard MCP Capabilities, Tool Inventories, and Architectural Governance* (excerpt). Its heading says **26 sources**, but the underlying bibliography was not included. This report **is not** a fresh repository, production or protocol conformance audit; this page is a structured source synthesis.

**Scope:** 31 candidate capabilities across twelve domains. **None is marked implemented, live-discovered, callable or tested** on this basis. The per-entry source does not distinguish explicitly documented capabilities from the author's structural inferences.

| Candidate capability | Proposed MCP interface | Principal seat | Impact | Architectural purpose |
|---|---|---|---|---|
| `seat.catalog.read` | tool/resource | 06 | read | Discovers active corporate seat endpoints and capability manifests |
| `capability.schema.read` | resource | 05 | read | Retrieves formal capability JSON Schemas |
| `directory.resolve` | tool | 06 | read | Maps logical seat IDs to service references |
| `evidence.encounter.record` | tool | 08 | write | Records encounter metadata and observations |
| `source.ref.resolve` | tool | 13 | read | Resolves content hashes to canonical source entities |
| `evidence.capture_source` | tool | 08 | write | Registers versioned source snapshots with provenance |
| `context.model.branch` | tool | 08 | write | Creates separate contextual interpretation over common evidence |
| `context.models.compare` | tool/resource | 08 | read | Compares competing representations and limitations |
| `relationship.propose` | tool | 08 | write | Creates provisional typed relation proposal |
| `relation.evidence.attach` | tool | 08 | write | Attaches ERU references to a relation proposal |
| `adaptation.candidate.submit` | tool | 08 | write | Submits non-executing systemic improvement candidate |
| `knowledge.context.find` | tool | 14 | read | Retrieves permitted institutional-memory contexts |
| `history.timeline.read` | resource | 14 | read | Exposes time-aware decision and revision history |
| `record.integrity.check` | tool | 13 | read | Checks structural integrity and known hashes |
| `schema.impact.assess` | tool | 13 | read | Assesses migration dependencies and breaking changes |
| `research.question.register` | tool | 19 | write | Registers a research question and pretest methodology |
| `evaluation.report` | tool | 19 | write | Records actual experimental outcomes with evidence refs |
| `proposal.submit` | tool | 08 | write | Submits AR-origin operational proposal to authorized review |
| `operations.assignment.issue` | tool | 03 | privileged | Issues delegated mission assignment to scoped queue |
| `proposal.disposition.record` | tool | 03 | privileged | Records authorized approval, deferral or rejection |
| `strategy.directive.issue` | tool | 02 | privileged | Records executive guidance within owner-delegated limits |
| `committee.hearing.convene` | tool | 01 | privileged | Opens a recorded multi-office review docket |
| `committee.resolution.read` | resource | 01 | read | Reads authorized committee dispositions, dissent and votes |
| `access.policy.evaluate` | tool | 07 | read | Evaluates a caller action against server-side policy |
| `principal.scope.inspect` | tool | 07 | read | Inspects authorized lease scope and expiry |
| `credential.scope.issue` | tool | 07 | privileged | Issues scoped credentials only under separate owner authorization |
| `budget.envelope.evaluate` | tool | 04 | read | Evaluates modeled cost and budgets with time-stamped rates |
| `spend.authorization.record` | tool | 04 | privileged | Records permitted financial decisions under owner-defined caps |
| `audit.scope.open` | tool | 20 | write | Opens attributable independent audit inquiry |
| `audit.finding.issue` | tool | 20 | privileged | Issues documented findings; binding status depends on constitution |
| `audit.history.read` | resource | 20 | read | Reads authorized audit and provenance history |

## Handling distinct MCP interface types

- **Tool:** callable operation, requiring an MCP tool descriptor and input schema before a server can advertise it.
- **Resource:** addressable contextual data returned through `resources/list`, URI templates, and `resources/read` *when supported*; it is **not** automatically a tool.
- **Tool/resource:** design alternative; choose whether to expose as a tool, a resource, or both and justify the interface shape.

All names above are **NexusBoard application capabilities**, not standardized MCP method names. The established [11-tool preliminary registry](tool-proposals.json) has overlapping semantics with this larger proposal catalog; **do not automatically count duplicates as separate endpoints**.

## Priority review questions

1. Can seats discover each other's *authorized* capability descriptors without exposing sensitive endpoints?
2. Which operations are read-only, proposal-only, governed writes, or privileged dispositions?
3. Which capabilities require competent approval and separation of proposing and approving seats?
4. Which application resources should use `nexusboard://` references, without implying a deployed URI handler?
5. Where are source span, hash, relation/revision ID and evidence lineage required?
6. What per-seat errors, refusals, timeouts, idempotency semantics and audit traces should be specified?

**No actions, tests, production changes or security permissions have been triggered by publishing this list.**
