# Three independent kinds of roles

The supplied report distinguishes:

| Axis | Examples | What it controls | What it does **not** confer |
|---|---|---|---|
| SQL principal/role | `role_ar_worker`, `role_audit_reader` (illustrative) | Authenticated database permissions and RLS decisions | Corporate legitimacy or semantic truth |
| Constitutional seat | Seat 08 AR, Seat 20 Internal Audit | Application work, accountabilities, escalation and tool capability scope | Database owner privileges or implicit MCP permission |
| Evidentiary contextual role | A source supports Claim A and contradicts Claim B | Meaning and weight of evidence **within an inquiry** | PostgreSQL login or global authorization |

The physical service architecture may employ service principals rather than one database role for each office; the design requirement is **effective least privilege and independent authorization** at the actual boundary.

A contextual evidence relation may be tentative and still retained. Logging the proposed relation does not imply a database GRANT. Audit's mandate for independent inspection requires broad **authorized**, logged visibility, not unlimited privileged querying.

A request must be evaluated against the original authorized principal/lease (where applicable), acting seat's charter, mission, target resources, and receiving seat's own policy. Tool descriptions, JSON-supplied seat IDs and clientInfo are not authentication.

See [threat review](security-risks.md), [resource index](resource-uris.md), and [seat profiles](seat-profiles.md).
