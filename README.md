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

Beside them, [`specs/`](specs/README.md) holds behaviour specifications and the shared plan-structure corpus, and
`scripts/` holds the repository's own gates.

Every file under those roots is authored and read directly. None of them is generated from another source, and none of
them is nested inside a package, workspace, or app directory. A harness-specific adapter, where a harness needs one, is
generated _from_ these roots and never becomes the thing an editor edits.

`./rhino harness adapters generate` writes every adapter this repository ships, reading the canon and the three declared
profiles in `repo-config.yml`. `./rhino harness adapters validate` decides whether what is on disk matches that model;
the generated output is never edited directly.

## Harness Capture

FERRET records coding-agent harness activity. Capture is registered at the user level of the maintainer's harness
configuration, not in this repository, so nothing here forwards hook payloads. Use `./ferret` to query the local record
— `./ferret status --json`, whose `dataHome` names where it lives, and `./ferret usage --group-by tool --json`.

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

## Related Repositories

`ose-rules` is one of the seven `ose-projects` repositories. The label is navigation only: it is not an organization, a
parent repository, a parity group, or a shared release, and each member versions, gates, and releases independently. The
[Related Repositories](repo-governance/conventions/structure/related-repositories.md) convention holds the rules. This
catalogue is specific to this repository and is never copied with a catalog artifact, which names no repository.

- [`hippo`](https://github.com/wahidyankf/hippo) — public, MIT. Owns resource coordination: its source, specifications,
  and releases. Upstream consumption through `./hippo`; it also adopts artifacts from here (knowledge sharing). Start
  there to change HIPPO itself rather than its use here.
- [`ose-public`](https://github.com/wahidyankf/ose-public) — public, MIT. Owns the OSE product platform and publishes
  FERRET releases. Upstream consumption of FERRET through `./ferret`; it also adopts artifacts from here (knowledge
  sharing). Start there to work on OSE or FERRET.
- [`ose-private`](https://github.com/wahidyankf/ose-private) — private, proprietary; the private sibling. Its name and
  link are public by the maintainer's 2026-10-07 decision; its contents are not. Owns authorized OSE operations and
  infrastructure. Knowledge sharing: it adopts artifacts from here by explicit copy. Start there only as an authorized
  maintainer, through its private onboarding.
- [`rhino`](https://github.com/wahidyankf/rhino) — public, MIT. Owns repository-hygiene validation: its source,
  specifications, and releases. Upstream consumption through `./rhino`; it also adopts artifacts from here (knowledge
  sharing). Start there to change RHINO itself rather than its use here.
- [`beaver-nest`](https://github.com/wahidyankf/beaver-nest) — public, MIT. Owns the BeaverNest family product and its
  applied learning lab. Knowledge sharing: it adopts artifacts from here by explicit copy. Start there to work on
  BeaverNest.
- [`ose-rules`](https://github.com/wahidyankf/ose-rules) — public, MIT. This repository: the portable catalog. Start
  here to adopt or change a catalog artifact.
- [`py-typekit`](https://github.com/wahidyankf/py-typekit) — public, MIT. Owns a library of typed functional primitives
  for Python. Knowledge sharing: it adopts artifacts from here by explicit copy. Start there to change py-typekit.

No member is a parity sibling, and adoption never syncs: an adopter owns its copy, as [Adoption](#adoption) describes.

## License

MIT. See [LICENSE](LICENSE).
