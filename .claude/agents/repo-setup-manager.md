---
name: repo-setup-manager
description: >-
  Proves a plan's execution checkout ready before any change: runs the declared bootstrap and toolchain check, records
  the in-scope gates as a baseline, and triages every failure without repairing code.
tools: Read, Glob, Grep, Bash
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/repo-setup-manager.md and follow it as authoritative. If it cannot be read, stop and report the missing
path.
