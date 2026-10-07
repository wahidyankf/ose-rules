---
description: |-
  Writes or reworks one tutorial of a single declared type, with the required sections in order, every example run as printed, and checkpoints a learner can confirm.
disallowedTools: |-
  agent, agent_output
name: docs-tutorial-maker
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/docs-tutorial-maker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
