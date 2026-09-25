---
description: >-
  Fixes the Ansible baseline: ansible-lint at a recorded profile with yamllint through one configuration, validated role
  inputs, idempotent tasks, check and diff runs before any real one, and Molecule or ansible-test as verification.
when_to_use: >-
  Use when creating, configuring, or reviewing an Ansible playbook, role, inventory, or collection, or when deciding how
  a change to managed hosts is verified before it runs against them.
---

# Ansible Standards

This standard is canonical for Ansible. It holds the choices Ansible leaves open for configuring managed hosts, and an
Ansible infrastructure skill defers here for each rule it applies. It covers infrastructure and hosts only: a
development environment is provisioned under [Native-First Toolchain](../../workflow/native-first-toolchain.md), never
through Ansible.

It implements [Reproducibility](../../../principles/reproducibility.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Fail Closed](../../../principles/fail-closed.md), and
[Evidence Over Assertion](../../../principles/evidence-over-assertion.md).

## Gates

- **Lint:** ansible-lint at the recorded profile, at the [Lint Strictness](../checks/lint-strictness.md) threshold.
  Profiles are cumulative, from `min` through `basic`, `moderate`, `safety`, and `shared` to `production`
  ([profiles](https://github.com/ansible/ansible-lint/blob/main/docs/profiles.md)); its syntax check covers every
  playbook.
- **YAML:** ansible-lint's `yaml` rule runs yamllint and reads the project's yamllint configuration, refusing one
  incompatible with its own defaults
  ([yaml rule](https://github.com/ansible/ansible-lint/blob/main/src/ansiblelint/rules/yaml.md)). Standalone yamllint
  covers YAML outside Ansible content with that same configuration, so the two never disagree.

## Adopter Decision

| Profile      | Gains                                                                  | Costs                                             |
| ------------ | ---------------------------------------------------------------------- | ------------------------------------------------- |
| `production` | fully qualified names everywhere, the strictest published baseline     | every legacy short module name is rewritten first |
| `shared`     | change reporting and packaging rules for content others reuse          | fully qualified names are left to review          |
| `safety`     | risky permissions and unpinned package or source versions are rejected | change reporting is left to review                |

Record the profile in the repository adapter that [Stack Packs](../../../conventions/structure/stack-packs.md) defines.
The rules below hold under any profile.

## Type and Boundary Safety

[Type and Boundary Safety](../code/type-and-boundary-safety.md) owns the rule; Ansible maps it this way.

- A role declares every input in `meta/argument_specs.yml` with its type, requiredness, choices, and description, so
  Ansible rejects a bad value before the role runs
  ([roles](https://github.com/ansible/ansible-documentation/blob/devel/docs/docsite/rst/playbook_guide/playbooks_reuse_roles.rst)).
- A play consuming input without a specification asserts it before first use.
- Modules are named by their fully qualified collection name. A short name resolves by search order and can reach
  another collection's module.

These run when the play runs; never present them or a passing lint as a static-type guarantee.

## Idempotence and Change Reporting

- Each task converges: a second run reports no change. A module is preferred over `command` or `shell`, and a command
  task declares `changed_when`, or `creates` or `removes`, so its reported change is true.
- Collections and roles are pinned to exact versions in a committed requirements file, and upgrades follow
  [Dependency Bump Policy](../../workflow/dependency-bump-policy.md).
- A task handling a secret sets `no_log: true`. Secrets follow
  [No Secrets in Tracked Files](../../../conventions/security/no-secrets-in-tracked-files.md), and inventories follow
  [No Machine-Specific Values](../../../conventions/security/no-machine-specific-values.md).

## Tests

[Test-Driven Development](../testing/test-driven-development.md) applies without exemption, mapped to native tools:

- A role's behaviour starts from a failing Molecule scenario whose verify step asserts the converged state. The default
  sequence converges twice and fails when the second run reports a change
  ([configuration](https://github.com/ansible/molecule/blob/main/docs/configuration.md)). Molecule drives disposable
  instances, so it is the integration layer.
- A collection's Python modules and plugins run `ansible-test` sanity, unit, and integration suites
  ([testing](https://github.com/ansible/ansible-documentation/blob/devel/docs/docsite/rst/dev_guide/testing.rst)), and
  that Python code also follows [Python Standards](python-standards.md).
- A change to real hosts is first run with `--check --diff`. The expected changes are written down first, and the diff
  must show exactly those. Check mode is evidence, not proof: a module without check support reports nothing, and a task
  conditioned on a registered result produces no output
  ([check mode](https://github.com/ansible/ansible-documentation/blob/devel/docs/docsite/rst/playbook_guide/playbooks_checkmode.rst)).
  After a real run, the play asserts that what it configured actually answers, for example through `uri` or `wait_for`.

Layers and gates follow [Test Boundaries and Gates](../testing/test-boundaries-and-gates.md). Only the unit run over a
collection's Python code measures coverage, as [Meaningful Coverage](../testing/meaningful-coverage.md) requires.
Playbooks, roles, and inventories carry no numeric coverage and no surrogate for one.

## Documentation

Each role's README states its purpose, supported platforms, and an example play using placeholder hosts. A change to a
role's inputs is a contract change under [Public Contract](../architecture/public-contract.md) and
[Specification Maintenance](../evidence/specification-maintenance.md).

## Enforcement

An adopter enforces ansible-lint and yamllint in its own hooks and pipeline, and keeps Molecule, integration suites, and
real runs out of commit and push hooks. A real run is a deployment, never a gate's side effect. Review applies argument
specifications, change reporting, secret handling, and the check-mode review.
