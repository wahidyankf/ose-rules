---
description: >-
  Fixes the Clojure baseline: formatter and static linter gates, reflection warnings as failures, explicit data
  specifications validated at external input, namespace and laziness rules, and line and form coverage.
when_to_use: >-
  Use when creating, configuring, or reviewing a Clojure project, or when choosing how it validates boundary data,
  reports failures, runs its tests, or measures coverage.
---

# Clojure Standards

This standard is canonical for Clojure on the JVM. It holds the choices Clojure and its CLI leave open, and a Clojure
programming skill defers here for each rule it applies.

It implements [Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Immutability](../../../principles/immutability.md), [Pure Functions](../../../principles/pure-functions.md), and
[Automation Over Manual](../../../principles/automation-over-manual.md). `deps.edn` coordinates and tool versions follow
[Native-First Toolchain](../../workflow/native-first-toolchain.md) and
[Reproducibility](../../../principles/reproducibility.md).

## Gates

- **Format:** the formatter runs in check mode with committed settings and fails on any unformatted file. Example:
  `cljfmt check` reading `.cljfmt.edn` ([cljfmt](https://github.com/weavejester/cljfmt)).
- **Lint:** a static analyser over source and test paths fails on warnings, reading a committed configuration. Example:
  `clj-kondo --lint src test --fail-level warning` with `.clj-kondo/config.edn`
  ([clj-kondo](https://github.com/clj-kondo/clj-kondo)).
- **Reflection:** every namespace using Java interop sets `*warn-on-reflection*` to true, and the build that loads the
  namespaces fails on a printed reflection warning. A type hint resolves each one
  ([Java interop](https://clojure.org/reference/java_interop)).

Each suppression names its reason where it applies, as [Lint Strictness](../checks/lint-strictness.md) requires.

## Type and Boundary Safety

[Type and Boundary Safety](../code/type-and-boundary-safety.md) owns the rule; Clojure maps it as follows.

- Clojure has no static type checker, so the type check target is omitted with that reason. The linter's type-mismatch
  checks catch some errors and prove nothing
  ([clj-kondo types](https://github.com/clj-kondo/clj-kondo/blob/master/doc/types.md)).
- Data from outside the program is validated against an explicit data specification where it arrives, and inner code
  relies on the validated shape. The call is explicit validation or coercion in production code, never instrumentation:
  spec instrumentation checks arguments only and is meant for development and tests
  ([spec guide](https://clojure.org/guides/spec)).

## Namespaces and Effects

One namespace per file, named after its path. A namespace requires others under an alias or refers named symbols, never
through `:refer :all` or `use`. A function never calls `def`, and a dynamic var's name carries earmuffs, as the
[community style guide](https://guide.clojure.style/) sets out.

Decisions are functions over immutable data. Input and output, atoms, and every other state change live in shell
namespaces, as [Functional Core, Imperative Shell](../architecture/functional-core-imperative-shell.md) requires.

## Laziness

No effect runs inside a lazy sequence: effects use `run!` or `doseq`. A lazy sequence built inside `with-open` or a
dynamic binding is realized there, never returned unrealized past the scope it depends on.

## Tests

`clojure.test` is the test framework, run through a recorded runner, with integration tests kept out of the unit run as
[Test Boundaries and Gates](../testing/test-boundaries-and-gates.md) requires. A test replaces a collaborator by passing
it in, never by `with-redefs` in a test that may run in parallel with another. A behaviour holding across a range of
inputs also gets a generative test; example: test.check.

Coverage follows [Meaningful Coverage](../testing/meaningful-coverage.md). Clojure instruments lines and forms, not
branches; example: cloverage, with generated namespaces excluded by pattern and each exclusion's reason recorded
([cloverage](https://github.com/cloverage/cloverage)). Which measure carries any floor is recorded under
[Layers and Adapters](../testing/behaviour-driven-development/002-layers-and-adapters.md).

## Documentation

Every public var carries a docstring; an implementation detail is private through `defn-` or `^:private`. A behaviour
change updates docstrings and specifications with the code, as
[Specification Maintenance](../evidence/specification-maintenance.md) and
[Public Contract](../architecture/public-contract.md) require.

## Adopter Decisions

| Decision          | Option                                                                          | Gains                                         | Costs                                                                             |
| ----------------- | ------------------------------------------------------------------------------- | --------------------------------------------- | --------------------------------------------------------------------------------- |
| boundary data     | the spec library bundled with Clojure                                           | no added dependency                           | its namespace is still marked alpha                                               |
|                   | a data-driven schema library, such as [Malli](https://github.com/metosin/malli) | schemas are plain data to store and transform | a dependency, weighed per [Dependency Selection](../code/dependency-selection.md) |
| test runner       | `clojure.test` through a CLI alias                                              | the fewest tools                              | fewer reporters and no watch mode                                                 |
|                   | a dedicated runner, such as Kaocha                                              | watch mode, plugins, and focused runs         | one more tool to pin                                                              |
| expected failures | `ex-info` carrying a data map                                                   | keeps the stack trace                         | callers must know what to catch                                                   |
|                   | a returned result map                                                           | failures stay ordinary data                   | every caller branches on it                                                       |

Record each choice once.

## Enforcement

An adopter runs the format, lint, and reflection gates and the test run in its own hooks and pipeline. Review applies
boundary validation, namespace and effect placement, laziness, and test isolation.
