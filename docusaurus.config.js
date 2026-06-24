// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';
import fs from 'node:fs';
import path from 'node:path';

const assemblyaDocsDir = path.join(
  process.cwd(),
  'docs/01-outsourcing-engineering/AssemBLYA',
);

const assemblyaRoutePrefix = '/docs/outsourcing-engineering/assemblya';

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
      '/docs/reports/plastic-fantastic/June-22/',
      '/docs/reports/plastic-fantastic/June-22/readme',
    ],
  },
  {
    to: '/docs/team/our-lab',
    from: [
      '/docs/team/our-lab/Our-Distributed-Laboratory',
      '/docs/team/our-lab/Our-Distributed-Laboratory/',
    ],
  },
  {
    to: '/docs/team/veteran-business',
    from: ['/docs/team/english'],
  },
];

function collectMarkdownFiles(directory) {
  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return collectMarkdownFiles(entryPath);
    }

    return entry.isFile() && entry.name.endsWith('.md') ? [entryPath] : [];
  });
}

function getAssemblyaRoute(filePath) {
  const relativePath = path
    .relative(assemblyaDocsDir, filePath)
    .split(path.sep)
    .join('/');
  const routePath = relativePath.replace(/\.md$/, '');

  if (routePath === 'readme') {
    return `${assemblyaRoutePrefix}/`;
  }

  if (routePath.endsWith('/readme')) {
    return `${assemblyaRoutePrefix}/${routePath.slice(0, -'/readme'.length)}/`;
  }

  return `${assemblyaRoutePrefix}/${routePath}`;
}

function getAssemblyaRedirects() {
  return collectMarkdownFiles(assemblyaDocsDir).map((filePath) => {
    const route = getAssemblyaRoute(filePath);
    const suffix = route.slice(assemblyaRoutePrefix.length);

    return {
      to: route,
      from: [
        `/docs/outsourcing-engineering/AssemBLYA${suffix}`,
        `/docs/outsourcing-engineering/AssemBlya${suffix}`,
      ],
    };
  });
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Fuck Ecoflow',
  tagline: 'Documentation for fuck-ecoflow',
  favicon: 'img/favicon.svg',

  // Set the production url of your site here
  url: 'https://atherdon.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/fuck-ecoflow/',

  // GitHub pages deployment config.
  organizationName: 'atherdon',
  projectName: 'fuck-ecoflow',

  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
      onBrokenMarkdownImages: 'warn',
    },
  },

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is in Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
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
            href: 'https://github.com/atherdon/fuck-ecoflow',
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
                label: 'Documentation',
                to: '/docs/intro',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Issues',
                href: 'https://github.com/atherdon/fuck-ecoflow/issues',
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
