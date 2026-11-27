import React from 'react';
import Translate from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

const DOCS_PREFIX = '@site/docs/';
const UK_PREFIX = '@site/i18n/uk/docusaurus-plugin-content-docs/current/';

// Shows one line above a doc page about its other language:
// - English page with a Ukrainian version: link to it (and back from /uk/)
// - Ukrainian-only page on the English site: say there is no English version
// - /uk/ page that is not translated yet: say the original is shown
export default function LanguageNotice() {
  const { metadata } = useDoc();
  const {
    i18n: { currentLocale },
  } = useDocusaurusContext();
  const status = usePluginData('i18n-status') ?? {};
  const { createUrl } = useAlternatePageUtils();

  const source = metadata.source ?? '';
  const inUkFolder = source.startsWith(UK_PREFIX);
  const relative = source.replace(UK_PREFIX, '').replace(DOCS_PREFIX, '');
  const translated = (status.translated ?? []).includes(relative);
  const ukrainianOnly = (status.ukrainianOnly ?? []).includes(relative);

  let content = null;
  if (currentLocale === 'en' && translated) {
    content = (
      <>
        <Translate id="languageNotice.en.translated">
          This page is also available in Ukrainian.
        </Translate>{' '}
        <a href={createUrl({ locale: 'uk', fullyQualified: false })} lang="uk">
          Читати українською →
        </a>
      </>
    );
  } else if (currentLocale === 'en' && ukrainianOnly) {
    content = (
      <Translate id="languageNotice.en.ukrainianOnly">
        This page is written in Ukrainian. There is no English version yet.
      </Translate>
    );
  } else if (currentLocale === 'uk' && inUkFolder && translated) {
    content = (
      <>
        <Translate id="languageNotice.uk.translated">
          This page is also available in English.
        </Translate>{' '}
        <a href={createUrl({ locale: 'en', fullyQualified: false })} lang="en">
          Read in English →
        </a>
      </>
    );
  } else if (currentLocale === 'uk' && !inUkFolder) {
    content = (
      <Translate id="languageNotice.uk.notTranslated">
        This page has no Ukrainian version yet, so the original is shown.
      </Translate>
    );
  }

  if (!content) return null;
  return (
    <div
      className="alert alert--secondary margin-bottom--md"
      role="note"
      style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}
    >
      {content}
    </div>
  );
}
