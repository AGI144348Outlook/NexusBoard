# NexusBoard MCP audit-design branch

**Branch:** `mcp` (independent of `main`). **Status:** architectural proposals, **not** a running MCP server or a verified list of callable tools. The root `manifest.json` is a **NexusBoard-defined repository contract**, not an official MCP protocol manifest.

## Purpose

Provide a dedicated research/design branch for the repository's MCP posture:
- which parts act as **host/client**, **server**, or **both**;
- which tools, resources, prompts, UI extensions or asynchronous tasks are **proposed**;
- how callers discover and invoke capabilities without gaining authority by discovery;
- protocol version, message and transport compatibility, authentication, authorization, errors and audit semantics;
- static evidence mapping proposed operations to implemented source code where available.

## Index

| Artifact | Role |
|---|---|
| [`../manifest.json`](../manifest.json) | Machine-readable audit contract and scope |
| [`role-assignments.md`](role-assignments.md) | Concrete client/server responsibilities |
| [`tool-proposals.json`](tool-proposals.json) | Proposed callable tools, JSON schemas, permission boundaries, risk and evidence |
| [`tool-registry.md`](tool-registry.md) | Human-readable capability index and promotion criteria |
| [`protocol-profile.md`](protocol-profile.md) | MCP standard revision + per-repository transport/security conventions |
| [`interface-routing.md`](interface-routing.md) | Call topology and authorization checkpoints |
| [`audit-checklist.md`](audit-checklist.md) | Hourly audit assessor instructions |
| [`audit-report-template.md`](audit-report-template.md) | Evidence-grade report template |
| [`schemas/`](schemas/README.md) | Custom manifest and tool-proposal JSON schemas |
| [`reports/`](reports/README.md) | Findings index, currently empty |

## Evidence ladder

**Proposed → Code-located → Statically inspected → Live-discovered → Tested → Independently verified**. Each change of status requires a reproducible source commit, endpoint/tool descriptor (where applicable), authorization check, and for any repository testing a published pre-test Issue/Discussion plus same-thread post-test results. A tool proposal is **not callable** simply because its schema appears in this branch.

## Branch workflow

1. Audit `main` at an immutable commit SHA; read the `mcp` branch as **design intent**.
2. Record declared tools/clients/servers and their source evidence separately.
3. Draft new capabilities on the `mcp` branch as proposed and risk-classified; never enable tools through documentation alone.
4. Submit reviewed PRs to amend source/configuration/authoritative documentation where approved; do not auto-merge or mutate production.
5. If testing is requested, pre-register in the **repository being tested** before running any diagnostics, API calls, benchmarks, CI or regression suites.
6. Record actual observations and interpretation in the original pre-test thread.
7. Keep private topology/credentials and hidden customer data out of public `mcp` branch content.

**Standard distinction:** MCP host/client/server are connection roles, not necessarily corporate authority roles or physical deployment boundaries. A constitutional seat may have a client and a server; a GitHub repository may define neither today.

## Supplied comprehensive audit report — expanded candidate inventory

The user-provided report has been incorporated as a **source synthesis, not an executed audit**:

- [Architectural strata, nested boundaries and corrections](architecture-audit-synthesis.md)
- [31 candidate capabilities across 12 domains](capability-matrix.md) and [machine-readable inventory](capability-inventory.json)
- [Historical partial detailed seat profiles (01–07)](seat-profiles-excerpt.md)
- [Legacy/modern MCP compatibility note](protocol-compatibility-2026.md)

The owner has supplied all twenty seat profiles; the claimed 26-source bibliography is still unavailable. Do not merge proposed interfaces into the 11-tool registry or advertise them as callable until each name, schema, principal and authorization is reconciled and implementation evidence exists.

## Full owner-supplied report (2026-11-11)

- [Full twenty-seat MCP profile](seat-profiles.md) — duties, calls, resources, dependencies and separation of duties.
- [Forty candidate context resource URIs](resource-uris.md) — proposed, not deployed.
- [Eight threat scenarios](security-risks.md) and [five enforcement gates](enforcement-gates.md) — specified mitigations, not tested controls.
- [Three role layers](role-boundaries.md) — SQL, constitutional, and evidentiary.
- [Complete report provenance and corrections](full-report-intake.md).

The full report **does not include a 26-source bibliography**. These additional proposals are not automatically merged with the original 11-tool list or 31-row domain inventory, because names, aliases, schemas and authority require reconciliation.

## Seat-level jurisdiction audit (new source report)

The 2026-11-11 *NexusBoard 20 Corporate Seats & Jurisdiction Boundary Audit* adds formal evidence requirements and escalation for every office:

- [Twenty-seat authority/evidence matrix](jurisdiction-boundary-audit.md) and [machine-readable jurisdiction declarations](jurisdiction-matrix.json).
- [Server-to-database authorization pathway](authorization-flow.md).
- [Evidence-marker contract for hourly audits](evidence-marker-contract.md).
- [New report provenance/limitations](jurisdiction-intake.md).

These are **auditor requirements**, not claims that twenty seat servers or specified controls are implemented. Retain the original [twenty-seat capability profiles](seat-profiles.md) and [31-domain candidate catalog](capability-inventory.json) separately for cross-referencing.
