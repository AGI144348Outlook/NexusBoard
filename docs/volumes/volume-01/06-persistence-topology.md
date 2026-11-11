# Source 06 — Persistence Architecture: Neon, D1 and Durable Object SQLite

**Volume:** I — Foundations and operator architecture  
**Original source filename (not uploaded):** 06_persistence_architecture_neon_d1_and_durable_object_sqlite.pdf  
**Source date:** 2026-11-11  
**Evidence status:** proposed architecture or reported source observation; not independently verified deployment.

## Documented architectural substance

Neon is proposed as authoritative shared corporate storage, Durable Object SQLite as seat-local task memory and D1 as optional shared edge store/cache. Each record class needs an authoritative writer, revision and reconciliation rule.

## Important boundary

Avoid treating duplicate mission statuses in different databases as independent sources of truth.

## Interpretive status

This is a research synthesis of an uploaded source PDF, not a transcript, code review, database audit, running service declaration or executed test result. Names of tools and schemas are examples until separately implemented and validated.

## Related documentation

- [Domain guide](../../institutional-memory/README.md)
- [System architecture](../../../ARCHITECTURE.md)
- [Source catalog](../../SOURCE_CATALOG.md)
- [Development roadmap](../../../ROADMAP.md)
