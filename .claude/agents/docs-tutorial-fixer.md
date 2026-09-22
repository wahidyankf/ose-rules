---
description: |-
  Re-validates each tutorial review finding against the current file, applies only objective findings with one correct repair, and records false positives and judgement calls for others.
name: docs-tutorial-fixer
tools: |-
  Read, Glob, Grep, Write, Edit, Bash
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/docs-tutorial-fixer.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
