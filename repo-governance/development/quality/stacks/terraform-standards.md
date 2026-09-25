---
description: >-
  Fixes the Terraform baseline: format, validate, and lint gates, typed and described variables, pinned versions with a
  committed lock file, no state or secret variable files in history, and native tests plus plan review as verification.
when_to_use: >-
  Use when creating, configuring, or reviewing a Terraform module or root configuration, or when deciding how a change
  to declared infrastructure is verified before anyone applies it.
---

# Terraform Standards

This standard is canonical for Terraform. It holds the choices Terraform leaves open for declared infrastructure, and a
Terraform infrastructure skill defers here for each rule it applies. It covers infrastructure and hosts only: a
development environment is provisioned under [Native-First Toolchain](../../workflow/native-first-toolchain.md), never
through Terraform.

It implements [Reproducibility](../../../principles/reproducibility.md),
[Explicit Over Implicit](../../../principles/explicit-over-implicit.md),
[Fail Closed](../../../principles/fail-closed.md), and
[Evidence Over Assertion](../../../principles/evidence-over-assertion.md).

## Gates

- **Formatting:** `terraform fmt -check -recursive` fails on any file it would rewrite.
- **Validation:** `terraform validate` over every root and module. It proves syntax and internal consistency only, never
  that a change is right ([validate](https://developer.hashicorp.com/terraform/cli/commands/validate)).
- **Lint:** Terraform ships none, so a third-party linter with each provider's rule set runs at the
  [Lint Strictness](../checks/lint-strictness.md) threshold
  ([style guide](https://developer.hashicorp.com/terraform/language/style)). Example: TFLint with provider plugins.

## Type and Boundary Safety

[Type and Boundary Safety](../code/type-and-boundary-safety.md) owns the rule; Terraform maps it this way.

- Every variable declares a `type` and a `description`. A `type = any` carries an inline reason.
- A variable whose valid values are narrower than its type carries a `validation` block whose error message states the
  rule ([variables](https://developer.hashicorp.com/terraform/language/values/variables)).
- An assumption about a resource or data source is a `precondition` or `postcondition`. A `check` block only warns, so
  it never stands in for a condition that must stop the run
  ([validate configuration](https://developer.hashicorp.com/terraform/language/validate)).

These are evaluated when Terraform plans, not over the source; never present them as a static-type guarantee.

## Versions and State

- `required_version` bounds the Terraform binary, `required_providers` pins every provider's source and version, and
  each module call pins its version. The dependency lock file `.terraform.lock.hcl` is committed, and upgrades follow
  [Dependency Bump Policy](../../workflow/dependency-bump-policy.md).
- Never commit a state file, its backups, the `.terraform` directory, or a variable file holding a secret. State lives
  in the backend the adopter records.
- A value marked `sensitive` is hidden from output but still written to state in plaintext, so reading state is secret
  access. A value that must never persist is declared ephemeral.
- Secrets follow [No Secrets in Tracked Files](../../../conventions/security/no-secrets-in-tracked-files.md), and hosts
  and addresses follow [No Machine-Specific Values](../../../conventions/security/no-machine-specific-values.md).

## Code Shape

- A renamed or relocated resource declares a `moved` block, so the plan shows a move rather than a destroy and a create
  ([refactoring](https://developer.hashicorp.com/terraform/language/modules/develop/refactoring)).
- A reusable module takes environment values as variables; only root configurations hold them.

## Tests

[Test-Driven Development](../testing/test-driven-development.md) applies without exemption, mapped to native tools
([tests](https://developer.hashicorp.com/terraform/language/tests)):

- Module behaviour, such as input validation, conditional resources, and outputs, starts from a failing `terraform test`
  run block. A `command = plan` run with mocked providers is the unit layer. A default run applies and then destroys
  real resources, so it is the integration layer.
- Each rejected input has a run block that names it in `expect_failures`.
- A change to a root configuration is verified by plan review. The expected changes are written down first; the saved
  plan must show exactly those, and an unexpected replacement or destruction fails it. The reviewed plan file is the one
  applied.

Layers and gates follow [Test Boundaries and Gates](../testing/test-boundaries-and-gates.md). Terraform carries no
numeric coverage: the language is declarative and no instrument measures it
([discussion](https://github.com/hashicorp/terraform/issues/37605)), as
[Meaningful Coverage](../testing/meaningful-coverage.md) requires. Never report a surrogate such as the share of
resources with a test.

## Documentation

Every variable and output carries its description, and a module's README states its inputs, outputs, and required
providers. A change to a module's interface is a contract change under
[Public Contract](../architecture/public-contract.md) and
[Specification Maintenance](../evidence/specification-maintenance.md).

## Adopter Decision

Whether integration runs exist, against a dedicated test account, or verification stops at mocked plan-mode runs and
plan review, is recorded in the repository adapter that [Stack Packs](../../../conventions/structure/stack-packs.md)
defines. Real runs prove provider behaviour at the cost of spend, credentials, and cleanup of failed runs.

## Enforcement

An adopter enforces the format, validate, and lint gates and the plan-mode tests in its own hooks and pipeline, and
keeps apply-mode tests out of commit and push hooks. Applying a plan is a deployment, never a side effect of a gate.
Review applies variable typing, version pins, state and secret handling, and the plan review.
