---
description: >-
  Indexes the catalog's canonical agent definitions, each declaring what it needs and what it must not do before any
  harness adapter translates that declaration.
when_to_use: >-
  Use when locating a canonical agent definition or deciding what a new one must declare.
---

# Canonical Agents

Agent definitions in their canonical, harness-neutral form. One Markdown file per agent.

Each declares what it needs and must not do in this repository's vocabulary; a harness adapter translates that. A human
edits the canonical file, and an adapter is generated from it, never edited in place.

## Directory Map

- [agent-maker](agent-maker.md) — drafting a new canonical agent and its adapters
- [ci-checker](ci-checker.md) — auditing test targets, hooks, and pipeline wiring
- [ci-fixer](ci-fixer.md) — applying re-validated gate wiring findings
- [content-checker](content-checker.md) — judging published pages for writing, facts, links, and adapter rules
- [content-fixer](content-fixer.md) — repairing published pages from a frozen ledger and cited sources
- [docs-checker](docs-checker.md) — auditing documentation claims against their sources
- [docs-file-manager](docs-file-manager.md) — moving, renaming, and deleting documents with every reference repaired
- [docs-fixer](docs-fixer.md) — applying re-validated documentation findings
- [docs-link-checker](docs-link-checker.md) — checking internal targets resolve and external addresses respond
- [docs-maker](docs-maker.md) — writing documentation pages in one mode with confirmed claims
- [docs-tutorial-checker](docs-tutorial-checker.md) — reviewing tutorials for type, sections, examples, and checkpoints
- [docs-tutorial-fixer](docs-tutorial-fixer.md) — applying re-validated tutorial review findings
- [docs-tutorial-maker](docs-tutorial-maker.md) — writing one tutorial of a declared type
- [harness-checker](harness-checker.md) — auditing bindings for upstream drift and parity
- [harness-fixer](harness-fixer.md) — repairing binding drift at its canonical source through Harness Propagation
- [pdf-to-md-checker](pdf-to-md-checker.md) — judging a PDF conversion's fidelity against its source
- [pdf-to-md-fixer](pdf-to-md-fixer.md) — restoring confirmed conversion gaps from the source
- [pdf-to-md-maker](pdf-to-md-maker.md) — converting a PDF to verbatim Markdown
- [plan-checker](plan-checker.md) — auditing a plan draft against the plan specification
- [plan-execution-checker](plan-execution-checker.md) — auditing finished plan execution before archival
- [plan-fixer](plan-fixer.md) — repairing the rows of a frozen plan ledger through Plan Propagation
- [plan-maker](plan-maker.md) — authoring a formal plan through both decision gates
- [pr-review-checker](pr-review-checker.md) — coordinating one review pass and publishing its single consolidated review
- [pr-review-docs-checker](pr-review-docs-checker.md) — reviewing a change's documentation for completeness and drift
- [pr-review-fixer](pr-review-fixer.md) — answering every finding a published review raised on the change
- [pr-review-governance-checker](pr-review-governance-checker.md) — checking a change against the rules its repository
  documents
- [pr-review-instruction-checker](pr-review-instruction-checker.md) — finding toolchain changes the instruction files no
  longer describe
- [pr-review-integrity-checker](pr-review-integrity-checker.md) — finding weakened tests, gamed coverage, and missing
  regression tests
- [pr-review-logic-checker](pr-review-logic-checker.md) — judging a change's behaviour against domain intent and
  acceptance criteria
- [pr-review-performance-checker](pr-review-performance-checker.md) — finding a change's regressions and cost growth
- [pr-review-scout](pr-review-scout.md) — classifying a review pass and assembling its shared brief
- [pr-review-security-checker](pr-review-security-checker.md) — finding secrets, injection, and unsafe operations in a
  change
