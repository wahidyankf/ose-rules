# OSE Rules

A reference catalog of governance, planning, agent, and skill artifacts that other repositories may adopt — one named
artifact at a time, by explicit request, and never automatically.

## What This Is

`ose-rules` publishes the canonical, reusable form of a plan system and a governance system that grew across several
repositories and drifted apart in the process. Its purpose is to make that shared form findable, teachable, and safe to
copy.

It publishes **ready** artifacts. Something experimental does not belong here; a repository that adopts from this
catalog should not be discovering that a rule was a draft.

## What This Is Not

This is a catalog, not an authority, and adoption is a copy rather than a subscription.

- Adoption is explicit, scoped, and one-off. Nothing here reaches into an adopting repository.
- There is no synchronization service, no pin check, no byte-identity check, and no drift ledger.
- After adoption, the adopting repository owns its copy. It may adapt, extend, or diverge, and neither repository is
  obliged to notice.
- An agent that notices a useful artifact here may report the option and its trade-off. It may not adopt unasked.

The trade-off is deliberate: guaranteed consistency would require an obligation nobody agreed to. A repository stays the
author of its own rules.

## Layout

Roots are direct. An agent looking for a governed artifact opens one of three places and finds it, without a package
boundary, a build step, or a generated intermediate in between.

| Root                                            | Holds                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------- |
| [`repo-governance/`](repo-governance/README.md) | principles, conventions, development standards, and workflows     |
| [`.agents/agents/`](.agents/agents/README.md)   | canonical agent definitions                                       |
| [`.agents/skills/`](.agents/skills/README.md)   | canonical skills, one directory per skill, each with a `SKILL.md` |

Every file under those roots is authored and read directly. None of them is generated from another source, and none of
them is nested inside a package, workspace, or app directory. A harness-specific adapter, where a harness needs one, is
generated _from_ these roots and never becomes the thing an editor edits.

`node scripts/generate-adapters.mjs` writes every adapter this repository ships, reading the canon and the model-tier
map in `repo-config.yml`. It checks nothing: `./rhino harness parity validate` decides whether what is on disk matches
what was declared, and the writer and the judge are kept apart so the judge is worth running.

## Adoption

Two capabilities describe the whole interaction:

- **`assess-alignment`** compares a requested scope against this catalog by intent and writes nothing. Each artifact
  comes back as adopted-equivalent, locally-adapted-equivalent, a local extension, or not applicable, and anything
  contradictory comes back as a conflict or a gap.
- **`adopt-artifact`** copies named artifacts into a target repository on explicit request. It changes only the
  requested scope plus whatever local integration those artifacts need, and it records where each one came from:
  repeatable `OSE-Rules-Source` trailers and one full-SHA `OSE-Rules-Commit`.

If an adoption request names no commit, the source resolves the canonical remote's published `main` head to a full
commit SHA before anything is read or edited. A named commit must be a full SHA reachable from published `main`.

## Publishing

The catalog publishes adoption-ready artifacts directly through `main`. It has no repository versions, version tags, or
GitHub Releases. A correction is another commit on `main`; prior commits remain the exact provenance of earlier copies.

## License

MIT. See [LICENSE](LICENSE).
