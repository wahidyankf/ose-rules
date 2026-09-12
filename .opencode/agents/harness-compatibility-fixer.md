---
description: >-
  Re-validates harness compatibility findings against current files and their cited sources, repairs mechanical drift at
  the canonical source, regenerates adapters, and hands every decision to a person.
mode: subagent
permission:
  read: allow
  glob: allow
  grep: allow
  edit: allow
  bash: allow
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/harness-compatibility-fixer.md and follow it as authoritative. If it cannot be read, stop and report the
missing path.
