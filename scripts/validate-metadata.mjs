#!/usr/bin/env node
// Validates the canonical frontmatter schema across the catalog.
//
// The schema is selected by path, not declared in the file: a governance document,
// a workflow, a skill, and an agent each carry a different key set, and repeating
// path-derived information in the body is itself a failure.
//
// Exit 0 = every artifact conforms, 1 = at least one does not.
import { readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ROOT = process.argv[2] ?? ".";
const findings = [];
const fail = (file, rule, detail) => findings.push({ file, rule, detail });

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir)) {
    if (e === "node_modules" || e === ".git" || e === "worktrees") continue;
    const p = path.join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".md")) out.push(p);
  }
  return out;
};

// Parse just enough YAML for this closed schema: scalar keys, folded scalars, and
// single-level sequences. A real YAML parser would also accept shapes the schema
// rejects, so a narrow reader is the more faithful check here.
const parseFrontmatter = (text) => {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---\n", 3);
  if (end === -1) return null;
  const lines = text.slice(4, end + 1).split("\n");
  const keys = [];
  const values = {};
  for (let i = 0; i < lines.length; i += 1) {
    const m = /^([a-z_]+):(.*)$/.exec(lines[i]);
    if (!m) continue;
    const [, key, rest] = m;
    keys.push(key);
    if (rest.trim() === ">-" || rest.trim() === ">") {
      const parts = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1]) && !/^\s*- /.test(lines[i + 1])) {
        parts.push(lines[(i += 1)].trim());
      }
      values[key] = parts.join(" ");
    } else if (rest.trim() === "") {
      const items = [];
      while (i + 1 < lines.length && /^\s*- /.test(lines[i + 1])) {
        items.push(lines[(i += 1)].replace(/^\s*- /, "").trim());
      }
      values[key] = items;
    } else {
      values[key] = rest.trim();
    }
  }
  const dupes = keys.filter((k, i) => keys.indexOf(k) !== i);
  return { keys, values, dupes };
};

const CAPABILITIES = ["repository-read", "repository-write", "shell", "network", "subagent"];
const TIERS = ["ultra", "plan", "execution", "fast"];
const NAME = /^[a-z0-9]+(-[a-z0-9]+)*$/;
// The keys whose value is a list. Everything else in the closed schema is a
// scalar, so one list is enough to decide the shape of any declared key.
const SEQUENCES = ["capabilities", "skills", "constraints"];

const schemaFor = (rel) => {
  if (rel.startsWith("repo-governance/workflows/"))
    return { required: ["name", "description", "when_to_use"], optional: [] };
  if (rel.startsWith("repo-governance/")) return { required: ["description", "when_to_use"], optional: [] };
  if (rel.startsWith(".agents/skills/") && rel.endsWith("/SKILL.md"))
    return { required: ["name", "description", "when_to_use"], optional: ["compatibility"] };
  if (rel.startsWith(".agents/agents/") && !rel.endsWith("/README.md"))
    return {
      required: ["name", "description", "when_to_use", "tier", "capabilities"],
      optional: ["skills", "constraints"],
    };
  return null;
};

const identityFor = (rel) => {
  const base = path.basename(rel);
  if (rel.endsWith("/SKILL.md")) return path.basename(path.dirname(rel));
  if (base === "README.md") return path.basename(path.dirname(rel));
  return base.slice(0, -3);
};

for (const file of walk(ROOT).sort()) {
  const rel = path.relative(ROOT, file);
  const schema = schemaFor(rel);
  if (!schema) continue;

  const fm = parseFrontmatter(readFileSync(file, "utf8"));
  if (!fm) {
    fail(rel, "frontmatter-missing", "no frontmatter bounded by the first `---` pair");
    continue;
  }
  if (fm.dupes.length) fail(rel, "duplicate-key", `duplicate: ${[...new Set(fm.dupes)].join(", ")}`);

  const allowed = [...schema.required, ...schema.optional];
  for (const k of fm.keys) if (!allowed.includes(k)) fail(rel, "unknown-key", `\`${k}\` is not in this path's schema`);

  const expected = [...schema.required, ...schema.optional.filter((k) => fm.keys.includes(k))];
  if (fm.keys.join(",") !== expected.join(","))
    fail(rel, "key-order", `expected ${expected.join(", ")}; found ${fm.keys.join(", ")}`);

  // A key written with nothing after it parses as an empty sequence, not as an
  // empty string, so every value is shape-checked before it is measured. Without
  // this a null field crashes the walk -- which fails the gate, but reports a
  // stack trace carrying an absolute path instead of a finding naming the file.
  for (const k of fm.keys) {
    if (!allowed.includes(k)) continue;
    const v = fm.values[k];
    const wantsSequence = SEQUENCES.includes(k);
    if (wantsSequence !== Array.isArray(v))
      fail(rel, "value-shape", `\`${k}\` must be ${wantsSequence ? "a sequence" : "a scalar"}`);
    else if (wantsSequence ? v.length === 0 : v.trim() === "") fail(rel, "value-empty", `\`${k}\` is null or empty`);
  }

  const scalar = (k) => (typeof fm.values[k] === "string" ? fm.values[k].trim() : "");
  const d = scalar("description");
  const w = scalar("when_to_use");
  if (d.length < 20 || d.length > 300) fail(rel, "description-length", `${d.length} characters; allowed 20-300`);
  if (w.length < 20 || w.length > 240) fail(rel, "when-to-use-length", `${w.length} characters; allowed 20-240`);
  if (d && d.toLowerCase() === w.toLowerCase())
    fail(rel, "description-repeats-trigger", "description and when_to_use normalize to the same text");

  if (schema.required.includes("name")) {
    const n = scalar("name");
    if (!NAME.test(n)) fail(rel, "name-form", `\`${n}\` is not lowercase hyphen-separated`);
    if (n !== identityFor(rel))
      fail(rel, "name-path-mismatch", `\`${n}\` does not match path identity \`${identityFor(rel)}\``);
  }

  if (schema.required.includes("tier")) {
    const tier = scalar("tier");
    if (!TIERS.includes(tier)) fail(rel, "tier-value", `\`${tier}\` is not one of ${TIERS.join(", ")}`);
    // Only a sequence reaches the vocabulary rules. A scalar here is already
    // reported by the shape check above, and running list rules over a string
    // would iterate its characters and then throw on `join`.
    const caps = Array.isArray(fm.values.capabilities) ? fm.values.capabilities : null;
    if (caps === null || caps.length === 0) fail(rel, "capabilities-empty", "capabilities must be a nonempty sequence");
    else {
      for (const c of caps)
        if (!CAPABILITIES.includes(c)) fail(rel, "capability-value", `\`${c}\` is outside the closed vocabulary`);
      const canonical = CAPABILITIES.filter((c) => caps.includes(c));
      if (caps.join(",") !== canonical.join(",")) fail(rel, "capability-order", `expected ${canonical.join(", ")}`);
      if (new Set(caps).size !== caps.length) fail(rel, "capability-duplicate", "capabilities repeat");
    }
  }
}

findings.sort((a, b) => a.file.localeCompare(b.file) || a.rule.localeCompare(b.rule));
for (const f of findings) process.stdout.write(`[metadata] ${f.file}: ${f.rule}: ${f.detail}\n`);
process.stdout.write(
  `[metadata] ${findings.length === 0 ? "all catalog artifacts conform" : `${findings.length} finding(s)`}\n`
);
process.exitCode = findings.length === 0 ? 0 : 1;
