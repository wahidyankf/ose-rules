---
description: "Coordinates one review pass after its specialists report, deduplicating, re-categorizing, filtering, and verifying raw findings, then publishes the single consolidated review bound to the pinned head."
mode: subagent
permission:
  bash: allow
  edit: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/pr-review-synthesis-checker.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
