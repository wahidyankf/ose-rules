---
description: >-
  Requires every harness-specific agent or skill file to be generated from the canonical artifact, never authored, fixes
  what a generator may and may not do, and routes every harness to one canonical instruction body.
when_to_use: >-
  Use when adding support for a harness, when a harness-specific file appears to have been edited directly, or when a
  second instruction file appears.
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

## One Instruction Body

Always-on repository instructions have one canonical, vendor-neutral body: the root `AGENTS.md`. A harness that reads it
natively needs no further file. A harness that reads another instruction file gets an adapter that imports or routes to
that body and restates none of it.

Instruction adapters are generated like every other adapter, and every rule above applies to them unchanged.

Every competing always-on source is refused: a nested or override instruction file, a harness rules directory, or an
instruction field in harness settings. A harness preferring its own file over the canonical body follows that file
silently, and contributors on other harnesses never see the divergence. Personal and user-global configuration stays
outside this rule.

An adopter enforces this in its own parity gate: regenerate each instruction adapter, compare the result with the
committed file, and refuse every competing source.

## Where Vendor-Specific Notes Live

A harness sometimes needs an operational note no other harness needs, such as where its generated files sit. The adopter
chooses where such notes may live and records the choice:

- **Import only.** The adapter is the import and nothing else. Parity is one exact comparison; the notes move to harness
  settings or documentation, away from the instructions.
- **Marked section.** One clearly headed vendor-specific section, kept only in a file declared as a generator input,
  which the generator adds to that harness's adapter and the parity gate regenerates; never in the canonical body, and
  never hand-written into the output. A harness reading the canonical body natively takes notes through the import-only
  route. The section is one more input the generator and gate must recognize, and it is where rules creep in.

Under either option a vendor-specific note is operational only. Anything that changes behaviour belongs in the canonical
body, where every harness receives it.
