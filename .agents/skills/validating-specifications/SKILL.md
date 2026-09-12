---
name: validating-specifications
description: >-
  Guides checking a specification before anyone builds from it for completeness, consistency, correctness, and
  testability, turning each vague term into a measurable criterion and rating every finding by its consequence.
when_to_use: >-
  Use when reviewing requirements, acceptance criteria, a scenario set, a contract, or a technical design before
  implementation starts.
compatibility: Requires read access to the specification, the documents it cites, and any implementation it names.
---

# Validating Specifications

A specification costs least to correct before code exists. Afterwards, a vague requirement has already been settled one
way by whoever built it, and every later reading turns into an argument about what was meant.

The rules live elsewhere.
[Plan Specification Changes](../../../repo-governance/conventions/structure/plan-specification-changes.md) governs what
a plan says about specifications,
[Specification Maintenance](../../../repo-governance/development/quality/evidence/specification-maintenance.md) keeps an
as-built specification true, [Writing Gherkin Criteria](../plan-writing-gherkin-criteria/SKILL.md) shows how a scenario
can fail, [Validating Plan Quality](../plan-validating-quality/SKILL.md) judges a plan's documents, and
[Criticality Levels](../../../repo-governance/development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md)
fixes the levels. This skill covers deciding whether one specification, in any form, is ready to build from.

## Read Once per Dimension

| Dimension    | The question                                                                                  | A typical miss                                              |
| ------------ | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| completeness | does it say what happens in every case it admits, including failures, limits, and exclusions? | only the success path is written; a precondition is assumed |
| consistency  | does it agree with itself and with what it cites, using one term for one thing?               | two sections set different limits; one role has two names   |
| correctness  | is each claim true of the system and tools it describes?                                      | a named file, option, or operation does not exist           |
| testability  | could a check decide whether it holds, without asking its author?                             | an outcome nobody can observe, or one with no value         |

Take one pass per dimension. A single pass for everything finds whatever is most visible, usually wording, and misses
the failure case that is not written anywhere, which is the costlier defect.

## Replace Vague Terms, Do Not Just Flag Them

A finding about a vague term proposes what would settle it, so the author confirms a value instead of inventing one:

| Vague wording                 | A measurable replacement names                                          |
| ----------------------------- | ----------------------------------------------------------------------- |
| fast, responsive              | a limit, the operation it applies to, and where it is measured          |
| intuitive, easy to use        | an observable task result, or a named accessibility conformance level   |
| when appropriate, as needed   | the exact triggering condition                                          |
| and so on, including but not  | the complete list                                                       |
| large, reasonable, sufficient | a number with its unit                                                  |
| handles errors gracefully     | each error, what the caller observes, and what state remains afterwards |

When nobody can supply the value, record an open question with an owner. A guessed number written as the requirement is
worse than the vague word, because it looks decided.

## Check Correctness, Never Assume It

A reference is correct once it has been looked up: the file listed, the operation's signature read, the option found in
the tool's reference. External commands, versions, and interfaces follow
[validating-factual-accuracy](../validating-factual-accuracy/SKILL.md). An example in a specification is run, or marked
as not run.

## Rate by What Building It Would Cost

- **`CRITICAL`:** a required part is absent, two requirements contradict each other, or a core requirement cannot be
  tested.
- **`HIGH`:** a competent builder could reasonably build the wrong thing, or a failure or boundary case is missing.
- **`MEDIUM`:** a description is incomplete, an example is missing, or an inconsistency nobody would misread.
- **`LOW`:** wording, ordering, or an optional clarification.

These apply the assignment order in Criticality Levels to specifications; where a case fits a higher question there,
that level wins.

Each finding names its location, dimension, level, what is wrong, what building it as written would cost, and the
proposed repair. [Assessing Criticality and Confidence](../assessing-criticality-confidence/SKILL.md) covers borderline
levels, and [generating-validation-reports](../generating-validation-reports/SKILL.md) the report.

## Outside This Judgement

Whether the work is worth doing, which planning settles, and whether a corpus is laid out correctly, which
[validating-specification-structure](../validating-specification-structure/SKILL.md) covers.
