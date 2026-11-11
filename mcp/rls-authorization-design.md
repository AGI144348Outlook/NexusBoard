# Neon/PostgreSQL Row-Level Security: authorization design and limits

**PROPOSAL ONLY.** No live Neon schema, roles, policy expressions, migration or connection configuration was inspected. Example identifiers from the source (`nb.*`, `en.*`, `nb.approvals`) are historical/proposed and may not exist as described.

## Context is not identity

The report suggests `SET LOCAL app.current_seat_number = '08'`, `app.current_agent_id`, and `app.current_operator_id`. PostgreSQL custom configuration values can be application-set, but a database user allowed to run arbitrary SQL might set/override such values. **Do not treat these strings as authenticated claims**.

If a trusted backend uses transaction-local settings:
1. Verify originating human/service principal, role, delegation chain, mission, charter and permitted resource **before** acquiring database access.
2. Use a narrowly privileged database connection, start an explicit transaction, set bounded transaction-local context **from the server-side verified authorization** using safe parameterization such as `set_config(..., true)`, then perform allowed SQL in the **same transaction**.
3. Use separate trusted execution paths for admin changes; prevent arbitrary model-created SQL and user control of settings.
4. Carefully define behavior for transaction pooling, reconnects, nested calls, stale state and retries; default-deny missing context.
5. Ensure SQL `GRANT`/roles and actual RLS `USING` and `WITH CHECK` predicates enforce authority, not merely the presence of a custom setting.
6. Validate that the application database role cannot switch to stronger roles, create unsafe functions, alter policies or reach owner/BYPASSRLS.

A narrower alternative is per-service scoped DB credentials plus policy-constrained write APIs, avoiding reliance on mutable session variables alone. Separate physical DB credentials for all 20 seats are **not mandatory** to achieve a defensible boundary, provided the actual service identity and authorization are robust.

## Source table design candidates — not verified

| Proposed table | Intended limitation | What would need actual verification |
|---|---|---|
| `en.entities` | constrained observation capture and scoped retrieval | grants, sensitivity filters, mission ownership and update behavior |
| `en.relations` | AR can create **provisional** edges but cannot self-promote | insert/check constraints, approved transition path and historical revisions |
| `en.relation_assessments` | review separate from original proposer | real evaluator principal, independent review restrictions and attestations |
| `en.role_assignments` | no model-created privilege escalation | human-controlled role-management service distinct from SQL grants |
| `nb.audit` / proposed `nb.approvals` | protected writes, immutable historical trace | append controls, actor signatures, authorization validity, independence and retention |

**Caution:** a row's `status='accepted'` plus a non-null approval ID does **not** prove the approval was valid, unexpired or within delegation.

## RLS-specific limitations

- Table owners **normally bypass** RLS; `FORCE ROW LEVEL SECURITY` can constrain owner access, but **not** superusers/BYPASSRLS.
- RLS is not a substitute for table-level privileges or protection of DDL and maintenance operations; `TRUNCATE` and `REFERENCES` are outside row security.
- A policy's correctness cannot be derived from naming conventions or architectural prose.
- An assertion that administrators can *never* mutate `nb.audit` is not enforceable with normal database grants alone; consider external WORM/append-only signed archives and organizational dual control.

**Source:** [PostgreSQL RLS documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html).

## Future evidence requirement

Document database role identity and inherited grants, `rolbypassrls`, table owners, effective row policies, allowed commands, trusted context binding, approval control path and protected log retention. Any live diagnostics or policy tests require prior GitHub pre-test publication in the tested repo, then actual observations in that same thread. **No SQL was executed for this documentation.**
