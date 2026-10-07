---
description: |-
  Writes or substantially revises one workflow document to the workflow pattern: an observable entry with typed inputs, declared steps that name only existing agents and workflows, bounded repetition, and a stated exit.
disallowedTools: |-
  agent, agent_output
name: repo-workflow-maker
tools: |-
  read_file, read_directory, grep, glob, write_file, edit_file
---

Before acting, read the complete canonical agent definition at the repository-root path
.agents/agents/repo-workflow-maker.md and follow it as authoritative.
If it cannot be read, stop and report the missing path.
