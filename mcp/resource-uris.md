# Proposed NexusBoard MCP context resources

The following `nexusboard://` URI templates are **application-level resource identifiers**, not evidence of deployed MCP resource handlers. The full report supplies two URI examples per corporate seat. These may eventually appear through `resources/list`, `resources/templates/list` and `resources/read` **if the server implements the corresponding features**. The actual MCP method is `resources/templates/list`; 'resources/templates' is an informal shorthand.

## Seat-to-resource matrix

| Seat | Template 1 | Template 2 |
|---|---|---|
| 01 — Board Chair | `nexusboard://board/minutes/{hearing_id}` | `nexusboard://board/decisions/{resolution_id}` |
| 02 — CEO | `nexusboard://constitution/versions/{version_id}` | `nexusboard://executive/portfolio` |
| 03 — COO | `nexusboard://operations/missions/dashboard` | `nexusboard://operations/dependency/map` |
| 04 — CFO | `nexusboard://finance/costcenters/{center_id}` | `nexusboard://finance/forecasts/scenarios` |
| 05 — CTO | `nexusboard://tech/servicecatalog` | `nexusboard://tech/dependencymap` |
| 06 — CIO | `nexusboard://cio/directory/resolve` | `nexusboard://cio/availability/status` |
| 07 — CISO | `nexusboard://security/policies/{policy_id}` | `nexusboard://security/attestations/{principal_id}` |
| 08 — CARO / Agent Resources (AR) | `nexusboard://ar/evidence/views/{view_id}` | `nexusboard://ar/proposals/candidates` |
| 09 — CSO | `nexusboard://strategy/opportunity/map` | `nexusboard://strategy/portfolio/constraints` |
| 10 — CRO | `nexusboard://risk/register` | `nexusboard://risk/exposure/map` |
| 11 — CCO | `nexusboard://compliance/charters/versions` | `nexusboard://compliance/decisions/log` |
| 12 — CLO | `nexusboard://legal/licenses/registry` | `nexusboard://legal/consent/provenance` |
| 13 — CDO | `nexusboard://data/schema/registry` | `nexusboard://data/evidence/index` |
| 14 — CKO | `nexusboard://knowledge/memory/catalog` | `nexusboard://knowledge/source/lineage` |
| 15 — CPO | `nexusboard://product/backlog` | `nexusboard://product/capabilities/status` |
| 16 — CRevO | `nexusboard://revenue/pipeline` | `nexusboard://revenue/offers/observations` |
| 17 — CMO | `nexusboard://marketing/audience/research` | `nexusboard://marketing/approved/claims` |
| 18 — CCuO | `nexusboard://user/feedback/evidence` | `nexusboard://user/accessibility/reports` |
| 19 — VP R&D | `nexusboard://rd/protocols/registry` | `nexusboard://rd/findings/archive` |
| 20 — Internal Audit | `nexusboard://audit/logs/immutable` | `nexusboard://audit/decisions/history` |

## Resource authorization

- A resource identifier does not convey the right to read it. Resolve the authenticated principal, context, sensitivity and scope at the MCP server.
- Reads should avoid intended mutating side effects. Computation and query execution can still happen on the server; bound their cost and external effects.
- Sensitive private resource URIs and exact access endpoints must not be exposed in public catalogs.
- Provenance, evidence assessment, cache policy and revision metadata should be returned with relevant resource content, not inferred from URI appearance.
- Persisted source/evidence may carry many contextual interpretations without authorizing semantic approval.
- Audit history should be read through scoped, attributable access rather than granting the Audit seat all-powerful DB credentials.

## Persistence tiers (proposed)

| Tier | Responsibility | Authority constraint |
|---|---|---|
| Neon PostgreSQL `nb.*` / proposed `en.*` | Shared identity, governance, missions and evidence graph | Historical source claims about `nb.*` are not freshly verified here; `en.*` remains design |
| Durable Object SQLite | Agent-local checkpoint and transient working state | Must reference authoritative corporate revisions |
| Optional Cloudflare D1 | Scoped edge cache or derived store | No unsynchronized duplicate source of truth |

Reference: [full seat catalog](seat-profiles.md) and [evidence model](../docs/evidence-networks/README.md).
