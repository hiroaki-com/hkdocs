---
title: DocusaurusプロジェクトへDockerCompose導入した記録
authors: [hk]
tags: [docker, docker-compose,]
---

この記事では、Docusaurusのローカル環境開発時のために、`Docker Compose`を導入した際の手順を整理します。

背景：<br>
ローカル開発環境の統一とセットアップの簡略化を目的とし、Docusaurus (`v3.8.0`) プロジェクトにDocker Composeを導入した。導入前は、Node.js (`v22.16.0`) およびpnpm (`v10.11`) を開発者のローカルマシンに直接インストールして運用していた。

<!-- truncate -->

#### 1. 開発用Dockerfileの作成 (`Dockerfile.dev`)

ローカル開発専用のDockerイメージを定義するため、以下の手順で`Dockerfile.dev`を作成した。

1.  **ファイル作成**
    プロジェクトルートに`Dockerfile.dev`という名前でファイルを作成。

2.  **ベースイメージ指定**
    本番用`Dockerfile`との整合性を考慮し、`node:22.16.0-alpine`をベースイメージとして指定。

3.  **pnpm有効化と依存関係インストール**
    `corepack enable pnpm`を実行後、`package.json`と`pnpm-lock.yaml`をコンテナにコピーし、`pnpm install --frozen-lockfile`で開発依存を含む全パッケージをインストール。

4.  **ポート開放と起動コマンド設定**
    Docusaurusのデフォルト開発ポート`3000`を開放し、起動コマンドとして`pnpm start --host 0.0.0.0 --no-open`を設定。これにより、コンテナ外部からのアクセスを許可しつつ、不要なブラウザの自動起動を抑制。

    ```dockerfile
    # syntax=docker/dockerfile:1
    FROM node:22.16.0-alpine AS development

    WORKDIR /app

    RUN corepack enable pnpm

    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile

    EXPOSE 3000
    CMD ["pnpm", "start", "--host", "0.0.0.0", "--no-open"]
    ```

#### 2. Docker Compose設定ファイルの作成 (`docker-compose.yml`)

開発用サービスの定義と管理のため、以下の手順で`docker-compose.yml`を作成した。

1.  **ファイル作成**
    プロジェクトルートに`docker-compose.yml`という名前でファイルを作成。

2.  **サービス定義**
    `app`という名称で開発用サービスを定義し、コンテナ名を`hkdocs_dev_app`とした。ビルドコンテキストをプロジェクトルート (`.`)、使用するDockerfileを`Dockerfile.dev`に指定。

3.  **ポートマッピング設定**
    ホストのポート`3000`をコンテナのポート`3000`にマッピング。

4.  **ボリュームマウント設定**
    ソースコード同期のため`.:/app:cached`を、`node_modules`と`.docusaurus`ディレクトリの隔離のためそれぞれ`/app/node_modules`と`/app/.docusaurus`をコンテナ専用ボリュームとして設定。

5.  **環境変数とその他設定**
    `NODE_ENV=development`を設定。ホットリロード不安定時のための`CHOKIDAR_USEPOLLING=true`はコメントアウト状態で準備。対話的実行のため`tty: true`と`stdin_open: true`を設定。

    ```yaml
    version: '3.8'

    services:
      app:
        build:
          context: .
          dockerfile: Dockerfile.dev
        container_name: hkdocs_dev_app
        ports:
          - "3000:3000"
        volumes:
          - .:/app:cached
          - /app/node_modules
          - /app/.docusaurus
        environment:
          - NODE_ENV=development
          # CHOKIDAR_USEPOLLING=true
        tty: true
        stdin_open: true
    ```

#### 3. Dockerビルドコンテキスト除外設定 (`.dockerignore`) の更新

Dockerイメージのビルド効率とイメージサイズを最適化するため、`.dockerignore`ファイルを更新した。主な除外対象は、`.git`、`node_modules`、`build`、`.docusaurus`、Docker関連ファイル自体、デプロイ用スクリプト、環境依存ファイル、ログファイル、OS固有ファイル、IDE設定ファイルなど。

> **注意**：`pnpm-lock.yaml`は`Dockerfile.dev`内で`COPY`コマンドにより使用するため、`.dockerignore`の除外対象には含めない。

```.dockerignore
# Git
.git
.gitignore

# Node.js
node_modules

# Docusaurus build output and cache
build
.docusaurus

# Docker related files
Dockerfile
Dockerfile.dev
docker-compose.yml
docker-compose.*.yml

# Deployment scripts & environment specific files
deploy.sh
.env
*.local

# Logs
*.log
pnpm-debug.log*

# IDE/Editor specific
.DS_Store
.vscode/
.idea/
```

#### 4. 開発環境の利用と動作確認

1.  **開発環境の起動**
    プロジェクトルートディレクトリのターミナルから、初回または構成ファイル変更時は`docker-compose up --build`、2回目以降は`docker-compose up`コマンドで開発環境を起動。

2.  **ブラウザでの表示確認**
    ブラウザで`http://localhost:3000`にアクセスし、Docusaurusサイトが表示されることを確認。

3.  **ホットリロードのテスト**
    ホストマシン上のエディタでソースコードを編集・保存し、変更が即座にブラウザに反映される（ホットリロード）ことを確認。

    > **備考**：ホットリロードが不安定な場合は、`docker-compose.yml`の`CHOKIDAR_USEPOLLING=true`のコメントアウトを解除、または`Dockerfile.dev`の`CMD`に`--poll`オプションを追加し、`docker-compose up --build`で再起動することで対応。

4.  **開発環境の停止**
    開発サーバーを起動したターミナルで`Ctrl + C`を押すことでコンテナを停止。コンテナと関連リソース（ネットワークなど）を完全に削除する場合は、`docker-compose down`コマンドを実行。

