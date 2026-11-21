#!/usr/bin/env bash
# Lint every tracked shell file with the pinned ShellCheck (contract rule C16).
# A linter that drifts between machines turns its warnings into noise, so the
# version is checked before anything is linted, and any other version fails
# closed rather than linting with a different rule set.
set -euo pipefail

pinned_version="0.11.0"

command -v shellcheck >/dev/null 2>&1 || {
	printf '%s\n' "check-shell-lint.sh: shellcheck is not installed; install ShellCheck ${pinned_version}" >&2
	exit 2
}

# The version line is the only part of `shellcheck --version` this check reads.
installed_version=$(shellcheck --version | sed -n 's/^version: //p')
if [[ "$installed_version" != "$pinned_version" ]]; then
	printf 'check-shell-lint.sh: ShellCheck %s is required, found %s\n' \
		"$pinned_version" "${installed_version:-none}" >&2
	exit 2
fi

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$repo_root"

# A shell file is one whose name ends in .sh, or whose first line is a bash or
# sh shebang. The shebang rule reaches the extensionless wrappers (hippo, rhino,
# ferret) and the Git hooks in .husky. Fixtures are byte-identical corpora that
# other repositories verify by digest, so they are never linted here.
shell_files=()
while IFS= read -r -d '' path; do
	case "$path" in
	specs/fixtures/*) continue ;;
	*.sh)
		shell_files+=("$path")
		continue
		;;
	esac
	[[ -f "$path" ]] || continue
	first_line=$(head -n 1 -- "$path" || true)
	if [[ "$first_line" =~ ^#!.*[[:space:]/](ba)?sh([[:space:]]|$) ]]; then
		shell_files+=("$path")
	fi
done < <(git ls-files -z)

# An empty list would pass vacuously, so it fails closed instead.
if [[ ${#shell_files[@]} -eq 0 ]]; then
	printf '%s\n' 'check-shell-lint.sh: no tracked shell files were found' >&2
	exit 2
fi

# exec hands ShellCheck's own exit status to the gate.
exec shellcheck --shell=bash --severity=warning "${shell_files[@]}"
