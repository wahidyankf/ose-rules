---
description: >-
  Defines case selection and execution proof for local test-first cycles while preserving full regression at phase and
  pre-pull-request boundaries.
when_to_use: >-
  Use when choosing a cycle command, recording filtered-run evidence, or planning full regression gates.
---

# Focused Runs and Regression Gates

Reason: keep local feedback short without weakening test-first proof or delivery verification, following
[Evidence Over Assertion](../../../../../principles/evidence-over-assertion.md) and
[Deliberate Problem-Solving](../../../../../principles/deliberate-problem-solving.md).

- For each local red/green increment, run only its named case or smallest named selection needed to exercise the
  behaviour; never rerun the full owning suite for every item.
- After each refactor, run the named regression selection covering the changed behaviour and its affected shared
  boundary, rather than a full-suite run for every item.
- At phase gates and before creating a pull request, run the full affected mandatory regression, coverage, fast gate,
  and applicable integration/end-to-end checks required by the delivery contract. The same passing proof may cover both
  boundaries while its tested scope remains unchanged.
- Record executed case identities and a positive executed-test count for every filtered cycle run. Zero tests, unmatched
  filters, and cached results that did not execute the intended cases are not proof.

Use runner-level case/file filters. A filtered run must not enforce whole-project coverage on code it intentionally does
not execute: use a separate focused runner invocation without that coverage mode, leaving the full coverage target and
its floor unchanged. Preserve required build/code-generation, resource admission, real-resource ownership, and cleanup
guards.

Existing test-first layers, exceptions, coverage floors, hooks, and continuous-integration contracts remain unchanged.
Full integration/end-to-end runs remain separate from the fast gate.

**Followed observations:** red executes the named cases and fails on the intended behaviour assertion; green executes
them and passes; refactor executes affected-boundary cases and passes; phase/pre-PR proof records passing unfiltered
mandatory checks and positive execution counts.

**Violated observations:** a per-item unfiltered command executes unrelated cases; refactor omits a named
affected-boundary case; boundary proof explicitly substitutes filtered cases for a mandatory full gate; or runner output
positively reports zero matched tests.

**Enforcement disposition — unenforced by decision:** the smallest meaningful selection and runner-specific proof depend
on behaviour and boundary context. Plan and execution review inspect commands, executed identities, counts, and boundary
records; no mechanical scanner or gate coverage of local selection or execution order is claimed.
