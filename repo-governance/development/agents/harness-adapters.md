---
description: >-
  Requires every harness-specific agent or skill file to be generated from the canonical artifact, never authored, and
  fixes what a generator may and may not do.
when_to_use: >-
  Use when adding support for a harness, or when a harness-specific file appears to have been edited directly.
---

# Harness Adapters

Canonical artifacts live in one place and are the only ones a person edits. A harness that needs a different path or a
different file format gets a **generated** adapter.

## The Rule

An adapter holds no authored body. Everything in it is derived: the body from the canonical artifact, the harness-shaped
metadata from the canonical metadata, by a mapping the generator owns.

This is the rule broken most often by accident, because breaking it works. Copying a skill body into a harness directory
produces a working skill immediately. The failure arrives later and quietly: the canonical file is improved, the copy is
not, and the harness keeps teaching the previous version with nothing to indicate it is stale.

## What the Generator Translates

| Canonical      | Becomes                                                  |
| -------------- | -------------------------------------------------------- |
| body           | the body, unchanged                                      |
| `name`         | whatever the harness calls an identifier                 |
| `capabilities` | the harness's tool or permission names                   |
| `tier`         | a model and effort, if the repository declared a mapping |
| `constraints`  | the harness's equivalent restriction, where one exists   |

A capability with no equivalent in a harness is a hard failure of the generator, not a silent omission and not a broader
permission that happens to include it. Where a harness genuinely cannot express a restriction, the artifact is not
published for that harness.

Failing loudly here matters because the silent alternatives both grant more than was declared.

## Omission Is a Valid Mapping

An absent tier mapping means the generator emits no model and no effort, and the harness applies its own inheritance.

That is the designed default rather than a gap. Emitting a default the repository did not choose replaces the harness's
current behaviour with a guess frozen at generation time.

## Generated Files Are Verifiable

Regenerating from unchanged canonical input produces byte-identical adapters. A gate can therefore regenerate and
compare, and an edited adapter shows up as a diff rather than as a surprise months later.

## Adapters Are Not Canonical Input

Nothing reads an adapter to learn about the artifact — not another generator, not a validator, not a person. An adapter
is an output, and treating it as a source is how two sources appear.
