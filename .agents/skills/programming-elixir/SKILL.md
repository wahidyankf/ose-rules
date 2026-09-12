---
name: programming-elixir
description: >-
  Guides Elixir work under the shared quality standards: holding the formatter and compiler warnings at zero, and
  judging tagged tuples against raising, when a process is warranted, thin callbacks, and concurrent test isolation.
when_to_use: >-
  Use when writing, changing, or reviewing Elixir code, OTP applications included, before the first test of the change.
compatibility: Requires an Elixir project with Mix and ExUnit.
---

# Elixir Programming

The catalog has no Elixir stack standard, so this skill works under the standards every language shares.
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, [Lint Strictness](../../../repo-governance/development/quality/checks/lint-strictness.md) sets the threshold, and
[Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs, and input.
Mix and ExUnit ship with the language and are its enforced choices; any other tool named below is a marked example.

## Map Mix to the Gates

| Target              | In Elixir                                                                     |
| ------------------- | ----------------------------------------------------------------------------- |
| format              | `mix format --check-formatted`                                                |
| type check and lint | `mix compile --warnings-as-errors`, plus the recorded linter; example: Credo  |
| unit                | `mix test` over unit tests, collecting coverage in that run                   |
| integration         | tests tagged as integration and excluded from the unit run by the test helper |

## Tagged Tuple or Raise

A function whose failure a caller can act on returns `{:ok, value}` or `{:error, reason}`. Chain several with `with`,
and match every error shape the chain can produce in its `else`. A failure only a defect produces raises. The library
convention pairs the two forms: `name` returns a tuple and `name!` raises. Offer the tuple form wherever a caller can
decide, and call the bang form only where failing should crash.

Data arriving at a boundary is cast and validated once into a known shape, and no write goes around that step; example:
an Ecto changeset.

## Let a Supervised Process Crash

Inside a supervised process, a `rescue` that hides an unexpected failure keeps the process running in a state nobody
designed. Handle only what the process can act on, and let anything else crash so its supervisor restarts it from a
known state. Choose the restart strategy from how the children depend on one another:

| Children                                               | Strategy        |
| ------------------------------------------------------ | --------------- |
| independent of one another                             | `:one_for_one`  |
| each later child depends on the ones started before it | `:rest_for_one` |
| so entangled that none is valid after another restarts | `:one_for_all`  |

## A Process Needs a Runtime Reason

Start a process for state that changes over time, for concurrent work, or to isolate failure. Organizing code is not a
reason; a module of functions already does that. When a GenServer is warranted, keep each callback thin: it takes the
message, calls a pure function of the state and the message, and returns what that function decided. Test the pure
function directly, and keep only a few tests for the process itself, as
[Functional Core, Imperative Shell](../../../repo-governance/development/quality/architecture/functional-core-imperative-shell.md)
intends.

## Never Build Atoms From Input

Atoms are never garbage-collected and the atom table has a fixed limit, so converting external input into atoms can take
the whole node down. Use `String.to_existing_atom/1` against a known set, or keep the value a string. Name dynamic
processes through a registry with a `:via` tuple, never through generated atoms.

## Isolate Concurrent Tests

Mark a test module `async: true` only when it touches no global state: application environment, named processes, shared
files, or a database without per-test isolation. Give each database test its own sandboxed transaction; example: the
Ecto SQL sandbox. Replace a collaborator with an in-memory implementation of its behaviour, as
[Test Doubles](../../../repo-governance/development/quality/testing/test-doubles.md) prefers.

## Adopter Decision

| Static analysis                       | Gains                                      | Costs                                           |
| ------------------------------------- | ------------------------------------------ | ----------------------------------------------- |
| the compiler and linter only          | fast checks, no extra tool                 | contradictory types surface only when code runs |
| success typing too; example: Dialyzer | contradictions caught without running code | a slow first analysis and terse messages        |

Record the choice once.

## Before Handing Off

- the format check, the compile with warnings as errors, the recorded linter, and the unit run all passed;
- every `async: true` module touches no global state;
- no atom is created from external input; and
- each recorded red failed on an assertion about the missing behaviour.
