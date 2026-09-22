---
description: >-
  Routes local compute through one checksum-pinned admission guard with bounded recovery.
when_to_use: >-
  Use when adopting, wiring, or recovering a HIPPO-guarded command.
---

# Resource-Aware Development

HIPPO is an upstream, checksum-pinned wrapper that starts local compute only when shared capacity and pressure permit.
This standard governs consumers.

This standard implements [Explicit Over Implicit](../../principles/explicit-over-implicit.md),
[Root Cause Orientation](../../principles/root-cause-orientation.md),
[Reproducibility](../../principles/reproducibility.md), and [Fail Closed](../../principles/fail-closed.md).

## One Outer Guard

- Every local build, test, check, generator, service, or dependency install uses exactly one outer guard.
- Pin and verify its release checksum. Keep implementation, specifications, and releases upstream.
- Never bypass the guard in a repository that uses it.
- Never nest guards. Invoke an already-guarded script directly; otherwise its parent may hold the capacity it awaits.
- Run the guard's status and recovery commands unguarded to avoid admission deadlock.

## Outcomes

| Outcome           | Means                                              | Response                                                                                                                                                |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| exit `124`        | a limit stopped the work; the reason says which    | for storage, free space then proceed; for capacity or pressure, requeue only with a new schema-1 `never-started` receipt, otherwise recover the payload |
| exit `125`        | the guard could not do its job and started nothing | for a protocol mismatch, drain or upgrade every client sharing the root, never retry blindly; otherwise correct the configuration or the request        |
| exit `2`          | the invocation itself is wrong                     | read the diagnostic and fix the command                                                                                                                 |
| exit `126`, `127` | the command cannot be executed, or is not there    | fix the path or install it                                                                                                                              |
| exit `1`          | the work ran and the answer is empty               | a result, not a failure; decide on the empty answer                                                                                                     |

Two reasons can share one status, so read the namespaced reason on stderr and not the number alone. Child codes pass
through: without a new `never-started` receipt, a child's own `124` stays child-owned.

`hippo.lock` pins executable identity, not semantics. Before changing behavior, read the Hippo repository at the commit
in `hippo.lock`, then align rules, Gherkin, and checks with its documented capabilities. Never infer capability from
SemVer or copy a release number into governance.

Never resolve an outcome by bypassing HIPPO, changing class for priority, weakening a gate, raising allotted
concurrency, or deleting possibly live state. Corrupt state fails closed; follow upstream recovery.

## Workload Classes

| Class         | For                                             |
| ------------- | ----------------------------------------------- |
| restartable   | repeatable builds, tests, and reads             |
| service       | restartable long-running development            |
| transactional | indivisible mutations or tracked-output writers |

The class follows from what the work is, never from which class is admitted sooner.

Choose tiers independently: `light` for narrow static checks, `standard` for ordinary work, and `heavy` for full builds,
suites, and gates. Schema 3 keeps one FIFO waiter and launches at most once.

## Parallelism

Independent commands may enqueue together. Serialize only for dependencies, shared output, indivisible changes, or
proven races—not repository boundaries.

## Boundaries

- Dedicated hosted jobs stay unguarded because they have no local contention.
- Evidence holds capacity and process health, never arguments, paths, origins, credentials, contents, or user data.
- Raw evidence rolls for seven days; compacted daily summaries roll for 30 days under byte caps, so shared logging is
  bounded. `history` reads both without exposing command or path data.
- Track privacy-safe `hippo.identity.json`; contained worktrees keep its source and may add
  `--tag checkout=worktree --tag plan=<slug>`. Use the shared root; reserve `HIPPO_ROOT` for isolated tests. A worktree
  without ignored `hippo.local.json` uses its worktree-local wrapper and inherits the primary checkout's policy. Run
  `./hippo status`, `./hippo watch`, and `./hippo history` directly; on a protocol mismatch, status identifies the peers
  that must drain.
- Test admission and shedding with synthetic state and pressure only.

A hook held back by a deferral has not failed; see [Hook Verification](hook-verification.md).

## Enforcement

Tests confirm one guard and declared class per compute entry, required pinned capabilities, and no blind retry of a
protocol mismatch or of a receipt-less shed.
