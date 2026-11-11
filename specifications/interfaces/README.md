# Proposed interface specifications

**No endpoint in this directory is asserted deployed.** MCP protocol primitives (tools/resources/prompts) are distinct from NexusBoard's proposed application contracts.

- [Corporate gateway](corporate-gateway.md) — coherent external MCP surface.
- [Interoffice service boundary](seat-service.md) — relative externality, authorization, resource metadata and refusal.

All operations require a verified service principal, explicit purpose and scope, input/output contract, version, audit ID and permission check at the callee. For high-impact writes require idempotency, approval and spending controls. Source anchors: 04, 18, 21, 25.
