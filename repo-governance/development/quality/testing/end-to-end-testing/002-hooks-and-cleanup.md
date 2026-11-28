---
description: >-
  Keeps end-to-end runs out of fast hooks, places the complete suite in a scheduled workflow, and guarantees browser
  cleanup, even after failure.
when_to_use: >-
  Use when placing an end-to-end run in a hook, workflow, or gate, or when a browser run leaves pages, tabs, or servers
  behind.
---

# Hooks and Cleanup

This module extends [End-to-End Testing](../end-to-end-testing.md) with rules for where end-to-end runs execute and how
browser runs clean up.

## Keep the Suite Out of Hooks

End-to-end runs never execute at the `pre-commit` or `pre-push` surface that
[Surfaces and Mutation](../../../../conventions/structure/repository-configuration/003-surfaces-and-mutation.md)
declares. A slow hook is the hook that gets bypassed, and a bypassed hook checks nothing.

Run the journeys a change affects before reporting it complete. The complete suite runs in a `scheduled` or `main`
workflow the repository declares, not per pull request, because it is the slowest suite and may depend on outside
services; every repository with a remote and end-to-end tests has that workflow. A scheduled failure is a real failure:
fix it at its cause, as [Root Cause Orientation](../../../../principles/root-cause-orientation.md) requires, rather than
re-running or quarantining it.

A repository with no pull-request gate runs the suite in its local landing gate where its dependencies are local, per
[Automated Quality Gates](../../checks/automated-quality-gates.md).

## Clean Up Even After Failure

A browser run closes every page, tab, and context it opened, in cleanup that runs whether the test passed, failed, or
timed out. It never closes a tab it did not open, which may belong to a person working in the same browser.

A failed cleanup fails the run. Leaked browsers and servers hold ports and state that corrupt the runs that follow.
