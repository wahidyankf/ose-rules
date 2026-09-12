---
description: >-
  Lands a change into a repository without a primary checkout, or from a side worktree, through the task's linked
  worktree, then fast-forwards local main by a command chosen from the repository's topology.
when_to_use: >-
  Use when a repository may be bare, when landing from a worktree other than the checkout holding main, or when local
  main may lag its remote after a landing.
---

# Bare Repository Landing

A push from a linked worktree moves the remote branch and that worktree's own branch, never a same-named local branch
stored elsewhere. After such a landing, local `main` is quietly behind: nothing fails or warns, and the next person to
read that checkout builds on a stale trunk.

This standard implements [Explicit Over Implicit](../../principles/explicit-over-implicit.md) and
[Root Cause Orientation](../../principles/root-cause-orientation.md): topology is checked rather than remembered, and
the landing closes the lag it creates.

## When It Applies

- The repository is bare, so every change passes through a linked worktree.
- A change lands from a side worktree rather than the checkout holding local `main`, even where a work tree exists.

Bareness belongs to a clone, not a repository: two clones can differ, so the check runs every time. On the direct route
of [Integration Path](integration-path.md), a bare clone's linked worktree is its only landing path, not a second one.

The names `origin` and `main` below stand for the repository's own remote and trunk.

## Verify Topology First

Before any mutating command, run `git worktree list` and look for the `(bare)` marker on the main entry; git documents
that output. A script may instead read `core.bare` from the common configuration file located by
`git rev-parse --git-common-dir`. That reading is inferred from documented behaviour, not a published interface, so
label it as inferred. A bare clone made the default way has no remote-tracking refs; set `remote.origin.fetch` to
`+refs/heads/*:refs/remotes/origin/*` before its first fetch.

Never ask `git rev-parse --is-bare-repository`. It answers `false` from inside a linked worktree even when the
repository is bare.

## The Landing Sequence

1. Verify topology.
2. Run `git fetch origin`, so later steps start from current remote-tracking refs.
3. Provision or reuse the task's linked worktree per [Integration Path](integration-path.md), synced to the fetched
   trunk tip.
4. Apply the change and commit it inside that worktree.
5. Run the repository's local gates there.
6. Land it through the route [Integration Path](integration-path.md) records: push the commits to the trunk, or push a
   branch and complete its pull request.
7. Where a branch landed, first delete its merged remote branch from this worktree, where push hooks can run, or later
   through the hosting interface, which skips no hook. Once its task ends, remove the worktree with a plain
   `git worktree remove`, never forced or by deleting the directory; see
   [No Destructive Git Operations](no-destructive-git-operations.md).
8. Reconcile local `main` whether or not anything looks wrong.

## Reconcile by Topology

| Topology        | Command                                                                     | Why this form                                                                                      |
| --------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| bare            | `git fetch origin main:main`                                                | needs no work tree, and fetch refuses a non-fast-forward update unless the refspec starts with `+` |
| has a work tree | `git fetch origin`, then `git merge --ff-only origin/main` where main lives | moves the ref, the index, and the files together, and refuses a non-fast-forward                   |

If any worktree, a kept one included, has `main` checked out, reconcile there by the work-tree form, never the refspec.
Where git permits it, the ref advances while that checkout's index and files stay on the old commit, and git then shows
the whole skipped range as a pending revert.

## Measure After Fetching

Prove the reconcile with `git rev-list --left-right --count origin/main...main` reading `0 0`. It compares two local
refs offline, so before a fetch it can read `0 0` for a checkout that is behind. Count only after a fetch or the
reconcile; an earlier count is not evidence.

## One Landing Path per Unit

A unit of work lands either through the worktree or through an already reconciled local `main`, never both. Applying the
same change twice creates a duplicate commit on a stale parent, and the histories diverge. A diverged `main` cannot be
fast-forwarded, so the reconcile fails and recovery becomes a manual judgement.

## Enforcement

No client hook runs after a push completes, so none can observe the reconcile. An adopter wanting mechanical enforcement
wraps its landing command in a script that runs the reconcile and the count, or lists both as checklist steps.
