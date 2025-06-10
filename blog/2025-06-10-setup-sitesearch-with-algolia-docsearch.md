---
title: DocusaurusにAlgolia DocSearchを組み込む方法
authors: [hk]
tags: [docusaurus]
---

この記事では、Algolia DocSearch を使用して、サイト内検索機能を設定した際の手順を整理します。

### 1. Algolia DocSearch への申請

*   [Algolia DocSearch 申請ページ](https://docsearch.algolia.com/apply/)へのアクセス
*   下記情報の入力と申請:
    *   **サイトURL**: `https://hkdocs.com/`
    *   **リポジトリURL**
    *   **メールアドレス**
*   申請後のAlgoliaチームからの承認、および設定情報（`apiKey`, `indexName`, `appId`）記載メールの受信待ち



### 2. Docusaurus 設定ファイルの更新

`docusaurus.config.ts` への `algolia` 設定の追加。

`themeConfig` オブジェクト内への `algolia` 設定記述:

```typescript
// docusaurus.config.ts
// ... (他のimport文や設定はそのまま)

const config: Config = {
  // ... (既存のtitle, taglineなどの設定) ...

  themeConfig: {
    // ... (既存のimage, announcementBar, navbarなどの設定) ...

    algolia: {
      // 【重要】Algoliaからの提供情報への置き換え
      appId: 'YOUR_APP_ID',         // Algolia App ID
      apiKey: 'YOUR_SEARCH_API_KEY', // Algolia Search APIキー
      indexName: 'YOUR_INDEX_NAME',   // Algolia Index名

      // オプション: 検索ボックスのプレースホルダーテキスト
      placeholder: 'サイト内検索', // 例:「サイト内検索」
    },

    // ... (既存のfooter, prismなどの設定) ...
  } satisfies Preset.ThemeConfig,

  // ... (既存のpresets, pluginsなどの設定) ...
};

export default config;
```



### 3. Algolia 認証情報の設定

Algolia DocSearch申請承認後、メールで受信する下記3情報の設定:

*   `appId`
*   `apiKey` (検索専用APIキー)
*   `indexName`

上記情報を、ステップ2で `docusaurus.config.ts` に記述したプレースホルダー箇所への正確な設定。



### 4. 検索対象コンテンツ

DocusaurusのAlgolia連携によるサイト内コンテンツの自動クロールと検索インデックス作成。
対象コンテンツ:

*   `docs` (`/docs/...`)
*   `blog` (`/blog/...`)
*   `diary` (`/diary/...`) (カスタムブログプラグインも自動対象)



### 5. ビルドとデプロイ

設定ファイルへのAlgolia情報入力後、サイトのビルドとデプロイ。

1.  **ローカルでのビルドと確認 (任意):**
    ```bash
    pnpm run build
    pnpm run serve
    ```
    ローカルでの検索ボックス表示確認（この時点での検索機能は未保証）。

2.  **本番環境へのデプロイ:**
    通常手順（例: `deploy.sh` 実行）によるサイトの本番環境へのデプロイ。
    デプロイ後のAlgoliaクローラーによるサイト巡回と検索インデックス構築。



### 6. 動作確認

デプロイ後、時間経過（数時間～1日程度）を置いての下記確認:

1.  **検索ボックスの表示**:
    サイト (`https://hkdocs.com/`) ナビゲーションバーへの検索ボックス表示。
2.  **検索機能のテスト**:
    キーワード入力による検索実行。`docs`、`blog`、`diary` コンテンツの検索結果表示。
3.  **検索結果の妥当性**:
    検索結果の適切性、およびリンクの正常動作。

問題発生時の確認点: `docusaurus.config.ts` 設定値の正当性、Algolia提供情報の再確認。