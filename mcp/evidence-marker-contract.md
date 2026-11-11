# Evidence marker contract for hourly jurisdiction audits

A seat manifest should record **what evidence would demonstrate proper execution** and **where a real auditor is permitted to inspect it**. This file does not create those records.

## Minimum future `seat_audit_record` fields

| Field | Purpose |
|---|---|
| `repo`, `branch_sha`, `reviewed_at`, `ruleset_version` | Fixes the immutable audit scope and standard used |
| `seat_id`, `charter_version`, `implementation_status` | Distinguishes stable office from code/runtime occupant |
| `observed_mcp_role`, `observed_tool_descriptors` | Links observed client/server implementation rather than a speculative diagram |
| `required_evidence_markers`, `observed_evidence_refs` | Separates prescribed record types from what was actually found |
| `caller_principal_scope`, `decision_authority_ref` | Records asserted vs authenticated authority and approvals |
| `operation_status`, `epistemic_status`, `outcome_status` | Prevents claim of truth from a successful transport response |
| `independent_review_ref`, `limitations` | Captures separation of duties and missing access |
| `finding_id`, `severity`, `confidence`, `owner`, `next_action` | Supports deduplicated remediations |

## Permitted evidence quality levels

- **Documented:** a manifest or prose names a control; evidence of intention only.
- **Code-located:** stable path, commit and handler identified; proof of existence only.
- **Static-reviewed:** implementation and authorization conditions analyzed without execution.
- **Live-observed:** read-only live observation under an appropriate authorization/pre-test plan where this constitutes a diagnostic.
- **Tested:** previously published GitHub pre-test thread followed by actual method and results in the **same** thread.
- **Independently verified:** a separate evaluator confirms a bounded claim.

If logs are internal, sensitive, or inaccessible, record `not_inspectable`, not automatically `failed` or `passed`. A compliance assertion must cite actual evidence.

## Jurisdiction outcomes

Use `consistent_with_documented_design`, `drift_detected`, `authority_conflict`, `evidence_missing_from_available_scope`, `not_applicable`, or `cannot_determine`. The first is not a certification that policy is actively enforced.

## Non-public handling

Audit logs may contain operator IDs, identities, security tokens, customer data or confidential approval records. Store only permitted references/hashes and redacted summaries in public GitHub. Store sensitive details in a restricted ledger with real access controls.

## Safety gate

Before tests, diagnostics, live MCP discovery, endpoint probes, SQL queries meant to verify behavior or CI: publish the pre-test Issue/Discussion in the **repository under test**, documenting Timothy's relevant discussion, problem, hypothesis, method, expected/challenging observations. Afterward follow up with actual observations and limitations in that same thread. If posting is blocked, do not run tests.
