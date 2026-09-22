---
description: |-
  Reviews tutorials for one declared type, required sections in order, runnable examples with real output, progressive complexity, and checkpoints, and returns rated findings without editing anything.
mode: subagent
permission:
  bash: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/docs-tutorial-checker.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
