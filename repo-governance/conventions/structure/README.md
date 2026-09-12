---
description: >-
  Indexes the structure conventions, which govern how files, directories, and multi-document sets are shaped and named,
  how governance and plans are organized, and how repositories relate.
when_to_use: >-
  Use when naming a file, laying out a directory or repository, splitting a document, or shaping a plan.
---

# Structure Conventions

Structure conventions answer where something goes and what it is called. They exist because a reader — human or agent —
should be able to predict a path before opening it, and a validator should be able to check that prediction
mechanically.

| Convention                                                  | Governs                                                                |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| [Artifact Metadata](artifact-metadata.md)                   | the frontmatter every governed artifact family carries                 |
| [File Naming](file-naming.md)                               | how files and directories are named, and how a document splits         |
| [Repository Configuration](repository-configuration.md)     | what a repository is, and what must pass before a change lands         |
| [Plans](plans.md)                                           | the plan system: lifecycle, documents, delivery, and archival          |
| [Plan Specification Changes](plan-specification-changes.md) | how a plan states its specification and architecture delta             |
| [Plan Migrations](plan-migrations.md)                       | how a plan preserves data and structure through a transition           |
| [Plan UI Design](plan-ui-design.md)                         | how a plan carries interface exploration, assets, and device proof     |
| [Capability Naming](capability-naming.md)                   | the scope-first grammar for agent and workflow names                   |
| [CI Workflow File Naming](ci-workflow-file-naming.md)       | how a CI workflow's filename follows from its declared name            |
| [Coordination Repository](coordination-repository.md)       | routing work to owning repositories without transferring ownership     |
| [Directory Indexes](directory-indexes.md)                   | the README index every indexed directory carries                       |
| [Document Word Budget](document-word-budget.md)             | the word ceiling on instruction and governance documents, and repair   |
| [Documentation Architecture](documentation-architecture.md) | where documentation lives and the one mode each page serves            |
| [Governance Layers](governance-layers.md)                   | what each governance level answers and which level wins a conflict     |
| [Licensing](licensing.md)                                   | the root licensing model, exceptions, and dependency-license decisions |
| [Monorepo Layout](monorepo-layout.md)                       | dependency direction and project boundaries inside a monorepo          |
| [Principle Traceability](principle-traceability.md)         | how each rule traces to the principles it implements                   |
| [Related Repositories](related-repositories.md)             | parity, consumption, and knowledge-sharing relationships               |

## Directory Map

- [Artifact Metadata](artifact-metadata.md)
- [Artifact Metadata Modules](artifact-metadata/README.md)
- [File Naming](file-naming.md)
- [File Naming Modules](file-naming/README.md) — portable characters, dated and numbered names, and source filenames
- [Repository Configuration](repository-configuration.md)
- [Repository Configuration Modules](repository-configuration/README.md)
- [Plans Convention](plans.md)
- [Plans Convention Modules](plans/README.md)
- [Plan Validator Contract](plan-validator-contract.md)
- [Plan Validator Contract Modules](plan-validator-contract/README.md)
- [Plan Specification Changes](plan-specification-changes.md)
- [Plan Migrations](plan-migrations.md)
- [Plan Migrations Modules](plan-migrations/README.md) — the source inventory and contracts, then transition and
  recovery
- [Plan UI Design](plan-ui-design.md)
- [Capability Naming](capability-naming.md)
- [CI Workflow File Naming](ci-workflow-file-naming.md)
- [Coordination Repository](coordination-repository.md)
- [Directory Indexes](directory-indexes.md)
- [Document Word Budget](document-word-budget.md)
- [Documentation Architecture](documentation-architecture.md)
- [Governance Layers](governance-layers.md)
- [Licensing](licensing.md)
- [Licensing Modules](licensing/README.md) — the repository licensing model, and dependency-license decisions
- [Monorepo Layout](monorepo-layout.md)
- [Principle Traceability](principle-traceability.md)
- [Related Repositories](related-repositories.md)
