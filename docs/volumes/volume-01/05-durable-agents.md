# Source 05 — Durable Agents: Cloudflare Workers, Objects and SDK

**Volume:** I — Foundations and operator architecture  
**Original source filename (not uploaded):** 05_durable_agents_cloudflare_workers_objects_and_sdk.pdf  
**Source date:** 2026-11-11  
**Evidence status:** proposed architecture or reported source observation; not independently verified deployment.

## Documented architectural substance

A proposed Durable Object Agent capsule wakes on trigger, reads local SQLite, checks policy, runs deterministic logic and selective model inference, persists checkpoint and returns to idle. Cloudflare Agent SDK, Worker, Workflow and model provide distinct functionality.

## Important boundary

Cloudflare infrastructure does not automatically create a constitutional Agent, Mind Domain or authorization policy.

## Interpretive status

This is a research synthesis of an uploaded source PDF, not a transcript, code review, database audit, running service declaration or executed test result. Names of tools and schemas are examples until separately implemented and validated.

## Related documentation

- [Domain guide](../../operator-lifecycle/README.md)
- [System architecture](../../../ARCHITECTURE.md)
- [Source catalog](../../SOURCE_CATALOG.md)
- [Development roadmap](../../../ROADMAP.md)
