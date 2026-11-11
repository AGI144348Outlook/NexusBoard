# NexusBoard jurisdiction and evidentiary boundary audit

**Classification:** source-derived **proposed audit standard**, not an executed audit of the running twenty-seat system. Based on the owner's *NexusBoard 20 Corporate Seats & Jurisdiction Boundary Audit*. Its heading claims **26 sources** but provides no bibliography; these source counts must not be conflated with the 25 separately uploaded journal PDFs.

## Five distinct architectural identities

1. **Corporate seat:** durable charter and jurisdiction; persists through model or occupant changes.
2. **Agent/occupant:** stateful actor executing limited work for a seat.
3. **Reasoning model:** replaceable interpretive service without its own constitutional rights.
4. **MCP client/server endpoint:** the protocol-facing connection and capability boundary; may represent a seat or serve several logical seats with separate authorization.
5. **Database principal:** PostgreSQL authentication/SQL permission/RLS identity; not automatically a seat or a claim-assessment role.

Discovering a tool does not authorize calling it. Naming a seat does not create a server, and a successful tool call does not validate evidence.

## Twenty-seat boundary matrix

| Seat | Primary jurisdiction | Required evidence of proper operation | Hard boundary | Escalation |
|---|---|---|---|---|
| 01 Board Chair | committee governance | Committee decision ledgers; verified attendance and eligibility; charter versions; procedural issues and appeals | May convene, record quorum and decisions; cannot deploy code, alter evidence or modify schemas | CEO / Board |
| 02 CEO | strategic direction | Executive resolutions; strategic rationale; delegated authority ledger; policy exceptions | Founder-defined authority ceiling; cannot rewrite owner-controlled constitution or bypass CISO | Founder |
| 03 COO | mission and proposal dispatch | Sequential approval logs; committee consultations; workload constraints; mission checkpoints | Cannot bypass CISO or CDO controls; constitutional and material legal/strategic changes escalate | CEO / Board |
| 04 CFO | compute and financial budgets | Time-stamped provider tariffs; budget versions; quantitative cost models; transaction authorizations | Cost savings cannot establish research truth or supersede security/compliance policy | COO / CEO |
| 05 CTO | implementation, deployment and technical standards | Architecture decision records; build logs; implementation references; deployment validation records | Cannot change evidence meaning or business policy without competent review | COO / CCO |
| 06 CIO | service directory and network transport | Service principal manifests; versioned endpoint catalogs; network health/availability records | Discovered/reachable endpoint does not grant execution authority | CISO / CTO |
| 07 CISO | authentication and policy evaluation | Authenticated principal attestations; denial logs; key rotation; access revocation records | No model-created privilege grants; untrusted headers/clientInfo do not prove identity | CEO / Board |
| 08 CARO / Agent Resources | evidence intake and provisional contextual proposals | Source provenance hashes; alternate context versions; unverified-claim state; improvement proposal records | Required processing does not authorize adoption; cannot self-approve, deploy or self-grant access | COO / CKO |
| 09 CSO | strategic alternatives and priorities | Scenario analyses; objective weight matrices; sensitivity analysis; uncertainty bounds | Strategic advice is not a binding operational order | CEO |
| 10 CRO | systemic risk assessment | Threat-model assumptions; impact scores; uncertainty bounds; mitigation registry | Cannot suppress valid evidence; exceptions require recorded escalation | COO / CEO |
| 11 CCO | constitutional and contractual conformance | Policy IDs and effective dates; operation logs; discrepancy/violation notices | Cannot retroactively forge or unilaterally rewrite governing contracts | CEO / Legal |
| 12 CLO | rights, privacy, licensing and retention | Rights ownership evidence; retention schedules; consent records; publication clearances | AI-generated legal advice is advisory; formal commitments need authorized humans | Founder / CEO |
| 13 CDO | schemas, constraints and physical data integrity | Migration proposals; constraint and FK checks; identity mappings; RLS/grant reviews | Enforces structure rather than contextual semantic meaning | CTO / CISO |
| 14 CKO | retrieval and archive coverage | Coverage-gap analyses; retrieval traces; staleness warnings; precision/quality metrics | Retrieval relevance does not prove truth or override AR relation assessments | AR / CDO |
| 15 CPO | requirements and release readiness | Approved feature charters; user stories; delivery verification; release attestations | Product ambition cannot bypass security, privacy or data-integrity constraints | COO / CTO |
| 16 CRevO | offer revenue assessments and terms | Advertised payout conditions; subscription costs; net payout formulas; revenue evidence trail | Cannot guarantee earnings or approve prohibited referral practices without evidence and compliance | CFO / COO |
| 17 CMO | publication planning and claims review | Approved publication drafts; affiliate disclosures; citations; edition release logs | Cannot publish unverified payouts/claims; publication needs appropriate approval | COO / CLO |
| 18 CCuO | user feedback and accessibility | Anonymized feedback; accessibility reports; consent records; severity rankings | Feedback is evidence, not consent to change configuration or access private data | CPO / CISO |
| 19 VP R&D | experimental method and reproducibility | Preregistered methods; repository pre-test threads; raw outcomes; failures; limitations; reproducibility review | No repository test/diagnostic/CI without pre-test GitHub issue or discussion; cannot self-approve production adoption | COO / Audit |
| 20 Internal Audit | independent governance and execution review | Protected/tamper-evident logs where implemented; findings; management responses; remediation verification records | Cannot implement, approve or execute audited processes; broad access must remain authenticated, privacy-limited and logged | Board Chair |

## Audit interpretation

A missing evidence marker in a public repository may mean **not inspectable**, not necessarily absent. To assign an implementation-grade finding, tie the rule to a precise source path/configuration or a separately authorized server-side log. The repository's `mcp` branch contains **design declarations**, so all proposed markers are unverified unless independent evidence is recorded. State the minimum evidence needed, the observed evidence, the gap and the allowed severity with uncertainty.

## Relationship to existing documents

- [Machine-readable matrix](jurisdiction-matrix.json) contains each seat's proposed tools, resource names, client dependencies, evidence markers, authority boundary and escalation.
- [Twenty-seat MCP profile](seat-profiles.md) contains the earlier resource URI proposals and narrative.
- [Authorization flow](authorization-flow.md) identifies the enforcement chain and approvals.
- [Evidence-marker contract](evidence-marker-contract.md) describes what an auditor can verify without inventing a compliance result.
- [Audit checklist](audit-checklist.md) gives the safe static procedure.
- [Security risks](security-risks.md) lists eight identified architectural threat classes.

## Reporting caveat

The supplied report uses phrases such as 'server-enforced' and 'immutable cryptographic trail'. These are **design objectives** in the absence of code-path evidence, policy inspection and actual records. This documentation does not assert successful enforcement, source immutability or twenty running MCP servers.
