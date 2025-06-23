---
title: DocusaurusにAlgolia DocSearchを組み込む方法
sidebar_position: 2
last_update:
  date: 2025-06-10
tags: [docusaurus]
---

この記事では、Algolia DocSearch を使用して、サイト内検索機能を設定した際の手順と課題解決の経緯を整理します。

### DocusaurusにAlgolia DocSearchを実装した際の記録

参考：
- https://docusaurus.io/docs/search
- https://docsearch.algolia.com/docs/api/#indexname

採用サービス：
- [Algolia DocSearch](https://docsearch.algolia.com/)

<!-- truncate -->

#### 1. Algolia DocSearchへの申請

1.  **DocSearch公式サイトへのアクセス**
    [Algolia DocSearch公式サイト](https://docsearch.algolia.com/)へアクセス。

2.  **申請フォームの提出**
    サイトの指示に従い、対象サイトのURLやリポジトリ情報を入力し申請。

3.  **キー情報の取得**
    申請承認後、Algoliaから提供される以下の3つの情報を取得。
    *   `appId` (Application ID)
    *   `apiKey` (Search-Only API Key)
    *   `indexName` (インデックス名)

#### 2. `docusaurus.config.ts`の更新

1.  **設定ファイルへの`algolia`設定追加**
    プロジェクトルートの`docusaurus.config.ts`を開き、`themeConfig`オブジェクト内に`algolia`プロパティを追加。

2.  **設定内容**
    取得したキー情報を各項目に設定。

    ```typescript
    // docusaurus.config.ts
    // ...
    themeConfig: {
      // ...他の設定...

      algolia: {
        // Algoliaから提供されるアプリケーションID
        appId: 'YOUR_APP_ID',

        // Public APIキー：コミットしても安全
        apiKey: 'YOUR_SEARCH_API_KEY',

        // Algoliaのインデックス名
        indexName: 'YOUR_INDEX_NAME',

        // 推奨：コンテキスト検索の有効化
        contextualSearch: true,

        // オプション：検索ページのパス（デフォルトは 'search'）
        searchPagePath: 'search',
      },
    },
    // ...
    ```

#### 3. Algoliaクローラーによるインデックス作成

1.  **初回クロール**
    DocSearchチームによるクロール設定完了後、サイトコンテンツがAlgoliaインデックスへ初回登録。

2.  **クローラー設定の確認**
    必要に応じて、Algoliaダッシュボードからクロール対象のURLや除外設定などを確認。

3.  **コンテンツの自動更新**
    サイト更新後、DocSearchクローラーが定期的に変更を検知し、検索インデックスを自動更新。

    > **注意**：クロールが完了し、インデックスにデータが登録されるまで検索機能は動作しない。

#### 4. 動作確認

1.  **ローカル開発サーバーの起動**
    `pnpm start`等のコマンドで開発サーバーを起動。

2.  **検索UIの表示確認**
    サイトのナビゲーションバーに検索ボックスが表示されていることを確認。

3.  **検索機能のテスト**
    キーワードを入力し、検索結果が正しく表示されるかテスト。

4.  **ビルドとデプロイ**
    ローカルでの確認後、`pnpm build`等でビルドし、本番環境へデプロイ。デプロイ後も動作を再確認。

---

### 追記：検索機能不全の発生と解決

#### 1. 発生した事象

*   **現象**
    検索ボックスは表示されるが、キーワードを入力してもサイトタイトルしかヒットせず、記事本文や各ページの内容が検索対象外。
*   **試行**
    Algoliaダッシュボードからの手動クロールや、クローラー設定のCSSセレクタ修正では改善せず。
*   **エラー**
    クローラーログに`Too many missing records`エラーが発生。新規クロールで取得したレコードが0件のため、インデックス更新が安全装置によりブロックされていた。

#### 2. 原因

**Algoliaクローラーによる、JavaScript未実行でのサイト巡回。**

Docusaurus v3はJavaScriptによって動的にコンテンツを描画するSPA（シングルページアプリケーション）。デフォルト設定のクローラー（`renderJavaScript: false`）では、JavaScript実行前のHTML（中身が空の状態）を読み込んでいたため、インデックスされるべきテキストが存在しなかった。

#### 3. 解決策

**Algoliaクローラー設定の変更。**

1.  Algoliaダッシュボードで対象クローラーの設定エディターを開く。
2.  設定項目`renderJavaScript: false`を`true`に変更。

    ```javascript
    // Algoliaクローラー設定ファイル
    new Crawler({
      // ...
      renderJavaScript: true,
      // ...
    });
    ```

これにより、クローラーはJavaScript実行後の完全に描画されたHTMLを読み込むようになり、CSSセレクタが本文コンテンツを正しく抽出可能となった。

#### 4. 教訓

*   Docusaurus v2以降やReact/Vue等のSPAにAlgoliaを適用する場合、`renderJavaScript: true`の設定は必須の可能性が高い。
*   「セレクタは正しいのにデータが抽出できない」場合、まずクローラーのJavaScriptレンダリング設定の確認。
*   クローラーのテスト実行機能（Run a test）で取得した生のHTMLを確認することが、問題の切り分けに極めて有効。