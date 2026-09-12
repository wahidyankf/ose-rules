---
description: >-
  Requires every change to assess the specification set it could affect, update each affected specification with its
  contracts, tests, and documentation in the same change, and record a verified no-op when none is affected.
when_to_use: >-
  Use before changing the code, configuration, tests, or user-facing documentation of a project that keeps
  specifications, or when deciding whether a change must also update one.
---

# Specification Maintenance

A repository's specifications are canonical. They state what its software must do and which boundaries it keeps, and the
implementation follows them. Every change therefore answers one question first: which specifications would this make
wrong?

This standard implements [Documentation First](../../../principles/documentation-first.md),
[One Source Per Fact](../../../principles/one-source-per-fact.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md), and
[Evidence Over Assertion](../../../principles/evidence-over-assertion.md).

Where specifications live is the adopter's choice, and
[Specification Tree](../../../conventions/structure/specification-tree.md) offers one layout. How scenarios are written
and bound belongs to [Behaviour-Driven Development](../testing/behaviour-driven-development.md), and how a model stays
as-built to [Architecture Specifications](../architecture/architecture-specifications.md). This standard ties both to
every change.

## Assess Before Every Change

Before changing production code, configuration, tests, or user-facing project documentation, inspect the specification
set of each owner the change reaches: behaviour specifications, the architecture model, served contracts, the corpus
index, and any other canonical schema, example, or reference kept there.

Assessing means reading every specification the change could plausibly affect, then saying which are affected and why
the others are not. Scanning a list of file names is not an assessment.

A specification is affected when the change would leave any of its statements inaccurate, incomplete, or contradictory:
about a behaviour, actor, boundary, responsibility, relationship, interface, data flow or store, constraint, example,
term, or owner.

## Update First, in the Same Change

Each affected specification changes in the same change as the implementation, and before it: a behaviour's scenario
comes first, and a moved boundary is synchronized with the final as-built state.

Synchronization runs both ways. New behaviour with no scenario is drift, and so is a scenario kept after its behaviour
was removed, even while every binding still resolves.

| The change                                                                                 | Specification update                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------ |
| adds, removes, or renames an operation, command, page, or other observable entry point     | add, remove, or rename its scenarios                   |
| changes an input or output shape, an observable validation rule, or an access requirement  | update the scenarios that state it                     |
| adds or removes a data store, an external integration, or a runtime boundary               | update the architecture model                          |
| renames or removes a project                                                               | rename or remove its corpus, and every index naming it |
| fixes a defect so behaviour matches the existing specification                             | none: the specification was already right              |
| fixes a defect by changing behaviour the specification stated wrongly                      | correct the specification to the fixed behaviour       |
| refactors internals, upgrades a dependency, or tunes performance with no observable change | none                                                   |

## Complete Means Every Companion Artifact

A behaviour change is complete only when, in the same commit or pull request, each related artifact agrees with it:

- its behaviour specifications;
- the contracts its owner serves, with generated code regenerated, never hand-edited, as
  [OpenAPI Contract-First](../architecture/openapi-contract-first.md) requires;
- tests at every applicable layer, bound to the changed scenarios;
- documentation that describes the behaviour;
- the architecture model, where a boundary moved; and
- the specification tree's indexes, where a file was added, moved, renamed, or removed, under
  [Directory Indexes](../../../conventions/structure/directory-indexes.md).

Shipping part of this set is unfinished work, not finished work with a follow-up.

A direct change carries the updates itself. A planned change states them before implementation under
[Plan Specification Changes](../../../conventions/structure/plan-specification-changes.md), and its execution then meets
the same bar.

## No Churn, and a Record Either Way

Leave an unaffected specification alone, even beside a changed sibling. A scenario edited without a behaviour change
carries history that no longer says when its behaviour moved.

The delivery report names every specification updated, or records that the assessment found none to change: a verified
no-op. An assessment nobody recorded cannot be told apart from one that never happened.

When a scenario and the implementation disagree, deciding which is wrong belongs to
[Gherkin Implementation Review](../../../workflows/quality/gherkin-implementation-review.md).

## Out of Scope

Plans, which hold proposals; generated output, whose source changes instead; and governance documents describing no
project behaviour.

An adopter enforces the mechanical part, such as required corpus files, complete indexes, and strict bindings, in its
own gate or CI.
