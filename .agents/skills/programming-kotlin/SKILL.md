---
name: programming-kotlin
description: >-
  Guides Kotlin work under the Kotlin standard: reading the build's recorded choices, deciding nullability at Java
  boundaries, replacing each wanted bang, structuring coroutine scope and cancellation, and choosing scope functions.
when_to_use: >-
  Use when writing, changing, or reviewing Kotlin code on the JVM, before the first test of the change.
compatibility: Requires a Kotlin project with its build, lint, and test tasks.
---

# Kotlin Programming

Every Kotlin rule is owned by
[Kotlin Standards](../../../repo-governance/development/quality/stacks/kotlin-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, [Test Doubles](../../../repo-governance/development/quality/testing/test-doubles.md) chooses replacements, and
[Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs, and input
that holds in every language. This skill adds only the procedure and judgement of applying them in Kotlin. Where a
sentence here seems to state a rule, the standard decides.

## Start From What the Build Records

Read the module's `compilerOptions`, whether it is a library in explicit API mode, the formatter and analyser
configuration, the coverage rules, and the test-framework and failure choices the adopter recorded. Compare them with
the standard: a warning left advisory is a finding to raise, not a baseline to copy. Run the standard's gates on the
untouched tree. A gate already failing before any edit is handled under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## Reach a Red That Counts

A test calling a missing function fails to compile, and `TODO()` compiles but fails by throwing; neither is a red. Give
the function its signature and a body returning a value the assertion rejects, then run it.

## Decide Java Values Where They Enter

For each Java call the change adds, ask whether the value can be absent in the case at hand: read the API's
documentation and annotations, then assign the result to the matching Kotlin type on the first line that receives it.
When unsure, choose nullable; a later check is cheap, a null pointer several calls deeper is not.

## Replace Each `!!` You Reach For

When code wants `!!`, choose what the situation actually is: a check the compiler can smart-cast, an Elvis default or
early return, or a type that cannot hold null. When code wants `lateinit`, prefer a constructor parameter unless a
framework or test setup assigns the property.

## Give Each Coroutine an Owner

Before launching, name what cancels the coroutine: a request, a component, or an injected scope closed on shutdown. Look
for blocking calls inside `suspend` functions, such as file, socket, or JDBC access, and move them to the injected
blocking dispatcher. Search each broad `catch` and `runCatching` around suspending code for a path that swallows
cancellation.

## Pick the Scope Function by What It Returns

| Wanted                                        | Function       |
| --------------------------------------------- | -------------- |
| configure an object and keep the object       | `apply`        |
| a side effect, keeping the receiver unchanged | `also`         |
| a result computed from the receiver           | `let` or `run` |

When one scope function nests inside another, `it` or `this` can mean two things; a named local reads better, per
[Code Clarity](../../../repo-governance/development/quality/code/code-clarity.md).

## Before Handing Off

- every gate in the standard passed, coverage verification included;
- every value from a Java API has its nullability decided where it enters, and each `!!` added is backed by a proof;
- every coroutine launched has an owner that cancels it, and no path swallows cancellation; and
- each recorded red failed on an assertion about the missing behaviour.
