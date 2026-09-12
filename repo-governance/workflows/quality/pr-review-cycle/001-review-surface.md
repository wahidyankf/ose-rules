---
name: 001-review-surface
description: >-
  Records the adopter decision between a hosted pull request and a local commit range as the surface a review cycle runs
  on, and maps what each supplies onto the cycle's one sequence.
when_to_use: >-
  Use when adopting the review cycle, or when mapping its subject, pass record, answers, and pipeline onto a repository.
---

# Review Surface

The cycle's sequence speaks of a subject, its head, one record per pass, answers to findings, and a pipeline. Either
option below supplies all five, so the sequence reads the same under both. An adopter chooses one per repository and
records the choice where contributors find it.

## Adopter Decision: Review Surface

| Option              | Subject and head                             | Pass record and answers                                                                         | Pipeline                                                              | Trade-off                                                                                                                 |
| ------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Hosted pull request | an open pull request and its head revision   | the posted review; each answer replies on its finding's thread                                  | hosted checks reported for that exact head                            | threads that outlive the run and checks no contributor can quietly skip, at the cost of forge access and hosted wait time |
| Local commit range  | a base ref and a head ref pinned to a commit | one findings report file per pass, read back after writing, with each answer beside its finding | the repository's local gates run on that head, exit statuses recorded | needs no remote, but history lasts only as long as its files, and the gates prove only what ran on one machine            |

## Mapping a Pass Onto Each Option

Under a hosted pull request, [PR Review](../pr-review.md) runs as written. The cycle waits for hosted evidence on the
exact head instead of rerunning those checks locally in its place, and pending evidence is never read as green.

Under a local commit range, the pass pins the head ref to a commit, its one post becomes writing the findings report for
that commit, and its read-back becomes reading that file back. A head ref that moved from its pin makes the pass stale.
The credit and checkpoint records are files beside the reports, and together they are the durable history a resumed run
loads.

## Why the Choice Is the Adopter's

A repository without a remote or a hosted pipeline cannot supply threads or hosted checks, and a cycle that demanded
them would never run there. Both options keep what the loop depends on: one pinned head per pass, every finding
answered, a green gate on the exact head, and credit only on recorded evidence. Those guarantees attach to the sequence,
not to the surface.
