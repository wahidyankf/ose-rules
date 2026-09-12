---
name: ux-review-fix-planning
description: >-
  Runs exploratory, usability, and design-fidelity passes one after another on a live surface, keeps each finding
  attributed to its pass, and turns the findings into a gated fix plan without editing source.
when_to_use: >-
  Use when a running user-facing surface needs a correctness, first-use, and design-fidelity read delivered as one fix
  plan, or when an earlier findings plan needs refreshing.
---

# UX Review Fix Planning

## Entry

The working tree is clean, and the user-facing surface is running and reachable.

- `origin` (`string`, required): the address the surface is served from.
- `routes` (`string`, required): the routes or screens every pass reviews.
- `goal` (`string`, required): the charter each pass reads through its own lens.
- `viewports` (`string`, optional, default every supported viewport class).
- `locales` (`string`, optional, default every supported locale, not the default alone).
- `design-source` (`string`, optional, default none): an approved external design for the third pass.
- `plan-mode` (`enum`: `new`, `merge`, optional, default `new`): whether the run authors a plan or extends one.
- `plan-identifier` (`string`, optional, default derived from `goal`): the new plan's folder name.
- `merge-target` (`directory`, required under `merge`): the findings plan to extend.

## Sequence

1. **Pre-flight.** Confirm the clean tree, a working real-browser integration, every route answering at `origin`, and
   under `merge` an existing `merge-target`; any failure ends the run `fail`.
2. **Checkpoint: settle the scope** only when the answer changes the run, such as ambiguous addresses or an unstated
   `plan-mode`, per [Decision Gates](../../development/agents/planning-capabilities/003-decision-gates.md); otherwise
   state the default taken. A rejection ends the run `rejected`.
3. **Compile the carry-forward lists** of earlier defect classes and changed surfaces, per
   [Usability Probes and Completeness](../../development/quality/manual-verification/008-usability-probes-and-completeness.md),
   for every pass to cover.
4. **Open the report** that [Findings and the Plan](ux-review-fix-planning/002-findings-and-the-plan.md) shapes, so a
   stopped run keeps what it found.
5. **Run the first two passes.** Run [Exploratory and Usability Review](exploratory-usability-review.md) with `origin`,
   `routes`, and `viewports`, folding `goal`, `locales`, and the carry-forward lists into its declared tasks so the
   spec-blind lens receives nothing that workflow withholds. Each lens fills its own section; a pass that cannot run is
   recorded as a missing perspective, and the run continues.
6. **Run the design-fidelity pass** once step 5 is recorded, per
   [Design-Fidelity Pass](ux-review-fix-planning/001-design-fidelity-pass.md), handling a failure as step 5 does.
7. **Cross-reference root causes**, and under `merge` re-verify prior findings, per module 002.
8. **Critique completeness** with the completeness critic of
   [Usability Probes and Completeness](../../development/quality/manual-verification/008-usability-probes-and-completeness.md).
   Re-run each owning pass at most once, against its frozen gaps and no new task, per
   [the exploratory and usability standard](../../development/quality/manual-verification/003-exploratory-and-usability.md)
   and [Bounded Convergence](../../development/workflow/bounded-convergence.md); record any gap still open with its
   reason.
9. **Author the plan.** Run [Planning](../plan/plan-planning.md) for `plans/backlog/<plan-identifier>/` or
   `merge-target`, briefed with the report and module 002's content. Its [Quality Gate](../plan/plan-quality-gate.md)
   verdict is never re-run; residual findings go to the person before hand-back.
10. **Hand back.** Record only the plan's paths through the repository's delivery mode, and report `plan-path`, counts
    per pass, and `final-status`. The plan is a snapshot of the surface as tested; a material change before execution
    calls for a fresh run under `merge`.

## Exit

`final-status` (`enum`: `pass`, `partial`, `fail`, `rejected`) is `pass` when all three passes ran and the gate returned
`PASS` or `PASS_WITH_FINDINGS`; `partial` when a pass could not run or the gate returned `FAIL`; `fail` at pre-flight;
and `rejected` at the checkpoint, the last two leaving no plan.

Otherwise the run leaves `plan-path` (`directory`, at `plans/backlog/<plan-identifier>/` or `merge-target`), the report
(`file`, at `<reports-dir>/ux-review-fix-planning-<yyyy-mm-dd-hh-mm>-<uuid>-report.md`), and `exploratory-count`,
`usability-count`, and `design-count` (`number`).

## Example Usage

```text
Run ux-review-fix-planning with origin <preview-address>, routes "/pricing, /checkout", and goal "a first-time buyer compares plans and pays".
```

## Related Workflows

- [Exploratory and Usability Review](exploratory-usability-review.md) runs the first two passes.
- [Planning](../plan/plan-planning.md) and its [Quality Gate](../plan/plan-quality-gate.md) author and gate the plan.
- [Execution](../plan/plan-execution.md) applies the fixes after review.

## Modules

1. [Design-Fidelity Pass](ux-review-fix-planning/001-design-fidelity-pass.md)
2. [Findings and the Plan](ux-review-fix-planning/002-findings-and-the-plan.md)

## The Plan Is the Deliverable

The run writes only its report and the plan, never source or the live surface, so a person reviews one attributed
proposal first. An executing plan's near-end retest under
[User-Facing Delivery Hardening](../../development/quality/user-interfaces/user-facing-delivery-hardening.md) is a
separate round.

## Why One Pass at a Time

Each pass is recorded before the next starts, so no two passes write the report at once, and the design pass comes last
so its designs never reach the spec-blind lens. This workflow implements
[Deliberate Problem-Solving](../../principles/deliberate-problem-solving.md), since three independent readings are
reconciled before a fix is chosen, and [Explicit Over Implicit](../../principles/explicit-over-implicit.md), since each
finding names its pass.
