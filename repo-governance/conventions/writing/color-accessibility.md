---
description: >-
  Requires that colour never carries meaning alone, fixes a colour-vision-safe palette with measured text pairings, and
  sets the contrast floor and the tests colour passes before publication.
when_to_use: >-
  Use when choosing, reviewing, or testing a colour that carries meaning, such as a diagram fill, a status marker, a
  chart series, or styling in documentation.
---

# Colour Accessibility

Colour may reinforce meaning. It never carries meaning alone, and every colour that appears meets a contrast floor that
is measured rather than judged by eye.

## Never Colour Alone

Everything colour distinguishes is also distinguished by text, shape, line style, position, or pattern. A reader viewing
the content in greyscale, through a colour-vision simulation, or through a screen reader understands all of it.

Colour vision deficiency is common, and it is not the only way colour disappears: greyscale printing, projector washout,
and forced high-contrast modes remove it for everyone. This is WCAG success criterion
[1.4.1 Use of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

## Palette

Meaningful colour comes from this palette, a qualitative set chosen to stay distinguishable under the common forms of
colour vision deficiency:

| Name   | Fill      | Text on the fill | Text contrast |
| ------ | --------- | ---------------- | ------------: |
| blue   | `#0173B2` | white `#FFFFFF`  |        5.13:1 |
| orange | `#DE8F05` | black `#000000`  |        8.04:1 |
| teal   | `#029E73` | black `#000000`  |        6.14:1 |
| purple | `#CC78BC` | black `#000000`  |        6.98:1 |
| brown  | `#CA9161` | black `#000000`  |        7.73:1 |
| grey   | `#808080` | black `#000000`  |        5.32:1 |

The text column is not a preference. For each fill it is the only one of black and white that reaches 4.5:1: black text
on blue measures 4.10:1, and white text on any other fill measures between 2.61:1 and 3.95:1. Every ratio here is
computed with the WCAG relative-luminance formula, and any new pairing is measured the same way before use. Where other
guidance pairs these fills differently, this table adopts the stricter, measured pairing.

## Colours to Avoid

Red, green, yellow, light pink, and bright magenta never carry meaning, and red is never paired with green. Red and
green collapse into the same muddy tone under the most common deficiencies, and yellow and light pink wash out under
blue–yellow deficiency and against light backgrounds. That includes pass-and-fail semantics: a passing state is teal and
labelled, not green.

## Contrast Floor

| Element                                                             | Minimum | Criterion                                                                                      |
| ------------------------------------------------------------------- | ------: | ---------------------------------------------------------------------------------------------- |
| normal text                                                         |   4.5:1 | [1.4.3 Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)  |
| large text: at least 18 point, or 14 point bold                     |     3:1 | 1.4.3 Contrast (Minimum)                                                                       |
| graphical objects and interface components, against adjacent colour |     3:1 | [1.4.11 Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html) |

Where the rendered size of text cannot be known in advance, such as a diagram label, require 4.5:1. The viewer decides
the rendered size, and only the higher threshold holds at every size.

## Outlines

Every filled shape carries a black outline. Against a white page, orange measures 2.61:1 and brown 2.72:1, below the 3:1
a graphical object needs, so on a light background the outline is what defines the shape. On a dark background the fills
reach 3:1 on their own. The outline makes one style correct on both.

## Implementation

- Declare each colour once, as a hex value, in a named style that every element sharing that meaning reuses. Colour
  names render differently across tools, and scattered inline styles drift apart.
- Explain what each colour means in visible prose near the content, wherever the labels do not already say it.

## Before Publishing

Test every new or materially changed use of colour:

1. Only palette fills are used, each with its paired text colour and a black outline.
2. Every element stays distinct under simulated red-blind, green-blind, and blue–yellow-blind vision.
3. Every contrast ratio is measured, not estimated.
4. The content is checked rendered on a light and on a dark background.
5. The content is fully understandable in greyscale.

## Scope

In scope: colour that carries meaning in documentation — diagrams, status markers, charts, and styled examples.

Out of scope: brand identity, application interface design, and print colour spaces, which have their own constraints
and their own owners.

## Enforcement

An adopter enforces the palette, the text pairings, and the outline in its own diagram or style validator; the
simulation and rendered checks remain review.
