---
title: Docusaurus ナビゲーションアイコン編集：3つのアプローチ
sidebar_position: 5
last_update_date: '2025-06-14'
tags: [docusaurus, アイコン, css, svg]
---

この記事では、Docusaurusサイトのナビゲーションバーにアイコンや特定の記号を表示させるための主要な編集パターンを3つ整理します。


#### 1. テキスト・記号による表示

ナビゲーションアイテムにアイコンや記号を表示する最も直接的かつ簡単な方法。Docusaurusの設定ファイル内で`label`プロパティに直接記述することで実現。

<!-- truncate -->

1.  **設定ファイル編集** (`docusaurus.config.ts`)
    `themeConfig.navbar.items` 配列内の対象アイテムの `label` プロパティに、表示したいテキスト、絵文字、または特殊記号を指定。

    ```typescript
    // docusaurus.config.ts
    // ...
    themeConfig: {
      // ...
      navbar: {
        // ...
        items: [
          {
            href: 'https://github.com/your-org/your-repo',
            label: 'GitHub', // または '🐙', 'プロジェクトリポジトリ' など
            position: 'right',
          },
          {
            href: 'https://x.com/your-account',
            label: '𝕏',     // X (Twitter) のロゴ風記号
            position: 'right',
          },
          // ... 他のナビゲーションアイテム ...
        ],
      },
      // ...
    },
    // ...
    ```

2.  **特徴と考慮点**
    *   **実装**: 非常に容易。追加のCSSやファイル管理は不要。
    *   **軽量性**: サイトのパフォーマンスへの影響は最小限。
    *   **デザイン**: 使用できるのはテキストキャラクタセット内の文字や記号に限られるため、デザインの自由度は低い。特定のブランドロゴなどを正確に表現するのは困難。

#### 2. CSS疑似要素と背景画像によるアイコン表示

CSSの `::before` または `::after` 疑似要素と `background-image` プロパティ（SVG Data URI形式を推奨）を利用し、HTML構造を変更せずにアイコンを表示。

1.  **設定ファイル編集** (`docusaurus.config.ts`)
    アイコンを表示したいナビゲーションアイテムに、CSSでスタイルを適用するための `className` を付与。`label` は空にするか、CSSで視覚的に非表示にする前提でスクリーンリーダー用のテキストを残す。

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            label: ' ', // CSSでアイコン表示するため空にするか、視覚的に隠す
            className: 'header-github-link', // CSSで参照するためのクラス名
            'aria-label': 'GitHub Repository', // アクセシビリティのため必須
            position: 'right',
          },
    // ...
    ```

2.  **カスタムCSS編集** (`src/css/custom.css`)
    指定したクラス名を持つ要素に対し、`::before` 疑似要素を使って背景画像としてアイコンを設定。ライトモードとダークモードで異なるアイコンを表示する場合は、`html[data-theme='dark']` セレクタを利用。

    ```css
    /* src/css/custom.css */
    .header-github-link {
      display: inline-block;
      width: 24px; /* アイコンの幅に合わせて調整 */
      height: 24px; /* アイコンの高さに合わせて調整 */
      font-size: 0; /* labelの空白文字などを見えなくする */
      position: relative; /* ::before の基準点 */
      vertical-align: middle; /* 他のテキストアイテムとの垂直位置調整 */
    }

    .header-github-link::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      /* ライトモード用SVGアイコン (Data URI形式) */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 ... Z'/%3E%3C/svg%3E");
    }

    /* ダークモード対応 */
    html[data-theme="dark"] .header-github-link::before {
      /* ダークモード用SVGアイコン (Data URI形式, fill='white'など) */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 ... Z'/%3E%3C/svg%3E");
    }
    ```

3.  **特徴と考慮点**
    *   **柔軟性**: CSSによるピクセルパーフェクトな位置調整やエフェクト追加が可能。
    *   **HTML構造**: ナビゲーションアイテムのHTML構造自体は変更されない。
    *   **複雑性**: SVGをData URIに変換する手間、CSSでのテーマ毎の画像指定、`label`テキストの非表示化など、CSSの知識と管理コストがやや高い。

#### 3. インラインSVGによるアイコン表示

Docusaurusのナビゲーションアイテム設定オブジェクトが持つ `html` プロパティを利用し、SVGコードを直接HTMLに埋め込む方法。

1.  **設定ファイル編集** (`docusaurus.config.ts`)
    ナビゲーションアイテムの `label` プロパティの代わりに `html` プロパティを使用し、その値として完全なSVGコードを文字列で記述。SVGの `fill` 属性を `currentColor` に設定することで、テーマカラーに追従させることが可能。

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            position: 'right',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="navbar-icon" aria-hidden="true"><path d="M12 ... Z"/></svg>`, // SVGコードを直接記述
            'aria-label': 'GitHub Repository', // アクセシビリティのため必須
          },
    // ...
    ```

2.  **カスタムCSS編集** (`src/css/custom.css`) - オプション
    SVG自体に `fill="currentColor"` を指定していれば、基本的なテーマ対応はCSS不要。ホバーエフェクトやマージン調整など、追加のスタイルが必要な場合に記述。

    ```css
    /* src/css/custom.css */
    .navbar-icon { /* SVGに付与したクラス（オプション） */
      vertical-align: middle; /* 他のテキストアイテムとの垂直位置調整 */
      margin-left: 0.25rem; /* 左側に少しマージンを追加する場合 */
    }

    .navbar-icon:hover {
      opacity: 0.7; /* ホバー時の透明度変更 */
    }
    ```

3.  **特徴と考慮点**
    *   **テーマ追従**: `fill="currentColor"` の利用で、CSSを介さずにライト/ダークテーマのテキストカラーにアイコンの色が自動で適応。
    *   **自己完結性**: アイコンの定義が `docusaurus.config.ts` 内で完結しやすい（外部CSSへの依存度が低い）。
    *   **可読性**: 設定ファイル内に長いSVGコードが記述されるため、設定ファイル全体の可読性が低下する可能性。

#### まとめと推奨

ナビゲーションアイコンの表示方法は、プロジェクトの要件や開発者の好みによって選択可能。

*   **手軽さ・シンプルさ重視**: **テキスト・記号** が最適。
*   **CSSでの細かい制御・既存画像アセットの活用**: **CSS疑似要素と背景画像** が適しているが、管理コストを考慮。
*   **テーマ連動の容易さ・SVGの直接制御**: **インラインSVG** がモダンで推奨されることが多いが、設定ファイルの肥大化に注意。

最終的には、実装の容易さ、メンテナンス性、デザインの要求レベル、パフォーマンスへの影響などを総合的に比較検討し、最適なアプローチを選択することが重要。

---