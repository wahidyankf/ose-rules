---
description: >-
  Formats Markdown with one pinned layout formatter and lints it with one pinned structural linter, both reading
  committed configuration, excludes frozen archives, and leaves the rule set and local lint surface to the adopter.
when_to_use: >-
  Use when setting up or changing how Markdown is formatted and linted, or when a Markdown formatting or lint gate
  blocks a change.
---

# Markdown Quality

Markdown in a repository is read by people, by agents, and by tools that parse its structure. It is formatted and linted
automatically, from configuration the repository commits, so the result does not depend on whichever editor last saved a
file.

This standard implements [Automation Over Manual](../../principles/automation-over-manual.md) and
[Explicit Over Implicit](../../principles/explicit-over-implicit.md). Where gates run in general is owned by
[Automated Quality Gates](automated-quality-gates.md), and the failure threshold by
[Lint Strictness](lint-strictness.md).

## Two Tools, Two Jobs

| Tool              | Owns                                                            | Illustrative example                                                 |
| ----------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| layout formatter  | layout: wrapping, whitespace, list indentation, table alignment | [Prettier](https://prettier.io/docs/)                                |
| structural linter | structure and syntax: headings, links, fences, list markers     | [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) |

The split keeps each question with one tool. A formatter that also judged structure, or a linter that also rewrote
layout, would give a contributor two answers to one question.

Both read committed configuration files, and both run at a pinned version. Nothing depends on a global install or on
either tool's defaults.

## Where They Run

The formatter runs before every commit on the staged Markdown files and restages what it rewrote, and it runs again in
continuous integration where the repository has it. There, a check mode that fails on a file the formatter would change,
instead of rewriting it, is the usual way to run it.

The linter runs in the local hooks, and in continuous integration where the repository has it. Which local surface is an
adopter decision, and the adopter records which it uses:

| Lint locally at                  | Gains                                                    | Costs                                                                  |
| -------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------------------- |
| before a commit, on staged files | a finding arrives while the author can still edit        | files outside the commit are not rechecked until the pipeline runs     |
| before a push, across the tree   | every file is checked together before anything is shared | a finding arrives after the commit exists and needs another one to fix |

## The Rule Set Is the Adopter's

Which rules are enabled is an adopter decision. A larger set catches more inconsistency and raises more findings in long
documents that are correct as written; a smaller set is quieter and lets more variation through.

Whichever set is chosen, a comment in the configuration giving each disabled rule's reason is good practice. A rule
turned off without a reason is indistinguishable from one nobody evaluated, and the next contributor has to rediscover
why.

## Frozen Archives Are Excluded

Content kept as a historical record, such as completed plans and archived documents, is excluded from both tools. Its
links rot legitimately as the files they named are renamed or removed, and linting it raises findings that block current
work without improving anything.

The exclusion is declared in each tool's ignore configuration, and the two lists agree. Dependencies, build output, and
generated reports are excluded because nobody authors them. Everything else is checked without exception.

An adopter enforces both tools in its own hooks and pipeline.
