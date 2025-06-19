# HkDocs

[![Build Status](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml/badge.svg)](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-v3.8.0-blue?logo=docusaurus)](https://docusaurus.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-green?logo=nodedotjs)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-v10.11.0-orange?logo=pnpm)](https://pnpm.io/)
[![Code License: MIT](https://img.shields.io/badge/Code%20License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)
[![GitHub](https://img.shields.io/badge/GitHub-hiroaki--com/hkdocs-blue?logo=github)](https://github.com/hiroaki-com/hkdocs)
[![𝕏 (Twitter)](https://img.shields.io/badge/Follow-%40hkdocs-1DA1F2?logo=x)](https://x.com/hkdocs)

HkDocsは、個人の技術ブログ、ドキュメント、日記などを集約したナレッジベースサイトです。
[Docusaurus](https://docusaurus.io/) を使用して構築されており、[hkdocs.com](https://hkdocs.com/) で公開しています。サイト全体が日本語と英語に対応しています。

[README.en (English)](./README.en.md)

## 📚 主なコンテンツ

*   **Blog**: 技術的な知見や開発ログ。
*   **Docs**: 特定技術のドキュメント、試験対策ノート。
*   **Diary**: 日々の記録や体調ログ。
*   **Browser Memo**: ブラウザ上で動作するシンプルなメモ機能。

## 🛠️ 技術スタック

*   **Framework**: [Docusaurus](https://docusaurus.io/) v3.8.0
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://reactjs.org/) v19
*   **Package Manager**: [pnpm](https://pnpm.io/) v10.11.0 (Corepack経由)
*   **Internationalization (i18n)**: [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction)
*   **Container**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
*   **Hosting**: [Google Cloud Run](https://cloud.google.com/run)
*   **CI/CD**: [GitHub Actions](https://github.com/features/actions)
*   **Search**: [Algolia DocSearch](https://docsearch.algolia.com/)

## 🚀 セットアップと開発

ローカル開発環境のセットアップは、Docker Compose (推奨) またはローカル直接インストールのいずれかを選択できます。

### 共通の準備

1.  リポジトリをクローンします。
    ```bash
    git clone https://github.com/hiroaki-com/hkdocs.git
    cd hkdocs
    ```

---

### 方法1: Docker Compose (推奨)

Dockerを使用して隔離された開発環境を構築します。

**前提条件**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) がインストールされ、実行中であること。

**手順**

1.  **開発サーバーの起動**

    デフォルトの言語（日本語）で開発サーバーを起動します。
    ```bash
    # 初回、またはDockerfile.dev等に変更があった場合
    docker-compose up --build

    # 2回目以降
    docker-compose up
    ```
    開発サーバーは `http://localhost:3000` でアクセスできます。

2.  **i18n開発 (言語指定)**

    特定の言語で開発サーバーを起動する場合は、以下のコマンドを使用します。

    *   **英語サイトで開発する場合**
        ```bash
        docker-compose run --rm --service-ports app pnpm start --locale en
        ```
    *   **日本語サイトで開発する場合**
        ```bash
        docker-compose run --rm --service-ports app pnpm start --locale ja
        ```

3.  **停止**

    `docker-compose up`で起動した場合は`Ctrl+C`で停止後、以下を実行します。
    ```bash
    docker-compose down
    ```

---

### 方法2: ローカル環境

Node.jsとpnpmを直接マシンにインストールして開発します。

**前提条件**
*   [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#install--update-script)
*   Node.js v22.16.0 (`.nvmrc`参照)
*   pnpm v10.11.0 (`package.json`の`packageManager`参照)

**手順**
1.  **環境設定**
    ```bash
    # 1. プロジェクトで指定されたNode.jsバージョンを使用
    nvm use

    # 2. Corepackを有効化 (pnpmのバージョンを管理)
    corepack enable pnpm

    # 3. 依存関係をインストール
    pnpm install --frozen-lockfile
    ```

2.  **開発サーバーの起動**
    *   **デフォルト言語（日本語）で起動**
        ```bash
        pnpm start
        ```
    *   **英語で起動**
        ```bash
        pnpm start --locale en
        ```
    開発サーバーは `http://localhost:3000` でアクセスできます。停止は `Ctrl+C` です。


## 📦 ビルドとプレビュー

### ビルド

全言語の静的コンテンツを `build` ディレクトリに生成します。

*   **Docker Compose の場合**
    ```bash
    # `app` は docker-compose.yml で定義されたサービス名
    docker-compose run --rm app pnpm build
    ```
*   **ローカル環境の場合**
    ```bash
    pnpm build
    ```

### プレビュー

ビルドされたサイトを本番に近い環境で確認します。

*   **Docker Compose の場合**

    `docker-compose.yml` で公開しているポート `3000` を指定してプレビューサーバーを起動します。
    ```bash
    docker-compose run --rm --service-ports app pnpm serve -- --port 3000 --host 0.0.0.0
    ```
    サーバーは `http://localhost:3000` でアクセスできます。

*   **ローカル環境の場合**

    `http-server` を使ってプレビューします。デフォルトでは `http://localhost:8080` で起動します。
    ```bash
    pnpm serve
    ```
    ポートを変更したい場合は、引数で指定できます。
    ```bash
    # 例: 3000番ポートで起動
    pnpm serve -- --port 3000
    ```

## ☁️ デプロイ

*   **自動デプロイ**: `main`ブランチへのプッシュをトリガーに、GitHub Actions (`.github/workflows/deploy_hkdocs_to_cloud_run.yml`) がビルドとGoogle Cloud Runへのデプロイを自動的に行います。
*   **手動デプロイ**: `deploy.sh`スクリプトを使用してもデプロイ可能です。詳細はスクリプト内のコメントを参照してください。
    ```bash
    ./deploy.sh
    ```

## ✨ 自動化タスク

*   **X (旧Twitter) への自動投稿**: 新規ブログ記事が `main`ブランチにマージされると、GitHub Actions (`.github/workflows/post-to-x.yml`) が記事情報をXアカウント ([@hkdocs](https://x.com/hkdocs)) に投稿します。

## 📂 ディレクトリ構造の概要

```plaintext
.
├── .github/              # GitHub Actionsワークフローとスクリプト
├── blog/                 # ブログ記事 (日本語)
├── docs/                 # ドキュメント (技術ノート、試験情報など)
├── diary/                # 日記記事 (日本語)
├── i18n/                 # 国際化(i18n)ファイル (en: 英語翻訳)
├── src/                  # Docusaurusのカスタムコンポーネント、CSS、ページ
├── static/               # 静的アセット (画像など)
├── Dockerfile            # 本番環境用Dockerfile
├── Dockerfile.dev        # 開発環境用Dockerfile
├── LICENSE               # プロジェクトのライセンス
├── README.md             # このファイル (日本語)
├── README.en.md          # 英語版README
├── deploy.sh             # 手動デプロイスクリプト
├── docusaurus.config.ts  # Docusaurusサイト設定
├── docker-compose.yml    # Docker Compose設定
├── package.json          # 依存関係とスクリプト
├── pnpm-lock.yaml        # pnpmロックファイル
├── sidebars.ts           # ドキュメントのサイドバー設定
└── tsconfig.json         # TypeScript設定
```

## 📜 ライセンス

*   **コード**: [MIT License](./LICENSE)
*   **コンテンツ** (`blog/`, `diary/`, `docs/`, `i18n/` 配下): [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
