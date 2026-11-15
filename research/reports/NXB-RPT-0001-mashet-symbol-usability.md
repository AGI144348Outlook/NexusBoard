# NXB-RPT-0001 — Mashet Symbol Usability: Retrospective Findings
Date: 2026-11-15 | Status: preliminary retrospective | Scope: cross-project

## Research question
How have Mashet symbols been used in conversation and prototype interfaces, independent of whether the proposed systems function?

## Evidence basis and limitations
Based on available conversation history and prior user-reported Python test output. This is not a complete archived transcript audit, formal user study, or verified test of all 96 symbols. No repository test was run for this report.

## Observations
- Original 23 symbols: ☉ ⇢◇ ∫↺ ⧖ ≋ ⌖ ⚖ ⤓ ⊕ ⟲ ♢ ⊗ Δ Φ Ψ Λ Ω μ σ λ ∇ ⊥ τ.
- Uses include compact concept labels, diagram nodes, directional flows, compositional expressions, proposed executable operators, and Hebrew glyph identifiers.
- Timothy identified a visual discontinuity at the expansion boundary between entries 23 and 24.
- Notation variants include ⟲/⟳/↺, ⇢◇/⇢, ∫↺/∫; these are not interchangeable Unicode strings.
- Hebrew glyph carriers (e.g., א, מ), the inert cell ⟐, and Mashet operators (e.g., ⧖) have different roles.
- Android entry of uncommon Unicode symbols presents a plausible usability obstacle; it has not been measured.

## Interpretation
The notation's primary strengths are compactness, visual reuse, and diagrammatic composability. Risks are alias drift, overloaded meanings, lack of explicit operator grammar, visual similarity, and a gap between human readability and exact machine parsing.

## Recommended follow-up
Create a canonical symbol registry recording Unicode codepoints, roles, names, aliases, compositions, example uses, ambiguity notes, and source provenance. Evaluate glyph-only versus annotated recognition, mobile entry time/error rate, and expression interpretation with independent participants. These are proposed studies, not completed tests.

## MCP and AR SkillBlock Office research direction
Evaluate a proposed glyph notation for MCP tool calls, resources, prompts, handoffs, pipeline stages, evidence cards, permissions and provenance. Keep the notation distinct from normative MCP specifications. Study whether glyph annotations improve actual usability compared with text labels and conventional flowcharts.

## Publication disposition
Candidate material for textbook chapters on symbol design, notation grammar, and MCP-oriented visual interfaces. Requires source verification, editorial expansion, rights review, and author approval.
