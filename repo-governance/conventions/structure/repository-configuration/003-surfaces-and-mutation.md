---
description: >-
  Defines the gate surfaces, requires public-safety to run first, and restricts mutation gates to the pre-commit surface
  alone; pairs formatting mutations with hosted checks where `ci` exists and keeps version-control hook files as thin
  shims.
when_to_use: >-
  Use when choosing which surfaces a gate runs on, when a gate needs to modify files, or when writing a version-control
  hook file.
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

## Pairing Formatting Mutations With Checks

In a repository with a `ci` surface, a mutation gate that runs a formatter has a paired check gate on `ci` running the
same formatter in its check mode, such as a verify flag, over the same files. Generation and synchronization mutations,
such as regenerated bindings or a synced lockfile, stay unpaired entries.

A local hook can be skipped, never installed, or out of date; only a hosted surface runs no matter what a contributor's
machine skipped or never installed. The paired check proves the tree that reached review is formatted; without one, a
change that bypassed the hook lands unformatted and nothing reports it.

A repository with no `ci` surface chooses once, as an adopter decision. Pairing each formatting mutation with a check on
the last local surface before a change is shared, such as `pre-push`, catches a skipped pre-commit hook, but that
surface can be skipped too and adds run time. Keeping the pre-commit mutation as the only blocking formatting gate runs
nothing extra, but a bypassed hook lands unformatted and unreported.

## Hook Files Are Thin Shims

A version-control hook file installed for a surface holds one call: the gate runner, naming that surface, with the
hook's arguments and standard input forwarded unchanged. It holds no command list and no order of its own.

The configuration is the one declaration of which gates run, in what order, on which surface. A command list copied into
a hook is a second declaration, and the first gate added to one and not the other runs on `ci` but never locally, or the
reverse. For the same reason, documentation describing a surface points at the configuration file's gate list for that
surface rather than transcribing the list.

An adopter's configuration validator rejects a hook file that does more than delegate. A missing paired check is a
review finding, because no gate entry field marks a mutation as formatting.
