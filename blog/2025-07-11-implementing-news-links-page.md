---
title: Docusaurusで多言語対応ニュースリンク集ページを作成
authors: [hk]
tags: [docusaurus, react, typescript, i18n, css-modules, ui/ux]
---

この記事では、Docusaurusサイト内に、国内外のニュースサイトを一覧できる「ニュースページ」を実装した際の整理をします。

#### 1. ページの目的と主要機能

個人的な情報収集の起点として、信頼できるニュースソースへ素早くアクセスできるページの構築が目的。すべて静的ページとしてビルドし、高速な表示や利便性、メンテナンス性を重視しました。。

<!-- truncate -->

1.  **体系的なカテゴリ分類**
    ニュースサイトを「総合・経済」「テクノロジー」等に分類。HTMLの`<details>`タグでカテゴリ毎の開閉を可能にし、一覧性を確保。

2.  **多言語対応 (i18n)**
    Docusaurusの国際化機能を活用し、ページ内の全テキスト（見出し、説明文など）の日英切り替えに対応。

3.  **セクションへの直接リンク**
    各カテゴリ見出しにアンカーリンクを設置し、特定カテゴリへのURL共有を可能に。

4.  **レスポンシブなカードレイアウト**
    CSS Gridレイアウトを採用し、PCからスマートフォンまで、多様な画面サイズで表示を最適化。

#### 2. 主要な実装ポイント

Reactコンポーネントとして `src/pages/news.tsx` に実装し、スタイリングにはCSS Modules (`news.module.css`) を採用。

##### 1. 多言語対応 (i18n)

Docusaurusが提供する`<Translate>`コンポーネントと`translate` APIを全面的に活用。マークアップと翻訳コンテンツを分離し、メンテナンス性を向上。

*   **`<Translate>`コンポーネントの利用**
    JSX内で静的なテキストを翻訳する際に使用。`id`をキーとして、対応する翻訳テキストを`code.json`から自動で取得。

    ```tsx
    // src/pages/news.tsx
    import Translate from '@docusaurus/Translate';

    <h1>
      <Translate id="news.page.heading">ニュース</Translate>
    </h1>
    // 英語表示時は 'News' に、日本語表示時は 'ニュース' に置換される
    ```

*   **`translate` APIの利用**
    コンポーネントの属性（props）など、JSXタグの外部で文字列を翻訳する場合に使用。`Layout`コンポーネントの`title`や`description`に渡す際に有効。

    ```tsx
    // src/pages/news.tsx
    import { translate } from '@docusaurus/Translate';

    <Layout
      title={translate({
        id: 'news.page.title',
        message: 'ニュース一覧', // デフォルト（翻訳が見つからない場合）のテキスト
      })}
    >
      {/* ... */}
    </Layout>
    ```
    この仕組みにより、翻訳データは`i18n/{locale}/code.json`に集約され、テキストの管理と翻訳作業が一元化される。

##### 2. コンポーネント設計

ページを構成する要素を機能ごとにコンポーネント化し、再利用性と可読性を向上。

*   **`NewsSiteCard`コンポーネント**
    サイトの「タイトル」「説明文」「リンク先URL」をpropsとして受け取る、再利用可能なカードコンポーネント。このコンポーネントを繰り返し利用することで、ニュースサイトの追加や修正が容易に。

    ```tsx
    // 利用側 (news.tsx)
    <NewsSiteCard
      href="https://www.nikkei.com/"
      title={<Translate id="news.site.jp.ge.nikkei.title">日本経済新聞</Translate>}
      description={<Translate id="news.site.jp.ge.nikkei.desc">...</Translate>}
    />
    ```

*   **`SectionHeading`コンポーネント**
    意味的な正しさを保ちつつ、UIを共通化するためのカスタム見出しコンポーネント。`as` propを通じて、`h2`や`h3`といった見出しレベルを動的に指定可能。

    ```tsx
    // src/pages/news.tsx
    const SectionHeading = ({ as: Component, id, className, children }) => {
      return (
        // `as` propで受け取った 'h2' や 'h3' がComponentとしてレンダリングされる
        <Component id={id} className={`${className} ${styles.sectionHeading}`}>
          <a
            className={styles.anchorLink}
            href={`#${id}`}
            aria-label="この見出しへの固定リンク"
          >
            #
          </a>
          {children}
        </Component>
      );
    };

    // 使用例
    <SectionHeading as="h2" id="japan" ... >
      日本
    </SectionHeading>
    ```
    この実装により、異なる見出しレベルで同じ「アンカーリンク付き」の挙動を再利用できる。

##### 3. スタイリング (CSS Modules & Grid Layout)

コンポーネント単位でスタイルを管理するため、CSS Modulesを採用。グローバルなCSS汚染を防ぐ。

*   **スコープされたCSS**
    `news.module.css`内で定義したクラス名は、ビルド時に`[filename]_[classname]__[hash]`のような一意な名前に変換。これにより、他のコンポーネントのスタイルとの意図しない競合を完全に回避。

*   **レスポンシブなGridレイアウト**
    カード一覧のレイアウトにはCSS Gridを使用。`repeat(auto-fill, minmax(300px, 1fr))`という記述がキー。
    ```css
    /* src/pages/news.module.css */
    .cardGrid {
      display: grid;
      /* 1列の最小幅を300pxとし、コンテナ幅に応じて列数を自動調整 */
      /* 'auto-fill'で可能な限り列を埋め、'1fr'で余白を均等に分配 */
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    ```
    この一行で、メディアクエリを複雑に記述することなく、柔軟なレスポンシブデザインを実現。

#### 3. UI/UXの工夫

HTML標準機能とCSSを最大限に活用し、軽量でアクセシブルなUIを構築。

1.  **`<details>`タグによるアコーディオンUI**
    カテゴリの開閉機能は、HTML標準の`<details>`と`<summary>`タグで実装。
    *   **JavaScript不要**: ブラウザのネイティブ機能であるため、追加のJSコードなしで動作し、軽量。
    *   **アクセシビリティ**: キーボード操作（Enterキーでの開閉など）に標準で対応しており、アクセシビリティが高い。
    *   **初期状態の制御**: `open`属性を付与するだけで、初期表示を「開いた状態」に設定可能。

2.  **ホバーで表示されるアンカーリンク**
    `SectionHeading`コンポーネント内の`#`リンクは、通常時は`opacity: 0`で非表示。親要素へのホバー時に`opacity: 1`に切り替えるCSSを適用。
    ```css
    .sectionHeading .anchorLink {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sectionHeading:hover .anchorLink {
      opacity: 1;
    }
    ```
    これにより、UIをクリーンに保ちつつ、必要な時に機能の存在をユーザーに提示。
