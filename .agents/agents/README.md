---
description: >-
  Indexes the catalog's canonical agent definitions, each declaring what it needs and what it must not do before any
  harness adapter translates that declaration.
when_to_use: >-
  Use when locating a canonical agent definition or deciding what a new one must declare.
---

# Canonical Agents

Agent definitions in their canonical, harness-neutral form. One Markdown file per agent.

An agent here declares what it needs and what it must not do in this repository's own vocabulary, and a harness adapter
translates that declaration into whatever the harness understands. The canonical file is the one a human edits; an
adapter is generated from it and is never edited in place.

## Directory Map

- [agent-maker](agent-maker.md) — drafting a new canonical agent and its adapters
- [api-exploratory-tester](api-exploratory-tester.md) — exploring a live API against its contract
- [bugs-solver](bugs-solver.md) — repairing failing type checks, lint, and tests at the cause
- [ci-checker](ci-checker.md) — auditing test targets, hooks, and pipeline wiring
- [ci-fixer](ci-fixer.md) — applying re-validated gate wiring findings
- [docs-checker](docs-checker.md) — auditing documentation claims against their sources
- [docs-file-manager](docs-file-manager.md) — moving, renaming, and deleting documents with every reference repaired
- [docs-fixer](docs-fixer.md) — applying re-validated documentation findings
- [docs-link-checker](docs-link-checker.md) — checking internal targets resolve and external addresses respond
- [docs-maker](docs-maker.md) — writing documentation pages in one mode with confirmed claims
- [docs-tutorial-checker](docs-tutorial-checker.md) — reviewing tutorials for type, sections, examples, and checkpoints
- [docs-tutorial-fixer](docs-tutorial-fixer.md) — applying re-validated tutorial review findings
- [docs-tutorial-maker](docs-tutorial-maker.md) — writing one tutorial of a declared type
- [gherkin-implementation-reviewer](gherkin-implementation-reviewer.md) — tracing what each scenario binding asserts
- [harness-compatibility-checker](harness-compatibility-checker.md) — auditing bindings for parity and upstream drift
- [harness-compatibility-fixer](harness-compatibility-fixer.md) — repairing binding drift at its canonical source
- [pdf-to-md-checker](pdf-to-md-checker.md) — judging a PDF conversion's fidelity against its source
- [pdf-to-md-fixer](pdf-to-md-fixer.md) — restoring confirmed conversion gaps from the source
- [pdf-to-md-maker](pdf-to-md-maker.md) — converting a PDF to verbatim Markdown
- [plan-checker](plan-checker.md) — auditing a plan draft against the plan specification
- [plan-execution-checker](plan-execution-checker.md) — auditing finished plan execution before archival
- [plan-maker](plan-maker.md) — authoring a formal plan through both decision gates
- [pr-review-architecture-checker](pr-review-architecture-checker.md) — reviewing a change's new tradeoffs, boundaries,
  and dependencies
- [pr-review-docs-checker](pr-review-docs-checker.md) — reviewing a change's documentation for completeness, clarity,
  and drift
- [pr-review-fixer](pr-review-fixer.md) — answering every finding a published review raised on the change
- [pr-review-governance-checker](pr-review-governance-checker.md) — checking a change against the rules its repository
  documents
- [pr-review-instruction-checker](pr-review-instruction-checker.md) — finding toolchain changes the instruction files no
  longer describe
- [pr-review-integrity-checker](pr-review-integrity-checker.md) — finding weakened tests, gamed coverage, and missing
  regression tests
- [pr-review-logic-checker](pr-review-logic-checker.md) — judging a change's behaviour against domain intent and
  acceptance criteria
- [pr-review-performance-checker](pr-review-performance-checker.md) — finding a change's regressions and cost growth on
  exercised paths
- [pr-review-scout](pr-review-scout.md) — classifying a review pass and assembling its shared brief
- [pr-review-security-checker](pr-review-security-checker.md) — finding secrets, injection, and unsafe operations in a
  change
- [pr-review-synthesis-checker](pr-review-synthesis-checker.md) — merging specialist findings into one published review
- [pr-review-types-checker](pr-review-types-checker.md) — finding type escape hatches a change adds or widens
- [readme-checker](readme-checker.md) — auditing READMEs for navigation, scannability, and plain language
- [readme-fixer](readme-fixer.md) — applying re-validated, objective README findings
- [readme-maker](readme-maker.md) — writing or restructuring READMEs as navigation documents
- [repo-explorer](repo-explorer.md) — locating repository evidence with cited files and lines
- [repo-rules-checker](repo-rules-checker.md) — auditing a repository's rules for contradictions and drift
- [repo-rules-fixer](repo-rules-fixer.md) — applying re-validated rule repairs through Rules Propagation
- [repo-rules-maker](repo-rules-maker.md) — authoring a rule at its level inside Rules Propagation
- [repo-setup-manager](repo-setup-manager.md) — proving a checkout's bootstrap, toolchain, and gate baseline before plan
  work
- [repo-workflow-checker](repo-workflow-checker.md) — auditing workflow documents against the workflow pattern
- [repo-workflow-fixer](repo-workflow-fixer.md) — applying re-validated workflow document findings
- [repo-workflow-maker](repo-workflow-maker.md) — writing one workflow document to the workflow pattern
- [specs-checker](specs-checker.md) — auditing listed specification folders for structure and consistency
- [specs-fixer](specs-fixer.md) — applying re-validated specification structure findings
- [specs-maker](specs-maker.md) — creating a specification corpus or its missing parts at a named path
- [swe-code-checker](swe-code-checker.md) — auditing project code against adopted standards and test-first evidence
- [swe-code-fixer](swe-code-fixer.md) — applying re-validated code findings, test-first where a fix needs a test
- [swe-code-maker](swe-code-maker.md) — building behaviour test-first under the adopted and stack standards
- [swe-ui-checker](swe-ui-checker.md) — auditing React component source for tokens, accessibility, and primitives
- [swe-ui-fixer](swe-ui-fixer.md) — applying re-validated interface component findings
- [swe-ui-maker](swe-ui-maker.md) — building React components test-first from an approved design
- [web-design-tester](web-design-tester.md) — judging a live render against cited design ground truth
- [web-exploratory-tester](web-exploratory-tester.md) — exploring a live web interface against its specifications
- [web-researcher](web-researcher.md) — answering outside questions with cited, labelled public sources
- [web-usability-tester](web-usability-tester.md) — judging first use of a live web interface without its specifications
