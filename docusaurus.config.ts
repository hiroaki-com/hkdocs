// docusaurus.config.ts
import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'HkDocs', // サイトのタイトル (i18n対象: code.jsonなどで管理)
  tagline: 'My Knowledge Imprint', // サイトのタグライン (i18n対象: code.jsonなどで管理)
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://hkdocs.com/',
  baseUrl: '/',

  organizationName: 'hiroaki-com',
  projectName: 'hkdocs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ja', // デフォルトロケールを日本語に設定
    locales: ['ja', 'en'], // 対応ロケールに英語を追加
    localeConfigs: {
      ja: {
        htmlLang: 'ja-JP',
        // label: '日本語', // ドロップダウンに表示するラベル (デフォルトでロケール名が使われる)
      },
      en: {
        htmlLang: 'en-US',
        label: 'English', // 英語用のドロップダウン表示ラベル
      },
    },
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
        blogTitle: 'Diary', // 日記ブログのタイトル (i18n対象)
        blogDescription: '体調など雑多な日常の記録', // 日記ブログの説明 (i18n対象)
        showReadingTime: false,
        authorsMapPath: '../blog/authors.yml', // authors.ymlのパスはメインブログと共通
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
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/hkdocs-social-card.jpg', // OGP画像
    announcementBar: {
      id: 'site_release_20250601',
      content:
        '2025年6月1日、当サイトを正式リリースしました 🥳️', // アナウンスバーの内容 (i18n対象: code.jsonなどで管理)
      backgroundColor: '#73a8e6',
      textColor: '#fcf3f0',
      isCloseable: true,
    },
    navbar: {
      title: 'HkDocs', // ナビゲーションバーのサイトタイトル (i18n対象: docusaurus-theme-classic/navbar.json または code.json で管理)
      logo: {
        alt: 'Hk Docs Logo', // ロゴのaltテキスト (i18n対象)
        src: 'img/logo.svg',
      },
      hideOnScroll: true,
      items: [
        {
          to: '/docs/category/tech',
          label: 'Tech', // ナビゲーションアイテムのラベル (i18n対象)
          position: 'left',
          activeBasePath: 'docs/tech',
        },
        {to: '/docs/category/exams', label: 'Exams', position: 'left'}, // (i18n対象)
        {to: '/blog', label: 'Blog', position: 'left'}, // (i18n対象)
        {to: '/diary', label: 'Diary', position: 'left'}, // (i18n対象)
        {
          to: '/browser-memo',
          label: 'Browser Memo', // (i18n対象)
          position: 'left',
        },
        {to: '/profile', label: 'Profile', position: 'right'}, // (i18n対象)
        {
          href: 'https://github.com/hiroaki-com/hkdocs',
          label: 'GitHub', // (i18n対象)
          position: 'right',
        },
        {
          href: 'https://x.com/hkdocs',
          label: '𝕏', // (i18n対象)
          position: 'right',
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-label': 'Follow on 𝕏', // (i18n対象)
        },
        { // ★★★ 言語切り替えドロップダウンを追加 ★★★
          type: 'localeDropdown',
          position: 'right', // 表示位置 (例: 'left', 'right')
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [ // フッターリンクの各タイトル、ラベルはi18n対象 (docusaurus-theme-classic/footer.json または code.json で管理)
        {
          title: 'Tech',
          items: [
            {
              label: 'Tech',
              to: '/docs/category/tech',
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
              label: 'Browser Memo',
              to: '/browser-memo',
            },
          ],
        },
        {
          title: 'SNS',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/hiroaki-com/hkdocs',
            },
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
      copyright: `Copyright © ${new Date().getFullYear()} hkdocs. All Rights Reserved.<br>The code is licensed under MIT, and the content is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`, // コピーライト (i18n対象: code.jsonなどで管理)
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
      apiKey: 'adbade7d0089113887a2a706a77f72f8', // Search-Only API Key
      indexName: 'hkcom',
      placeholder: 'サイト内検索', // Algolia検索バーのプレースホルダー (i18n対象: code.jsonなどで管理)
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
