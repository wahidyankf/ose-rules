---
name: programming-dart
description: >-
  Guides Dart work under the Dart standard: reading the analysis options, replacing each wanted bang or late, decoding
  boundary data, finding unawaited futures and unclosed streams, and controlling time in tests.
when_to_use: >-
  Use when writing, changing, or reviewing Dart code, Flutter application code included, before the first test of the
  change.
compatibility: Requires a Dart or Flutter project with the Dart SDK on the path.
---

# Dart Programming

Every Dart rule is owned by [Dart Standards](../../../repo-governance/development/quality/stacks/dart-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, and [Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs,
and input that holds in every language. This skill adds only the procedure and judgement of applying them in Dart. Where
a sentence here seems to state a rule, the standard decides.

## Start From What the Project Records

Read `pubspec.yaml`, `analysis_options.yaml`, and the failure and value-class choices the adopter recorded. Compare the
analysis options with the standard: a strict mode switched off or a rule set missing is a finding to raise, not a
baseline to copy. Run the standard's gates on the untouched tree. A gate already failing before any edit is handled
under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## Reach a Red That Counts

A test calling a missing member fails analysis, and a body of `throw UnimplementedError()` fails by throwing; neither is
a red. Give the member its signature and a body returning a value the assertion rejects, then run it.

## Replace Each Bang You Reach For

When code wants `!` or `late`, ask what is actually true:

- the value is checked nearby, so copy it into a local and check it; the compiler promotes a checked local where it will
  not promote a field;
- absence has a sensible answer, so return early or supply the default;
- a named parameter has no sensible default, so it is `required` rather than nullable; or
- a lifecycle step truly assigns it before any read, so `late` fits, with that step named in a comment.

## Decode Where Data Arrives

Follow each `jsonDecode`, platform-channel result, or storage read to the first function that touches it. That function
turns the untyped value into a typed one or a named failure; write its failing test with a malformed input first. A
decoded map indexed anywhere deeper is a boundary drawn in the wrong place.

## Find Futures and Streams Left Running

Read each call returning a `Future` and ask who observes its error. The analyzer's rule catches most, but not a future
stored in a variable and never awaited. For each stream controller the change creates, find where it closes; for each
subscription, find the owner whose end cancels it. A subscription never cancelled keeps its listener, and everything the
listener references, alive.

## Control Time in Tests

A test waiting real seconds is slow and eventually intermittent, which
[Intermittent Failures](../../../repo-governance/development/quality/testing/test-driven-development/004-intermittent-failures.md)
rules out. Pass a clock to code reading the time, and run timers and delays under a fake clock that advances on command.

## Before Handing Off

- the format check and the analyzer report nothing, infos included;
- every `!` and `late` added is backed by a check or a named lifecycle step;
- no unit test waits on a real timer or reads the real clock;
- every controller created is closed, and every subscription is cancelled by its owner; and
- each recorded red failed on an assertion about the missing behaviour.
