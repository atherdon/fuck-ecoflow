// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';
import {
  remarkUkDocsLinks,
  ukDocsLocalePlugin,
} from './plugins/uk-docs-links.mjs';

const manualRedirects = [
  {
    to: '/docs/reports/status/current-status',
    from: ['/docs/reports/unfinished-report-current-status'],
  },
  {
    to: '/docs/reports/status/june-2026',
    from: ['/docs/reports/report-june-2026'],
  },
  {
    to: '/docs/reports/status/progress-cases',
    from: ['/docs/reports/progress-cases'],
  },
  {
    to: '/docs/reports/tasks/unfinished-unsorted-tasks',
    from: ['/docs/reports/unfinished-unsorted-tasks'],
  },
  {
    to: '/docs/reports/raw-notes/note-1',
    from: ['/docs/reports/1'],
  },
  {
    to: '/docs/reports/raw-notes/note-2',
    from: ['/docs/reports/2'],
  },
  {
    to: '/docs/reports/raw-notes/note-3',
    from: ['/docs/reports/3'],
  },
  {
    to: '/docs/reports/contributors/mr-s/2026-05',
    from: ['/docs/reports/Mr.S/may-2026', '/docs/reports/mr.s/may-2026'],
  },
  {
    to: '/docs/reports/plastic-fantastic/2026-06-22',
    from: [
      '/docs/reports/plastic-fantastic/June-22',
      '/docs/reports/plastic-fantastic/June-22/readme',
    ],
  },
  {
    to: '/docs/team/our-lab',
    from: ['/docs/team/our-lab/Our-Distributed-Laboratory'],
  },
  {
    to: '/docs/team/veteran-business',
    from: ['/docs/team/english'],
  },
  {
    to: '/docs/charging-station',
    from: ['/docs/physicsist-main-page/ящик-фірми-фізік-і-друзі'],
  },
  {
    to: '/docs/charging-station/Y-completed-cases/case-0',
    from: [
      '/docs/charging-station/Y-completed-cases/00',
      '/docs/charging-station/Y-completed-cases/00/readme',
    ],
  },
  {
    to: '/docs/charging-station/Y-completed-cases/case-0/prototype',
    from: [
      '/docs/charging-station/Y-completed-cases/prototype',
      '/docs/charging-station/Y-completed-cases/prototype/prototype',
    ],
  },
  {
    to: '/docs/charging-station/Y-completed-cases/case-0/proof-of-concept',
    from: ['/docs/charging-station/01-2/case-0-proof-of-concept-mr-s-27-05-25'],
  },
  {
    to: '/docs/charging-station/Y-completed-cases/number-two',
    from: ['/docs/charging-station/Y-completed-cases/number-two/number-two'],
  },
  {
    to: '/docs/charging-station/Y-completed-cases/number-two/case-01',
    from: [
      '/docs/charging-station/Y-completed-cases/01',
      '/docs/charging-station/Y-completed-cases/01/readme',
    ],
  },
  {
    to: '/docs/charging-station/wb-vs-ecoflow/chat-with-great-and-smart-people',
    from: [
      '/docs/charging-station/wb-vs-ecoflow/\u0441hat-with-great-and-smart-people',
    ],
  },
  {
    to: '/docs/charging-station/versions',
    from: ['/docs/versions/versions'],
  },
  {
    to: '/docs/charging-station/overview/ai-is-stupid',
    from: ['/docs/charging-station/wb-vs-ecoflow/ai-is-stupid'],
  },
  {
    to: '/docs/charging-station/inspiration#antey-energy-charging-station',
    from: [
      '/docs/charging-station/inspiration/antey-energy/antey-energy-charging-station',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#antey-energy-specification',
    from: [
      '/docs/charging-station/inspiration/antey-energy/antey-energy-specification',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#antey-energy-2',
    from: ['/docs/charging-station/inspiration/antey-energy/antey-energy-2'],
  },
  {
    to: '/docs/charging-station/inspiration#fpv-charger-box-inspiration',
    from: [
      '/docs/charging-station/inspiration/fpv-batteries-charger/fpv-charger-box-inspiration',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#inspiration-hystrix-f5-box-only',
    from: [
      '/docs/charging-station/inspiration/hystrix-f5-box/inspiration-hystrix-f5-box-only',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#як-роблять-інші-та-не-заморачиваються',
    from: [
      '/docs/charging-station/inspiration/lifepo4-charging-station/як-роблять-інші-та-не-заморачиваються',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#awesome-yt-tutorial',
    from: [
      '/docs/charging-station/inspiration/lifepo4-tutorial/awesome-yt-tutorial',
    ],
  },
  {
    to: '/docs/charging-station/inspiration#vadims-case-2',
    from: ['/docs/charging-station/inspiration/vadim-battery/vadims-case-2'],
  },
  {
    to: '/docs/charging-station/inspiration#flman',
    from: ['/docs/charging-station/inspiration/FLMan/intro'],
  },
  {
    to: '/docs/outsourcing-engineering/drone-net-gun#nets--photo-reference',
    from: [
      '/docs/01-outsourcing-engineering/drone-net-gun/nets-information',
      '/docs/outsourcing-engineering/drone-net-gun/nets-information',
    ],
  },
  {
    to: '/docs/outsourcing-engineering/drone-net-gun#archive-nets',
    from: [
      '/docs/outsourcing-engineering/drone-net-gun/nets',
      '/docs/outsourcing-engineering/drone-net-gun/archive/nets',
    ],
  },
];

const assemblyaRedirectPrefixes = [
  '/docs/outsourcing-engineering/assemblya',
  '/docs/outsourcing-engineering/AssemBLYA',
  '/docs/outsourcing-engineering/AssemBlya',
];

const assemblyaRedirectSuffixes = [
  '',
  '/competitors/steel-hornets/111',
  '/competitors/steel-hornets/111/xxx',
  '/competitors/steel-hornets/222',
  '/competitors/steel-hornets/222/dissasembled',
  '/dissasembling',
  '/dissasembling/01',
  '/dissasembling/02',
  '/dissasembling/03',
  '/dissasembling/04',
  '/dissasembling/05',
  '/dissasembling/06',
  '/dissasembling/07',
  '/dissasembling/08',
  '/dissasembling/09',
  '/dissasembling/010',
  '/dissasembling/011',
  '/dissasembling/metal-parts',
];

function getAssemblyaRedirects() {
  const from = assemblyaRedirectPrefixes.flatMap((prefix) =>
    assemblyaRedirectSuffixes.map((suffix) => `${prefix}${suffix}`),
  );

  return [
    {
      to: '/docs/outsourcing-engineering',
      from,
    },
  ];
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fuck Ecoflow',
  tagline:
    'Field charging cases, so positions do not have to depend on EcoFlow',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://atherdon.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/fuck-ecoflow/',

  // GitHub pages deployment config.
  organizationName: 'LLazyEmail',
  projectName: 'fuck-ecoflow',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  // English is the default locale and keeps the current URLs.
  // Ukrainian is served under /uk/ (for example /fuck-ecoflow/uk/docs/intro).
  // Translations live in i18n/uk/ — see https://docusaurus.io/docs/i18n/tutorial
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'uk'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      uk: {
        label: 'Українська',
        htmlLang: 'uk-UA',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Keeps links from untranslated docs/ pages to pages with a uk
          // copy working in the uk build. See plugins/uk-docs-links.mjs.
          beforeDefaultRemarkPlugins: [remarkUkDocsLinks],
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    ukDocsLocalePlugin,
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [...manualRedirects, ...getAssemblyaRedirects()],
      },
    ],
  ],

  themes: [
    [
      '@easyops-cn/docusaurus-search-local',
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        docsRouteBasePath: '/docs',
        searchBarPosition: 'right',
        searchResultLimits: 10,
        searchResultContextMaxLength: 80,
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/social-card.svg',
      navbar: {
        title: 'Fuck Ecoflow',
        logo: {
          alt: 'Fuck Ecoflow Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            to: '/docs/charging-station',
            label: 'Charging station',
            position: 'left',
          },
          {
            to: '/docs/00-problem/problem-statement/english-version',
            label: 'Problem',
            position: 'left',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
          {
            href: 'https://github.com/LLazyEmail/fuck-ecoflow',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Start here',
                to: '/docs/intro',
              },
              {
                label: 'Charging station',
                to: '/docs/charging-station',
              },
              {
                label: 'Problem statement',
                to: '/docs/00-problem/problem-statement/english-version',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Issues',
                href: 'https://github.com/LLazyEmail/fuck-ecoflow/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} atherdon. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
