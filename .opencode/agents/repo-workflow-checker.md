---
description: "Audits named workflow documents against the workflow pattern for their contract, step declarations, references, checkpoints, bounded repetition, and exit, and returns rated findings without modifying anything."
mode: subagent
permission:
  bash: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/repo-workflow-checker.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
