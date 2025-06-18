---
title: Docusaurusのi18n導入で発生したルーティングとデプロイの問題解決録
authors: [hk]
tags: [docusaurus, i18n, routing, deployment, docker, cloudrun]
---

この記事では、Docusaurus v3 で構築したサイトに国際化（i18n）機能を追加した際、直面した2つの厄介な問題、「**クライアントサイドのルーティング崩壊**」と「**Cloud Runでのコンテナ起動失敗**」について、その原因特定から解決までの道のりを記録したものです。

**前提環境:**

*   **サイトジェネレーター:** Docusaurus v3
*   **ホスティング:** Google Cloud Run
*   **開発・デプロイ:** Docker, GitHub Actions
*   **パッケージマネージャー:** pnpm

<!-- truncate -->

### 1. 発生した問題

i18n設定後、ローカルでの本番ビルド確認 (`pnpm build` + `pnpm serve`) およびCloud Runへのデプロイ後に、以下の2つの致命的な問題が立て続けに発生しました。

#### 問題1: クライアントサイドのルーティング崩壊

サイトにアクセスし、言語スイッチャーで言語を切り替えると、以下のような症状が現れました。

*   **URLの不正な累積**: 言語を切り替えるたびに、URLが `/en/en/en/...` のように、ロケールプレフィックスがどんどん追加されてしまう。
*   **React Hydrationエラー**: ブラウザのコンソールに `Warning: Expected server HTML to contain a matching ...` というエラーが大量発生。これはサーバーが生成したHTMLとクライアントのDOM構造が一致しないことを示す、SPAにおける深刻なエラーです。
*   **最終的に404**: 不正なURLにアクセスしようとした結果、サイトの404ページが表示されてしまいました。

#### 問題2: Cloud Runでのコンテナ起動失敗

問題1の対策を施して再度デプロイしたところ、今度はCloud Run上でコンテナ自体が起動しないという問題が発生しました。

*   **コンテナ起動タイムアウト**: Cloud Runのログに以下のエラーが記録されました。
    > The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable.

    これは、デプロイされたDockerコンテナが、Cloud Runが指定する8080番ポートでWebサーバーを正常に起動できなかったことを意味します。

### 2. 原因の特定と解決策

それぞれの問題を段階的に切り分け、原因を特定していきました。

#### 2.1. 問題1（ルーティング崩壊）の解決

*   **原因**:
    根本原因は、**ローカル確認用サーバーのSPA（シングルページアプリケーション）対応不足**でした。
    当時使用していた `serve` パッケージのデフォルト設定では、Docusaurusが生成する `/docs/intro/` のような「きれいなURL（Pretty URL）」を正しく処理できず、内部的に `.../index.html` へリクエストをフォールバックさせる機能が働いていませんでした。これにより、クライアントサイドのReact RouterがURLを解釈する前にサーバーが404を返してしまい、ルーティングシステム全体が崩壊していました。

*   **解決策**:
    ローカル確認用サーバーを、SPAモードを標準でサポートする `http-server` に変更しました。

    1.  **`http-server` を導入**
        ```bash
        # 開発用の依存関係としてインストール
        pnpm add -D http-server
        ```

    2.  **`package.json` の `serve` スクリプトを更新**
        `--single` オプションを付けて、解決できないパスへのリクエストをすべてルートの `index.html` にフォールバックさせるように設定しました。これにより、URLの解決がクライアントサイドのReact Routerに正しく委譲されるようになります。
        ```json:package.json
        "scripts": {
          "serve": "http-server ./build --single"
        }
        ```

#### 2.2. 問題2（コンテナ起動失敗）の解決

*   **原因**:
    皮肉なことに、問題1の対策として導入した `http-server` が、この問題の直接的な原因でした。根本は、**依存関係の不適切な分類**にありました。

    `http-server` を `devDependencies`（開発時依存）としてインストールしたため、本番用 `Dockerfile` 内で実行される `pnpm prune --prod` コマンドによって削除されてしまっていました。その結果、本番コンテナ内には `http-server` が存在せず、起動コマンド `pnpm run serve` を実行できずにコンテナが即座に終了していたのです。

*   **解決策**:
    `http-server` を `dependencies`（本番時依存）に移動させ、本番環境でも利用できるようにしました。

    1.  **依存関係の再分類**
        ```bash
        # devDependenciesから削除
        pnpm remove -D http-server
        # dependenciesとして再インストール
        pnpm add http-server
        ```
    2.  **不要なパッケージの削除**
        旧来の `serve` パッケージは不要になったため、プロジェクトから完全に削除しました。
        ```bash
        pnpm remove serve
        ```

これらの修正により、コンテナは正常にポート8080で起動し、Cloud Runのデプロイが成功裏に完了しました。

### 3. 改善後の開発・デプロイフロー

今回の経験を踏まえ、今後の開発プロセスを以下のように標準化しました。

#### 3.1. 開発時のコマンド

*   **日常の開発 (ホットリロード)**:
    ```bash
    # Docker環境
    docker-compose up
    # ローカル環境
    pnpm start
    ```
*   **特定言語での開発 (例: 英語)**:
    ```bash
    # Docker環境
    docker-compose run --rm --service-ports app pnpm start --locale en --host 0.0.0.0
    # ローカル環境
    pnpm start --locale en
    ```

#### 3.2. デプロイ前の最終確認

デプロイ前には、**必ず**以下のコマンドフローで本番と同一のビルド成果物を確認します。
```bash
# 1. 本番用の静的ファイルをビルド
pnpm build

# 2. SPA対応サーバーでビルド成果物を配信
pnpm serve
```

#### 3.3. コンテンツ管理

新規ページを追加する際は、その翻訳版も忘れずに `i18n/[locale]/...` ディレクトリ内の適切な場所に配置する運用を徹底します。翻訳版が存在しないページはその言語では404エラーになるため、コンテンツの同期が重要です。

### 4. まとめ

今回のトラブルは、ローカル開発サーバーの選定ミスと、Dockerビルドにおける依存関係の管理ミスが連鎖した複合的な問題でした。各レイヤーで段階的に原因を切り分け、適切なツールと設定を適用することで、i18n機能を安定して運用できる堅牢な開発・デプロイ基盤を再構築することができました。
