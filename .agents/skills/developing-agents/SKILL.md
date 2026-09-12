---
name: developing-agents
description: >-
  Guides drafting a canonical agent definition: writing the stopping rule first, stating a workload a tier can be tested
  against, deriving each capability from the procedure, and replacing harness-specific fields with portable ones.
when_to_use: >-
  Use when creating, extending, or reviewing an agent definition, or when converting one that carries tool lists, model
  names, or usage sections.
compatibility: Requires read access to the agent roster and to the skills and workflows the agent will reference.
---

# Developing Agents

[Agent Authoring](../../../repo-governance/development/agents/agent-authoring.md) decides what makes an agent sound;
[Capability Forms](../../../repo-governance/development/agents/capability-forms.md) decides whether the need is an agent
at all; [Schemas by Path](../../../repo-governance/conventions/structure/artifact-metadata/001-schemas-by-path.md),
[Portable Tiers](../../../repo-governance/conventions/structure/artifact-metadata/003-portable-tiers.md), and
[Portable Capabilities](../../../repo-governance/conventions/structure/artifact-metadata/004-portable-capabilities.md)
fix the metadata; and [Capability Naming](../../../repo-governance/conventions/structure/capability-naming.md) shapes
the name, which matches the file basename. This skill covers the drafting judgement between those rules.

## Write the Stopping Rule First

Before any frontmatter, finish one sentence: the agent is done when a stated condition holds. A sentence that needs
"and" describes two agents. A sentence that cannot be finished describes a skill or a workflow.

Then write what the agent does not do, naming the closest neighbours and what each owns. That boundary, together with a
`when_to_use` that names the situation, is what keeps the agent from being invoked for a neighbour's work.

## State a Workload the Tier Can Be Tested On

A reviewer tests the tier against the core loop, not the setup. Write the normal workload as what the agent repeats,
against what, producing what, then read the selection table in Portable Tiers against that sentence alone.

- Untestable: "handles complex validation".
- Testable: "applies the link rules to each changed document and reports every broken target", which the table places at
  `execution`.

A draft that starts explaining why the rare hard case needs more is choosing from the hardest case. Where a heavier tier
is still right, the body gives the reason there.

## Derive Capabilities From the Procedure

Walk the procedure and note, for each step, whether it reads the repository, writes it, runs a command, reaches an
external source, or delegates. The union, in canonical order, is the list. Remove any capability no step uses, and give
any beyond the role's starting set a sentence a reviewer can find.

Common padding: `shell` for an agent that runs no command, `network` for research confined to the repository, and
`repository-write` on a checker whose adopter chose read-only reporting. `subagent` belongs only to an orchestrating
role.

## Declare What Carries the Judgement

List in `skills` every skill a step depends on, since a delegated agent inherits no session context. A body paragraph
that explains how to judge something is a skill that already exists or should: search the skill index before writing it,
and link the owning convention wherever the agent applies a rule.

## Recorded Contradiction: Portable Fields Over Harness Fields

Many harness formats invite fields and sections the catalog's schema rejects. The catalog's rule is selected, because
each harness field describes one harness's configuration and drifts when that harness changes:

| Harness habit                                                            | Selected rule                                                                           |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| a tool allowlist, or a section explaining each harness tool              | `capabilities` from the closed vocabulary, with extra ones argued in the body           |
| a vendor model, a reasoning-effort value, or a justification tied to one | a `tier`, justified by the workload statement; any model mapping lives in configuration |
| a display colour                                                         | nothing canonical; presentation belongs to the adapter                                  |
| a usage section of use and do-not-use lists                              | the `when_to_use` field, plus the body's statement of what the agent does not do        |
| a closing list of guidance, related agents, and skills                   | `skills` in metadata, and links placed where each rule is applied                       |

A closing reference list is read after the work it should have shaped, and a usage section duplicates the field the
harness actually routes on.

## Converting an Existing Definition

Map each listed tool to the capability it implies. A tool with no equivalent means the role relied on a harness feature:
state what the role needed it for, and decide whether the role survives without it. Never edit a generated adapter to
restore a dropped field; [Harness Adapters](../../../repo-governance/development/agents/harness-adapters.md) regenerates
every adapter from the canonical file.
