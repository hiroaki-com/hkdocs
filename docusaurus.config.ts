import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'Hk Docs',
  tagline: 'Tech Memo',
  // favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hkdocs.com/', // サイトのプロダクションURL
  baseUrl: '/',

  organizationName: 'hiroaki-com', // GitHubのユーザー名/組織名
  projectName: 'hkdocs', // リポジトリ名

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/hiroaki-com/hkdocs',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/hiroaki-com/hkdocs',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'diary',
        routeBasePath: 'diary',
        path: './diary',
        blogTitle: 'Diary',
        blogDescription: '体調など雑多な日常の記録',
        showReadingTime: false,
        authorsMapPath: '../blog/authors.yml',
      } satisfies PluginContentBlog.Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-wcIxkf4k558sdO6R2bvKte0ZiVEcHGlfxHrgoDae90SSsgkIERV36PksnAqcVB2Q',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    announcementBar: {
      id: 'site_release_20250601',
      content:
        '2025年6月1日、当サイトを正式リリースしました 🚀',
      backgroundColor: '#ffffff',
      textColor: '#091E42',
      isCloseable: false,
    },
    navbar: {
      title: 'HkDocs',
      // logo: {
      //   alt: 'Hk Docs Logo',
      //   src: 'img/logo.svg',
      // },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tech',
        },
        {to: '/docs/category/exams', label: 'Exams', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {to: '/diary', label: 'Diary', position: 'left'},
        {to: '/profile', label: 'Profile', position: 'left'},
        {
          href: 'https://github.com/hiroaki-com/hkdocs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Tech',
          items: [
            {
              label: 'Tech - Notes',
              to: '/docs/intro',
            },
            {
              label: 'Exams',
              to: '/docs/category/exams',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Diary',
              to: '/diary',
            },
            {
              label: 'Profile',
              to: '/profile',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hiroaki-com/hkdocs',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
