---
description: >-
  Defines the portable repository configuration schema: its small top-level key set, its ordered gate list, and how a
  repository extends it.
when_to_use: >-
  Use when writing or validating a repository configuration file, or when adding a gate.
---

# Repository Configuration

One small file describes what a repository is and what must pass before a change lands. Everything else a repository
needs lives where that thing already lives.

The file is small on purpose. Configuration attracts fields — each individually reasonable, collectively a second, worse
place for facts that already have a home.

The catalog ships no runner or validator for this file. Where a module below says a declaration fails or is refused, the
adopter's own runner, its configuration validator, or the command that reads that section is what fails or refuses it.

## Modules

1. [Top-Level Schema](repository-configuration/001-top-level-schema.md)
2. [Gate Entries](repository-configuration/002-gate-entries.md)
3. [Surfaces and Mutation](repository-configuration/003-surfaces-and-mutation.md)
4. [Governance Categories](repository-configuration/004-governance-categories.md)

## What It Is Not

Not a build configuration, not a dependency manifest, not a place for tool settings. A formatter's configuration belongs
to the formatter; a test runner's belongs to the test runner.

The one thing this file owns that nothing else can is the ordered list of what must pass, and where.
