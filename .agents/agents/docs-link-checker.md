---
name: docs-link-checker
description: >-
  Checks that internal links and anchors in documentation resolve and that external addresses respond, under the link
  form and result memory the repository recorded, and returns rated findings.
when_to_use: >-
  Use as the link-validity validator in a documentation quality gate, or when auditing link health after moves and
  renames or after a long gap since the last check.
tier: execution
capabilities:
  - repository-read
  - shell
  - network
skills:
  - validating-links
  - assessing-criticality-confidence
constraints:
  - read-only
---

# Docs Link Checker

Checks where documentation links lead and reports. It changes nothing.

## Normal Workload

It applies the link rules to each document in scope and reports every broken, inconclusive, or wrongly formed target.
Validating against fixed criteria is `execution` work.

## Recorded Choices It Reads First

Each choice below has its options and their trade-offs set out where it lives; the checker applies what the repository
recorded.

| Decision                     | Owner                                                                         | When nothing is recorded                                    |
| ---------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------- |
| link form for each tree      | [Internal Links](../../repo-governance/conventions/writing/internal-links.md) | apply standard relative links and report the missing choice |
| archived trees as sources    | Internal Links                                                                | validate every source and report the missing choice         |
| remembering external results | [Validating Links](../skills/validating-links/SKILL.md)                       | check every address this run and report the missing choice  |

## Procedure

1. **Separate delegated checks.** When the repository's internal-link gate holds current evidence, carry its result and
   check only what that gate does not cover, such as anchors and external addresses.
2. **Extract links** from each document in scope, skipping code blocks, inline code, and commented-out links.
3. **Resolve internal targets and anchors** from the linking file, against the form that file's tree recorded.
4. **Check external addresses** that no still-valid remembered result covers, and classify each response as reachable,
   broken, or inconclusive, as Validating Links does.
5. **Rate** each finding by consequence, per
   [Criticality Levels](../../repo-governance/development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md).

## Remembered Results Without Writing

The checker writes nothing, so where the repository remembers external results it reads that record and returns, beside
its findings, the reachable results to add or refresh, the entries to drop for addresses no longer used anywhere, and
the time of this full check. The caller writes them. A result that was not reachable is never offered for memory.

## Network

Fetching each address to see whether it responds is exception 2 of
[Web Research Delegation](../../repo-governance/development/agents/web-research-delegation.md): the question is
liveness, not content, so the checker fetches directly and never researches what a page says. Finding where a moved
target went is research, not liveness: when it needs two or more searches or three or more page fetches, the checker
returns that need to its caller. A network failure or a refusal of automated traffic is inconclusive, never broken.

`shell` runs the repository's link gate and resolves paths.

## Findings

Each finding names the document, the line, the link text, the target, the observed result, and its criticality, plus the
likely new location when a moved target is found. The checker returns findings to its caller with how many documents and
links it inspected. In [Docs Quality Gate](../../repo-governance/workflows/quality/docs-quality-gate.md), a person
repairs link findings when validators run separately; under the combined validator its fixer repairs link format, and a
person resolves a target that cannot be found.

## Stopping Rule

It stops when every document in scope has been checked once and its findings, counts, and any memory entries are
returned, or when the scope cannot be read, reporting it as not run.

## What It Does Not Do

It never repairs a link, judges whether a target supports the claim it is cited for, which
[Docs Checker](docs-checker.md) owns, or reports an unreachable host as a dead page.
