---
title: Docusaurusのナビゲーションバーとフッターを国際化（i18n）する手順
authors: [hk]
tags: [docusaurus, i18n, react, typescript, workflow]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" />


Docusaurusサイトの主要UI、`ナビゲーションバー`と`フッター`を国際化（i18n）編集した際の備忘録として整理します。

#### 1. 目的

Docusaurusのi18n機能は、サイトのテキストを多言語に対応させるための仕組み。今回は、`ナビゲーションバー`と`フッター` に新しい項目を追加し、それを日本語（デフォルト）から英語へ翻訳するまでの流れを解説します。

<!-- truncate -->

1.  原文の一元管理
    翻訳の元となるテキストは、すべて `docusaurus.config.ts` ファイル内で管理。これにより、サイトの構造と文言を一箇所で把握。

2.  翻訳ファイルの自動生成
    DocusaurusのCLIコマンドを利用し、翻訳が必要なテキストを自動で抽出。言語ごとの翻訳ファイル（JSON形式）を生成。

3.  シンプルな翻訳作業
    生成されたJSONファイルの特定フィールド（`message`）の編集のみで、翻訳が完了。

#### 2. 国際化対応のワークフロー

例として、ナビゲーションバーとフッターに「ポートフォリオ」という新しいリンクを追加し、英語に翻訳する手順を解説。

##### Step 1: 原文（日本語）の編集

サイトのマスター設定ファイルである `docusaurus.config.ts` に、新しい項目を追加。

1.  `docusaurus.config.ts` を開く。
2.  ナビゲーションバーに項目を追加。`themeConfig.navbar.items` 配列に、新しいリンクオブジェクトを記述。

    ```typescript:title=docusaurus.config.ts
    // ...
    navbar: {
      // ...
      items: [
        // ...既存の項目...
        { to: '/blog', label: 'ブログ', position: 'left' },
        { to: '/portfolio', label: 'ポートフォリオ', position: 'left' }, // ← この行を追加
        { to: '/diary', label: '日記', position: 'left' },
        // ...
      ],
    },
    // ...
    ```

3.  フッターに項目を追加。`themeConfig.footer.links` 配列にも同様にリンクを記述。

    ```typescript:title=docusaurus.config.ts
    // ...
    footer: {
      // ...
      links: [
        {
          title: 'コンテンツ',
          items: [
            // ...既存の項目...
            {
              label: 'ポートフォリオ', // ← このオブジェクトを追加
              to: '/portfolio',
            },
            // ...
          ],
        },
        // ...
      ],
    },
    // ...
    ```

##### Step 2: 翻訳ファイルの更新

`docusaurus.config.ts` の変更内容を、翻訳ファイルに反映。

1.  CLIコマンドの実行。ターミナルで以下のコマンドを実行し、追加したテキストを翻訳対象として抽出。

    ```bash
    docker-compose run --rm app pnpm write-translations --locale en
    ```

2.  翻訳ファイルの更新。コマンドの成功により、`i18n/en/docusaurus-theme-classic/` 配下の `navbar.json` と `footer.json` に、新しい翻訳キーが自動で追加される。

##### Step 3: 英語への翻訳

新しく追加されたキーに対して、英語の翻訳を記述。

1.  ナビゲーションバーの翻訳。`navbar.json` を開き、`item.label.ポートフォリオ` の `message` を英語に書き換え。

    ```json:title=i18n/en/docusaurus-theme-classic/navbar.json
    "item.label.ポートフォリオ": {
      "message": "Portfolio", // ← ここを編集
      "description": "Navbar item with label ポートフォリオ"
    }
    ```

2.  フッターの翻訳。`footer.json` を開き、`link.item.label.ポートフォリオ` の `message` を編集。

    ```json:title=i18n/en/docusaurus-theme-classic/footer.json
    "link.item.label.ポートフォリオ": {
      "message": "Portfolio", // ← ここを編集
      "description": "The label of footer link with label=ポートフォリオ linking to /portfolio"
    }
    ```

##### Step 4: 翻訳結果の確認

編集した翻訳がサイトに正しく表示されるか、本番ビルドを作成して確認。

1.  サイトのビルド。以下のコマンドで、全言語の静的ファイルを生成。

    ```bash
    docker-compose run --rm app pnpm build
    ```

2.  プレビューサーバーの起動。生成された `build` ディレクトリをサーブする。

    ```bash
    docker-compose run --rm --service-ports app pnpm exec http-server build --single --port 3000 --host 0.0.0.0
    ```

3.  ブラウザでの確認。
    *   `http://localhost:3000/en/` にアクセス。
    *   ナビゲーションバーとフッターに「Portfolio」リンクが表示されていることを確認。
    *   サイト右上の言語スイッチャーで言語を切り替え、両方の表示が意図通りかチェック。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />