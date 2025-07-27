---
title: Cloud Run上のDocusaurusサイトにDecap CMSを導入した記録
authors: [hk]
tags: [docusaurus, decap-cms, netlify, cloud-run, ci/cd]
---
このサイトのコンテンツ管理を効率化するため、ヘッドレスCMSであるDecap CMS（旧Netlify CMS）を導入しました。この記事では、その導入プロセスと技術的な判断、そして遭遇した問題の解決策について記録します。

最終的に、CMSの管理画面はNetlifyで、公開サイトはGoogle Cloud Runで運用する、という少し特殊なハイブリッド構成に落ち着きました。

-   CMS管理環境 (Netlify)
    -   URL: `https://[your-site].netlify.app/admin/`
    -   役割: Decap CMSの管理画面を提供し、Netlify Identityで認証を行います。

-   公開サイト環境 (Google Cloud Run)
    -   URL: `https://[your-custom-domain].com/`
    -   役割: 静的サイトをホストします。既存のCI/CDパイプラインは維持されます。

この記事が、同様の構成を検討している方の参考になれば幸いです。

<!-- truncate -->

#### 参考文献

今回の実装にあたり、以下のドキュメントを参考にしました。

-   [Decap CMS | Git Gateway Backend](https://decapcms.org/docs/git-gateway-backend/)
-   [Decap CMS | Docusaurus Integration](https://decapcms.org/docs/docusaurus/)
-   [Netlify Docs](https://docs.netlify.com/)
-   [Netlify Docs | Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/)
-   [Netlify Docs | Auth0 Setup Guide](https://docs.netlify.com/extend/install-and-use/setup-guides/auth0/)


### **1. アーキテクチャ選定の背景**

最終的なハイブリッド構成に至るまでには、いくつかの技術的な検討と試行錯誤がありました。

#### Auth0連携案の断念

当初、認証プロバイダとしてAuth0の利用を検討しました。しかし、OAuth 2.0の認可フローを安全に実装するには、サーバーサイドで動作する認証プロキシが別途必要になることが分かりました。

Netlifyホスティングではこのプロキシ機能が内部的に提供されていますが、Google Cloud Run環境では自前で構築・運用する必要があり、構成が複雑化してしまいます。プロジェクトのシンプルさを維持するため、この案は見送ることにしました。

#### GitHub連携におけるリダイレクト問題

次に、サーバーサイドが不要なImplicit Grant方式でのGitHub連携を試みました。しかし、設定ファイル (`config.yml`) でGitHubを指定したにもかかわらず、ログイン時にNetlifyの認証画面 (`https://api.netlify.com/auth`) へ強制的にリダイレクトされる問題が発生しました。

調査の結果、Decap CMSがNetlifyのドメイン (`.netlify.app`) 上で動作していることを検知すると、設定ファイルの内容よりもNetlify Identityを優先して使用する仕様であることが原因でした。

#### ハイブリッド構成の決定

この仕様を問題ではなく、利点として活用する方針に転換しました。Netlifyが提供する堅牢な認証基盤 (Netlify Identity) を無償で利用でき、当初の課題であった認証部分をスマートに解決できるためです。CMS管理機能のみをNetlifyに担当させるハイブリッド構成を最終的に採用しました。

---

### **2. 具体的な実装手順**

ここからは、最終的に採用したハイブリッド構成を実現するための具体的な設定手順を解説します。

#### 手順 1: Netlify側の設定

1.  **Identityの有効化**: Netlifyプロジェクトの `Identity` タブを開き、`Enable Identity` をクリックします。
2.  **認証プロバイダーの設定**: `Identity` > `Authentication providers` で `GitHub` を有効化します。
3.  **Git Gatewayの有効化**: `Identity` > `Services` で `Enable Git Gateway` をクリックします。これがリポジトリと連携する上で重要になります。
4.  **管理者ユーザーの招待**: `Identity` タブの `Invite users` から、ご自身のGitHubアカウントに紐づくメールアドレス宛に招待を送信し、承諾します。
5.  **カスタムドメインの削除**: `Domain management` を開き、このNetlifyプロジェクトで直接ホストしないカスタムドメインが登録されている場合は、すべて削除します。

#### 手順 2: リポジトリ側の設定

1.  **ディレクトリとファイルの作成**: プロジェクトのルートで以下のコマンドを実行し、CMS用のディレクトリとファイルを作成します。
    ```bash
    mkdir -p static/admin
    touch static/admin/index.html static/admin/config.yml
    ```

2.  **`static/admin/index.html` の設定**: このファイルは、Decap CMS管理画面のエントリーポイントです。以下の2つのスクリプト読み込みがシステムの核となります。
    -   `netlify-identity-widget.js`: Netlifyの認証機能を有効にするスクリプトです。
    -   `decap-cms.js`: Decap CMS本体を読み込み、管理画面のUIを構築します。

    以下の内容を `static/admin/index.html` に記述します。

    ```html
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes" />
      <title>Content Manager</title>
      <style>
        @media (max-width:799px){ body { padding: 0 !important; } .app-header { display: none !important; } .css-1hvr85l-App-Styles-AppMainView-AppMainView { padding: 0 10px !important; } }
        body { margin: 0; padding: 0 15px; background-color: #f9f9f9; }
      </style>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </head>
    <body>
      <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
      <script>
        (function() {
          function preventPullToRefresh() {
            let startY = 0;
            document.body.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
            document.body.addEventListener('touchmove', (e) => {
              const y = e.touches[0].clientY;
              if (document.scrollingElement.scrollTop === 0 && y > startY && document.body.scrollHeight === document.body.clientHeight) {
                e.preventDefault();
              }
            }, { passive: false });
          }
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("logout", () => { document.location.href = "/admin/"; });
          }
          window.addEventListener('load', preventPullToRefresh);
        })();
      </script>
    </body>
    </html>
    ```

3.  **`static/admin/config.yml` の設定**: このファイルは、Decap CMSの動作を定義する最も重要な設定ファイルです。「何を」「どこに」「どのように」保存するかを指定します。
    -   `backend`: 認証方式とリポジトリの接続情報を定義します。今回の構成の核となる `git-gateway` 方式や、保存先のブランチを指定します。
    -   `media_folder`: 画像などのメディアファイルをアップロードするリポジトリ内のパスです。
    -   `collections`: 管理するコンテンツの集合（記事のタイプなど）を定義します。
        -   `folder`: 記事ファイルが保存されるディレクトリです。
        -   `fields`: CMSの編集画面に表示される入力フォーム（タイトル、本文、タグなど）を定義する、最も重要な部分です。

    以下の内容を `static/admin/config.yml` に記述します。

    ```yaml
    backend:
      name: git-gateway
      branch: main
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'
        update: 'docs(diary): revise entry "{{slug}}"'
        delete: 'docs(diary): remove entry "{{slug}}"'
        uploadMedia: 'docs(assets): add media "{{path}}"'
        deleteMedia: 'docs(assets): remove media "{{path}}"'

    media_folder: "static/img/uploads/diary"
    public_folder: "/img/uploads/diary"

    collections:
      - name: "diary"
        label: "Diary"
        folder: "diary"
        create: true
        slug: "{{year}}-{{month}}-{{day}}"
        editor:
          preview: true
        fields:
          - { label: "タイトル", name: "title", widget: "string" }
          - { label: "Authors", name: "authors", widget: "hidden", default: ["hk"] }
          - { label: "目次を非表示", name: "hide_table_of_contents", widget: "boolean", default: false }
          - { label: "タグ", name: "tags", widget: "list", default: [] }
          - { label: "本文", name: "body", widget: "markdown" }
    ```

#### 手順 3: デプロイと利用開始

1.  上記で作成・編集したファイルをGitリポジトリにコミットし、プッシュします。
2.  Netlify側で自動的にデプロイが開始されます。
3.  デプロイ完了後、ブラウザでCMS管理画面にアクセスします。
    `https://[あなたのサイト名].netlify.app/admin/`

    *注意: 設定変更後は、ブラウザのキャッシュが原因で正しく表示されない場合があります。スーパーリロード (`Cmd/Ctrl + Shift + R`) を試してください。*

---

### **3. 実装時のトラブルシューティング**

最後に、今回の実装プロセスで実際に直面した問題と、その解決策を備忘録としてまとめます。

#### 問題 1: 画面が空白になる (`appendChild` エラー)

-   **現象**: CMS管理画面 (`/admin/`) にアクセスすると画面が真っ白になり、コンソールに `Uncaught TypeError: Cannot read properties of null (reading 'appendChild')` が表示されました。
-   **原因**: JavaScriptがDOMを描画しようとした時点で、描画先の `<body>` 要素がまだ構築されていなかったためです。
-   **対策**: `static/admin/index.html` 内の `<script>` タグを、`<head>` から `<body>` タグの閉じタグ直前に移動しました。

    ```html title="static/admin/index.html の修正例"
    <!-- 修正前 -->
    <head>
      ...
      <script src=".../decap-cms.js"></script>
    </head>
    <body>
    </body>

    <!-- 修正後 -->
    <head>
      ...
    </head>
    <body>
      <!-- scriptタグをbodyの末尾に移動 -->
      <script src=".../decap-cms.js"></script>
    </body>
    </html>
    ```

#### 問題 2: 意図しないEmail/Passwordフォームが表示される

-   **現象**: 期待していた `Login with GitHub` ボタンではなく、Netlify Identity標準のEmail/Password入力フォームが表示されました。
-   **原因**: Netlify Identityは有効でしたが、GitHubリポジトリと連携するための `Git Gateway` サービスが有効化されていませんでした。
-   **対策**: Netlifyの管理画面で `Identity` > `Services` を開き、`Enable Git Gateway` をクリックしました。

#### 問題 3: 認証後に意図しないドメインへリダイレクトされる

-   **現象**: GitHubでの認証後、CMS管理画面 (`netlify.app`) に戻らず、公開サイトのドメイン (`https://[your-custom-domain].com/...`) にリダイレクトされました。
-   **原因**: Netlify Identityは、認証後のリダイレクト先として `Domain management` で設定されたプライマリドメインを最優先します。ここに公開サイトのドメインが設定されていたためでした。
-   **対策**: Netlifyプロジェクトの `Domain management` 設定から、このプロジェクトで直接ホストしないカスタムドメインの設定を完全に削除しました。

#### 問題 4: 保存時に `reference does not exist` エラーが発生する

-   **現象**: CMSでコンテンツを保存しようとすると、`Failed to persist entry: API_Error: reference does not exist` というエラーが表示されました。
-   **原因**: リポジトリのデフォルトブランチが `main` であるのに対し、Decap CMSが古いデフォルト名である `master` ブランチに書き込もうとしていたためです。
-   **対策**: `static/admin/config.yml` の `backend` セクションに `branch: main` を明記し、保存先のブランチを固定しました。

    ```yaml title="static/admin/config.yml の修正例"
    backend:
      name: git-gateway
      # この行を追記して、リポジトリのデフォルトブランチに合わせる
      branch: main
    ```

#### 問題 5: カスタムコミットメッセージが反映されない

-   **現象**: `config.yml` で `commit_messages` を設定しても反映されず、デフォルトのコミットメッセージが使用されました。
-   **原因**: 古い `summary` 設定と新しい `commit_messages` 設定がファイル内に共存していました。Decap CMSは設定が競合すると、安全のために両方を無視する仕様でした。
-   **対策**: ファイルから古い `summary` の記述を完全に削除し、`commit_messages` に設定を一本化しました。

    ```yaml title="static/admin/config.yml の修正例"
    # 修正前: 古い設定(summary)が残っている
    backend:
      name: git-gateway
      branch: main
      summary: "{{filename}}" # <- この古い設定が原因で commit_messages が無視される
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'

    # 修正後: 古い設定を削除
    backend:
      name: git-gateway
      branch: main
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'
    ```

import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />
