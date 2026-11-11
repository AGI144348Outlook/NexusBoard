# Durable Object isolation: design versus guarantee

**Proposed architectural use, not evidence of deployed seat capsules.** A Durable Object instance provides single-threaded JavaScript execution and its own storage, but this must not be described as *automatically immune to race conditions*.

## What the platform contributes

- A particular Durable Object instance has a single JavaScript event loop and dedicated associated storage, including SQLite-backed storage for eligible classes.
- **Async/await permits request interleaving** while awaiting network and some other asynchronous operations.
- Cloudflare input and output gates protect certain storage consistency paths, but they do not eliminate arbitrary application-level race conditions or authorization bugs.
- Application developers must reason about reentrancy, ordering, idempotency, durable execution, external side effects and concurrency across different Durable Objects and the shared Neon ledger.

Reference: [Rules of Durable Objects](https://developers.cloudflare.com/durable-objects/best-practices/rules-of-durable-objects/).

## Proposed safeguards per seat runtime

1. Resolve authenticated caller and delegated mission from the gateway/backend; **recheck per tool** at the receiving seat.
2. Load charter/policy version and resource scope; fail closed on stale authority.
3. Use atomic transactional state updates and/or concurrency control suitable to the operation, especially across `await`.
4. Separate local checkpoint from authoritative cross-seat Neon revisions; use version checks or transactional coordination where necessary.
5. Require idempotency for writes and record actual external side effects. Compensation/rollback is a separate design concern.
6. Never automatically create a new inference-model call for denied requests; returning a safe refusal can avoid unnecessary cost but must not be relied upon as security proof.
7. A logical constitutional **seat does not necessarily equal one Durable Object instance**; the tenancy and physical deployment plan remains an implementation decision.
8. Durable Object private SQLite is not authorization for external access to that object's RPC/tool methods; enforce access in entrypoints and backend controls.

## Verification status

No Worker source code, Durable Object class, live DO ID, storage policy, permission denial, or restart recovery result was inspected. Each belongs in a **separately pre-registered** evaluation if requested.
