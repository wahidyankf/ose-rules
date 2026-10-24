---
description: >-
  Defines the three HIPPO resource tiers as reservations, the two failure modes of a wrong tier, and the queue rule that
  follows from them.
when_to_use: >-
  Use when choosing the `--resource-tier` of a HIPPO-guarded command, or when a tier looks too low or too high for the
  work it guards.
---

# Resource Tiers

A resource tier is a reservation, not a limit: HIPPO does not cap the process, so classify by what the work really
needs. `light` is one narrow static check (a linter, a formatter, one validator). `standard` is an ordinary check, one
project's tests, or a writer. `heavy` is a full build, a whole suite, or a quality gate.

A tier that is too low lets real use exceed the reservation: the host reaches pressure and HIPPO sheds ephemeral work. A
tier that is too high, or `heavy` by habit, holds capacity other runs need and starves the queue. Never choose a tier to
be admitted faster.

Schema 3 keeps one FIFO waiter and launches at most once.

## Observations

A command follows the rule when its tier is the one its work needs and the tier is not changed after a look at the
queue. It breaks the rule when a lone linter runs as `heavy`, a full build runs as `light`, or a tier is edited after
`./hippo status` shows a shorter wait.

## Enforcement

**Unenforced by decision**, because the right tier depends on what the work really needs, which no mechanical check
settles. `scripts/check-hippo-consumer.sh` confirms only that each guarded command carries a `--resource-tier`.
