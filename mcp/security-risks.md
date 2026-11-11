# Eight architectural threat scenarios — proposed security review

**Source:** complete user-supplied NexusBoard MCP audit report (security section). These are **hypothesized risks and specified mitigations**, **not confirmed vulnerabilities in deployed code**. A static review may identify risk indicators; live verification requires a GitHub pre-test publication gate.

| ID | Anti-pattern | Risk mechanism | Required mitigation | Suggested severity if observed |
|---|---|---|---|---|
| R-01 | Central-gateway illusion | Single external gateway is mistaken for sufficient security while internal seats trust upstream blindly. | Child seat independently authenticates delegated principal, checks scope and records audit. | High |
| R-02 | Authority laundering across gateways | An unprivileged caller gains executive privileges when routed by a trusted office. | Bind original user/lease and acting seat identity to downstream authorization; reject chain mismatch. | Critical |
| R-03 | Unbounded full mesh | All 20 seats can invoke all 19 peers without capability-specific limits. | Per-seat, per-tool allowlists and mission-limited token scopes; no default blanket trust. | High |
| R-04 | Self-promotion and role elevation | An AI proposal turns into its own SQL grants or broader tool access. | Out-of-band human-approved provisioning and independent approval path; model never grants SQL roles. | Critical |
| R-05 | Tool success confused with truth | HTTP/JSON-RPC success is taken as factual verification or actual business completion. | Separate operation state, evidence assessment, real-world outcome and independent verification. | High |
| R-06 | AR self-adoption of improvements | Background AR recommendation directly deploys a change. | AR proposal → COO classification → required competent review/owner approval → CTO deployment → independent Audit. | High |
| R-07 | Prompt-level impersonation | Caller identity accepted from a self-written clientInfo or caller_seat string. | Cryptographically verifiable authentication/authorization; server-issued scoped lease; check at callee. | Critical |
| R-08 | Database-owner credential leakage and RLS bypass | Agent service uses owner/superuser/BYPASSRLS database credentials. | Dedicated least-privilege identities or safely shared identity model, RLS enablement, grants, and careful owner role separation. | Critical |

## Evidence requirements for each finding

| ID | What could challenge a claim of safety? |
|---|---|
| R-01 | Missing downstream policy check; gateway token grants broad powers. |
| R-02 | Downstream accepts a privileged call with no original-caller context. |
| R-03 | Any low-privilege seat can call unrelated high-privilege tool. |
| R-04 | Agent service can modify grants/roles through its own credentials. |
| R-05 | Successful API response automatically marks contested claim SUPPORTED. |
| R-06 | AR candidate is promoted without recorded authorized disposition. |
| R-07 | Altering JSON string changes granted role. |
| R-08 | Application login has BYPASSRLS or owner-style broad table privileges. |

## Special corrections

1. **Audit access:** The report describes Internal Audit as having 'unrestricted read access.' That should be **recast** as comprehensive **authorized**, logged, privacy-limited, need-to-know inspection access. It must not mean administrative database-owner credentials or unlimited export privileges.
2. **PROV-O does not ensure immutability:** W3C provenance vocabularies encode relationships and attribution. Append-only retention, tamper-evident signatures/hashes, protected audit ingestion, immutable storage controls, and recovery procedures are **separate engineering obligations**.
3. **RLS nuance:** Table owners normally bypass RLS, superusers and BYPASSRLS principals always bypass it; `FORCE ROW LEVEL SECURITY` constrains owner behavior but **not** superusers/BYPASSRLS. Certain SQL operations are not subject to RLS. Check PostgreSQL's [official RLS documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).
4. **20 seats ≠ 20 required SQL accounts:** least privilege may be implemented through roles scoped to actual service boundaries, with safely enforced per-request tenant/seat authorization. Seat names and evidentiary roles alone must never be used as database principals.
5. **Source report ≠ test:** No live probe, SQL query, policy evaluation, audit log inspection, credential test or CI run took place in producing this synthesis.

## Remediation states

`proposed_control` → `located_in_code` → `statically_reviewed` → `authorized_test_executed` → `independently_verified`. A mitigation should not be labeled 'enforced' merely because it is specified.

See [enforcement gates](enforcement-gates.md), [repository audit checklist](audit-checklist.md), [governance](../GOVERNANCE.md).
