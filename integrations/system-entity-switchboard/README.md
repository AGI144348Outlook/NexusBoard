# NexusBoard System Entity ↔ Neon Evidence Dictionary ↔ OpenDiagram

**Implementation branch**, not a production deployment. Preregistered: [NexusBoard Issue #4](https://github.com/AGI144348Outlook/NexusBoard/issues/4). OpenDiagram private preregistration: Issue #13.

## Separation of authority and memory
- **Cloudflare SystemEntity DO**: stable entity identifier, operator route leases, routing policy, durable operational receipts. **Not the epistemic database**.
- **CorporateAgent DO**: per-registered-agent durable checkpoint and local invocation history. It is a container for a seat's runtime, *not proof an inference model is running*.
- **Neon `nexusboard-inc` dev branch**: `nb` corporate positions/agents/authority, `card_protocol` versioned index card catalog, `evidence_net` evidence board, plus isolated `switchboard` registry migration.
- **OpenDiagram**: native read-only evidence viewer as the dictionary cover. Only explicitly recorded source nodes/edges are rendered; canvas movement does not write semantic links.
- **Application matrix**: app × app, with directed pair-interface bindings and governed tool routes; **Corporate matrix**: position/agent × position/agent, with versioned charter and routing, separate from app-level connections.
- **Skills and protocol manual**: contextual instructions to select tools. Neither a skill nor the UI grants server authority.

## Current implementation status
Source under `integrations/system-entity-switchboard/` builds the Cloudflare Worker and contains a source-only authenticated `/mcp` (subset: initialize, tools/list, tools/call), `/v1/evidence/graph`, `/v1/catalog/card`, `/v1/matrix`, `/v1/identity`, and `/v1/route` endpoints. Worker requires explicit server-set `NEXUS_OPERATOR_TOKEN` and `NEXUS_DATABASE_URL`, both secrets. No anonymous access and no arbitrary SQL.

**No live deployment is implied by repository code**; Cloudflare administration is not connected in the current chat. The user needs to wire the authenticated Worker deployment and a server-side OpenDiagram proxy with protected `NEXUS_GATEWAY_URL` and `NEXUS_GATEWAY_TOKEN`. The browser must never see these secrets.

## Cloudflare Worker
```sh
cd integrations/system-entity-switchboard
npm install
npm test
npx wrangler deploy --dry-run
# Configure NEXUS_DATABASE_URL and NEXUS_OPERATOR_TOKEN as secrets
# Configure an origin allowlist, restrictive token policy, and owner identity before deployment
# Real deployment separately requires Cloudflare account authorization.
```

## Neon
Migration `migrations/001_switchboard_registry.sql` applies only to the existing **development** branch, never automatically to production. It creates `switchboard.*` tables that describe potential integrations; do not equate a row marked 'proposed' with operational routing.

## Production prerequisites
Replace single dev bearer token with proper OAuth/service principals, per-seat authorization, auditable scope and policy engine, credential rotation, rate limiting and abuse protection. Add stable binding identifiers, replay-safe idempotent writes, approved reconciliation paths, security review and externalized evidence receipts. A deployed Cloudflare DO is not automatically an autonomous agent, nor an MCP server of each seat until its independent interface is exposed and verified.

## Test publication rule
Before **any** repository tests publish a pre-test issue/discussion; follow up with actual results in the same thread. Never publish private OpenDiagram source or credentials to a public thread.
