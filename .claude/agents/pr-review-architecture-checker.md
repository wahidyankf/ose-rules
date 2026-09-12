---
name: pr-review-architecture-checker
description: >-
  Reviews one pinned change for the architecture discipline, judging new tradeoffs, module boundaries, reversibility,
  blast radius, and new dependencies, and returns anchored findings to the review coordinator.
tools: Read, Glob, Grep, Bash
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/pr-review-architecture-checker.md and follow it as authoritative. If it cannot be read, stop and report
the missing path.
