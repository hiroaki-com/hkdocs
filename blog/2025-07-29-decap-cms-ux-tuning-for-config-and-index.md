---
title: Decap CMSのUXを最適化する config.yml と index.html の改善
authors: [hk]
tags: [docusaurus, decap-cms, ux, css, javascript]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" />


以前の記事で、[DocusaurusサイトにDecap CMSを導入した方法](/blog/2025-07-27-docusaurus-decap-cms-with-cloud-run-and-netlify.md)について解説しました。導入によってコンテンツ更新の基盤は整いましたが、実際に日々利用する中で、特にモバイル環境での使い勝手や定型入力の効率化に改善の余地があると感じていました。

この記事では、それらの課題を解決するために[**`static/admin/config.yml`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/config.yml)と[**`static/admin/index.html`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/index.html)に施した、より実践的なカスタマイズの内容を紹介します。

-   **`config.yml`の最適化**: 入力の手間を減らし、ミスを防ぐための設定
-   **`index.html`の改造**: モバイルでの操作性を向上させるCSSとJavaScriptの追加

これらのチューニングによって、PCはもちろん、スマートフォンからでも快適に記事を更新できる環境を構築しました。GitベースのCMSが持つカスタマイズ性の高さを活かした一例として、参考になれば幸いです。

<!-- truncate -->

### **1. `config.yml`による運用効率の向上**

[**`config.yml`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/config.yml)は、CMSのフィールド定義や保存先を指定するだけでなく、日々の運用を効率化するための「仕掛け」を組み込める、柔軟な設定が可能なファイルです。

#### 工夫点1: Conventional Commits準拠のコミットメッセージ自動化

