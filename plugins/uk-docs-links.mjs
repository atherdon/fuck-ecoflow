/**
 * Keep relative Markdown links working in the Ukrainian (uk) build.
 *
 * Pages listed in scripts/i18n-uk-docs.json have a copy in
 * i18n/uk/docusaurus-plugin-content-docs/current/. In the uk build Docusaurus
 * only knows that copy, so a relative link such as `./волонтери.md` written in
 * an untranslated page under docs/ no longer resolves and the build fails
 * with "broken links".
 *
 * This file provides:
 * - `ukDocsLocalePlugin`: a tiny Docusaurus plugin that records which locale
 *   is being built (Docusaurus builds the locales one after another).
 * - `remarkUkDocsLinks`: a remark plugin that, only in the uk build and only
 *   for files under docs/, points links to a listed page at its uk copy
 *   (as an `@site/...` path, which Docusaurus resolves to the right URL).
 *
 * The English build and the Markdown files themselves are not changed.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const LOCALE_ENV = 'FUCK_ECOFLOW_DOCS_LOCALE';
const UK_DOCS_DIR = 'i18n/uk/docusaurus-plugin-content-docs/current';
const SITE_DIR = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export function ukDocsLocalePlugin(context) {
  process.env[LOCALE_ENV] = context.i18n.currentLocale;
  return { name: 'uk-docs-locale' };
}

function loadListedPages(siteDir) {
  const listPath = path.join(siteDir, 'scripts/i18n-uk-docs.json');
  const { pages } = JSON.parse(fs.readFileSync(listPath, 'utf8'));
  return new Set(pages);
}

function visitLinks(node, callback) {
  if (node.type === 'link' || node.type === 'definition') callback(node);
  if (node.children) {
    for (const child of node.children) visitLinks(child, callback);
  }
}

export function remarkUkDocsLinks({ siteDir = SITE_DIR } = {}) {
  const docsDir = path.join(siteDir, 'docs');
  let listed = null;

  return (tree, file) => {
    if (process.env[LOCALE_ENV] !== 'uk') return;
    if (!file.path || !file.path.startsWith(`${docsDir}${path.sep}`)) return;
    listed ??= loadListedPages(siteDir);

    visitLinks(tree, (node) => {
      const url = node.url;
      if (!url || /^([a-z][a-z0-9+.-]*:|\/|#|@site\/)/i.test(url)) return;
      const match = /^([^?#]*)([?#].*)?$/.exec(url);
      const pathname = match[1];
      const suffix = match[2] ?? '';
      if (!/\.mdx?$/i.test(pathname)) return;

      let decoded = pathname;
      try {
        decoded = decodeURIComponent(pathname);
      } catch {
        return;
      }
      const target = path.resolve(path.dirname(file.path), decoded);
      const relative = path.relative(docsDir, target).split(path.sep).join('/');
      if (relative.startsWith('..') || !listed.has(relative)) return;

      node.url = `@site/${UK_DOCS_DIR}/${encodeURI(relative)}${suffix}`;
    });
  };
}
