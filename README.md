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

| Root               | Holds                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| `repo-governance/` | vision, principles, conventions, development standards, and workflows |
| `.agents/agents/`  | canonical agent definitions                                           |
| `.agents/skills/`  | canonical skills, one directory per skill, each with a `SKILL.md`     |

Every file under those roots is authored and read directly. None of them is generated from another source, and none of
them is nested inside a package, workspace, or app directory. A harness-specific adapter, where a harness needs one, is
generated _from_ these roots and never becomes the thing an editor edits.

## Adoption

Two capabilities describe the whole interaction:

- **`assess-alignment`** compares a requested scope against this catalog by intent and writes nothing. Each artifact
  comes back as adopted-equivalent, locally-adapted-equivalent, a local extension, or not applicable, and anything
  contradictory comes back as a conflict or a gap.
- **`adopt-artifact`** copies named artifacts into a target repository on explicit request. It changes only the
  requested scope plus whatever local integration those artifacts need, and it records where each one came from:
  repeatable `OSE-Rules-Source` trailers, one `OSE-Rules-Version`, and one full-SHA `OSE-Rules-Commit`.

If an adoption request names no version, the source resolves to the latest stable semantic-version tag — prereleases are
ignored — and the resolved tag and commit are recorded before anything is edited.

## Versioning

Released under semantic version tags. A tag is immutable: a correction ships as a new version rather than as a moved
tag, because an adopting repository recorded the old one in a commit trailer and that record has to stay true.

## License

MIT. See [LICENSE](LICENSE).
