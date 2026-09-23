---
name: specs-quality-gate
description: >-
  Validates explicitly listed specification folders for structure, consistency, and alignment with their implementation,
  and repairs findings in bounded check-fix cycles until two consecutive validations find nothing.
when_to_use: >-
  Use after creating, restructuring, or bulk-editing specification folders, before a specification migration, or to
  confirm that related specification areas agree.
---

# Specs Quality Gate

## Entry

The specification folders to validate are named. The gate never discovers or scans a whole specification tree: each
listed folder is validated with its subfolders, and nothing else.

- `folders` (`file-list`, required): the specification folders to validate.
- `mode` (optional `enum`, default `strict`): the lowest criticality counted. `lax` counts only `CRITICAL`, `normal`
  adds `HIGH`, `strict` adds `MEDIUM`, and `all` counts every level, per
  [Criticality Levels](../../development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md).
- `max-iterations` (`number`, optional, default `7`): the ceiling on check-fix cycles.

## Sequence

1. **Separate delegated checks.** Mechanical predicates, such as index existence, file counts, scenario cardinality, and
   link resolution, belong to the repository's own checks per
   [Deterministic and Judgement Validation](../../development/quality/checks/deterministic-and-judgement-validation.md).
   The checker keeps their evidence and never re-derives them by inference; missing evidence stays `pending`.
2. **Validate.** The checker reads every listed folder for:
   - **structure**: indexes that describe their folder and a tree shaped per
     [Specification Tree](../../conventions/structure/specification-tree.md);
   - **scenario format**: feature headers, user stories, shared setup, and naming per
     [Behaviour-Driven Development](../../development/quality/testing/behaviour-driven-development.md);
   - **consistency**: shared domains, terms, and diagrams agreeing across the listed folders, checked only when two or
     more are listed;
   - **references**: each link pointing at what the text claims it points at;
   - **implementation alignment**: every implementation a specification names exists.

   A checker that cannot finish ends the run `fail`.

3. **Count at the threshold.** Count the findings `mode` admits; below-threshold findings are reported, not counted or
   fixed. Zero counts as one clean validation and goes to step 5; a nonzero count resets the clean count and goes to
   step 4.
4. **Fix.** The fixer re-confirms each counted finding before editing, then repairs it within the listed folders. An
   uncertain fix, such as one changing what a specification requires, is skipped and reported. A reported finding, or
   one the checker and fixer keep disputing, is recorded once for a person and leaves the count; a run with only such
   findings left ends `partial`. A fixer that errors on one finding logs it and continues; a fixer that cannot start
   ends the run `fail`.
5. **Re-validate.** Two consecutive clean validations end the run `pass`, or `partial` when a finding was left to a
   person, and a single clean one repeats this step without fixing. A nonzero count returns to step 4 while cycles
   remain, and ends the run `partial` at `max-iterations`. A count that has not fallen by the fifth cycle is reported as
   a convergence warning.

## Exit

`final-status` (`enum`: `pass`, `partial`, `fail`) records two consecutive clean validations, findings remaining at the
ceiling or left to a person, or a checker or fixer that could not run. The run also leaves `iterations-completed`
(`number`), the final report (`file`), and `lifecycle-status` (`enum`: `verified`, `pending`, `not-applicable`) for
delegated checks. Edited files are left uncommitted for review.

## Example Usage

```text
Run specs-quality-gate over the folders billing/api and billing/web, counting through MEDIUM.
```

## Related Workflows

- [Gherkin Implementation Review](gherkin-implementation-review.md) checks that the code honours these scenarios.
- [Docs Propagation](../maintenance/docs-propagation.md) keeps the documents that cite these specifications true to
  them.

## Why Listed Folders Only

A gate that discovers its own scope reports a different count each time the tree grows, so its progress measure resets
and its result cannot be compared with the last run. Naming the folders freezes the input, as
[Bounded Convergence](../../development/workflow/bounded-convergence.md) requires, and makes cross-folder consistency a
deliberate choice. This workflow implements [Explicit Over Implicit](../../principles/explicit-over-implicit.md) and
[Simplicity Over Complexity](../../principles/simplicity-over-complexity.md).
