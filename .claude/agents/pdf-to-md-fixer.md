---
description: "Re-validates each PDF conversion finding against the source and the current Markdown, restores confirmed gaps from the source, and records false positives and uncertain repairs."
name: pdf-to-md-fixer
tools: "Read, Glob, Grep, Write, Edit, Bash"
---

Before acting, read the complete canonical agent definition at the repository-root path .agents/agents/pdf-to-md-fixer.md and follow it as authoritative. If it cannot be read, stop and report the missing path.
