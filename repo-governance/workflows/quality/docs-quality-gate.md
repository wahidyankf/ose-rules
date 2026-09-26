---
name: docs-quality-gate
description: >-
  Audits human-facing documents on explicit request for stale, obsolete, misplaced, and unreadable documents, handing
  every finding to Docs Propagation and auditing again until two consecutive audits are clean or a ceiling is reached.
when_to_use: >-
  Use when someone explicitly asks for a documentation review, before a release, or to sweep a whole repository.
---

# Docs Quality Gate

## Entry

Someone explicitly names this gate or directs its audit, or [Release Cut](../maintenance/release-cut.md) runs it before
publishing. A change or a propagation run never authorizes it alone.

- `scope` (`enum`: `change`, `all`; required): the documents one change affects, or the whole document set
  [Docs Propagation](../maintenance/docs-propagation.md) defines.
- `change` (`string`, required when `scope` is `change`): the revision range or working-tree change.
- `max-iterations` (`number`, optional, default `7`): the ceiling on audits.

## Sequence

1. **Freeze the snapshot:** scope, revision, and uncommitted paths. A material change other than propagation's repairs
   ends the run as input changed, never restarting it.
2. **Bound the audit.** Under `change`, the documents the change touches and every document citing what it changed;
   under `all`, the whole document set.
3. **Audit without editing.** Decide for each document whether:
   1. every claim is true to the implementation, per
      [Factual Validation](../../conventions/writing/factual-validation.md), and every command shown was run or is
      marked not exercised, per
      [Only What Was Run](../../conventions/structure/documentation-architecture.md#only-what-was-run);
   2. it still describes something the repository has; if not, it is obsolete and its resolution is removal;
   3. each fact has one home, a summary sits above its detail per
      [Progressive Disclosure](../../principles/progressive-disclosure.md), and a page serves one mode per
      [Documentation Architecture](../../conventions/structure/documentation-architecture.md);
   4. a newcomer learns from the opening what it is and why it matters, and finds the next step, per
      [README Quality](../../conventions/writing/readme-quality.md) and
      [Content Quality](../../conventions/writing/content-quality.md), judged by reading, never by a score;
   5. under `all`, or when setup changed, a reader with no prior context can follow the setup exactly as written from a
      clean checkout, each step marked smooth, frustrating, or blocking; and
   6. it agrees with its specification, which is canonical.
4. **Record a finite ledger.** Each row names the document, the gap, the required resolution — update, move, or remove —
   the evidence, and a status: open, resolved, not applicable with evidence, or blocked. Admit only a document that is
   wrong, obsolete, unreachable, or unusable by a newcomer; wording preference is not a finding, per
   [Minimal Sufficiency](../../principles/minimal-sufficiency.md).
5. **Leave machine checks to their tools.** Formatting, links, indexes, and budgets belong to deterministic checks, per
   [Deterministic and Judgement Validation](../../development/quality/checks/deterministic-and-judgement-validation.md);
   the audit consumes their result instead of repeating them.
6. **Hand over.** A clear ledger with the repository's checks passing is a clean audit; otherwise the ledger goes to
   [Docs Propagation](../maintenance/docs-propagation.md), the sole writer. A finding only the owner can decide, such as
   a specification that disagrees with the implementation, is asked through
   [Grill Me](../../../.agents/skills/grill-me/SKILL.md).
7. **Audit again** from step 1, same scope, fresh snapshot. Two consecutive clean audits end the run `pass`. The loop
   continues only while open findings strictly decrease; when they stop, or after `max-iterations` audits, it ends
   `partial`, each remaining finding given a durable owner: fixed, filed as an idea or backlog item, or asked.

The audit may delegate the reading in step 3 to the repository's documentation checkers.

## Exit

Outputs: `final-status` (`enum`: `pass`, `partial`, `input-changed`, `fail`), `audits-completed` (`number`), and the
ledger (`file`, in the scratch location per [Temporary Files](../../conventions/structure/temporary-files.md)).

A handover is not a blocked result: the caller runs propagation and the next audit without another request. An input
change ends the run with its ledger kept; an audit or propagation that cannot run ends it `fail`. A result authorizes no
commit or push.

## Example Usage

```text
Run docs-quality-gate with scope all.
Run docs-quality-gate with scope change for the current branch.
```

## Related Workflows

- [Docs Propagation](../maintenance/docs-propagation.md) repairs every finding, removals included.
- [Release Cut](../maintenance/release-cut.md) runs this gate with scope `all` before publishing.

## Adopter Decision: After a Finding

Record the option. **Repair to zero findings**, this catalog's choice, is the sequence above. **Verdict only** ends at
the first handover, so a second audit needs a second request. Either way the gate never edits a document, and seven
audits is the shared default ceiling, per [Bounded Convergence](../../development/workflow/bounded-convergence.md).

## Why It Runs on Request

Judging whether a document is still true, still needed, and still readable is a reading task. Wired into every change,
it produces noise nobody reads or a pass nobody earned; propagation already refreshes each change. This workflow
implements [Evidence Over Assertion](../../principles/evidence-over-assertion.md) and
[Minimal Sufficiency](../../principles/minimal-sufficiency.md).
