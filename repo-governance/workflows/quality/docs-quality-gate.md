---
name: docs-quality-gate
description: >-
  Validates documentation for factual accuracy, structure, and link validity in parallel, and repairs findings in
  bounded sequential check-fix cycles until two consecutive validations find nothing at the chosen threshold.
when_to_use: >-
  Use after creating or restructuring documentation, after bulk documentation changes, before a release, or as a
  periodic documentation audit.
---

# Docs Quality Gate

## Entry

The documentation to validate exists, and the adopter has recorded its validator set (see the decision below).

- `scope` (`string`, optional, default `all`): every document, one directory, or one file.
- `mode` (optional `enum`, default `strict`): the lowest criticality counted. `lax` counts only `CRITICAL`, `normal`
  adds `HIGH`, `strict` adds `MEDIUM`, and `all` counts every level, per
  [Criticality Levels](../../development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md).
- `max-iterations` (`number`, optional, default `7`): the ceiling on check-fix cycles.

## Sequence

1. **Separate delegated checks.** Predicates a hook or pipeline already owns, such as mechanical link resolution, keep
   their own evidence; no validator reruns or imitates them, and missing evidence stays `pending`.
2. **Validate in parallel.** Each validator in the recorded set reads `scope` and writes its own report:
   - **factual accuracy**: commands, versions, interfaces, and claims checked against authoritative sources per
     [Factual Validation](../../conventions/writing/factual-validation.md), plus contradictions within and across
     documents;
   - **structure**: each document against its type, per [Tutorial Types](../../conventions/writing/tutorial-types.md)
     and [Tutorial Structure](../../conventions/writing/tutorial-structure.md), applying only universal checks to a
     document of another type;
   - **link validity**: internal targets per [Internal Links](../../conventions/writing/internal-links.md), and external
     addresses by response.

   A validator that cannot finish ends the run `fail`.

3. **Count at the threshold.** Sum the findings `mode` admits across every report. Below-threshold findings stay in the
   reports without being counted or fixed. Zero counts as one clean validation and goes to step 5; a nonzero count
   resets the clean count and goes to step 4.
4. **Fix in sequence.** Factual fixes come first and structural fixes second, so structure is repaired over corrected
   content and the two never edit the same passage at once. Each fixer re-confirms a finding before editing, and records
   a confirmed false positive with its reason so later cycles skip it. Link findings have no automatic fix: each is
   reported with file and line for a person to repair. A finding only a person can repair, or one the checker and fixer
   keep disputing, is recorded once for a person and leaves the count; a run with only such findings left ends
   `partial`. A fixer that errors on one finding logs it and continues; a fixer that cannot start ends the run `fail`.
5. **Re-validate.** Run the validators again. Two consecutive clean validations end the run `pass`, or `partial` when a
   finding was left to a person, and a single clean one repeats this step without fixing. A nonzero count returns to
   step 4 while cycles remain, and ends the run `partial` at `max-iterations`. A count that has not fallen by the fifth
   cycle is reported as a convergence warning.

## Exit

`final-status` (`enum`: `pass`, `partial`, `fail`) records two consecutive clean validations, findings remaining at the
ceiling or left to a person, or a validator that could not run. The run also leaves `iterations-completed` (`number`),
one final report per validator (`file-list`), and `lifecycle-status` (`enum`: `verified`, `pending`, `not-applicable`)
for delegated checks.

## Example Usage

```text
Run docs-quality-gate on docs/tutorials in strict mode.
```

## Related Workflows

- [CI Quality Gate](ci-quality-gate.md) runs the same bounded loop over pipeline conformance.
- [Specs Quality Gate](specs-quality-gate.md) runs it over behaviour specifications.

## Adopter Decision: Validator Set

| Option                                                                                         | Trade-off                                                                                     |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| factual accuracy, structure, and links                                                         | full coverage; a repository with learning material needs the structure validator              |
| one combined validator, run in order, extended with the repository's metadata and naming rules | one ordered pass that also checks metadata and naming; slower than validators run in parallel |

Record the option. Under the combined validator, step 2 runs its three checks in one ordered pass rather than in
parallel, and step 4 runs one fixer over every finding, metadata, naming, and link format included, while an
unresolvable link target also goes to a person.

## Why Factual Fixes Come First

Restructuring a wrong passage spends effort on text that will change, and a structural fixer that meets an error it
cannot judge either preserves it or guesses. Ordering the fixers keeps each cycle's edits independent, and the cycle
ceiling keeps it bounded, per [Bounded Convergence](../../development/workflow/bounded-convergence.md). This workflow
implements [Evidence Over Assertion](../../principles/evidence-over-assertion.md) and
[Automation Over Manual](../../principles/automation-over-manual.md).
