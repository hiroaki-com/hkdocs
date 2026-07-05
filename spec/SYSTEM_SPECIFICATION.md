HkDocsの仕様書 (2026/07/05 版)
===============================


I. 基本情報
-----------
  1. プロジェクト名: hkdocs
  2. ドメイン: `hkdocs.com`
  3. プロジェクト目的: 技術ブログ、学習記録(Docs)、日記(Diary)、
     ニュース・資料集などのリンク集、およびブラウザ完結型ユーティリティ
     (ブラウザメモ・ダーツ計算アプリ)を集約した、個人用ナレッジベース兼
     ツールサイトの構築と公開。
  4. プロジェクトオーナー: hiroaki-com
  5. 公開サイトURL: https://hkdocs.com/
  6. ソースコードリポジトリ: https://github.com/hiroaki-com/hkdocs


II. 使用技術スタック
-------------------
  * フレームワーク: Docusaurus `v3.8.0`
    - テーマ: `@docusaurus/preset-classic`
    - 図表: `@docusaurus/theme-mermaid` (Mermaidダイアグラム)
    - 前方互換: `future.v4` を有効化し、Docusaurus v4 への移行に備える。
  * 言語: TypeScript `~5.6.2`
  * UIライブラリ: React `v19.0.0`
  * 主要ライブラリ:
    - 数式表示: `remark-math` / `rehype-katex` (KaTeXスタイルシートをCDNから読込)
    - Markdown拡張: `remark-gfm`, `react-markdown` (ブラウザメモのプレビュー用)
    - URL共有・圧縮: `lz-string` (ブラウザメモの状態をURLへ格納・復元)
    - SNS共有: `react-share`
    - アイコン: `lucide-react`
    - スタイル: `github-markdown-css`, `clsx`
    - シンタックスハイライト: `prism-react-renderer`
  * Node.js: `v22.22.2` (`.nvmrc` ファイルでバージョンを規定)
  * パッケージマネージャ: pnpm `v10.11.0` (Corepack経由で管理)
  * コンテナ化: Docker, Docker Compose
  * ソースコード管理: GitHub
  * ホスティング (Google Cloud)
    - アプリケーション実行環境: Cloud Run
    - コンテナイメージリポジトリ: Artifact Registry
  * CI/CD: GitHub Actions
    - GCP認証: Workload Identity Federation を使用
  * 検索: Algolia DocSearch (ロケール別のコンテキスト検索)
  * コンテンツ管理 (CMS): Decap CMS (旧 Netlify CMS)
  * アクセス解析: Google Analytics (GA4, `gtag` 経由)
  * SNS連携: X (旧 Twitter) API v2 (`twitter-api-v2`, 新規記事の自動投稿用)
  * ビルド補助:
    - `gray-matter` (フロントマター解析)
    - 独自スクリプト `scripts/generate-video-showcase.js`
      (動画ショーケースのデータ生成; prebuild/prestart フック)
  * 開発環境管理:
    - Docker Compose (推奨)
    - nvm (代替)


III. システムアーキテクチャ
-------------------------
  本システムは静的サイトジェネレータ (Docusaurus / SSG) で全ページを事前生成し、
  Dockerコンテナ内の静的ファイルサーバ (`http-server`) で配信する構成である。
  処理の起点は、開発者によるGitHubへのコードプッシュ、または管理者によるCMS経由での
  コンテンツ更新である。`develop`ブランチではGitHub ActionsがCI (型チェック＋ビルド検証)
  を実行し、`main`ブランチへのマージ (Push) を契機に、Dockerイメージのビルド、
  Artifact Registryへのプッシュ、Cloud Runへのデプロイを自動実行して本番環境を更新する。
  エンドユーザーはCloud Run上で稼働するサイトにアクセスし、Algoliaによる高速な
  全文検索機能を利用できる。SEO向けに各ページはSSR時にメタ情報・構造化データ (JSON-LD)
  を出力し、サイトマップとrobots.txtでクロール対象を最適化する。


