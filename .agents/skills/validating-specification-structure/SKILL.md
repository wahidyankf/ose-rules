---
name: validating-specification-structure
description: >-
  Guides judging listed specification folders for useful indexes, well-formed features, agreement across folders,
  consistent architecture views, meaningful references, and implementation alignment, and what a repair may touch.
when_to_use: >-
  Use when checking or repairing specification folders inside a specification quality gate, or when rating a structural
  finding about a specification corpus.
compatibility: Requires read access to the listed specification folders and to the implementations they name.
---

# Validating Specification Structure

[Specs Quality Gate](../../../repo-governance/workflows/quality/specs-quality-gate.md) owns the sequence: listed folders
only, delegated checks, the counting threshold, and the check-fix loop.
[Specification Tree](../../../repo-governance/conventions/structure/specification-tree.md) owns the corpus shape,
[Discovery and Scenarios](../../../repo-governance/development/quality/testing/behaviour-driven-development/001-discovery-and-scenarios.md)
the scenario rules,
[Criticality Levels](../../../repo-governance/development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md)
the levels, and
[Deterministic and Judgement Validation](../../../repo-governance/development/quality/checks/deterministic-and-judgement-validation.md)
which checks a script owns. This skill covers the judgement inside each category, for rating findings and deciding
repairs.

## Leave the Script's Questions to the Script

File existence, index membership, counts, tree shape, and link resolution have exact answers, which the repository's
structure and link checks give. Carry their results and judge meaning only: whether an index usefully describes its
folder, not whether it exists. Never count feature files by reading or resolve a path by hand; an inferred count that
disagrees with the tool is two findings about one fact. When no such check ran, record those categories as not run.

## What Each Category Weighs

| Category                 | Usually `CRITICAL` or `HIGH`                                                                        | Usually lower                                                                                |
| ------------------------ | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| index quality            | an index that is empty or says nothing about its folder                                             | an accurate but thin index                                                                   |
| feature format           | a file with no feature header; a missing user story; shared preconditions differing within a folder | a file name outside the naming rule; scenario name casing                                    |
| cross-folder consistency | one actor or entity with conflicting attributes; contradictory scenarios in a shared domain         | one persona under two names; step wording drift for one concept                              |
| architecture views       | an index listing a view that does not exist; a view naming an element no level defines              | element names differing between levels; colours outside the declared accessible palette      |
| references               | a reference whose target no longer holds what the text claims                                       | a reference to a broader document than the sentence needs                                    |
| implementation alignment | a specification naming an implementation that does not exist                                        | a new area not yet implemented, often acceptable; an implementation its index never mentions |

The assignment order in Criticality Levels settles every borderline case, and
[Color Accessibility](../../../repo-governance/conventions/writing/color-accessibility.md) decides the palette. Repeated
step keywords are a format finding only where the repository recorded one action per scenario.

## Consistency Needs Counterparts

Compare only listed folders that describe one system from different sides, such as a service and the interface that
calls it. A domain one covers and its counterpart omits is a gap, unless it belongs to one perspective alone, such as
page layout. Different scenario counts between perspectives are expected; different statements of a shared rule are not.
Counts differing by more than half in a shared domain, unless the repository records another size, are still a `MEDIUM`
finding no repair closes.

## Adoption Is a Decision, Not a Defect

An owner with no behaviour specifications, or a served interface with no contract, is reported as an adoption gap for
its owner to decide. So is a subtree still shaped by an older layout, because moving paths that tools, caches, and
bindings rely on is planned work. Neither is repaired inside a gate.

## What a Repair May Touch

- **Safe after re-checking:** an index regenerated from what its folder holds, a file renamed to the naming rule with
  its history kept, a relative path corrected from the target's real location, and a view listing corrected.
- **Needs a person:** a missing user story, whose words belong to the owner; shared preconditions reconciled across a
  folder, which can change test behaviour; and a cross-folder contradiction or renamed actor, which can cascade into
  bindings.
- **Left alone:** what a scenario says or requires, implementation alignment, which the code's owner resolves, and a
  legitimate difference between perspectives.

A repair never deletes a feature file or reaches outside the listed folders. Anything in doubt is reported rather than
guessed.

## Related

- [validating-specifications](../validating-specifications/SKILL.md) — whether the statements themselves are complete
  and testable.
- [scaffolding-specifications](../scaffolding-specifications/SKILL.md) — creating a corpus in the first place.
- [generating-validation-reports](../generating-validation-reports/SKILL.md) — writing the report a gate reads.
