#!/usr/bin/env node
/**
 * Report markdown image refs whose files are missing on disk.
 * Exit 0 always (report-only) unless --strict is passed.
 */
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const strict = process.argv.includes('--strict');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mdRe = /!\[[^\]]*]\(([^)]+)\)/g;
let missing = 0;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, {withFileTypes: true})) {
    if (e.name.startsWith('.') || e.name === 'node_modules' || e.name === 'build') continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (/\.(md|mdx)$/i.test(e.name)) out.push(full);
  }
  return out;
}

for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  for (const m of text.matchAll(mdRe)) {
    let target = m[1].split(/\s+/)[0].replace(/["']/g, '');
    if (!target || target.startsWith('http') || target.startsWith('data:')) continue;
    const abs = path.resolve(dir, target);
    if (!fs.existsSync(abs)) {
      missing += 1;
      console.log(`${path.relative(root, file)} -> ${target}`);
    }
  }
}
console.log(`Missing image refs: ${missing}`);
if (strict && missing) process.exit(1);
