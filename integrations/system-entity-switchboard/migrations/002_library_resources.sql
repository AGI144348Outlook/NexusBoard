-- Prospective experiment preregistered before source mutation in NexusBoard Issue #4.
-- Metadata-only library. No private PDF content or original infographic bytes.
CREATE TABLE IF NOT EXISTS switchboard.library_assets (
  asset_id text PRIMARY KEY,
  asset_kind text NOT NULL CHECK(asset_kind IN ('infographic','pdf')),
  title text NOT NULL,
  filename text NOT NULL,
  source_ref text NOT NULL,
  source_url text,
  sha256 text,
  source_status text NOT NULL,
  volume_source integer,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb CHECK (jsonb_typeof(metadata)='object'),
  added_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS switchboard_library_assets_kind ON switchboard.library_assets(asset_kind);
CREATE TABLE IF NOT EXISTS switchboard.glossary_entries (
  entry_id text PRIMARY KEY,
  term text NOT NULL,
  definition text NOT NULL,
  source_ref text NOT NULL,
  evidence_state text NOT NULL DEFAULT 'proposed',
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE switchboard.library_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE switchboard.glossary_entries ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON switchboard.library_assets,switchboard.glossary_entries FROM PUBLIC;
INSERT INTO switchboard.library_assets
(asset_id,asset_kind,title,filename,source_ref,source_url,sha256,source_status,volume_source,metadata) VALUES
('nexus-infographic-01','infographic','AI Operator System Lifecycle Architecture','AI Operator System Lifecycle Architecture.png','github:NexusBoard@main:AI Operator System Lifecycle Architecture.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/AI%20Operator%20System%20Lifecycle%20Architecture.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-02','infographic','Developing Institutional Memory','Developing Institutional Memory.png','github:NexusBoard@main:Developing Institutional Memory.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Developing%20Institutional%20Memory.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-03','infographic','Evidence Networking Intelligence Diagram (1)','Evidence Networking Intelligence Diagram (1).png','github:NexusBoard@main:Evidence Networking Intelligence Diagram (1).png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Evidence%20Networking%20Intelligence%20Diagram%20(1).png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-04','infographic','NexusBoard Proposed Reference Architecture','NexusBoard Proposed Reference Architecture.png','github:NexusBoard@main:NexusBoard Proposed Reference Architecture.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/NexusBoard%20Proposed%20Reference%20Architecture.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-05','infographic','Nexusboard Agent Architecture Diagram','Nexusboard Agent Architecture Diagram.png','github:NexusBoard@main:Nexusboard Agent Architecture Diagram.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Nexusboard%20Agent%20Architecture%20Diagram.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-06','infographic','Nexusboard Governance Committee Architecture','Nexusboard Governance Committee Architecture.png','github:NexusBoard@main:Nexusboard Governance Committee Architecture.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Nexusboard%20Governance%20Committee%20Architecture.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-07','infographic','Nexusboard Interoperable MCP System Architecture','Nexusboard Interoperable MCP System Architecture.png','github:NexusBoard@main:Nexusboard Interoperable MCP System Architecture.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Nexusboard%20Interoperable%20MCP%20System%20Architecture.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-08','infographic','Persistent Agent Architecture Diagram','Persistent Agent Architecture Diagram.png','github:NexusBoard@main:Persistent Agent Architecture Diagram.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Persistent%20Agent%20Architecture%20Diagram.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-09','infographic','The Role-Governed Evidence System','The Role-Governed Evidence System.png','github:NexusBoard@main:The Role-Governed Evidence System.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/The%20Role-Governed%20Evidence%20System.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-infographic-10','infographic','Two Evidence Networks Diagram','Two Evidence Networks Diagram.png','github:NexusBoard@main:Two Evidence Networks Diagram.png','https://github.com/AGI144348Outlook/NexusBoard/blob/main/Two%20Evidence%20Networks%20Diagram.png',NULL,'source_file_verified',NULL,'{"file_source":"NexusBoard main Git tree","public_access_not_guaranteed":true}'::jsonb),
('nexus-volume-v-32','pdf','Severable Protocol Connection and the Integration Layer','32_severable_protocol_connection_integration_layer.pdf','volume-v:32:sha256:756bb6ff1452b023f04e5c49cad3ca07f485f9cc698078516588a61f5b3fbd95',NULL,'756bb6ff1452b023f04e5c49cad3ca07f485f9cc698078516588a61f5b3fbd95','local_pdf_source_verified',32,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb),
('nexus-volume-v-33','pdf','MCP Component Foundation: Registry, Catalog and Context','33_mcp_foundation_registry_catalog_context.pdf','volume-v:33:sha256:c2ccd76b3367427944f322894a812ad82f0290f0cd093d317a52c8d524f6aa18',NULL,'c2ccd76b3367427944f322894a812ad82f0290f0cd093d317a52c8d524f6aa18','local_pdf_source_verified',33,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb),
('nexus-volume-v-34','pdf','Dual Matrices: Application and Corporate Agent Switchboards','34_dual_matrix_switchboards_apps_agents.pdf','volume-v:34:sha256:8066833dc4d10d1677a60c870bbbb2464f5d35848c07798917fe833c0d052af5',NULL,'8066833dc4d10d1677a60c870bbbb2464f5d35848c07798917fe833c0d052af5','local_pdf_source_verified',34,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb),
('nexus-volume-v-35','pdf','Contextual Buttons and Skills as Operational Protocol Logic','35_contextual_buttons_skills_protocol_manual.pdf','volume-v:35:sha256:473f91b16fd75768e3e7e4a3b01e6a90f6027a80fd12fccba0c7205ff69a2026',NULL,'473f91b16fd75768e3e7e4a3b01e6a90f6027a80fd12fccba0c7205ff69a2026','local_pdf_source_verified',35,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb),
('nexus-volume-v-36','pdf','Persistent System Entity, Durable Agent Seats and Corporate Routing','36_system_entity_durable_agents_corporate_router.pdf','volume-v:36:sha256:116175c0d16f90267afa6d36a1a383959c70ca2761a92df0600e66cddba03a2b',NULL,'116175c0d16f90267afa6d36a1a383959c70ca2761a92df0600e66cddba03a2b','local_pdf_source_verified',36,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb),
('nexus-volume-v-37','pdf','Neon Evidence Dictionary Body and the OpenDiagram Cover','37_neon_dictionary_body_opendiagram_cover.pdf','volume-v:37:sha256:63d91939a84591849587fbea23641584cc5d0e4f902ae471027ecd93101e825a',NULL,'63d91939a84591849587fbea23641584cc5d0e4f902ae471027ecd93101e825a','local_pdf_source_verified',37,'{"site_url_status":"unhosted","chapter_index_location":"OpenDiagram apps/web/src/lib/nexus-library.ts"}'::jsonb)
ON CONFLICT(asset_id) DO NOTHING;
-- Intentionally NO invented NotebookLM glossary terms. Zero rows until real export is supplied.
