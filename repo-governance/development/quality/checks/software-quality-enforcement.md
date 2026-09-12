---
description: >-
  Gives every quality rule a declared enforcement class and route, forbids making a check pass by weakening it, and
  never reads a check that inspected nothing, or never ran, as a pass.
when_to_use: >-
  Use before reporting a change complete, when adding or changing a gate, hook, schedule, or review obligation, or when
  a check passes suspiciously easily.
---

# Software Quality Enforcement

A rule is only as strong as whatever makes it hold. Naming that for every rule stops a repository from believing in a
guarantee nothing enforces.

This standard implements [Evidence Over Assertion](../../../principles/evidence-over-assertion.md),
[Fail Closed](../../../principles/fail-closed.md),
[Root Cause Orientation](../../../principles/root-cause-orientation.md), and
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md). Which surface a check runs on is owned by
[Automated Quality Gates](automated-quality-gates.md), and what a gate returns by
[Quality Gate Results](../manual-verification/001-quality-gate-results.md).

## Every Rule Names Its Class

| Class               | Means                                                                       |
| ------------------- | --------------------------------------------------------------------------- |
| required gate       | an automated command that must pass before applicable work is complete      |
| commit gate         | runs automatically and blocks a commit when it fails                        |
| push gate           | runs automatically and blocks a push when it fails                          |
| scheduled detection | finds regressions on a cadence, and never blocks a push that came before it |
| required evidence   | a blocking review by a person or an agent, with no automation behind it     |
| runtime guard       | fails closed before unsafe test, deployment, or other work starts           |

The repository keeps one enforcement map, naming for each maintained outcome its owning rule and every class and route
that enforces it.

Each entry names its route truthfully. A rule held only by review is required evidence, never a gate that does not
exist, and an invariant claimed with no route at all is an intention. Missing automation never weakens a rule; it only
changes which class carries it.

Hooks, pipelines, and schedules implement the map and never replace it. Project READMEs record the commands each route
resolves to.

## Applying the Map

An entry applies when a change can alter its outcome, boundary, artifact, or mechanism. Before completion, run the
narrowest target of every applicable entry and record the evidence. Scheduled detection never replaces that local proof;
it reports after the change lands.

Automation proves a final state, not the order that produced it, so an ordering rule such as
[Test-Driven Development](../testing/test-driven-development.md) is required evidence even where a gate checks its
result.

Applicable entries, their results, and evidence still owed survive compaction and handoff under
[Governance Continuity](../../../principles/governance-continuity.md), and a resumed reader reloads the map first.

## No Superficial Satisfaction

Never make a check pass by weakening it. Beyond the suppressions that
[Root Cause Orientation](../../../principles/root-cause-orientation.md) and
[Preexisting Error Resolution](../evidence/preexisting-error-resolution.md) already rule out, each of these is the same
move:

- lowering a coverage floor, or widening an exclusion, until the number clears;
- catching an error only to reach a return statement;
- asserting something the code cannot fail; and
- editing a validator so it stops reporting, instead of changing the declaration it reads.

Each leaves the repository reporting a guarantee it no longer has.

When the check itself is wrong, change it deliberately, in its own commit with the reason stated, never inside the
change it inconvenienced. Suppressing one finding follows the waiver rule in [Lint Strictness](lint-strictness.md).

## Nothing Inspected Is Not a Pass

A check that inspected zero files, cases, or scenarios has looked at nothing, whatever its exit status. Every check
reports how much it inspected, and a count that drops without an explained cause is a finding of its own.

A skipped or cancelled required job reports nothing, so an aggregate check that merge protection relies on treats a
skipped or cancelled dependency as a failure.

Say what a green result proves and no more. A static check that resolves bindings is not a suite that ran them, and a
scanner that matched no pattern has not shown that a value is safe to publish. Name which check produced the green.

## Reporting Completion

A change is complete when every gate it requires has passed, with its output kept; started or expected to pass does not
count. A failed gate is reported with its output and a skipped step with its reason. A claim that omits a skipped step
is worse than an incomplete one, because it stops anyone from looking.

An adopter enforces the map in its own hooks, pipeline, and review checklist.
