---
name: managing-file-operations
description: >-
  Guides renaming, moving, and deleting documents safely: finding every reference first, preserving version history,
  planning a large reorganization for confirmation, and proving afterwards that nothing was left broken.
when_to_use: >-
  Use before renaming, moving, or deleting a document or directory, or when planning a reorganization that touches many
  files and the links between them.
compatibility: Requires write access to the repository through its version control.
---

# Managing File Operations

The conventions own what a file operation must leave true:
[File Naming](../../../repo-governance/conventions/structure/file-naming.md) for the new name,
[Internal Links](../../../repo-governance/conventions/writing/internal-links.md) for repairing inbound links in the same
change, [Directory Indexes](../../../repo-governance/conventions/structure/directory-indexes.md) for the maps, and
[Deletion With Proof](../../../repo-governance/development/quality/deletion-with-proof.md) for retiring a
responsibility. [Content Preservation](../../../repo-governance/development/quality/evidence/content-preservation.md)
owns moving content between documents. This skill covers the judgement of carrying an operation out.

## Find References Before Touching Anything

Search while the old path still exists to search for. A reference can take several forms:

- relative links from other documents, each written from its own file's depth;
- the bare file name, which catches links written from other directories;
- anchors into the document, which also break when a heading inside it changes;
- references outside Markdown, such as configuration, scripts, ignore lists, and pipeline definitions; and
- index entries in both the old and the new parent directory.

A reference missed until after the move has to be recognized by its broken path, which is harder than finding it by a
working one.

## Preserve History

Move and rename through version control's own operation, for example `git mv`, rather than deleting the file and
creating a new one. Where version control pairs old and new paths by content similarity, commit the move separately from
any substantial edit to the moved file; a file moved and rewritten in one commit can show up as an unrelated deletion
and addition.

Delete through version control too, so the removal is a recorded change rather than a file that quietly went missing.

## The Awkward Cases

- **The destination exists.** Stop. Overwriting merges two documents without deciding what either should keep.
- **A rename that changes only letter case.** On a case-insensitive checkout, go through an intermediate name, and check
  that no sibling differs from the new name only by case, per
  [Portable Names](../../../repo-governance/conventions/structure/file-naming/001-portable-names.md).
- **Tool-fixed names.** A `README.md` index keeps its name; rename or move its directory instead.
- **Untracked files.** A file never committed has no history to keep. Commit it first if its history from now on
  matters.
- **Directories.** Moving a directory to a different depth changes every relative link that crosses its boundary, in
  both directions.

## Plan and Confirm a Large Reorganization

When an operation reaches beyond a handful of files, write the plan before executing it: each old path with its new path
or its removal, every file whose links change, every index that changes, and each conflict found. Present the plan to
whoever asked for the change, and wait for confirmation before touching anything. A plan is cheap to correct; a
half-applied reorganization is not.

Keep the operation surgical. Change paths and links, not the prose around them: a reorganization that also rewrites
content can be reviewed as neither.

## Deletion Is Different

A deleted document leaves its inbound links nowhere to point. Decide for each whether to remove the link or re-point it
to a successor; Internal Links separates that mechanical repair from explaining what replaced the document. When the
document carried a live responsibility, Deletion With Proof applies before anything is removed.

## Prove Nothing Is Broken

Afterwards, confirm that each new path exists and each old one is gone, search again for the old paths and file names,
run the repository's link and index checks, and read the diff for any edit that is not a path or link change.
