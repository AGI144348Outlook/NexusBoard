# Corporate MCP gateway — draft interface contract

**Status: illustrative specification, not a list of deployed tools.** NexusBoard's parent gateway would wrap authorized departmental/seat services behind one stable public MCP server.

## Candidate tools

| Application tool | Suggested input | Meaning | Required checks |
|---|---|---|---|
| operator.dock | requested_scope, expiry, account | request temporary operator lease | owner consent, principal verification |
| operator.revoke | lease_id, reason | revoke future privileged actions | owner/authorized issuer |
| corporate.status | entity_id | read authorized organizational summary | data classification, seat visibility |
| agent.inspect | agent_id | inspect metadata and capability status | departmental scope |
| mission.create | objective, seat, budget, idempotency_key | create durable, bounded task | lease, quota, policy, ownership |
| mission.status | mission_id | read task state and checkpoint | mission ownership and read limits |
| evidence.read | evidence_id, view_scope | retrieve permitted source/provenance view | evidence classification, tenancy |
| approval.request | target_action, evidence_refs | initiate authorized approval workflow | never auto-grant by model text |

These names are **NexusBoard proposals**, not standard MCP methods. A successful tool reply indicates API-level processing, **not** confirmed completion of a mission or validation of a knowledge claim.

## Response minimum

operation_status; request_id; mission_id (if created); authorized_scope; policy/charter versions; evidence_refs; observed_at; audit_ref; retryability; clear denial/error reason when relevant. Keep claim_assessment_status **separate**.

## Host support

MCP Apps can display docking dashboards in compatible hosts, but the UI is optional and cannot confer rights by itself. Provide tool-based text fallbacks. Do not assume access to the host's internal conversation identifiers.

Sources: 03–04, 18, 21, 25.
