---
description: >-
  Indexes the catalog's governance artifacts by the level of authority each one carries, from vision down to workflows.
when_to_use: >-
  Use when locating a governance artifact or deciding which authority level a new one belongs to.
---

# Repository Governance

The catalog's governance artifacts, organized by the level of authority each one carries.

Levels are compared in order — `vision > principles > conventions > development > workflows` — and a lower level never
contradicts a higher one. Placing an artifact is therefore a decision about what kind of statement it is, not about
where it happens to fit.

| Level          | Holds                                                            |
| -------------- | ---------------------------------------------------------------- |
| `vision/`      | outcomes and boundaries: what the system is for                  |
| `principles/`  | durable constraints that outlive any particular repository       |
| `conventions/` | repository choices — the decisions a repository makes for itself |
| `development/` | engineering standards and practices                              |
| `workflows/`   | procedures: the ordered steps for doing a thing                  |

## Directory Map

- [Conventions](conventions/README.md)
- [Development](development/README.md)
- [Workflows](workflows/README.md)

The remaining levels are populated as their artifacts are authored. This root was created first, and on its own, so that
the repository's foundation — license, instructions, gate, hooks, CI, and public-safety layer — could be proven green
before any governance prose was written against it.
