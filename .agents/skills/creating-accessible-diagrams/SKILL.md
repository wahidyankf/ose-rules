---
name: creating-accessible-diagrams
description: >-
  Guides drawing diagrams every reader can use: deciding whether colour is needed, carrying each distinction in labels,
  shapes, or lines, writing the text alternative, and testing the diagram as rendered.
when_to_use: >-
  Use when drawing or restyling a conceptual diagram, choosing its colours, or reviewing whether a diagram still works
  for a reader who cannot see its colours.
compatibility: Requires read access to the repository's declared diagram rule and colour palette.
---

# Creating Accessible Diagrams

[Diagrams](../../../repo-governance/conventions/writing/diagrams.md) owns the authoring rule, the text alternative each
form carries, the size limits, and splitting.
[Colour Accessibility](../../../repo-governance/conventions/writing/color-accessibility.md) owns the palette, its
measured text pairings, the outline, the contrast floor, and the checks before publication. This skill covers the
drawing decisions those rules leave to the author.

## Draw It in Greyscale First

Draw the diagram with no colour and make it complete: every node labelled, every kind of element told apart by shape or
line style, every relationship named wherever it is not obvious. Add colour afterwards, and only where it helps a reader
group what the labels already distinguish.

A diagram designed in colour tends to use colour as its only distinction, and labels added later come out cramped and
inconsistent. Starting without colour makes the rule against colour alone hold by construction.

## Give Each Distinction a Second Carrier

List what the colours are meant to say, and pair each meaning with something other than colour:

| Distinction                             | Carry it with                         |
| --------------------------------------- | ------------------------------------- |
| kind of element, such as actor or store | shape                                 |
| state, such as pending or complete      | a word in the label                   |
| path, such as normal or fallback        | solid versus dashed line              |
| grouping                                | position, or a short heading above it |

A distinction with no available carrier is a sign the diagram shows too much. Split it.

## Colour by Meaning, Consistently

Choose one palette fill per meaning and reuse it wherever that meaning appears, across every diagram in the document.
Take each fill's text colour from the palette's measured pairing rather than judging by eye, because the pairing that
looks readable is often the one below the contrast floor. States such as pass and fail avoid the colours the convention
forbids, however familiar those colours are elsewhere.

Say in prose near the diagram what each colour means, unless the labels already say it.

## Write the Alternative for Someone Who Will Never See It

The text alternative says what the diagram shows, not what it looks like. Name the elements, then the relationships in
the order a reader would trace them, then the conclusion the diagram exists to support. "Three boxes joined by arrows"
describes the drawing; "a request passes from the gateway to the service, which reads the cache before the database"
describes the system.

An alternative that is hard to write usually means the diagram holds more than one idea.

## Test It the Way It Will Be Read

Apply the convention's checks to the diagram as rendered, not to its source: simulated colour-vision deficiencies, a
greyscale view, and both a light and a dark background. Then read the text alternative alone, without the picture, and
ask whether a reader could answer the questions the diagram exists to answer.

## Common Repairs

- **Red for failure, green for success.** Replace both with palette fills and put the state into the label.
- **Colour names in the source.** Declare each colour once as a value in a named style, reused by every element with
  that meaning.
- **Text that fades into its fill.** Use the text colour the palette pairs with that fill.
- **A legend that only maps colours to meanings.** Move each meaning into the labels, then remove the legend if nothing
  remains in it.
- **A diagram that repeats a nearby table.** Keep whichever is more precise, usually the table, and remove the other.
