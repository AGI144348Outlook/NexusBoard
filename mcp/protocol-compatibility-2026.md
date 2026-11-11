# Protocol-era compatibility note (reviewed 2026-11-11)

The submitted external report labels both `initialize` and a stateless MCP core as belonging to July 2026, which is internally inconsistent.

| Feature | MCP up to 2025-11-25 | MCP 2026-07-28 |
|---|---|---|
| Startup | `initialize` + `notifications/initialized` | `server/discover` supported; no initialization handshake |
| Protocol sessions | session-based behavior supported | protocol-level sessions removed |
| Version and capabilities | exchanged during initialization | request metadata, and HTTP version header as applicable |
| Remote HTTP transport | earlier HTTP+SSE and Streamable HTTP legacy forms | Streamable HTTP POST; request-specific JSON or SSE reply |
| Discovery/tools | `tools/list` and `tools/call` when declared | `server/discover`, `tools/list`, `tools/call` when declared |
| Inference input and callbacks | legacy server-initiated patterns | multi round-trip requests in response results |

Sources:
- [Official 2026-07-28 release](https://blog.modelcontextprotocol.io/posts/2026-07-28/)
- [2026 Streamable HTTP spec](https://github.com/modelcontextprotocol/modelcontextprotocol/blob/main/docs/specification/2026-07-28/basic/transports/streamable-http.mdx)
- [TypeScript SDK migration](https://ts.sdk.modelcontextprotocol.io/v2/migration/support-2026-07-28)

This is a **documentation comparison**, not a live protocol conformance test. A real server's supported revision must be determined from implementation and/or pre-registered authorized discovery.
