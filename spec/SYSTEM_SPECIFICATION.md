### HkDocsの仕様書 (2025/07/01 版)

I. 基本情報

1.  プロジェクト名: hkdocs
2.  ドメイン: `hkdocs.com`
3.  プロジェクト目的: 技術ブログ、学習記録(Docs)、日記(Diary)などを集約した個人用ナレッジベースの構築と公開。
4.  プロジェクトオーナー: hiroaki-com
5.  公開サイトURL: https://hkdocs.com/
6.  ソースコードリポジトリ: https://github.com/hiroaki-com/hkdocs

II. 使用技術スタック

*   フレームワーク: Docusaurus `v3.8.0`
    *   テーマ: `@docusaurus/preset-classic`
*   言語: TypeScript `~5.6.2`
*   UIライブラリ: React `v19.0.0`
*   Node.js: `v22.16.0` (`.nvmrc` ファイルでバージョンを規定)
*   パッケージマネージャ: pnpm `v10.11.0` (Corepack経由で管理)
*   コンテナ化: Docker, Docker Compose
*   ソースコード管理: GitHub
*   ホスティング (Google Cloud)
    *   アプリケーション実行環境: Cloud Run
    *   コンテナイメージリポジトリ: Artifact Registry
*   CI/CD: GitHub Actions
    *   GCP認証: Workload Identity Federation を使用
*   検索: Algolia DocSearch
*   アクセス解析: Google Analytics (GA4)
*   SNS連携: Twitter API v2 (新規記事の自動投稿用)
*   開発環境管理:
    *   Docker Compose (推奨)
    *   nvm (代替)

III. システムアーキテクチャ

本システムは、開発者によるGitHubへのコードプッシュを起点とする。GitHub Actionsがこれを検知し、プッシュされたブランチに応じてステージング環境または本番環境へ自動的にデプロイを実行する。このプロセスには、Dockerイメージのビルド、Artifact Registryへのプッシュ、Cloud Runへのデプロイが含まれる。エンドユーザーはCloud Run上で稼働するサイトにアクセスし、Algoliaによる高速な全文検索機能を利用できる。

IV. 構成詳細: ソースコード管理 (GitHub)

*   目的: ソースコードのバージョン管理とCI/CDのトリガー。個人開発でありながら、将来的なチーム開発への移行を見据えた学習目的から、Git Flowの思想をシンプルに適用したブランチ戦略を採用する。これにより、厳格なプロジェクト管理を想定した実務的な開発フローに慣れることを目指す。
*   ブランチ戦略:
    *   `main`: 本番環境にデプロイされる安定版ブランチ。直接のコミットは禁止し、`develop`ブランチからのPull Request経由でのみ更新される。
    *   `develop`: 開発内容を統合するブランチ。ステージング環境へのデプロイ対象となる。フィーチャーブランチでの開発が完了次第、このブランチにマージされる。
    *   フィーチャーブランチ (`feat/*`, `fix/*`等): 個別の機能開発やバグ修正を行う作業ブランチ。`develop`ブランチから作成し、作業完了後に`develop`へのPull Requestを作成する。
*   Pull Request (PR) 運用:
    *   `develop`へのマージ: フィーチャーブランチから`develop`へのPull Requestを作成。コードレビューとCIの成功を必須とする。
    *   `main`へのマージ: ステージング環境での検証後、`develop`ブランチから`main`へのPull Requestを作成。リリース前の最終確認を行う。
*   自動化 (GitHub Actions):
    *   CIワークフロー (`ci.yml`): `develop`をターゲットとするPull Request時に実行。ビルドテスト、型チェックを行う。
    *   CDワークフロー (`deploy_hkdocs_to_cloud_run.yml`): 特定ブランチへのPushをトリガーに実行。
        *   `main`ブランチ: 本番環境のCloud Runへデプロイ。
        *   `develop`ブランチ: ステージング環境のCloud Runへデプロイ。
    *   X自動投稿ワークフロー (`post-to-x.yml`): 本番デプロイの成功をトリガーに、新規記事の情報をXへ自動投稿する。

V. 構成詳細: コンテナ化 (Docker)

*   目的: 開発環境と本番環境の一貫性を担保し、ポータビリティを向上させる。
*   `Dockerfile` (本番用):
    *   マルチステージビルドを採用し、最終的なイメージサイズを削減。
        *   `builder` ステージ: `node:22.16.0-alpine`をベースに、`pnpm install`で依存関係をインストールし、`pnpm build`でサイトをビルド。`pnpm prune --prod`で本番に不要なパッケージを削除。
        *   最終ステージ: `node:22.16.0-alpine`をベースに、`builder`ステージからビルド成果物 (`build`ディレクトリ)と本番用の`node_modules`のみをコピー。
    *   セキュリティ: 非rootユーザー (`node`)でアプリケーションを実行。
    *   ヘルスチェック: `HEALTHCHECK`命令により、Cloud Runがコンテナの正常性を監視。
    *   起動コマンド: `CMD ["pnpm", "run", "serve"]` を使用 (`package.json`の`"serve": "http-server ./build --single"`を実行)。
*   `docker-compose.yml` (ローカル開発用):
    *   `README.md`で推奨されている開発手法。
    *   `Dockerfile.dev` を使用し、開発に特化したコンテナを起動。
    *   ソースコードをボリュームマウント (`.:/app:cached`) することで、ホットリロードを実現。
    *   ポートマッピング: `3000:3000`
