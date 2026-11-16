#!/usr/bin/env node
/**
 * Report markdown image refs whose files are missing on disk.
 * Exit 0 always (report-only) unless --strict is passed.
 *
 * Resolution rules match how Docusaurus serves the site:
 * - `/img/...` (and any other root-absolute path) resolves against `static/`.
 * - Relative refs resolve against the markdown file's folder.
 * - URL-encoded refs (`image%201.png`) are decoded before the lookup.
 * - File names containing balanced parentheses (`photo_(1).jpg`) are kept whole.
 * Refs inside fenced code, inline code and HTML comments are not images on the
 * page; refs inside HTML comments are listed separately as "hidden".
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const strict = process.argv.includes('--strict');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// Image target: allows one level of balanced parentheses inside the path.
const mdRe =
  /!\[[^\]]*]\(((?:[^()\s]|\([^()\s]*\))+)(?:\s+["'][^"']*["'])?\s*\)/g;
const commentRe = /<!--[\s\S]*?-->/g;
const fenceRe = /^(```|~~~)[\s\S]*?^\1/gm;
const inlineCodeRe = /`[^`\n]*`/g;
// Not part of the site build (also in .prettierignore).
const skipDirs = new Set(['node_modules', 'build', 'abs-dont-look-here']);
let missing = 0;
const hidden = [];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || skipDirs.has(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(md|mdx)$/i.test(e.name)) out.push(full);
  }
  return out;
}

const blank = (s) => s.replace(/[^\n]/g, ' ');

function resolveTarget(dir, raw) {
  let target = raw.replace(/^<|>$/g, '');
  try {
    target = decodeURI(target);
  } catch {
    // keep the raw value if it is not valid percent-encoding
  }
  target = target.split(/[?#]/)[0];
  if (target.startsWith('/')) return path.join(root, 'static', target);
  return path.resolve(dir, target);
}

for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  // Keep offsets stable: blank out code so its refs are ignored.
  const scan = text.replace(fenceRe, blank).replace(inlineCodeRe, blank);
  const comments = [...scan.matchAll(commentRe)].map((c) => [
    c.index,
    c.index + c[0].length,
  ]);
  const isHidden = (i) => comments.some(([a, b]) => i >= a && i < b);
  const dir = path.dirname(file);
  for (const m of scan.matchAll(mdRe)) {
    const raw = m[1];
    if (!raw || /^(https?:|data:|mailto:)/i.test(raw)) continue;
    if (fs.existsSync(resolveTarget(dir, raw))) continue;
    const line = `${path.relative(root, file)} -> ${raw}`;
    if (isHidden(m.index)) {
      hidden.push(line);
      continue;
    }
    missing += 1;
    console.log(line);
  }
}
if (hidden.length) {
  console.log(`\nHidden (inside HTML comments, not counted): ${hidden.length}`);
  for (const h of hidden) console.log(`  ${h}`);
}
console.log(`Missing image refs: ${missing}`);
if (strict && missing) process.exit(1);
