---
description: "Audits a repository's harness bindings for internal parity with their canonical sources and for drift from each harness's current documented conventions, and returns rated findings without editing."
name: harness-compatibility-checker
tools: "Read, Glob, Grep, Bash"
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/harness-compatibility-checker.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
