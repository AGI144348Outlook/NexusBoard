# Repository MCP audit procedure

**Default mode:** read-only **static analysis**, one repository at a selected commit SHA and one design `mcp` branch revision. Source reading is not a live MCP conformance test. **Never invoke tools, run scripts, run tests, trigger CI, or probe endpoints** during the static audit.

## A. Scope and evidence ledger

- Record repository owner/name, public/private classification, base branch SHA, `mcp` branch SHA, timestamp, source paths and audit-policy version.
- If the `mcp` branch is missing, recommend it; do not presume the repository requires a live MCP server.
- Classify the repository as **MCP server**, **MCP client**, **both**, **future candidate**, or **not applicable**. A web UI alone does not establish MCP.
- Note uncertain assumptions and required additional permissions.

## B. MCP protocol conformance (static)

- Declared MCP revision(s) vs actual imports/configuration/transport code.
- For 2026-07-28: required request `_meta`, version/header consistency, stateless request model, supported `server/discover` path and correct capability declarations if implemented.
- Actual tool handlers vs `tools/list`, resources, prompts and optional extensions; code-located evidence for every claim.
- Transport choice (local stdio or HTTP), endpoint methods, version migration/legacy adapters.
- Auth at outer server and **each** tool/callee; input schema validation, rate limiting, sensitive output handling, refusal and timeouts.
- No protocol-level session assumption for latest revision; app-level leases separate.
- Production configuration may be **not inspectable** from GitHub—mark unknown instead of pass.

## C. Callable tool register

For each proposed/discovered tool: canonical name, server owner, eligible clients, purpose, JSON input/output schema, read/write/privileged impact, data scope, authorization, approval, idempotency, audit trace, errors, dependencies and source file/line or endpoint evidence. Mark **proposed**, **code-located**, **statically inspected**, **live-discovered**, **tested** or **independently verified**.

Identify proposed tools that have no implementation; implemented handlers absent from the manifest; dangerous unsupervised operations; stale tool names; and duplicate incompatible versions. *Do not suggest granting authority just because a tool exists.*

## D. Client/server matrix

- Which processes create MCP clients and which expose servers?
- Are cross-repository calls actually implemented? Check integration code, not just architecture diagrams.
- Are user-delegated scopes passed via authenticated transport and rechecked by callees?
- Are seat, Agent, server, runtime and model roles kept distinct?
- Are explicit dependencies and fallback failure states documented?

## E. Architecture/governance consistency

Compare `mcp` proposals with `main` `README.md`, `ARCHITECTURE.md`, `GOVERNANCE.md`, `STATUS.md`, code, licenses and test records. Record drift as observed mismatch vs proposal. Never silently rewrite docs or code.

## F. Reporting

Use [audit report template](audit-report-template.md) with evidence, severity, confidence, risk, recommended next action, source SHA, owner and status. Suppress duplicate findings using stable IDs. Secure findings are kept private.

## G. Active verification (separate approval gate)

Live discovery, HTTP/stdio probes, diagnostics, tests, benchmarking and CI **must not** begin until a pre-test Issue/Discussion is published **in the repository being tested**. Include discussion with Timothy, problem, hypothesis, solution, exact method, expected results and disconfirming criteria. After actual execution, follow up **in the same thread**, separating observations and interpretations with evidence and limitations. If publishing is blocked, report it and do not test.

The `mcp` branch is a **proposed capability registry**, not an activation signal.

## H. Security gates from complete report

Review the eight proposed failure modes in [security-risks.md](security-risks.md): gateway trust, authority laundering, full mesh, role self-promotion, success/truth confusion, AR self-adoption, prompt impersonation, owner/BYPASSRLS leak. Compare implementation evidence against [five enforcement gates](enforcement-gates.md), treating missing code evidence as **unknown**, not proved unsafe. Record each observation, risk interpretation, privilege/tenant sensitivity and authorization required for any future dynamic test.

## I. Resource and office coverage

Compare the [20-seat inventory](seat-profiles.md) and [proposed resource URI templates](resource-uris.md) with actual server features and resolvable resources, where evidence is available. Do not assume `nexusboard://` is registered or that all seats are separate physical servers. Distinguish SQL, constitutional and evidentiary role layers per [role-boundaries.md](role-boundaries.md).

## J. Evidence-backed jurisdiction checks (twenty seats)

Cross-reference the [jurisdiction matrix](jurisdiction-matrix.json) with [role assignments](role-assignments.md), existing code/config and the [evidence-marker contract](evidence-marker-contract.md). For each seat record: declared mission, proposed client/server tools/resources, code-located responsibilities, observed or inaccessible approval and provenance artifacts, forbidden actions, escalation owner, and independent review path. The result must distinguish **documentary consistency** from **verified deterministic enforcement**. Sensitive logs are not copied into public reports.

For future active authorization or RLS tests, publish a pre-test record **before** execution in the repository under test and report actual findings in the same thread. Static read-only reviews do not perform those tests.

## K. Federation-resilience and proof-of-enforcement checks

Inspect source/config **without executing it** for the thirteen requirements in [federation-control-register.json](federation-control-register.json). Distinguish upstream gateway checks from independently enforced callee authorization; evaluate original-delegation preservation, per-tool allowlists, SQL principal/RLS owner limitations, unsafe custom `SET LOCAL` reliance, async Durable Object reentrancy, operator lease expiry, idempotency, review provenance, true tamper resistance, and authorized containment. See [federation-security-review.md](federation-security-review.md).

**Never mark a security gate 'implemented/enforced' from prose alone.** An unavailable code path or private live log means not inspectable/unknown. To verify with live endpoint, SQL, integration, diagnostic or CI actions, publish the GitHub pre-test Issue/Discussion **before** execution in the repository under test and report actual results in that same thread. No tests run in the static audit.
