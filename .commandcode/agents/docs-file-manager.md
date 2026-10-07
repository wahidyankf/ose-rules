---
description: |-
  Renames, moves, and deletes documents and directories after mapping every reference to them, repairs those references and the affected indexes, and proves nothing was left broken.
disallowedTools: |-
  agent, agent_output
name: docs-file-manager
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/docs-file-manager.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
