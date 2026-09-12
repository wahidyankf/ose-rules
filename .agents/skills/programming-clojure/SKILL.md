---
name: programming-clojure
description: >-
  Guides Clojure work under the shared quality standards: turning REPL discoveries into failing tests, keeping effects
  at namespace edges, realizing lazy sequences before resources close, and replacing collaborators without global state.
when_to_use: >-
  Use when writing, changing, or reviewing Clojure code, before the first test of the change.
compatibility: Requires a Clojure project with its dependency aliases and test command.
---

# Clojure Programming

With no Clojure stack standard, this skill works under the shared standards.
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle,
[Functional Core, Imperative Shell](../../../repo-governance/development/quality/architecture/functional-core-imperative-shell.md)
places effects, [Lint Strictness](../../../repo-governance/development/quality/checks/lint-strictness.md) sets the
threshold, and [Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors,
logs, and input. `clojure.test`, which ships with the language, is its enforced choice; any other tool named below is a
marked example.

## Map the Tools to the Gates

| Target          | In Clojure                                                                                           |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| format and lint | example: cljfmt and clj-kondo                                                                        |
| type check      | omitted: no built-in static checker                                                                  |
| unit            | `clojure.test` through the recorded test runner, collecting coverage in that run; example: cloverage |

## The REPL Explores; the Test Decides

Evaluating a form shows what the code does right now, which is not a red. Treat a REPL session as the exploratory spike
that Test-Driven Development's scope allows: when it reveals the next behaviour, write that behaviour as a test and
watch it fail before keeping any code the session produced.

Keep exploratory forms inside a `comment` block, which loads without evaluating them. A long-lived REPL drifts from the
files: a removed definition stays loaded, and a missing `require` goes unnoticed.

## Namespaces Follow Their Paths

One namespace per file, named after its path, with each namespace hyphen written as an underscore in the file name.
Require each namespace under an alias, or refer named symbols explicitly; `:refer :all` and `use` hide where a symbol
came from.

## Keep Effects at the Edge

Functions over immutable data hold the decisions. Input and output, atoms, and every other state change sit in shell
namespaces. A `swap!`, log call, or database write mid-pipeline marks an effect to move outward.

## Realize Laziness Before It Bites

A lazy sequence does its work when consumed, not when it is built:

- an effect placed inside `map` may run late or never, so effects use `run!` or `doseq`;
- a lazy sequence returned from inside `with-open` is read after the resource has closed, so realize it inside, with
  `doall` or `into`; and
- a dynamic binding present when the sequence was built may be gone when it is consumed.

## Replace a Collaborator Without Global State

`with-redefs` swaps a var for every thread, so tests using it cannot run in parallel and can leak into each other, which
[Test Design](../../../repo-governance/development/quality/testing/test-driven-development/002-test-design.md) forbids.
Pass the collaborator in as an argument or as a component of a system map, and give the test an in-memory
implementation, as [Test Doubles](../../../repo-governance/development/quality/testing/test-doubles.md) prefers. Where
code offers no seam yet, `with-redefs` in a never-concurrent test is a stopgap signalling a seam is owed.

A behaviour that holds across a range of inputs also earns a generative test; example: test.check.

## Adopter Decisions

| Decision          | Option                                       | Gains                                               | Costs                                                                                                                       |
| ----------------- | -------------------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| boundary data     | the spec library bundled with Clojure        | no added dependency; instrumentation in development | its namespace is still marked alpha                                                                                         |
|                   | a data-driven schema library; example: Malli | schemas are plain data to store and transform       | a dependency, weighed per [Dependency Selection](../../../repo-governance/development/quality/code/dependency-selection.md) |
| test runner       | `clojure.test` through a CLI alias           | the fewest tools                                    | fewer reporters and no watch mode                                                                                           |
|                   | a dedicated runner; example: Kaocha          | watch mode, plugins, and focused runs               | one more tool to pin                                                                                                        |
| expected failures | `ex-info` carrying data                      | keeps the stack trace                               | callers must know what to catch                                                                                             |
|                   | a returned result map                        | failures stay ordinary data                         | every caller branches on it                                                                                                 |

Record each choice once.

## Before Handing Off

- the whole suite passed from a fresh process, not only inside the REPL;
- the format and lint gates report nothing;
- no effect runs inside a lazy sequence, and nothing lazy escapes a closed resource; and
- each recorded red failed on an assertion about the missing behaviour.
