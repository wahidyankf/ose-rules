---
description: >-
  Allows one authorized push of a task-owned branch to skip a pre-push hook the compute guard stopped before any check
  started, when the hosted gate mirrors the hook and passes on the same head; plus a standing exception for
  HIPPO-congested hooks on pull-request branches with passing manual screens.
when_to_use: >-
  Use when a compute guard reports exit 124 with a never-started receipt for a pre-push hook and waiting for capacity
  would stall an otherwise ready task branch, or when HIPPO congestion blocks PR-branch hooks given passing manual
  screens.
---

# Capacity-Held Hook

[Back to Hook Verification](../hook-verification.md)

A hook held back by capacity has run nothing, so it holds no finding to fix. Retrying once the condition clears stays
the default. This module states the exceptions for guard-held hooks: the one-push exception and the standing
HIPPO-congestion exception below.

## The Exception

One push of a task-owned branch may skip its pre-push hook when every condition holds:

1. The compute guard stopped the hook before any check started: exit `124` with a `never-started` receipt naming a
   capacity or pressure reason. A hook that started, was shed mid-run, or reported any check result never qualifies.
2. A human authorized that one push by name. The authorization is spent by the push; an agent never authorizes its own
   bypass and never carries an earlier approval into this one.
3. The outbound safety screen passed for the range being pushed. The screen has no bypass; run it directly when the hook
   that normally carries it is the one held back.
4. The repository repeats the hook's deterministic checks in a hosted gate that a merge cannot skip, and the push opens
   or updates the pull request that runs it. A repository with no hosted mirror, or one whose delivery reaches its trunk
   without such a gate, never qualifies.

## After the Push

- Record in the task record: the receipt, the authorizing human, the safety-screen result, and the pull request.
- The branch does not merge until the hosted gate passes on the exact pushed head. A later push replaces that head and
  owes a fresh pass; nothing about this exception waives it.
- Suites the hosted pull-request gate does not run, such as integration or end-to-end suites placed after merge, stay
  owed where their own standards place them. This exception moves no suite.

## Standing HIPPO-Congestion Exception

The maintainer pre-authorizes `--no-verify` on `git commit` and `git push` for a task-owned branch that lands through a
pull request, with no per-instance prompt, when every condition below holds.

- The hook cannot run because the HIPPO guard deferred or failed it (exit `124` never-started, exit `125`, abnormal
  latency), not because a gate found a violation.
- The manual screens pass: the tracked-tree screen and the per-commit range screen both exit `0`, with no leak-review
  finding. The `commit-msg` hook stays enabled.
- Formatting is done by hand or editor; the hosted gate verifies it.
- The bypass cites the guard receipt and screen evidence in the push and PR notes, and never carries into a later
  operation.

Direct pushes to `main` stay outside this exception: explicit per-instance authorization still applies, strongly
discouraged except for manual override.

## What This Never Covers

- A hook that ran and failed, however unrelated the failure looks. Fix the cause or seek direction under the parent
  standard; a capacity receipt from an earlier attempt does not convert a failure into a deferral.
- Skipping a commit hook to land work locally where no hosted gate will ever see it.
- Weakening, muting, or removing any check, locally or hosted, to make room for this exception.

**Enforcement: unenforced by decision**, because task ownership, human authorization, and receipt authenticity are
judgements no mechanical check settles. Review verifies the recorded receipts against the hosted gate's result.
