---
description: >-
  Sets the preconditions every pull-request merge needs, namely exact-head gates, a current branch, closed
  conversations, surface gates, and no unapproved bypass, and records the landing method and merge authority as adopter
  decisions.
when_to_use: >-
  Use before merging a pull request, when a gate fails close to merge, or when deciding whether readiness or an earlier
  approval permits a merge.
---

# Pull Request Merge

A merge changes the trunk for everyone. Its safety can be checked mechanically, so it rests on preconditions evaluated
at the moment of merge, not on how finished the work feels.

This standard implements [Evidence Over Assertion](../../principles/evidence-over-assertion.md),
[Fail Closed](../../principles/fail-closed.md), and
[Root Cause Orientation](../../principles/root-cause-orientation.md).

## Preconditions

Every one holds at the moment of merge:

1. **Exact-head gates.** Each required check is green for the pull request's current head commit against its current
   base. A run for an earlier head or another base, or one superseded by a later push, is stale evidence and authorizes
   nothing; see [Quality Gate Results](../quality/manual-verification/001-quality-gate-results.md).
2. **A current branch.** The branch contains the latest target, brought forward as
   [Integration Hygiene](integration-hygiene.md) directs, and the hosting service reports no conflict. A conflict inside
   a generated file is resolved in the source the generator reads, then regenerated and checked for drift, never edited
   by hand.
3. **Closed conversations.** Every review conversation is resolved or dismissed by the user. Review itself may be
   optional; the conversations a review opens still bind.
4. **Surface gates.** Each gate the changed reachable behaviour requires, whether a running interface, an endpoint, or
   another boundary, has a passing terminal result. Where no reachable behaviour changed, the merge record says so.
5. **Outbound safety.** The exact head passed an outbound leak screen, which in a public repository is
   [Public Outbound Safety](../../conventions/security/public-outbound-safety.md). A suspected secret halts merge
   handling and follows [No Secrets in Tracked Files](../../conventions/security/no-secrets-in-tracked-files.md); no
   green check, closed conversation, or earlier clean screen permits merging it.

Preconditions are evaluated per merge. Meeting them for one pull request says nothing about the next. Before merging,
present each precondition's status and the evidence behind it.

The repository records its landing method. A rebase keeps the branch's [thematic commits](thematic-commits.md), a squash
collapses them, and a merge commit is unavailable where [Integration Path](integration-path.md) keeps history linear.

## No Bypass Without Named Permission

Never merge over a failing or pending required check, an unresolved conversation, or branch protection, and never use an
administrative override. A user may waive one named gate for one named merge. That waiver covers nothing else, reaches
no later merge, and never covers the outbound-safety screen.

When a gate fails, report which one and why, fix the cause, rerun it, and then evaluate every precondition again.

## Draft Until Done

Open each pull request as a draft and iterate while it stays one. Mark it ready once the work meets its done definition.
Readiness says the work is finished; it satisfies no precondition and authorizes no merge. Where marking it ready
triggers the checks again, the run that follows is the one that counts.

## Adopter Decision: Merge Authority

| Authority         | The merge happens                                                                    | Trade-off                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| preconditions     | an agent merges once all preconditions hold, unless a plan step names a human gate   | fast and consistent, but any gap in the gates becomes a gap in what merges, so test depth carries weight        |
| explicit approval | a person approves each merge after the preconditions hold, for that one pull request | a human backstop for what the gates miss, but merges wait, and approval can become a signature without evidence |

The repository records its choice. Either way the preconditions are the same and only the actor differs, and the commits
and pushes that built the branch remain under [Commit Authorization](commit-authorization.md).
