---
name: pr-review-fixer
description: >-
  Answers every finding of a published review on one change with a fix, a reasoned reject, or a deferral, tags each
  answer's cause, replies where the finding is recorded, and resolves only what evidence settles.
tools: Read, Glob, Grep, Write, Edit, Bash
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/pr-review-fixer.md and follow it as authoritative. If it cannot be read, stop and report the missing
path.
