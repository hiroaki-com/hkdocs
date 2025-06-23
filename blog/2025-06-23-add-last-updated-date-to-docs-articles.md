---
title: DocusaurusのDocs記事に最終更新日を表示する簡単な方法
last_update_date: '2025-06-23'
tags: [docusaurus, frontmatter]
---

当サイト（Docusaurus）のドキュメント記事に、情報の鮮度を示す「最終更新日」を表示させる簡単な実装方法の整理します。
`Docsフォルダ`には、`Blogフォルダ`のように、作成日など日付の記載がデフォルトではされないようなので追加することを決定しました。
Gitの履歴に依存せず、CI/CDの設定変更も不要な、Front Matterを利用した方法の採用しました。

**前提環境:**

*   **サイトジェネレーター:** Docusaurus v3
*   **要件:** ドキュメント記事の信頼性向上のための最終更新日の表示。
*   **方針:** CI/CDパイプラインに影響を与えず、手軽に導入できる方法の選択。

<!-- truncate -->

### 1. 実装方法の検討

Docusaurusでの最終更新日の表示には、主に2つの方法が存在。

#### 方法1: Gitのコミット履歴を利用する（標準機能）

Gitのコミット履歴から最終更新日時と更新者を自動で取得・表示するDocusaurusの標準機能。

*   **メリット:** 一度の設定で、Gitへのコミット時に日時が自動更新されるため、運用が非常に容易。
*   **デメリット:**
    *   CI/CD環境（例: GitHub Actions）でリポジトリの全履歴を取得する設定（`fetch-depth: 0`）が別途必要。
    *   表示日時はあくまでコミット日時に依存。

#### 方法2: Front Matterに日付を記述する（今回採用）

各MarkdownファイルのFront Matterに特定のキーで日付を直接記述する方法。

*   **メリット:**
    *   **CI/CDの設定変更が不要**で、導入が非常に容易。
    *   `docusaurus.config.ts` の簡単な変更とMarkdownファイルへの追記だけで完結。
    *   コミット日時とは無関係に、表示したい日付を自由にコントロール可能。
*   **デメリット:**
    *   記事更新の際に、Front Matterの日付も**手動での更新が必要**。更新を忘れると、内容と表示が食い違う可能性。

今回は、既存のデプロイフローに影響を与えず、手軽に導入できることを優先し、**方法2**を採用。

### 2. Docusaurus 設定ファイルの更新

Docusaurusで最終更新日を表示させるためのオプションの有効化。

1.  プロジェクトのルートにある `docusaurus.config.ts` ファイルを開く。
2.  `presets` -> `'classic'` -> `docs` の設定項目に、`showLastUpdateTime: true` を追加。任意で、更新者を表示する `showLastUpdateAuthor: true` も追加可能。

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    const config: Config = {
      // ...
      presets: [
        [
          'classic',
          {
            // ...
            docs: {
              sidebarPath: './sidebars.ts',
              editUrl: 'https://github.com/hiroaki-com/hkdocs',
              // --- 以下の行を追加 ---
              showLastUpdateTime: true,
              showLastUpdateAuthor: true, // 任意
            },
            // ...
          } satisfies Preset.Options,
        ],
      ],
      // ...
    };
    ```

### 3. MarkdownファイルへのFront Matter追記

最終更新日を表示したいドキュメントのMarkdownファイルに、Docusaurusが認識する特別なキーを使って日付を記述。

1.  対象の `.md` ファイルを開く。
2.  ファイルの先頭にあるFront Matter（`---`で囲まれた部分）に、以下のキーと値を追加。
    *   `last_update_date`: 表示したい最終更新日
    *   `last_update_author`: 表示したい更新者名（任意）

    ```markdown:例: docs/intro.md
    ---
    title: Introduction
    tags: [getting-started]
    # --- 以下の2行を追記 ---
    last_update_date: '2025-06-26'
    last_update_author: 'Hiroaki'
    ---
    
    このドキュメントは...
    ```

`last_update_date` キーが存在する場合、DocusaurusはGitのコミット履歴よりもこちらを優先して表示。

### まとめ

`docusaurus.config.ts` の設定と各記事のFront Matterへの追記だけで、Docs記事に「最終更新日」を簡単に表示することが可能。この方法はCI/CDの設定変更が不要なため、非常に手軽に導入できる点が大きなメリット。

ただし、日付は手動管理のため、記事更新時のFront Matterの更新忘れには注意が必要。情報の正確性と運用の手軽さを天秤にかけ、プロジェクトに合った方法の選択が望ましい。
