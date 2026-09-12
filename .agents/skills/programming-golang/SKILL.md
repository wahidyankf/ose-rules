---
name: programming-golang
description: >-
  Guides Go work under the shared quality standards: mapping the Go toolchain to the named gates, placing tests by the
  boundary they touch, and judging error forms, interface placement, goroutine ownership, and context use.
when_to_use: >-
  Use when writing, changing, or reviewing Go code in a module, before the first test of the change.
compatibility: Requires a Go module with the Go toolchain on the path.
---

# Go Programming

The catalog has no Go stack standard, so this skill works under the standards every language shares.
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle, [Lint Strictness](../../../repo-governance/development/quality/checks/lint-strictness.md) sets the threshold, and
[Developing Applications](../developing-applications/SKILL.md) carries the judgement on layers, errors, logs, and input.
Go's own toolchain is its enforced choice; other tools appear only as marked examples.

## Map the Toolchain to the Gates

| Target      | In Go                                                                   |
| ----------- | ----------------------------------------------------------------------- |
| format      | `gofmt -l` lists no file                                                |
| type check  | `go build ./...`                                                        |
| lint        | `go vet ./...`, plus the recorded linter set; example: golangci-lint    |
| unit        | `go test` over unit tests with `-race`, collecting coverage in that run |
| integration | tests touching real resources, selected apart from the unit run         |

## Place a Test by What It Touches

`t.TempDir`, `t.Setenv`, a real listener, and a child process each reach a boundary the unit layer excludes, so a test
using one belongs to the integration selection. To keep a decision under unit test, pass in the content, an `io.Reader`,
an `fs.FS`, or the setting's value.

In a table-driven test, name each row for the behaviour it proves, so a failure names it too. A row for a new behaviour
is a new cycle: add it, watch it fail, then change the code.

## Choose the Form of an Error

| Callers need to                 | Form                                                       |
| ------------------------------- | ---------------------------------------------------------- |
| test for one specific condition | an exported sentinel value, compared with `errors.Is`      |
| read details out of the failure | an exported error type, extracted with `errors.As`         |
| only report or pass it on       | a wrapped error with context through `%w`, and no identity |

An exported sentinel or type joins the package's
[Public Contract](../../../repo-governance/development/quality/architecture/public-contract.md), so export one only when
a caller needs it. Never branch on message text. A `panic` signals a programmer error or a failed startup, never a
failure a caller could handle.

## Declare the Interface Where It Is Used

Declare an interface in the package that consumes it, sized to the methods that consumer calls, and let the
implementation return its concrete type. An interface sitting beside its only implementation "for testing" usually
belongs with the caller, which is also where
[Hexagonal Architecture](../../../repo-governance/development/quality/architecture/hexagonal-architecture.md) puts a
port.

## Give Every Goroutine an Owner

Before starting a goroutine, name who waits for it and what tells it to stop. One nobody waits for leaks on the first
error path; one with no stop signal outlives its request.

- Take `context.Context` as the first parameter of every call that may wait, and never keep it in a struct field.
- Use a channel to hand over a value or signal completion, and a mutex to guard state several goroutines read.
- The race detector sees only races that ran.

## Adopter Decisions

| Decision              | Option                               | Gains                                 | Costs                                                                                                                       |
| --------------------- | ------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| assertions            | the standard `testing` package only  | no dependency                         | longer comparisons and hand-written diffs                                                                                   |
|                       | a library; example: testify          | shorter assertions and readable diffs | a dependency, weighed per [Dependency Selection](../../../repo-governance/development/quality/code/dependency-selection.md) |
| integration selection | a build tag on each integration file | tests stay beside their package       | a forgotten tag moves a test into unit                                                                                      |
|                       | a separate test directory            | the layer is visible from the path    | tests reach only the exported API                                                                                           |

Record each choice once.

## Before Handing Off

- `gofmt`, the build, vet, and the recorded linters report nothing, and the unit run passed with the race detector;
- every returned error is handled or returned, never discarded;
- every goroutine added has an owner and a stop signal;
- randomness that protects anything comes from `crypto/rand`; and
- each recorded red failed on an assertion, never on a build error or a panicking stub.
