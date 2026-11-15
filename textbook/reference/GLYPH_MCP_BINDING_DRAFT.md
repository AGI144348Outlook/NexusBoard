# Draft Glyph–MCP Binding Record Format (Non-normative)

A binding is a mapping between a **visual token identity** and a **specific discovered MCP capability**. It does not grant rights.

```json
{
  "glyph_id": "mashet.glyph.coupling",
  "glyph": "⧖",
  "unicode_sequence": ["U+29D6"],
  "registry_version": "draft-0.1",
  "grammar_role": "relation_operator",
  "canonical_label": "Coupling",
  "binding_status": "proposed",
  "mcp": {
    "server_reference": "server-identity-required",
    "primitive": "tool",
    "name": "mashet.relation.couple",
    "input_schema_reference": "schema-required",
    "output_schema_reference": "schema-required"
  },
  "effects": "proposal_only",
  "authorization": "server_enforced",
  "provenance_policy": "source_pins_required",
  "error_statuses": ["DENIED", "INVALID_ARGUMENT", "STALE", "UNKNOWN"],
  "accessibility_label": "Request proposed relationship",
  "verification_status": "NOT_TESTED"
}
```

**Important:** This is a schema illustration. The Unicode codepoint, glyph normalization, available primitive name, registry version and real server's schemas must be independently checked before implementation. Exact aliases may be accepted only through an explicit versioned normalization table.

## Registry invariants
- Glyph visual similarity is not machine token equivalence.
- A mapping is scoped by version and capability source.
- Tool list/discovery is not authorization.
- Proposed, authorized, executed, verified and committed are distinct states.
- Reports, evidence cards and textbook prose cannot themselves invoke tools.
- Agent workflow state, memory state and repository audit history remain separately owned and explicitly linked.
