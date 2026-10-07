# ose-rules

A portable catalog of governance, planning, agent, and skill artifacts adopted one at a time by explicit request. See
[README.md](README.md) for the adoption model.

Follow [Working Language](repo-governance/conventions/writing/working-language.md) for authored text and English
replies, and [Content Quality](repo-governance/conventions/writing/content-quality.md) for documents, including plans.

## What This Repository Is For

Everything here is copied elsewhere, so an artifact meaningful only in its original home is not publishable.

## Related Repositories

This repository is one of the seven `ose-projects` repositories, a navigation label only: not an organization, parent,
parity group, or shared release; members version, gate, and release independently. Upstream consumption: pinned
[hippo](https://github.com/wahidyankf/hippo) and [rhino](https://github.com/wahidyankf/rhino) releases, and FERRET from
[ose-public](https://github.com/wahidyankf/ose-public). Knowledge sharing: those three, the private sibling (unnamed and
unlinked here), [beaver-nest](https://github.com/wahidyankf/beaver-nest), and
[py-typekit](https://github.com/wahidyankf/py-typekit) adopt from this catalog by explicit copy; none is a parity
sibling. The [catalogue](README.md#related-repositories) describes each; catalog artifacts name none.

## Publishing Rules

- **Write portably.** No artifact names a specific repository, person, machine, host, directory, or organization. State
  the rule and let the adopter record where it applies.
- **Publish ready work only.** An adopter must never discover that a rule was a draft; experiments stay in the
  repository running them.
- **Publish through `main` only.** Do not create a repository version tag or GitHub Release. An adopter resolves the
  published `main` head to a full commit SHA, and published history is never rewritten.

## Public Safety

All file content, names, commits, branches, pull-request text, and published logs are outbound.
[`scripts/public-safety/`](scripts/public-safety/README.md) screens them;
[leak review](repo-governance/workflows/quality/pr-leak-review.md) gates each push and merge. Any finding or failed scan
blocks without allowlists or bypasses. Replace unsafe examples with semantic placeholders, or drop those that would lose
meaning.

## Authoring Rules

- Every governed document declares `description` and `when_to_use` in frontmatter; skills and agents declare more, per
  [artifact-metadata.md](repo-governance/conventions/structure/artifact-metadata.md).
- `AGENTS.md`, any root instruction shim a harness requires, and each `repo-governance/**/*.md` file hold **750 words**
  at most. An oversized document splits into an entrypoint plus ordered companion modules in a sibling directory named
  exactly after it.
- Names are lowercase kebab-case. See [file-naming.md](repo-governance/conventions/structure/file-naming.md).
- Every directory holding governed documents carries a `README.md` index. An empty governed directory fails.
- Internal links resolve to a document, never a directory. Check volatile technical claims against authoritative
  sources.
- Shell scripts are Bash, run `set -euo pipefail`, stay executable, and carry descriptive comments.
- Before any rule edit, follow [Rules Propagation](repo-governance/workflows/quality/rules-propagation.md) unprompted.
- Dispatch coding work to the fitting `swe-*` agent, except a trivial edit, a harness without subagents, or a tool
  repin, per [SWE Delegation](repo-governance/development/agents/swe-delegation.md).

## Layout

[README.md](README.md#layout) maps the roots. They are direct, and `./rhino harness adapters generate` writes every
adapter _from_ them.

`specs/fixtures/` is byte-identical across implementations and verified by digest, so it is excluded from formatting and
linting, which would break the digest another repository checks.

## Gates

```bash
npm install          # once
npm run check:complete
npm run format       # rewrite what the format gate would reject
```

Compute-bearing scripts carry the checksum-pinned `./hippo` guard; invoke them directly, never double-wrapped. Inspect
queue, admission, and bounded history with unguarded `./hippo status`, `./hippo watch`, and `./hippo history`.

`repo-config.yml` decides what runs where, and only `./rhino gate run --surface <surface>` reads it. The hooks, the
hosted workflow, and `check:complete` dispatch that registry rather than transcribing it, so a gate added there reaches
every surface it declares without a second edit. Each gate chooses the files it inspects, since a runner guessing would
be wrong differently for each.

`./ferret` pins FERRET from `ferret.lock` the same way; [README.md](README.md#harness-capture) covers capture. Every
surface here — wrappers, hooks, shipped scripts — sits at the floor tier of the
[Command-Line Interface](repo-governance/conventions/structure/command-line-interface.md) convention; this repository
builds no command-line product.

`./rhino` is a wrapper, not the tool: it installs the release `rhino.lock` pins, verifies the published archive digest
before extracting and the executable's reported identity before running, and refuses rather than fall back to any
`rhino` on `PATH`. Exit `125` is the wrapper refusing; every other code is RHINO's. A correction to the pin ships as a
new version, never an edit to what a published tag resolved to.

Delivery worktrees live only at `{repository location}/worktrees/<task>`; sibling `*-worktrees/` directories are
forbidden. Delivery is worktree to pull request to merge, then cleanup. The hosted workflow runs on every push and pull
request as defence in depth, not the primary control, because a local hook can be skipped and a hosted check cannot.
