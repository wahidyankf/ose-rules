---
name: multi-plans-execution
description: >-
  Schedules several plans into one pass: a dependency graph, worktree-lock- and HIPPO-bounded overlap, failing-plan
  quarantine, and cross-plan knowledge capture.
when_to_use: >-
  Use when two or more plans should run together in one scheduled pass.
---

# Multi-Plans Execution

## Entry

Two or more plans are named. A verdict is optional; a missing one is recorded as
`plan-quality-gate: not run (manual-only)`, never a stop.

- `plans` (`string`, required): plan identifiers, or a lifecycle selector (`all-in-progress`, `all-backlog`, `all`) with
  optional exclusions.
- `max-worktrees-per-plan-repo` (default `1`), `max-active-worktrees` (default `1`): caps binding the whole run, exactly
  as in [Execution](plan-execution.md); only the caller raises one.
- `run-issue` (`number`, optional): a per-run Issue mirroring the ledger; without one, open it first and record its
  number as the claim.
- `mode` (`enum`: `execute`, `schedule-only`; optional, default `execute`).

## Sequence

1. **Resolve and freeze the scope.** Resolve the selector once, echo the set, never re-expand. A memberless exclusion is
   an error.
2. **Record each member's verdict state, then promote.** Verdicts are advisory history: `FAIL`, `BLOCKED`, and missing
   verdicts stop nothing. Promote each `backlog/` member as [Execution](plan-execution.md) promotes one: delivery per
   plan to `origin/main` before Phase 0, verified before scheduling; promotions serialize, never merge stale. **Proceed
   only on the caller's confirmation** of the frozen set, nodes, and edges. A mid-run DAG change via reviewed merged PR
   is authoritative — reconfirm the delta and adapt.
3. **Parse each checklist into nodes:** one per action checkbox with plan, phase, executor label, resource set. A plan's
   nodes stay sequential unless it marks steps independent.
4. **Compute resource sets conservatively:** the paths, projects, repositories, and checkout each node touches. An
   uncertain footprint takes the plan's whole declared impact; doubt serializes.
5. **Add edges between plans.** Declared dependencies order whole plans; inference never overrides. Declare them as
   [Plan-Order Graph](../../conventions/structure/plans/020-plan-order-graph.md) defines; otherwise overlapping sets
   serialize, disjoint ones overlap. A declared cycle stops the run as a planning error; an unresolved assumption goes
   to a [decision gate](../../development/agents/planning-capabilities/003-decision-gates.md) before scheduling.
6. **Write the schedule report** — nodes, edges, sets, which nodes overlap and why; under `schedule-only`, stop here.
7. **Run the ready queue.** A node is ready when its predecessors are complete, it is `[AI]`, and no in-flight node
   shares its resources. Start a worktree node only within the caps and after proving from lease, branches, and open PRs
   that no other run holds the plan; one `in_progress` per worktree. Every compute node runs through one outer HIPPO
   guard; a deferred node queues and retries — never bypassed, never abandoned. Longest remaining chain first, ties by
   plan identifier. A `[HUMAN]` node parks only its plan. Each node runs as a step of its plan's
   [Execution](plan-execution.md); per-plan rules win conflicts. After each completion, failure, handover, recompute the
   ready set and report progress. Mirror every ledger line to the run Issue — claims, leases, overrides, quarantines,
   cleanup proofs.
8. **Quarantine a failing plan.** A node still failing after pursuit quarantines its plan and dependents; independent
   plans continue, no gate bypassed.
9. **Close each plan** as Execution does: knowledge capture and cleanup proof included.
10. **Consolidate cross-plan learnings.** Read every executed plan's `learnings.md` with the schedule report,
    quarantined ones included. A shared or run-level theme reaches one durable owner or is discarded with reason per
    [Knowledge Capture](../../conventions/structure/plans/008-knowledge-capture-and-archival.md); single-plan themes
    never route twice.

## Goal and Termination

**Goal**: land every member delivered through one caller-confirmed DAG, cleanup proven per plan, every theme routed or
discarded. `pass` is the only success: every member `done` or `handed-over` per [Execution](plan-execution.md)'s
terminal states, reports mirroring the run Issue.

## Status Cadence

Send [Execution](plan-execution.md#status-cadence)'s five-line heartbeat every **20 minutes** — cross-member progress,
steps left, blockers, decisions, next `[HUMAN]` timing — plus per-plan progress after each completion, failure, or
handover. Queued nodes report, never stop.

## Exit

Success: every plan `done` or `handed-over`, every theme routed. Outputs: per-plan status (`done`, `handed-over`,
`quarantined`, `partial`) plus schedule and summary reports (scratch location per
[Temporary Files](../../conventions/structure/temporary-files.md), mirrored to the run Issue). The summary records
statuses, caps and overrides, quarantines and reasons, pre-existing fixes, theme routing.

Partial outcome: the summary names each quarantined or stopped plan and reason. The run fails when no schedule can be
built: a declared cycle or a missing plan.

## Example Usage

```text
Run multi-plans-execution with plans "all-in-progress", max-active-worktrees 2.
```

## Adopter Decision: The Worktree Ceiling

Record both cap defaults (`1`). One keeps load, capacity, spend predictable; higher finishes sooner with more conflict.
Only the caller raises either. Beyond worktree locks, HIPPO admission alone bounds overlap.
