---
description: |-
  Audits a running HTTP interface with real requests against its contract and behaviour specifications, judging status codes, shapes, authorization, pagination, idempotency, and payload handling, and returns criticality-rated findings with reproducing requests, without modifying anything.
mode: subagent
permission:
  bash: allow
  glob: allow
  grep: allow
  read: allow
  webfetch: allow
  websearch: allow
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/api-http-checker.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
