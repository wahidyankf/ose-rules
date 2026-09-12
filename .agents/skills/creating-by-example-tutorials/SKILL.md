---
name: creating-by-example-tutorials
description: >-
  Guides writing By Example tutorials: one concept per self-contained runnable example, built-in features before
  dependencies, comparisons in separate blocks, and variants for non-code, security, and multi-language subjects.
when_to_use: >-
  Use when writing or reviewing the examples of a By Example tutorial, or when adapting that format to a subject without
  runnable code, to security techniques, or to several languages.
compatibility: Requires a runtime or lab environment in which every example can be run as printed.
---

# Creating By Example Tutorials

[Tutorial Types](../../../repo-governance/conventions/writing/tutorial-types.md) defines By Example: its reader already
programs, and its examples fall into beginner, intermediate, and advanced sets.
[Cookbook and By Example](../../../repo-governance/conventions/writing/tutorial-structure/002-cookbook-and-by-example.md)
fixes each example's parts: a brief explanation, annotated code, a diagram only where one clarifies, and a key takeaway.
This skill covers writing examples that hold up.

## One Concept, One Complete Example

Each example introduces exactly one new concept. After the brief explanation, present the whole example at once, with
its imports, helpers, and sample data, then explain it in the order the code executes and show the output it actually
produced. That output also serves as the reader's checkpoint.

Test self-containment by deletion: with every other example removed, this one still runs. An example may name a concept
taught earlier, but it never relies on code shown only earlier. A later set assumes more knowledge, never more hidden
code.

Run each example exactly as printed, as
[Documentation Architecture](../../../repo-governance/conventions/structure/documentation-architecture.md) requires.

## Built-In Features Before Dependencies

Teach with the language's own features and standard library first; the beginner set needs nothing installed beyond the
language. When a later example needs an external library, mark the dependency where it appears, say what the built-in
approach could not do, and show how to install it. A reader who met the library before the primitive beneath it can
debug neither.

## Takeaways Worth Keeping

Write the key takeaway as the sentence that would stay true for a different example of the same concept. A takeaway
restating what this code did summarizes the example rather than the lesson.

## Comparisons Get Separate Blocks

When an example contrasts two approaches, give each approach its own code block, with prose between them saying what
differs and when each is preferable. Two approaches in one block cannot be copied apart, and the reader has to hunt for
the boundary.

## Where Annotations Sit

Annotations sit on the code lines, showing values and output beside each, because Tutorial Types defines By Example with
annotated code. The brief explanation carries why the concept matters, and long rationale stays out of the code.

## Variant: Subjects Without Runnable Code

When the subject has no code, as in risk or governance work, each example is a complete annotated artifact, such as a
decision record, a register entry, or a policy excerpt. State the organizational context it assumes: the kind and size
of organization, and who makes the decision. Annotations give the reasoning or trade-off behind a line; they never just
name the field. A named framework appears only after the concept it structures has been taught without it.

## Variant: Security Techniques

State each example's lab environment and prerequisites, and show every command with its output, using documentation
address ranges and fictional names. Tools built into the operating system come before specialized ones, and each
specialized tool arrives with a note on installing it. A page teaching an offensive technique opens with a notice that
it applies only to systems the reader owns or is authorized to test.

## Variant: Several Languages

When an example appears in more than one language, write each version the way that language is normally written, never
as a line-by-line translation of another. When a concept exists natively in only one of them, use the closest native
equivalent in the other, with a one-line annotation naming the trade-off.
