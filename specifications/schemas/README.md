# Proposed relational and message schemas

**Conceptual only — no migrations were executed.** Names and examples below are design aids, not database objects or callable endpoints in the current public repository.

- [Evidence model](evidence-model.md) — first/second-order graph and inward Neon mirror.
- [Seat charter sample](seat-charter.example.json) — illustrative application manifest.
- [Interoffice request sample](interoffice-request.example.json) — an example body that is **not** authentication.

The source journal reported existing tables **nb.nodes, nb.authority, nb.evidence, nb.runs, nb.instances, nb.audit** in an earlier NexusBoard project. These are **historical source statements** rather than live inspected schema. Proposed en.* additions must be designed around existing data owners and migrations (Sources 13, 17, 23).

Never feed unrestricted model-generated SQL into a production database. Use least privilege, scoped command interfaces and row-level policies where applicable.
