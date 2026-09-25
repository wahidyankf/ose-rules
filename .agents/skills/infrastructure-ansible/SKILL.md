---
name: infrastructure-ansible
description: >-
  Guides Ansible work under the Ansible standard: validating natively before any run, reading a Molecule failure or a
  check-mode diff as the red, finding why a task is not idempotent, and stopping short of every real run.
when_to_use: >-
  Use when writing, changing, or reviewing an Ansible playbook, role, inventory, or collection, before the first
  Molecule scenario or check-mode run of the change.
compatibility: Requires an Ansible project with ansible-lint and a recorded lint profile.
---

# Ansible Infrastructure

Every Ansible rule is owned by
[Ansible Standards](../../../repo-governance/development/quality/stacks/ansible-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, and [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle. This skill adds only the procedure and judgement of applying them to managed hosts. Where a sentence here seems
to state a rule, the standard decides.

## Start From What the Project Records

Read the repository adapter and the project's README: the lint profile, the pinned collections, which Molecule scenarios
exist and what instances they drive, and which inventory groups are real. Run the gates on the untouched tree. A gate
already failing before any edit is handled under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## Validate Natively Before Any Run

Run ansible-lint at the recorded profile, which also runs the syntax check and the YAML rules, before any scenario or
dry run. When a role's input is involved, read its argument specification first: a value it would reject never needs a
host to prove it wrong.

## Read the Failing Scenario or Dry Run as the Red

For a role, add the assertion to the scenario's verify step first and watch it fail on the missing state, not on a
broken converge. Then change the role until converge and verify pass, and the idempotence step reports nothing changed.

For a change to real hosts, write the expected changes down, then run with `--check --diff`, limited to a group such as
`<host-group>`. Read the dry run for what it cannot show: tasks from modules without check support and tasks conditioned
on a registered result stay silent, so their effect is argued from the scenario, not the diff. Anything changed outside
the written expectation stops the change until it is explained.

## Idempotence and Drift

When the second converge reports a change, find which of these it is:

| The task                                            | Usually                                                                |
| --------------------------------------------------- | ---------------------------------------------------------------------- |
| runs `command` or `shell` and always reports change | a module does the job, or `changed_when` or `creates` states the truth |
| writes a file with a timestamp or random content    | the template renders something that differs on every run               |
| sets a package or source to its latest version      | an exact version belongs in the variable                               |
| restarts a service on every run                     | the restart belongs in a handler notified by a real change             |

Never silence it with `changed_when: false` on a task that really changes something. Drift found by a dry run on real
hosts is reported, not converged away as a side effect of an unrelated change.

## Never Run Against Real Hosts Without Explicit Authorization

A run without `--check` against a real inventory, and any ad hoc command that changes a host, needs the user's explicit
authorization for that run, as
[Last-Resort Questions](../../../repo-governance/development/agents/last-resort-questions.md) reserves it. It never
comes bundled with [Commit Authorization](../../../repo-governance/development/workflow/commit-authorization.md).
Prepare the dry-run diff and the written expectation, then stop and ask. Examples in plans and messages use placeholders
such as `<private-host>` and `<host-group>`.

## No Numeric Coverage

[Meaningful Coverage](../../../repo-governance/development/quality/testing/meaningful-coverage.md) gives playbooks,
roles, and inventories no coverage number. Only a collection's Python modules and plugins have one, from their unit run.
When asked for a number elsewhere, report which behaviours have scenario assertions and which changes were dry-run
reviewed, and invent no percentage.

## Before Handing Off

- ansible-lint passed at the recorded profile, and every changed role's scenario passed with a clean idempotence step;
- each new assertion was seen failing on the missing state before it passed;
- every new role input is in the argument specification, and every secret-handling task sets `no_log`;
- the dry-run diff matches the written expectation, with each silent task accounted for; and
- nothing ran against real hosts without authorization for that run.
