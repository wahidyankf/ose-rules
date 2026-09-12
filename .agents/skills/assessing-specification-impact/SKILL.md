---
name: assessing-specification-impact
description: >-
  Guides finding the specifications a change could reach, deciding for each whether it changes or is a verified no-op,
  and leading a behaviour change with a scenario that fails for the right reason.
when_to_use: >-
  Use before starting any change in a project that keeps behaviour specifications or an architecture model, including
  changes expected to touch neither.
compatibility: Requires read access to the project's specifications and the ability to run its test layers.
---

# Assessing Specification Impact

[Specification Maintenance](../../../repo-governance/development/quality/evidence/specification-maintenance.md) owns the
rule: assess before every change, update first, and record the result. This skill covers how to perform that assessment
so its record means something.

## Find Candidates by Subject

List every specification whose subject the change could plausibly reach, then read it: scenarios, not file names. Read
the architecture model for any boundary, responsibility, or dependency direction the change could move, and the served
contracts the change's owner publishes.

A behaviour with no obvious owning specification is usually described at the wrong level. Look for the level where it
belongs before adding a stray file that owns it alone.

## Decide Each Surface

Give every candidate one of two results:

| Result         | Record                                                               |
| -------------- | -------------------------------------------------------------------- |
| changed        | what statement becomes inaccurate, and the edit that makes it true   |
| verified no-op | what was read, and why the change does not reach any statement in it |

"No specification changes needed" with nothing behind it is not a result. A no-op that names what was read can be
checked by a reviewer; one that does not is indistinguishable from skipping the step.

## Observable to Whom

The deciding question is whether anyone outside the code can observe the difference: a user, a caller, a consumer of
output, or an operator. If someone can, a scenario changes. An internal restructure with identical observable results
changes none. For a defect fix, decide which side was wrong before editing either, as the standard's table directs.

Leave unaffected specifications alone, including a sibling of one that changed. Editing a scenario because a change
landed nearby rewrites its history for nothing.

## When Behaviour Changes, the Scenario Leads

1. Write or edit the scenario first.
2. Bind it at the unit layer.
3. Run it at a layer that executes, and confirm it fails because the behaviour is absent, as
   [Cycle and Evidence](../../../repo-governance/development/quality/testing/test-driven-development/001-cycle-and-evidence.md)
   defines a red. A check that only resolves bindings proves nothing about behaviour, so its pass is not a red.
4. Write the production change until it passes.
5. Bind the remaining applicable layers, or record a scoped exemption.

## What Never Counts

A placeholder step, a binding that asserts what it was handed, or an outcome table nothing checks each turns green while
proving nothing;
[Bindings and Exemptions](../../../repo-governance/development/quality/testing/behaviour-driven-development/003-bindings-and-exemptions.md)
treats every one as a defect. An exemption names a concrete boundary a layer cannot reach, never difficulty, runtime,
flakiness, or cost.

## After the Change

Changed scenarios or bindings go through
[Gherkin Implementation Review](../../../repo-governance/workflows/quality/gherkin-implementation-review.md) before the
work is declared complete. A moved boundary leaves the model as-built, per
[Architecture Specifications](../../../repo-governance/development/quality/architecture/architecture-specifications.md).
