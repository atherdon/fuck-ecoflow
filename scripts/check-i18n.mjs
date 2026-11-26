#!/usr/bin/env node
/**
 * Structural checks for the Ukrainian (uk) docs locale.
 *
 * 1. Every Markdown file under i18n/uk/docusaurus-plugin-content-docs/current/
 *    has a page at the same path in docs/. Docusaurus silently ignores a uk
 *    file without one, so its text would never be published.
 * 2. Every entry in scripts/i18n-uk-docs.json "translations" has both the
 *    English page in docs/ and its Ukrainian file in i18n/uk/.
 * 3. A page is not listed both as a Ukrainian-only copy ("pages") and as a
 *    translation.
 *
 * Run with: npm run check:i18n (also runs `npm run i18n:sync-uk -- --check`).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const docsRoot = path.join(root, 'docs');
const ukRoot = path.join(
  root,
  'i18n/uk/docusaurus-plugin-content-docs/current',
);
const { pages = [], translations = [] } = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts/i18n-uk-docs.json'), 'utf8'),
);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return /\.mdx?$/i.test(entry.name) ? [full] : [];
  });
}

const problems = [];

for (const file of walk(ukRoot)) {
  const relative = path.relative(ukRoot, file).split(path.sep).join('/');
  if (!fs.existsSync(path.join(docsRoot, relative))) {
    problems.push(
      `orphan uk file (no docs/${relative}, so it is never published): ${path.relative(root, file)}`,
    );
  }
}

const listed = new Set(pages);
for (const { page } of translations) {
  if (!fs.existsSync(path.join(docsRoot, page))) {
    problems.push(`translation without English page: docs/${page}`);
  }
  if (!fs.existsSync(path.join(ukRoot, page))) {
    problems.push(
      `translation without Ukrainian file: ${path.relative(root, path.join(ukRoot, page))}`,
    );
  }
  if (listed.has(page)) {
    problems.push(`listed both in "pages" and "translations": ${page}`);
  }
}

if (problems.length) {
  console.error(problems.map((problem) => `- ${problem}`).join('\n'));
  console.error(`\n${problems.length} i18n problem(s) found.`);
  process.exit(1);
}
console.log(
  `i18n structure OK: ${walk(ukRoot).length} uk file(s), ${translations.length} translation(s).`,
);
