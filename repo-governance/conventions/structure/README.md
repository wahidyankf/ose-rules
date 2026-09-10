---
description: >-
  Indexes the structure conventions, which govern how files, directories, and multi-document sets are shaped and named.
when_to_use: >-
  Use when naming a file, laying out a directory, or splitting a document into an ordered companion set.
---

# Structure Conventions

Structure conventions answer where something goes and what it is called. They exist because a reader — human or agent —
should be able to predict a path before opening it, and a validator should be able to check that prediction
mechanically.

| Convention                                              | Governs                                                        |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| [Artifact Metadata](artifact-metadata.md)               | the frontmatter every governed artifact family carries         |
| [File Naming](file-naming.md)                           | how files and directories are named, and how a document splits |
| [Repository Configuration](repository-configuration.md) | what a repository is, and what must pass before a change lands |
| [Plans](plans.md)                                       | the plan system: lifecycle, documents, delivery, and archival  |

## Directory Map

- [Artifact Metadata](artifact-metadata.md)
- [File Naming](file-naming.md)
- [Artifact Metadata Modules](artifact-metadata/README.md)
- [Repository Configuration](repository-configuration.md)
- [Repository Configuration Modules](repository-configuration/README.md)
- [Plans Convention](plans.md)
- [Plans Convention Modules](plans/README.md)
- [Plan Validator Contract](plan-validator-contract.md)
- [Plan Validator Contract Modules](plan-validator-contract/README.md)
