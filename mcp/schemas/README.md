# MCP branch schemas

- [Repository audit manifest schema](repository-mcp-manifest.schema.json) governs the **custom** root `manifest.json` in this branch.
- [Tool proposal registry schema](tool-proposal.schema.json) governs `tool-proposals.json`.

These are NexusBoard **application-level schemas**, not MCP standard artifacts. The per-tool `input` and `output` JSON Schema objects are design proposals, not server-reported conformance evidence.

No validation script or test has been run; schema review and future conformance tests require a pre-test GitHub record.
