---
name: plan
description: >-
  Indexes the six plan-lifecycle workflows, from grooming an idea through reviewing finished execution before archival.
when_to_use: >-
  Use when starting any stage of the plan lifecycle, or when checking that a repository can run the lifecycle end to
  end.
---

# Plan Workflows

Six workflows live here. The seventh capability of the plan lifecycle — cleanup — is a general maintenance concern and
lives in [`maintenance/`](../maintenance/README.md), because work that is not a plan also leaves artifacts behind.

| Workflow                                     | Ends when                                                    |
| -------------------------------------------- | ------------------------------------------------------------ |
| [Ideas Grooming](plan-ideas-grooming.md)     | every idea brief is promoted, kept with a reason, or retired |
| [Backlog Grooming](plan-backlog-grooming.md) | every backlog plan is current, ordered, or removed           |
| [Planning](plan-planning.md)                 | a complete six-document plan passes its quality gate         |
| [Execution](plan-execution.md)               | every substantive checklist item is terminal                 |
| [Quality Gate](plan-quality-gate.md)         | a terminal verdict is recorded against a frozen draft        |
| [Execution Check](plan-execution-check.md)   | a terminal execution verdict permits or blocks archival      |

Together with [Gherkin Implementation Review](../quality/gherkin-implementation-review.md) and
[Dev Artifact Clean-Up](../maintenance/dev-artifact-clean-up.md), these cover the whole lifecycle. A repository missing
one of them has a stage nobody owns.

## Directory Map

- [Ideas Grooming](plan-ideas-grooming.md)
- [Backlog Grooming](plan-backlog-grooming.md)
- [Planning](plan-planning.md)
- [Execution](plan-execution.md)
- [Quality Gate](plan-quality-gate.md)
- [Execution Check](plan-execution-check.md)
