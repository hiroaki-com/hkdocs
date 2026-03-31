import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type * as PluginContentBlog from '@docusaurus/plugin-content-blog';

// 数式表示のためのRemark/Rehypeプラグイン
const math = require('remark-math');
const katex = require('rehype-katex');

const config: Config = {
  title: 'HKDocs',
  tagline: 'My Knowledge Imprint',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  markdown: {
    mermaid: true,
  },

  trailingSlash: true,
  url: 'https://hkdocs.com/',
  baseUrl: '/',

  organizationName: 'hiroaki-com',
  projectName: 'hkdocs',

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

  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        gtag: {
          trackingID: 'G-NKX9CMSK0S',
          anonymizeIP: true,
        },
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/hiroaki-com/hkdocs',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: true,
        },
        blog: {
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
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
        id: 'diary', // 2つ目のブログとして'diary'を定義
        routeBasePath: 'diary',
        path: './diary',
        blogTitle: 'Diary',
        blogDescription: '体調など雑多な日常の記録',
        showReadingTime: false,
        authorsMapPath: '../blog/authors.yml',
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
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
    {
      href: 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap',
      rel: 'stylesheet',
    },
  ],

  themeConfig: {
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    image: 'img/hkdocs-social-card.jpg',
    announcementBar: { // i18n化のため、日本語と英語を以下で定義。参照：https://docusaurus.io/blog/releases/2.4#translations
      id: 'site_release_20250601',
      content:
        process.env.DOCUSAURUS_CURRENT_LOCALE === 'en'
          ? '🚀 June 1, 2025 ~ 🚀 Our site source code is available on <a target="_blank" rel="noopener noreferrer" href="https://github.com/hiroaki-com/hkdocs/blob/develop/README.en.md#hkdocs">GitHub (OSS)</a>.'
          : '🚀 2025/6/1 ~ 🚀 当サイトのソースコードは全て <a target="_blank" rel="noopener noreferrer" href="https://github.com/hiroaki-com/hkdocs?tab=readme-ov-file#hkdocs">GitHubで公開(OSS)</a> しております。',
      backgroundColor: '#73a8e6',
      textColor: '#fcf3f0',
      isCloseable: true,
    },
    navbar: {
      title: 'HKDocs',
      logo: {
        alt: 'Hk Docs Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo.svg', // 同じファイルを指定するだけでOK
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
        {
          type: 'dropdown',
          label: 'その他',
          position: 'left',
          items: [
            { to: '/diary', label: '日記' },
            { to: '/news', label: 'ニュース' },
            { to: '/links', label: '資料集' },
            { to: '/ai-tools', label: 'AIツール集' },
            { to: '/browser-memo', label: 'ブラウザメモ' },
            { to: '/profile', label: 'プロフィール' },
          ],
        },
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
    footer: {
      style: 'dark',
      links: [
        {
          title: 'コンテンツ',
          items: [
            { label: 'Tech', to: '/docs/intro' },
            { label: 'ブログ', to: '/blog' },
            { label: '日記', to: 'diary' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'ニュース', to: '/news' },
            { label: '資料集', to: '/links' },
            { label: 'AIツール集', to: '/ai-tools' },
            { label: 'ブラウザメモ', to: '/browser-memo' },
            { label: 'プロフィール', to: '/profile' },
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
            { label: 'GitHub', href: 'https://github.com/hiroaki-com/hkdocs' },
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
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
