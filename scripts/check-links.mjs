#!/usr/bin/env node
// =============================================================================
// check-links.mjs — every internal Markdown link resolves
// =============================================================================
// A catalog is a set of documents that point at each other. A pointer that does
// not resolve is not a small blemish: the reader who follows it concludes the
// rule was withdrawn, and the next author copies the broken shape.
//
// External links are not fetched. This check is offline and deterministic, and
// a gate that depends on someone else's uptime is a gate that gets disabled.
//
// Exit 0 when every internal link resolves, 1 otherwise.
// =============================================================================
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const root = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();

// The fixture corpus is deliberately malformed: it is the input to a validator,
// not documentation, and holding it to this rule would make the rule wrong.
const EXCLUDED = ["specs/fixtures/"];

const files = execFileSync("git", ["ls-files", "-co", "--exclude-standard", "*.md"], {
  cwd: root,
  encoding: "utf8",
})
  .split("\n")
  .filter(Boolean)
  .filter((f) => !EXCLUDED.some((prefix) => f.startsWith(prefix)));

const LINK = /\[[^\]]*\]\(([^)\s]+)\)/g;
const broken = [];
let checked = 0;

for (const file of files) {
  const abs = path.join(root, file);
  if (!existsSync(abs)) continue;
  const body = readFileSync(abs, "utf8");
  const lines = body.split("\n");

  for (const [index, line] of lines.entries()) {
    for (const match of line.matchAll(LINK)) {
      const target = match[1];
      if (/^(https?:|mailto:|#)/.test(target)) continue;
      checked += 1;
      const [pathPart] = target.split("#");
      if (!pathPart) continue;
      const resolved = path.resolve(path.dirname(abs), decodeURIComponent(pathPart));
      if (!existsSync(resolved)) {
        broken.push(`${file}:${index + 1} -> ${target}`);
        continue;
      }
      // A link to a directory is a link to nothing in particular: the reader
      // lands on a file listing rather than on the document that was meant.
      if (statSync(resolved).isDirectory()) {
        broken.push(`${file}:${index + 1} -> ${target} (directory, not a document)`);
      }
    }
  }
}

if (broken.length > 0) {
  for (const entry of broken) process.stderr.write(`[links] broken ${entry}\n`);
  process.stderr.write(`[links] ${broken.length} of ${checked} internal link(s) do not resolve\n`);
  process.exit(1);
}

process.stdout.write(`[links] ${checked} internal link(s) across ${files.length} document(s) all resolve\n`);
