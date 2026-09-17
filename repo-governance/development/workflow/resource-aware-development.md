---
description: >-
  Requires compute-bearing local commands to pass through exactly one checksum-pinned admission guard, resolving
  deferral, storage, and invalid-request outcomes at their cause and never by bypass, nesting, or retry loops.
when_to_use: >-
  Use in a repository that admits local builds, tests, services, and gates through a compute admission guard, when
  wiring such a command, or when the guard defers or refuses one.
---

# Resource-Aware Development

Scoped to adopters that run local compute through HIPPO: a checksum-pinned wrapper that starts a command only when
shared host capacity and current pressure allow, so independent work on one machine shares it instead of fighting over
it. HIPPO is an upstream tool. This standard governs how a repository consumes it.

This standard implements [Explicit Over Implicit](../../principles/explicit-over-implicit.md),
[Root Cause Orientation](../../principles/root-cause-orientation.md),
[Reproducibility](../../principles/reproducibility.md), and [Fail Closed](../../principles/fail-closed.md).

## One Outer Guard

- Every compute-bearing local command, whether a build, test, check, generator, service, or dependency install, runs
  through exactly one outer guard.
- The repository runs a release of the guard pinned by checksum and verified before use. Its implementation,
  specifications, and releases stay upstream: never vendor, copy, or fork them.
- Never bypass the guard in a repository that uses it.
- Never nest guards. A script or task that already carries its own guard is invoked directly. Wrapping it again makes
  the inner command wait for capacity its own parent holds, and the run stalls while every status looks normal.
- The guard's own status and recovery commands run unguarded. A guard that had to admit itself before reporting on
  admission would deadlock.

## Outcomes

| Outcome         | Means                                                     | Response                                                                                     |
| --------------- | --------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| exit `75`       | the receipt classifies a never-started or stopped payload | requeue only `never-started`; apply payload-specific recovery to any started or shed outcome |
| storage         | free space is insufficient                                | free storage safely, then retry                                                              |
| invalid request | the request cannot be satisfied as stated                 | correct the command's configuration or its requested capacity, then run it again             |

The guard signals each outcome in its own way; the signal belongs to the tool, not to this standard.

No outcome is resolved by bypassing the guard, picking another workload class to be admitted sooner, weakening a gate,
raising the concurrency the guard allotted, or deleting coordination state that may still be live. Unreadable or corrupt
shared state fails closed, and recovery follows the guard's own guidance.

## Workload Classes

| Class         | For                                                                                |
| ------------- | ---------------------------------------------------------------------------------- |
| restartable   | builds, tests, and reads that can be stopped and run again                         |
| service       | long-running development processes that can be restarted                           |
| transactional | authorized indivisible changes, such as installing tools or writing tracked output |

The class follows from what the work is, never from which class is admitted sooner.

Choose a resource tier independently: `light` for narrow static checks, `standard` for ordinary checks and writers, and
`heavy` for full builds, full suites, browser suites, and complete gates. Schema 3 keeps one FIFO waiter and launches
the payload at most once.

## Parallelism

Independent commands may seek admission at the same time; the guard decides what each receives. Serialize two commands
only for a real dependency, a shared or tracked output, an indivisible change, or a demonstrated race. Belonging to
different repositories or projects is not, alone, a reason to serialize.

## Boundaries

- Hosted pipeline jobs run unguarded. A dedicated, short-lived runner has no competing work, so the guard would add a
  path that cannot occur there.
- Guard records and evidence hold capacity and process-health measurements only, never command arguments, repository
  paths or origins, credentials, file contents, or user data.
- Each repository tracks a privacy-safe `hippo.identity.json`. A contained worktree keeps that source and may add
  `--tag checkout=worktree --tag plan=<slug>`. Every checkout uses the same default root; `HIPPO_ROOT` is for isolated
  tests only. If the worktree has no ignored `hippo.local.json`, its wrapper uses the primary checkout's copy. Operators
  run `./hippo status`, `./hippo watch --source <source>`, and `./hippo history --since 30d --source <source>` directly.
- Tests of guard behaviour, such as admission and stopping work under pressure, use synthetic state and simulated
  pressure, never real host pressure.

A hook held back by a deferral has not failed; see [Hook Verification](hook-verification.md).

## Enforcement

An adopter's own tests and plan checks confirm that each compute-bearing entry point carries exactly one guard and a
declared class.
