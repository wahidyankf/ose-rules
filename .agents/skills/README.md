---
description: >-
  Indexes the catalog's canonical skills, one directory per skill, each holding the SKILL.md a harness reads and the
  resources that skill resolves beside it.
when_to_use: >-
  Use when locating a canonical skill or deciding where a new skill's resources belong.
---

# Canonical Skills

Skills in their canonical form. One directory per skill, each containing a `SKILL.md` and whatever resources that skill
resolves relative to its own directory.

Codex and OpenCode read this layout natively, so for those harnesses the canonical file is already the surface and an
adapter would be a second copy of a file they were going to read anyway. Claude Code reads only `.claude/skills/`, so it
is the one harness that needs a generated route.

## Directory Map

- [adopt-artifact](adopt-artifact/SKILL.md) — mapping a catalog artifact into a repository
- [applying-ci-standards](applying-ci-standards/SKILL.md) — judging hooks, pipelines, and test targets
- [applying-content-quality](applying-content-quality/SKILL.md) — ordering and repairing a document's quality passes
- [applying-diataxis-framework](applying-diataxis-framework/SKILL.md) — classifying pages by the reader need served
- [applying-maker-checker-fixer](applying-maker-checker-fixer/SKILL.md) — judgement inside make, check, and fix loops
- [assess-alignment](assess-alignment/SKILL.md) — comparing a repository with the catalog by intent
- [assessing-criticality-confidence](assessing-criticality-confidence/SKILL.md) — rating a finding's consequence and
  certainty
- [assessing-specification-impact](assessing-specification-impact/SKILL.md) — finding the specifications a change
  reaches
- [authoring-documentation](authoring-documentation/SKILL.md) — keeping documentation claims grounded and true
- [checking-harness-compatibility](checking-harness-compatibility/SKILL.md) — telling upstream drift from internal
  parity gaps
- [classifying-review-scope](classifying-review-scope/SKILL.md) — sizing a review pass and choosing disciplines
- [converting-pdf-to-markdown](converting-pdf-to-markdown/SKILL.md) — faithful conversion of a PDF to Markdown
- [creating-accessible-diagrams](creating-accessible-diagrams/SKILL.md) — diagrams every reader can use without colour
- [creating-by-example-tutorials](creating-by-example-tutorials/SKILL.md) — tutorials built from annotated runnable
  examples
- [creating-in-the-field-tutorials](creating-in-the-field-tutorials/SKILL.md) — scenario tutorials with verified output
- [cutting-releases](cutting-releases/SKILL.md) — deciding a version is ready to publish
- [defining-workflows](defining-workflows/SKILL.md) — authoring workflow documents that run repeatably
- [design-fidelity-review](design-fidelity-review/SKILL.md) — judging a render against cited design truth
- [developing-agents](developing-agents/SKILL.md) — drafting a canonical agent definition
- [developing-applications](developing-applications/SKILL.md) — placing layers, errors, logs, and input checks
- [developing-frontend-ui](developing-frontend-ui/SKILL.md) — building interface components test-first
- [exploratory-testing](exploratory-testing/SKILL.md) — charters and tours against a running surface
- [generating-validation-reports](generating-validation-reports/SKILL.md) — audit and fix reports that survive
  interruption
- [grill-me](grill-me/SKILL.md) — resolving a decision through recommended options
- [managing-file-operations](managing-file-operations/SKILL.md) — renaming, moving, and deleting documents safely
- [plan-creating-project-plans](plan-creating-project-plans/SKILL.md) — authoring a formal plan's six documents
- [plan-grooming-idea-briefs](plan-grooming-idea-briefs/SKILL.md) — promoting, keeping, or retiring an idea brief
- [plan-validating-quality](plan-validating-quality/SKILL.md) — judging whether a plan draft is executable
- [plan-verifying-execution](plan-verifying-execution/SKILL.md) — checking delivered work against its plan
- [plan-writing-gherkin-criteria](plan-writing-gherkin-criteria/SKILL.md) — acceptance scenarios that can actually fail
- [practicing-trunk-based-development](practicing-trunk-based-development/SKILL.md) — keeping work on one trunk in small
  pieces
- [producing-review-findings](producing-review-findings/SKILL.md) — raising findings that survive their fix
- [programming-clojure](programming-clojure/SKILL.md) — Clojure work under the shared standards
- [programming-csharp](programming-csharp/SKILL.md) — C# work under the C# standard
- [programming-dart](programming-dart/SKILL.md) — Dart work under the shared standards
- [programming-elixir](programming-elixir/SKILL.md) — Elixir work under the shared standards
- [programming-fsharp](programming-fsharp/SKILL.md) — F# work under the F# standard
- [programming-golang](programming-golang/SKILL.md) — Go work under the shared standards
- [programming-java](programming-java/SKILL.md) — Java work under the Java standard
- [programming-kotlin](programming-kotlin/SKILL.md) — Kotlin work under the shared standards
- [programming-python](programming-python/SKILL.md) — Python work under the shared standards
- [programming-rust](programming-rust/SKILL.md) — Rust work under the Rust standard
- [programming-typescript](programming-typescript/SKILL.md) — TypeScript work under the TypeScript standard
- [propagating-rules](propagating-rules/SKILL.md) — routing rule work through propagation
- [resolving-review-threads](resolving-review-threads/SKILL.md) — answering a published review's findings
- [scaffolding-specifications](scaffolding-specifications/SKILL.md) — creating a specification corpus
- [synthesizing-review-findings](synthesizing-review-findings/SKILL.md) — deduplicating and verifying specialist
  findings
- [understanding-governance-architecture](understanding-governance-architecture/SKILL.md) — reading a repository as
  ordered levels
- [understanding-shared-vocabulary](understanding-shared-vocabulary/SKILL.md) — the terms scope decisions turn on
- [usability-heuristic-evaluation](usability-heuristic-evaluation/SKILL.md) — judging first use by named principles
- [validating-factual-accuracy](validating-factual-accuracy/SKILL.md) — verifying claims against settling sources
- [validating-governance-rules](validating-governance-rules/SKILL.md) — a repository-wide rules check
- [validating-links](validating-links/SKILL.md) — checking links resolve under recorded forms
- [validating-specification-structure](validating-specification-structure/SKILL.md) — judging specification folder
  structure
- [validating-specifications](validating-specifications/SKILL.md) — checking a specification before building
- [writing-browser-e2e-tests](writing-browser-e2e-tests/SKILL.md) — browser tests that act like users
- [writing-readme-files](writing-readme-files/SKILL.md) — a root README template and repairs
