---
description: |-
  Converts one PDF into a verbatim Markdown file that keeps every passage, table, heading level, list depth, footnote, and figure in reading order, and marks each page recovered by character recognition.
disallowedTools: |-
  agent, agent_output
name: pdf-to-md-maker
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file, shell_command, run_command, kill_shell
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/pdf-to-md-maker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
