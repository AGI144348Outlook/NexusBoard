# New source intake — Twenty Corporate Seats & Jurisdiction Boundary Audit

**Received in conversation:** 2026-11-11.  
**Source title:** *NexusBoard 20 Corporate Seats & Jurisdiction Boundary Audit*.  
**Source disclosure:** heading states **26 sources**, but no bibliography or individually linked references were supplied. This material is a source report—not a repository scan performed here.

## Contribution beyond previous report

The earlier full report defined twenty office services, forty URI templates, thirty-one candidate capabilities, eight risk scenarios and five proposed enforcement gates. This later report adds:

- Seat-specific **evidence and continuity markers**, including governance dockets, R&D preregistration, cost snapshots, provenance, releases, source lineage, risk assumptions and operator permissions.
- A **jurisdiction / forbidden-action / escalation** matrix for all twenty offices.
- More explicit MCP client dependencies, using human-readable resource and capability names rather than asserting a real `nexusboard://` service exists.
- A proposed authorization pathway: model suggestion → server policy → database check → permitted action or refusal → independently documented disposition and Audit.

## Corrections and uncertainties

- 'Server-enforced' and 'immutable' are specifications until supported by actual implementation/configuration and auditable execution history.
- PostgreSQL RLS applies at a **table/policy level**, and owner, BYPASSRLS and other privilege pathways must be reviewed. It does not alone implement constitutional governance or protect every database operation.
- Internal Audit may require broad inspection rights but should **never** automatically receive unrestricted access to private data, secrets or database-owner privileges.
- A resource named `committee.minutes.read` in this report may map to an earlier URI template `nexusboard://board/minutes/{hearing_id}`; mapping is **proposed**, not a live alias.
- MVPs may share physical runtime and DB principals while still requiring effective per-seat authorization; the design should avoid mandating twenty separately running servers or database credentials without implementation evidence.
- This is a **separate report** with the same claimed source count of 26, not proof of 26 additional unique sources or their equivalence to the earlier 25-PDF journal.

## Integration

[Machine-readable seat matrix](jurisdiction-matrix.json) · [human-readable audit](jurisdiction-boundary-audit.md) · [authorization flow](authorization-flow.md) · [evidence contract](evidence-marker-contract.md).

No tests, live MCP discovery, SQL policy probes or operational changes were performed as part of this document intake.
