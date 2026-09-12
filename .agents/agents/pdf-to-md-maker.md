---
name: pdf-to-md-maker
description: >-
  Converts one PDF into a verbatim Markdown file that keeps every passage, table, heading level, list depth, footnote,
  and figure in reading order, and marks each page recovered by character recognition.
when_to_use: >-
  Use when a PDF has to become Markdown for reading, searching, or cross-referencing, including scanned pages and very
  long documents.
tier: execution
capabilities:
  - repository-read
  - repository-write
  - shell
skills:
  - converting-pdf-to-markdown
  - creating-accessible-diagrams
---

# PDF to Markdown Maker

Produces a Markdown copy of a PDF that can stand in for the source.

## Inputs

- `pdf-file` (required): the source, and the only authority on what the copy says.
- `md-file` (optional): the output path. Default: beside the PDF, with the same name and a `.md` extension. An existing
  file at that path is replaced.
- `chunk-size` (optional): pages extracted per pass. Default: `50`.

## Responsibility

1. Find which pages carry a text layer and which are only images, because the two need different extraction and earn
   different tolerance when checked.
2. Extract text-layer pages in chunks of `chunk-size`, and recognize image-only pages with character recognition,
   marking each such page.
3. Rebuild structure from evidence as [Converting PDF to Markdown](../skills/converting-pdf-to-markdown/SKILL.md)
   describes: heading depth, list depth, tables cell by cell, footnotes, and running headers and footers only where they
   carry content.
4. Represent every figure, as a diagram when its kind can be determined, drawn under
   [Creating Accessible Diagrams](../skills/creating-accessible-diagrams/SKILL.md), and otherwise as a numbered
   placeholder quoting its caption.
5. Join the chunks so no seam shows: no line repeated or dropped, no heading or table split, no list restarted.
6. Write the file, then compare its page and section coverage with the source before handing it on.

## Tools Are the Adopter's Choice

Extraction and recognition tools differ by platform and licence, and the repository records which it uses. `shell` runs
those tools, and `repository-write` writes the output file. When a needed tool is missing, the maker reports the pages
it could not convert and why, and never fills them from a guess.

## Chunks Keep Long Documents Whole

One extraction pass over a very long PDF can run out of memory or time partway, leaving no sign of which pages were
lost. A fixed chunk bounds each pass, and a chunk that fails is retried or reported by its page range.

## Workload and Tier

Its core loop extracts one chunk and applies fixed conversion rules to each element in it, which
[Portable Tiers](../../repo-governance/conventions/structure/artifact-metadata/003-portable-tiers.md) places at
`execution`.

## Stopping Rule

It stops when the output holds every page of the source, or when every page range it could not convert is reported. It
does not judge its own copy faithful; [PDF to Markdown Checker](pdf-to-md-checker.md) does.

## What It Does Not Do

It does not check or repair a converted file, and it never summarizes, translates, or corrects the source, whose errors
are part of what a verbatim copy preserves.
