---
description: >-
  Limits numeric coverage to authored executable production code a reliable instrument measures, requires a 99% floor on
  the combined unit and integration figure over the whole project, and gives end-to-end and infrastructure code no line
  target.
when_to_use: >-
  Use when configuring coverage measurement, setting or checking the coverage floor, deciding what a coverage report may
  include, or deciding whether a layer or stack carries a numeric coverage target at all.
---

# Meaningful Coverage

A coverage number is evidence only about the code it measured, and only when the instrument measured it correctly.
Counted over generated files or configuration, or by a tool that misreports, it moves while the untested behaviour stays
exactly where it was.

This standard implements [Evidence Over Assertion](../../../principles/evidence-over-assertion.md) and
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md). It decides what coverage may measure and the
floor it must reach. Which run gates coverage belongs to [Test Boundaries and Gates](test-boundaries-and-gates.md), and
which code may be excluded to [Exclusions and Exemptions](meaningful-coverage/001-exclusions-and-exemptions.md). A
measured figure is read as [Trustworthy Measurement](../evidence/trustworthy-measurement.md) requires.

## What a Number May Measure

Numeric coverage applies only where both hold:

- a reliable instrument measures the code, attributing executed lines and branches correctly for that language and
  runtime; and
- the code is authored, executable, production code.

When either fails, a number is not evidence, and no number is reported.

## The Floor

Wherever a number may be measured, a project's combined unit and integration coverage must be at least 99%:

- **Combined.** The unit and integration profiles merge into one figure over one denominator, so code only an
  integration test reaches counts, and no line counts twice.
- **Whole project.** The denominator is every authored production file of the project, never a chosen core package. A
  floor over a core can read 99% while the adapters, where boundary defects live, go unmeasured.
- **A minimum.** A repository may record a higher floor under
  [Layers and Adapters](behaviour-driven-development/002-layers-and-adapters.md), never a lower one.

The coverage gate runs the unit and integration suites together, wherever the repository runs integration suites under
[Compliance and Reporting](behaviour-driven-development/004-compliance-and-reporting.md). The fast gate's unit run
reports its own figure and cannot enforce a floor that integration tests help meet.

## Outside Numeric Coverage

| Code                       | Why it is outside                                                        |
| -------------------------- | ------------------------------------------------------------------------ |
| generated output           | the generator's own tests cover it; its lines inflate or dilute a figure |
| test-support programs      | they are test code, not production code                                  |
| declarative configuration  | nothing executes line by line; native validation checks it               |
| external and vendored code | its owner tests it, and this repository cannot change it                 |

Only the first two rows are exclusions from an otherwise measured project; the last two never enter the denominator.
Every exclusion and exemption follows [Exclusions and Exemptions](meaningful-coverage/001-exclusions-and-exemptions.md).

## Layers

- **Unit.** Always measured for instrumentable production code.
- **Integration.** Measured with the unit run in the combined figure, from an instrumented build where the language
  needs one.
- **End-to-end.** Proves public journeys and their failure paths. It carries no line-coverage target, counts toward no
  floor, and runs in no hook.

## No Surrogate Metric

Where no reliable instrument exists, such as declarative infrastructure or a shell dialect whose coverage tool
misreports, the stack's native verification stands in its place: validation, lint, native tests, plan review, and
idempotence runs where they apply. Never invent a surrogate number, such as resources touched or scripts with a test, to
fill a coverage slot, and never define a coverage target that measures nothing, as
[Task Runner Target Standards](../../workflow/task-runner-target-standards.md) forbids. The stack standard names its
native verification.

## Adoption Never Lowers a Floor

A repository that already holds a floor above the minimum keeps it. Reclassifying code as outside coverage to clear a
floor is widening an exclusion, which [Software Quality Enforcement](../checks/software-quality-enforcement.md) treats
as a change to a gate.

## Enforcement

Gated by the adopter's coverage gate, which fails below the floor on the merged figure and fails when an authored
production file is absent from the measured set. Show it failing on a 98.9% figure or a missing package, and passing at
99.0% with every package present. Unenforced by decision: whether an instrument is reliable and whether code is authored
production code are review judgements that no validator makes well.
