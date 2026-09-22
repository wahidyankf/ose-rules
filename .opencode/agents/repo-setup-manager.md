---
description: |-
  Proves a plan's execution checkout ready before any change: runs the declared bootstrap and toolchain check, records the in-scope gates as a baseline, and triages every failure without repairing code.
mode: subagent
permission:
  bash: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/repo-setup-manager.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
