---
description: >-
  Indexes the testing standards: which layer and gate a test belongs to, how tests come first, what API, behaviour, and
  end-to-end tests assert, and how tests isolate data and fixtures.
when_to_use: >-
  Use when deciding how a change is tested, which test layer or gate applies, or how a test isolates its data and
  fixtures.
---

# Testing Standards

Testing standards. They answer which test proves a behaviour, where it runs, and what a test may replace or touch.

## Directory Map

- [API Testing](api-testing.md) — contract assertions per test layer, and a direct request before closing
- [Behaviour-Driven Development](behaviour-driven-development.md) — Gherkin corpora, scenario-first changes, strict
  bindings, scoped exemptions
- [Behaviour-Driven Development Modules](behaviour-driven-development/README.md) — discovery, layers, bindings and
  exemptions, compliance
- [End-to-End Testing](end-to-end-testing.md) — public-boundary observation, per-case fixtures, gate placement, browser
  cleanup
- [Git Fixture Isolation](git-fixture-isolation.md) — six layers keeping test git commands out of real repositories
- [Test Boundaries and Gates](test-boundaries-and-gates.md) — what each test boundary excludes, separate suites, gates
  composed from named targets, the fast gate, and gating coverage
- [Test Data Isolation](test-data-isolation.md) — synthetic data inside a per-run boundary, removed exactly
- [Test-Driven Development](test-driven-development.md) — test-first red, green, and refactor cycles for behaviour
  changes and bug fixes, with scope and exemptions
- [Test-Driven Development Modules](test-driven-development/README.md) — cycle evidence, test design, regression tests,
  and intermittent failures
