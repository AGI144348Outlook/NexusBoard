# H-002 — operator replacement without identity loss

**Hypothesis (not tested):** a docked conversation and separately scoped cloud operator can exchange mission control using durable corporate state, without replacing seat identities or fabricating task outcomes.

**Proposed method:** record authorized mission and checkpoint; end a lease; resume via a different authorized principal; verify mission, budget, evidence, approver and history; attempt a rejected expired-lease call.

**Expected:** same state is recovered; old privilege denied. **Challenge:** duplicated external actions, loss of evidence references, stale statuses, or privilege escalation.

**Constraint:** no real credentials or live deployment without approval. Pre-test Issue/Discussion required before running. Sources 03, 05, 15, 24.
