# Twenty constitutional MCP seats — full report synthesis

**Status:** proposed **logical** MCP service catalog. The user provided the complete report text covering Seats 01–20 and 12 capability domains. **No server, tool, resource URI or database deployment is verified by that report.** This is a derived architecture reference, not a technical inspection.

The report describes 26 sources but supplies **no bibliography**. Individual seat contracts therefore remain source-attributed to the **user-supplied report** and can be cross-checked against the [existing 25-source journal](../docs/SOURCE_CATALOG.md), but no source-specific citations are invented.

A seat can be an MCP client, MCP server, or both. A single physical service can host several seats; each authorization boundary still needs enforcement and independent identity. Resource URI templates are **proposals**; publication doesn't make them resolvable.

## Seat 01 — Board Chair

**Domain:** Board Governance  
**Proposed mission:** Convene committees, record quorum/conflicts, and preserve appeal and dissent trails.

**Proposed server-side tools:** `committee.docket.read`, `committee.hearing.convene`.  
**Proposed context resources:** `nexusboard://board/minutes/{hearing_id}`, `nexusboard://board/decisions/{resolution_id}`.  
**Interoffice dependencies:** 03 COO; 20 Internal Audit; 02 CEO.  
**Constitutional boundary:** Convening is not unilateral authority to deploy code, amend evidence, or supersede founder-reserved approvals.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 02 — CEO

**Domain:** Executive Governance  
**Proposed mission:** Manage corporate strategy and binding decisions only within owner-delegated authority.

**Proposed server-side tools:** `strategy.directive.issue`, `executive.decision.record`.  
**Proposed context resources:** `nexusboard://constitution/versions/{version_id}`, `nexusboard://executive/portfolio`.  
**Interoffice dependencies:** 03 COO; 04 CFO; 07 CISO; 10 CRO.  
**Constitutional boundary:** Cannot exceed owner-delegated authority or override protected security rules.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 03 — COO

**Domain:** Executive Operations  
**Proposed mission:** Coordinate missions, prioritization and review of AR proposals.

**Proposed server-side tools:** `operations.assignment.issue`, `proposal.disposition.record`.  
**Proposed context resources:** `nexusboard://operations/missions/dashboard`, `nexusboard://operations/dependency/map`.  
**Interoffice dependencies:** 08 AR; 19 R&D; 13 CDO; 04 CFO.  
**Constitutional boundary:** Operational decisions do not bypass security, constitutional changes, or human approval.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 04 — CFO

**Domain:** Finance & Resource Allocation  
**Proposed mission:** Assess provider costs, model token budgets and evaluate financial exposure.

**Proposed server-side tools:** `budget.envelope.evaluate`, `spend.authorization.record`.  
**Proposed context resources:** `nexusboard://finance/costcenters/{center_id}`, `nexusboard://finance/forecasts/scenarios`.  
**Interoffice dependencies:** 08 AR; 05 CTO; 03 COO.  
**Constitutional boundary:** Financial efficiency cannot prove a research finding or override financial approval ceilings; supplier allowances require fresh pricing evidence.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 05 — CTO

**Domain:** Technology & Infrastructure  
**Proposed mission:** Review architecture, integration patterns, deployments and code governance.

**Proposed server-side tools:** `architecture.change.review`, `integration.plan.publish`.  
**Proposed context resources:** `nexusboard://tech/servicecatalog`, `nexusboard://tech/dependencymap`.  
**Interoffice dependencies:** 08 AR; 06 CIO; 07 CISO; 19 R&D.  
**Constitutional boundary:** Engineering convenience never overrides security or changes evidence semantics.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 06 — CIO

**Domain:** Technology & Connectivity  
**Proposed mission:** Maintain service discovery, endpoint registry, message transport and reliability.

**Proposed server-side tools:** `connection.route.evaluate`, `directory.service.register`.  
**Proposed context resources:** `nexusboard://cio/directory/resolve`, `nexusboard://cio/availability/status`.  
**Interoffice dependencies:** 07 CISO; 13 CDO; 05 CTO.  
**Constitutional boundary:** An endpoint being reachable does not grant permission to invoke its tools.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 07 — CISO

**Domain:** Security & Access Control  
**Proposed mission:** Assess principals and delegated scopes, operator leases, least privilege, incidents and credential lifecycle.

