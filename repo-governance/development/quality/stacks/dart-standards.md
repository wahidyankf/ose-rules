---
description: >-
  Fixes the Dart baseline: the SDK formatter and analyzer as failing gates with strict type modes and infos fatal, typed
  decoding at boundaries, handled futures and closed streams, failure and value shapes, and coverage scope.
when_to_use: >-
  Use when creating, configuring, or reviewing a Dart or Flutter project, or when choosing its analysis options, failure
  shape, value classes, test clock, or coverage collection.
---

# Dart Standards

This standard is canonical for Dart, Flutter application code included. It holds the choices Dart and its SDK leave
open, and a Dart programming skill defers here for each rule it applies.

It implements [Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Immutability](../../../principles/immutability.md), [Pure Functions](../../../principles/pure-functions.md), and
[Automation Over Manual](../../../principles/automation-over-manual.md). The SDK constraint in `pubspec.yaml` and the
committed `pubspec.lock` follow [Native-First Toolchain](../../workflow/native-first-toolchain.md) and
[Reproducibility](../../../principles/reproducibility.md).

## Gates

- **Format:** `dart format --output=none --set-exit-if-changed .` ([dart format](https://dart.dev/tools/dart-format)).
- **Type check and lint:** `dart analyze --fatal-infos` ([dart analyze](https://dart.dev/tools/dart-analyze)). Lint
  rules report at info severity, so without `--fatal-infos` an enabled rule never fails, the advisory tier
  [Lint Strictness](../checks/lint-strictness.md) removes.
- **Analysis options:** a committed `analysis_options.yaml` includes a maintained rule set and sets `strict-casts`,
  `strict-inference`, and `strict-raw-types` under `analyzer: language:`
  ([analysis options](https://dart.dev/tools/analysis)). Example: `package:lints/recommended.yaml`, plus
  `unawaited_futures`.

An `// ignore:` comment names the rule and states its reason on the same line.

## Type and Boundary Safety

[Type and Boundary Safety](../code/type-and-boundary-safety.md) owns the rule; Dart maps it as follows.

- The strict modes stop `dynamic` flowing silently into typed code. A signature never declares `dynamic`; a value of
  unknown type is `Object?` and is checked before use ([design](https://dart.dev/effective-dart/design)).
- Decoded JSON and other external data become typed values where they arrive, through a constructor that checks each
  field's type, for example with a pattern match, and returns or throws a named failure. Inner code never indexes a
  decoded map.
- A type is nullable only where absence means something to the caller. `!` and `late` never silence the analyzer: `!`
  appears only where a check the compiler cannot see proves presence, and `late` only for a value a lifecycle step
  assigns before any read.

## Asynchrony

Every future is awaited, returned, or passed to `unawaited` with a comment naming why it may run on. Whoever creates a
stream controller closes it, and whoever listens cancels its subscription when its own lifetime ends, in Flutter inside
the owning widget's `dispose`.

## Failures and Values

A `catch` names the type it handles with `on`, and code never catches `Error`, which marks a programming fault
([usage](https://dart.dev/effective-dart/usage)). Anything not reassigned is `final`, a constructor is `const` where
every field allows it, and a value class states its equality deliberately, because a class compares by identity until it
overrides equality.

## Tests

`package:test` runs the tests, through `dart test` or, in Flutter, `flutter test`, with integration tests kept apart as
[Test Boundaries and Gates](../testing/test-boundaries-and-gates.md) requires. The unit layer reads no real clock: code
takes a clock as a parameter, and timers run under a fake clock. Example: package:fake_async.

Coverage follows [Meaningful Coverage](../testing/meaningful-coverage.md). The coverage tooling reports lines by default
and functions and branches when asked; example: `coverage:test_with_coverage --branch-coverage`
([package:coverage](https://pub.dev/packages/coverage)). Generated sources are excluded with their reason, and any floor
is recorded under [Layers and Adapters](../testing/behaviour-driven-development/002-layers-and-adapters.md).

## Documentation

A public declaration carries a `///` doc comment opening with a one-sentence summary
([documentation](https://dart.dev/effective-dart/documentation)); a published package also enables
`public_member_api_docs`. A behaviour change updates the comments with the code, as
[Specification Maintenance](../evidence/specification-maintenance.md) and
[Public Contract](../architecture/public-contract.md) require.

## Adopter Decisions

| Decision          | Option                               | Gains                                       | Costs                                                                                 |
| ----------------- | ------------------------------------ | ------------------------------------------- | ------------------------------------------------------------------------------------- |
| expected failures | exceptions                           | the idiom the core libraries follow         | the signature does not show what can fail                                             |
|                   | a sealed result hierarchy            | an exhaustive `switch` makes callers decide | every throwing library call needs wrapping                                            |
| value classes     | equality and copying written by hand | no build step                               | hand-written members drift from the fields                                            |
|                   | generated, such as with freezed      | members stay in step with the fields        | a code generator, weighed per [Dependency Selection](../code/dependency-selection.md) |

Record each choice once.

## Enforcement

An adopter runs the format and analyze gates and the test run in its own hooks and pipeline. Review applies boundary
decoding, the `!` and `late` claims, future and stream ownership, and the coverage exclusions.