- [pr-review-types-checker](pr-review-types-checker.md) — finding type escape hatches a change adds or widens
- [readme-checker](readme-checker.md) — auditing READMEs for navigation, scannability, and plain language
- [readme-fixer](readme-fixer.md) — applying re-validated, objective README findings
- [readme-maker](readme-maker.md) — writing or restructuring READMEs as navigation documents
- [repo-explorer](repo-explorer.md) — locating repository evidence with cited files and lines
- [repo-rules-maker](repo-rules-maker.md) — authoring a rule at its level inside Rules Propagation
- [repo-setup-manager](repo-setup-manager.md) — proving a checkout's bootstrap, toolchain, and gate baseline
- [repo-workflow-checker](repo-workflow-checker.md) — auditing workflow documents against the workflow pattern
- [repo-workflow-fixer](repo-workflow-fixer.md) — applying re-validated workflow document findings
- [repo-workflow-maker](repo-workflow-maker.md) — writing one workflow document to the workflow pattern
- [rules-checker](rules-checker.md) — auditing a repository's rules for contradictions and drift
- [rules-fixer](rules-fixer.md) — applying re-validated rule repairs through Rules Propagation
- [specs-checker](specs-checker.md) — auditing listed specification folders for structure and consistency
- [specs-fixer](specs-fixer.md) — applying re-validated specification structure findings
- [specs-maker](specs-maker.md) — creating a specification corpus or its missing parts at a named path
- [swe-api-tester](swe-api-tester.md) — judging a running request-based interface by contract or exploration
- [swe-architect](swe-architect.md) — designing boundaries before a build, reviewing it after, and the architecture
  review lens
- [swe-debugger](swe-debugger.md) — repairing failing type checks, lint, and tests at the cause
- [swe-developer](swe-developer.md) — building behaviour test-first and applying re-validated findings
- [swe-infra-tester](swe-infra-tester.md) — judging applied infrastructure through plans, check modes, and read-only
  probes
- [swe-orchestrator](swe-orchestrator.md) — decomposing a deterministic goal and dispatching the swe family until its
  checks pass
- [swe-releaser](swe-releaser.md) — cutting releases, deploying artifacts, and repinning tools through documented
  workflows
- [swe-reviewer](swe-reviewer.md) — auditing code, component source, and scenario bindings against adopted standards
- [swe-usability-tester](swe-usability-tester.md) — judging first use of a live interface or tool without its
  specifications
- [swe-web-tester](swe-web-tester.md) — judging a live web interface by spec, design, or exploratory charter
- [tutorial-annotated-concept-checker](tutorial-annotated-concept-checker.md) — judging an annotated-concept tutorial
- [tutorial-annotated-concept-fixer](tutorial-annotated-concept-fixer.md) — repairing what each worked example itself
  settles
- [tutorial-by-example-checker](tutorial-by-example-checker.md) — judging a By Example tutorial's examples against the
  kind's rules
- [tutorial-by-example-fixer](tutorial-by-example-fixer.md) — repairing what each By Example example itself settles
- [tutorial-in-the-field-checker](tutorial-in-the-field-checker.md) — judging an in-the-field guide's scenario and code
- [tutorial-in-the-field-fixer](tutorial-in-the-field-fixer.md) — repairing what each in-the-field step itself settles
- [tutorial-primer-checker](tutorial-primer-checker.md) — judging a primer's scope, capstone, and examples
- [tutorial-primer-fixer](tutorial-primer-fixer.md) — repairing a primer's examples within its stated scope
- [web-researcher](web-researcher.md) — answering outside questions with cited, labelled public sources

## Old-to-New Map

Each agent the swe family replaced, and where its work went.

| Replaced agent                    | New agent              | Mode or charter   |
| --------------------------------- | ---------------------- | ----------------- |
| `swe-code-maker`                  | `swe-developer`        | build             |
| `swe-ui-maker`                    | `swe-developer`        | build (UI skills) |
| `swe-code-fixer`, `swe-ui-fixer`  | `swe-developer`        | apply findings    |
| `ui-web-fixer`, `api-http-fixer`  | `swe-developer`        | apply findings    |
| `bugs-solver`                     | `swe-debugger`         | —                 |
| `swe-code-checker`                | `swe-reviewer`         | code              |
| `swe-ui-checker`                  | `swe-reviewer`         | interface         |
| `gherkin-implementation-reviewer` | `swe-reviewer`         | scenario trace    |
| `ui-web-checker`                  | `swe-web-tester`       | spec              |
| `web-design-tester`               | `swe-web-tester`       | design            |
| `web-exploratory-tester`          | `swe-web-tester`       | exploratory       |
| `web-usability-tester`            | `swe-usability-tester` | —                 |
| `api-http-checker`                | `swe-api-tester`       | contract          |
| `api-exploratory-tester`          | `swe-api-tester`       | exploratory       |
| `pr-review-architecture-checker`  | `swe-architect`        | lens              |
| `apps-*-deployer` (per app)       | `swe-releaser`         | deploy            |
