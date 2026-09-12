---
description: >-
  Indexes the stack standards: the enforced gates, defaults, and design rules one language or framework adds, each
  adopted only by a repository that builds with that stack.
when_to_use: >-
  Use when a repository builds with a language or framework that has a stack standard, or when deciding whether a rule
  belongs to one stack or to every repository.
---

# Stack Standards

Stack standards. Each governs one language or framework by design: it records the normative choices that stack's
repositories enforce, and links the language-neutral standards instead of restating them. A repository adopts a stack
standard only when it uses that stack, and the stack's programming skill defers to it.

## Directory Map

- [C# Standards](csharp-standards.md) — C# on .NET gates for nullable references, analyzers, warnings, and formatting,
  the long-term-support runtime line, shared build files, and asynchronous and failure defaults
- [C# Standards Modules](csharp-standards/README.md) — C# domain-type shapes, the architecture test, and test rules
- [F# Standards](fsharp-standards.md) — F# formatter and warnings gates, dependency-ordered compilation, a functional
  core, F# domain and failure types, and the adopter's framework choices
- [Java Standards](java-standards.md) — long-term-support runtimes, the committed build wrapper, formatter and coverage
  gates, and Java rules for data, injection, contracts, and failures
- [Next.js Standards](nextjs-standards.md) — App Router with static rendering and server components by default, client
  components at interactive leaves, declared caching, validated server actions, and loading and error states
- [Next.js Standards Modules](nextjs-standards/README.md) — the version line and hosting decisions, and framework
  markers
- [React Standards](react-standards.md) — function components with typed props, hooks and accessibility lint rules,
  state in its narrowest home with server data in a query cache, logic outside components, and client-side security
- [React Standards Modules](react-standards/README.md) — store, query, and form library decisions, and example tools
- [Rust Standards](rust-standards.md) — explicit editions, rustfmt and pedantic Clippy gates, forbidden unsafe code, one
  async runtime and serialization framework, and typed errors, with the edition floor left to the adopter
- [Rust Standards Modules](rust-standards/README.md) — Rust code organisation, domain-type shapes, and security rules
- [TypeScript Standards](typescript-standards.md) — compiler floor, strict compiler options, no any or unchecked
  assertions, Result values for expected failures, and the type check, lint, and format gates
