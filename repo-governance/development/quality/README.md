---
description: >-
  Indexes the quality standards that govern how work is verified and what counts as evidence that it holds, and how code
  is designed, tested, contracted, checked, and kept accessible.
when_to_use: >-
  Use when deciding how a change will be verified, or what a piece of evidence has to contain, or which design, testing,
  contract, accessibility, or repository-check standard applies.
---

# Quality Standards

Verification standards. They answer what proves a change works, and what a proof has to look like to be worth anything
to someone who was not there when it was produced. Design, testing, contract, interface, and repository-check standards
sit alongside them.

## Directory Map

- [Accessibility](accessibility.md) — contrast, focus, keyboard, forms, targets, motion, roles, release check
- [Accessibility Modules](accessibility/README.md) — focus, forms and targets, content and motion, roles, release
- [API Testing](api-testing.md) — contract assertions per test layer, and a direct request before closing
- [Architecture Specifications](architecture-specifications.md) — one as-built architecture model per application, kept
  in sync
- [Architecture Specifications Modules](architecture-specifications/README.md) — model content, and scaling and change
  discipline
- [Automated Quality Gates](automated-quality-gates.md) — which checks run at commit, message, push, and pipeline time
- [Automation Loop Observability](automation-loop-observability.md) — startup preflights and raw error output for
  long-running loops
- [Behaviour-Driven Development](behaviour-driven-development.md) — Gherkin corpora, scenario-first changes, strict
  bindings, scoped exemptions
- [Behaviour-Driven Development Modules](behaviour-driven-development/README.md) — discovery, layers, bindings and
  exemptions, compliance
- [CI Storage Budget](ci-storage-budget.md) — artifact retention, bounded caches, and a spend limit that stops runs
- [Code as Liability](code-as-liability.md) — what added code buys and costs, and which simpler option lost
- [Code Clarity](code-clarity.md) — visible function phases, caller-meaning names, and intent comments
- [Content Preservation](content-preservation.md) — moving condensed content to a linked home without loss
- [Deletion With Proof](deletion-with-proof.md) — what must be demonstrated before something is removed
- [Dependency Selection](dependency-selection.md) — when a dependency is justified, recorded, locked, and removed
- [Design Tokens](design-tokens.md) — tokens as the single authority for visual values and themes
- [Design Tokens Modules](design-tokens/README.md) — notation, value format, and dark activation choices
- [Deterministic and Judgement Validation](deterministic-and-judgement-validation.md) — one owning layer per category,
  and the handoff between layers
- [End-to-End Testing](end-to-end-testing.md) — public-boundary observation, per-case fixtures, gate placement, browser
  cleanup
- [Finding Criticality and Confidence](finding-criticality-and-confidence.md) — ratings, re-validation before a fix,
  priority, and report contents
- [Finding Criticality and Confidence Modules](finding-criticality-and-confidence/README.md) — levels, confidence and
  re-validation, priority and reporting
- [Functional Core, Imperative Shell](functional-core-imperative-shell.md) — a pure decision core, a thin effect shell,
  one-way imports
- [Git Fixture Isolation](git-fixture-isolation.md) — six layers keeping test git commands out of real repositories
- [Hexagonal Architecture](hexagonal-architecture.md) — inward layers, application-owned ports, adapters, composition
  roots
- [Hexagonal Architecture Modules](hexagonal-architecture/README.md) — layers, ports and adapters, composition and
  testing, application shapes
- [Lint Strictness](lint-strictness.md) — failing at warning severity, cleaning a backlog before a gate goes live,
  documented waivers, and reviewed autofixes
- [Live-Service Continuity](live-service-continuity.md) — keeping a user-reachable service available through changes,
  releases, and restarts
- [Live-Service Continuity Modules](live-service-continuity/README.md) — the modules on invariants, release cutover, and
  restart discipline
- [Manual Verification](manual-verification.md) — the layers automation cannot reach, behaviour-change checks, coverage,
  and the evidence they produce
- [Manual Verification Modules](manual-verification/README.md) — eight modules, from gate results to usability probes
- [Markdown Quality](markdown-quality.md) — Markdown formatting and linting, archive exclusion, and rule-set decisions
- [Mechanize Cross-File Invariants](mechanize-cross-file-invariants.md) — one declared source per multi-file rule,
  generated dependents, gate validation
- [OpenAPI Contract-First](openapi-contract-first.md) — an API description as the only authored contract, generated code
  untouched
- [Plan Anti-Hallucination](plan-anti-hallucination.md) — grounding, confidence labels, and refusal for plan claims
- [Plan Anti-Hallucination Modules](plan-anti-hallucination/README.md) — grounding and labels, absence and completeness,
  anti-patterns
- [Preexisting Error Resolution](preexisting-error-resolution.md) — triaging and separately fixing a gate that was
  already failing
- [Preexisting Error Resolution Modules](preexisting-error-resolution/README.md) — the modules on triage and
  investigation and pipeline availability
- [Public Contract](public-contract.md) — a tool's declared surface, and compatible versus breaking changes
- [Repository Check Policy](repository-check-policy.md) — what a new check needs, how it runs, and when it goes
- [Shell Scripts](shell-scripts.md) — one declared interpreter in strict mode, the committed executable bit, explanatory
  comments, and parsed JSON
- [Test Data Isolation](test-data-isolation.md) — synthetic data inside a per-run boundary, removed exactly
