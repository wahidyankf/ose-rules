---
description: >-
  Fixes the Lua baseline: a declared runtime version, annotations checked by a language server at strict severity,
  formatter and linter gates, no accidental globals, runtime checks at external input, and returned failures.
when_to_use: >-
  Use when creating, configuring, or reviewing Lua, whether standalone or embedded in a host program, or when choosing
  its runtime version, diagnostics, linter, or failure style.
---

# Lua Standards

This standard is canonical for Lua, standalone or embedded in a host program. It holds the choices Lua leaves open, and
a Lua programming skill defers here for each rule it applies. Lua has no official style guide, so the rules below rest
on the reference manual and the tools named as examples.

It implements [Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Fail Closed](../../../principles/fail-closed.md), and
[Automation Over Manual](../../../principles/automation-over-manual.md). The runtime and tool versions follow
[Native-First Toolchain](../../workflow/native-first-toolchain.md) and
[Reproducibility](../../../principles/reproducibility.md).

## Runtime Version

Every project declares the Lua version it runs on, in the language server's committed configuration. Embedded Lua runs
on the host's interpreter, so the declared version is the host's, and the host's own API is declared to the checker as a
library definition rather than as undefined globals. Features newer than the declared version are never used.

## Gates

- **Type check:** a language server's diagnostics run as a batch check over the committed configuration, with the type
  and strictness groups raised to error and the weak nil and union checks off. Example: LuaLS with a `.luarc.json` and
  `--check` at warning level ([settings](https://luals.github.io/wiki/settings/)).
- **Format:** one formatter in check mode. Example: `stylua --check`.
- **Lint:** a linter over committed configuration. Example: selene or luacheck.

Findings fail at the threshold [Lint Strictness](../checks/lint-strictness.md) sets, and each diagnostic disabled in
place carries its reason.

## Type and Boundary Safety

Language-server annotations are Lua's static types under
[Type and Boundary Safety](../code/type-and-boundary-safety.md). In Lua:

- Every function a module exports annotates its parameters and returns, and a table with a fixed shape is a declared
  class.
- `any` is never written in an annotation; unknown data is checked with `type()` before use.
- A cast annotation is a waiver with its reason.
- A value from outside the program, such as a decoded file, a host callback argument, or user input, is checked for type
  and shape where it arrives, because annotations are not checked at runtime.

## Language Defaults

- Every variable and function is `local`. A global is created only deliberately, declared where the runtime supports
  declarations ([manual](https://www.lua.org/manual/5.5/manual.html#2.2)); otherwise the linter flags it.
- A module returns one table and never writes to the global environment.
- The length operator is used only on a sequence; a table that may hold `nil` gaps tracks its own count
  ([length operator](https://www.lua.org/manual/5.5/manual.html#3.4.7)).
- A binding that must not change is `<const>`, and a resource that must be released is `<close>`, where the runtime
  supports both.

## Failures

An expected failure is returned as `nil` followed by an error value, the convention the standard library follows, and
every caller checks it. `error` is raised for programmer errors and broken invariants, with a message or error table
naming what failed. A boundary that must survive a failure catches it with `pcall` or `xpcall` and handles or reports
it; a caught error is never discarded ([Programming in Lua](https://www.lua.org/pil/8.4.html)).

## Tests

Tests follow [Test Boundaries and Gates](../testing/test-boundaries-and-gates.md), with the host API injected so domain
logic runs under unit tests outside the host. Code that runs only inside the host is tested through the host where
possible, and an omission states its reason. Example: busted.

Lua coverage counts lines, not branches, so no branch figure is claimed. Code the instrument cannot reach inside a host
is outside the measurement, per [Meaningful Coverage](../testing/meaningful-coverage.md). Example: LuaCov. Any floor is
recorded under [Layers and Adapters](../testing/behaviour-driven-development/002-layers-and-adapters.md).

## Documentation

The annotations on an exported function are its reference documentation, with a description stating behaviour and each
failure it returns. A change to observable behaviour updates them per
[Specification Maintenance](../evidence/specification-maintenance.md).

## Adopter Decisions

The adopter records the declared runtime, the host library definitions, and the linter in the repository adapter
[Stack Packs](../../../conventions/structure/stack-packs.md) defines.

## Enforcement

The language server, formatter, and linter enforce the gates in the adopter's own hooks and pipeline. Review applies
boundary checks, the failure convention, and the runtime-version rule.
