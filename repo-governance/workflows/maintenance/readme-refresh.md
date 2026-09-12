---
name: readme-refresh
description: >-
  Keeps human-facing READMEs true to a change by mapping each changed behaviour to its entry point and updating the
  smallest affected README set in the same commit.
when_to_use: >-
  Use before committing a change to purpose, layout, commands, setup, dependencies, public behaviour, navigation, or
  contributor expectations, or when adding, moving, or deleting a README.
---

# README Refresh

## Entry

A change is about to be committed that alters what a README reader relies on: purpose, directory layout, public
behaviour, commands, setup, dependencies, documentation navigation, governance, or contributor expectations. Adding,
moving, or deleting a README or an indexed document also enters.

- `change` (`string`, required): the revision range or working-tree change to explain.

## Sequence

1. **Inventory the change and the README set.** List committed, staged, and untracked changes against the default
   branch, and every README the repository holds, the root one included.
2. **Map each changed behaviour to its human entry point.** The root README explains the repository; a project README
   explains its project's purpose, use, and contracts per
   [Project READMEs](../../conventions/structure/project-readmes.md); an index README navigates its directory per
   [Directory Indexes](../../conventions/structure/directory-indexes.md).
3. **Read each affected README as a newcomer.** Check names, commands, versions, paths, links, prerequisites, outputs,
   and claims against the implementation. Link to the canonical document instead of copying its rule, and keep agent
   instructions in the agent instruction files.
4. **Update only what is stale or missing.** Never rewrite accurate prose, invent behaviour, or fold unrelated
   documentation work into the change.
5. **Commit the refresh with the change it explains,** in the same commit per
   [Thematic Commits](../../development/workflow/thematic-commits.md).
6. **Verify.** Run the repository's formatting, link, and index checks, then confirm every changed human-facing
   behaviour is discoverable from the right README and no README promises behaviour the repository lacks.

## Exit

Every changed human-facing behaviour is discoverable from its entry point, and no README contradicts the implementation.

Outputs: `updated-readmes` (`file-list`, the READMEs the commit changes, possibly none) and `checks` (`record`, each
check's command and exit status).

Partial outcome: when the code, a policy, or the intended audience is ambiguous, the run stops and asks the owner,
leaving the README unchanged rather than authoritative by guess. A wrong source of truth is repaired first, then the
README and its indexes.

## Example Usage

```text
Run readme-refresh for the change on the current branch against the default branch.
```

## Related Workflows

- [Release Cut](release-cut.md) confirms the documentation describes a version before publishing it.

## A README Is a Promise

A reader acts on a README without reading the code behind it, so a stale one misleads exactly when it is trusted.
Refreshing the smallest affected set in the same commit keeps each promise changing with the behaviour it describes, and
keeps both under one review. This workflow implements [One Source Per Fact](../../principles/one-source-per-fact.md) and
[Explicit Over Implicit](../../principles/explicit-over-implicit.md).
