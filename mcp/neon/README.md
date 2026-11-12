# NexusBoard — Neon card catalog + evidence-card network

**Development status (2026-11-12):** Neon schemas deployed on an isolated child branch, synthetic assessment records saved, MCP tool contracts and application RPC modules authored, **8 offline RPC tests passed**. **No public MCP endpoint, authentication service, Cloudflare Worker, per-seat Durable Object, production authorization or main-branch deployment was created.**

## Exactly two systems (no dictionary)

1. **Index Card Catalog** — \`card_protocol\` schema: \`card_revisions\`, \`configuration_revisions\`, \`configuration_members\`, and \`evaluation_receipts\`. Cards have stable IDs, exact revisions, typed JSON payloads and provenance. A ticket or authority-stamp reference does not grant execution rights.
2. **Evidence Index Card Network** — \`evidence_net\` schema: \`nodes\`, \`edges\`, \`edge_sources\` and \`edge_assessments\`. Distinguishes source/claim/observation concepts, typed edges, lexical/empirical/operational relation domains and provisional reviews. \`reviewed\` is not independently proven truth.

**Database:** existing Neon project \`nexusboard-inc\`. **Isolated development branch:** \`nb-card-evidence-dev-20261112\`. Parent \`main\` Neon branch and existing corporate \`nb.*\` tables untouched. Only synthetic \`demo:nb:*\` records were inserted in the child branch. Eight new tables, all RLS-enabled with no policy to authorize application roles yet; this does **not** certify access control.

- [Additive schema migration](001_card_evidence.sql)
- [Versioned MCP tool contracts](card_evidence_mcp_tools.json)
- [Scoped JSON-RPC application handler](card_evidence_rpc.mjs)
- [Parameterized Postgres data adapter](neon_pg_adapter.mjs)
- [Offline authorization and scope tests](test_rpc.mjs)

## Planned MCP integration — independently governed ingress and callee

\`\`\`text
ChatGPT / Claude / appointed operator
        |
        v
NexusBoard corporate parent MCP gateway
  authenticates principal, validates Origin and headers,
  binds charter/mission/ticket/available tools and purpose
        |
        v
NexusBoard card/evidence MCP application handler
  tools/list -> only mission-eligible names
  tools/call -> callee authorization for each tool
        |
        +--- card_protocol (versioned card/config references)
        |
        +--- evidence_net (source-linked nodes/relations)
        |
        +--- external governance verifier (future, not implemented here)
        |
        +--- Agent-local Cloudflare Durable Objects (future)
\`\`\`

The included \`createCardEvidenceRpc(manifest, adapter, authorize)\` is **not** an HTTP listener. It accepts a **server-trusted context** supplied by an independently authenticated host. Never treat \`context.authenticated_principal\` or \`allowed_tools\` as safe if supplied by an MCP caller, a card, or an LLM. Host software must create them after verifying tokens and current policies. \`createNeonDataAdapter(query)\` accepts a trusted, server-side parameterized Postgres query function; it has no DB credential or network access itself.

### Implementable transport choice

Use **MCP protocol 2026-07-28**: stateless Streamable HTTP POST \`/mcp\`, no protocol \`initialize\` handshake or \`Mcp-Session-Id\`, with mandatory \`MCP-Protocol-Version\`, \`Mcp-Method\`, and \`Mcp-Name\` for tool calls; request \`_meta\` must agree with headers. Validate \`Origin\` and independently authenticate before dispatch. Transport conformance is **not implemented or tested** by this reference RPC module. The parent gateway should enforce authenticated operator/session leases and narrow audience/scope; receiving offices perform their own independent authorization decisions.

Reference: [MCP 2026-07-28 Streamable HTTP spec](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/streamable-http.mdx).

**Hosting candidate:** Neon Functions for an authenticated internal MCP implementation in \`aws-us-east-1\`, or existing Cloudflare Worker/DO backend. Do not deploy a public Function with anonymous DB-owner access. Keep PostgreSQL secrets in the trusted service, and use least-privileged DB roles scoped to these schemas. Complete token validation, route/seat permit matrix, RLS policies and incident audit before production rollout.

## Tool inventory — six narrowly assigned capabilities

| Tool | Function | Authority class |
|---|---|---|
| \`catalog.card.get\` | Pinned card read | Read only |
| \`catalog.configuration.resolve\` | Exact composition/revision references | Read only, no execution |
| \`catalog.card.propose\` | New proposed revision with expected prior revision | **Proposal only** |
| \`evidence.node.get\` | Read evidence node | Read only |
| \`evidence.edge.trace\` | Limited relation/provenance lookup | Read only |
| \`evidence.edge.propose\` | New sourced provisional relation | **Proposal only** |

**Not included:** any dictionary lookup, vocabulary admission, tool execution, deployment, authorization signing, SQL console, credential issuing or privilege mutation.

**Disclosure rule:** only the authenticated seat's mission-appropriate subset of the six tools is returned by \`tools/list\`. In the synthetic tests, an AR-like scope sees only permitted card/evidence readers; supplying a fake executive role or a stored \`authority_stamp\` cannot create executive actions.

## Next protected integration steps

1. Preserve explicit original-principal/acting-seat/mission/ticket chain; have CISO/COO/CEO/Board decide the competent authority for each protected operation.
2. Choose existing auth and service principal model; issue **no universal database owner credential** to an Agent. Establish least-privileged SQL roles, GRANTs, real RLS policies and tenant/corporate boundaries.
3. Wire the application handler into the corporate gateway and server adapter, respecting protocol-2026-07-28 metadata and origin requirements. No MCP endpoint has been deployed.
4. Integrate exact-card/edge revision receipts into the protected \`nb.audit\` / Neon Evidence Memory Network as governed by charter, preserving initial source and later corrections.
5. Evaluate independent approval and detour verifiers at each callee and actual execution point; never let stamps or return tickets authorize themselves.
6. Plan Agent-local Durable Objects as individually addressable actors; keep company-wide records in Neon, not in the cards.
7. Promote only after review of source documents, complete permissions test pre-registration, and demonstrated negative tests.

## Evidence

- [Pre-test and follow-up Issue #2](https://github.com/AGI144348Outlook/NexusBoard/issues/2).
- [Offline application-handler contract run](https://github.com/AGI144348Outlook/NexusBoard/actions/runs/43171849342): **8/8 pass**. Tests use mocks; they do not prove SQL role security or MCP HTTP conformance.
- Neon child branch: **8 RLS-enabled tables**; **2 synthetic cards, 1 configuration, 2 members, 2 nodes, 1 edge, 1 receipt**. The recorded synthetic receipt denies \`deployment.execute\` from an assessment ticket.
