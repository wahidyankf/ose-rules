---
description: >-
  Defines the gate surfaces, requires public-safety to run first, and restricts mutation gates to the pre-commit surface
  alone.
when_to_use: >-
  Use when choosing which surfaces a gate runs on, or when a gate needs to modify files.
---

# Surfaces and Mutation

## Surfaces

A surface is the moment a gate runs:

| Surface      | Runs                             |
| ------------ | -------------------------------- |
| `commit-msg` | when a commit message is written |
| `pre-commit` | before a commit is created       |
| `pre-push`   | before a push                    |
| `ci`         | on the hosted checks             |

A gate declares every surface it applies to. Declaring none is a gate that never runs, and it fails rather than being
silently skipped.

## Public Safety Runs First

Where a repository publishes anything, its public-safety gate is the first entry for every surface it applies to.

Order matters because the alternative is discovering a leak after the formatter has already rewritten the file, or after
a push has already happened. The cheapest moment to refuse is before anything else has acted.

## Mutation Gates Run Only at `pre-commit`

A gate declaring `kind: mutation` may name `pre-commit` and nothing else. Mapping it to `commit-msg`, `pre-push`, or
`ci` fails.

The reason is that a mutation gate changes files and must restage them, and `pre-commit` is the only surface where that
is coherent.

At `commit-msg` the tree is already committed-in-progress. At `pre-push` the commits exist, so a mutation either goes
nowhere or silently diverges from what was reviewed. In continuous integration there is no working copy to fix and
nowhere to put the result — a mutation there produces a green run for a state that exists on no machine.

## Checks Do Not Mutate

A gate declaring `kind: check` must leave the working tree unchanged. A check that fixes what it finds cannot fail,
which means it reports nothing and blocks nothing.

The two kinds exist so that this is a declaration rather than a convention. A repository can see at a glance which gates
can alter its files, and there are as few of them as possible.

## Restaging Is the Leaf Command's Job

A mutation gate restages what it changed. The runner does not, because it does not know which of the files it touched
were already staged, and staging something the author deliberately left out is worse than failing.
