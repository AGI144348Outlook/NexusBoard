# Contributing to NexusBoard

Contributions can include evidence-backed architecture commentary, source corrections, threat models, schema/interface proposals, documentation and well-scoped evaluation designs. Public access does **not** authorize republishing unpublished source PDFs, private conversation excerpts, customer data, credentials or third-party code.

## Standards

- Label each claim **proposed, specified, implemented, tested, or independently verified**.
- Link [source numbers](docs/SOURCE_CATALOG.md), precise vendor documentation, issue context and affected components.
- Keep observations distinct from interpretations and preserve competing models.
- Never portray an illustrative MCP tool name, table, runtime or office as deployed without evidence.
- Use an Issue or PR for constitutional and technical changes; authorization is not obtained through model output.

## Mandatory pre-test and post-test procedure

**Before running any test against a GitHub repository**, including exploratory experiments, diagnostics, benchmarks, regression suites or triggering CI, **publish an Issue or Discussion in that same repository** containing:

1. The relevant discussion with Timothy, summarized without posting private source material.
2. The identified problem, falsifiable hypothesis and proposed solution.
3. Method, environment, data/constraints and expected results.
4. Results or observations that would **challenge the hypothesis**.

**If posting is blocked, report the blockage before running tests and stop.**

Afterwards update **the same thread** with the *actual* method, raw observations separated from interpretations, failures, deviations, evidence links, limitations, and next steps. Do not retrospectively claim the plan preceded execution.

[Pre-test issue template](.github/ISSUE_TEMPLATE/pre-test-plan.md) · [Result template](experiments/results/README.md).

## Design review submission

A design PR should include: affected seat/role and source; problem; desired invariant; alternatives; scope and service contract; authority implications; backward compatibility; data and cost consequences; open questions; and evidence supporting any claimed implementation. High-impact changes require competent approval; reviewers must be distinct from proposers where appropriate.

## Security and rights

Follow [SECURITY.md](SECURITY.md). No open-source license has yet been selected; see [LICENSE.md](LICENSE.md). Do not assume that accepting a PR transfers copyrights or licenses external content.
