---
description: |-
  Audits named workflow documents against the workflow pattern for their contract, step declarations, references, checkpoints, bounded repetition, and exit, and returns rated findings without modifying anything.
disallowedTools: |-
  agent, agent_output, write_file, edit_file
name: repo-workflow-checker
tools: |-
  read_file, read_directory, grep, glob, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/repo-workflow-checker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
