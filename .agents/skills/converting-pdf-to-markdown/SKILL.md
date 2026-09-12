---
name: converting-pdf-to-markdown
description: >-
  Guides converting a PDF into Markdown that preserves every passage, table, heading level, nesting depth, and figure,
  and judging a conversion across seven fidelity dimensions with a criticality for each gap.
when_to_use: >-
  Use when converting a PDF into Markdown, when checking a converted file against its source, or when rating and
  repairing the fidelity gaps such a check found.
compatibility: Requires the source PDF, a text-extraction tool, and character recognition for image-only pages.
---

# Converting PDF to Markdown

A converted file is a faithful copy of its source in another format. Every passage, table, heading level, list depth,
footnote, and figure in the PDF is present, in the source's reading order, and nothing is added. Verbatim permits
normalizing whitespace; it never permits changing a word.

Extraction and checking tools are the adopter's choice. This skill covers the judgement those tools cannot make.

## Seven Fidelity Dimensions

Judge each dimension separately, because a conversion can be flawless on one and broken on another:

| Dimension          | Holds when                                                                           |
| ------------------ | ------------------------------------------------------------------------------------ |
| text completeness  | every passage of the source appears                                                  |
| text accuracy      | no passage is altered and none is invented                                           |
| heading levels     | each heading sits at the depth its place in the source implies                       |
| nesting depth      | nested lists stay nested at their source depth, never flattened                      |
| structure          | sections follow source reading order, and tables keep their rows, columns, and cells |
| figure coverage    | every figure has a diagram or a placeholder describing it                            |
| technical validity | generated diagrams parse, and text recognized from scanned pages is legible          |

## Infer Structure From Evidence

Take heading depth from section numbering where the source has it: an unnumbered title is the top level, and each
further number level goes one deeper. Font size is the fallback, and a weaker one, since a document's styling is not
always consistent; depth inferred from size alone earns lower confidence. Two structurally different heading levels
never share a depth.

Take list depth from stepped indentation in the extracted layout. Indents only slightly apart are ambiguous: flag the
passage instead of guessing.

Keep running headers and footers only when they carry content, such as a chapter title. Page numbers and decoration are
dropped.

## Represent Figures, Never Invent Them

When a figure's kind can be determined from its caption and labels, draw a diagram of that kind under the repository's
[Diagrams](../../../repo-governance/conventions/writing/diagrams.md) rule and keep the caption beside it. When it
cannot, insert a placeholder that numbers the figure and quotes its caption. A plausible diagram drawn from guesswork is
fabricated content, and worse than a placeholder a person can resolve.

## Scanned Pages

Mark every page whose text came from character recognition, so a checker applies the right tolerance and a reader knows
which text is least certain. Judge recognition quality by its error patterns, such as runs of stray symbols, letters and
digits confused for each other, and words fused together, rather than by whether a page reads plausibly.

## Rating Gaps

[Criticality Levels](../../../repo-governance/development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md)
owns the scale. Applied to conversions:

| Gap                                                                                        | Criticality |
| ------------------------------------------------------------------------------------------ | ----------- |
| a missing section, page, or table; text altered in meaning; recognized text unreadable     | `CRITICAL`  |
| a missing paragraph, footnote, or reference; wrong cell values                             | `HIGH`      |
| a figure with no representation; a diagram that does not parse; sections in inverted order | `HIGH`      |
| a heading two or more levels off; nesting inverted                                         | `HIGH`      |
| one heading or list one level off; a placeholder where the figure's kind was determinable  | `MEDIUM`    |
| missing header or footer content that carried meaning                                      | `MEDIUM`    |
| whitespace, minor punctuation, or a missing recognition marker                             | `LOW`       |

## Repairing Without New Damage

Reread the source for each reported gap before editing; confidence is rated as
[Assessing Criticality and Confidence](../assessing-criticality-confidence/SKILL.md) describes. Treat a repair as
uncertain, and leave it for a person, when it would change one pattern in many places at once, reach outside the
reported location, or overlap another finding's repair. Fix an invalid diagram's syntax without redesigning it, and
restore missing text from the source page, never from a recollection of what it probably said.
