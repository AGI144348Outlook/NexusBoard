# Evidence Network Memory — conceptual Neon schema

**Status: proposed.** Source 13 gives one normalized model; Source 23 refines it with Evidence Resource Units (ERUs) and simultaneous contextual models. The two models should be reconciled before SQL migration, not silently declared identical.

## Foundation entities

| Candidate logical family | Required concept |
|---|---|
| en.sources / en.entities | stable identity and version of a source/observation/claim/activity |
| en.resource_units | extracted ERU with source span, classification, scope |
| en.context_models / en.model_branches | alternative contextual interpretations without copying raw sources |
| en.memberships | investigation/context hierarchy and membership |
| en.relations / en.relation_proposals | uniquely identified typed links, author, status and source revision |
| en.relation_assessments | review of a specific relation ID/revision and independence/validity |
| en.activities / en.attributions | observed processing actions, actors, procedures and provenance |
| en.role_assignments | application role, context, effective period, revocation |
| en.revisions | non-destructive transitions, supersession and temporality |
| en.provenance_bundles / en.bundles | grouped provenance assertions, potentially provenance-of-provenance |
| en.application_candidates / en.change_justifications | proposed AR general improvements, separate from adoption |
| en.dispositions | governed approve/defer/reject decisions and authority history |

Actual names, keys and dependencies are **unapproved**; a versioned schema mapping must reconcile the overlapping Source 13 and Source 23 vocabularies.

## Relational invariants

1. Evidence and relation IDs never silently change when an interpretation is revised.
2. Source snapshot/version and activity attribution are independently retrievable.
3. Relation proposal and relation assessment live in separate records.
4. Contextual role and membership never automatically grant database SQL privilege.
5. A saved current projection references preceding revisions; privacy-compliant payload deletion remains possible where required.
6. The original parent-child organization hierarchy is **not** the evidence support graph.
7. AR proposes structural/semantic links; CDO enforces schema integrity; independent reviewers assess meaning.

## Example history

Source S-A and S-B both appear to support claim C-101. A reviewer finds common original measurement M-1; an assessment changes from 'apparent independent support' to 'not independent' without deleting sources. If policy demands two independent sources, C-101 becomes review-required; it does not automatically disappear.

## Migration control

Inventory live db first → classify data owners → back up → design isolated en namespace → approve privilege and temporal rules → pre-register repository/database tests → execute in safe environment only after approval → report observed results in original pre-test thread. **None of this was performed here.**

Sources 06, 11–17, 23.