CMS経由でコンテンツを更新すると、Gitのコミット履歴が残ります。この履歴を後から見返したときに分かりやすいよう、[Conventional Commits](https://www.conventionalcommits.org/)の規約に沿ったメッセージが自動で生成されるように設定しました。

`commit_messages`セクションで、`create`（新規作成）、`update`（更新）などのアクションごとにメッセージのテンプレートを指定します。`{{slug}}`や`{{path}}`といったプレースホルダーが使えるため、どのファイルに対する操作なのかが一目で分かります。

```yaml title="static/admin/config.yml"
backend:
  name: git-gateway
  branch: main
  # コミットメッセージを規約に沿ってカスタマイズ
  commit_messages:
    create: 'docs(diary): add new entry "{{slug}}"'
    update: 'docs(diary): revise entry "{{slug}}"'
    delete: 'docs(diary): remove entry "{{slug}}"'
    uploadMedia: 'docs(assets): add media "{{path}}"'
    deleteMedia: 'docs(assets): remove media "{{path}}"'
```

これにより、CMSからの更新であっても、手動でのコミットと遜色ない品質のログを維持できます。

#### 工夫点2: 定型作業の自動化による執筆体験の向上

毎日更新する日記のようなコンテンツでは、いくつかの作業を自動化することで執筆体験が大きく向上します。

-   **ファイル名の自動生成**: `slug`に日付ベースのテンプレート (`{{year}}-{{month}}-{{day}}`) を指定することで、ファイル名を手動で考える必要がなくなり、命名規則が統一されます。
-   **執筆テンプレートの挿入**: `body`フィールドの`default`値にあらかじめ見出しなどを設定しておくことで、新規作成時にテンプレートが自動挿入され、すぐに書き始めることができます。
-   **リアルタイムプレビューの有効化**: `editor: preview: true` を設定することで、Markdownを書きながら隣のペインでリアルタイムに表示を確認できます。

```yaml title="static/admin/config.yml"
collections:
  - name: "diary"
    label: "Diary"
    folder: "diary"
    create: true
    slug: "{{year}}-{{month}}-{{day}}" # ファイル名を日付で自動生成
    editor:
      preview: true  # マークダウンプレビューを有効化
    fields:
      # ... (中略) ...
      - label: "本文"
        name: "body"
        widget: "markdown"
        # 新規作成時に自動で挿入されるテンプレート
        default: "### 天気について\n\n\n<!-- truncate -->\n\n\n### 体調について\n\n\n### 作業について\n\n\n### その他\n\n"
```

これらの設定により、思考を中断することなく、コンテンツの執筆そのものに集中できます。

#### 工夫点3: 隠しフィールドによる定型入力の自動化

記事の著者（authors）は常に自分自身なので、毎回入力するのは非効率です。このような固定値は`widget: "hidden"`と`default`を組み合わせることで、ユーザーの画面からは見せずに自動で設定できます。

```yaml title="static/admin/config.yml"
# ...
fields:
  - label: "Authors"
    name: "authors"
    widget: "hidden" # UI上は非表示にする
    default: ["hk"]   # デフォルト値を設定
```

これにより、利用者は意識することなく、必要なメタデータを付与できます。

---

### **2. `index.html`によるモバイルUXの改善**

Decap CMSのデフォルトUIはPCでの利用が主眼に置かれており、スマートフォンでは操作性に改善の余地がありました。この問題を解決するため、[**`index.html`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/index.html)にカスタムCSSとJavaScriptを直接記述し、モバイルでの操作性を改善しました。

#### 工夫点1: カスタムCSSによるUIの全体最適化

`index.html`の`<style>`タグ内に、`@media (max-width:799px)`のメディアクエリを用いてスマートフォン向けのスタイルを追加しています。レスポンシブ対応に加え、細かな調整を施しました。

-   **レイアウト調整**: ボタンや入力フォームのサイズを調整し、不要なUI要素を非表示にして画面を広く使えるようにしました。
-   **iOSの自動ズーム防止**: `input`や`textarea`の`font-size`を`16px`以上に設定し、フォーム選択時に画面が自動でズームされる挙動を抑制します。
-   **レイアウト基準の統一**: `box-sizing: border-box;`を全体に適用し、CSSのカスタマイズによる意図しないレイアウト崩れを防ぎます。
-   **フォントの最適化**: システムフォント (`-apple-system`, `Roboto`等) を指定し、各OSで自然かつ読みやすい表示を実現しています。

```html title="static/admin/index.html の一部"
<style>
  @media (max-width:799px){
    /* ...レイアウト調整CSS... */
    [data-slate-editor="true"], input, textarea {
      font-size: 16px !important;
    }
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Yu Gothic UI', Roboto, sans-serif;
  }
</style>
```

#### 工夫点2: JavaScriptによるインタラクションの改善

見た目だけでなく、操作性に関する改善もJavaScriptで行っています。

-   **「プルツーリフレッシュ」の無効化**: モバイルブラウザで、編集中に画面を誤って下にスワイプするとページがリロードされてしまう問題を防ぎます。`touchstart`と`touchmove`イベントを監視し、ページ最上部での下方向スワイプのみをキャンセルします。
-   **ログアウト後の自動リダイレクト**: ログアウト処理が完了した後に、自動でログインページ (`/admin/`) に遷移させます。これにより、ユーザーが次に取るべきアクションに迷うことがなくなります。

```html title="static/admin/index.html の一部"
<script>
  (function() {
    function preventPullToRefresh() {
      // ... プルツーリフレッシュ防止ロジック ...
    }
    
    if (window.netlifyIdentity) {
      // ログアウト時にログインページへリダイレクト
      window.netlifyIdentity.on("logout", () => { document.location.href = "/admin/"; });
    }
    
    window.addEventListener('load', preventPullToRefresh);
  })();
</script>
```

これらのスクリプトは、意図したスクロール操作は妨げずに、誤操作によるストレスを的確に軽減します。

### **まとめ**

`config.yml`と`index.html`という2つのファイルに手を加えることで、Decap CMSの使い勝手を大きく向上させることができます。

-   **`config.yml`**: `slug`や`default`値を活用して入力を自動化し、**運用効率**を高める。
-   **`index.html`**: カスタムCSSとJavaScriptでUIとインタラクションを調整し、**モバイルUX**を改善する。

GitベースのCMSは、このように自分の使い方に合わせて柔軟にカスタマイズできる点が大きな利点です。この記事が、皆さんのCMS環境をより快適にするためのヒントになれば幸いです。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />

##### 参考文献

-   [Decap CMS | Configuration Options](https://decapcms.org/docs/configuration-options/)
-   [Decap CMS | Collections](https://decapcms.org/docs/collection-folder/)
-   [Decap CMS | Widgets](https://decapcms.org/docs/widgets/)
-   [Decap CMS | Git Gateway Backend](https://decapcms.org/docs/git-gateway-backend/)
-   [Netlify | Netlify Identity widget](https://github.com/netlify/netlify-identity-widget)
-   [MDN Web Docs | overscroll-behavior](https://developer.mozilla.org/ja/docs/Web/CSS/overscroll-behavior)
