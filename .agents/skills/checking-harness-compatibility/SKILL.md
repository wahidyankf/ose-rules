---
name: checking-harness-compatibility
description: >-
  Guides telling internal parity from upstream drift, deciding which harness differences are substantive, rating
  confidence from the cited source, and separating mechanical repairs from decisions a person makes.
when_to_use: >-
  Use when checking or repairing a repository's harness bindings, or when judging whether a difference from a harness's
  current documentation is a finding at all.
compatibility: Requires read access to canonical artifacts, generated adapters, and harness configuration.
---

# Checking Harness Compatibility

[Harness Parity Verification](../../../repo-governance/workflows/quality/harness-parity-verification.md) and
[Harness Upstream Drift Review](../../../repo-governance/workflows/quality/harness-upstream-drift-review.md) own the two
sequences. [Harness Adapters](../../../repo-governance/development/agents/harness-adapters.md) owns what a binding may
contain. This skill covers the judgement both sequences call on.

## Two Questions, Kept Apart

| Question                                                   | Answered by                    | Evidence                          |
| ---------------------------------------------------------- | ------------------------------ | --------------------------------- |
| do the committed bindings agree with the canonical source? | a deterministic check, offline | regenerated output and its diff   |
| do the committed conventions still match the harness?      | reading current upstream docs  | a cited, dated authoritative page |

Neither answers the other. A clean parity check says nothing about a harness that renamed its configuration file, and
upstream research cannot explain a stale adapter. Settle parity first, because drift measured against bindings that
already disagree with their source cannot be attributed to the harness.

## Substantive Drift Only

A finding is a difference that changes what a harness reads or does:

- a root instruction or configuration file the harness now expects under another name or location;
- a renamed or removed directory the harness discovers agents or skills from;
- a metadata field the harness now requires, renamed, or no longer accepts;
- a file format or extension the harness no longer parses.

Rewording, reordered examples, and new optional features in upstream documentation are not findings. If the effect of a
difference cannot be stated in one sentence, it is not yet a finding.

Rate by how the failure shows. Drift that makes a harness silently ignore a file, so an agent or instruction simply does
not exist for it, is `HIGH`: nothing signals the loss. Drift that degrades a field while the file still loads is usually
`MEDIUM`.

## Confidence Follows the Citation

Upstream facts carry the labels [Factual Validation](../../../repo-governance/conventions/writing/factual-validation.md)
defines, and confidence is read from them:

| Source label                             | Confidence       | Action                                        |
| ---------------------------------------- | ---------------- | --------------------------------------------- |
| Verified                                 | `HIGH` possible  | repair if the change is also mechanical       |
| Unverified                               | `MEDIUM`         | leave unapplied and flag with the citation    |
| Outdated, or the binding already matches | `FALSE_POSITIVE` | record as no drift, outside the finding count |

Two sources that disagree are a conflict to report, never a choice to make quietly.

## Mechanical or a Decision

A repair is mechanical when the evidence leaves one correct result: regenerating a stale adapter from its canonical
source, or applying a verified rename of a key or path in the canonical artifact or generator mapping and regenerating.

Everything else is a person's decision, because each carries consequences no citation settles:

- rewording governance or root instruction prose;
- an agent or skill present for one harness and absent for another, where removing one or authoring the other is a
  product choice;
- a new tier or capability translation, or a change to what a permission means;
- a change to generator logic rather than to its input.

Never repair the adapter itself; the next generation overwrites it, and until then it is a second source.