IV. 構成詳細: ソースコード管理 (GitHub)
----------------------------------------
  * 目的:
    ソースコードのバージョン管理とCI/CDのトリガー。個人開発でありながら、
    将来的なチーム開発への移行を見据えた学習目的から、Git Flowの思想を
    シンプルに適用したブランチ戦略を採用する。これにより、厳格なプロジェクト管理を
    想定した実務的な開発フローに慣れることを目指す。

  * ブランチ戦略:
    - `main`: 本番環境にデプロイされる安定版ブランチ。直接のコミットは原則禁止し、
      `develop`ブランチからのPull Request経由でのみ更新される。
      ただし、Decap CMSによる日記コンテンツの更新はこのブランチに直接コミットされる。
    - `develop`: 開発内容を統合するブランチ。CIによるビルド検証の対象となる。
      フィーチャーブランチでの開発が完了次第、このブランチにマージされる。
    - フィーチャーブランチ (`feat/*`, `fix/*`等): 個別の機能開発やバグ修正を行う
      作業ブランチ。`develop`ブランチから作成し、作業完了後に`develop`への
      Pull Requestを作成する。

  * コミットメッセージ:
    変更内容の可読性を高め、履歴の追跡を容易にするため、コミットメッセージは
    [Conventional Commits](https://www.conventionalcommits.org/ja/v1.0.0/)の
    規約を参考とする。CMS経由のコミットは、設定ファイル (`static/admin/config.yml`) に
    基づき、`docs(diary): add new entry "..."` のような自動生成されたメッセージが
    使用される。

  * Pull Request (PR) 運用:
    - `develop`へのマージ: フィーチャーブランチから`develop`へのPull Requestを作成。
      コードレビューとCIの成功を必須とする。
    - `main`へのマージ: `develop`ブランチでの検証後、`develop`から`main`への
      Pull Requestを作成。リリース前の最終確認を行う。

  * 自動化 (GitHub Actions):
    - CIワークフロー (`ci.yml`): `develop`へのPush、および`develop`をターゲットとする
      Pull Request時に実行。型チェック (`pnpm typecheck`) とビルド検証
      (`pnpm build --no-minify`) を行う。Docusaurusのビルドキャッシュを利用して高速化する。
    - CDワークフロー (`deploy_hkdocs_to_cloud_run.yml`): `main`ブランチへのPushを
      トリガーに実行し、本番環境のCloud Runへデプロイする。
      (現状、`develop`向けの専用ステージング環境へのデプロイは構成しておらず、
       CIのビルド検証とローカルのDocker環境がその役割を担う。)
    - X自動投稿ワークフロー (`post-to-x.yml`): `main`への`blog/`・`docs/`配下の
      記事Push (`diary/`は除外) をトリガーに実行。本番デプロイの完了を待機した後、
      新規記事の情報をXへ自動投稿する (`.github/scripts/post-new-articles.js`)。
    - X投稿テストワークフロー (`post-to-x-test.yml`): 手動実行 (`workflow_dispatch`) により、
      任意URLを用いたX APIの疎通確認・ソーシャルカード表示テストを行う
      (`.github/scripts/test-post-to-x.js`)。


V. 構成詳細: コンテナ化 (Docker)
--------------------------------
  * 目的:
    開発環境と本番環境の一貫性を担保し、ポータビリティを向上させる。

  * `Dockerfile` (本番用):
    - マルチステージビルドを採用し、最終的なイメージサイズを削減。
      - `builder` ステージ: `node:22.22.2-alpine`をベースに、Corepackで有効化した
        pnpmで`pnpm install --frozen-lockfile`により依存関係をインストールし、
        `pnpm build`でサイトをビルド。`pnpm prune --prod`で本番に不要なパッケージを削除。
      - 最終ステージ: `node:22.22.2-alpine`をベースに、`builder`ステージから
        ビルド成果物 (`build`ディレクトリ)、本番用の`node_modules`、`package.json`のみを
        コピー。
    - セキュリティ: 非rootユーザー (`node`)でアプリケーションを実行。
    - ヘルスチェック: Dockerfileに明示的な`HEALTHCHECK`命令は設けず、Cloud Run側の
      標準ヘルスチェック (8080番ポートへの起動プローブ) に委ねる。
    - 起動コマンド: `CMD ["pnpm", "run", "serve"]` を使用
      (`package.json`の`"serve": "http-server ./build --single"`を実行し、8080番で待受)。

  * `docker-compose.yml` (ローカル開発用):
    - `README.md`で推奨されている開発手法。
    - `Dockerfile.dev` を使用し、開発に特化したコンテナを起動。
    - ソースコードをボリュームマウント (`.:/app:cached`) することで、ホットリロードを実現。
    - ポートマッピング: `3000:3000`

  * `.dockerignore`:
    `node_modules`, `.git`, `.docusaurus`など、ビルドコンテキストに不要なファイルと
    ディレクトリを除外し、ビルド速度を向上させる。
    (`.git`を除外するため、本番ビルドではGit履歴由来の更新日時は利用できない。
     Docsの更新日時は必要に応じてフロントマターの`last_update`で手動管理する。)


VI. 構成詳細: Google Cloud (GCP)
--------------------------------
  * 目的:
    アプリケーションのスケーラブルなホスティングと、コンテナイメージのセキュアな管理。
    リージョンは `asia-northeast1` (東京) を使用する。

  * Artifact Registry:
    - 目的: CI/CDパイプラインでビルドされたDockerイメージを一元的に保管・管理する。
    - リポジトリ名: `hkdocs-images` (イメージ名: `hkdocs-app`)
    - クリーンアップポリシー (コスト節約):
      設定内容: 以下の2つのポリシーを組み合わせて実現する（保持ポリシーが優先される）。
      1. 削除ポリシー: すべてのイメージを削除対象とする。
         - ポリシータイプ: `条件付き削除 (Conditional deletion)`
         - 条件（タグの状態）: `任意のタグの状態 (Any tag state)`
      2. 保持ポリシー: 最新の10バージョンを削除対象から除外する。
         - ポリシータイプ: `最新バージョンを保持 (Keep most recent versions)`
         - 保持する数: `10`

  * Cloud Run:
    - 目的: Dockerコンテナ化されたDocusaurusアプリケーションをサーバーレスで実行・公開する。
    - 設定:
      - サービス名: `hkdocs-service` (本番環境; 単一サービス構成)
      - デプロイ元: Artifact Registry上の、Gitコミットハッシュ (短縮SHA) でタグ付けされた
        イメージを指定。
      - スケーリング: 最小インスタンス数を0に設定し、リクエストがない時間帯の
        コストを削減。
      - ポート: コンテナが公開する `8080`番ポートを指定。
      - 認証: 「未認証の呼び出しを許可」し、一般公開。


VII. サイト構成 (コンテンツ) - Docusaurus
----------------------------------------
  * ホームページ (`src/pages/index.tsx`):
    サイトの入り口として、主要コンテンツへの導線を配置。`HomepageFeatures`と、
    ブログ/Docsのフロントマターから自動生成した動画作品一覧 (`VideoShowcase`) を表示する。
  * 技術メモ (Docs): `docs/`ディレクトリに格納。
    - `intro.md`: Techセクションの概要。
    - `tech/`: 技術知識や備忘録 (`docusaurus`, `google-colab`, `google-docs` 等のカテゴリ)。
    - `exams/`: GCP認定資格 (Professional系) の学習記録およびケーススタディ。
    - 更新日時 (`showLastUpdateTime`) はフロントマターの`last_update`で管理する。
  * ブログ (Blog): `blog/`ディレクトリに格納。
    技術的な考察や開発ログ、ツールのリリース告知などを時系列で投稿する。RSS/Atomフィードを出力。
  * 日記 (Diary): `diary/`ディレクトリに格納 (2つ目のブログとして定義)。
    個人的な日々の記録のための独立したブログとして機能する。
    Decap CMSと連携しており、Web上の管理画面 (`/admin/`) からコンテンツの作成・更新が可能。
  * カスタムページ (`src/pages/`):
    - ニュース (`news.tsx`): 国内外の主要ニュースサイトへのリンクをカテゴリ別にまとめたページ。
    - 資料集 (`links.tsx`): 技術ドキュメント等の外部リンクをカテゴリ別に整理した一覧ページ
      (CSVエクスポート対応)。
    - AIツール集 (`ai-tools.tsx`): 生成AIツール等を用途別に整理した一覧ページ
      (CSVエクスポート対応)。
    - ブラウザメモ (`browser-memo.tsx`): ブラウザ完結型のメモ機能。Markdown/Mermaidの
      プレビューと、`lz-string`によるURL共有 (状態のURL格納) に対応。
    - ダーツ計算アプリ (`darts/`): インストール不要のブラウザ完結型スコア計算ツール。
      01 (ゼロワン)・クリケット・カウントアップの3種を提供し、`SoftwareApplication`の
      構造化データ (JSON-LD) を付与する。
    - プロフィール (`profile.mdx`): 自己紹介ページ。
    - 法務ページ (`legal/`): プライバシーポリシー (`privacy-policy.mdx`) と
      特定商取引法に基づく表記 (`tokusho.mdx`, 日本語のみ)。
  * 共通コンポーネント (`src/components/`):
    - `ShareButtons` (SNS共有), `GitHubStarLink` / `SupportButton` (スター・支援導線),
      `LinksCard` / `SectionHeading` (リンク一覧の共通UI), `HomepageFeatures`,
      `VideoShowcase` など。
    - `src/lib/csv.ts`: 資料集・AIツール集のCSVエクスポート用ユーティリティ。
  * 多言語対応 (i18n): `i18n/en`ディレクトリで管理。
    日本語(デフォルト)と英語に対応し、UIテキストと各コンテンツの翻訳ファイルを提供する。
    アナウンスバーやフッターの法務リンク等、ロケールに応じた出し分けも行う。
  * SEO / 構造化データ:
    - 各ページはSSRでメタ情報とJSON-LD構造化データを出力する
      (URLはロケール別ビルドの`baseUrl`を基準に生成し、ロケール接頭辞の二重付与を避ける)。
    - サイトマップ: `lastmod`を付与し、薄いページ (タグ/著者/ページネーション/検索) と
      検索対象外の日記を`ignorePatterns`で除外。ロケール別に出力される。
    - `static/robots.txt`: `/admin/`・`/diary/` (ja/en) を`Disallow`とし、
      ロケール別サイトマップを明示する。


VIII. システムフロー
------------------
  1. ローカル開発:
     - 開発者は`develop`ブランチからフィーチャーブランチを作成する。
     - `docker-compose up --build` を実行してローカル開発環境を起動する。
     - ソースコードを編集し、`http://localhost:3000`で変更を確認する。
     - 開発完了後、変更をコミットし、`develop`ブランチへのPull Requestを作成する。

  2. CI/CD (自動デプロイ):
     - `develop`へのPush/PR時に、型チェックとビルド検証が自動的に実行される。
     - `develop`から`main`へのPull Requestを作成する（手動）。
     - PRが`main`にマージされると、ビルド時に動画ショーケースデータが再生成された上で
       Dockerイメージがビルドされ、本番環境へのデプロイが自動的に実行される。
     - 本番デプロイ完了後、新規記事があればその情報がXに自動投稿される。

  3. 手動デプロイ:
     - 必要に応じて、ローカル環境から `./deploy.sh` スクリプトを実行することで、
       手動でのビルド (linux/amd64)、プッシュ、本番デプロイが可能。

  4. ユーザーアクセス:
     - ユーザーは `https://hkdocs.com/` にアクセスし、リクエストはCloud Runによって
       処理される。
     - サイト内検索フォームでAlgoliaを利用し、コンテンツを高速に検索できる。
     - 言語スイッチャーで日本語と英語の表示を切り替えられる。

  5. CMS経由での日記更新:
     - 管理者は `/admin/` にアクセスし、認証を行う。
     - Decap CMSのUIを通じて日記記事を作成・編集・保存する。
     - 保存操作により、`main`ブランチに直接変更がコミットされる。
     - `main`ブランチへのコミットがトリガーとなり、本番環境への自動デプロイが実行される。


IX. セキュリティと運用
--------------------
  * アクセス管理:
    `main`および`develop`ブランチに保護ルールを設定し、Pull RequestとCIのパスを
    マージの必須条件とする。
  * 依存関係脆弱性管理:
    Dependabotを有効化し、依存関係の更新を自動化。CIでの脆弱性スキャンも検討する。
  * インフラセキュリティ:
    - GCP認証にはWorkload Identity Federationを使用し、サービスアカウントキーの
      漏洩リスクを排除する。
    - GCPリソースへのアクセス権限はIAMで最小権限の原則を適用する。
    - 機密情報 (APIキー等) はGitHub Secretsに保管し、ワークフロー内で安全に利用する。
  * SEO / クロール管理:
    - `robots.txt`とロケール別サイトマップでクロール対象を制御する。
    - 構造化データ (JSON-LD) と正規化されたロケール別URLで検索エンジンの解釈を補助する。
  * 監視とコスト管理:
    - Cloud LoggingとCloud MonitoringでCloud Runのパフォーマンスとログを監視する。
    - Google Analytics (GA4) でユーザーのアクセス動向を分析する。
    - Cloud Runの最小インスタンス数0、Artifact Registryのクリーンアップポリシー等を
      活用し、継続的なコスト最適化を行う。
