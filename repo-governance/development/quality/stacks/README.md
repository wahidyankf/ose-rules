---
description: >-
  Indexes the stack standards: the enforced gates, defaults, and design rules one language or framework adds, each
  adopted only by a repository that builds with that stack.
when_to_use: >-
  Use when a repository builds with a language or framework that has a stack standard, or when deciding whether a rule
  belongs to one stack or to every repository.
---

# Stack Standards

Stack standards for the 24 catalog stacks: languages, frameworks, infrastructure, and tooling. Each governs one stack by
design: it records the normative choices that stack's repositories enforce, and links the language-neutral standards
instead of restating them. A repository adopts a stack standard only when it uses that stack, and the stack's skill
defers to it. Placement, inheritance, and the inventory that selects them follow
[Stack Packs](../../../conventions/structure/stack-packs.md).

## Directory Map

- [Ansible Standards](ansible-standards.md) — ansible-lint profile and yamllint gates, validated role inputs, idempotent
  tasks, check and diff runs, and Molecule or ansible-test verification
- [ASP.NET Core Standards](aspnet-core-standards.md) — on the .NET language baseline: startup-validated options,
  validated requests and typed results, service lifetimes, and in-process host tests
- [C# Standards](csharp-standards.md) — nullable, analyzer, warning, and format gates, the long-term-support runtime,
  shared build files, and async and failure defaults
- [C# Standards Modules](csharp-standards/README.md) — C# domain-type shapes, the architecture test, and test rules
- [Clojure Standards](clojure-standards.md) — formatter and linter gates, reflection warnings as failures, data
  specifications at external input, and line and form coverage
- [Dart Standards](dart-standards.md) — formatter and analyzer gates with strict type modes, typed decoding at
  boundaries, handled futures, and coverage scope
- [Elixir Standards](elixir-standards.md) — warnings-as-errors gates, Dialyzer over declared typespecs, tagged-tuple
  failures, processes only for a runtime reason, and line coverage
- [F# Standards](fsharp-standards.md) — F# formatter and warnings gates, dependency-ordered compilation, a functional
  core, F# domain and failure types, and the adopter's framework choices
- [Gin Standards](gin-standards.md) — on the Go standard: error-returning binding, request context kept from goroutines,
  explicit trusted proxies, and recorder-based router tests
- [Giraffe Standards](giraffe-standards.md) — on the F# and ASP.NET Core standards: typed routes, strict binding and
  validation at the edge, and one result-to-response mapping
- [Go Standards](golang-standards.md) — gofmt, vet, and linter gates, every error handled or returned, consumer-declared
  interfaces, owned goroutines, and statement coverage
- [Java Standards](java-standards.md) — long-term-support runtimes, the committed build wrapper, formatter and coverage
  gates, and Java rules for data, injection, contracts, and failures
- [JavaScript Standards](javascript-standards.md) — JSDoc type checking under strict options, runtime validation at
  external input, handled promises, and type check, lint, and format gates
- [Kotlin Standards](kotlin-standards.md) — warnings as errors, explicit API mode for libraries, formatter and linter
  gates, nullability at Java boundaries, and Kover coverage
- [Lua Standards](lua-standards.md) — a declared runtime, annotations checked at strict severity, formatter and linter
  gates, no accidental globals, and returned failures
- [Next.js Standards](nextjs-standards.md) — App Router with static rendering and server components by default, declared
  caching, validated server actions, and loading and error states
- [Next.js Standards Modules](nextjs-standards/README.md) — the version line and hosting decisions, and framework
  markers
- [Nx Standards](nx-standards.md) — over each project's packs: tagged graph boundaries, affected runs from a correct
  base, real inferred targets, and complete cache inputs
- [Phoenix LiveView Standards](phoenix-liveview-standards.md) — on the Elixir standard: logic behind contexts, verified
  routes, authorization at every live entry point, streams, and live tests
- [Python Standards](python-standards.md) — annotated signatures checked by Pyright in strict mode, formatter and linter
  gates, validated boundaries, narrow exceptions, and branch coverage
- [React Standards](react-standards.md) — typed function components, hooks and accessibility lint, state in its
  narrowest home, server data in a query cache, and client security
- [React Standards Modules](react-standards/README.md) — store, query, and form library decisions, and example tools
- [Rust Standards](rust-standards.md) — explicit editions, rustfmt and pedantic Clippy gates, forbidden unsafe code, one
  async runtime and serializer, and typed errors
- [Rust Standards Modules](rust-standards/README.md) — Rust code organisation, domain-type shapes, and security rules
- [Shell Standards](shell-standards.md) — beyond Shell Scripts: a supported dialect, analyser and formatter gates,
  quoted and validated input, and behaviour tests without coverage
- [Spring Boot Standards](spring-boot-standards.md) — on the Java standard: managed dependency versions, validated
  configuration properties and requests, persistence defaults, and narrow test contexts
- [Terraform Standards](terraform-standards.md) — format, validate, and lint gates, typed variables, pinned versions and
  lock file, no state in history, and native tests plus plan review
- [TypeScript Standards](typescript-standards.md) — compiler floor, strict compiler options, no any or unchecked
  assertions, Result values for expected failures, and the type check, lint, and format gates
