#!/usr/bin/env bash
# ==============================================================================
# check-word-budget.sh — no governance document exceeds its word budget
# ==============================================================================
# A governance document that grows past a page stops being read, and an unread
# rule is worse than an absent one: it is still cited. The budget is the reason
# this catalog splits a long convention into ordered companion modules instead
# of letting one file absorb everything.
#
# Exit 0 when every governed document is within budget, 1 otherwise.
# ==============================================================================

set -euo pipefail

readonly BUDGET=750

root=$(git rev-parse --show-toplevel)
cd "$root"

over=0
checked=0

# The pathspec names a directory rather than a glob: Git's `*` crosses `/`, so
# `repo-governance/**/*.md` silently skips `repo-governance/README.md` — the one
# file at depth zero. Filtering by suffix here has no such edge.
while IFS= read -r file; do
	[[ "$file" == *.md ]] || continue
	[[ -f "$file" ]] || continue
	checked=$((checked + 1))
	words=$(wc -w <"$file" | tr -d ' ')
	if [[ "$words" -gt "$BUDGET" ]]; then
		printf '[word-budget] %s: %s words, budget %s\n' "$file" "$words" "$BUDGET" >&2
		over=$((over + 1))
	fi
done < <(git ls-files -co --exclude-standard -- 'AGENTS.md' 'CLAUDE.md' 'repo-governance')

if [[ "$over" -gt 0 ]]; then
	printf '[word-budget] %s of %s governed document(s) over budget\n' "$over" "$checked" >&2
	exit 1
fi

printf '[word-budget] %s governed document(s), all within %s words\n' "$checked" "$BUDGET"
