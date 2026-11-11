# Provenance, integrity, append-only history and independent assurance

**Design specification.** The report claims W3C PROV-O compliant, immutable and cryptographically verifiable institutional history. It supplies conceptual mappings, **not** a concrete schema revision, signed event, verified retention process or reproducibility evidence.

## PROV-O mapping candidates

| W3C PROV-O concept | Candidate NexusBoard record | Relationship |
|---|---|---|
| `prov:Entity` | source snapshot, claim, evidence resource unit, relation proposal, report | `prov:wasDerivedFrom`, `prov:wasGeneratedBy` |
| `prov:Activity` | ingestion, evaluation, mission invocation, committee disposition | `prov:used`, start/end, generated outputs |
| `prov:Agent` | accountable person, authorized service, seat occupant or operator identity | `prov:wasAssociatedWith`, `prov:actedOnBehalfOf` |
| PROV bundle | scoped group of provenance statements and provenance-of-provenance | versioned and attributable bundle |

Source: [W3C PROV-O](https://www.w3.org/TR/prov-o/). A `prov:Agent` is a provenance **responsibility actor**, not automatically a NexusBoard constitutional seat.

## What a content hash can and cannot prove

SHA-256 is useful for detecting changes to the **exact canonicalized bytes that were hashed**. It does not prove who originated a source, whether a statement is true, whether an actor was authorized, or whether an attacker replaced both data and stored hash. Record hash algorithm, canonicalization/version, verification procedure and trusted anchor. Hashes alone are not digital signatures or WORM retention.

## History and privacy

A non-destructive data model can append new assessment and source revision records while maintaining reconstructable past decisions. This is a **logical versioning requirement**; physical `UPDATE`/deletion restrictions need explicit independent implementation. Legal erasure and retention limitations must be respected. Include redaction/crypto-erasure mechanisms where necessary without pretending all data can be permanently retained.

## Audit chain and source of truth

An audit event should bind: actor/authentication, origin delegation, mission, seat, authorization decision, actual effect, source/version, timestamp, idempotency, policy/charter version and review record. For tamper evidence consider signed/hash-chained events, separation of log writers/readers, restricted retention, independent immutable anchoring and operational verification.

**PROV-O is descriptive, not a security enforcement engine.** A claimed 'immutable audit table for all roles including administrators' cannot be inferred from schema/triggers alone.

## Independent Audit office

Seat 20 can be given authorized broad coverage through a dedicated read-only principal or safe reporting API, subject to sensitivity controls and logged access. **Unrestricted database access is not required or advisable.** Audit should not share operational approval or implementation authority for the changes it assesses.

## Required evidence

Actual `en.*`/ `nb.*` table definitions, event schema, source retention plan, cryptographic binding spec, authorization decisions, audit exporter, independent read controls, and an executed pre-registered assessment. No such validation was performed here.
