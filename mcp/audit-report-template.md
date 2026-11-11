# MCP audit report — template (NOT an executed audit)

- Repository:
- Audited default-branch commit:
- Audited `mcp` branch commit:
- Audit ruleset version:
- Observation date/time:
- Auditor/role:
- Audit modality: static read-only / authorized dynamic test (provide pre-test link)
- Overall result: pass with evidence / needs review / partial / cannot determine / not applicable

## Component roles

| Component | MCP role (client/server/both/none) | Claimed capabilities | Code evidence | Confidence |
|---|---|---|---|---|

## Tool inventory

| Name | Disposition (proposed/observed) | Calling client | Serving component | Input/output | Auth/approval | Evidence |
|---|---|---|---|---|---|---|

## Protocol assessment

Declared vs inspected versions; transport; statelessness; `_meta`; capabilities; resources/prompts/extensions; errors; compatibility; authorization; output handling.

## Findings

| Finding ID | Observed evidence | Interpretation | Impact | Confidence | Proposed remediation |
|---|---|---|---|---|---|

## Unknowns and limitations

Missing private config, live endpoint status, credentials unavailable, unperformed tests and ambiguous architecture. **Do not label untested capabilities as working or missing config as insecure without evidence.**

## Verification and change control

Pre-test thread (if any):  
Executed methods (if any):  
Actual observations vs interpretation:  
Same-thread post-test report (if any):  
Required human approvals for live actions:  

## Next rotation

Last-audited SHA, next action, follow-up owner and durable ledger entry ID.
