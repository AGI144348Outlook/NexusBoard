-- NexusBoard Documentation Catalog Box
-- Migration: 2026-11-15-001. Additive only. No existing nb tables are altered.
-- Deployment target: Neon nexusboard-inc, default database and branch.
-- No public schema grants. Application auth must enforce source visibility.
CREATE SCHEMA IF NOT EXISTS documentation_catalog;

CREATE TABLE IF NOT EXISTS documentation_catalog.catalog_boxes (
  box_id text PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  classification text NOT NULL DEFAULT 'restricted' CHECK (classification IN ('public','internal','restricted')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documentation_catalog.repositories (
  repo_full_name text PRIMARY KEY,
  github_repo_id bigint,
  visibility text NOT NULL DEFAULT 'unknown' CHECK (visibility IN ('public','private','internal','unknown')),
  repository_url text,
  default_branch text,
  cataloged_at timestamptz NOT NULL DEFAULT now(),
  last_reviewed_at timestamptz,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS documentation_catalog.issue_cards (
  repo_full_name text NOT NULL REFERENCES documentation_catalog.repositories(repo_full_name),
  issue_number integer NOT NULL CHECK (issue_number > 0),
  source_url text NOT NULL,
  issue_title text,
  issue_state text NOT NULL DEFAULT 'unknown',
  source_updated_at timestamptz,
  last_reviewed_at timestamptz,
  visibility text NOT NULL DEFAULT 'unknown' CHECK (visibility IN ('public','private','internal','unknown')),
  review_status text NOT NULL DEFAULT 'unread',
  content_retention text NOT NULL DEFAULT 'metadata_only',
  source_fingerprint text,
  tags text[] NOT NULL DEFAULT ARRAY[]::text[],
  notes jsonb NOT NULL DEFAULT '{}'::jsonb,
  PRIMARY KEY(repo_full_name,issue_number)
);

CREATE TABLE IF NOT EXISTS documentation_catalog.source_documents (
  document_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_uri text NOT NULL,
  title text NOT NULL,
  source_type text NOT NULL,
  repo_full_name text REFERENCES documentation_catalog.repositories(repo_full_name),
  source_ref text,
  content_sha256 text,
  visibility text NOT NULL DEFAULT 'unknown' CHECK (visibility IN ('public','private','internal','unknown')),
  evidence_status text NOT NULL DEFAULT 'source_reference_only',
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  recorded_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(source_uri,source_ref)
);

CREATE TABLE IF NOT EXISTS documentation_catalog.analysis_reports (
  report_id text PRIMARY KEY,
  title text NOT NULL,
  document_url text,
  report_status text NOT NULL DEFAULT 'draft',
  classification text NOT NULL DEFAULT 'internal' CHECK (classification IN ('public','internal','restricted')),
  review_question text,
  findings jsonb NOT NULL DEFAULT '{}'::jsonb,
  limitations jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documentation_catalog.evidence_links (
  link_id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  source_kind text NOT NULL,
  source_identifier text NOT NULL,
  target_kind text NOT NULL,
  target_identifier text NOT NULL,
  relation_type text NOT NULL,
  support_ref text,
  evidence_status text NOT NULL DEFAULT 'proposed',
  classification text NOT NULL DEFAULT 'restricted' CHECK (classification IN ('public','internal','restricted')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documentation_catalog.review_runs (
  run_id text PRIMARY KEY,
  review_type text NOT NULL,
  scheduled_for timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  ended_at timestamptz,
  status text NOT NULL DEFAULT 'in_progress',
  repositories_seen integer NOT NULL DEFAULT 0,
  issues_read integer NOT NULL DEFAULT 0,
  sources_blocked integer NOT NULL DEFAULT 0,
  findings jsonb NOT NULL DEFAULT '{}'::jsonb,
  limitations jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE TABLE IF NOT EXISTS documentation_catalog.review_checkpoints (
  checkpoint_key text PRIMARY KEY,
  cursor jsonb NOT NULL DEFAULT '{}'::jsonb,
  coverage jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_run_id text REFERENCES documentation_catalog.review_runs(run_id),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documentation_catalog.publication_candidates (
  candidate_id text PRIMARY KEY,
  report_id text REFERENCES documentation_catalog.analysis_reports(report_id),
  proposed_chapter text NOT NULL,
  editorial_status text NOT NULL DEFAULT 'candidate',
  rights_status text NOT NULL DEFAULT 'not_reviewed',
  release_approval text NOT NULL DEFAULT 'not_granted',
  source_notes jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS issue_cards_by_review_status ON documentation_catalog.issue_cards(review_status,last_reviewed_at);
CREATE INDEX IF NOT EXISTS issue_cards_by_updated ON documentation_catalog.issue_cards(source_updated_at DESC);
CREATE INDEX IF NOT EXISTS source_documents_by_repo ON documentation_catalog.source_documents(repo_full_name,source_type);
CREATE INDEX IF NOT EXISTS evidence_links_by_source ON documentation_catalog.evidence_links(source_kind,source_identifier);
CREATE INDEX IF NOT EXISTS review_runs_by_start ON documentation_catalog.review_runs(started_at DESC);

INSERT INTO documentation_catalog.catalog_boxes (box_id,title,description,classification)
VALUES ('NB-DOC-000','NexusBoard GitHub Issues and MCP Research Documentation','Restricted catalog of issue source pointers, cross-domain research, glyph interface grammar and publication candidates.','restricted')
ON CONFLICT (box_id) DO NOTHING;
