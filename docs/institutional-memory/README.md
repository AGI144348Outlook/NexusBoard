# Institutional memory and inward relational mirror

Persistent identity, active work and shared knowledge require **separate but linked** records:

- Constitutional: System Entity ID, seat/Agent identity, approved roles, policy versions, operator lease history.
- Operational: mission queue, checkpoint, budget, approvals, retries, tool outcome.
- Epistemic: source encounter, Evidence Resource Unit, contextual model branches, relation proposals, assessments, dissent and revisions.

## Proposed storage ownership

**Neon PostgreSQL:** authoritative shared corporate and evidentiary records.  
**Durable Object SQLite:** seat-local job pointer, working memory and replay checkpoint.  
**Cloudflare D1:** optional edge-local shared store/cache, **not** another unversioned source of truth.

The sources report preexisting nb.* organizational/evidence tables in an older project and propose an isolated en.* evidence layer; this repository has **not** audited or migrated those live tables. A database alone does not implement cognition, MCP, or constitutional permissions.

## Non-destructive revision

Versioned contextual models can disagree. The currently governed view may change while the underlying source, earlier relation assessment and authority record remain separately reconstructable. Systemic policy changes require a distinct authorized constitutional path.

Sources 06, 09, 11–17, 22–24.
