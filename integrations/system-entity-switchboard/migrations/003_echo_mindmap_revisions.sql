-- ECHO-MINDMAP-001 · Echo-only Neon development memory catalog, no existing evidence mutation.
-- Pretest NexusBoard Issue #5 and OpenDiagram Issue #15.
CREATE SCHEMA IF NOT EXISTS echo_mindmaps;

CREATE TABLE IF NOT EXISTS echo_mindmaps.revisions (
  map_id text NOT NULL CHECK (length(map_id) BETWEEN 5 AND 96),
  revision integer NOT NULL CHECK (revision > 0),
  commit_id text NOT NULL UNIQUE,
  name text NOT NULL CHECK (length(trim(name)) BETWEEN 1 AND 180),
  actor_kind text NOT NULL CHECK (actor_kind IN ('owner_operator','authorized_mcp_operator')),
  actor_ref text NOT NULL CHECK (length(trim(actor_ref)) > 0),
  source_graph_id text,
  source_node_ids jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(source_node_ids)='array'),
  source_relation_ids jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(source_relation_ids)='array'),
  scene jsonb NOT NULL CHECK (jsonb_typeof(scene)='object'),
  visual_nodes jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(visual_nodes)='array'),
  visual_links jsonb NOT NULL DEFAULT '[]'::jsonb CHECK (jsonb_typeof(visual_links)='array'),
  epistemic_state text NOT NULL DEFAULT 'proposed' CHECK (epistemic_state='proposed'),
  payload_sha256 text NOT NULL CHECK (length(payload_sha256)=64),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (map_id, revision)
);

CREATE INDEX IF NOT EXISTS echo_mindmap_revisions_recent
ON echo_mindmaps.revisions (created_at DESC);

CREATE INDEX IF NOT EXISTS echo_mindmap_revisions_map_latest
ON echo_mindmaps.revisions (map_id, revision DESC);

ALTER TABLE echo_mindmaps.revisions ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON echo_mindmaps.revisions FROM PUBLIC;

COMMENT ON TABLE echo_mindmaps.revisions IS
'Versioned Excalidraw mindmaps and source-evidence references for Echo Neon. Visual arrows are NOT admitted evidence_net facts.';

-- Existing card_protocol card revisions provide a catalog card per successful
-- commit via an atomic parameterized CTE in the Worker. Existing reviewed facts
-- are neither updated nor deleted.
