# Chapter Draft — Mashet and the MCP Binding Layer
Status: Research-draft — not a normative specification or verified implementation

## The missing visual interface layer
MCP connects hosts, clients and servers through capabilities. The proposed Mashet Graphical Interface Language would expose a separate human-usable notation over those capabilities. A symbol is not itself a tool call. Its meaning is determined by a canonical glyph registry, a typed grammar, a server binding, the authenticated actor and an auditable outcome.

A glyph can be rendered in a palette, on a canvas, on a cataloged evidence card, or in a compact expression. The same symbol can denote a **proposed** operation before a runtime binds it to a particular server. Readers must see whether a glyph is just a legend entry, a discovered capability, an authorized capability, an executing tool call, or a completed action with a receipt.

## The five binding questions
1. **Identity:** Which exact canonical glyph or sequence and version is present?
2. **Grammar:** Is it an operator, state, control, argument, carrier or annotation?
3. **Capability:** Which MCP tool/resource/prompt, hosted by which server, accepts the intended parameters?
4. **Authority:** Which actor is authenticated, and what authorization, scope, expiry and policy governs invocation?
5. **Evidence:** What actually happened, with what source, result, failure or durable receipt?

A human-readable symbol and a machine-valid invocation share an interface only when each question is answered unambiguously.

## Example: an evidence-card relation request
Illustrative expression: `⧖(card_A, card_B)`.
Potential binding: a relation-proposal tool `mashet.relation.couple`. The request names two card IDs; the tool returns a proposed relation, source pointers, uncertainty status and explanation. It does not imply a database commit. A distinct `⌖` check resolves policy and `⚖` review evaluates evidence; `Δ` denotes a separately authorized mutation. The tool names are illustrative, not MCP defaults.

## Interface-level safety
A screen displaying `Δ` cannot be relied on to enforce authorization. The backend must check identity, eligibility, resource ownership and requested side effects. Visual labels must not conceal denied, expired, stale or unknown outcomes. Retry requires explicit idempotency semantics.

## Research agenda
Evaluate recognition accuracy, entry friction, composition errors, screen-reader labeling, latency to identify side effects, uncertainty comprehension, and relative success rates of glyph-only, glyph+text and text-only interfaces. Claim user benefit only from suitable empirical evidence.

Editorial sources: NexusBoard main `research/reports/NXB-RPT-0001` and `NXB-RPT-0002`; current official MCP specifications require a separate verification pass before publication.
