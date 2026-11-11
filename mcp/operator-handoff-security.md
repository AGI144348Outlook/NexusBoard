# Operator rotation, lease revocation and durable mission continuity

**Design only.** The user-provided report describes Cloudflare Cron/Workflow tasks and conversational operator docking. The author did not provide deployment traces, authenticated host sessions, lease issuance implementation, or evidence of actual handoffs.

## Principals

- **Human owner:** ultimate authority over reserved constitutional/security changes.
- **Conversational operator:** approved host user with backend-authenticated, scoped and expiring **application** lease; a model/chat message is not a principal.
- **Cloud operator:** a separate service principal executing preauthorized recurring work, **not** a forever-valid user lease.

MCP 2026-07-28's stateless requests do not prevent a stateful NexusBoard application; the application must own and verify operator handles. [MCP specification release](https://blog.modelcontextprotocol.io/posts/2026-07-28/).

## Shift protocol

1. Register mission, budget, allowed operations and responsible service principal in durable shared state.
2. Before execution, validate relevant user lease or machine mandate and seat-specific authorization; reserve mission work with expiry/fencing or equivalent coordination.
3. Record actual work and safe checkpoints with idempotency; reject duplicates and stale authority.
4. At conversational docking, show an authorized, current *database-backed* handoff. Do not infer mission success from a previous conversation summary.
5. At lease revocation, deny **new** privileged actions and define handling for already in-flight operations, third-party side effects and long-running workflows.
6. Cloud operator resumes only within its independent standing mandate and sees current authoritative revisions.
7. Audit independent principal/lease/mission transition and observed outcome.

## Hazards

- An expired token can be replayed if the service doesn't validate revocation and intended audience.
- Issuing a signed token is not enough without correct issuer, audience, scope, expiry, rotation and revocation semantics.
- Backend clocks, queues and recovery can create overlapping task claims; separate fencing and idempotency are needed.
- An in-flight tool cannot always be stopped *immediately* at the instant the lease expires; cancellation and compensation semantics must be designed.
- A model switching platforms cannot be assumed to carry authenticated privileges across hosts.

No operator lease, live MCP docking, cloud workflow or active session was touched for this update.
