---
name: pr-review-cycle
description: >-
  Repeats explicitly requested review passes over one change, answering every finding and requiring a green pipeline on
  the exact head between passes, until two adjacent clean passes converge or a hard ceiling ends the cycle blocked.
when_to_use: >-
  Use only when someone explicitly asks for iterative review with fixes on a pull request or a local commit range.
---

# PR Review Cycle

One [PR Review](pr-review.md) pass is evidence about one head and one question. This cycle repeats that pass, with a
fixer and a pipeline check between passes, and never restates how a pass runs.

## Entry

Someone explicitly asked for this cycle on an open subject, or a plan step records that request as its source. Risk,
size, changed paths, and delivery mode never invoke it, and no change is blocked for lacking one.

- `subject` (`string`, required): the pull request or commit range, on the surface chosen per
  [Review Surface](pr-review-cycle/001-review-surface.md).
- `ceiling` (`number`, optional, default `5`): the most passes, stale ones included. A higher value needs a durable
  record, authorized by a person before the extra passes run, naming the subject and the new ceiling.
- `blocking-level` (`enum`: `CRITICAL`, `HIGH`, `MEDIUM`, optional, default `MEDIUM`): the lowest criticality whose
  unresolved findings block, per
  [Finding Criticality and Confidence](../../development/quality/evidence/finding-criticality-and-confidence.md).

## Sequence

1. **Confirm the request and load history.** Record the explicit request, then read every earlier pass, answer, credit,
   and checkpoint verdict from the subject's durable records, admitting only records read back from the surface. Resume
   at the next pass number. Missing, malformed, or contradictory history ends the run `blocked`; it is never reset, and
   conversation memory never overrides it.
2. **Run passes, one at a time.** Repeat these sub-steps until two adjacent passes hold clean credit under different
   probe classes on the same live head, or `ceiling` passes have run.
   1. **Review.** Run [PR Review](pr-review.md) on the live head, with an unused probe class as `angle` and the settled
      findings as `prior-findings`. `failed` ends the run `blocked`; `stale` consumes the pass and earns no credit.
   2. **Answer every finding.** A fixer answers each finding with a fix, a reasoned reject, or a deferral carrying a
      filed and linked follow-up, and tags its cause, per
      [Answering Findings](pr-review-cycle/002-answering-findings.md).
   3. **Wait for the pipeline on the exact head.** The fixer's new head, or the unchanged reviewed head, passes the
      pipeline with evidence bound to that revision. A failure is diagnosed at its cause, never rerun until green. A
      head that moved meanwhile makes the pass stale.
   4. **Credit or withhold.** Record clean credit or its absence, per
      [Credit and Convergence](pr-review-cycle/003-credit-and-convergence.md), and read the record back.
   5. **Checkpoint after every third pass.** Record one verdict from the cause series: continue, change fix strategy, or
      block. `block` ends the run `blocked`.
3. **Decide the result.** Return `done` when the exit holds with no unresolved finding at or above `blocking-level`;
   otherwise return `blocked`, even with nothing outstanding.

## Exit

`final-status` (`enum`: `done`, `blocked`), with `passes-completed` (`number`), `unresolved-findings` (`number`) at or
above `blocking-level`, and `cycle-records` (`string`): where the pass, answer, credit, and checkpoint records live.

`blocked` is the partial outcome: committed fixes stand, records stay readable for a later run, and more passes need an
authorized extension, which never waives a finding. A failed step ends the run `blocked`, naming the step.

Cycle status is not merge readiness. Neither result approves or blocks a merge; that stays with the repository's own
gates, including [PR Leak Review](pr-leak-review.md) where adopted.

## Example Usage

```text
Run pr-review-cycle for pull request 412 with the default ceiling.
Run pr-review-cycle over main..feature-tip with blocking-level HIGH.
```

## Related Workflows

- [PR Review](pr-review.md) is the single pass each iteration runs.
- [PR Leak Review](pr-leak-review.md) owns the leak screen, which this cycle neither runs nor replaces.
- [CI Quality Gate](ci-quality-gate.md) repairs pipeline definitions; this cycle only reads a pipeline's result.

## Modules

1. [Review Surface](pr-review-cycle/001-review-surface.md)
2. [Answering Findings](pr-review-cycle/002-answering-findings.md)
3. [Credit and Convergence](pr-review-cycle/003-credit-and-convergence.md)

## Bounded, Then Converged

The ceiling bounds effort and the exit measures convergence, so neither stands in for the other: reaching the ceiling
never makes an unmet exit met, and a converged cycle never spends its remaining passes to reach a count. The bound
follows [Bounded Convergence](../../development/workflow/bounded-convergence.md).

This workflow implements [Evidence Over Assertion](../../principles/evidence-over-assertion.md),
[Root Cause Orientation](../../principles/root-cause-orientation.md), and
[Explicit Over Implicit](../../principles/explicit-over-implicit.md).
