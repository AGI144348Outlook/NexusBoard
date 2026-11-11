# NexusBoard

**One persistent System Entity, replaceable AI operators, and twenty separately governed corporate agent seats.**

NexusBoard is an independent systems-architecture and research initiative. It explores a durable, evidence-aware AI organization with stable identity, constitutional authority, MCP interoperability, persistent state, and interchangeable reasoning operators.

> **Status: proposed reference architecture.** The 25 source-journal PDFs document design decisions, candidate technologies, and open questions; they do not prove all services have been built or tested. See [Status](STATUS.md).

## Start here

- [Architecture](ARCHITECTURE.md) — identity, seven Agent components, twenty seats, MCP, evidence and persistence.
- [Roadmap](ROADMAP.md) — evidence-gated implementation phases and milestones.
- [Source catalog](docs/SOURCE_CATALOG.md) — all 25 sources, arranged in three volumes; **original PDFs and ZIPs are not stored here**.
- [Governance](GOVERNANCE.md), [Contributing](CONTRIBUTING.md), [Security](SECURITY.md), [License status](LICENSE.md).
- [Funding milestones](funding/milestones.md) and [Sponsorship](funding/sponsorship.md).

## The architecture in one paragraph

The **System Entity** owns enduring identity, rules, records and authority. Departments establish functional scope. Twenty constitutional **seats** represent distinguishable offices with chartered jurisdictions and independently enforced interoffice service boundaries; an Agent may occupy or serve a seat. Each Agent has **seven components**: identity, role, governing protocols, accessible tools/MCP interfaces, persistent state, runtime, and optional reasoning model. These seven components and twenty seats are different dimensions. Conversational and cloud operators may rotate without replacing the organization. Neon and local runtime persistence are proposed to maintain shared evidence and task continuity.

## Design commitments

1. Tool discovery never grants authorization; enforce policy at the acting service and data store.
2. Source observations, competing interpretations and relation assessments remain separately attributable.
3. AI model inference is a replaceable and selectively used capability, not durable identity or constitutional power.
4. The Agent Resources office (AR) prioritizes assigned work while optionally proposing system improvements; it cannot approve those proposals itself.
5. Mission, policy, seat, evidence and approval history survive operator handoffs.
6. Each claim is labeled **proposed**, **specified**, **implemented**, **tested**, or **independently verified**.

## Documentation

| Domain | Guide |
|---|---|
| Enduring corporate identity | [System Entity](docs/system-entity/README.md) |
| Corporate roles and twenty offices | [Agent organization](docs/agent-organization/README.md) |
| Seven Agent components | [Seven layers](docs/seven-layers/README.md) |
| Interoffice MCP contracts | [MCP interoperability](docs/mcp-interoperability/README.md) |
| Operator docking and cloud shift | [Operator lifecycle](docs/operator-lifecycle/README.md) |
| Dual evidence networks | [Evidence networks](docs/evidence-networks/README.md) |
| Shared persistent memory | [Institutional memory](docs/institutional-memory/README.md) |
| Technical diagrams | [Visualizations](docs/visualizations/README.md) |
| Source journal | [Volumes I–III](docs/volumes/README.md) |
| Proposed APIs and schemas | [Specifications](specifications/interfaces/README.md) |
| Hypotheses and evaluation | [Research](research/hypotheses/README.md), [Experiments](experiments/methods/README.md) |

## Sources and intellectual property

The repository is synthesized from **25 NexusBoard Architectural Journal sources**: Volume I (01–10), Volume II (11–17), Volume III (18–25), supplied as three ZIP archives. The research inputs stay outside this public repository. Source-derived Markdown notes and citations are published instead. Original graphics and private implementation remain outside this initial publication. AI-assisted infographic production is not presented as proof of implemented software.

This repository is publicly readable but **has no open-source license yet**; see [LICENSE.md](LICENSE.md). Contributions, pilots and sponsorship are welcomed for discussion under the relevant governance and rights constraints.
