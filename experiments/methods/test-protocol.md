# Research test protocol — pre-test and post-test record

## Before execution

In the **repository being worked on**, publish a pre-test GitHub Issue/Discussion. Include a public-safe summary of relevant discussion with Timothy, problem, hypothesis, proposed intervention, methodology (code SHA, environment, data, commands and controls), expected outcomes, what would challenge hypothesis, safety/access/cost constraints, and test ID.

**No pre-test thread → no tests**, including exploratory diagnostics and triggering CI. Report blockages instead of retroactive logs.

## After execution

In that very same thread, record the method actually performed, observations before interpretations, failed steps, changed procedures, concrete logs/commit links, confounders, limitations, and next steps. Mark unrun cases explicitly. Never misrepresent a planned result as having happened.

## Artifact status

Plans are **proposed**. A test is **executed** only with an actual run trace. A result is **independently verified** only if a separate examiner can reproduce or substantiate it.

See [contributing](../../CONTRIBUTING.md) and [issue template](../../.github/ISSUE_TEMPLATE/pre-test-plan.md).
