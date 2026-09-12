---
description: >-
  Styles components by composing utility classes in markup, reserves stylesheet rules for resets and third-party
  overrides, forbids importance overrides and inline style attributes, sorts class lists, and lays out mobile-first.
when_to_use: >-
  Use when writing or reviewing component styles in a repository that has adopted a utility-first styling framework, or
  when deciding whether a style belongs in markup, a stylesheet, or a shared component.
---

# Utility-First Styling

A utility-first framework generates small single-purpose classes from the token layer, and each component composes them
in its markup. The approach pays off only while styles stay in that one place. Once they also live in component
stylesheets, inline attributes, and forced overrides, a reader searches four places to learn why an element looks as it
does.

This standard implements [Simplicity Over Complexity](../../../principles/simplicity-over-complexity.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[One Source Per Fact](../../../principles/one-source-per-fact.md), and
[Accessibility First](../../../principles/accessibility-first.md). Visual values belong to
[Design Tokens](design-tokens.md), and interactive target sizes to
[Forms and Targets](accessibility/002-forms-and-targets.md).

## Style in the Markup

A component's appearance is the list of utility classes on its elements. No stylesheet rule targets a component through
a class of its own. Such a rule splits the component across two files and leaves a class nobody can safely delete; a
utility disappears with its markup.

Stylesheet rules remain correct in exactly two places:

- the base layer, for element resets and document defaults such as box sizing and the body's colours; and
- an override that must beat a third-party library's own styles, placed where the cascade lets it win without force.

## Repeated Combinations Become Components

When a class combination recurs, extract a shared component or a variant definition that owns it. Never turn it into a
stylesheet class with the framework's composition directive, which belongs only in the base layer.

A composition directive in component styles rebuilds the component stylesheet this approach exists to avoid, and hides
its dependency on the utilities it copies.

## No Importance Overrides

No style declaration carries an importance override. Control specificity with layer order, source order, or the
framework's variant modifiers.

An override wins by stepping outside the cascade, so the next rule that must win has to force as well, and the
escalation never ends. [Design Tokens](design-tokens.md) already bans it in token definitions; this rule extends the ban
to every style.

When a library writes an inline style that no stylesheet rule can outrank, configure the library at the source. An
override that cannot yet be removed is a recorded violation stating its reason and what removal requires, never a silent
addition.

## No Inline Style Attributes

No element carries an inline style attribute; use a utility. The exceptions are a value known only at runtime, such as a
measured position, set as a custom property, and a styling migration, which removes its inline styles before completing.

An inline style bypasses the token layer and class ordering, letting a raw value in unseen. Setting one property through
both a utility and an inline style leaves two answers to one question.

A value the scale lacks does not justify an inline style either. Use a step the scale already has, or promote the value
to a token when [Design Tokens](design-tokens.md) admits it.

## Class Order Is Canonical

Every class list follows one canonical order. Where a formatter can sort class lists, it does, and nobody sorts them by
hand.

A fixed order keeps a long list scannable and limits a diff to the classes that changed. Hand sorting gives every
reviewer a noisy diff.

## Mobile-First Layout

Base styles describe the narrowest supported viewport, and each wider breakpoint adds a minimum-width condition. Never
write the wide layout first and undo it with maximum-width overrides: undoing doubles the declarations and leaves the
narrow viewport, where layout is hardest, as a pile of exceptions.

The adopter records its breakpoint set once. Every component renders correctly at each recorded breakpoint, and is
checked at the narrowest one before it counts as done.

## Illustrative Example

The rules above name no framework. As an illustration only: in Tailwind CSS the composition directive is `@apply`, the
base layer is `@layer base`, a prefix such as `md:` adds a minimum-width breakpoint, and a formatter plugin sorts class
lists.

## Enforcement

An adopter enforces the mechanical parts in its own formatter and stylesheet lint: sorted class lists, no importance
override, no composition directive outside the base layer, and no inline style attribute beyond a runtime custom
property.
