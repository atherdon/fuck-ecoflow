#!/usr/bin/env node
/**
 * Copy docs pages that are already written in Ukrainian into the uk locale.
 *
 * Source list: scripts/i18n-uk-docs.json ("pages", paths relative to docs/).
 * Target:      i18n/uk/docusaurus-plugin-content-docs/current/<same path>
 *
 * The text is copied as-is. Only relative image paths are rewritten so they
 * keep pointing at the original files in docs/ (no image is duplicated).
 * Relative links to other .md/.mdx pages stay as they are when that page has
 * a uk file (listed copy or translation); links to pages that only exist in docs/ are rewritten to
 * point at the original file, so Docusaurus can still resolve them.
 *
 * Usage:
 *   npm run i18n:sync-uk          # write the copies
 *   npm run i18n:sync-uk -- --check   # exit 1 if a copy is missing or stale
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const targetRoot = path.join(
  root,
  'i18n/uk/docusaurus-plugin-content-docs/current',
);
const listPath = path.join(root, 'scripts/i18n-uk-docs.json');
const check = process.argv.includes('--check');

const { pages } = JSON.parse(fs.readFileSync(listPath, 'utf8'));

const IMAGE_RE = /(!\[[^\]]*\]\()(<[^>]+>|[^)\s]+)((?:\s+"[^"]*")?\))/g;
const LINK_RE = /((?<!!)\[[^\]]*\]\()(<[^>]+>|[^)\s]+)((?:\s+"[^"]*")?\))/g;
const listed = new Set(pages.map((page) => path.join(docsRoot, page)));
// A page that already has a uk file (a listed copy or a hand-made
// translation) keeps its relative link: the uk tree mirrors docs/.
const hasUkFile = (absolute) =>
  listed.has(absolute) ||
  fs.existsSync(path.join(targetRoot, path.relative(docsRoot, absolute)));

function rewriteLinks(text, sourceFile, targetFile) {
  return text.replace(LINK_RE, (match, open, rawUrl, close) => {
    const wrapped = rawUrl.startsWith('<') && rawUrl.endsWith('>');
    const url = wrapped ? rawUrl.slice(1, -1) : rawUrl;
    if (/^([a-z]+:|\/|#)/i.test(url)) return match;
    const [filePart, hash = ''] = url.split('#');
    if (!/\.mdx?$/i.test(filePart)) return match;
    let decoded = filePart;
    try {
      decoded = decodeURI(filePart);
    } catch {
      // keep the raw value
    }
    const absolute = path.resolve(path.dirname(sourceFile), decoded);
    if (!fs.existsSync(absolute) || hasUkFile(absolute)) return match;
    let relative = path
      .relative(path.dirname(targetFile), absolute)
      .split(path.sep)
      .join('/');
    if (!relative.startsWith('.')) relative = `./${relative}`;
    const withHash = hash ? `${relative}#${hash}` : relative;
    const out = /\s/.test(withHash) ? `<${withHash}>` : withHash;
    return `${open}${out}${close}`;
  });
}

function rewriteImages(text, sourceFile, targetFile) {
  return text.replace(IMAGE_RE, (match, open, rawUrl, close) => {
    const wrapped = rawUrl.startsWith('<') && rawUrl.endsWith('>');
    const url = wrapped ? rawUrl.slice(1, -1) : rawUrl;
    if (/^([a-z]+:|\/|#)/i.test(url)) return match;
    let decoded = url;
    try {
      decoded = decodeURI(url);
    } catch {
      // keep the raw value
    }
    const absolute = path.resolve(path.dirname(sourceFile), decoded);
    if (!fs.existsSync(absolute)) return match;
    let relative = path
      .relative(path.dirname(targetFile), absolute)
      .split(path.sep)
      .join('/');
    if (!relative.startsWith('.')) relative = `./${relative}`;
    const out = /\s/.test(relative) ? `<${relative}>` : relative;
    return `${open}${out}${close}`;
  });
}

let problems = 0;
for (const page of pages) {
  const source = path.join(docsRoot, page);
  const target = path.join(targetRoot, page);
  if (!fs.existsSync(source)) {
    console.error(`missing source: docs/${page}`);
    problems += 1;
    continue;
  }
  const expected = rewriteLinks(
    rewriteImages(fs.readFileSync(source, 'utf8'), source, target),
    source,
    target,
  );
  if (check) {
    const current = fs.existsSync(target)
      ? fs.readFileSync(target, 'utf8')
      : null;
    if (current !== expected) {
      console.error(`out of date: ${path.relative(root, target)}`);
      problems += 1;
    }
    continue;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, expected);
}

if (check) {
  if (problems) {
    console.error(`\n${problems} uk page(s) need "npm run i18n:sync-uk".`);
    process.exit(1);
  }
  console.log(`All ${pages.length} uk copies are up to date.`);
} else {
  console.log(
    `Copied ${pages.length} Ukrainian page(s) into ${path.relative(root, targetRoot)}.`,
  );
  if (problems) process.exit(1);
}
