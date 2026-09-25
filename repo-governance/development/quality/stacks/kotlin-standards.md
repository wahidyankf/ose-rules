---
description: >-
  Fixes the Kotlin baseline: compiler warnings as errors, explicit API mode for libraries, stable formatter and linter
  gates, nullability decided at Java boundaries, sealed states, owned coroutine scopes, and Kover coverage.
when_to_use: >-
  Use when creating, configuring, or reviewing a Kotlin project on the JVM, or when choosing its compiler options, lint
  tools, failure shape, coroutine structure, test framework, or coverage rules.
---

# Kotlin Standards

This standard is canonical for Kotlin on the JVM. It holds the choices Kotlin and its Gradle plugin leave open, and a
Kotlin programming skill defers here for each rule it applies. A Gradle build script written in Kotlin is build
configuration, not a Kotlin project.

It implements [Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Immutability](../../../principles/immutability.md), [Pure Functions](../../../principles/pure-functions.md), and
[Automation Over Manual](../../../principles/automation-over-manual.md). The committed build wrapper, version catalog,
and plugin versions follow [Native-First Toolchain](../../workflow/native-first-toolchain.md) and
[Reproducibility](../../../principles/reproducibility.md).

## Gates

- **Compiler:** every module sets `allWarningsAsErrors` and `extraWarnings` in `compilerOptions`
  ([compiler options](https://kotlinlang.org/docs/gradle-compiler-options.html)).
- **Explicit API:** a library module enables `explicitApi()`, the strict mode, so every public declaration states its
  visibility and type
  ([explicit API mode](https://kotlinlang.org/docs/whatsnew14.html#explicit-api-mode-for-library-authors)).
- **Format and lint:** a formatter-linter at the official code style, and a static analyser, both on a stable release
  line pinned in the build, never a prerelease major. Their layout rules never overlap. Example: ktlint with
  `ktlint_official` ([ktlint](https://github.com/ktlint/ktlint)) and detekt
  ([detekt](https://github.com/detekt/detekt)).

Each suppression names its rule and reason at the point it applies, as [Lint Strictness](../checks/lint-strictness.md)
requires.

## Type and Boundary Safety

[Type and Boundary Safety](../code/type-and-boundary-safety.md) owns the rule; Kotlin maps it as follows.

- A value from a Java API has a platform type the compiler does not check. Its nullability is decided at the first
  Kotlin line receiving it, by assignment to an explicitly nullable or non-null type.
- `!!` appears only where a check the compiler cannot see proves presence, never to silence an error
  ([null safety](https://kotlinlang.org/docs/null-safety.html)). `lateinit` is kept for a property a framework or test
  setup assigns before any read.
- External data is deserialized into typed classes and validated where it arrives; inner code never reads an untyped
  map.
- A closed set of states is a sealed type, handled in a `when` with no `else` branch, so a new state breaks every site
  that must decide about it.

## Coroutines

Each coroutine launches in a scope whose end something owns, such as a request, a component, or an injected scope
cancelled on shutdown, never a global scope. A `suspend` function never blocks its thread; blocking work moves to a
dispatcher meant for it, and dispatchers are injected. A broad `catch` around suspending code rethrows
`CancellationException`, which `runCatching` also catches.

## Values

Properties are `val` and collections read-only unless mutation is the point. A data class changes through `copy`. A
Boolean argument is passed by name, and code follows the
[official coding conventions](https://kotlinlang.org/docs/coding-conventions.html).

## Tests

Tests keep the unit and integration layers apart as [Test Boundaries and Gates](../testing/test-boundaries-and-gates.md)
requires. Suspending code is tested on a test dispatcher with virtual time, and the unit layer reads no real clock.
Example: `runTest` from kotlinx-coroutines-test.

Coverage follows [Meaningful Coverage](../testing/meaningful-coverage.md). Kover measures lines, instructions, and
branches, and its verification task fails the build below a recorded rule; generated classes are excluded by pattern or
annotation, each with its reason ([Kover](https://kotlin.github.io/kotlinx-kover/gradle-plugin/)). Any floor is recorded
under [Layers and Adapters](../testing/behaviour-driven-development/002-layers-and-adapters.md).

## Documentation

Public declarations carry KDoc, from which a published library generates its reference; example: Dokka
([KDoc](https://kotlinlang.org/docs/kotlin-doc.html)). A behaviour change updates KDoc with the code, as
[Specification Maintenance](../evidence/specification-maintenance.md) and
[Public Contract](../architecture/public-contract.md) require.

## Adopter Decisions

| Decision          | Option                                   | Gains                                       | Costs                                      |
| ----------------- | ---------------------------------------- | ------------------------------------------- | ------------------------------------------ |
| test framework    | JUnit with `kotlin.test` assertions      | one runner shared with any Java tests       | plainer specification style                |
|                   | a Kotlin-first framework, such as Kotest | specification styles and property testing   | a second test idiom beside any Java tests  |
| expected failures | exceptions                               | the JVM idiom, and no wrapping of libraries | the signature does not show what can fail  |
|                   | sealed result types                      | the compiler makes every caller decide      | every throwing library call needs wrapping |

Record each choice once.

## Enforcement

An adopter runs the compiler, format, lint, and coverage verification gates in its own hooks and pipeline. Review
applies boundary nullability, `!!` and `lateinit` claims, coroutine ownership, and the coverage exclusions.
