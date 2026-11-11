# Source 03 — Operator Docking: Conversation and Cloud Shift Handoffs

**Volume:** I — Foundations and operator architecture  
**Original source filename (not uploaded):** 03_operator_docking_conversation_and_cloud_shift_handoffs.pdf  
**Source date:** 2026-11-11  
**Evidence status:** proposed architecture or reported source observation; not independently verified deployment.

## Documented architectural substance

A conversation can request an authenticated, scoped, time-limited lease through a gateway. Preauthorized cloud processes perform bounded scheduled work when no conversation controls the mission. Work and evidence survive operator shift through durable state.

## Important boundary

The backend issues its own session identity; an AI host's internal conversation ID should not be assumed portable.

## Interpretive status

This is a research synthesis of an uploaded source PDF, not a transcript, code review, database audit, running service declaration or executed test result. Names of tools and schemas are examples until separately implemented and validated.

## Related documentation

- [Domain guide](../../operator-lifecycle/README.md)
- [System architecture](../../../ARCHITECTURE.md)
- [Source catalog](../../SOURCE_CATALOG.md)
- [Development roadmap](../../../ROADMAP.md)
