# Security and responsible disclosure

This public repository publishes **research documentation**, not live credentials or a public administrative control plane.

Never post connection strings, API keys, private archives, client data, personal access tokens, internal secrets, or sensitive production details in commits, Issues or diagrams. No verified private security contact channel is configured here; request a private reporting path from the maintainer without including vulnerability secrets in public.

Required design safeguards: per-seat authenticated principals; enforcement at the *callee* as well as gateway; least privilege and SQL row-level policies where applicable; scoped revocable operator leases; idempotency for writes; separation of proposer and approver; human approval for consequential actions; log denied actions without exposing secrets.

These are **specified safeguards**, not a guarantee they are all operational.
