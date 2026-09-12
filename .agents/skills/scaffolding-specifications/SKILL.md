---
name: scaffolding-specifications
description: >-
  Guides creating a specification corpus, or its missing parts, at a named path: sizing the tree to the owner's
  surfaces, modelling each file on sibling corpora, and making every first file already true.
when_to_use: >-
  Use when asked to create a specification corpus, a missing specification index, or an owner's first behaviour files,
  before writing any of them.
compatibility: Requires read access to the owning project and its sibling corpora, and write access to the named path.
---

# Scaffolding Specifications

[Specification Tree](../../../repo-governance/conventions/structure/specification-tree.md) owns the corpus layout and
what each part must hold, [Directory Indexes](../../../repo-governance/conventions/structure/directory-indexes.md) owns
every index,
[Discovery and Scenarios](../../../repo-governance/development/quality/testing/behaviour-driven-development/001-discovery-and-scenarios.md)
owns the scenario rules, and
[Architecture Specifications](../../../repo-governance/development/quality/architecture/architecture-specifications.md)
owns the as-built model and its diagram form. This skill covers the judgement of creating a corpus without deciding more
than the request asked.

## Build Only What Was Named

Create content at the path the request names, and nowhere else. Whether an owner gets a corpus, and which areas it
covers, is the requester's call; a scaffold that adds a neighbouring area because it looked missing has made that call
for them. When the named path could mean a product, an owner, or a domain, ask before creating anything.

## Size the Tree to the Owner

Read the project before shaping the tree. Each part exists because the owner has something for it to describe:

| Part                  | Create it when                                                             |
| --------------------- | -------------------------------------------------------------------------- |
| index                 | always                                                                     |
| architecture document | always, with a section only for each level the owner actually has          |
| behaviour tree        | together with its first real feature, never empty                          |
| domain directory      | features already share a business area, not in anticipation of some        |
| contracts             | the owner serves an interface a consumer depends on; never in the consumer |
| product overview      | the product has several owners and something genuinely spans them          |

A folder made in anticipation is either empty, which a structure check reports, or filled with a stub that states
nothing. Either way the corpus claims coverage nobody wrote. A command-line owner gets no user-interface component view.

## Model on Siblings, Never Copy Them

Read one or two existing corpora in the repository first, and follow their index sections, feature naming, shared
preconditions, and step vocabulary. A novel structure in one corpus makes every tool and reader handle a special case.
Where siblings disagree, follow the convention rather than the majority.

Modelling is not copying: every statement in the new corpus is about this owner.

## Speak the Surface's Language

| Surface           | Shared precondition says                    | Steps are phrased as                 |
| ----------------- | ------------------------------------------- | ------------------------------------ |
| user interface    | the application is running and reachable    | what the user sees and does          |
| service interface | the service is running and accepts requests | requests, responses, and status      |
| command-line tool | the tool is installed                       | commands, output, exit status, files |
| library           | the library is available to its caller      | calls and the values they return     |

A user-interface step that names a request, or a service step that names a button, crosses the boundary the corpus
exists to keep.

## Every First File Is Already True

- **Index.** Describe what the directory holds now, and what the corpus does not yet cover; never promise areas that do
  not exist.
- **Architecture.** Describe the system as it runs today. A boundary that is planned but not built stays in its plan,
  per [Plan Specification Changes](../../../repo-governance/conventions/structure/plan-specification-changes.md).
- **Feature.** State a real behaviour in a scenario that can fail. A placeholder scenario or pending step passes while
  checking nothing, which
  [Bindings and Exemptions](../../../repo-governance/development/quality/testing/behaviour-driven-development/003-bindings-and-exemptions.md)
  treats as a defect.
- **Readers.** Product and project people read a corpus too. Open each document with a plain summary, and explain a
  domain or niche term at its first use in that file.

## Where Scaffolding Stops

The scaffold is finished when the named files exist and the repository's structure and index checks pass over them.
Judging whether the new corpus is sound and agrees with its neighbours is
[validating-specification-structure](../validating-specification-structure/SKILL.md).
