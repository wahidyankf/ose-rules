---
description: >-
  Fixes how a repository validator reads a file: scope each match to the region its rule governs, anchor and escape
  every pattern, resolve paths from the checked file, decide each edge case, and document every check with its pitfalls.
when_to_use: >-
  Use when writing, reviewing, or debugging a script or agent check that inspects frontmatter, links, or names across a
  repository, or when such a check reports a false positive.
---

# Repository Validation Methodology

A validator that matches the wrong text is worse than none. It flags correct content until people learn to ignore it, or
misses the violation it exists to catch, and either way it looks like a working check. The mistakes behind this recur,
so every check follows one documented method.

This standard implements [Automation Over Manual](../../../principles/automation-over-manual.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Fail Closed](../../../principles/fail-closed.md), and
[One Source Per Fact](../../../principles/one-source-per-fact.md).

[Repository Check Policy](repository-check-policy.md) decides whether a check exists and where it runs, and
[Deterministic and Judgement Validation](deterministic-and-judgement-validation.md) which layer owns it. This standard
fixes how a check reads what it inspects.

## Scope Before Matching

A rule about frontmatter is checked against frontmatter alone: extract the region from the opening delimiter to the
first closing one, then match inside it. Never flag the document body. A Markdown heading begins with `#` just as a YAML
comment does, so a whole-file search for comments reports every heading.

The extraction technique, whether a line-oriented extractor or a parser, is the adopter's; the scoping is the rule.

## Anchor and Escape Every Pattern

- **Anchor field matches** to the start of a line and the key's colon, as `^description:`. An unanchored search also
  matches a value that merely mentions the key.
- **Match case exactly.** YAML keys are case-sensitive, so a case-insensitive search reports a key a parser would never
  find.
- **Escape metacharacters** in any name interpolated into a pattern: `. * [ ] ^ $ \ + ? { } | ( )`. Unescaped, the dot
  in `some.field` also matches `someXfield`. Where a tool offers literal matching, use it for the name and apply the
  anchor separately, since literal mode treats `^` as an ordinary character too.
- **Compare extracted values exactly**, after trimming surrounding whitespace and handling quoting on purpose.

## Resolve From the Checked File

A relative link resolves from the directory of the file that contains it, never from the directory the validator runs
in; otherwise its answer depends on where it started.

Test that the resolved target is a file rather than any existing path, so a link to a directory is caught. Normalize
equivalent spellings, such as `./guide.md` and `guide.md`, before comparing, and handle absolute paths by their own
declared rule.

## Decide Every Edge Case

A missing input file is an error the check reports, never a clean result.

Each check records its decision for every case below, because an undecided case is decided differently by every author:

| Case                                     | Default decision                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| a file with no frontmatter               | report it missing, or skip it where the schema makes frontmatter optional |
| frontmatter with no fields               | report each required field missing                                        |
| an opening delimiter with no closing one | report it malformed; never read the body as frontmatter                   |
| a name a tool fixes, such as `README.md` | exempt from naming rules by declaration                                   |
| a directory outside the rule             | skipped through a declared list, never a hard-coded guess                 |

## Report Findings Consistently

Every finding names the file, the line, the rule broken, the offending content, and what the rule expects. Its order and
message follow the diagnostics rule in
[Shared Value Rules](../../../conventions/structure/artifact-metadata/002-shared-value-rules.md), so two checks never
report one problem two ways.

## Document Every Check

The adopter's method document is the single source for how checks read files. Each check records its pattern, a correct
and an incorrect example, the pitfalls it avoids, and edge-case tests run before anything relies on it.

When a check misfires:

1. confirm that it follows the documented pattern;
2. look for an edge case the pattern does not cover;
3. refine that document; and
4. update every script and agent that applies the pattern, in the same change.

A fix applied in one consumer alone leaves the others running the pattern that failed.

Review applies this method. An adopter enforces the edge-case tests in its own gate or CI.
