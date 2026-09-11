---
description: >-
  Indexes the catalog's canonical skills, one directory per skill, each holding the SKILL.md a harness reads and the
  resources that skill resolves beside it.
when_to_use: >-
  Use when locating a canonical skill or deciding where a new skill's resources belong.
---

# Canonical Skills

Skills in their canonical form. One directory per skill, each containing a `SKILL.md` and whatever resources that skill
resolves relative to its own directory.

Codex and OpenCode read this layout natively, so for those harnesses the canonical file is already the surface and an
adapter would be a second copy of a file they were going to read anyway. Claude Code reads only `.claude/skills/`, so it
is the one harness that needs a generated route.

## Directory Map

- [adopt-artifact](adopt-artifact/SKILL.md)
- [assess-alignment](assess-alignment/SKILL.md)
- [grill-me](grill-me/SKILL.md)
- [plan-creating-project-plans](plan-creating-project-plans/SKILL.md)
- [plan-grooming-idea-briefs](plan-grooming-idea-briefs/SKILL.md)
- [plan-validating-quality](plan-validating-quality/SKILL.md)
- [plan-verifying-execution](plan-verifying-execution/SKILL.md)
- [plan-writing-gherkin-criteria](plan-writing-gherkin-criteria/SKILL.md)
