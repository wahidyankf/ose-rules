---
name: plan-execution
description: >-
  Works through a plan's delivery checklist, recording the result of each item as it resolves.
when_to_use: >-
  Use when a plan's checklist is ready, with or without a quality-gate verdict.
---

# Execution

## Entry

A plan in `plans/in-progress/` with its checklist ready. A quality-gate verdict in its `delivery.md`, when present, is
advisory history: a `FAIL` or `BLOCKED` verdict's open blocking rows keep the owners the gate gave them.

Execution starts with or without a verdict and never runs the gate itself. A missing verdict is recorded as
`plan-quality-gate: not run (manual-only)`, never a stop. For a bug-fix plan, an adopted Upstream Tool Defects standard
remains available direction when explicitly invoked. A queued plan is moved into `plans/in-progress/` first, never
copied. Input: `plan` (`directory`, required).

## Sequence

1. **Read the plan before the checklist.** `delivery.md` is executable, not self-explanatory; the other five documents
   hold why each item exists.
2. **Confirm the execution checkout:** which working copy, branch or worktree, and delivery mode. A wrong checkout
   noticed late is expensive. Enter it, synced per [Integration Path](../../development/workflow/integration-path.md),
   before any change; every delivery unit reuses the plan's one worktree when its route uses one.
3. **Mirror the checklist, disk first.** On every start or resume, rebuild tasks from `delivery.md`: one per unchecked
   action checkbox, in dependency order, and none without one. Untick and rerun an item whose change is missing. Keep
   dormant recoveries inactive until triggered. See [Task Tracking](../../development/agents/task-tracking.md) and
   [Dependency Graph and Recovery](../../conventions/structure/plans/014-dependency-graph-and-recovery.md).
4. **Work ready items concurrently.** Dispatch ready items up to the concurrency cap, following dependencies and reusing
   one worktree per repository; a failure blocks only downstream work. Record external blockers and what would unblock
   them. Prepare `[HUMAN]` items as far as possible, then hand them over without performing or ticking. Revise
   `delivery.md` before changing order, preserving criteria and outcome; a material change re-passes the quality gate.
5. **Resolve each item atomically.** Tick the checkbox, record the result, and move on, in that order, as one step; a
   batch of ticks at session end cannot say which item produced which result. Tick only once the item's outcome and its
   proof both hold.
6. **Record results, not only ticks:** what was produced, what changed, what surprised. A tick says an action happened,
   not what it found. See
   [Verification Routing](../../development/agents/planning-capabilities/006-verification-routing.md).
7. **Pass each phase gate before the next phase.** Per
   [Phase Boundaries and Delivery Choices](../../conventions/structure/plans/011-phase-boundaries-and-delivery-choices.md),
   run each gate check as written against the phase's combined state, and repair a failure inside the phase before its
   delivery or the next phase starts.
8. **Land each delivery unit** by the Integration Path. It is complete when
   [landed](../../conventions/structure/plans/009-portability.md#what-landed-means), with its gates re-run on refreshed
   state. Independent units may land in any order, per
   [Delivery Seams and Ownership](../../development/agents/planning-capabilities/005-delivery-seams-and-ownership.md).
9. **Fix every failure**, including pre-existing ones. Pre-existing explains; it never exempts.
10. **Route discoveries** to `learnings.md` or a bug-fix plan's Learnings section as they arise. Add a task only when it
    serves a planned outcome.
11. **Run [Execution Check](plan-execution-check.md)** once substantive items are terminal. Its verdict permits
    archival; post-delivery cleanup may remain pending.
12. **Archive and finish delivery.** Give each dormant recovery a dated, evidenced `Not triggered` disposition, then
    archive and land the final delivery per
    [Knowledge Capture and Archival](../../conventions/structure/plans/008-knowledge-capture-and-archival.md), keeping
    the worktree and local and remote task branches until it lands. Then run
    [Dev Artifact Clean-Up](../maintenance/dev-artifact-clean-up.md) and record proof outside `plans/done/` in the final
    delivery record (archival PR body for a PR route). Keep the task open until cleanup is verified and recorded, as
    [Dependency Graph and Recovery](../../conventions/structure/plans/014-dependency-graph-and-recovery.md) requires.

## Exit

Every substantive item is terminal, `learnings.md` is resolved, and Execution Check has recorded archive readiness. Only
that check permits archival. The quality gate runs before execution and after a material change, not at completion or
resume. Post-delivery cleanup may remain pending in `plans/done/`, but task completion awaits its proof under
[Dependency Graph and Recovery](../../conventions/structure/plans/014-dependency-graph-and-recovery.md). A partial
outcome leaves only recorded blockers and what would unblock each; the plan stays in `plans/in-progress/` and the check
waits. A failed run keeps its worktree and records why.

## Pause Safety

Execution may pause anytime. Record the current checkout, last terminal gate, next unresolved item, and any partly
consumed budget so work resumes without resetting it.
