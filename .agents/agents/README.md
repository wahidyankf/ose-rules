# Canonical Agents

Agent definitions in their canonical, harness-neutral form. One Markdown file per agent.

An agent here declares what it needs and what it must not do in this repository's own vocabulary, and a harness adapter
translates that declaration into whatever the harness understands. The canonical file is the one a human edits; an
adapter is generated from it and is never edited in place.

## Directory Map

- [plan-maker](plan-maker.md)
- [plan-checker](plan-checker.md)
- [plan-execution-checker](plan-execution-checker.md)
