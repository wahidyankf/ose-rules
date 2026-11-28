---
description: >-
  Indexes the ordered modules that hold the layout invariants and the hook and cleanup rules of end-to-end testing.
when_to_use: >-
  Use to locate the module covering geometry tests for layout, or the module covering where end-to-end runs execute and
  how browser runs clean up.
---

# End-to-End Testing Modules

The modules below are read in sequence and carry the detail behind the [End-to-End Testing](../end-to-end-testing.md)
entrypoint.

| Module                                        | Holds                                                                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| [Layout Invariants](001-layout-invariants.md) | geometry tests for touch-target size, horizontal overflow, and short-viewport scroll budgets, at the worst content |
| [Hooks and Cleanup](002-hooks-and-cleanup.md) | keeping the suite out of pre-commit and pre-push, the scheduled full suite, and guaranteed browser cleanup         |

## Directory Map

- [001 Layout Invariants](001-layout-invariants.md)
- [002 Hooks and Cleanup](002-hooks-and-cleanup.md)
