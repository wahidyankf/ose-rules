---
name: repo-workflow-fixer
description: >-
  Applies workflow checker findings to workflow documents after re-validating each against the current text, edits only
  what the cited rule settles, and records what it fixed, disproved, and left for a person.
tools: Read, Glob, Grep, Write, Edit, Bash
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/repo-workflow-fixer.md and follow it as authoritative. If it cannot be read, stop and report the missing
path.
