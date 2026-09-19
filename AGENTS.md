# ose-rules

A portable catalog of governance, planning, agent, and skill artifacts adopted one at a time by explicit request. See
[README.md](README.md) for the adoption model.

## What This Repository Is For

Everything here is copied into other repositories. An artifact meaningful only in its original home is not publishable.

## Publishing Rules

- **Write portably.** No artifact names a specific repository, person, machine, host, directory, or organization. State
  the rule and let the adopter record which of its own things the rule applies to.
- **Publish ready work only.** A repository adopting from this catalog must never discover that a rule was a draft.
  Something experimental belongs in the repository experimenting with it.
- **Publish through `main` only.** Do not create a repository version tag or GitHub Release. An adopter resolves the
  published `main` head to a full commit SHA, and published history is never rewritten.

## Public Safety

All file content, names, commits, branches, pull-request text, and published logs are outbound. `scripts/public-safety/`
screens them first. Any finding or failed scan blocks without allowlists or bypasses. Replace unsafe examples with
semantic placeholders; if that destroys their meaning, they do not belong here. See
[scripts/public-safety/README.md](scripts/public-safety/README.md).

## Authoring Rules

- Every governed document declares `description` and `when_to_use` in frontmatter; skills and agents declare more. The
  schema is in [artifact-metadata.md](repo-governance/conventions/structure/artifact-metadata.md).
- `AGENTS.md`, any root instruction shim a harness requires, and each `repo-governance/**/*.md` file hold **750 words**
  at most. A document that outgrows the budget splits into an entrypoint plus ordered companion modules in a sibling
  directory named exactly after it.
- Names are lowercase kebab-case. See [file-naming.md](repo-governance/conventions/structure/file-naming.md).
- Every directory holding governed documents carries a `README.md` index. An empty governed directory fails; a category
  exists because it holds something.
- Internal links resolve to a document, never to a directory. Check volatile technical claims against authoritative
  sources.
- Shell scripts are Bash, run `set -euo pipefail`, stay executable, and carry descriptive comments.
- Before any rule edit, follow [Rules Propagation](repo-governance/workflows/maintenance/rules-propagation.md)
  unprompted.

## Layout

| Path               | Holds                                                             |
| ------------------ | ----------------------------------------------------------------- |
| `repo-governance/` | principles, conventions, development standards, workflows         |
| `.agents/agents/`  | canonical agent definitions                                       |
| `.agents/skills/`  | canonical skills, one directory per skill, each with a `SKILL.md` |
| `specs/`           | behaviour specifications and the shared plan-structure corpus     |
| `scripts/`         | the repository's own gates                                        |

Roots are direct: nothing under them is generated, and nothing is nested inside a package or app directory.
`./rhino harness adapters generate` writes every harness adapter _from_ these roots, and
`./rhino harness adapters validate` decides whether disk matches the declared profiles.

`specs/fixtures/` is byte-identical across implementations and verified by digest, so it is excluded from formatting and
linting: reformatting it would break the digest another repository checks.

## Gates

```bash
npm install          # once
npm run check:complete
npm run format       # rewrite what the format gate would reject
```

Compute-bearing scripts carry the checksum-pinned `./hippo` guard; invoke them directly and never double-wrap them.
Inspect queue, admission, and bounded history with unguarded `./hippo status`, `./hippo watch`, and `./hippo history`.

`repo-config.yml` is the authority on what runs and where, and `./rhino gate run --surface <surface>` is the only thing
that reads it. The hooks, the hosted workflow, and `check:complete` all dispatch that one registry rather than
transcribing it, so a gate added to the config reaches every surface it declares without a second edit. Each gate
decides for itself which files it inspects — a runner guessing on their behalf would be wrong differently for each one.

`./rhino` is a wrapper, not the tool: it installs the release `rhino.lock` pins, verifies the published archive digest
before extracting and the executable's own reported identity before running, and refuses rather than falling back to
whatever `rhino` is on `PATH`. Exit `78` is the wrapper refusing; every other code is RHINO's. A correction to the pin
ships as a new version, never as an edit to what a published tag resolved to.

Delivery worktrees live only at `{repository location}/worktrees/<task>`; sibling `*-worktrees/` directories are
forbidden. Delivery is worktree to pull request to merge, then cleanup. The hosted workflow runs on every push and every
pull request; it is defence in depth rather than the primary control, because a local hook can be skipped and a hosted
check cannot.
