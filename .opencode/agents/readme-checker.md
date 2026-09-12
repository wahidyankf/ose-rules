---
description: >-
  Audits READMEs against the README conventions for summaries that link out, scannable paragraphs, plain language,
  acronym context, and the sections each kind carries, and returns rated findings without editing.
mode: subagent
permission:
  read: allow
  glob: allow
  grep: allow
  bash: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/readme-checker.md
and follow it as authoritative. If it cannot be read, stop and report the missing path.
