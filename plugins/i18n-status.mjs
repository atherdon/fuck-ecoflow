/**
 * Exposes which docs pages have a Ukrainian version, for the language notice
 * shown above each doc (src/components/LanguageNotice).
 *
 * Reads scripts/i18n-uk-docs.json:
 * - pages:        written in Ukrainian only (no English version yet)
 * - translations: English pages whose Ukrainian version is in i18n/uk
 */
import fs from 'node:fs';
import path from 'node:path';

export function i18nStatusPlugin(context) {
  return {
    name: 'i18n-status',
    async contentLoaded({ actions }) {
      const listPath = path.join(context.siteDir, 'scripts/i18n-uk-docs.json');
      const { pages = [], translations = [] } = JSON.parse(
        fs.readFileSync(listPath, 'utf8'),
      );
      actions.setGlobalData({
        ukrainianOnly: pages,
        translated: translations.map((entry) => entry.page),
      });
    },
  };
}
