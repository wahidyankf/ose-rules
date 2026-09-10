---
description: >-
  Requires a repository to declare one authoring rule for conceptual diagrams, fixes the accessibility requirement for
  each form, and excludes literal content.
when_to_use: >-
  Use when adding a conceptual diagram, or when changing a repository's diagram authoring rule.
---

# Diagrams

A repository declares exactly one authoring rule for conceptual diagrams and applies it consistently.

## The Two Rules

| Rule       | Requires                                                                          |
| ---------- | --------------------------------------------------------------------------------- |
| rendered   | a Mermaid diagram carrying both an accessible title and an accessible description |
| plain-text | an ASCII diagram with prose immediately beside it, and no Mermaid                 |

Both are defensible. Rendered diagrams read better where they render and are opaque where they do not. Plain-text
diagrams read identically everywhere, including in a terminal, a diff, and a plain-text mail client, at the cost of what
they can express.

What is not defensible is having both in one repository, because a reader then cannot predict which they will get and
tooling cannot check either rule.

## Accessibility Is Not Optional in Either Form

A rendered diagram carries a title and a description. Not a caption repeating the title — a description of what the
diagram shows, for a reader who will never see it. That includes every automated check and every text search.

A plain-text diagram carries prose beside it doing the same work. ASCII art is not self-describing merely because it is
text; a box-and-arrow drawing is as opaque to a screen reader as an image.

## What Is Excluded

The rule covers **conceptual** diagrams — ones drawn to explain a relationship. It does not cover:

- literal code, command output, or file trees;
- interface wireframes; or
- archived material.

A directory tree is not a diagram of a structure; it is the structure, quoted. Converting it into a rendered graph makes
it harder to copy, harder to diff, and no clearer.

Archives are excluded because rewriting history to satisfy a rule introduced afterwards destroys the record the archive
exists to keep.

## Reversals Are Recorded

A repository changing its authoring rule records the change, its reason, and its date, and migrates the existing
diagrams in the same decision.

Applying a reversal silently produces a repository in two styles with no explanation, and the next person reads that as
carelessness rather than as a decision. Two mixed styles are also the state in which nobody can tell which rule is
current, so both keep being used.
