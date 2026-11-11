# Constitutional interoffice protocol — design draft

## Three protocol layers

**MCP wire:** capability discovery and invocations. **Corporate contract:** charter, authenticated principal, purpose, jurisdiction, permitted tools, budgets, obligations and escalation. **Evidence semantics:** source references, contextual classification, proposed edge, assessment, revision and provenance.

Version fields are independent: mcp_protocol_version, seat_charter_version, capability_schema_version, evidence_model_version.

## Request and response

Required request fields: request_id, mission_id, authenticated caller (via trusted transport), proposed office/target, operation, purpose, target context and source refs, budget/limits, protocol versions, idempotency key for side effects. The called service checks all permissions again.

Return **operation status** and **epistemic status** separately. Operation may be accepted_for_review while associated claim is unverified. Unknown tool, mismatched version, unavailable service, expired lease, insufficient scope and quota exhaustion must be explicit, auditable outcomes.

## Committee protocol

Recorded matter → evidence for and against → affected seats → charter and source version → requests to appropriate reviewer seats → objections → competent decision → effective date and appeal/revision route → implementation evidence → independent Audit. A model-generated committee transcript is **not** an authorization record.

## Safety

No authority laundering through corporate gateway; no caller-provided text as principal verification; no self-approval of a protected change; no unrestricted SQL via Agent; no silent write on retry; no fabricated success when peer unavailable.

Sources 18, 21, 24, 25.
