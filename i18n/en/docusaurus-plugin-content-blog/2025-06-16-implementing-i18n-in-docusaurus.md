---
title: Docusaurus サイトを多言語対応 (i18n) するための実装手順
authors: [hk]
tags: [docusaurus, i18n]
---

この記事では、Docusaurus で構築したサイトに多言語対応（i18n）機能を実装し、日本語（デフォルト）と英語のコンテンツを切り替えられるように設定した際の手順を整理します。

公式ドキュメントを参考にしつつ、Docker 環境でのコマンドや、デプロイ前の確実な動作確認方法など、実践で役立つポイントも交えて解説します。

**前提環境:**

*   **サイトジェネレーター:** Docusaurus (プロジェクトセットアップ済み)
*   **開発環境:** Docker (ローカル環境のコマンドも併記)
*   **目標:** 日本語(`ja`)と英語(`en`)の2言語に対応させる

<!-- truncate -->

### 1. Docusaurus 設定ファイル (`docusaurus.config.ts`) の更新

まず、Docusaurus に多言語機能を有効化し、サイトの基本設定を整えます。

1.  プロジェクトルートにある `docusaurus.config.ts` (または `.js`) ファイルを開きます。
2.  `i18n` オブジェクトを追加し、デフォルト言語とサポートする言語を定義します。また、URLの正規化のために `trailingSlash: true` を設定することを推奨します。これにより、サーバー環境に依存しない安定したルーティングが実現できます。

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    import type {Config} from '@docusaurus/types';

    const config: Config = {
      // ...

      // URLの末尾にスラッシュを強制し、ルーティングを安定させる
      trailingSlash: true,

      i18n: {
        // サイトのデフォルト言語
        defaultLocale: 'ja',
        // サイトがサポートする言語のリスト
        locales: ['ja', 'en'],
        // 各言語の詳細設定 (言語スイッチャーのラベルやHTMLのlang属性)
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

      // ...
    };
    ```

3.  `themeConfig.navbar.items` に `type: 'localeDropdown'` を追加し、ユーザーがサイト上で言語を切り替えられるスイッチャーをヘッダーに表示させます。

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    // ...
    themeConfig: {
      navbar: {
        items: [
          // ... (既存のナビゲーション項目)

          // 言語切り替えスイッチャーを追加
          {
            type: 'localeDropdown',
            position: 'right', // 'left' も可
          },
        ],
      },
      // ...
    },
    // ...
    ```

### 2. UI翻訳ファイルの生成と翻訳作業

次に、サイト全体で共通して使われるUI要素（例: "前のページ", "次のページ" ボタンなど）の翻訳ファイルを作成します。

1.  **翻訳ファイルの生成コマンド実行**
    ターミナルで以下のコマンドを実行し、追加言語（この場合は英語: `en`）用の翻訳テンプレート（JSONファイル）を `i18n/en/` ディレクトリに生成します。
    ```bash
    # Docker環境の場合
    docker-compose run --rm app pnpm write-translations --locale en

    # ローカル環境の場合
    pnpm docusaurus write-translations --locale en
    ```

2.  **UIテキストの翻訳**
    生成された `i18n/en/docusaurus-theme-classic/code.json` などのJSONファイルを開き、`"message"` キーに対応する値を、適切な英語に翻訳・編集します。

### 3. 翻訳コンテンツの配置 (最重要ステップ)

ここが多言語対応で最も重要なステップです。翻訳したMarkdownファイルを、Docusaurusが認識できる正しいディレクトリ構造に従って配置します。

1.  **翻訳コンテンツ用ディレクトリの作成**
    追加言語（英語）用のコンテンツを格納するディレクトリを、ホストマシンのターミナルから一括で作成しておくと便利です。
    ```bash
    # docs, blog, pages の英語コンテンツ用ディレクトリを作成
    mkdir -p i18n/en/docusaurus-plugin-content-docs/current \
             i18n/en/docusaurus-plugin-content-blog \
             i18n/en/docusaurus-plugin-content-pages
    ```
    *※ブログのインスタンスを複数利用している場合は、その分ディレクトリを作成します (例: `docusaurus-plugin-content-blog-diary`)*

2.  **コンテンツのコピーと翻訳**
    > **アドバイス:** 最初は**最低1ページ**だけ翻訳し、i18n機能が正しく動作するかを早期に確認することを強く推奨します。

    **例：Docsの `intro.md` を英語化する場合**

    1.  **ファイルをコピー:** デフォルト言語の `docs/intro.md` を、先ほど作成した英語用のディレクトリにコピーします。
        ```bash
        cp docs/intro.md i18n/en/docusaurus-plugin-content-docs/current/intro.md
        ```
    2.  **内容を翻訳:** コピー先のファイル (`i18n/en/.../intro.md`) を開き、Markdownの内容をすべて英語に書き換えます。

    このプロセスを、翻訳したい他のすべてのコンテンツ（ブログ記事、カスタムページなど）に対しても同様に繰り返します。

### 4. 動作確認

設定が正しく反映されているかを確認します。開発中のリアルタイム確認と、デプロイ前の最終確認の2つの方法を使い分けることが重要です。

#### 4.1. 開発中のリアルタイム確認

翻訳作業中など、特定の言語の表示をホットリロードを有効にして確認したい場合に使います。

> **注記:** 開発サーバー (`start` コマンド) は、一度に一つの言語しか起動できません。また、Docker環境で外部からアクセスするには `--host 0.0.0.0` オプションが必須です。

```bash
# 【英語サイトで開発する場合】
# Docker環境:
docker-compose run --rm --service-ports app pnpm start --locale en --host 0.0.0.0
# ローカル環境:
pnpm start --locale en

# 【日本語サイト(デフォルト)で開発する場合】
# Docker環境:
docker-compose run --rm --service-ports app pnpm start --host 0.0.0.0
# ローカル環境:
pnpm start
```

#### 4.2. デプロイ前の最終確認

デプロイ後の問題を未然に防ぐため、ローカル環境で本番と同じビルド成果物を使い、最終チェックを行います。

1.  **SPA対応サーバーの導入 (初回のみ)**
    本番環境でのルーティング問題をローカルで再現するため、`http-server` をプロジェクトに追加します。
    ```bash
    pnpm add -D http-server
    ```
2.  **`serve` スクリプトの設定 (初回のみ)**
    `package.json` の `scripts` に、SPAモード (`--single`) でビルド成果物を提供するためのコマンドを追加します。
    ```json:package.json
    "scripts": {
      // ...
      "build": "docusaurus build",
      "serve": "http-server ./build --single"
    }
    ```
3.  **ビルドとプレビュー実行**
    この手順が、デプロイ前の最も信頼できる最終チェックとなります。
    ```bash
    # 1. 全言語のコンテンツをビルド
    pnpm build

    # 2. 本番に近いサーバーでプレビュー
    pnpm serve
    ```
4.  **ブラウザで検証**
    ブラウザで `http://localhost:8080` (またはターミナルに表示されたアドレス) にアクセスします。サイト全体で言語スイッチャーが正しく機能し、ページ遷移時にURLがおかしくなったり、画面が真っ白になったりしないかを念入りに確認します。

### 5. デプロイ

ローカルでの最終確認が完了したら、生成された `build` ディレクトリを本番のホスティング環境（Google Cloud Run, Vercel, Netlifyなど）にデプロイします。GitHub Actionsなどを利用して自動デプロイしている場合は、ここまでの変更をすべてコミットし、デプロイがトリガーされるブランチ（例: `main`）にマージします。
