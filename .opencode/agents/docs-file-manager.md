---
description: "Renames, moves, and deletes documents and directories after mapping every reference to them, repairs those references and the affected indexes, and proves nothing was left broken."
mode: subagent
permission:
  bash: allow
  edit: allow
  glob: allow
  grep: allow
  read: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/docs-file-manager.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
