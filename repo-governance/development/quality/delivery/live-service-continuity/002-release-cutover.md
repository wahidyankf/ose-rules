---
description: >-
  Governs promoting a release of a live service: an immutable artifact from a disposable worktree, candidates that prove
  their revision, explicit migrations, traffic cutovers that drop no connection, and rollback before diagnosis.
when_to_use: >-
  Use when building, promoting, or rolling back a release of an application users can reach.
---

# Release Cutover

## Build Once, From a Disposable Worktree

Build the release as an immutable artifact from a clean revision, in a temporary worktree separate from the working
checkout, and record the revision it came from. Remove that worktree as soon as the build finishes; the artifact is the
output, not the worktree.

An artifact built in the working checkout contains whatever was on disk at the time, and cannot be traced to a single
revision.

## Promote a Candidate That Proves Its Revision

Start the candidate beside the active version. Its health check reports the revision it runs, and promotion requires
that revision to match the one requested. A health check that answers only "healthy" can promote a stale candidate left
from an earlier attempt.

Before cutover, run the gates that apply to the change against the candidate, including a real-time interaction at the
exact served origin where the interface depends on one. After cutover, verify that the routed service, not only the
candidate, serves the intended revision within the responsiveness budget.

## Migrations Are Explicit

A release declares the schema migrations it carries. A service never runs migrations implicitly as part of starting up:
a startup migration runs whenever any process starts, including a candidate that will never be promoted, and it changes
the store the active version is still reading.

A release that carries migrations waits until an approved, locked expand, migrate, and verify sequence keeps the
previous version able to read.

## Switch Traffic Without Dropping Connections

Switch traffic with a cutover that drops no held connection, and never stop whatever switches traffic in order to
reconfigure it. Stopping it drops every connection it holds, however briefly it is down.

On a self-hosted service, for example, the switch is a proxy and the cutover is its graceful reload. A managed platform
or orchestrator performs the same cutover through its own deployment mechanism.

## Roll Back, Then Diagnose

When candidate health, routing, or connection verification fails, keep the previous version serving and roll back first.
Diagnose afterwards, against a service that is working again.

Do not retry a failed candidate until its failure is understood. A retry that happens to pass has explained nothing.
