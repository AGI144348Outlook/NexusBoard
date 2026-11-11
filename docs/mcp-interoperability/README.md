# Corporate MCP interoperability

MCP supplies standardized host/client/server messaging and tools, resources and prompts. NexusBoard proposes **application-layer federation**: a corporate gateway wraps relatively external seat services while allowing independently authenticated interoffice calls. There is no special MCP standard called a 'nested server'.

## Three layers

1. MCP wire exchange and transport.
2. NexusBoard constitutional charter, purpose-of-use, authorization, resources, obligations, versions.
3. Evidence-resource and contextual semantics: source IDs, relation proposals, assessments and revisions.

A successful **tools/call** means an operation may have been accepted; it does not prove a claim, a deployment or a completed business result. Optional MCP App UI is not a source of access authority. Support text/tool fallback for hosts lacking embedded UI.

## Interoffice envelope

Include request/mission ID, registered caller principal, intended effect, target context and source references, policy/charter/evidence versions, budget, timeout and idempotency key for writes. Authentication must be enforced by the server/transport; never trust a claimed caller_seat string alone.

Illustrative tool names can be found in [gateway interface](../../specifications/interfaces/corporate-gateway.md) and [protocol notes](../../specifications/protocols/constitutional-interoffice.md). They are not deployed or built-in MCP tools.

Sources 04, 18, 21, 25.
