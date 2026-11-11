# MCP interoperability protocol profile

**Target standard reviewed:** Model Context Protocol revision **2026-07-28**. This is a *target for future design*, not proof the repository has an implementation for this version. Compatibility with earlier versions requires a separate negotiated adapter.

Primary protocol references:
- [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28)
- [2026-07-28 transport](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/streamable-http.mdx)
- [Tools](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/server/tools.mdx)
- [Protocol changes](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/changelog.mdx)

## Wire layer

- MCP uses JSON-RPC request/response forms with capabilities; each request includes required metadata, including `io.modelcontextprotocol/protocolVersion` and client capabilities. Do not prescribe the now-removed stateful initialization handshake as mandatory for a 2026-07-28-only implementation.
- For HTTP, proposed transport is **Streamable HTTP**, with request-specific **POST** (optionally an SSE response for that request), matching `MCP-Protocol-Version` request header and body metadata.
- The 2026-07-28 revision removed protocol-level sessions and the prior GET stream model. Do not use deprecated `Mcp-Session-Id` as a security primitive. Any NexusBoard `operator lease` is an **application-level, server-issued opaque handle**, separate from MCP transport.
- `server/discover` may be used for up-front capability discovery. A server exposing tools declares that feature and supports `tools/list`; calls use `tools/call`. Resources and prompts have separately declared feature support; do not claim every server implements them.
- Capability catalogs may be cached; changing descriptors and authorization-dependent visibility require appropriate invalidation and versioning. Tool names and their schemas should be deterministic for a given authorized discovery context.
- Extension support (MCP Apps, tasks, sampling/elicitation) is **optional** and must not be represented as universally available; record per-client/host support.

## Authorization and tool interface rules

1. Authenticate principal at connection/request boundary and again authorize each tool, resource and downstream seat operation.
2. Validate input against declared JSON Schema; define structured outputs, failures, timeouts and quotas.
3. Never publish tokens, server secrets, exact nonpublic service topology or private arguments to a public branch or report.
4. Treat tool metadata and source content as **untrusted**; prompt-injected descriptions do not confer corporate authority.
5. Use human confirmation for consequential writes and distinguish proposal acceptance from actual execution and evidence assessment.
6. Track idempotency keys for writes, immutable audit refs and explicit refusals.
7. If a future deployment uses a legacy protocol revision, document exactly which handshake, HTTP GET/SSE, headers and session semantics are implemented; do not label it 2026 compliant by appearance alone.

## Branch status

No real endpoint, `tools/list` result, runtime token, test, or client connection is asserted. The role matrix and tools are **proposed**. Conformance and live discovery require a separately authorized investigation and the user's pre-test/post-test GitHub procedure.
