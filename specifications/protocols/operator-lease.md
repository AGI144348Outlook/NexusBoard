# Operator lease and handoff — design draft

A **conversational operator** and a **cloud operator** are temporary, distinguishable principals. Neither owns the System Entity or the seat. This protocol is a proposed application contract, not a built-in MCP session mechanism.

## Lease issuance

Human authenticates → purpose/scopes are displayed → backend issues opaque lease_id and expiration → server binds allowed departments, missions, spending, actions and revocation path. Do not depend upon a stable AI-host conversation ID.

## During execution

Every call checks lease status, originator authority, mission ownership, seat permission and budget. Cloud scheduled tasks may continue only under their own standing mandate; overlapping operations require locks/idempotency.

## Shift end

Stop new privilege under revoked lease; separately decide what already-running jobs may complete/cancel. Record mission pointers, last authoritative revision, task statuses, pending approvals, newly assessed sources, failures and remaining budget. Incoming operator obtains scoped, provenance-backed handoff.

## Open questions

Lease conflict priority, elapsed-work quotas, multi-host support and failure recovery after partial external effects require approved decisions and tests.

Sources 03, 15, 24.
