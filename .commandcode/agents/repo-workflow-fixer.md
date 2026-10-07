---
description: |-
  Applies workflow checker findings to workflow documents after re-validating each against the current text, edits only what the cited rule settles, and records what it fixed, disproved, and left for a person.
disallowedTools: |-
  agent, agent_output
name: repo-workflow-fixer
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/repo-workflow-fixer.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
