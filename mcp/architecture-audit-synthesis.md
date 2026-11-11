# Report synthesis: protocol strata, four boundaries and governance

**Status:** architectural synthesis of the **full user-supplied report**, not an executed implementation or MCP runtime audit. The original excerpt ended at Seat 07; the complete continuation through Seat 20, proposed resource templates, role layers, eight risks, and five gates is now separately documented. The report's heading claims 26 sources but does **not** supply their bibliography. Do not conflate that claim with the existing 25-source journal.

## Protocol strata

1. **MCP interoperability wire:** standardized JSON-RPC requests, transport, tools/resources/prompts discovery and invocation. This layer expresses protocol semantics; it does not grant corporate decision authority.
2. **Corporate contract:** twenty-seat constitutional jurisdictions, identity, scope, budgets, delegation, approvals, separation of duties and refusal rules, implemented in backend authorization and policy-controlled data access.
3. **Evidence model:** source encounters, ERUs, claims, competing context branches, relation proposals, provenance, assessments and non-destructive revisions.

The strata are conceptually distinct, **not an automatic sequence in which evidence authorizes transport**. An MCP response can transport a provisional record without validating its factual claim.

## Nested boundaries

| Boundary | Responsibility | Non-equivalence |
|---|---|---|
| System Entity | stable corporate identity, external gateway, shared mission/evidence registries, human-authorized operator docking | not a model or transient chat session |
| Seat | durable charter, office ID, principal, jurisdiction and owned capabilities | not necessarily a dedicated physical host |
| Interoffice MCP | authenticated client-to-server interactions, tool/resource contracts, permission and refusal | tool discovery does not grant execution rights |
| Evidence | separates observation, candidate link, assessment, decision and archive | recorded relation is not independently proven truth |

## Technical corrections to the supplied text

- **MCP 2026-07-28 does not use `initialize`** as its standard bootstrap. It retired `initialize`/`initialized` and protocol sessions; requests carry version/client-capability metadata, with `server/discover` available for discovery. `initialize` is applicable to **legacy protocol revisions** (e.g. 2025-11-25). See [official release](https://blog.modelcontextprotocol.io/posts/2026-07-28/).
- **Transport:** stdio is a valid transport; remote transport is **Streamable HTTP** with request-specific HTTP POST responses that may be plain JSON **or SSE**. Do not present the old *HTTP+SSE* transport as the modern default. See [2026 HTTP transport](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/streamable-http.mdx).
- **Authentication:** transport identity, OAuth/issuer checks where applicable, backend policy, per-seat delegation and database permissions are separate. Legacy handshake is not an independent source of constitutional permission.
- **W3C PROV-O is a provenance vocabulary**, not automatically immutable or tamper-evident storage. Append-only revisions and cryptographic integrity are independent design requirements that need implementation evidence.
- **Audit findings are not inherently legally or constitutionally binding**; jurisdiction and remediation authority must be expressly established.
- Cost figures or provider allowances in source notes should be tracked as dated observations and revalidated before financial automation.

## Evidence status and review limits

The report's designation as a 'comprehensive audit' is a **title**, not independent evidence of tests or live scans. This repository's `mcp` branch remains **proposal-only**; it does not prove any seat tool is callable. No owner credentials, private URLs, production database evidence or audit results were supplied with this excerpt.

## Crosslinks

[Capability inventory](capability-inventory.json) · [Matrix](capability-matrix.md) · [Full seat profiles](seat-profiles.md) · [Protocol profile](protocol-profile.md) · [Constitution](../GOVERNANCE.md) · [Current source catalog](../docs/SOURCE_CATALOG.md).

## Complete report additions

- [Seats 01–20](seat-profiles.md)
- [Resource templates](resource-uris.md)
- [Three role meanings](role-boundaries.md)
- [Threat scenarios](security-risks.md)
- [Target enforcement gates](enforcement-gates.md)
- [Provenance and editorial corrections](full-report-intake.md)