*   `.dockerignore`: `node_modules`, `.git`, `.docusaurus`など、ビルドコンテキストに不要なファイルとディレクトリを除外し、ビルド速度を向上させる。

VI. 構成詳細: Google Cloud (GCP)

*   目的: アプリケーションのスケーラブルなホスティングと、コンテナイメージのセキュアな管理。
*   **Artifact Registry**:
    *   目的: CI/CDパイプラインでビルドされたDockerイメージを一元的に保管・管理する。
    *   リポジトリ名: `hkdocs-images`
    *   **クリーンアップポリシー (コスト節約)**:
        *   目的: CI/CDの実行ごとに蓄積される古いDockerイメージを自動的に削除し、ストレージコストを継続的に抑制する。
        *   方針: 安全性とコスト削減のバランスを考慮し、「**最新の10バージョンを常に保持し、それよりも古いイメージはすべて削除する**」
        *   設定内容: 以下の2つのポリシーを組み合わせて実現する（保持ポリシーが優先される）。
            1.  **削除ポリシー**: すべてのイメージを削除対象とする。
                *   ポリシータイプ: `条件付き削除 (Conditional deletion)`
                *   条件（タグの状態）: `任意のタグの状態 (Any tag state)`
            2.  **保持ポリシー**: 最新の10バージョンを削除対象から除外する。
                *   ポリシータイプ: `最新バージョンを保持 (Keep most recent versions)`
                *   保持する数: `10`
*   **Cloud Run**:
    *   目的: Dockerコンテナ化されたDocusaurusアプリケーションをサーバーレスで実行・公開する。
    *   設定:
        *   サービス名: `hkdocs-service` (本番用)、および`hkdocs-service-staging` (`develop`ブランチのデプロイ先として設定)
        *   デプロイ元: Artifact Registry上の、Gitコミットハッシュでタグ付けされたイメージを指定。
        *   スケーリング: 最小インスタンス数を0に設定し、リクエストがない時間帯のコストを削減。
        *   ポート: コンテナが公開する `8080`番ポートを指定。
        *   認証: 「未認証の呼び出しを許可」し、一般公開。

VII. サイト構成 (コンテンツ) - Docusaurus

*   ホームページ (`src/pages/index.tsx`): サイトの入り口として、主要コンテンツへの導線を配置。
*   技術メモ (Docs): `docs/`ディレクトリに格納。技術知識や資格試験の学習記録を体系的に整理する。
*   ブログ (Blog): `blog/`ディレクトリに格納。技術的な考察や開発ログなどを時系列で投稿する。
*   日記 (Diary): `diary/`ディレクトリに格納。個人的な日々の記録のための独立したブログとして機能する。
*   カスタムページ:
    *   ブラウザメモ (`src/pages/browser-memo.tsx`): ブラウザ完結型のシンプルなメモ機能ページ。
    *   プロフィール (`src/pages/profile.md`): 自己紹介ページ。
*   多言語対応 (i18n): `i18n/en`ディレクトリで管理。日本語(デフォルト)と英語に対応し、UIテキストと各コンテンツの翻訳ファイルを提供する。

VIII. システムフロー

1.  ローカル開発:
    *   開発者は`develop`ブランチからフィーチャーブランチを作成する。
    *   `docker-compose up --build` を実行してローカル開発環境を起動する。
    *   ソースコードを編集し、`http://localhost:3000`で変更を確認する。
    *   開発完了後、変更をコミットし、`develop`ブランチへのPull Requestを作成する。
2.  CI/CD (自動デプロイ):
    *   `develop`をターゲットとするPRが出されると、ビルドテストが自動的に実行される。
    *   `develop`から`main`へのPull Requestを作成する（手動）。
    *   PRが`main`にマージされると、本番環境へのデプロイが自動的に実行される。
    *   本番デプロイ完了後、新規記事があればその情報がXに自動投稿される。
3.  手動デプロイ:
    *   必要に応じて、ローカル環境から `./deploy.sh` スクリプトを実行することで、手動でのビルド、プッシュ、本番デプロイが可能。
4.  ユーザーアクセス:
    *   ユーザーは `https://hkdocs.com/` にアクセスし、リクエストはCloud Runによって処理される。
    *   サイト内検索フォームでAlgoliaを利用し、コンテンツを高速に検索できる。
    *   言語スイッチャーで日本語と英語の表示を切り替えられる。

IX. セキュリティと運用

*   アクセス管理: `main`および`develop`ブランチに保護ルールを設定し、Pull RequestとCIのパスをマージの必須条件とする。
*   依存関係脆弱性管理: Dependabotを有効化し、依存関係の更新を自動化。CIでの脆弱性スキャンも検討する。
*   インフラセキュリティ:
    *   GCP認証にはWorkload Identity Federationを使用し、サービスアカウントキーの漏洩リスクを排除する。
    *   GCPリソースへのアクセス権限はIAMで最小権限の原則を適用する。
    *   機密情報 (APIキー等) はGitHub Secretsに保管し、ワークフロー内で安全に利用する。
*   監視とコスト管理:
    *   Cloud LoggingとCloud MonitoringでCloud Runのパフォーマンスとログを監視する。
    *   Google Analyticsでユーザーのアクセス動向を分析する。
    *   Artifact Registryのクリーンアップポリシーなどを活用し、継続的なコスト最適化を行う。
