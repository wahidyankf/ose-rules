#!/usr/bin/env bash
# Verify the catalog's own HIPPO consumer and contained-worktree rule.
set -euo pipefail

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)

jq -e '.schemaVersion == 1 and .source == "ose-rules"' "$repo_root/hippo.identity.json" >/dev/null
jq -e '.schemaVersion == 3 and .coordination.tiers.light and .coordination.tiers.standard and .coordination.tiers.heavy' \
  "$repo_root/hippo.local.json.example" >/dev/null
grep -Eq '^version=v(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)$' "$repo_root/hippo.lock"
grep -Eq '^commit=[0-9a-f]{40}$' "$repo_root/hippo.lock"
grep -Fq 'HIPPO_DEFAULT_IDENTITY' "$repo_root/hippo"
grep -Fq -- '--path-format=absolute --git-common-dir' "$repo_root/hippo"
grep -Eq '^/?worktrees/$' "$repo_root/.gitignore"
grep -Fq '{repository location}/worktrees/<task>' \
  "$repo_root/repo-governance/development/workflow/integration-path.md"
resource_rule="$repo_root/repo-governance/development/workflow/resource-aware-development.md"
grep -Fq 'exit `75`' "$resource_rule"
grep -Fq 'schema-1 `never-started` receipt' "$resource_rule"
grep -Fq 'exit `76`' "$resource_rule"
grep -Fq 'never retry blindly' "$resource_rule"
grep -Fq 'legacy client without distinct exit `76`' "$resource_rule"
grep -Fq 'read the Hippo repository at the commit' "$resource_rule"
grep -Fq 'in `hippo.lock`, then align' "$resource_rule"
grep -Fq 'worktree-local wrapper' "$resource_rule"
grep -Fq './hippo status' "$resource_rule"
grep -Fq '30 days' "$resource_rule"

tier_findings=$(git -C "$repo_root" grep -n -E \
  '\./hippo run --class (ephemeral|service|transactional)' -- \
  . ':(exclude)plans/done/**' ':(exclude)scripts/worktree-layout-audit.sh' \
  ':(exclude)scripts/check-hippo-consumer.sh' | grep -v -- '--resource-tier' || true)
if [ -n "$tier_findings" ]; then
  printf 'FAIL: HIPPO commands missing --resource-tier:\n%s\n' "$tier_findings" >&2
  exit 1
fi

nested_findings=$(git -C "$repo_root" grep -n -E \
  '\./hippo run .*-- (rtk )?npm (run|test)( |$)' -- \
  . ':(exclude)plans/done/**' ':(exclude)scripts/worktree-layout-audit.sh' \
  ':(exclude)scripts/check-hippo-consumer.sh' || true)
if [ -n "$nested_findings" ]; then
  printf 'FAIL: HIPPO commands double-guard package scripts:\n%s\n' "$nested_findings" >&2
  exit 1
fi

jq -e '
  .scripts.format | contains("./hippo run --class transactional --resource-tier standard")
' "$repo_root/package.json" >/dev/null
jq -e '
  .scripts["check:complete"] | contains("./hippo run --class ephemeral --resource-tier heavy") and contains("gate run --surface main")
' "$repo_root/package.json" >/dev/null
grep -Fq './rhino harness adapters generate' "$repo_root/AGENTS.md"
grep -Fq './rhino harness adapters validate' "$repo_root/README.md"
! grep -R -Fq 'gate run --surface ci' \
  "$repo_root/.github" "$repo_root/.husky" "$repo_root/package.json" "$repo_root/AGENTS.md" "$repo_root/README.md"

printf '%s\n' 'HIPPO consumer and worktree containment: PASS'
