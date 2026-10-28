#!/usr/bin/env bash
# Verify the catalog's remote-dispatch placement and refusal contract (RD-A2).
set -euo pipefail

repo_root=$(CDPATH='' cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)

module="$repo_root/repo-governance/development/workflow/resource-aware-development/004-remote-dispatch.md"
entrypoint="$repo_root/repo-governance/development/workflow/resource-aware-development.md"
map="$repo_root/repo-governance/development/workflow/resource-aware-development/README.md"

[[ -r "$module" ]] || {
	printf 'FAIL: remote-dispatch module is missing or unreadable\n' >&2
	exit 1
}

grep -Fq 'REMOTE_DISPATCH_HOME' "$module"
grep -Fq 'dispatch must not happen' "$module"
grep -Fq 'recorded' "$module"
grep -Fq 'refusal' "$module"
grep -Fq 'single HIPPO boundary' "$module"
grep -Fq 'placed on the target host' "$module"
grep -Fq 'before remote work' "$module"
grep -Fq 'delete it last' "$module"
grep -Fq 'no-secrets-in-tracked-files.md' "$module"
grep -Fq 'no-machine-specific-values.md' "$module"
grep -Fq 'public-outbound-safety.md' "$module"
grep -Fq '004-remote-dispatch.md' "$entrypoint"
grep -Fq 'single guard sits on the target host' "$entrypoint"
grep -Fq '004-remote-dispatch.md' "$map"
grep -Fq 'max-worktree caps' "$module"

printf '%s\n' 'Remote-dispatch refusal contract: PASS'
