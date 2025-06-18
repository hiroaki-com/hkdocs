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
[Docusaurus](https://docusaurus.io/) を使用して構築されており、[hkdocs.com](https://hkdocs.com/) で公開しています。

[English Version (英語版)](./README.en.md)

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
*   **Container**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
*   **Hosting**: [Google Cloud Run](https://cloud.google.com/run)
*   **CI/CD**: [GitHub Actions](https://github.com/features/actions)
*   **Search**: [Algolia DocSearch](https://docsearch.algolia.com/)

## 🚀 セットアップと開発

ローカル開発環境のセットアップは、Docker Compose (推奨) またはローカル直接インストールのいずれかを選択できます。

### 共通

1.  リポジトリをクローン:
    ```bash
    git clone https://github.com/hiroaki-com/hkdocs.git
    cd hkdocs
    ```

### 方法1: Docker Compose (推奨)

Dockerを使用して隔離された開発環境を構築します。

**前提条件:**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) がインストールされ、実行中であること。

**手順:**
```bash
# イメージビルドと開発サーバー起動
docker-compose up --build

# 2回目以降 (Dockerfile.devやdocker-compose.ymlに変更がない場合)
docker-compose up
```
開発サーバーは `http://localhost:3000` でアクセスできます。

停止は `Ctrl+C` 後、以下を実行:
```bash
docker-compose down
```

### 方法2: ローカル環境

Node.jsとpnpmを直接マシンにインストールします。

**前提条件:**
*   [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#install--update-script)
*   Node.js v22.16.0 (プロジェクトルートの `.nvmrc` 参照)
*   pnpm v10.11.0 (`package.json` の `packageManager` 参照)

**手順:**
1.  Node.jsバージョンを設定:
    ```bash
    nvm use
    ```
2.  Corepackを有効化 (pnpm管理のため):
    ```bash
    corepack enable pnpm
    ```
3.  依存関係をインストール:
    ```bash
    pnpm install --frozen-lockfile
    ```
4.  開発サーバーを起動:
    ```bash
    pnpm start
    ```
    開発サーバーは `http://localhost:3000` でアクセスできます。停止は `Ctrl+C`。

## 📦 ビルド

静的コンテンツを `build` ディレクトリに生成します。

*   **Docker Compose の場合:**
    ```bash
    docker-compose exec app pnpm build
    ```
*   **ローカル環境の場合:**
    ```bash
    pnpm build
    ```

## ☁️ デプロイ

*   **自動デプロイ**: `main`ブランチへのプッシュをトリガーに、GitHub Actions (`.github/workflows/deploy_hkdocs_to_cloud_run.yml`)がGoogle Cloud Runへ自動デプロイします。
*   **手動デプロイ**: `deploy.sh`スクリプトを使用してもデプロイ可能です。詳細はスクリプト内のコメントを参照してください。
    ```bash
    ./deploy.sh
    ```

## ✨ 自動化タスク

*   **X (旧Twitter) への自動投稿**: 新規ブログ記事が `main`ブランチにマージされると、GitHub Actions (`.github/workflows/post-to-x.yml`) が記事情報をXアカウント ([@hkdocs](https://x.com/hkdocs)) に投稿します。

## 📂 ディレクトリ構造の概要

```
.
├── .github/            # GitHub Actionsワークフローとスクリプト
├── blog/               # ブログ記事
├── diary/              # 日記記事
├── docs/               # ドキュメント (技術ノート、試験情報など)
├── src/                # Docusaurusカスタムコンポーネント、CSS、ページ
├── static/             # 静的アセット
├── docusaurus.config.ts # Docusaurusサイト設定
├── docker-compose.yml  # Docker Compose設定
├── Dockerfile          # 本番用Dockerfile
├── Dockerfile.dev      # 開発環境用Dockerfile
├── deploy.sh           # 手動デプロイスクリプト
├── package.json        # 依存関係とスクリプト
└── README.md           # このファイル (日本語)
└── README.en.md        # 英語版README
```

## 🤝 コントリビューション

バグ報告、機能提案、プルリクエストは歓迎します。Issueを作成するか、プルリクエストをお送りください。

## 📜 ライセンス

*   **コード**: [MIT License](./LICENSE)
*   **コンテンツ** (`blog/`, `diary/`, `docs/` 配下): [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
