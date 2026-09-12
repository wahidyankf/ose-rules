---
name: programming-kotlin
description: >-
  Guides Kotlin work under the shared quality standards: mapping the build to the named gates, and judging nullability
  at Java boundaries, coroutine scope and cancellation, closed state types, and the choice of scope function.
when_to_use: >-
  Use when writing, changing, or reviewing Kotlin code on the JVM, before the first test of the change.
compatibility: Requires a Kotlin project with its build, lint, and test tasks.
---

# Kotlin Programming

The catalog has no Kotlin stack standard, so this skill works under the standards every language shares.
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, [Lint Strictness](../../../repo-governance/development/quality/checks/lint-strictness.md) sets the threshold,
[Test Doubles](../../../repo-governance/development/quality/testing/test-doubles.md) chooses replacements, and
[Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs, and input.
Any tool named below is a marked example.

## Map the Build to the Gates

| Target          | In Kotlin                                                              |
| --------------- | ---------------------------------------------------------------------- |
| type check      | compilation with every warning treated as an error                     |
| lint and format | the recorded Kotlin linter and formatter; example: ktlint and detekt   |
| unit            | the build's test task over unit tests, collecting coverage in that run |

## Treat Java Values as Unknown

A value returned by a Java API has a platform type: the compiler neither proves it present nor makes callers check it.
Decide its nullability at the first Kotlin line that receives it, by assigning it to an explicitly nullable or non-null
type, so the uncertainty ends at the boundary instead of surfacing as a null pointer several calls deeper.

## `!!` and `lateinit` Are Claims

`!!` asserts presence without proving it. Replace it with a check the compiler smart-casts, an Elvis default or early
return, or a type that cannot hold null. `lateinit` postpones the same claim until the first read; keep it for a
property a framework or test setup assigns before any read, and take a constructor parameter everywhere else.

## Coroutines Live Inside an Owned Scope

- Launch each coroutine in a scope whose end is owned, such as a request, a component, or an injected scope cancelled on
  shutdown, never a global scope nobody cancels.
- A `suspend` function never blocks its thread; a blocking call moves to a dispatcher intended for it.
- Inject dispatchers instead of naming them inline, so a test runs on a test dispatcher with virtual time; the unit
  layer excludes a real clock. Example: `runTest` from kotlinx-coroutines-test.
- A broad `catch` around suspending code must rethrow `CancellationException`, and `runCatching` catches it too, so
  rethrow it explicitly. Swallowing it leaves a cancelled coroutine running as if nothing happened.

## Closed States Are Sealed

Model a closed set of states as a sealed interface or class, and handle it in a `when` with no `else` branch, so adding
a state breaks compilation at every site that must decide about it. A data class holds `val` properties and changes
through `copy`, keeping values immutable as [Immutability](../../../repo-governance/principles/immutability.md) asks.

## Pick the Scope Function by What It Returns

| Wanted                                        | Function       |
| --------------------------------------------- | -------------- |
| configure an object and keep the object       | `apply`        |
| a side effect, keeping the receiver unchanged | `also`         |
| a result computed from the receiver           | `let` or `run` |

Never nest one scope function inside another: once `it` or `this` could mean two things, a named local reads better, per
[Code Clarity](../../../repo-governance/development/quality/code/code-clarity.md).

## Adopter Decisions

| Decision          | Option                                    | Gains                                       | Costs                                      |
| ----------------- | ----------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| test framework    | JUnit with kotlin.test assertions         | one runner shared with any Java tests       | plainer specification style                |
|                   | a Kotlin-first framework; example: Kotest | specification styles and property testing   | a second test idiom beside any Java tests  |
| expected failures | exceptions                                | the JVM idiom, and no wrapping of libraries | the signature does not show what can fail  |
|                   | sealed result types                       | the compiler makes every caller decide      | every throwing library call needs wrapping |

Record each choice once.

## Before Handing Off

- compilation with warnings as errors, the recorded linter and formatter, and the unit run all passed;
- every value from a Java API has its nullability decided where it enters;
- every coroutine launched has an owner that cancels it; and
- each recorded red failed on an assertion about the missing behaviour.
