# Federation resilience and identity-boundary security review

**Classification: source-derived architectural assessment and remediation design. NOT a live security audit, penetration test, deployment inspection, or proof that controls are enforced.**  
**Intake:** owner-supplied *NexusBoard Architectural Security Audit: Federation Resilience, Identity Boundary Enforcement, and Provenance Memory* (2026-11-11). The heading claims 26 sources but does not include its bibliography. See [intake record](federation-security-intake.md).

## Executive finding

The proposed architecture addresses three critical trust-boundary hazards: **central-gateway illusion**, **authority laundering**, and **unbounded full-mesh permissions**. Those are valid **threat models**, but the source repeatedly says that security controls are *implemented* or *neutralize* the threats without showing code, database policy, attested endpoint, or test evidence. No such evidence was provided with this report. **Current status: proposed / unverified**.

The project is not certified secure, PROV-O compliant, tamper-evident, or operationally resilient by the existence of this document.

## Architectural boundaries

| Boundary | Proposed invariant | Evidence needed for an implemented claim | Failure indicator |
|---|---|---|---|
| External gateway | Authenticate originating human/service principal, enforce allowed purpose, quotas and mission scope | Code/config path for auth, policy version, principal binding and refusals | Gateway routes solely based on user-controlled seat string |
| Interoffice federation | Every receiving seat reauthorizes caller and *origin's delegation chain*, and permits only per-capability calls | Actual seat manifest, effective allowlist, callee authorization code, logs | Executive hop turns low-privilege request into privileged execution |
| Agent capsule | Durable runtime verifies authorization before side effects or inference, with safe concurrency and state updates | Durable Object/Worker code, storage transaction design and applied deployment revision | Async reentrancy allows conflicting writes or bypasses guard |
| Shared Neon ledger | SQL grants, correct RLS policies, immutable or protected history design, versioned evidence | Live owner/role/grants/RLS configuration under separately authorized review | Privileged DB identity, spoofable context, missing row rules |
| Provenance | First- and second-order lineage records link entities, activities, actors, approval and revisions | Schema, write paths, history and cryptographic/retention design | A claim is accepted without independent valid approval |
| Independent Audit | Separate audit duties, scoped read principal, authenticated evidence and escalation | Charter, connection permissions, actual report and response path | Auditor can implement its own remediation or has unlimited admin access |
| Operator shift | Short-lived scoped human lease OR separately authorized cloud service principal; durable handoff | Lease issuance/revocation code, job ownership, replay policy and stored checkpoints | Expired authorization accepted, duplicated actions, lost mission history |

## Three federation threats

### F-01 — Central-gateway illusion

One corporate gateway may be a practical external MCP interface, but does not grant blanket trust among internal offices. Each seat's serving endpoint must validate **authenticated caller, origin context, target capability, mission, policy/charter versions, data classification and budget**, then decide independently. Directory discovery may reveal a capability descriptor but never grant permission.

### F-02 — Authority laundering

When an external caller asks COO to forward work, an authorized executive intermediary must **not** silently replace the originating authorization with its broader own privileges. The receiving office should evaluate a cryptographically authenticated chain of delegated scopes and the *intersection of constraints applicable to the action*. A literal 'least privileged principal' rule is not sufficient: policies can restrict by purpose, resource, time, audience and action, not just a scalar privilege rank.

**Non-delegable owner decisions** remain outside ordinary interoffice delegation. AR proposals, role changes, schema migrations and budget increases stay provisional until competent authorized review. A model-generated committee transcript or signed but mis-scoped token is not valid approval.

### F-03 — Unbounded full mesh

With 20 seats there are **380 potential directed peer-to-peer pairs** (20 × 19), or 190 undirected pairs. These are **combinatorial possibilities**, not 380 observed connections or permissions. Prefer a capability-scoped graph of allowed interactions, with discoverable service identifiers, explicit callee policies and recorded refusals. Routing need not maintain persistent sockets.

## Four required status dimensions

- **Transport/operation**: accepted, denied, failed, executed.
- **Epistemic assessment**: provisional, contested, supported with limitations, rejected.
- **Governed disposition**: proposed, approved, deferred, rejected, revoked.
- **Observed business outcome**: unobserved, pending, verified outcome, failed.

An HTTP 200 or JSON-RPC success response establishes **none** of the other three on its own.

## Technical corrections required by evidence

1. Cloudflare Durable Objects are single-threaded but **async requests can interleave**; input/output gates and appropriate storage transactions matter. [Cloudflare rules](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/).
2. PostgreSQL RLS isn't an all-powerful authorization layer; owners normally bypass, BYPASSRLS/superusers bypass, and some statements are outside RLS. [PostgreSQL row security](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).
3. A custom `SET LOCAL app.current_seat_number` setting is **not a cryptographic identity** and can be spoofed by SQL-capable principals. The application must authenticate/authorize and bind context to a single transaction. See [RLS design](rls-authorization-design.md).
4. **PROV-O** models provenance (Entity, Activity, Agent and relations); it **does not enforce append-only storage, signatures or tamper evidence**. See [provenance integrity](provenance-integrity.md).
5. 'All database roles including administrators cannot update/delete' is not a credible claim from ordinary grants/triggers alone: administrative owners can alter schema/policies. Tamper resistance needs protected storage, restricted administration and/or independent anchoring.
6. Durable Object single-threaded execution, private SQLite and MCP transport **do not** automatically enforce constitutional authorization.
7. MCP protocol **2026-07-28** has no required `initialize` handshake or protocol-level session, and uses stateless request metadata; NexusBoard operator leases are *application-level*. [MCP release](https://blog.modelcontextprotocol.io/posts/2026-07-28/).
8. The report's sample SQL references `nb.approvals` and specific `en.*` columns not validated here. It is an **illustrative detection idea**, not an executed finding. See [audit query design](audit-query-design.md).

## Proposed review outputs for future hourly repository audits

For each repo, record immutable SHA, inspection scope, possible MCP server/client role, relevant trust boundaries, declared/proposed controls, code-located implementation evidence, status of authorization/lease/database/lineage checks, findings and ambiguity. **Unknown ≠ pass** and **not inspected ≠ vulnerability**. No active tool probing/CI/tests without the required pre-test GitHub record.

### Supporting design notes

[Control/evidence register](federation-control-register.json) · [RLS](rls-authorization-design.md) · [Durable Objects](durable-object-concurrency.md) · [Provenance](provenance-integrity.md) · [Operator handoff](operator-handoff-security.md) · [Audit query](audit-query-design.md).
