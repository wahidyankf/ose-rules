---
description: >-
  Requires a repository to declare one authoring rule for conceptual diagrams and, for rendered diagrams, its size
  limits; fixes the accessibility requirement for each form, and excludes literal content.
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

## When a Diagram Earns Its Place

Draw a diagram when relationships, sequence, state, or hierarchy are materially easier to follow drawn than written. A
simple fact belongs in prose, an exact mapping in a table. A diagram that decorates, or repeats a neighbouring table
less precisely, costs attention and returns nothing.

Update a diagram in the same change as the structure it depicts.

## One Concept per Diagram

A diagram in either form shows one idea. Split it when it combines distinct concepts, draws a comparison as side-by-side
groups, or exceeds a declared size limit, and give each part its own short heading. The size trigger applies wherever a
repository declares limits. An oversized diagram renders too small to read on a narrow screen and too dense anywhere.

## Declared Size Limits

A repository using the rendered rule declares two limits in configuration, nodes per level and label-line length, and
validates every diagram against them. The numbers and how a label is counted are its own decision. Illustrative options:

| Option  | Nodes per level | Label-line length | Counted as                | Trade-off                                                                 |
| ------- | --------------: | ----------------: | ------------------------- | ------------------------------------------------------------------------- |
| tighter |               4 |                20 | characters                | readable on narrow screens; more splitting                                |
| looser  |               6 |                30 | user-perceived characters | fewer splits and fair counting of non-Latin text; clips in some renderers |

Limits are proxies: clipping depends on glyph widths and layout, which no text check sees, so inspect a new or
materially changed diagram as rendered.

## Colour in Diagrams

A styled diagram takes its fills, text pairings, and outlines from [Colour Accessibility](color-accessibility.md), and
its labels and shapes carry every distinction its colours draw.

## Enforcement

An adopter enforces the limits and the palette in its own diagram validator.

## Left to the Adopter

A palette-naming comment in diagram source, and the default flow direction, are left to the adopter: neither changes
what a reader understands.

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
