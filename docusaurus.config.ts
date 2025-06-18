// docusaurus.config.ts
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'HkDocs',
  tagline: 'My Knowledge Imprint',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // i18n利用時のURL問題を避けるため、末尾スラッシュを有効化
  trailingSlash: true,

  url: 'https://hkdocs.com/',
  baseUrl: '/',

  organizationName: 'hiroaki-com',
  projectName: 'hkdocs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // 国際化(i18n)設定
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en'],
    localeConfigs: {
      ja: {
        label: '日本語',
        htmlLang: 'ja-JP',
      },
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hiroaki-com/hkdocs',
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/hiroaki-com/hkdocs',
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
      integrity:
        'sha384-wcIxkf4k558sdO6R2bvKte0ZiVEcHGlfxHrgoDae90SSsgkIERV36PksnAqcVB2Q',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/hkdocs-social-card.jpg',
    announcementBar: {
      id: 'site_release_20250601',
      content: '2025年6月1日、当サイトを正式リリースしました 🥳️',
      backgroundColor: '#73a8e6',
      textColor: '#fcf3f0',
      isCloseable: true,
    },
    navbar: {
      title: 'HkDocs',
      logo: {
        alt: 'Hk Docs Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        { to: '/blog', label: 'Blog', position: 'left' },
        { to: '/diary', label: 'Diary', position: 'left' },
        {
          to: '/browser-memo',
          label: 'Browser Memo',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        { to: '/profile', label: 'Profile', position: 'right' },
        {
          href: 'https://github.com/hiroaki-com/hkdocs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://x.com/hkdocs',
          label: '𝕏',
          position: 'right',
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-label': 'Follow on 𝕏',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Contents',
          items: [
            {
              label: 'Docs',
              to: '/docs/intro',
            },
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'Diary',
              to: '/diary',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Profile',
              to: '/profile',
            },
            {
              label: 'Browser Memo',
              to: '/browser-memo',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/hiroaki-com/hkdocs',
            },
          ],
        },
        {
          title: 'SNS',
          items: [
            {
              label: '𝕏',
              href: 'https://x.com/hkdocs',
              props: {
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} hkdocs. All Rights Reserved.<br>The code is licensed under MIT, and the content is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`,
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
    algolia: {
      appId: 'S30V6IHD5V',
      apiKey: 'adbade7d0089113887a2a706a77f72f8',
      indexName: 'hkcom',
      placeholder: 'サイト内検索',
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
