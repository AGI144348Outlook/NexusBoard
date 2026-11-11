# Interoffice seat service — draft interface

**Relative externality** means each office has identifiable jurisdiction and independently enforceable service contracts, whether or not it has a separate process or URL.

## Service manifest fields

seat_id, charter_version, service_identity_ref, active_status, capabilities, resource_refs, accepted_schema_versions, data_scopes, allowed_mission_types, escalation_target and audit_policy.

A service may be an MCP server of a particular capability while also operating as MCP client to another seat. Physical collocation does not justify blanket peer privileges.

## Invocation

Caller authenticates through approved transport. Request includes mission_id, request_id, purpose, target_context, source_refs, intended_effect, idempotency_key for writes and required versions. **Do not trust a JSON caller_seat field as authentication**.

Callee independently verifies principal, delegated authority, active charter, data classification, quotas and content policy. It returns one of accepted/accepted_for_review/rejected_out_of_scope/needs_more_evidence/unavailable/stale_version, with a trace.

## Example distinctions

- AR may propose a new contextual relationship; CDO may assess referential integrity; R&D can evaluate method; COO can dispose a reversible operational proposal within chartered authority.
- CKO can serve prior knowledge, not authorize arbitrary publication.
- Audit independently reviews evidence and decisions; its evaluations cannot be silently self-edited.

The *wire protocol*, *corporate contract* and *evidence semantics* must be separately versioned. Sources: 18–21, 25.
