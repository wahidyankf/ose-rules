---
description: >-
  Defines the four capability forms, gives each a distinct responsibility, and fails substantially duplicated
  instruction bodies.
when_to_use: >-
  Use when deciding which form new guidance should take, or when two artifacts appear to say the same thing.
---

# Capability Forms

One concern may need several forms. Each form owns a different responsibility, and they compose rather than compete.

| Form           | Owns                                                              | Answers                       |
| -------------- | ----------------------------------------------------------------- | ----------------------------- |
| **convention** | a durable rule                                                    | what must be true             |
| **workflow**   | an ordered procedure with an entry condition and a terminal state | what happens, in what order   |
| **skill**      | reusable judgement                                                | how to do it well             |
| **agent**      | a bounded role with its own tools and stopping rule               | who does it, and when to stop |

## They May Coexist

A single concern legitimately having all four is not duplication. Adoption is a good example: a convention says what
adoption may touch, a workflow says the order, a skill teaches the adaptation judgement, and an agent carries it out
within a boundary.

The test is not how many artifacts exist. It is whether each answers a different question.

## Duplicated Bodies Fail

Two artifacts carrying substantially the same instructions fail review, even when both are individually good.

The cost is not storage. It is that they will drift — one gets improved, the other does not — and nothing decides which
one an agent should have believed. Meanwhile every change to the concern costs two edits, and the second is the one that
gets forgotten.

The usual shape is a workflow that starts explaining how to decide well, or a skill that starts prescribing sequence.
Each has begun doing the other's job.

## Choosing a Form

Ask what kind of statement the guidance is.

If it is true regardless of when you read it, it is a convention. If it only makes sense as a sequence, it is a
workflow. If it is advice for a decision that recurs in different contexts, it is a skill. If it needs its own tools and
its own idea of being finished, it is an agent.

Guidance that does not fit any of them is usually two pieces of guidance.

## Splitting Rather Than Duplicating

When two artifacts overlap, the fix is to decide who owns the overlapping part and have the other link to it.

A link is not a weaker copy. It is the only arrangement in which the guidance can be corrected once.
