# Proposed callable tools — architectural inventory

The canonical structured set is [tool-proposals.json](tool-proposals.json). **None of these entries means a live MCP server will advertise or accept the tool.** Tool names prefixed `nb.` are application design names, not standard MCP method names.

| Proposed tool | Proposed server | Possible client | Intent / risk |
|---|---|---|---|
| `nb.corporate.status` | Corporate gateway | approved host client | read organization status; disclosure |
| `nb.seat.catalog` | Corporate gateway | host and seat clients | discover seats; capability enumeration |
| `nb.mission.create` | Corporate gateway | approved host | write bounded mission; authorization and cost |
| `nb.mission.status` | Corporate gateway | approved host/seat | read scoped progress; privacy |
| `nb.operator.lease.request` | Corporate gateway | approved host | request human-authorized lease; privilege |
| `nb.evidence.read` | Corporate gateway | approved host/seat | read versioned evidence/provenance |
| `nb.evidence.relation.propose` | AR seat | authorized seat | create provisional link, **not certify it** |
| `nb.data.integrity.assess` | CDO seat | AR/seat | structural lineage check, not semantic proof |
| `nb.knowledge.context.lookup` | CKO seat | AR/seat | context retrieval, not independent verification |
| `nb.governance.proposal.submit` | COO seat | AR/seat | lodge review docket, not approval |
| `nb.audit.finding.record` | Audit service | audit worker | evidence-backed finding without remediation |

## How an auditor ranks a tool

1. **Proposed**: in this registry but no implementation observed.
2. **Code-located**: implementation path and commit SHA identified.
3. **Statically inspected**: schema and auth checks reviewed against actual code/config.
4. **Live-discovered**: authenticated authorized `tools/list` shows descriptor and server identity. This is active probing and requires prior test publication.
5. **Tested**: appropriate tool invocation and negative permission cases ran after pre-test publication, with results reported.
6. **Independently verified**: separate reviewer reproduced or substantiated relevant checks.

Missing implementation evidence is `unverified`, not a categorical absence. Auditors must not invent paths, endpoints, return values or permissions.