**Proposed server-side tools:** `access.policy.evaluate`, `credential.scope.issue`.  
**Proposed context resources:** `nexusboard://security/policies/{policy_id}`, `nexusboard://security/attestations/{principal_id}`.  
**Interoffice dependencies:** 03 COO; 11 CCO; 20 Internal Audit.  
**Constitutional boundary:** Never infer identity from clientInfo, tool arguments or prompts; credential issuance requires a separately protected backend and owner-approved policy.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 08 — CARO / Agent Resources (AR)

**Domain:** Agent Resources & Evidence Networking  
**Proposed mission:** Process evidence encounters through Capture–Normalize–Classify–Resolve–Relate–Verify–Govern–Persist; maintain parallel contexts and bounded background improvement proposals.

**Proposed server-side tools:** `evidence.encounter.record`, `context.model.branch`, `relationship.propose`, `adaptation.candidate.submit`.  
**Proposed context resources:** `nexusboard://ar/evidence/views/{view_id}`, `nexusboard://ar/proposals/candidates`.  
**Interoffice dependencies:** 13 CDO; 14 CKO; 19 R&D; 03 COO.  
**Constitutional boundary:** Primary assignment takes precedence. AR may propose but not self-approve systemic adoption or grant itself privileges.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 09 — CSO

**Domain:** Strategic Intelligence  
**Proposed mission:** Evaluate strategic priorities, alternative futures and portfolio trade-offs.

**Proposed server-side tools:** `strategy.option.assess`, `priority.tradeoff.record`.  
**Proposed context resources:** `nexusboard://strategy/opportunity/map`, `nexusboard://strategy/portfolio/constraints`.  
**Interoffice dependencies:** 08 AR; 04 CFO; 02 CEO.  
**Constitutional boundary:** Strategy recommendations are advisory until adopted by competent authority.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 10 — CRO

**Domain:** Risk Management  
**Proposed mission:** Assess systemic dependencies, failure scenarios, correlated risks and mitigation proposals.

**Proposed server-side tools:** `risk.assessment.issue`, `risk.exception.recommend`.  
**Proposed context resources:** `nexusboard://risk/register`, `nexusboard://risk/exposure/map`.  
**Interoffice dependencies:** 08 AR; 07 CISO; 05 CTO.  
**Constitutional boundary:** Risk findings cannot suppress valid evidence; exceptions must be governed and reviewable.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 11 — CCO

**Domain:** Compliance & Policy  
**Proposed mission:** Review constitutional contracts, privacy obligations, research protocol conformance and documented exceptions.

**Proposed server-side tools:** `policy.conformance.evaluate`, `violation.notice.issue`.  
**Proposed context resources:** `nexusboard://compliance/charters/versions`, `nexusboard://compliance/decisions/log`.  
**Interoffice dependencies:** 03 COO; 07 CISO; 20 Internal Audit.  
**Constitutional boundary:** Findings cannot retroactively forge, erase or rewrite policy and approvals.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 12 — CLO

**Domain:** Legal & Intellectual Property  
**Proposed mission:** Assess rights, licenses, retention, privacy and publication permissions.

**Proposed server-side tools:** `rights.assessment.request`, `retention.disposition.propose`.  
**Proposed context resources:** `nexusboard://legal/licenses/registry`, `nexusboard://legal/consent/provenance`.  
**Interoffice dependencies:** 13 CDO; 17 CMO; 03 COO.  
**Constitutional boundary:** Automated legal analysis is advisory; material legal decisions require the owner or qualified human counsel.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 13 — CDO

**Domain:** Data Governance & Persistence  
**Proposed mission:** Maintain shared schema contracts, stable identifiers, structural integrity, RLS and migrations.

**Proposed server-side tools:** `schema.impact.assess`, `record.integrity.check`.  
**Proposed context resources:** `nexusboard://data/schema/registry`, `nexusboard://data/evidence/index`.  
**Interoffice dependencies:** 08 AR; 06 CIO; 07 CISO.  
**Constitutional boundary:** Schema integrity is not semantic truth; CDO cannot promote evidence claims merely because constraints pass.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 14 — CKO

**Domain:** Knowledge Management  
**Proposed mission:** Maintain retrievability, historical continuity, memory coverage and source lineage.

**Proposed server-side tools:** `knowledge.coverage.review`, `retrieval.quality.assess`.  
**Proposed context resources:** `nexusboard://knowledge/memory/catalog`, `nexusboard://knowledge/source/lineage`.  
**Interoffice dependencies:** 08 AR; 13 CDO; 20 Internal Audit.  
**Constitutional boundary:** Retrieval rank does not independently establish factual truth or overturn governed assessments.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 15 — CPO

