# MCP client / server role assignments — proposed

These are **logical roles**, not evidence of running endpoints. The MCP server *supplies* tools/resources/prompts. An MCP client *connects to* that server on behalf of a host or service. A company office/Agent can be represented by one or more runtime services and may play **both** roles.

| Logical component | MCP connection role | Serves / consumes | Boundary and evidence |
|---|---|---|---|
| External AI application / human-approved host | **Host with MCP client** | Discovers and invokes permitted corporate gateway capabilities | Per-user consent and transport auth; no inherent corporate officer authority |
| NexusBoard corporate gateway | **MCP server outward; MCP client inward** | Exposes bounded corporate tools, routes approved peer calls | Server validates caller and target before routing; not a blanket root credential |
| CARO / Agent Resources seat | **Server for evidence proposals; client for specialist reviews** | Proposes relations; requests CDO integrity, CKO context and COO disposition | Cannot self-publish or authorize protected changes |
| CDO seat | **Server and possibly client** | Supplies data-integrity assessment, references approved sources | Structural integrity ≠ epistemic validation; SQL privileges separate |
| CKO seat | **Server and possibly client** | Supplies scoped institutional evidence contexts | Retrieval isn't endorsement of source truth |
| COO seat | **Server and possibly client** | Accepts review docket, coordinates approvals and routing | Has only delegated constitutional authority |
| VP R&D seat | **Server and possibly client** | Method critiques, experiment design, evidence interpretation | No test before pre-registration; experimental conclusion not self-certified |
| Internal Audit seat / service | **Server for audit records; client of read-only corporate sources** | Read-only source examination, finding recording | Independent from author of review; no automatic remediation rights |
| Cloud scheduler / audit worker | **MCP client if configured** | Requests scoped audit/report tools | A scheduler is not itself an MCP server; no automatic tool privileges |

No seat automatically becomes a separately deployed physical server. No MCP metadata alone proves client/server availability. An external client connected to the corporate gateway does not gain direct access to all internal seats.

## Registration contract

Each running service must eventually declare: service ID, role, location/transport (private URL reference, not secrets), supported protocol versions, auth principal and scopes, published capabilities, resource classifications, rate limits, operator/mission relationship and lifecycle status.

## Authorization

Authenticate each request at transport/identity layer; **do not** rely on self-reported `caller_seat` strings. Re-check authorization at the callee. Sensitive actions require human review. See [protocol profile](protocol-profile.md), [interoffice design](../specifications/protocols/constitutional-interoffice.md).
