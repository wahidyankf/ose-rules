---
description: >-
  Restricts a gate entry to four fields, requires its command to be an argument vector run without a shell, and leaves
  file filtering to the leaf command.
when_to_use: >-
  Use when adding a gate, or when a gate needs to decide which files to inspect.
---

# Gate Entries

A gate entry contains exactly four fields:

| Field      | Holds                                             |
| ---------- | ------------------------------------------------- |
| `id`       | a stable identifier, unique within the repository |
| `kind`     | exactly `check` or `mutation`                     |
| `run`      | an argument vector                                |
| `surfaces` | the surfaces on which this gate runs              |

No description, no enabled flag, no timeout, no continue-on-error. Each of those turns the list from data into a small
programming language, and the runner into an interpreter of it.

## `run` Is a Vector, Not a String

`run` is a list of arguments, executed directly. No shell, no interpolation, no globbing, no word splitting.

A command string is executed by a shell, and a shell rewrites it: it expands globs against the current directory, splits
on whitespace, and interprets quotes, `$`, and `&&`. A path with a space then becomes two arguments, and a filename
containing a metacharacter becomes an instruction.

The vector form has no such layer. What is written is what runs.

## The Runner Passes Through

The runner validates configuration completely, selects gates by the requested surface, preserves declaration order,
executes each argument vector directly, forwards hook arguments and standard input unchanged, stops at the first nonzero
result, and prints a sanitized summary.

It exports the selected surface to the child in the environment, so a gate that behaves differently before a commit than
in continuous integration can tell which it is in without being told twice.

That is the whole runner. It is not a task scheduler and does not retry, parallelize, or continue past a failure.

## Leaf Commands Own Filtering

The runner never decides which files a gate should inspect.

It cannot. A formatter, a linter, and a secret scanner disagree about what "the changed files" means, and each already
knows the answer for itself. A runner guessing on their behalf would be wrong in a different way for each one, and the
gate would silently check a smaller set than anyone believed.

## Identifiers Are Stable

A gate's `id` appears in summaries, evidence records, and any exclusion someone writes. Renaming one silently breaks
every reference; a gate whose meaning changes gets a new identifier.
