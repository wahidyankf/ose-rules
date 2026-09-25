---
name: programming-clojure
description: >-
  Guides Clojure work under the Clojure standard: turning REPL discoveries into failing tests, placing boundary
  validation, spotting effects and laziness that escape their scope, and replacing collaborators without global state.
when_to_use: >-
  Use when writing, changing, or reviewing Clojure code, before the first test of the change.
compatibility: Requires a Clojure project with its dependency aliases and test command.
---

# Clojure Programming

Every Clojure rule is owned by
[Clojure Standards](../../../repo-governance/development/quality/stacks/clojure-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, and [Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs,
and input that holds in every language. This skill adds only the procedure and judgement of applying them in Clojure.
Where a sentence here seems to state a rule, the standard decides.

## Start From What the Project Records

Read `deps.edn` and its aliases, the formatter and linter configuration, and the boundary-data, test-runner, and failure
choices the adopter recorded. When the change needs a choice not recorded, raise it as a decision rather than picking
one quietly. Run the standard's gates from a fresh process on the untouched tree. A gate already failing before any edit
is handled under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## The REPL Explores; the Test Decides

Evaluating a form shows what the code does right now, which is not a red. Treat a REPL session as the exploratory spike
that Test-Driven Development's scope allows: when it reveals the next behaviour, write that behaviour as a test and
watch it fail before keeping any code the session produced.

Keep exploratory forms inside a `comment` block, which loads without evaluating them. A long-lived REPL drifts from the
files: a removed definition stays loaded, and a missing `require` goes unnoticed, so the final run starts fresh.

## Find Where Trust Ends

Trace each value the change reads from a request, file, queue, or environment to the first function that touches it.
That is where the recorded specification validates it; everything past that point assumes the shape. Write the failing
test with an invalid input first, so the boundary's rejection is itself a tested behaviour.

When a reflection warning appears, hint the parameter at the interop call rather than wrapping the call in a helper that
hides the warning.

## Spot Effects Out of Place

A `swap!`, log call, or database write in the middle of a pipeline marks an effect to move outward into a shell
namespace. Read each lazy expression for when it will actually run:

- an effect inside `map` or `for` may run late or never;
- a sequence returned from `with-open` is read after the resource closed; and
- a dynamic binding present when the sequence was built may be gone when it is consumed.

Realize or restructure each one where the standard directs.

## Replace a Collaborator Without Global State

Pass the collaborator in as an argument or as a component of a system map, and give the test an in-memory
implementation, as [Test Doubles](../../../repo-governance/development/quality/testing/test-doubles.md) prefers. Where
code offers no seam yet, `with-redefs` in a test that never runs concurrently is a stopgap signalling a seam is owed,
per [Test Design](../../../repo-governance/development/quality/testing/test-driven-development/002-test-design.md).

A behaviour that holds across a range of inputs is a candidate for a generative test: state the property first, then the
generator.

## Before Handing Off

- the whole suite and every gate in the standard passed from a fresh process, not only inside the REPL;
- every new boundary validates its input, and a test covers the rejection;
- no effect runs inside a lazy sequence, and nothing lazy escapes a closed resource; and
- each recorded red failed on an assertion about the missing behaviour.
