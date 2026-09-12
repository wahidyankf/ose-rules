---
description: >-
  Fixes a workflow document's metadata, its required Entry, Sequence, and Exit sections, what each must state, and where
  rationale goes.
when_to_use: >-
  Use when writing a new workflow document, or when checking that an existing one states its full contract.
---

# Document Contract

## Location and Name

A workflow lives under `repo-governance/workflows/<group>/`, one file per workflow, and each group directory carries its
index. The file stem is the workflow's identifier and matches its `name` field, as
[Schemas by Path](../artifact-metadata/001-schemas-by-path.md) requires. What the name says follows
[Capability Naming](../capability-naming.md), and its characters follow [File Naming](../file-naming.md).

## Metadata

Exactly `name`, `description`, and `when_to_use`, in that order. Nothing else goes in frontmatter: not inputs, outputs,
steps, or outcomes. Those are the body's.

## Required Sections

```markdown
# <Workflow Title>

## Entry

## Sequence

## Exit
```

| Section    | States                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------- |
| `Entry`    | the condition that must hold before the first step, and every input the workflow takes                        |
| `Sequence` | the numbered steps, in the order they run                                                                     |
| `Exit`     | the outcome that ends a successful run and what it leaves behind, plus any partial or failed outcome it names |

### Entry

The condition is observable: a plan in a named lifecycle root, a verdict recorded, a directory that holds at least one
brief. "When ready" is not a condition, because nobody can check it. Text beside the condition that nobody can check,
such as who needs the result, is context rather than part of the condition.

Each input is named with its type, what it is for, whether it is required, and its default when it is not. The type is
one of `string`, `number`, `boolean`, `file`, `file-list`, `directory`, or `enum`, and an `enum` lists its values. A
default may instead be given in the step that consumes the input. A workflow that takes no input beyond its entry
condition says nothing more.

### Sequence

A numbered list, one step per item, each opening with a short bold phrase that names the step. The rest of the item says
what the step does, and why when the reason is not obvious. An item may also state its success criterion: what must hold
for the step to count as done. [Steps and State](002-steps-and-state.md) governs what a step declares.

### Exit

Success names the terminal state and every output: a file, a verdict, a moved folder. Each output carries a type from
the same set, and a `file`, `file-list`, or `directory` output also carries the path pattern it is written or moved to.

A workflow need not list failure outcomes it does not handle specially. A step that fails, unless its item says
otherwise, ends the run as failed, naming that step. A workflow that can finish partially — some items resolved, others
recorded as blocked — names that partial outcome and what it leaves.

## Sections After Exit

After `Exit`, a workflow should carry `Example Usage`, showing a concrete invocation, and `Related Workflows`, linking
the workflows it composes with. A reader then sees how to start it and where it fits without searching other documents.

It may also carry rationale sections that argue for its shape: why a budget is bounded, why a step comes first, what the
workflow deliberately does not do. Each is a `##` heading that states the argument. Rationale adds no step, but it may
state a constraint that bounds every step, such as a run that writes nothing. A rule that changes what one step does
belongs in that step.

## Why Three Fixed Sections

A reader deciding whether to start needs the entry condition, and one deciding whether a run finished needs the exit,
without reading every step. Fixed headings put both in the same place in every workflow, so a validator can confirm they
exist and a reader never searches.

An adopter enforces the metadata and the three sections with its own workflow check in pre-commit or CI.
