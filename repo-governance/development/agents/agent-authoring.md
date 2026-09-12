---
description: >-
  Fixes what makes a canonical agent definition sound beyond its schema: one role, capabilities derived from that role,
  a name that states it, progressive reports, and a body that links rather than restates.
when_to_use: >-
  Use when writing an agent definition, deciding whether to extend an existing agent instead, or reviewing one that has
  grown.
---

# Agent Authoring

The [metadata schema](../../conventions/structure/artifact-metadata/001-schemas-by-path.md) decides whether an agent
definition is well formed. This standard decides whether it is a good agent: invoked for the right reason, trustworthy
with its grants, and stopping when done.

## One Role, One Stopping Rule

An agent does one job and knows when that job is finished. A definition that needs "and" to state its role is two
agents.

The first casualty of a combined role is independence: an agent that both produces and reviews content cannot be run as
a review, because nothing stops it changing what it judges. Separate roles also keep capability lists short enough to
believe.

Before creating an agent, read the roster. Create a new one when the need differs from the closest existing agent in
domain or responsibility, required capabilities, or workload tier; extend that agent when only a procedure varies within
the same role. A near-duplicate agent is a duplicated body in agent form; see [Capability Forms](capability-forms.md).

## Capabilities Follow the Role

Least privilege is decided from the role, not from what might one day be convenient. The
[portable capabilities](../../conventions/structure/artifact-metadata/004-portable-capabilities.md) supply the
vocabulary; the role supplies the selection.

- **Reviewer or checker:** `repository-read`, plus `shell` when it runs validators, plus the reporting form below.
- **Maker or fixer:** `repository-read` and `repository-write`, plus `shell` when it runs gates.
- **Researcher:** `repository-read`, plus `network` when its sources are external.
- **Orchestrator:** `subagent`, plus only what its own steps do directly.

Each is a starting point, not an entitlement; every capability beyond it needs a reason a reviewer can find in the body.

An agent declaring `subagent` orchestrates only while top-level. As a delegate it hands further delegation back to its
caller, for the reason the Skills Never Delegate section of [Capability Forms](capability-forms.md) gives.

### Adopter Decision: How a Checker Reports

Under either option, a checker never modifies what it judges. Record the choice once.

- **Report file.** The checker adds `repository-write` for its own report only, which follows the progressive-report
  rule below. Findings survive an interrupted run, but the body, not the harness, keeps writes off the judged content.
- **Read-only.** The checker declares the `read-only` constraint and returns findings to its caller, as
  [Plan Checker](../../../.agents/agents/plan-checker.md) does. The harness enforces non-modification, but findings
  exist only in the caller's context until recorded.

## The Name States the Role

The `name` matches the file basename, as the schema requires, and says what the agent does to what. Patterns such as
`<domain>-checker` illustrate that shape; no closed role vocabulary is required. A bare `checker`, `helper`, or
`assistant` routes nowhere: harnesses and readers choose an agent by name and trigger before reading its body.

The `description` states what the agent does and `when_to_use` the situation that calls for it. A vague pair gets the
agent invoked for the wrong work, or never.

## Reports Are Written as Findings Are Confirmed

An agent that produces a report file creates it when it starts, marked in progress; appends each finding as soon as it
is confirmed; and marks the report complete, with totals, when it stops.

Buffering findings until the end loses them all when the run is interrupted or compacted, and can leave an empty file
that reads as clean. A report still marked in progress cannot pass for a finished one, the distinction
[Fail Closed](../../principles/fail-closed.md) exists to keep.

## The Body Applies Rules; It Does Not Restate Them

An agent body holds what is specific to its role: responsibility, procedure, stopping rule, and what it does not do. A
rule other artifacts also follow stays with the convention or skill that owns it, which the agent links or declares.

An agent declares every skill its work depends on: a delegated agent inherits no session context, so an undeclared skill
never reaches it.

A copied rule gets corrected once, in its owner, and stays wrong in the agent; see
[One Source Per Fact](../../principles/one-source-per-fact.md).

## What Stays Out

Colours, tool names, permission keys, and model identifiers are harness presentation. They belong to the
[generated adapter](harness-adapters.md) or the repository's tier mapping; a canonical definition carrying them has
become one harness's configuration.
