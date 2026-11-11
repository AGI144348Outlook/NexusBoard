# Five deterministic enforcement gates — target controls

**Classification:** specifications for future implementation, not confirmed operational controls. Derived from the user's complete 2026-11-11 MCP report. GitHub code inspection and authorized tests are needed before claiming enforcement.

| Gate | Control | Implementation intention | Evidence required before marking verified |
|---|---|---|---|
| G-01 | Server-side tool authorization | Before side effects, enforce caller/seat/mission policy at the executing service, not only gateway or prompt. | Auditable auth middleware and explicit denial branch; no blanket trust in upstream routing. |
| G-02 | Least-privilege persistence | Every active service uses a constrained DB identity; RLS and SQL grants are reviewed on authoritative data. | Role privileges and policies linked by revision; non-owner credentials for runtime; scope of RLS limitations documented. |
| G-03 | Attributable and tamper-resistant provenance | Record invocation, attempted/denied actions, mission transitions, evidence changes, and approval activities. | Persisted history with actor/source/version, independent audit permissions, append-only or protected mutation controls; PROV-O may model lineage but does not itself enforce this. |
| G-04 | Idempotency, leases and authority expiration | Writes have idempotency keys and authorized execution context; expired user/operator leases are refused. | Repeated write resolves consistently; lease expiry and service-principal mandates honored separately; interruption behavior specified. |
| G-05 | Separation of duties and human escalation | Protect schema changes, spend, public publication and constitutional decisions behind role-specific approvals. | Recorded proposer, reviewer, approver, competent decision, dissent, protected deployment and independent post-action examination. |

## Clarifications

- An MCP session handshake is **not** a trust root in the **2026-07-28** protocol. NexusBoard operator leases are separately issued application authorization objects; scheduled machine service work may use dedicated scoped service principals rather than a human operator lease on every call.
- A tool returning status `completed` does not establish the truth of the data or independently verified external effects. Report `operation_status`, `epistemic_status`, and where relevant `outcome_status` separately.
- **RLS** is one defense within a broader database privilege model, not a universal security proof. Owner/superuser/BYPASSRLS behavior and non-row-restricted SQL operations must be reviewed.
- Privileged decisions are never self-approved by the same Agent that proposed them. A temporary outage should return an explicit refusal or pending state rather than fictional success.
- Competing claims and rejected proposals remain historically attributable, subject to legitimate privacy deletion requirements.

## Implementation checklist

For each gate specify component owner, code path, configured principal, version, negative case, log/evidence path, expiration/rollback and independent reviewer. **No negative-case tests are performed by this document.**

## Testing policy

Before running *any* GitHub repository diagnostic, benchmark, tests, endpoint probes or CI, publish the required public-safe Issue/Discussion in the repository under test. After execution report actual results in that same thread. If publishing is unavailable, stop and report. See [CONTRIBUTING.md](../CONTRIBUTING.md).

## Additional technical guardrails from federation security review

- Postgres custom session variables are untrusted unless established through authenticated, narrow server-side transaction context; role/owner/BYPASSRLS exceptions and policy definitions matter.
- Cloudflare Durable Object single-threaded execution permits asynchronous interleaving; atomicity requires appropriate storage/concurrency design.
- W3C PROV-O provenance descriptions and content hashes are not automatically immutable or tamper-evident; use independent log protection.
- Check both the origin's authorization and the acting seat's jurisdiction on each interoffice hop; do not simply adopt the upstream gateway's privilege.
- Operator leases are application-level and can differ from separately authorized scheduled cloud service principals.
- Independent Audit findings do not themselves activate unreviewed production circuit breakers.

See [federation security review](federation-security-review.md) and the [thirteen-control register](federation-control-register.json). **Enforcement status: specified, not verified.**
