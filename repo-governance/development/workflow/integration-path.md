---
description: >-
  Records whether work reaches the trunk through short-lived branches and pull requests or directly, and fixes branch
  lifespan, rebase sync, one reused worktree per task, post-merge reconcile, and cleanup.
when_to_use: >-
  Use before creating a branch or worktree, when syncing a task branch, or when deciding whether a change goes through a
  pull request or straight to the trunk.
---

# Integration Path

The trunk is the only branch that persists. Work reaches it often and in small pieces, and every other branch exists for
one task and is gone within days. This is trunk-based development, and a repository adopts one of its two routes.

This standard implements [Simplicity Over Complexity](../../principles/simplicity-over-complexity.md) and
[Explicit Over Implicit](../../principles/explicit-over-implicit.md). It chooses a route and grants no permission; see
[Commit Authorization](commit-authorization.md).

## Adopter Decision: The Route

| Route                               | Work lands as                                                                         | Fits                                                               | Trade-off                                                                                                                |
| ----------------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| short-lived branch via pull request | a task branch in a worktree, merged under [Pull Request Merge](pull-request-merge.md) | a protected trunk, several contributors, gates that must run first | a review buffer and hosted gates, at the cost of branch and worktree overhead                                            |
| direct to trunk                     | commits on local `main`, pushed to the trunk                                          | a single owner, or no service able to protect the trunk            | the least ceremony and no buffer: local gates and [CI Post-Push Verification](ci-post-push-verification.md) carry it all |

The repository records its route, and nothing else selects one: not where the work runs, not the size of a change, not a
wish to skip review. Under the direct route no task branch, worktree, or pull request serves as a second path; a
temporary branch a tool creates for another purpose is removed when that purpose ends. A repository with no remote
follows the direct route locally.

Long-lived environment branches tracking what is deployed are not development branches: nothing is developed on them,
and changes flow only from the trunk to them.

## Branch Route Requirements

- **One task, one short-lived branch.** Merge it the day it is created where possible; two days is the ceiling, and past
  it rebase or abandon the branch.
- **Sync by rebase.** Before starting and before resuming, fetch and rebase onto the latest trunk. Never auto-stash,
  discard, or auto-resolve: an unclean tree or a conflict halts the work and goes to its owner. When the sync brings
  commits in, complete [Integration Diff Review](integration-diff-review.md).
- **Linear history.** Never merge the trunk into a task branch.
- **One worktree per task, reused.** A plan or task provisions at most one worktree and reuses it for every delivery
  unit it yields. Units land in turn: land one, sync, branch the next in the same directory. A second worktree for the
  same work is a defect. A new worktree is bootstrapped per [Checkout Bootstrap](checkout-bootstrap.md).
- **One pull request per delivery unit,** cut at a seam meeting
  [Delivery Seams and Ownership](../agents/planning-capabilities/005-delivery-seams-and-ownership.md), opened as a
  draft, described per [Pull Request Body](pull-request-body.md).
- **Reconcile local `main` after every merge.** A merge moves the remote trunk, not the checkout holding local `main`.
  Fast-forward it and prove it as [Bare Repository Landing](bare-repository-landing.md) describes.
- **Remove all three artifacts,** the worktree, the local branch, and the remote branch, once every unit that used the
  worktree has landed or been abandoned and nothing is unpushed or still running. Keep a worktree whose run failed, and
  say so, rather than deleting the evidence.
  [Dev Artifact Clean-Up](../../workflows/maintenance/dev-artifact-clean-up.md) proves it.

## Adopter Decision: Worktree Location

| Location                                       | Benefit                                                       | Cost                                                                                                        |
| ---------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| inside the repository, in an ignored directory | one place to look, and paths resolve from the repository root | a tool that walks upward for a version-control root can find the enclosing checkout and record its revision |
| beside the checkout, in a sibling directory    | no repository sits above the worktree, so upward walks stop   | worktree paths leave the repository root, and every machine needs that sibling directory                    |

A build tool that walks upward to find its version-control root settles the choice for the sibling location. Record the
location, and keep an inside one ignored so no worktree enters history.

## Why the Server Enforces It

A pull request can come from a checkout whose hooks never ran, so hosted gates repeat the local hook contracts.
Branch-route hosting rules enforce trunk protection and linear history for every actor, owners included.
