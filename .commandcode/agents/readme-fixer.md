---
description: |-
  Applies README checker findings after re-validating each against the current file, edits only objective, high-confidence repairs, and leaves judgements of tone, hook, and emphasis for a person.
disallowedTools: |-
  agent, agent_output
name: readme-fixer
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/readme-fixer.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
