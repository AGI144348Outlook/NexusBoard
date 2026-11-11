# Owner-supplied security report — intake and assessment

**Title:** *NexusBoard Architectural Security Audit: Federation Resilience, Identity Boundary Enforcement, and Provenance Memory*  
**Received:** 2026-11-11 in current conversation. **Claimed source count:** 26; no bibliography supplied. This is **additional source material**, not a live infrastructure inspection and not necessarily 26 unique sources beyond earlier report material.

## What this report contributes

A proposed defense-in-depth strategy for central gateway, delegated identity, peer capability routing, RLS, Durable Object state, W3C PROV-O provenance and independent audit across rotating operators. It describes a hypothetical SQL approval check and an automatic containment proposal.

## Corrections for an evidence-grade repository

- **Source language overstates verification:** 'implemented', 'neutralizes', 'guarantees', 'enforces' and 'cryptographically verified' must remain design requirements without code, policies, migrations, logs or actual results.
- **MCP transport:** July 2026 introduced stateless requests and removed protocol sessions/initialize; remote is Streamable HTTP with possible SSE responses, not the old HTTP+SSE default.
- **RLS custom variables:** `SET LOCAL app.current_*` is transaction-local context, not identity proof; arbitrary SQL-capable application principals may alter custom settings. Actual grants, role owners, RLS/force policies and authenticated context binding matter.
- **RLS limitations:** superusers/BYPASSRLS and table ownership behavior make 'no updates/deletes for all administrators' untenable under ordinary SQL permissions.
- **Durable Object:** single threaded execution still allows asynchronous event interleaving; private SQLite does not replace server-side auth.
- **PROV-O:** vocabulary for provenance, not a cryptographic immutability scheme.
- **Audit SQL:** references to `nb.approvals` and accepted relations are *unconfirmed*; a simple missing-approval query cannot check approval validity or delegation.
- **Incident response:** automatic circuit breakers must be approved and designed to resist false positives/denial of service; report findings alone do not prove compromise.
- **Topology:** 20 × 19 = **380 potential directed pairs**, not a count of running sockets or permitted channels.

## Publication boundary

Only a derived public-safe synthesis is committed; not the unreviewed original PDF archives, secrets, source conversations or credential details. All new declarations remain **proposed**. No tests, endpoint calls, SQL access, CI, or deployment changes were conducted. [Primary review](federation-security-review.md).
