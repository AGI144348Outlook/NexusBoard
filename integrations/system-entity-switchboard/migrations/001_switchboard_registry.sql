-- NX-SB-001: isolated switchboard capability/interface registry.
-- Pre-test: https://github.com/AGI144348Outlook/NexusBoard/issues/4
-- Apply ONLY to a Neon development branch. Existing nb.*, card_protocol.*, evidence_net.* remain authoritative.
CREATE SCHEMA IF NOT EXISTS switchboard;
REVOKE ALL ON SCHEMA switchboard FROM PUBLIC;

CREATE TABLE IF NOT EXISTS switchboard.apps (
  app_id text PRIMARY KEY,
  label text NOT NULL,
  kind text NOT NULL CHECK (kind IN ('external_app','logical_service','corporate_seat')),
  lifecycle text NOT NULL CHECK (lifecycle IN ('proposed','discovered','configured','verified','unavailable')),
  notes text NOT NULL DEFAULT '',
  recorded_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS switchboard.capabilities (
  capability_id text PRIMARY KEY,
  app_id text NOT NULL REFERENCES switchboard.apps(app_id),
  tool_name text NOT NULL,
  mode text NOT NULL CHECK (mode IN ('read','proposal','write','render','local_state')),
  status text NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed','discovered','configured','verified','unavailable')),
  input_schema jsonb NOT NULL DEFAULT '{}'::jsonb CHECK(jsonb_typeof(input_schema)='object'),
  provenance jsonb NOT NULL DEFAULT '{}'::jsonb CHECK(jsonb_typeof(provenance)='object'),
  UNIQUE(app_id,tool_name)
);
CREATE TABLE IF NOT EXISTS switchboard.protocols (
  protocol_id text PRIMARY KEY,
  version integer NOT NULL DEFAULT 1 CHECK(version>0),
  from_app text NOT NULL REFERENCES switchboard.apps(app_id),
  to_app text NOT NULL REFERENCES switchboard.apps(app_id),
  title text NOT NULL,
  effect_class text NOT NULL CHECK(effect_class IN ('read','proposal','write','local_state')),
  steps jsonb NOT NULL CHECK(jsonb_typeof(steps)='array'),
  status text NOT NULL DEFAULT 'proposed'
    CHECK (status IN ('proposed','configured','verified','disabled')),
  auth_policy jsonb NOT NULL DEFAULT '{}'::jsonb CHECK(jsonb_typeof(auth_policy)='object'),
  source_ref text,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS switchboard_protocol_pair ON switchboard.protocols(from_app,to_app);
CREATE TABLE IF NOT EXISTS switchboard.revision_receipts (
  receipt_id text PRIMARY KEY,
  protocol_id text REFERENCES switchboard.protocols(protocol_id),
  actor_ref text NOT NULL,
  subject_ref text,
  operation_state text NOT NULL,
  epistemic_state text,
  details jsonb NOT NULL DEFAULT '{}'::jsonb CHECK(jsonb_typeof(details)='object'),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE switchboard.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE switchboard.capabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE switchboard.protocols ENABLE ROW LEVEL SECURITY;
ALTER TABLE switchboard.revision_receipts ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON ALL TABLES IN SCHEMA switchboard FROM PUBLIC;

-- These entries are documented POTENTIAL pairings, NOT a claim of deployed connectivity.
INSERT INTO switchboard.apps(app_id,label,kind,lifecycle,notes) VALUES
 ('nexusboard','NexusBoard System Entity','logical_service','proposed','Cloudflare Durable Object target; unverified'),
 ('neon-board','Neon Evidence Board','logical_service','discovered','Existing evidence_net tables on dev branch'),
 ('neon-catalog','Neon Catalog Box','logical_service','discovered','Existing card_protocol tables on dev branch'),
 ('dictionary','Dictionary Evidence','logical_service','proposed','Full WordNet source ingestion not yet connected'),
 ('open-diagram','OpenDiagram','external_app','discovered','Existing native Whiteboard in separate repository'),
 ('agent-resources','Agent Resources','corporate_seat','discovered','Existing nb.positions; DO runtime unverified')
ON CONFLICT(app_id) DO NOTHING;

INSERT INTO switchboard.protocols
(protocol_id,version,from_app,to_app,title,effect_class,steps,status,auth_policy,source_ref) VALUES
 ('neon-evidence-to-open-diagram',1,'neon-board','open-diagram','Visualize pinned evidence graph','read',
  '["Authenticate requester and pin graph revision","Read evidence_net nodes and edges with source refs","Resolve linked catalog card revisions","Translate only existing relations to a diagram","Return visual receipt; never infer or write knowledge"]'::jsonb,'proposed',
  '{"required_scope":"evidence:read","audience":"operator"}'::jsonb,'NexusBoard#4'),
 ('open-diagram-to-neon-evidence',1,'open-diagram','neon-board','Propose evidence link','proposal',
  '["Verify authenticated actor and source node IDs","Validate typed relation and source","Write provisional evidence proposal only via guarded transaction","Return revision and audit receipt"]'::jsonb,
  'proposed','{"required_scope":"evidence:propose","review_required":true}'::jsonb,'NexusBoard#4'),
 ('neon-catalog-to-neon-evidence',1,'neon-catalog','neon-board','Resolve catalog evidence','read',
  '["Resolve version-pinned catalog card","Read the referenced evidence nodes and links","Preserve independent epistemic statuses"]'::jsonb,
  'proposed','{"required_scope":"evidence:read"}'::jsonb,'NexusBoard#4'),
 ('dictionary-to-neon-catalog',1,'dictionary','neon-catalog','Index dictionary definition','proposal',
  '["Read cited dictionary definition and sense","Record every word occurrence","Propose catalog card and source links","Require controlled ingestion into Neon"]'::jsonb,
  'proposed','{"required_scope":"dictionary:propose"}'::jsonb,'NexusBoard#4'),
 ('system-to-agent-resources',1,'nexusboard','agent-resources','Route authorized internal assignment','local_state',
  '["Resolve corporate position and registered agent","Verify service charter and requested scope","Route to Agent Durable Object","Record checkpoint and result in durable local event log"]'::jsonb,
  'proposed','{"required_scope":"seat:route","no_self_approval":true}'::jsonb,'NexusBoard#4')
ON CONFLICT(protocol_id) DO NOTHING;
