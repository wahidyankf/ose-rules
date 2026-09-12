---
name: 003-credit-and-convergence
description: >-
  Fixes when a review-cycle pass earns clean credit, why a stale pass earns none, the two-clean-pass exit, the
  checkpoint after every third pass, the ceiling, and where blocking status is read.
when_to_use: >-
  Use when deciding whether a review cycle continues, changes its fix strategy, ends done, or ends blocked.
---

# Credit and Convergence

## Clean Credit

A pass earns clean credit only when all of these hold:

1. [PR Review](../pr-review.md) returned `clean` for the pass's reviewed head.
2. No fixer commit followed the pass.
3. The pipeline passed on that exact head.
4. The live head still equals it when the credit is recorded.
5. No finding at or above the blocking level is unresolved.

The credit is written to the subject's durable records and read back before the next pass. An empty finding list is not
credit, and credit is never inferred afterwards from review prose, closed threads, or a check observed later.

## A Stale Pass Earns Nothing

A pass whose head moved before its post, its fixes, or its credit still consumes its number and counts against the
ceiling. It earns no credit and breaks any clean streak, and its findings return to the next pass on the fresh head.
Attaching a new revision to old results is forbidden, because credit must describe the commit the reviewers read.

## The Exit

The cycle ends `done` only when two adjacent passes both hold clean credit, under different probe classes, on the same
live head, with no unresolved finding at or above the blocking level.

Each pass's record names its probe class, such as a different failure mode, reader, or level of the change, so a new
probe is checkable rather than asserted. A pass that repeats the previous question converges on that question, not on
correctness. Two clean passes under two questions are the weakest evidence that the questions have run out: a stopping
rule, not a proof.

## The Checkpoint After Every Third Pass

A raw finding count adds defects in the change to defects the loop's own fixes created, so it cannot show convergence.
After every third pass, whoever runs the cycle reads two series from the cause tags: `original` findings per pass, and
the induced rate, meaning `class-escape` plus `fix-induced` findings over all findings. It records one verdict:

| Verdict             | When                                                              | Then                                                                                                                                                                         |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| continue            | original findings are falling, and the induced rate is not rising | later passes run, each under a changed probe                                                                                                                                 |
| change fix strategy | the induced rate is high                                          | later passes run after the fixer attacks the mechanism, often one fact kept in several places, reduced per [One Source per Fact](../../../principles/one-source-per-fact.md) |
| block               | original findings persist and are not falling                     | the run ends `blocked`                                                                                                                                                       |

When no row or several rows match, the verdict is the runner's recorded judgement.

A pass whose findings are all `fix-induced` says the change is clean and the fixing is the problem, which calls for a
different remedy than another pass. No verdict raises the ceiling.

## The Ceiling

The default ceiling is five passes. Reaching it without the exit is `blocked`, whether or not a finding is outstanding,
including when the last two passes were clean but one repeated an earlier probe class. More passes need a durable
record, authorized by a person, naming the subject and the new ceiling. An extension funds attempts; it never waives a
finding and never substitutes for resolving one.

## Review State Is Never the Gate

A review posted under the change author's own identity may be unable to request changes, and a pass never approves, so
every review reads alike whatever it found. A consumer that decides blocking from review state therefore reads a blocked
change as unblocked, silently. Blocking lives in each finding's criticality, stated in the finding text, and every
consumer reads it there.
