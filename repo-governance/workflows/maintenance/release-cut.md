---
name: release-cut
description: >-
  Publishes a version by building immutable, digest-recorded artifacts from one verified clean revision and tagging that
  revision, never moving or replacing a released tag.
when_to_use: >-
  Use when publishing a versioned artifact that consumers pin by version and digest.
---

# Release Cut

## Entry

The revision to release is on the default branch, reached through the repository's integration path, and the release has
been authorized.

- `version` (`string`, required): the version to publish, chosen by the change class
  [Public Contract](../../development/quality/architecture/public-contract.md) assigns.
- `revision` (`string`, required): the full commit identifier to release.

## Sequence

1. **Confirm the checkout.** The local default branch equals the remote default branch, reconciled after the last
   integration rather than assumed; the checkout is at exactly `revision`; and the working tree is clean, untracked
   files included.
2. **Confirm the version is unused.** No tag named for `version` exists locally or on the remote. If one does, end the
   run and choose the next version: a tag is never deleted or moved.
3. **Run the full gate** on `revision`. A release that skipped a gate publishes whatever the gate would have caught.
4. **Confirm the documentation describes this version.** The changelog records it, per
   [Security, License, and Changelog](../../conventions/writing/repository-documentation-files/002-security-license-and-changelog.md),
   and a [Docs Quality Gate](../quality/docs-quality-gate.md) run with scope `all` passes.
5. **Build only through the release build command.** One scripted command, run where the adopter's build-location
   decision places it, builds each artifact from `revision` in a clean checkout of that revision, and refuses when the
   checkout head differs from `revision` or `revision` is not a full commit identifier. The script enforces both itself.
6. **Record the digests** through the build tooling, never by hand, covering every artifact built in step 5.
7. **Tag `revision` and publish** the artifacts and their digests. The tag name and release text pass the same outbound
   screen as any other publication, per [Public Outbound Safety](../../conventions/security/public-outbound-safety.md).

## Exit

A successful run leaves `tag` (`string`), naming `version` on `revision`, and `artifacts` (`file-list`, at
`<output-dir>/*`) with the digest file covering each. Every artifact traces to `revision`.

A step that fails before step 7 ends the run with no tag created, so nothing needs undoing. A defect found after step 7
is not repaired in place; it becomes a new run with a new version.

A failure inside step 7 ends the run `partial`: the tag stays, nothing published is replaced, and the next version is
cut.

## Example Usage

```text
Run release-cut for version 1.4.0 at revision <full-commit-id>.
```

## Related Workflows

- [Dependency Bump Planning](dependency-bump-planning.md) can snapshot eligible bumps before a release.
- [Dev Artifact Clean-Up](dev-artifact-clean-up.md) removes the release checkout and build scratch afterwards.

## Adopter Decision: Build Location

| Option                | Where steps 5 and 6 run                                       | Trade-off                                                                     |
| --------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| local, before tagging | one machine builds every platform before step 7               | a broken build stops the run before any tag exists; artifacts are cross-built |
| native runners        | inside step 7, triggered by the tag on each platform's runner | each executable has started on its platform; a build failure leaves the tag   |

Record the option. Under native runners, verify the published release before announcing it: an artifact per supported
platform, each matching its digest.

## A Released Tag Never Moves

Consumers pin a release by version and digest. A replaced tag silently turns every one of those pins false, because the
version string did not change. A mistake in a published release is therefore fixed by publishing the next version: never
by replacing a tag, re-uploading an artifact, or weakening digest verification to accept a bad one. A consumer whose
bootstrap refuses a mismatched digest is behaving correctly; the fix belongs upstream of it.

An adopter enforces this with its forge's tag protection and its consumers' digest checks, and the build command's own
refusals enforce step 5.

## One Build Path

A hand-built artifact is one nobody can reproduce. Building from a clean checkout of the exact revision keeps the output
independent of the machine and whatever else was on its disk. Promoting a release of a running service adds candidate,
migration, and traffic rules, which
[Release Cutover](../../development/quality/delivery/live-service-continuity/002-release-cutover.md) owns.

## Principles

This workflow implements [Immutability](../../principles/immutability.md), because a published version gets a successor
rather than an edit; [Reproducibility](../../principles/reproducibility.md), because every artifact comes from one clean
revision through one command; and [Fail Closed](../../principles/fail-closed.md), because an existing tag, dirty tree,
or mismatched revision stops the run.
