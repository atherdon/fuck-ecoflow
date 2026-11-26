---
sidebar_position: 4
slug: /maintainers/translations
description: How the English and Ukrainian versions of this site are built, and how to add or update a translation.
---

# Translations (English and Ukrainian)

The site is built in two languages:

| Locale            | URL                                                   | Source                              |
| ----------------- | ----------------------------------------------------- | ----------------------------------- |
| English (default) | `https://atherdon.github.io/fuck-ecoflow/docs/...`    | `docs/`                             |
| Українська        | `https://atherdon.github.io/fuck-ecoflow/uk/docs/...` | `i18n/uk/`, falling back to `docs/` |

The language switcher in the navbar moves between the two. Every page exists in both locales: when a page has no Ukrainian file, the `/uk/` URL shows the `docs/` version.

`npm run build` builds both locales (`build/` and `build/uk/`). To work on the Ukrainian site locally, run `npm start -- --locale uk` (the dev server serves one locale at a time).

## Where things live

| What                                         | File                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------ |
| Navbar labels                                | `i18n/uk/docusaurus-theme-classic/navbar.json`                           |
| Footer labels                                | `i18n/uk/docusaurus-theme-classic/footer.json`                           |
| Sidebar category labels                      | `i18n/uk/docusaurus-plugin-content-docs/current.json`                    |
| Homepage, 404 page, theme and search strings | `i18n/uk/code.json`                                                      |
| Ukrainian doc pages                          | `i18n/uk/docusaurus-plugin-content-docs/current/<same path as in docs/>` |

In each JSON file, change only `message`. The key and `description` come from Docusaurus.

## Update UI strings

After you add a navbar item, a footer link or a sidebar category, or a `<Translate>` string in `src/`, run:

```bash
npm run write-translations -- --locale uk
```

The command adds the new keys with the English text and keeps the existing translations. Translate the new `message` values and commit the JSON files.

Two categories can't share a label (for example two `Tasks` folders). If they do, `write-translations` fails. Add a unique `key` to one of their `_category_.json` files, for example `{"key": "reports-tasks"}`.

## Pages already written in Ukrainian

Pages written in Ukrainian stay in `docs/`. They are copied into the uk locale by a script:

1. Edit the original page in `docs/`.
2. Run `npm run i18n:sync-uk` to refresh the copies in `i18n/uk/docusaurus-plugin-content-docs/current/`.
3. Commit both files.

The pages that get copied are listed in `scripts/i18n-uk-docs.json`. Add a path (relative to `docs/`) to copy another page. `npm run i18n:sync-uk -- --check` lists copies that are out of date.

Don't edit the copies by hand. The next sync overwrites them.

In the uk build, Docusaurus only sees the copy of a listed page. Relative links to it from other pages in `docs/` are pointed at the copy by `plugins/uk-docs-links.mjs`, so no link has to change.

## Add a Ukrainian translation of an English page

1. Copy the page to the same path under `i18n/uk/docusaurus-plugin-content-docs/current/`. For `docs/team/readme.md`, that is `i18n/uk/docusaurus-plugin-content-docs/current/team/readme.md`.
2. Translate the text. Keep the front matter `slug` and `id` the same so the URL matches the English page. `title`, `sidebar_label` and `description` can be translated.
3. Images: relative paths resolve from the new file. Point them at the original image in `docs/` (for example `../../../../../docs/team/images/photo.jpg`) rather than copying the image.
4. Run `npm run build` and fix any broken links it reports.

Don't use a translation tool on its own for a page. Have a person who knows the subject review every translated page before it is merged.

See also the [Docusaurus i18n guide](https://docusaurus.io/docs/i18n/tutorial).
