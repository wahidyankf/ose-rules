---
name: plan-execution
description: >-
  Executes a plan's delivery checklist, recording results.
when_to_use: >-
  Use when a plan's checklist is ready, verdict or not.
---

# Execution

## Entry

A plan in `plans/in-progress/` with its checklist ready. A verdict is advisory history: `FAIL`/`BLOCKED` open rows keep
their owners. Execution never runs the gate; a missing verdict is recorded as
`plan-quality-gate: not run (manual-only)`, never a stop. For a bug-fix plan, an adopted Upstream Tool Defects standard
stays available on explicit invocation.

A queued plan reaches `plans/in-progress/` only by its own promotion: one pull request (or permitted direct commit)
carrying the pure move to `origin/main`, updating its
[Plan-Order Graph](../../conventions/structure/plans/020-plan-order-graph.md) node, before Phase 0. Worktree from that
fresh trunk; the promotion branch dies at merge, never the plan's worktree.

Inputs: `plan` (directory, required); `max-worktrees-per-plan-repo` (default `1`); `max-active-worktrees` (default `1`).
Only the caller raises a cap.

Mirror the run ledger from the scratch location per [Temporary Files](../../conventions/structure/temporary-files.md) to
one per-run Issue. Before worktree-backed work, prove from the lease, remote branches, and open PRs that no other run
holds the plan. A stale lease yields only to an explicit caller override naming the Issue.

Resolve declared dependencies under the [Plan-Order Graph](../../conventions/structure/plans/020-plan-order-graph.md):
each satisfied, else stop naming the unmet one; silence reads as none. On disagreement reconcile the diagram first;
mid-run change via reviewed merged PR is authoritative — adapt it.

## Sequence

1. **Read the plan before the checklist.** `delivery.md` is executable, not self-explanatory; the other five documents
   hold why.
2. **Confirm the execution checkout** — copy, branch or worktree, mode — and enter it synced per
   [Integration Path](../../development/workflow/integration-path.md); each delivery unit reuses the plan's one worktree
   when its route uses one.
3. **Mirror the checklist, disk first.** On every start or resume, rebuild tasks from `delivery.md`: one per unchecked
   action checkbox, in dependency order, none without one. Untick and rerun items whose change is missing; dormant
   recoveries stay inactive until triggered.
4. **Work ready items under the worktree lock.** Dispatch dependency-terminal items: one `in_progress` per worktree,
   every compute node through one outer guard per
   [Resource-Aware Development](../../development/workflow/resource-aware-development.md). A deferred guard queues —
   retry the same command, never bypass, never abandon. A failure blocks only downstream work. Record external blockers
   and their unblockers. Hand `[HUMAN]` items over unperformed, maximally prepared. Revise `delivery.md` before
   reordering; material changes re-pass the quality gate. Code-shipping items use batched cycles per
   [Phase Boundaries](../../conventions/structure/plans/011-phase-boundaries-and-delivery-choices.md).
5. **Resolve each item atomically.** Tick, record, move on — one step, in that order, only with outcome and proof both
   held; note what was produced, changed, surprised. No end-of-session batch ticks.
6. **Pass each phase gate before the next phase** per
   [Phase Boundaries](../../conventions/structure/plans/011-phase-boundaries-and-delivery-choices.md): run each check as
   written and repair inside the phase; fix every failure, pre-existing included.
7. **Land each delivery unit** by the Integration Path, complete when
   [landed](../../conventions/structure/plans/009-portability.md#what-landed-means), gates re-run on refreshed state.
   Independent units land in any order per
   [Delivery Seams](../../development/agents/planning-capabilities/005-delivery-seams-and-ownership.md).
8. **Route discoveries** to `learnings.md` (or a bug-fix plan's Learnings) as they arise; add a task only for a planned
   outcome.
9. **Run [Execution Check](plan-execution-check.md)** once substantive items are terminal; only its verdict permits
   archival. Cleanup may remain pending.
10. **Archive and finish delivery** per
    [Knowledge Capture](../../conventions/structure/plans/008-knowledge-capture-and-archival.md): disposition dormant
    recoveries as dated `Not triggered`; archive and land, retaining worktree and branches until landed. Run
    [Dev Artifact Clean-Up](../maintenance/dev-artifact-clean-up.md), recording proof outside `plans/done/` in the
    delivery record. The task stays open until cleanup is verified per
    [Dependency Recovery](../../conventions/structure/plans/014-dependency-graph-and-recovery.md).

## Goal and Termination

Exactly one end state; `pass` is the only success:

- **`pass`**: all items terminal, check permits archival, delivery landed and verified, plan in `plans/done/`, worktree
  and branches gone, learnings routed.
- **`handed-off`**: `[AI]` work ready, only a `[HUMAN]` merge or decision remains. No archive or cleanup; resume to
  `pass` after confirmation.
- **`partial`**: findings remain or work unexecuted. Plan stays in `plans/in-progress/` with its work location; only
  recorded blockers and unblockers.
- **`fail`**: a technical error blocks completion; plan and work location stay for diagnosis.

## Exit

Only the Execution Check permits archival and `pass`. Cleanup may pend in `plans/done/`; task completion awaits its
proof per [Dependency Recovery](../../conventions/structure/plans/014-dependency-graph-and-recovery.md).

## Status Cadence

Milestones carry ordinary progress. Independently send a user-visible five-line heartbeat every **20 minutes** —
weighted progress, steps left, blockers, decisions, next `[HUMAN]` timing — plus phase boundaries and terminal states.
Weights from `delivery.md`, else each action weighs `1`. A queued node is reported, never a stop.

## Pause Safety

Execution may pause anytime. Record checkout, last terminal gate, next item, and consumed budget so work resumes whole.
