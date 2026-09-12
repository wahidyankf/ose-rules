---
description: >-
  Indexes the workflow standards that govern how work is bounded, ordered, committed, integrated, deployed, and brought
  to a terminal state, and how a working environment and its toolchain are prepared.
when_to_use: >-
  Use when designing a repeated operation, when committing, integrating, or deploying a change, when preparing an
  environment or toolchain, or when a process has no obvious stopping point.
---

# Workflow Standards

Standards about the shape of work rather than its subject. Version-control, integration, environment, and toolchain
standards sit alongside them.

| Standard                                                          | Governs                                                                                                                  |
| ----------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| [Bare Repository Landing](bare-repository-landing.md)             | landing through the task's linked worktree, topology checks, and the fast-forward reconcile of local main                |
| [Bounded Convergence](bounded-convergence.md)                     | how a repeated operation is bounded and how it ends, and the defaults an iterative gate declares                         |
| [Checkout Bootstrap](checkout-bootstrap.md)                       | the declared per-checkout bootstrap before any commit, push, or task-runner command, and when it reruns                  |
| [CI Post-Push Verification](ci-post-push-verification.md)         | following every covering pipeline workflow to green after a push, and the gate for a repository with no remote           |
| [Commit Authorization](commit-authorization.md)                   | when staging, committing, and pushing are permitted, and why each grant is single-use                                    |
| [Commit Messages](commit-messages.md)                             | the Conventional Commits format and type list, and why types never decide commit boundaries                              |
| [Dependency Bump Policy](dependency-bump-policy.md)               | exact pins, the long-term-support, soak, and waiver paths, vulnerability clearance, and the written cutoff               |
| [Deployment Build Parity](deployment-build-parity.md)             | a hosting build that runs every declared build prerequisite, traced output includes, and one-commit changes              |
| [Deployment Promotion](deployment-promotion.md)                   | per-project pointer branches, who may move them, build gating, confirming the build, and domain cutover                  |
| [File-Touch Discipline](file-touch-discipline.md)                 | the touched-path ledger, carrying it through context loss, reconciling before staging, and foreign paths                 |
| [Git Author Identity](git-author-identity.md)                     | identity from user-level configuration only, no local overrides, and no agent-set identity                               |
| [Hook Verification](hook-verification.md)                         | hook bypass as a separate per-operation permission, fixing a failing hook at its cause, and bypass disclosure            |
| [Implementation Stages](implementation-stages.md)                 | work, then right, then fast only on measured need, with surgical edits and verifiable success criteria                   |
| [Integration Diff Review](integration-diff-review.md)             | reading and reconciling every incoming commit's diff before the next action                                              |
| [Integration Hygiene](integration-hygiene.md)                     | checks before committing, rebase-or-merge catch-up, and fixing or reverting a red trunk                                  |
| [Integration Path](integration-path.md)                           | the branch or direct route to the trunk, branch lifespan, one worktree per task, reconcile, and cleanup                  |
| [Native-First Toolchain](native-first-toolchain.md)               | pinned native toolchain managers, the idempotent health command, what repair may change, and when to revisit             |
| [No Destructive Git Operations](no-destructive-git-operations.md) | per-instance approval and additive equivalents for operations that destroy work or rewrite history                       |
| [Pull Request Body](pull-request-body.md)                         | what a body states, the trunk-state claim, and rewriting the body whenever the head moves                                |
| [Pull Request Merge](pull-request-merge.md)                       | the merge preconditions, the recorded landing method, the no-bypass rule, draft readiness, and who holds merge authority |
| [Remote Status Polling](remote-status-polling.md)                 | the spacing of status reads, no streaming watches, trigger discipline, and recovery from a rate limit                    |
| [Repository Rename Propagation](repository-rename-propagation.md) | the sweep that retires an old repository name everywhere, and verifying each path with a write                           |
| [Resource-Aware Development](resource-aware-development.md)       | one outer pinned admission guard per compute-bearing command, its outcomes, workload classes, and parallelism            |
| [Task Runner Target Standards](task-runner-target-standards.md)   | target prerequisites, caching only deterministic targets, inputs and outputs, names, aggregates, no placeholders         |
| [Thematic Commits](thematic-commits.md)                           | one complete purpose per commit, the boundary test, and splitting and ordering a change set                              |
| [Workspace Container Builds](workspace-container-builds.md)       | the root build context, per-application build files, hoisted dependencies, and internal-package resolution               |

## Directory Map

- [Bare Repository Landing](bare-repository-landing.md)
- [Bounded Convergence](bounded-convergence.md)
- [Bounded Convergence Modules](bounded-convergence/README.md) — the modules on loop register and ceiling scorecard
- [Checkout Bootstrap](checkout-bootstrap.md)
- [CI Post-Push Verification](ci-post-push-verification.md)
- [Commit Authorization](commit-authorization.md)
- [Commit Messages](commit-messages.md)
- [Dependency Bump Policy](dependency-bump-policy.md)
- [Deployment Build Parity](deployment-build-parity.md)
- [Deployment Promotion](deployment-promotion.md)
- [File-Touch Discipline](file-touch-discipline.md)
- [Git Author Identity](git-author-identity.md)
- [Hook Verification](hook-verification.md)
- [Implementation Stages](implementation-stages.md)
- [Integration Diff Review](integration-diff-review.md)
- [Integration Hygiene](integration-hygiene.md)
- [Integration Path](integration-path.md)
- [Native-First Toolchain](native-first-toolchain.md)
- [No Destructive Git Operations](no-destructive-git-operations.md)
- [Pull Request Body](pull-request-body.md)
- [Pull Request Merge](pull-request-merge.md)
- [Remote Status Polling](remote-status-polling.md)
- [Repository Rename Propagation](repository-rename-propagation.md)
- [Resource-Aware Development](resource-aware-development.md)
- [Task Runner Target Standards](task-runner-target-standards.md)
- [Thematic Commits](thematic-commits.md)
- [Workspace Container Builds](workspace-container-builds.md)
