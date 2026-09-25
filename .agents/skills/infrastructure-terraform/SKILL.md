---
name: infrastructure-terraform
description: >-
  Guides Terraform work under the Terraform standard: validating natively before any plan, reading a test or plan as the
  red, choosing between a moved block and a state command, and stopping short of every apply.
when_to_use: >-
  Use when writing, changing, or reviewing a Terraform module or root configuration, before the first plan or test of
  the change.
compatibility: Requires a Terraform root configuration or module with a recorded backend and pinned providers.
---

# Terraform Infrastructure

Every Terraform rule is owned by
[Terraform Standards](../../../repo-governance/development/quality/stacks/terraform-standards.md).
[Test-Driven Development](../../../repo-governance/development/quality/testing/test-driven-development.md) and
[Test Boundaries and Gates](../../../repo-governance/development/quality/testing/test-boundaries-and-gates.md) govern
tests and gates, and [Red, Green, Refactor](../../../repo-governance/workflows/quality/red-green-refactor.md) runs each
cycle. This skill adds only the procedure and judgement of applying them to declared infrastructure. Where a sentence
here seems to state a rule, the standard decides.

## Start From What the Project Records

Read the repository adapter and the project's README: the backend, which accounts serve integration test runs, the
pinned Terraform and provider versions, and where the test files live. Run the gates on the untouched tree. A gate
already failing before any edit is handled under
[Preexisting Error Resolution](../../../repo-governance/development/quality/evidence/preexisting-error-resolution.md).

## Validate Natively Before Any Plan

Run the format check, then validate, then the linter, before asking for a plan. Initializing without the backend, for
example `terraform init -backend=false`, lets validation run without state credentials. A plan requested over code that
fails validation only reports the same error more slowly, and a clean validate still says nothing about what the plan
will do.

## Read the Test or Plan as the Red

For a module, write the `terraform test` run block first and watch it fail on its assertion, not on a missing file or an
undeclared variable. Prefer a plan-mode run with mocked providers; reach for an apply-mode run only when the behaviour
lives in the provider, and only with authorization.

For a root configuration, write the expected changes down before planning, then save the plan and read every action:

| The plan shows                        | Usually                                                                |
| ------------------------------------- | ---------------------------------------------------------------------- |
| a replacement you did not expect      | an argument the provider cannot update in place, or a changed address  |
| a destruction you did not expect      | a resource removed from code or a `count` index that shifted           |
| changes to resources you never edited | drift, or a provider upgrade that changed defaults                     |
| no changes where you expected some    | the edit sits behind a condition or in a module the root does not call |

Anything outside the written expectation stops the change until it is explained.

## State and Modules

When an address changes, write a `moved` block rather than a state command: the move is reviewed in code and replayed
the same way everywhere. Bring an existing resource under management with an import declaration for the same reason.
Never edit state by hand, and never use targeting or state removal to make an unexpected plan look clean; each hides the
cause the plan was showing.

## Never Apply Without Explicit Authorization

Applying, destroying, an apply-mode test run, and any state-changing command act on real infrastructure. Each needs the
user's explicit authorization for that run, as
[Last-Resort Questions](../../../repo-governance/development/agents/last-resort-questions.md) reserves it, and never
comes bundled with [Commit Authorization](../../../repo-governance/development/workflow/commit-authorization.md).
Prepare the saved plan and the written expectation, then stop and ask. Never pass an automatic-approval flag. Examples
in plans and messages use placeholders such as `<private-host>` and `<account-id>`.

## No Numeric Coverage

[Meaningful Coverage](../../../repo-governance/development/quality/testing/meaningful-coverage.md) gives Terraform no
coverage number. When asked for one, report which behaviours have run blocks and which root changes were plan-reviewed,
and invent no percentage.

## Before Handing Off

- the format check, validate, and the linter passed, and the plan-mode tests passed;
- each new behaviour's run block was seen failing on its assertion before it passed;
- every variable added has a type and a description, and every rejected input has an `expect_failures` run;
- the saved plan matches the written expectation, with each replacement and destruction explained; and
- nothing was applied, destroyed, or moved in state without authorization for that run.
