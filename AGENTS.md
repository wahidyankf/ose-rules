# ose-rules

A reference catalog of governance, planning, agent, and skill artifacts that other repositories adopt one named artifact
at a time, by explicit request, and never automatically. See [README.md](README.md) for what the catalog is and how
adoption works.

## What This Repository Is For

Everything here is written to be copied into a repository that is not this one. That single fact decides most of the
rules below: an artifact that only makes sense in its original home is not publishable, however correct it is.

## Publishing Rules

- **Write portably.** No artifact names a specific repository, person, machine, host, directory, or organization. State
  the rule and let the adopter record which of its own things the rule applies to.
- **Publish ready work only.** A repository adopting from this catalog must never discover that a rule was a draft.
  Something experimental belongs in the repository experimenting with it.
- **Never break a published contract quietly.** A released tag is immutable; a correction ships as a new version,
  because an adopter recorded the old one in a commit trailer and that record has to stay true.

## Public Safety

This repository is published, so file contents, file names, commit messages, branch names, and release text are all
outbound material. `scripts/public-safety/` screens every one of them, and it is the first gate on every surface.

A finding blocks. There is no allowlist, suppression, or bypass, and a scan that could not run is not a scan that
passed. Replace an unsafe example with a semantic placeholder — `<api-token>`, `<private-host>`, `<repository-path>`; if
that destroys the artifact's meaning, the artifact does not belong here. See
[scripts/public-safety/README.md](scripts/public-safety/README.md).

## Authoring Rules

- Every governed document declares `description` and `when_to_use` in frontmatter; skills and agents declare more. The
  schema is in [artifact-metadata.md](repo-governance/conventions/structure/artifact-metadata.md).
- `AGENTS.md`, `CLAUDE.md`, and every `repo-governance/**/*.md` stay at or below **750 words**. A convention that
  outgrows the budget splits into ordered companion modules in a sibling directory named after it.
- Names are lowercase kebab-case, and a document that outgrows its budget splits into an entrypoint plus a sibling
  directory named exactly after it. See [file-naming.md](repo-governance/conventions/structure/file-naming.md).
- Every directory holding governed documents carries a `README.md` index. An empty governed directory fails; a category
  exists because it holds something.
- Internal links resolve to a document, never to a directory. Verify unstable technical claims from authoritative
  sources.
- Shell: Bash, `set -euo pipefail`, executable bit, descriptive comments.

## Layout

| Path               | Holds                                                             |
| ------------------ | ----------------------------------------------------------------- |
| `repo-governance/` | conventions, development standards, and workflows                 |
| `.agents/agents/`  | canonical agent definitions                                       |
| `.agents/skills/`  | canonical skills, one directory per skill, each with a `SKILL.md` |
| `specs/`           | behaviour specifications and the shared plan-structure corpus     |
| `scripts/`         | the repository's own gates                                        |

Roots are direct: nothing under them is generated, and nothing is nested inside a package or app directory.
`node scripts/generate-adapters.mjs` writes every harness adapter _from_ these roots, and
`./rhino harness parity validate` decides whether disk matches what was declared.

`specs/fixtures/` is byte-identical across implementations and verified by digest, so it is excluded from formatting and
linting: reformatting it would break the digest another repository checks.

## Gates

```bash
npm install          # once
npm run check:complete
npm run format       # rewrite what the format gate would reject
```

`repo-config.yml` is the authority on what runs and where, and `./rhino gate run --surface <surface>` is the only thing
that reads it. The hooks, the hosted workflow, and `check:complete` all dispatch that one registry rather than
transcribing it, so a gate added to the config reaches every surface it declares without a second edit. Each gate
decides for itself which files it inspects — a runner guessing on their behalf would be wrong differently for each one.

`./rhino` is a wrapper, not the tool: it installs the release `rhino.lock` pins, verifies the published archive digest
before extracting and the executable's own reported identity before running, and refuses rather than falling back to
whatever `rhino` is on `PATH`. Exit `78` is the wrapper refusing; every other code is RHINO's. A correction to the pin
ships as a new version, never as an edit to what a published tag resolved to.

Delivery is worktree to pull request to merge, then cleanup. The hosted workflow runs on every push and every pull
request; it is defence in depth rather than the primary control, because a local hook can be skipped and a hosted check
cannot.
