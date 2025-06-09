import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

// 数式サポートのために remark-math と rehype-katex をインポート
// docusaurus.config.js (または .ts) はNode.js環境で実行されるため、requireを使用します。
const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'Hk Docs',
  tagline: 'Tech Memo',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://hkdocs-service-101489112208.asia-northeast1.run.app/', // TODO: ご自身のサイトURLに置き換えてください
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'hkdocs', // Usually your GitHub org/user name.
  projectName: 'hkdocs', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: { // ここには sidebar 設定を記述しません
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/hiroaki-com/hkdocs',
          remarkPlugins: [math], // 数式サポートを追加
          rehypePlugins: [katex], // 数式サポートを追加
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/hiroaki-com/hkdocs',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          remarkPlugins: [math], // 数式サポートを追加
          rehypePlugins: [katex], // 数式サポートを追加
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

// ↓↓↓ 日記用にここまでを追加 ↓↓↓
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
        // editUrl: 'https://github.com/hiroaki-com/hkdocs/tree/main/diary/', // 必要ならコメント解除
        authorsMapPath: '../blog/authors.yml', // 著者情報の共通化のためblogから引用
        remarkPlugins: [math], // 数式サポートを追加 (日記でも使う場合)
        rehypePlugins: [katex], // 数式サポートを追加 (日記でも使う場合)
      } satisfies PluginContentBlog.Options,
    ],
  ],
  // ↑↑↑ 日記用にここまでを追加 ↑↑↑

  // KaTeXのCSSを読み込むための設定
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.10/dist/katex.min.css', // バージョンは適宜最新のものを確認
      type: 'text/css',
      integrity: 'sha384-wcIxkf4k558sdO6R2bvKte0ZiVEcHGlfxHrgoDae90SSsgkIERV36PksnAqcVB2Q',
      crossorigin: 'anonymous',
    },
  ],

  themeConfig: {
    // Replace with your project's social card
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
        hideable: true, // サイドバーを折りたたみ可能にする
        // autoCollapseCategories: false, // 必要に応じてこちらも設定
      },
    },
    tableOfContents: { // これは既存の設定
      minHeadingLevel: 2, // 表示を開始する見出しレベル (例: ## H2)
      maxHeadingLevel: 5, // 表示を終了する見出しレベル (例: #### H4 まで表示する場合)
    },
  } satisfies Preset.ThemeConfig, // satisfies Preset.ThemeConfig は themeConfig オブジェクトの最後に置きます
};

export default config;
