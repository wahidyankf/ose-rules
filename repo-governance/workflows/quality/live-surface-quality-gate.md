---
name: live-surface-quality-gate
description: >-
  Exercises an interface or user-interface surface once, applies at most one fix pass, and verifies only the original
  findings plus a regression smoke, ending pass, partial, or fail without ever starting another pass.
when_to_use: >-
  Use when a delivery ships a reachable interface or user-interface surface, before its change is merged.
---

# Live Surface Quality Gate

## Entry

The surface to test is reachable, its contract or specification resolves, and every operation in scope is safe to run
against the target's data, per [Test Data Isolation](../../development/quality/testing/test-data-isolation.md).

- `surface` (`enum`: `interface`, `user-interface`, required): what the delivery ships.
- `target` (`string`, required): the running address or component set, with the contract or specification it is tested
  against.
- `mode` (optional `enum`, default `strict`): the lowest criticality counted. `lax` counts only `CRITICAL`, `normal`
  adds `HIGH`, `strict` adds `MEDIUM`, and `all` counts every level, per
  [Criticality Levels](../../development/quality/evidence/finding-criticality-and-confidence/001-criticality-levels.md).

## Sequence

1. **Separate delegated checks.** Predicates a hook or pipeline already owns keep their own evidence and never become
   findings here; missing evidence stays `pending`.
2. **Discover once.** A tester sweeps the whole target: an interface through real requests against its contract and
   behaviour specifications, covering status codes, response and error shapes, authorization boundaries, pagination,
   idempotency, and boundary payloads; a user interface through its components and interactions against the design and
   accessibility rules the repository adopts. A tester that cannot finish, or a contract that does not resolve, ends the
   run `fail`.
3. **Triage against `mode`.** Count the findings `mode` admits. A tester rating on another severity scale maps severity,
   never priority, onto the criticality levels. No counted finding ends the run `pass`. Otherwise the counted findings,
   with their identifiers and reproduction steps, become the complete verification target.
4. **Fix once.** Re-validate each counted finding and fix those the evidence settles; flag the rest for a person. Each
   fix lands with a reproducing test that fails before it and passes after, per
   [Regression Tests](../../development/quality/testing/test-driven-development/003-regression-tests.md). Behaviour that
   is correct but unspecified gains scenarios in the specification, because a missing scenario is a real gap. The fixer
   never runs again in this run; a fixing error ends it `fail`.
5. **Rebuild and redeploy once** when the surface runs as a service. A build or deployment error ends the run `fail`.
6. **Verify once, in scope.** The tester reproduces each original finding against the current build, then runs a
   regression smoke over what the fixes touched: affected operations, authorization boundaries, payload shapes, and
   error behaviour for an interface; affected components and interactions for a user interface. It neither repeats the
   full discovery nor widens to unrelated parts.

## Exit

`final-status` (`enum`: `pass`, `partial`, `fail`) is `pass` after a clean discovery or a clean verification, `partial`
when an original finding remains or the smoke finds a regression, and `fail` on a tester, contract, fixer, build, or
deployment error. The run also leaves the findings record (`file`) and `lifecycle-status` (`enum`: `verified`,
`pending`, `not-applicable`). No outcome starts another pass: a `partial` is resolved by a new run after new work.

## Example Usage

```text
Run live-surface-quality-gate with surface interface against the staging address and its published contract.
```

## Related Workflows

- [Exploratory and Usability Review](exploratory-usability-review.md) explores a running application for what no
  contract states.
- [PR Review](pr-review.md) reads the change itself; this gate tests what the change does.

## Which Deliveries Run It

The gate is surface-conditional. A delivery shipping an interface runs it for that surface, one shipping a user
interface runs it for that one, and one shipping both runs it twice. A delivery shipping neither is not thereby exempt:
if it changes behaviour someone can reach, such as a command, library, hook, or pipeline, it exercises that behaviour
through its own interface and records what ran. Only a delivery with no reachable behaviour change is exempt, and it
says so explicitly.

For every delivery that runs it, a `partial`, `fail`, or `pending` result blocks merge under
[Pull Request Merge](../../development/workflow/pull-request-merge.md).

## Why Each Step Runs Once

Evidence here comes from a running system, so every pass costs a build and a sweep. A loop of rediscovery would chase
findings its own fixes created. Three fixed steps are a known bound, per
[Bounded Convergence](../../development/workflow/bounded-convergence.md), and a scoped verification of the original
findings shows exactly what the fix pass achieved. This workflow implements
[Evidence Over Assertion](../../principles/evidence-over-assertion.md) and
[Simplicity Over Complexity](../../principles/simplicity-over-complexity.md).
