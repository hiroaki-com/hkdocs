import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

// 数式表示のためのRemark/Rehypeプラグイン
const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'HkDocs',
  tagline: 'My Knowledge Imprint',
  favicon: 'img/favicon.ico',

  // Docusaurus v4の将来的な機能を有効化
  future: {
    v4: true,
  },

  // URLの末尾にスラッシュを追加する設定
  trailingSlash: true,

  // 本番環境のURLとベースパス
  url: 'https://hkdocs.com/',
  baseUrl: '/',

  // GitHub Pagesデプロイ用の設定
  organizationName: 'hiroaki-com',
  projectName: 'hkdocs',

  // リンク切れの際の挙動（ビルドを失敗させず警告を表示）
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // 国際化（i18n）設定
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
        // Google Analytics (GA4) の設定
        gtag: {
          trackingID: 'G-NKX9CMSK0S',
          anonymizeIP: true,
        },
        // 'docs' プラグインの設定
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hiroaki-com/hkdocs',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: true, // 最終更新日を表示
        },
        // 'blog' プラグインの設定
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

  // 追加のプラグイン設定
  plugins: [
    [
      '@docusaurus/plugin-content-blog',
      {
        id: 'diary', // 2つ目のブログとして'diary'を定義
        routeBasePath: 'diary',
        path: './diary',
        blogTitle: 'Diary',
        blogDescription: '体調など雑多な日常の記録',
        showReadingTime: false,
        authorsMapPath: '../blog/authors.yml',
      } satisfies PluginContentBlog.Options,
    ],
  ],

  // 外部スタイルシートの読み込み
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-wcIxkf4k558sdO6R2bvKte0ZiVEcHGlfxHrgoDae90SSsgkIERV36PksnAqcVB2Q',
      crossorigin: 'anonymous',
    },
    {
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap',
      rel: 'stylesheet',
    },
  ],

  // テーマに関する設定
  themeConfig: {
    // カラーモードの設定
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    // OGP (Open Graph Protocol) 用の画像
    image: 'img/hkdocs-social-card.jpg',
    // サイト上部のお知らせバー
    announcementBar: {
      id: 'site_release_20250601',
      content: '2025年6月1日、当サイトを正式リリースしました 🥳️',
      backgroundColor: '#73a8e6',
      textColor: '#fcf3f0',
      isCloseable: true,
    },
    // ナビゲーションバーの設定
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
          label: 'Tech',
        },
        { to: '/blog', label: 'ブログ', position: 'left' },
        { to: '/diary', label: '日記', position: 'left' },
        { to: '/news', label: 'ニュース', position: 'left' },
        {
          to: '/browser-memo',
          label: 'ブラウザメモ',
          position: 'left',
        },
        { to: '/profile', label: 'プロフィール', position: 'right' },
        {
          href: 'https://github.com/hiroaki-com/hkdocs',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://x.com/hkdocs',
          position: 'right',
          className: 'header-x-link',
          target: '_blank',
          rel: 'noopener noreferrer',
          'aria-label': 'Follow on 𝕏',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    // フッターの設定
    footer: {
      style: 'dark',
      links: [
        {
          title: 'コンテンツ',
          items: [
            { label: 'Tech', to: '/docs/intro' },
            { label: 'ブログ', to: '/blog' },
            { label: '日記', to: '/diary' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'プロフィール', to: '/profile' },
            // [追加] 新しく作成したニュースページへのリンク
            { label: 'ニュース', to: '/news' },
            { label: 'ブラウザメモ', to: '/browser-memo' },
            { label: 'GitHub', href: 'https://github.com/hiroaki-com/hkdocs' },
          ],
        },
        {
          title: 'SNS',
          items: [
            {
              label: '𝕏',
              href: 'https://x.com/hkdocs',
              props: { target: '_blank', rel: 'noopener noreferrer' },
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} hkdocs. All Rights Reserved.<br>The code is licensed under MIT, and the content is licensed under <a href="http://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a>.`,
    },
    // コードブロックのシンタックスハイライトテーマ
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    // 目次（TOC）の表示レベル設定
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
    // Algolia DocSearchの設定
    algolia: {
      appId: 'S30V6IHD5V',
      apiKey: 'adbade7d0089113887a2a706a77f72f8',
      indexName: 'hkcom',
      placeholder: 'サイト内検索',
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
