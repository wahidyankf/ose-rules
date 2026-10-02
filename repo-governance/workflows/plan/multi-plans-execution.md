---
name: multi-plans-execution
description: >-
  Schedules several gate-reviewed plans into one pass: a dependency graph, bounded conflict-guarded parallelism,
  failing-plan quarantine, and cross-plan knowledge capture.
when_to_use: >-
  Use when two or more gate-reviewed plans should run together in one scheduled pass.
---

# Multi-Plans Execution

## Entry

Two or more plans are named, each with a current verdict from an explicitly directed quality-gate run.

- `plans` (`string`, required): plan identifiers, or a lifecycle selector (`all-in-progress`, `all-backlog`, `all`) with
  optional exclusions.
- `parallelism` (`number`, optional, default the adopter's recorded ceiling): maximum nodes in flight across plans.
- `mode` (`enum`: `execute`, `schedule-only`; optional, default `execute`).

## Sequence

1. **Resolve and freeze the scope.** Resolve the selector once, echo the set, and never re-expand it. An exclusion
   matching no member is an error.
2. **Record each member's verdict before any side effect.** Verdicts are advisory: `FAIL` and `BLOCKED` stop nothing,
   but a member without one stops the whole run, never just a subset. Then move queued members into
   `plans/in-progress/`.
3. **Parse each checklist into nodes:** one per action checkbox, carrying its plan, phase, executor label, and resource
   set. A plan's nodes stay sequential unless it marks steps independent.
4. **Compute resource sets conservatively:** the paths, projects, repositories, and checkout each node touches. An
   uncertain footprint takes the plan's whole declared impact, so doubt serializes rather than races.
5. **Add edges between plans.** A declared dependency orders whole plans; inference never overrides it. Otherwise
   overlapping resource sets serialize; disjoint ones may run in parallel. A declared cycle stops the run as a planning
   error; an unresolved ordering assumption goes to a
   [decision gate](../../development/agents/planning-capabilities/003-decision-gates.md) before scheduling.
6. **Write the schedule report:** nodes, edges, resource sets, and which nodes run in parallel and why. Under
   `schedule-only`, stop here.
7. **Run the ready queue.** A node is ready when its predecessors are complete, it is `[AI]`, and no in-flight node
   shares its resources. Fill to the lowest of `parallelism`, the concurrency cap, and the harness limit, longest
   remaining chain first, ties by plan identifier. A `[HUMAN]` node parks only its plan. Each node runs as a step of its
   plan's [Execution](plan-execution.md), with its gates and delivery. After each completion, failure, or handover,
   recompute the ready set and report per-plan progress.
8. **Quarantine a failing plan.** A node still failing after its cause was pursued quarantines its plan and every
   dependent plan; independent plans continue, and no gate is bypassed.
9. **Close each plan** as Execution does, including its own knowledge capture.
10. **Consolidate cross-plan learnings.** Read every executed plan's `learnings.md`, quarantined ones included, with the
    schedule report. A theme shared across plans, or about the run itself, reaches one durable owner or is discarded
    with a reason, per [Knowledge Capture](../../conventions/structure/plans/008-knowledge-capture-and-archival.md).
    Single-plan themes are already routed; never route one twice.

## Exit

Success: every plan is `done` or `handed-over`, and every cross-plan theme is routed. Outputs: a status per plan
(`enum`: `done`, `handed-over`, `quarantined`, `partial`) plus schedule and summary reports (`file`, in the scratch
location per [Temporary Files](../../conventions/structure/temporary-files.md)). The summary records statuses,
parallelism reached, quarantines and reasons, pre-existing failures fixed, and theme routing.

Partial outcome: the summary names each quarantined or stopped plan with its reason. The run fails when no schedule can
be built: a declared cycle, a missing plan, or a member without a verdict.

## Example Usage

```text
Run multi-plans-execution with plans "all-in-progress", parallelism 2.
```

## Related Workflows

- [Execution](plan-execution.md) runs every node and owns each plan's rules.
- [Quality Gate](../quality/plan-quality-gate.md) produces step 2's verdicts.
- [Execution Check](plan-execution-check.md) judges each plan before archival.

## Adopter Decision: The Parallelism Ceiling

Record one `parallelism` default. A low ceiling keeps review load, capacity, and spend predictable; a high one finishes
sooner with more conflict and review pressure. A caller may override it per run, raising it only when independent work,
capacity, and budget allow.

## Scheduling Changes When, Never Whether

Each plan keeps every rule of its own execution; the schedule decides only order and overlap, and per-plan rules win any
apparent conflict. The frozen node set bounds the run. This workflow implements
[Explicit Over Implicit](../../principles/explicit-over-implicit.md) and
[Simplicity Over Complexity](../../principles/simplicity-over-complexity.md).
