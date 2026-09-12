---
name: ci-quality-gate
description: >-
  Validates every project's pipeline definitions and gate wiring against the adopted pipeline standards, and repairs
  non-compliance in bounded check-fix cycles until two consecutive validations find nothing at the chosen threshold.
when_to_use: >-
  Use after adding a project or changing pipeline infrastructure, before a major release, or as a periodic compliance
  check of a repository's hooks and hosted pipeline.
---

# CI Quality Gate

## Entry

The repository has pipeline definitions or local gate hooks to validate, and a checker and a fixer that know the adopted
pipeline standards: [Automated Quality Gates](../../development/quality/checks/automated-quality-gates.md),
[CI Post-Push Verification](../../development/workflow/ci-post-push-verification.md),
[CI Storage Budget](../../development/quality/delivery/ci-storage-budget.md), and
[CI Workflow File Naming](../../conventions/structure/ci-workflow-file-naming.md) where its platform applies.

- `scope` (`string`, optional, default `all`): every project, or one named project.
- `mode` (optional `enum`, default `strict`): the lowest criticality counted. `lax` counts only `CRITICAL`, `normal`
  adds `HIGH`, `strict` adds `MEDIUM`, and `all` counts every level, per
  [Criticality Levels](../../development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md).
- `max-iterations` (`number`, optional, default `7`): the ceiling on check-fix cycles.

## Sequence

1. **Separate delegated checks.** List the exact predicates a hook or the hosted pipeline already owns, with their
   evidence for the current revision. The checker and fixer audit how those checks are declared and wired, never rerun
   or imitate them. When that evidence is missing or stale, the check stays `pending`, and this gate does not run it
   locally to fill the gap.
2. **Validate.** The checker audits `scope` against the adopted standards and writes a report of findings, each rated
   for criticality. A checker that cannot finish ends the run `fail`.
3. **Count at the threshold.** Count the findings `mode` admits. Zero counts as one clean validation and goes to step 5;
   a nonzero count resets the clean count to zero and goes to step 4.
4. **Fix.** The fixer repairs findings from the latest report, re-confirming each before editing. Evidence for a
   delegated check whose scope intersects an edited file becomes `pending`. A fixer that errors on one finding logs it
   and continues; a fixer that cannot start ends the run `fail`.
5. **Re-validate.** Run the checker again and count at the threshold. Two consecutive clean validations end the run
   `pass`. A single clean one repeats this step without fixing. A nonzero count returns to step 4 while cycles remain,
   and ends the run `partial` at `max-iterations`.

A count that has not fallen by the fifth cycle is recorded as a convergence warning and reported, because it usually
means a non-deterministic check or a scope that grows while it is being fixed.

## Exit

`final-status` (`enum`: `pass`, `partial`, `fail`) records two consecutive clean validations, findings remaining at the
ceiling, or a checker or fixer that could not run. The run also leaves `iterations-completed` (`number`), the final
report (`file`), and `lifecycle-status` (`enum`: `verified`, `pending`, `not-applicable`) for the delegated checks, kept
separate from `final-status` so a pending pipeline result never reads as a pass.

## Example Usage

```text
Run ci-quality-gate with scope all and mode strict after adding the billing service.
```

## Related Workflows

- [PR Review](pr-review.md) reads a whole change; this gate checks pipeline conformance only.
- [Plan Quality Gate](../plan/plan-quality-gate.md) is the bounded gate for plans rather than pipelines.

## Why Two Clean Validations

One clean validation after a fix can reflect a checker that skipped what the fix touched. A second run over the same
scope, with nothing fixed in between, shows the result is stable. The iteration ceiling and the recorded progress
measure keep the loop bounded, per [Bounded Convergence](../../development/workflow/bounded-convergence.md), and each
run returns one result per
[Quality Gate Results](../../development/quality/manual-verification/001-quality-gate-results.md).

This workflow implements [Automation Over Manual](../../principles/automation-over-manual.md),
[Explicit Over Implicit](../../principles/explicit-over-implicit.md), and
[Simplicity Over Complexity](../../principles/simplicity-over-complexity.md).
