---
description: >-
  Lists exactly what a plan-structure validator checks, what it deliberately does not judge, and the determinism its
  diagnostics must satisfy.
when_to_use: >-
  Use when implementing a plan validator, or when deciding whether a review finding belongs to automation or to a human.
---

# Structural Validation

Plan structure is mechanically checkable, and everything mechanically checkable should be checked mechanically. That
frees review to spend its attention on the part no validator can reach.

## What Is Checked

| Check               | Fails when                                                                        |
| ------------------- | --------------------------------------------------------------------------------- |
| lifecycle spelling  | a plan root is not one of the four canonical names                                |
| slug form           | a live slug carries a date, or a `done/` slug lacks the `YYYY-MM-DD__` prefix     |
| single occupancy    | one slug appears under more than one lifecycle root                               |
| required documents  | any of the six is missing from a backlog or in-progress plan                      |
| technical shape     | both shapes are present, or neither is                                            |
| companion names     | an ordinal is not three digits, or the name is not descriptive kebab-case         |
| companion order     | ordinals are not contiguous from `001`, or duplicate                              |
| entrypoint list     | a companion is on disk but unlisted, or listed but absent                         |
| acceptance labels   | an acceptance identifier is duplicated, or is not stable across the plan          |
| delivery references | a delivery item cites an acceptance identifier that does not exist                |
| executor labels     | a delivery item carries neither `[AI]` nor `[HUMAN]`                              |
| phase ordering      | phases are not in dependency order, or a phase is unnumbered                      |
| archival separation | archival items are interleaved with substantive phases rather than following them |

## What Is Not Checked

A validator does not judge whether the writing is clear, whether the acceptance criteria are the right ones, whether the
approach is wise, or whether the plan is worth executing. Those are review questions, and a tool that claimed to answer
them would give a confident wrong answer.

The boundary matters in both directions. A structural rule left to human review will be applied inconsistently. A
judgement call encoded as a rule will be enforced in cases nobody considered.

## Determinism

The same input produces the same diagnostics and the same exit status, every time and on every machine. Concretely:

- diagnostics sort by path, then by rule identifier, then by field — never by discovery order;
- each diagnostic names the path, the rule, what was wrong, and what to do about it;
- rule identifiers are stable across versions, because they are what other tooling and other implementations match on; a
  rule that changes meaning gets a new identifier rather than a new definition; and
- the exit status distinguishes clean, findings, and tool error, so a broken validator cannot be mistaken for a clean
  plan.

Where more than one implementation of this validator exists, they accept and reject the same inputs with the same rule
identifiers, the same messages, and the same exit classes. Two validators that disagree are worse than one, because a
repository will believe whichever it happened to run.
