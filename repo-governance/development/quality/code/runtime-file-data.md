---
description: >-
  Governs small runtime data kept as local files: never tracked, versioned JSON validated on read, written by atomic
  replacement, located without external input, and rooted in one storage profile resolved at process startup.
when_to_use: >-
  Use when an application, tool, or agent persists its state in local files rather than a database, or when reviewing
  code that locates, reads, or writes such a file.
---

# Runtime File Data

Some state is too small or too local to justify a database: one user's progress, a saved preference, a tool's
operational record. Kept in files, it fails in ways a database would have prevented. A crash leaves half a document, a
hand edit goes unvalidated, a request chooses the path, or a test writes to the real data. Each rule below closes one of
those.

This standard implements [Fail Closed](../../../principles/fail-closed.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md), and
[Reproducibility](../../../principles/reproducibility.md).

## Scope

Small, private data that a running application, tool, or agent creates and changes. Source, committed configuration, and
committed test inputs are out of scope. So is agent scratch output, which
[Temporary Files](../../../conventions/structure/temporary-files.md) governs.

## Never Tracked

Version control ignores every runtime data directory. The only tracked entry allowed is an approved placeholder that
keeps an empty directory present.

Runtime data changes on every run and can hold personal data, so a committed copy is either a leak or a stale snapshot
someone mistakes for a fixture. Each tool that walks the tree also needs its own exclusion, as
[Temporary Files](../../../conventions/structure/temporary-files.md) explains.

## One Directory per Record Kind

Each kind of record lives in its own subdirectory below the data root, such as
`<data-root>/users/<user-id>/<activity>/progress.json`. A directory that mixes kinds cannot be backed up, cleared, or
migrated for one of them without touching the others.

## Versioned JSON, Validated on Read

Each file is UTF-8 JSON that carries an explicit schema version. The reader checks the version and validates the whole
document before using any of it. A file that fails is reported as an error naming its path. It is never repaired by
guesswork or replaced with defaults.

A data file outlives the code that wrote it: an older release, a hand edit, or an interrupted copy leaves a shape the
reader does not expect. Without a version the reader cannot tell an old shape from a corrupt one, and a reader that
substitutes defaults overwrites the user's real data on its next write.

## Written by Atomic Replacement

A writer never changes a data file in place. It writes the complete new document to a temporary file in the same
directory, flushes it to storage, and renames it over the original.

Readers then see the old document or the new one, never a mixture, and a crash leaves the old one intact. The temporary
file sits in the same directory because a rename replaces a file atomically only within one filesystem. Concurrent
writers to one file serialize read, change, and replace; two replacements made from one read lose an update.

## Paths Never Come From External Input

No file path is derived directly from browser input, a request, or any other external value. The code maps the input to
an identifier it has validated against a strict pattern or looked up, builds the path from the data root and that
identifier, and then confirms that the resolved path, with symbolic links followed, still lies inside the root.

A path taken from input reaches wherever the input says. A parent-directory segment or a planted symbolic link turns a
request for one record into a read or write anywhere the process has access.

## One Storage Profile per Process

Each process resolves exactly one storage profile, such as production, development, or a single test run, at startup,
and uses that profile's root for its whole life. It never switches profiles while running. When its root is missing or
cannot be proven to be the right one, it stops rather than falling back to another profile.

A fallback hides the misconfiguration that triggered it: the process appears to work on another profile's data until
that data is damaged. A test process never reaches production data;
[Test Data Isolation](../testing/test-data-isolation.md) owns that rule and the per-run boundary a test must prove.

## Enforcement

An adopter enforces these rules in its own tests and lint: a check that the data directories are ignored, and single
helpers for resolving the profile, building a path, and writing a file that every other caller must use.
