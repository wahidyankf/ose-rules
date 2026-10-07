---
description: |-
  Reviews tutorials for one declared type, required sections in order, runnable examples with real output, progressive complexity, and checkpoints, and returns rated findings without editing anything.
disallowedTools: |-
  agent, agent_output, write_file, edit_file
name: docs-tutorial-checker
tools: |-
  read_file, read_directory, grep, glob, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/docs-tutorial-checker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
