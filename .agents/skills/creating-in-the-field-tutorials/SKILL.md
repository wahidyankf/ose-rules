---
name: creating-in-the-field-tutorials
description: >-
  Guides writing in-the-field tutorials: one concrete scenario narrated step by step with verified output, checkpoints,
  and recovery notes, the built-in approach before any framework, and production-complete code.
when_to_use: >-
  Use when writing or reviewing a tutorial that teaches through a realistic working scenario, or one that introduces a
  framework or library for production use.
compatibility: Requires an environment matching the scenario, in which every step can be run as written.
---

# Creating In-the-Field Tutorials

Teaching from inside a scenario is an approach, not a tutorial type. The tutorial still declares exactly one type from
[Tutorial Types](../../../repo-governance/conventions/writing/tutorial-types.md), usually Intermediate for a production
guide, and carries the sections [Tutorial Structure](../../../repo-governance/conventions/writing/tutorial-structure.md)
requires. This skill covers the judgement of teaching from inside a scenario.

## A Scenario the Reader Recognizes

Open with the situation: the reader's role in it, the result they are after, and what they already have to work with.
Make it specific enough that a reader can tell within a paragraph whether it matches their own work. A vague scenario,
such as an application that needs some data, gives the reader nothing to map onto what they do.

Keep one scenario throughout. A second scenario introduced halfway through is a second tutorial.

## Narrate the Action, Then Explain It

Speak to the reader directly and keep them inside the scenario. Each step states the reader's next action, gives the
exact command or code, and shows the output it produced when it was run. A short explanation follows, as long as the
next step needs and no longer. Every command and flag is explained where it first appears.

Where output legitimately varies between runs, mark the varying part with a named placeholder such as `<container-id>`,
so the reader can tell expected variation from a failure.

## Checkpoints Before the Reader Is Lost

After every few steps, and always before a step that depends on earlier state, add a checkpoint: something the reader
runs, the result that means all is well, and where to turn when the result differs. A checkpoint catches a divergence
while its cause is still one or two steps back.

## A Recovery Note for Each Likely Failure

Beside each step that commonly fails, add a note giving the symptom the reader will see, its usual cause in a single
sentence, and the action that gets them back on track. Cover the failures this scenario actually produces; a general
catalogue of problems belongs in reference documentation.

## The Built-In Approach Before the Framework

When the tutorial teaches a framework or library, first complete the task with the facilities the language or platform
already provides, and show it working. Then show where that approach falls short in production, such as the retries,
pooling, or test organization it lacks. Introduce the framework as the answer to those specific limits, and close with a
trade-off section saying when the simpler approach is still enough.

Justify a framework by what it does for this scenario. A claim that everyone uses it gives the reader nothing to weigh.
A repository weighing its own dependencies applies the same preference through
[Dependency Selection](../../../repo-governance/development/quality/code/dependency-selection.md).

## Production-Complete Code

Readers copy tutorial code into real systems, so it is written the way it would ship:

- errors are handled, never swallowed or printed and forgotten;
- every opened resource is released on every path, including failure;
- configuration comes from the environment or a configuration file, never a hardcoded value; and
- no credential appears in code or output; placeholders stand in, per
  [No Secrets in Tracked Files](../../../repo-governance/conventions/security/no-secrets-in-tracked-files.md).

Leaving out error handling to shorten an example teaches the reader to leave it out.

## Before Publishing

Work through the tutorial end to end in a fresh environment that matches the scenario, following only what the text
says. Each place where something the text never mentioned had to be done is a missing step.
