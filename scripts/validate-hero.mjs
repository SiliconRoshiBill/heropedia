#!/usr/bin/env node
/* ============================================================
 * validate-hero.mjs — checks hero files against HERO_STANDARD.md.
 *
 * Usage:  node scripts/validate-hero.mjs <hero.md> [...]
 *         node scripts/validate-hero.mjs --changed   (files changed vs origin/main)
 *
 * Exit 0 when every file passes. Files without a sources sidecar are
 * checked only for the site's own rules (legacy v1 files); files with
 * one must meet the full v2 standard.
 * ============================================================ */
import { readFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const MAX_LEN = 50_000;          /* site: MAX_DEFINITION_LEN */
const MAX_DESC = 200;            /* site: validateDescription */
const MAX_BODY_URLS = 1;         /* site: quality gate */
const SOURCE_TYPES = new Set(["book", "interview", "talk", "letter", "article", "video", "paper"]);
const OHQ_HEADING = /^##+\s*office\s+hour\s+questions\b/im;   /* same regex as the office-hour skill */

function frontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return null;
  const data = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) data[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"(.*)"$/, "$1");
  }
  return { data, body: m[2] };
}

/* The numbered questions under "## Office Hour Questions", with their sub-bullets. */
function officeHourQuestions(body) {
  const start = body.search(OHQ_HEADING);
  if (start < 0) return null;
  const rest = body.slice(start).split("\n").slice(1);
  const end = rest.findIndex((l) => /^##\s/.test(l));
  const section = (end < 0 ? rest : rest.slice(0, end)).join("\n");
  return section.split(/\n(?=\d+\.\s)/).filter((b) => /^\d+\.\s/.test(b.trim())).map((b) => ({
    text: b.trim(),
    pushUntil: /^\s*-\s*push until:/im.test(b),
    redFlags: /^\s*-\s*red flags:/im.test(b),
  }));
}

function check(path) {
  const errors = [];
  const text = readFileSync(path, "utf8");
  const fm = frontmatter(text);
  if (!fm) return [`no frontmatter`];
  const { data, body } = fm;

  /* ---- the site's own rules (all files) ---- */
  for (const k of ["hero", "role", "profession", "author", "created", "description"]) if (!data[k]) errors.push(`frontmatter: missing ${k}`);
  if (data.description && Array.from(data.description).length > MAX_DESC) errors.push(`description longer than ${MAX_DESC} characters`);
  if (text.length > MAX_LEN) errors.push(`file longer than ${MAX_LEN} characters`);
  const urls = body.match(/https?:\/\/[^\s<>"')\]]+/g) ?? [];
  if (urls.length > MAX_BODY_URLS) errors.push(`${urls.length} URLs in the body (site allows ${MAX_BODY_URLS}); move links to the sources file`);
  for (const k of ["created", "updated", "upkeep"]) if (data[k] && !/^\d{4}-\d{2}-\d{2}$/.test(data[k])) errors.push(`frontmatter: ${k} is not YYYY-MM-DD`);

  /* ---- v2 standard (files with a sources sidecar) ---- */
  const sidecar = path.replace(/\.md$/, ".sources.json");
  if (!existsSync(sidecar)) return errors;

  let src;
  try { src = JSON.parse(readFileSync(sidecar, "utf8")); } catch (e) { return [...errors, `sources file is not valid JSON: ${e.message}`]; }
  const sources = Array.isArray(src.sources) ? src.sources : [];
  if (src.hero !== data.hero) errors.push(`sources file hero "${src.hero}" does not match "${data.hero}"`);
  if (sources.length < 3) errors.push(`only ${sources.length} sources; need at least 3`);
  for (const s of sources) {
    if (!/^S\d+$/.test(s.id ?? "")) errors.push(`source has bad id: ${JSON.stringify(s.id)}`);
    if (!SOURCE_TYPES.has(s.type)) errors.push(`${s.id}: type must be one of ${[...SOURCE_TYPES].join(", ")}`);
    for (const k of ["title", "venue", "year", "url"]) if (!s[k]) errors.push(`${s.id}: missing ${k}`);
    if (s.url && !/^https:\/\//.test(s.url)) errors.push(`${s.id}: url must be https`);
  }

  const qs = officeHourQuestions(body);
  if (!qs) errors.push(`missing "## Office Hour Questions"`);
  else {
    if (qs.length < 5 || qs.length > 6) errors.push(`${qs.length} office hour questions; need 5 or 6`);
    qs.forEach((q, i) => {
      if (!q.pushUntil) errors.push(`question ${i + 1}: missing "- Push until:"`);
      if (!q.redFlags) errors.push(`question ${i + 1}: missing "- Red flags:"`);
    });
  }
  for (const h of ["Grounding", "Sources"]) if (!new RegExp(`^##\\s+${h}\\s*$`, "m").test(body)) errors.push(`missing "## ${h}"`);
  if (!/not affiliated with or endorsed by/i.test(body)) errors.push(`missing the persona disclaimer line`);

  const ids = new Set(sources.map((s) => s.id));
  const cited = new Set([...body.matchAll(/\[(S\d+)\]/g)].map((m) => m[1]));
  for (const c of cited) if (!ids.has(c)) errors.push(`body cites [${c}] but the sources file has no ${c}`);
  for (const id of ids) if (!cited.has(id)) errors.push(`source ${id} is never cited in the body`);
  const grounding = body.split(/^##\s+Grounding\s*$/m)[1]?.split(/^##\s/m)[0] ?? "";
  grounding.split("\n").filter((l) => /^\s*-\s/.test(l)).forEach((l) => {
    if (!/\[S\d+\]/.test(l)) errors.push(`grounding bullet without a source: "${l.trim().slice(0, 60)}..."`);
  });
  return errors;
}

let files = process.argv.slice(2);
if (files[0] === "--changed") {
  files = execSync("git diff --name-only origin/main...HEAD", { encoding: "utf8" })
    .split("\n").map((f) => f.replace(/\.sources\.json$/, ".md")).filter((f) => f.endsWith(".md") && existsSync(f) && f.includes("/") && !/^(scripts|growth|blog)\//.test(f));
  files = [...new Set(files)];
}
if (!files.length) { console.log("no hero files to check"); process.exit(0); }

let failed = 0;
for (const f of files) {
  const errors = check(f);
  console.log(`${errors.length ? "FAIL" : "ok  "}  ${f}`);
  for (const e of errors) console.log(`      - ${e}`);
  if (errors.length) failed++;
}
console.log(failed ? `\n${failed} of ${files.length} failed` : `\nall ${files.length} passed`);
process.exit(failed ? 1 : 0);
