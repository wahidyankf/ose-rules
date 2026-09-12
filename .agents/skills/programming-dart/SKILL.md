---
name: programming-dart
description: >-
  Guides Dart work under the shared quality standards: holding the SDK's formatter and analyzer at zero, and judging
  nullable types, late and bang claims, unawaited futures, stream cleanup, and time in tests.
when_to_use: >-
  Use when writing, changing, or reviewing Dart code, Flutter application code included, before the first test of the
  change.
compatibility: Requires a Dart or Flutter project with the Dart SDK on the path.
---

# Dart Programming

The catalog has no Dart stack standard, so this skill works under the standards every language shares.
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, [Lint Strictness](../../../repo-governance/development/quality/checks/lint-strictness.md) sets the threshold, and
[Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs, and input.
The SDK's own formatter, analyzer, and test package are the language's enforced choices; any other tool named below is a
marked example.

## Map the SDK to the Gates

| Target              | In Dart                                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| format              | `dart format --output=none --set-exit-if-changed .`                                  |
| type check and lint | `dart analyze --fatal-infos`, reading the rule set in `analysis_options.yaml`        |
| unit                | `dart test`, or `flutter test` in a Flutter project, collecting coverage in that run |

Lint rules report at info severity by default, so without `--fatal-infos` an enabled rule prints and never fails, the
advisory tier Lint Strictness removes. Example rule set: the recommended set from package:lints.

## Nullability States Something About the Domain

Declare a type nullable only where absence means something to the caller; sound null safety has the compiler hold the
rest.

- `!` asserts presence and throws at runtime when wrong. Copy the value into a local and check it, return early, or use
  a type that cannot be null; the compiler promotes a checked local where it may not promote a field.
- `late` moves the initialization check from compile time to the first read. Keep it for a value truly assigned before
  use that no constructor can supply, such as state set in a lifecycle hook.
- A named parameter with no sensible default is `required`, not nullable.

## Every Future Is Awaited or Deliberately Released

A future that is neither awaited nor handled reports its error nowhere. Await it, return it, or pass it to `unawaited`
with a comment naming why it may run on. Turn this into a finding rather than a habit with the analyzer's rule for
unawaited futures; example: `unawaited_futures`.

## Streams Are Closed by Their Owner

Whoever creates a stream controller closes it, and whoever listens cancels the subscription when its own lifetime ends,
in Flutter inside a widget's `dispose`. A subscription never cancelled keeps its listener, and everything the listener
references, alive.

## Time Is a Parameter

The unit layer excludes a real clock. Pass a clock in for code reading the time, and run code built on timers and delays
under a fake clock that advances on command; example: package:fake_async. A test waiting real seconds is slow, and
eventually one of the intermittent failures
[Intermittent Failures](../../../repo-governance/development/quality/testing/test-driven-development/004-intermittent-failures.md)
rules out.

## Prefer Immutable Values

Use `final` for anything not reassigned, `const` constructors where every field allows one, and collection literals with
spreads and collection `if` to build collections. Records compare by value; a class compares by identity until it
overrides equality, so a value class states its equality deliberately.

## Adopter Decisions

| Decision          | Option                               | Gains                                       | Costs                                                                                                                           |
| ----------------- | ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| expected failures | exceptions                           | the idiom the core libraries follow         | the signature does not show what can fail                                                                                       |
|                   | a sealed result hierarchy            | an exhaustive `switch` makes callers decide | every throwing library call needs wrapping                                                                                      |
| value classes     | equality and copying written by hand | no build step                               | hand-written members drift from the fields                                                                                      |
|                   | generated; example: freezed          | members stay in step with the fields        | a code generator, weighed per [Dependency Selection](../../../repo-governance/development/quality/code/dependency-selection.md) |

Record each choice once.

## Before Handing Off

- the format check and the analyzer report nothing, infos included;
- no unit test waits on a real timer or reads the real clock;
- every controller created is closed, and every subscription is cancelled by its owner; and
- each recorded red failed on an assertion about the missing behaviour.
