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
| [`agents/`](agents/README.md)                   | canonical agent definitions                                       |
| [`.agents/skills/`](.agents/skills/README.md)   | canonical skills, one directory per skill, each with a `SKILL.md` |

Beside them, [`specs/`](specs/README.md) holds the shared fixture corpora, and `scripts/` holds the repository's own
gates.

Every file under those roots is authored and read directly. None of them is generated from another source, and none of
them is nested inside a package, workspace, or app directory. A harness-specific adapter, where a harness needs one, is
generated _from_ these roots and never becomes the thing an editor edits.

`./rhino harness adapters generate` writes every adapter this repository ships, reading the canon and the five declared
profiles in `repo-config.yml`. `./rhino harness adapters validate` decides whether what is on disk matches that model;
the generated output is never edited directly. Command Code has 65 generated native leaf adapters with static parity
verified; native runtime discovery and enforcement remain unverified. It reads root `AGENTS.md` and `.agents/skills/`
natively, without a shim or skill copies. Generation and validation commands were not exercised in the earlier
documentation pass; repository generation and static validation have since passed with RHINO v0.12.0.

## Harness Capture

FERRET records coding-agent harness activity. Capture is registered at the user level of the maintainer's harness
configuration, not in this repository, so nothing here forwards hook payloads. Use `./ferret` to query the local record
— `./ferret status --json`, whose `dataHome` names where it lives, and `./ferret usage --group-by tool --json`.

## Gate Inventory

`repo-config.yml` declares every gate once, and `./rhino gate run --surface <surface>` dispatches it. The hooks hold
only the work that must run on the author's machine: `pre-commit` rewrites staged files, `commit-msg` lints the message,
and `pre-push` scans the pushed range for leaks. The pull-request workflow replays those and runs every other check as
four parallel jobs that the required `quality-gate` job aggregates. `npm run check:complete` runs the whole
`pull-request` surface locally over your change.

| Check                     | Surface                      | Scope         | Command                                                             |
| ------------------------- | ---------------------------- | ------------- | ------------------------------------------------------------------- |
| `format-staged`           | `pre-commit`, `pull-request` | changed files | `scripts/format-staged.sh` (rewrites locally, verifies clean in CI) |
| `commit-message`          | `commit-msg`, `pull-request` | commit        | `scripts/check-commit-message.sh`                                   |
| `commit-history`          | `pull-request`               | commit range  | `scripts/check-commit-range.sh <base> <head>`                       |
| `public-safety-range`     | `pre-push`, `pull-request`   | commit range  | `scripts/public-safety/check.sh`                                    |
| `public-safety-message`   | `pull-request`               | commit range  | `scripts/public-safety/check.sh`                                    |
| `public-safety-tree`      | `pull-request`               | global        | `scripts/public-safety/check.sh`                                    |
| `public-safety-tests`     | `pull-request`               | global        | `scripts/public-safety/tests/run.sh`                                |
| `markdown-format`         | `pull-request`               | global        | `prettier --check .`                                                |
| `markdown-lint`           | `pull-request`               | global        | `markdownlint-cli2`                                                 |
| `artifact-metadata`       | `pull-request`               | global        | `./rhino metadata validate`                                         |
| `word-budget`             | `pull-request`               | global        | `./rhino governance word-budget validate`                           |
| `quality-gates`           | `pull-request`               | global        | `./rhino governance quality-gates validate`                         |
| `internal-links`          | `pull-request`               | global        | `./rhino md internal-link validate`                                 |
| `mermaid`                 | `pull-request`               | global        | `./rhino md mermaid validate`                                       |
| `remote-dispatch-refusal` | `pull-request`               | global        | `scripts/check-remote-dispatch-refusal.sh`                          |
| `harness-adapters`        | `pull-request`               | global        | `./rhino harness adapters validate` and the hook tests              |
| `hippo-consumer`          | `pull-request`               | global        | `scripts/check-hippo-consumer.sh`                                   |
| `shell-lint`              | `pull-request`               | global        | `scripts/check-shell-lint.sh` (ShellCheck at warning severity)      |

Every check is global or runs over a commit range, because a deletion anywhere can break an unaffected document: link,
index, registry, and harness-parity checks read the whole tree. The repository holds no runtime code, so it has no unit,
integration, or end-to-end tests, no behaviour corpus, and no coverage floor, and no network denial applies. That
exemption follows the maintainer's decision D19 on the standard for tests and gates: a Markdown catalog is exempt from
behaviour-driven development, unit tests, and coverage, and still runs the document checks and the leak scan in its
pull-request gate. Markdown line length (`MD013`) stays disabled by the catalog's own decision; Prettier wraps prose at
120 columns instead.

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

`ose-rules` is one of the eight `ose-projects` repositories. The label is navigation only: it is not an organization, a
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
- [`ex-bdd`](https://github.com/wahidyankf/ex-bdd) — public, MIT. Owns behaviour-driven development testing for Elixir.
  Knowledge sharing: it adopts artifacts from here by explicit copy. Start there to change ex-bdd.

No member is a parity sibling, and adoption never syncs: an adopter owns its copy, as [Adoption](#adoption) describes.

## Contributing

External contributions are currently closed while the engineering patterns stabilize. Forks remain welcome under the MIT
license.

## License

MIT. See [LICENSE](LICENSE).