**Domain:** Product & Applications  
**Proposed mission:** Steward approved product requirements, release readiness, user-facing features and scope.

**Proposed server-side tools:** `product.requirement.propose`, `release.readiness.assess`.  
**Proposed context resources:** `nexusboard://product/backlog`, `nexusboard://product/capabilities/status`.  
**Interoffice dependencies:** 18 CCuO; 05 CTO; 17 CMO.  
**Constitutional boundary:** Feature aspirations cannot override privacy, authorization or actual implementation status.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 16 — CRevO

**Domain:** Revenue & Commercial Strategy  
**Proposed mission:** Assess revenue cases, pricing experiments and commercial terms.

**Proposed server-side tools:** `revenue.case.evaluate`, `offer.terms.verify`.  
**Proposed context resources:** `nexusboard://revenue/pipeline`, `nexusboard://revenue/offers/observations`.  
**Interoffice dependencies:** 08 AR; 04 CFO; 12 CLO.  
**Constitutional boundary:** Projections cannot be promised as realized income; no unapproved referral or commercial obligations.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 17 — CMO

**Domain:** Marketing & Communication  
**Proposed mission:** Steward public messaging, educational material, editorial process and disclosure review.

**Proposed server-side tools:** `publication.plan.propose`, `claim.disclosure.review`.  
**Proposed context resources:** `nexusboard://marketing/audience/research`, `nexusboard://marketing/approved/claims`.  
**Interoffice dependencies:** 08 AR; 12 CLO; 03 COO.  
**Constitutional boundary:** Do not present unverified claims as fact or publish without required approval.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 18 — CCuO

**Domain:** Customer & User Experience  
**Proposed mission:** Record user feedback, accessibility needs and service-impact evidence.

**Proposed server-side tools:** `user.requirement.record`, `experience.impact.assess`.  
**Proposed context resources:** `nexusboard://user/feedback/evidence`, `nexusboard://user/accessibility/reports`.  
**Interoffice dependencies:** 08 AR; 15 CPO; 05 CTO.  
**Constitutional boundary:** User feedback informs decisions but does not create permission to change security or governance.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 19 — VP R&D

**Domain:** Research & Experimental Development  
**Proposed mission:** Register hypotheses, pre-test methods, observations, falsification and reproducibility records.

**Proposed server-side tools:** `research.question.register`, `evaluation.plan.submit`, `result.report`.  
**Proposed context resources:** `nexusboard://rd/protocols/registry`, `nexusboard://rd/findings/archive`.  
**Interoffice dependencies:** 03 COO; 08 AR; 20 Internal Audit.  
**Constitutional boundary:** No GitHub repository testing—including diagnostic or CI—without a published pre-test Issue/Discussion and results in the same thread. Findings do not auto-adopt.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Seat 20 — Internal Audit

**Domain:** Independent Assurance  
**Proposed mission:** Independently inspect approved decisions, authority, evidence lineage and security controls.

**Proposed server-side tools:** `audit.scope.open`, `finding.issue`, `evidence.chain.review`.  
**Proposed context resources:** `nexusboard://audit/logs/immutable`, `nexusboard://audit/decisions/history`.  
**Interoffice dependencies:** 01 Board Chair; 02 CEO; 11 CCO; 07 CISO.  
**Constitutional boundary:** Read access should be broad but authenticated, scope-limited, privacy-controlled and logged—not unrestricted database authority. Audit cannot execute fixes it independently reviews.

**Implementation evidence:** none provided by this report. **MCP connection role:** proposed server for the listed services, optional authorized client of its dependencies; an actual host/client deployment requires separate code and endpoint evidence.

## Consistency and approval notes

- The 31-row capability matrix is **not** identical to the full union of all seat-facing tools above. Some listed functions are adjacent, renamed, or supplemental. Keep the datasets separately sourced until reviewed.
- Audit findings may be formally recorded, but they are not automatically legally or constitutionally binding without explicit authority.
- Claims of 'immutable' source data, tamper-evident audit resources, and 'unrestricted' access are **not implementation evidence**. Verify design and operational controls.
- MCP host/client/server is a **protocol relationship**; seat/Agent/SQL role/evidentiary role is a different axis.
