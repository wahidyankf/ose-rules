#!/usr/bin/env bash
# The complete local gate: the pull-request surface over the change since the
# default branch. It dispatches the same registry the hosted gate reads, so a
# local pass and a hosted pass are statements about one declaration (C1, C9).
set -euo pipefail

# An outer shell or a hook can export variables that point Git at another
# checkout. Clearing them makes every Git call below read this checkout.
unset GIT_DIR GIT_WORK_TREE GIT_INDEX_FILE GIT_OBJECT_DIRECTORY \
	GIT_ALTERNATE_OBJECT_DIRECTORIES GIT_COMMON_DIR GIT_NAMESPACE GIT_PREFIX

repo_root=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
cd "$repo_root"

base=$(git merge-base origin/main HEAD)
head=$(git rev-parse HEAD)

# With no commit since the default branch the range is empty. RHINO accepts an
# empty range, but the commit-message entry then has no message to lint and
# fails, which reads as a finding. Refuse with the reason instead, and fail
# closed rather than pass a change that was never measured.
if [[ "$base" == "$head" ]]; then
	printf '%s\n' 'check-complete.sh: no commit since origin/main to gate; commit the change first' >&2
	exit 2
fi

# exec hands the gate's own exit status to the caller.
exec ./rhino gate run --surface pull-request --base "$base" --head "$head"
