# Expanded office profiles from supplied report (partial)

The submitted report includes an overview identifying **twenty offices**, but the detailed profile section provided here stops in the description of **Seat 07**. The existing [twenty-seat register](../docs/agent-organization/SEATS.md) was derived from a **different, complete 25-source journal**. The profile information below is **proposed**, not confirmed service registration or deployment.

| Seat | Proposed server-facing interfaces | Proposed resources | Distinct boundary |
|---|---|---|---|
| 01 — Board Chair | `committee.docket.read`, `committee.hearing.convene` | `nexusboard://board/minutes/{hearing_id}`, `nexusboard://board/decisions/{resolution_id}` | convenes and documents, no unilateral code deployment/evidence rewrite |
| 02 — CEO | `strategy.directive.issue`, `executive.decision.record` | `nexusboard://constitution/versions/{version_id}`, `nexusboard://executive/portfolio` | owner-reserved authority remains distinct |
| 03 — COO | `operations.assignment.issue`, `proposal.disposition.record` | `nexusboard://operations/missions/dashboard`, `nexusboard://operations/dependency/map` | operational delegation does not bypass CISO/security or constitutional appeal |
| 04 — CFO | `budget.envelope.evaluate`, `spend.authorization.record` | `nexusboard://finance/costcenters/{center_id}`, `nexusboard://finance/forecasts/scenarios` | financial assessment never certifies factual validity |
| 05 — CTO | `architecture.change.review`, `integration.plan.publish` | `nexusboard://tech/servicecatalog`, `nexusboard://tech/dependencymap` | engineering cannot rewrite evidence semantics or bypass security |
| 06 — CIO | `connection.route.evaluate`, `directory.service.register` | `nexusboard://cio/directory/resolve`, `nexusboard://cio/availability/status` | discovery/reachability does not create execution permission |
| 07 — CISO | `access.policy.evaluate`, `credential.scope.issue` | `nexusboard://security/policies/{policy_id}`, `nexusboard://security/attestations/{principal_id}` | credential issuance requires human authorization and constrained server controls |

**Source-specific limitation:** The report is truncated at Seat 07; no seat-specific details for seats 08–20 are newly substantiated by its detailed-profile excerpt. The high-level 20-office grouping and 31-row capability matrix mention other seats, but their fuller contracts must come from source journal documentation or future material.

**Resource notation:** `nexusboard://...` is a *proposed URI scheme*. Publishing a URI template does not create an MCP resource or a resolvable backend.

**Security:** Keep actual credentials, principal identifiers, private domains and secrets out of this public branch.
