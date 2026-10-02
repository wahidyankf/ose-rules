---
description: |-
  Executes API HTTP Propagation on a frozen api-http ledger, replaying each row's request, repairing the service test-first, specifying correct but unspecified behaviour, and leaving breaking contract changes to their owner.
mode: subagent
permission:
  bash: allow
  edit: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/api-http-fixer.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
