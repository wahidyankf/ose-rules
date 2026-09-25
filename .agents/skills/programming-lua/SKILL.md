---
name: programming-lua
description: >-
  Guides Lua work under the Lua standard: confirming the runtime and host the code runs in, annotating as it is written,
  separating host calls from logic a test can reach, and choosing between a returned failure and a raised error.
when_to_use: >-
  Use when writing, changing, or reviewing Lua code, standalone or embedded in a host program, before the first test of
  the change.
compatibility: Requires a Lua project with a declared runtime version and a committed language server configuration.
---

# Lua Programming

Every Lua rule is owned by [Lua Standards](../../../repo-governance/development/quality/stacks/lua-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, and [Developing Applications](../developing-applications/SKILL.md) carries the judgement that holds in every
language. This skill adds only the procedure and judgement of applying them in Lua. Where a sentence here seems to state
a rule, the standard decides.

## Start From What the Project Records

Read the declared runtime version and the host library definitions in the language server configuration, then the
linter's configuration. Know which host runs the code: a feature the declared version lacks, or a host function the
definitions do not describe, fails there, not in the checker. Run the diagnostics check, the formatter check, the
linter, and the tests on the untouched tree. A gate already failing is handled under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## Annotate as You Write

Write a function's annotations before its body: parameters, returns, and the failure it can return. A table passed
between functions gets a declared class the first time a second function reads it; after that, every mismatched field is
a diagnostic rather than a runtime `nil`. When the checker reports a possible `nil`, decide whether the value can really
be absent. If it can, handle it; if it cannot, the type is wrong where it was declared.

## Separate the Host From the Logic

Host calls, such as editor, engine, or operating-system functions, are the shell. A decision that reads them directly
can be tested only inside the host. Pass the values the decision needs as arguments, or pass the host functions in, so
the decision runs under the unit test runner with no host. The host-facing layer stays thin enough that its tests,
through the host where possible, have little to prove.

## Choose How a Failure Leaves

| The situation                                        | Usually                                                   |
| ---------------------------------------------------- | --------------------------------------------------------- |
| a caller in normal operation can act on it           | return `nil` and an error value, and test the caller      |
| it means the code itself is wrong                    | raise with `error`, naming what failed                    |
| a callback into the host must not take the host down | catch at that boundary with `pcall`, and report the error |
| a library you call raises for an ordinary outcome    | wrap that call with `pcall` and return the failure        |

A `pcall` whose error result is ignored hides the failure; each one handles or reports what it caught.

## Watch for the Quiet Mistakes

- An assignment to a misspelled name creates a global instead of failing; the linter reports it only if it runs.
- A table that had an element removed from the middle has a gap, and its length is no longer reliable.
- An equality test between a string and a number is always false, never an error.
- From Lua 5.3 on, `/` always yields a float and `//` floors; code for an older runtime cannot use `//`.

## Before Handing Off

- The diagnostics check, formatter check, linter, and tests pass.
- Every exported function is annotated, and no annotation says `any`.
- Every value from the host or from outside is checked where it arrives.
- Every expected failure is returned, and every `pcall` handles what it catches.
- Each recorded red failed on an assertion about the missing behaviour.
