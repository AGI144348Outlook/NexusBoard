# Proposed independent audit checks — not executed SQL

**Source excerpt (conceptual):** the report proposes selecting accepted `en.relations` lacking rows in `nb.approvals`. The referenced tables, columns, approval validity rules, privileges and transaction boundaries have **not** been verified. Its original SQL is not evidence of a working detection service.

## Candidate invariant A: accepted relation requires competent authorization

For each accepted relation version at its effective time, require a matching, attributable, **valid** disposition: correct target and revision; approved action and role; competent authority; no self-approval where prohibited; active delegation; appropriate policy version; unexpired/revoked status; and a reviewable audit chain.

Simply joining `en.relations` and `nb.approvals` on `target_relation_id` and checking for a non-null ID is **insufficient**: forged, revoked, mismatched, old-version or unauthorized approvals could pass.

## Candidate invariant B: interoffice tool effects require authorization

For each **actual effect**, link verified initiating principal and service identity, origin/seat delegation, mission, authenticated authorization decision, requested tool, callee capability/charter version, idempotency and resulting audit event. Scheduled machine operations may use a standing service mandate rather than a conversational lease.

## Candidate invariant C: independent audit review

Audit findings need attributable observations, original log/source references, reviewer independence, available scope, any withheld confidential detail, and disposition/review history. Audit is **not** authorized to deploy its own remediation.

## Candidate incident response

An observed invalid authorization may trigger a **proposed**, preapproved fail-closed workflow: isolate affected mission, revoke scoped access or pause seat operations, preserve evidence, alert human owner and record independent review. **Do not auto-disable production services based only on a model suspicion or an unvalidated query**. Circuit breakers and thresholds must be explicitly authorized and separately evaluated.

## Query requirements before future execution

Inventory actual schema first, approve read-only principal and privacy scope, define temporal approval semantics, ensure correct join keys and revision handling, bound query cost and result size, and publish the required **pre-test Issue/Discussion** in the repository being worked on before any diagnostic SQL test. Post observed results in that same thread. **No query or test was executed in this documentation task.**
