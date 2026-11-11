# Roadmap: from architecture to a measured demonstrator

All implementation milestones are **proposed** unless their acceptance evidence is linked. Planning does not imply execution.

| Stage | Deliverable | Required acceptance evidence | Status |
|---|---|---|---|
| 0 — Documentation baseline | Source catalog for 25 PDFs, reconciled design vocabulary | reviewable versioned Markdown and contradiction log | In progress |
| 1 — Authority baseline | System and seat IDs, charters, operator policy | approved contracts, identity history and permission rules | Proposed |
| 2 — Data inventory | Existing nb.* schema inspection and isolated en.* migration design | backed-up dependency map, privilege review, controlled migration plan | Proposed |
| 3 — Evidence slice | source → observation → relation proposal → independent assessment → revision | queryable original and current states, traceable reviewer, permission denials | Proposed |
| 4 — Operator/MCP slice | authenticated corporate gateway and two bounded seat interfaces | allowed/denied requests, durable lease revocation and handoff | Proposed |
| 5 — Runtime slice | one event-driven agent with checkpoint and optional inference | recovery trace, deterministic action, model cost and error record | Proposed |
| 6 — Committee path | AR proposal → COO/affected office review → authorization → Audit | preserved objections and proof of disposition with attribution | Proposed |
| 7 — Public demonstrator | scoped reproducible case, diagrams and technical report | pre-registered test, actual result thread, methods, limitations | Proposed |

## Recommended first bounded pilot (Source 17)

Capture **one claim**, two source observations, one tentative support relation, one challenge to source independence and one governed revision. Confirm that a lower-privilege Agent may propose but not self-approve; a new operator can reconstruct history; and an unavailable/denied tool produces a candid refusal. These are **future acceptance tests**, not past achievements.

## Gates

Before any GitHub repository test, diagnosis, benchmark or CI trigger, publish a pre-test Issue/Discussion **in that repository** with discussion context, problem, hypothesis, proposed solution, exact method, expected results and disconfirmation criteria. After the test, report actual outcomes in the same thread. If pre-registration cannot be posted, report the block and **do not run the test**.

Production credentials, spending, permission escalation, public publishing and rights decisions require explicit competent human approval. Existing NexusBoard services must be audited before migration; do not overwrite earlier projects on architectural assumption alone.

See [experiments](experiments/methods/README.md), [hypotheses](research/hypotheses/README.md), [funding milestones](funding/milestones.md).
