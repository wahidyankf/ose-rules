#!/usr/bin/env node
// ==============================================================================
// generate-adapters.mjs — write every repo-local harness adapter from the canon
// ==============================================================================
// The canonical files under `.agents/` are what a human edits. An adapter is
// generated from them and never edited in place, because an adapter that can be
// edited is a second place for the rule to live and the two will disagree.
//
// This writes; it checks nothing. `rhino harness parity validate` is what
// decides whether what is on disk matches what `repo-config.yml` declares, and
// keeping the writer and the judge apart is what makes the judge worth running.
//
// Output is already Prettier-formatted at this repository's prose width, so a
// second run is a no-op rather than a diff the formatter then rewrites.
//
// Usage: node scripts/generate-adapters.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";

const ROOT = execFileSync("git", ["rev-parse", "--show-toplevel"], { encoding: "utf8" }).trim();
const WIDTH = 120;

const SKILL_ROUTE = (p) =>
  `Read ${p} completely, resolve every relative resource from that skill directory, and follow it as authoritative before acting.`;
const AGENT_ROUTE = (p) =>
  `Before acting, read the complete canonical agent definition at the repository-root path ${p} and follow it as authoritative. If it cannot be read, stop and report the missing path.`;

// The one place a model and an effort are written down is `repo-config.yml`.
// They are read from it rather than repeated here: a generator carrying its own
// copy of the mapping is the drift the mapping exists to prevent.
const TIERS = readTiers();

// The canonical capability vocabulary, in each harness's own words. Both tables
// mirror `harness-parity.harnesses[].agent-adapter.translations`.
const CLAUDE_TOOLS = {
  "": ["Read"],
  "repository-read": ["Glob", "Grep"],
  "repository-write": ["Write", "Edit"],
  shell: ["Bash"],
};
const OPENCODE_PERMISSIONS = {
  "": [["read", "allow"]],
  "repository-read": [
    ["glob", "allow"],
    ["grep", "allow"],
  ],
  "repository-write": [["edit", "allow"]],
  shell: [["bash", "allow"]],
};

function readTiers() {
  const text = readFileSync(path.join(ROOT, "repo-config.yml"), "utf8");
  const section = text.match(/^model-tiers:\n((?:[ \t].*\n|\n(?=[ \t]))*)/m);
  if (!section) return {};
  const tiers = {};
  let harness = null;
  let tier = null;
  for (const line of section[1].split("\n")) {
    if (/^ {2}\S/.test(line)) {
      harness = line.trim().replace(/:$/, "");
      tiers[harness] = {};
      tier = null;
    } else if (/^ {4}\S/.test(line)) {
      tier = line.trim().replace(/:$/, "");
      tiers[harness][tier] = {};
    } else if (/^ {6}\S/.test(line)) {
      const [key, value] = line.trim().split(/:\s*/);
      tiers[harness][tier][key] = value;
    }
  }
  return tiers;
}

/// Front matter as written, not as a decoder would rather have it: the key
/// order and the folded scalars are what the adapter has to carry forward.
function frontMatter(file) {
  const text = readFileSync(file, "utf8");
  if (!text.startsWith("---\n")) return {};
  const end = text.indexOf("\n---\n", 3);
  const values = {};
  let key = null;
  for (const line of text.slice(4, end + 1).split("\n")) {
    if (!line.trim()) continue;
    if (line.startsWith("  - ")) {
      if (!Array.isArray(values[key])) values[key] = [];
      values[key].push(line.slice(4).trim());
    } else if (line.startsWith("  ")) {
      values[key] = `${values[key] ?? ""} ${line.trim()}`.trim();
    } else {
      const [name, ...rest] = line.split(":");
      const value = rest.join(":").trim();
      key = name;
      values[key] = [">-", ">", "|", "|-"].includes(value) ? "" : value;
    }
  }
  return values;
}

function wrap(text, indent = "") {
  const lines = [];
  let line = indent;
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line.trim() && line.length + word.length + 1 > WIDTH) {
      lines.push(line);
      line = indent + word;
    } else {
      line = line.trim() ? `${line} ${word}` : line + word;
    }
  }
  if (line.trim()) lines.push(line);
  return lines.join("\n");
}

function write(rel, text) {
  const file = path.join(ROOT, rel);
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, text);
  process.stdout.write(`[adapters] wrote ${rel}\n`);
}

const skills = readdirSync(path.join(ROOT, ".agents/skills"), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const name of skills) {
  const canon = `.agents/skills/${name}/SKILL.md`;
  const fm = frontMatter(path.join(ROOT, canon));
  write(
    `.claude/skills/${name}/SKILL.md`,
    `---\nname: ${fm.name}\ndescription: >-\n${wrap(fm.description, "  ")}\n---\n\n${wrap(SKILL_ROUTE(canon))}\n`
  );
}

const agents = readdirSync(path.join(ROOT, ".agents/agents"))
  .filter((file) => file.endsWith(".md") && file !== "README.md")
  .map((file) => file.slice(0, -3))
  .sort();

for (const name of agents) {
  const canon = `.agents/agents/${name}.md`;
  const fm = frontMatter(path.join(ROOT, canon));
  const capabilities = Array.isArray(fm.capabilities) ? fm.capabilities : [];
  const route = wrap(AGENT_ROUTE(canon));
  const project = (table) => ["", ...capabilities].flatMap((capability) => table[capability] ?? []);

  // Claude: the one harness whose agent definitions express both a model and an
  // effort, so the one a tier can be projected into. An unmapped tier writes
  // neither field, which is how the harness's own inheritance stays in charge.
  const pin = TIERS.claude?.[fm.tier];
  const claude = ["---", `name: ${fm.name}`, "description: >-", wrap(fm.description, "  ")];
  if (pin) claude.push(`model: ${pin.model}`, `effort: ${pin.effort}`);
  claude.push(`tools: ${project(CLAUDE_TOOLS).join(", ")}`, "---", "", route, "");
  write(`.claude/agents/${name}.md`, claude.join("\n"));

  // Codex expresses no per-agent effort, so there is no complete pair to
  // project and no model is written. Half a pin is worse than none.
  write(
    `.codex/agents/${name}.toml`,
    [
      `name = "${fm.name}"`,
      `description = "${fm.description.replaceAll('"', '\\"')}"`,
      `developer_instructions = "${AGENT_ROUTE(canon).replaceAll('"', '\\"')}"`,
      "",
    ].join("\n")
  );

  const opencode = ["---", "description: >-", wrap(fm.description, "  "), "mode: subagent", "permission:"];
  for (const [key, value] of project(OPENCODE_PERMISSIONS)) opencode.push(`  ${key}: ${value}`);
  opencode.push("---", "", route, "");
  write(`.opencode/agents/${name}.md`, opencode.join("\n"));
}
