#!/usr/bin/env bash
# Format only the paths the gate selected from the index or the immutable
# review range. This is the one kind of work the pre-commit surface holds (C6):
# a formatter rewrites the staged file and the gate restages it, which a hosted
# job cannot do, so the same formatter also replays at pull-request.
set -euo pipefail

for file in "$@"; do
	# A selected path can be a deletion. It has no working-tree bytes to format,
	# and asking the formatter to read it turns a valid removal into a false
	# failure.
	[[ -e "$file" || -L "$file" ]] || continue
	case "$file" in
	*.md | *.json | *.yml | *.yaml)
		# Paths under .prettierignore are skipped by Prettier itself, so the
		# generated adapter bytes and the byte-identical fixtures stay untouched.
		# The gate runs this in a snapshot of the index or a detached worktree,
		# where there is no node_modules, so Prettier comes from PATH. The hook
		# and the hosted job both put this checkout's node_modules/.bin on PATH
		# by absolute path, and a missing Prettier fails closed with exit 127.
		prettier --write "$file"
		;;
	*) ;;
	esac
done
