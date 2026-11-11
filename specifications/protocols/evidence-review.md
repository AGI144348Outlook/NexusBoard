# Evidence encounter and relation review — design draft

## Proposed states

Capture source and version → extract labeled observations/claims → propose explicit relation with ID → independently evaluate evidence and lineage → disposition (approve, defer, reject, challenge) → append revision → time-aware retrieval and impact review.

## Two statuses

**Operational:** received, queued, running, completed, failed.  
**Epistemic:** provisional, unverified, contested, supported_with_limitations, rejected, superseded, review_required.

A tool call accepted or a schema constraint satisfied does not constitute semantic confirmation.

## Required audit fields

source_ref and version; actor/seat; mission_id; procedure and policy versions; specific relation_id and revision; basis and counterevidence; reviewer identity distinct from proposer for sensitive cases; disposition; time; downstream dependency IDs.

AR may create context branches and proposals. CDO checks data integrity. R&D and relevant reviewers examine technical claims. COO or other competent authority accepts protected operational consequences. Audit examines independent history.

## Non-destructive contradiction

A withdrawn source triggers typed dependency traversal and **review-required** outcomes for affected claims; prior observation and assessment records remain traceable where lawful. Prevent recursion loops, duplicate endorsements from one lineage, unsupported source-independence scores and hidden circular review.

Sources 11–17, 22–24.
