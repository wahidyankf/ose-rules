---
description: |-
  Checks that internal links and anchors in documentation resolve and that external addresses respond, under the link form and result memory the repository recorded, and returns rated findings.
disallowedTools: |-
  agent, agent_output, write_file, edit_file
name: docs-link-checker
tools: |-
  read_file, read_directory, grep, glob, shell_command, run_command, kill_shell, web_search, web_fetch
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/docs-link-checker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
