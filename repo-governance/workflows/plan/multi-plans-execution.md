---
name: multi-plans-execution
description: >-
  Runs several gate-passed plans in one scheduled pass: a dependency graph, bounded parallelism with a resource-conflict
  guard, quarantine of failing plans, and cross-plan knowledge capture.
when_to_use: >-
  Use when two or more gate-passed plans should run together in one scheduled pass instead of one after another.
---

# Multi-Plans Execution

## Entry

Two or more plans are named, each with a current, permitting quality-gate verdict from an explicitly directed run.

- `plans` (`string`, required): plan identifiers, or a lifecycle selector (`all-in-progress`, `all-backlog`, `all`) with
  optional exclusions.
- `parallelism` (`number`, optional, default the adopter's recorded ceiling): the most nodes in flight across plans.
- `mode` (`enum`: `execute`, `schedule-only`; optional, default `execute`).

## Sequence

1. **Resolve and freeze the scope.** Resolve the selector once, echo the set, and never re-expand it mid-run. An
   exclusion matching no member is an error.
2. **Refuse unvetted plans before any side effect.** A member without a current permitting verdict stops the whole run;
   never run a subset around it. Then move queued members into `plans/in-progress/`.
3. **Parse each checklist into nodes.** Every action checkbox is one node carrying its plan, phase, executor label, and
   resource set. Within a plan, nodes stay sequential unless the plan marks steps independent.
4. **Compute resource sets conservatively:** the paths, projects, repositories, and checkout each node touches. An
   uncertain footprint takes the plan's whole declared impact, so doubt serializes rather than races.
5. **Add edges between plans.** A declared dependency orders whole plans, and inference never overrides it. Otherwise
   overlapping resource sets serialize and disjoint ones may run in parallel. A declared cycle stops the run as a
   planning error. An ordering assumption still unresolved goes to a
   [decision gate](../../development/agents/planning-capabilities/003-decision-gates.md) before the schedule is written.
6. **Write the schedule report:** nodes, edges, resource sets, and which nodes run in parallel and why. Under
   `schedule-only`, stop here.
7. **Run the ready queue.** A node is ready when its predecessors are complete, it is `[AI]`, and no in-flight node
   shares its resources. Fill up to the least of `parallelism`, the concurrency cap, and the harness limit, longest
   remaining chain first, ties by plan identifier. A `[HUMAN]` node parks only its own plan. Each node runs as a step of
   its plan's [Execution](plan-execution.md), gates and delivery included. After every completion, failure, or handover,
   recompute the ready set and report progress per plan.
8. **Quarantine a failing plan.** A node that still fails after its cause was pursued quarantines its plan and every
   plan depending on it. Independent plans keep running, and no gate is bypassed.
9. **Close each plan** as Execution does, its own knowledge capture included.
10. **Consolidate cross-plan learnings.** Read every executed plan's `learnings.md`, quarantined ones included, with the
    schedule report. A theme shared by two or more plans, or about the run itself, reaches one durable owner or is
    discarded with a reason, per
    [Knowledge Capture and Archival](../../conventions/structure/plans/008-knowledge-capture-and-archival.md). A
    single-plan theme was already routed and is not filed twice.

## Exit

Success: every plan is `done` or `handed-over` and every cross-plan theme is routed. Outputs are a status per plan
(`enum`: `done`, `handed-over`, `quarantined`, `partial`) and a schedule report and summary report (`file`, in the
scratch location per [Temporary Files](../../conventions/structure/temporary-files.md)). The summary records statuses,
parallelism reached, quarantines with reasons, pre-existing failures fixed, and theme routing.

Partial outcome: at least one plan was quarantined or stopped; the summary names each with its reason. The run fails
when no schedule can be built: a declared cycle, a missing plan, or an unvetted member.

## Example Usage

```text
Run multi-plans-execution with plans "add-export rename-billing" and parallelism 2.
Run multi-plans-execution with plans "all-in-progress" except "legacy-cleanup", mode schedule-only.
```

## Related Workflows

- [Execution](plan-execution.md) runs every node and owns each plan's rules.
- [Quality Gate](plan-quality-gate.md) produces the verdicts step 2 requires.
- [Execution Check](plan-execution-check.md) judges each plan before it is archived.

## Adopter Decision: The Parallelism Ceiling

Record one default for `parallelism`. A low ceiling keeps review load, machine capacity, and spend predictable; a high
one finishes wide schedules sooner and raises conflict and review pressure. A caller may override it for a run, raising
it only when independent work, capacity, and budget allow.

## Scheduling Changes When, Never Whether

Each plan keeps every rule of its own execution; the schedule decides only order and overlap, and where the two
workflows seem to conflict, the per-plan rule governs. The run is bounded by its frozen node set. This workflow
implements [Explicit Over Implicit](../../principles/explicit-over-implicit.md) and
[Simplicity Over Complexity](../../principles/simplicity-over-complexity.md).
