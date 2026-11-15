# Neon Documentation Catalog Box — NexusBoard Design Record
Date: 2026-11-15 | Requested: create a persistent, account-wide issue and research documentation catalog

## Destination
Reuse Neon project `nexusboard-inc` (project ID `dark-smoke-48394967`) and its existing Postgres database rather than provisioning a new project. Existing `nb` schema hosts agents, evidence, audits, approvals and other system-entity tables. Create a **separate** `documentation_catalog` schema to avoid modifying or conflating those structures.

## Intended catalog objects
- `catalog_boxes`: top-level classified documentation containers.
- `repositories`: source repository identities and visibility.
- `issue_cards`: issue metadata and review state, with private content omitted by default.
- `source_documents`: exact reference, source version/hash, visibility and provenance.
- `analysis_reports`: structured reviews with findings, limits and verification status.
- `evidence_links`: typed relations among issues, documents and reports; source support and status.
- `review_runs` / `review_checkpoints`: actual coverage, tool/runtime errors and resume positions.
- `publication_candidates`: possible textbook chapters with rights/approval state, not automatic publication.

## Security and provenance requirements
Default-deny public access to this schema. Do not expose direct browser DB credentials or a public Data API to private content. Authenticate an application server and explicitly authorize read/write per source visibility and role. Private issue text and personal data should not be copied unless needed and explicitly allowed; by default retain only metadata, classification and canonical source reference. Use stable GitHub repo/issue identities and idempotent upserts. Preserve source URLs and observation/inference separation. No catalog record grants MCP execution authority.

## Initial milestone
Create schema and tables with additive SQL tracked as migration code. Perform schema verification on a Neon temporary branch first; applying migration to the default branch uses the Neon approval/completion workflow. Then register one catalog box and store validated, classification-safe source metadata. An ingestion worker, GitHub webhook or MCP server is not implied by having database tables.

## Operating model
The separately scheduled weekly issue-review task discovers and classifies accessible issues. Contract 000 hourly maintenance continues independently. They may cross-reference source pins through the catalog. NexusBoard public research/report docs remain editorial summaries; private issue details remain inside authorized private storage.

## Status
Existing project and `nb` schema observed. New catalog deployment must be confirmed from Neon migration results; do not assume completed from this design document.
