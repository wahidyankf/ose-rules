---
name: defining-workflows
description: >-
  Guides authoring a workflow document that runs the same way twice: recognizing when a procedure is one, avoiding the
  recurring authoring mistakes, and asking the questions mechanical validation cannot answer before publishing.
when_to_use: >-
  Use when writing or revising a workflow document, or when a recurring procedure is about to be written down as one.
compatibility: Requires read access to the agents, skills, and workflows the document will name.
---

# Defining Workflows

[Workflow Pattern](../../../repo-governance/conventions/structure/workflow-pattern.md) owns what a workflow is, its
`Entry`, `Sequence`, and `Exit` contract, the kinds of step, checkpoints, composition, and the checks before a run.
[Capability Forms](../../../repo-governance/development/agents/capability-forms.md) decides whether guidance belongs in
a workflow at all, and [Bounded Convergence](../../../repo-governance/development/workflow/bounded-convergence.md)
governs every repetition. This skill covers the author's judgement those rules leave open.

## First, Test Whether It Is a Workflow

Write the procedure as a plain numbered list before anything else. Then read each item:

- an item that says how to decide well, rather than what to do, is a skill the workflow should link;
- an item that needs its own tools and its own idea of done is an agent the workflow should name; and
- a list with a single item is neither a workflow nor worth one.

Only what remains after moving those out is the sequence.

## Recurring Mistakes

| Mistake                                                     | Why it fails                                                  | Instead                                                        |
| ----------------------------------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------- |
| a parallel step whose parts read what another part writes   | the result depends on which part finished first               | run those parts in order, or move the shared write before them |
| an entry condition such as "when the draft is ready"        | nobody can check readiness                                    | an observable state: a file present, a verdict recorded        |
| inputs, outputs, or steps placed in frontmatter             | the schema is closed, and the contract is hidden from readers | the body sections the convention names                         |
| "repeat until clean" with no limit                          | the loop ends when someone notices                            | a stated limit and the outcome reached at it                   |
| "go back to step 2"                                         | a cycle among steps, which the pre-run check rejects          | the repetition stated inside the step that repeats             |
| a checkpoint whose rejection retries the same work          | a silent loop that looks like progress                        | a rejection that ends the run with a named outcome             |
| a step carrying criteria lists or heuristics                | a second copy of a skill's body, which drifts                 | a link to the skill, and what counts as done                   |
| a step that works only when the named agent is delegated to | a harness without that agent cannot run it                    | steps that hold when the orchestrator performs them itself     |
| a plain metadata value with a colon followed by a space     | the YAML fails to parse, or parses as something else          | a folded scalar                                                |

## Criteria That Discriminate

A step's success criterion is worth writing only if it would be false had the step not run. "Report generated" holds for
an empty file; "the report lists every changed document with a status" does not. Write each criterion as a state a
second person can check without asking the author. Where a workflow carries acceptance scenarios, write them as
[Writing Gherkin Criteria](../plan-writing-gherkin-criteria/SKILL.md) teaches.

## Before Publishing

The convention's pre-run checks confirm structure. These questions cover what structure cannot show:

1. Could someone who was absent start the run from `Entry` alone, and tell from `Exit` alone whether it finished?
2. For each step, what does a failure halfway through leave behind, and will the next run notice it?
3. For each parallel step, what does each part read and write, and do any of them overlap?
4. At each checkpoint, can the person answer from what the prompt shows, without opening another file?
5. Does any step make a judgement that an existing skill already teaches?
6. Is every repetition bounded, with the outcome at its limit named?
7. Does `Example Usage` run as written, using only declared inputs?
8. Does the document name a harness or a tool it does not need?
9. Would it read better as two workflows, one composing the other?
