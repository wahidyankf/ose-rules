---
name: harness-upstream-drift-review
description: >-
  Compares committed harness bindings with each harness's current upstream documentation through delegated research,
  then repairs or escalates the drift within a bounded loop.
when_to_use: >-
  Use on the adopter's review cadence, after a supported harness announces a release that changes configuration, or when
  adding a harness.
---

# Harness Upstream Drift Review

## Entry

The repository declares at least one supported harness, and its bindings have not been compared with upstream
documentation within the adopter's cadence or since that harness's last announced release.

- `harness` (`string`, optional): one declared harness to review. Default: every declared harness.
- `threshold` (`enum`: `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`; optional): the lowest criticality that blocks `pass`.
  Default: `MEDIUM`.
- `max-cycles` (`number`, optional): the repair ceiling. Default: `7`.

## Sequence

1. **Freeze the subject.** Record the revision and, per harness in scope, the committed files that bind it: adapters,
   harness configuration, and any reference record kept of that harness's conventions.
2. **Confirm internal parity first.** Run [Harness Parity Verification](harness-parity-verification.md). Each mismatch
   it reports enters step 4's report, rated like any finding, and is repaired first: drift against bindings that already
   disagree with their own source cannot be attributed to upstream.
3. **Research current upstream conventions.** One task per harness, in parallel because none reads another's result,
   handed over as [Web Research Delegation](../../development/agents/web-research-delegation.md) requires. Each returns
   file locations, metadata keys, model identifier format, permission schema, and breaking changes, citing each fact's
   authoritative source and retrieval date. Disagreeing sources come back as a conflict, not a choice.
4. **Record findings as they are established.** Compare the research with the reference record and committed bindings.
   Each difference is a finding with its local path, upstream citation, and a criticality from
   [Finding Criticality and Confidence](../../development/quality/evidence/finding-criticality-and-confidence.md),
   appended to a report written as [Temporary Files](../../conventions/structure/temporary-files.md) describes.
5. **Repair within the bound.** Before the first cycle, register the loop under
   [Bounded Convergence](../../development/workflow/bounded-convergence.md), with the frozen finding list, `max-cycles`,
   and open findings at or above `threshold` as the progress measure. Each cycle:
   - re-validates every open finding against the current files and rates its confidence;
   - repairs drift the evidence settles unambiguously, such as a renamed metadata key or moved file location, in the
     canonical artifact, generator mapping, or reference record, then regenerates the adapters;
   - hands to a person, with evidence, every source conflict, change to a permission's meaning, harness addition or
     removal, and generator logic change; and
   - compares again as in step 4.

   The loop succeeds after two consecutive comparisons with no open finding at or above `threshold`. A cycle that does
   not reduce a nonzero progress measure ends it.

6. **Decide at the ceiling.** When findings remain at `max-cycles` or progress stopped, choose between the repaired
   bindings and the last verified state as
   [Resolving at the Ceiling](../../development/workflow/bounded-convergence/002-ceiling-scorecard.md) directs, and
   record the choice.
7. **Record the verdict** in the report, with cycles completed and every finding handed to a person.

## Exit

A successful run leaves `verdict` (`enum`: `pass`, `partial`, `fail`) at `pass`: no open finding at or above `threshold`
on two consecutive comparisons. It also leaves `cycles` (`number`) and `report` (`file`, at
`<reports-dir>/harness-drift-<yyyy-mm-dd-hh-mm>-<uuid>-audit.md`). Findings below `threshold` stay reported without
blocking.

`partial` means findings remain at the ceiling or await a person, each listed with evidence. `fail` means parity
verification, research, or a repair could not run.

## Example Usage

```text
Run harness-upstream-drift-review for every declared harness with threshold HIGH.
```

## Related Workflows

- [Harness Parity Verification](harness-parity-verification.md) is nested in step 2.

## A Gate Cannot See Upstream

A repository check compares files the repository holds, so it cannot notice that a harness changed its configuration
format last week. Research can, but it is slow, networked, and needs a report a person can check, so it runs on a
cadence. A question answered by comparing two committed files belongs in a gate; one that needs a vendor's current
documentation belongs here.

## What an Adopter Decides

| Decision  | Options and trade-off                                                                                                                       |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| threshold | Low catches cosmetic drift and spends more cycles; high finishes sooner and lets small divergences accumulate.                              |
| cadence   | A schedule catches unannounced changes and runs when nothing changed; running on announced releases costs nothing idle and misses the rest. |

## Principles

This workflow implements [Evidence Over Assertion](../../principles/evidence-over-assertion.md), because every upstream
fact is cited and every repair re-validated, and [Automation Over Manual](../../principles/automation-over-manual.md),
because mechanical drift is repaired automatically while judgement about meaning stays with people.
