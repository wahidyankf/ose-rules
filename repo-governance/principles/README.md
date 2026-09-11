---
description: >-
  Indexes the principles layer, which holds the durable constraints this catalog applies everywhere and argues for
  nowhere else.
when_to_use: >-
  Use when locating a principle, or when deciding whether a rule is durable enough to belong at this level rather than
  in a convention.
---

# Principles

A principle is true regardless of which repository is reading it. A convention below this level records a choice that
could reasonably have gone the other way; a principle records something that could not.

Everything here was **discovered rather than declared**. Each of these was already load-bearing in several artifacts
before it had a page, and each page names where — a principle with no existing application is a preference that has been
promoted.

| Principle                                             | Holds                                                                |
| ----------------------------------------------------- | -------------------------------------------------------------------- |
| [Fail Closed](fail-closed.md)                         | a control that cannot decide refuses, and never reports a clean run  |
| [One Source Per Fact](one-source-per-fact.md)         | every fact has one place; a second copy is a scheduled contradiction |
| [Evidence Over Assertion](evidence-over-assertion.md) | a claim is worth nothing until something outside it agrees           |
| [Minimal Sufficiency](minimal-sufficiency.md)         | carry what the purpose requires, and record what was left out        |

## What Is Not Here

Bounded repetition is not a principle here. It is owned as a development standard by
[Bounded Convergence](../development/workflow/bounded-convergence.md), which states it once and completely — and
restating it at this level would break the second principle on the list above.

Portability is not here either. [Portability](../conventions/structure/plans/009-portability.md) owns it for the plan
system and this repository's instructions own it for the catalog, which is two places already.

## Directory Map

- [Fail Closed](fail-closed.md)
- [One Source Per Fact](one-source-per-fact.md)
- [Evidence Over Assertion](evidence-over-assertion.md)
- [Minimal Sufficiency](minimal-sufficiency.md)
