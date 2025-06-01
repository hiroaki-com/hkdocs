# ---- Builder Stage ----
# ベースイメージとしてNode.jsの特定のバージョン (Alpine Linuxベース) を選択
# 'AS builder' でこのステージに 'builder' という名前を付ける
FROM node:22.16.0-alpine AS builder

# pnpmの特定のバージョンをグローバルにインストール
# Node.jsイメージにはnpmは含まれているが、pnpmは別途インストールが必要
RUN npm install -g pnpm@10.11

# 作業ディレクトリをコンテナ内の /app に設定
# これ以降のコマンドはこのディレクトリ基準で実行される
WORKDIR /app

# まず pnpm-lock.yaml と package.json をコピーする
# これらが変更されない限り、以降の pnpm install はDockerのキャッシュを利用できるためビルドが高速化する
COPY pnpm-lock.yaml package.json ./

# 依存関係をインストール (--prod で本番に必要なもののみ、--frozen-lockfile でlockファイル通りのバージョン)
# このステージはビルド専用なので、devDependenciesも含まれても良い場合もあるが、
# --prod をつけることで、最終ステージにコピーするnode_modulesを本番用に限定する意図がある
RUN pnpm install --prod --frozen-lockfile

# プロジェクトの全てのファイルを作業ディレクトリ (/app) にコピーする
# (.dockerignore ファイルで指定されたものは除く)
COPY . .

# Docusaurusサイトをビルドするコマンドを実行
# これにより /app/build ディレクトリに静的サイトが生成される
RUN pnpm build

# ---- Final Stage ----
# 最終的に実行されるイメージのベースとして、再度軽量なNode.jsイメージを選択
# builderステージとは独立した新しいステージが始まる
FROM node:22.16.0-alpine

# pnpmを再度グローバルにインストール
# 最終ステージで `pnpm run serve` を実行するために必要
RUN npm install -g pnpm@10.11

# 作業ディレクトリをコンテナ内の /app に設定
WORKDIR /app

# 環境変数を設定 (Node.jsアプリケーションでよく使われる)
ENV NODE_ENV=production
# PORT環境変数はCloud Runが実行時にコンテナに渡すが、ここで明示しても良い
# (ただし、serveスクリプト側で ${PORT:-8080} としているので必須ではない)

# コンテナ内でアプリケーションを実行するユーザーを非rootユーザー (node) に変更
# セキュリティのベストプラクティス
USER node

# builderステージからビルド成果物 (buildディレクトリの中身) をコピー
# --chown=node:node でコピー先のファイルの所有者をnodeユーザーにする
COPY --from=builder --chown=node:node /app/build ./build

# builderステージから本番用のnode_modulesとpackage.jsonをコピー
# これらは `pnpm run serve` を実行するために必要
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/package.json ./package.json

# アプリケーションがリッスンするポートを8080番として宣言
# これはドキュメンテーション的な意味合いと、`docker run -P` で利用される
# Cloud Runはこの情報も参考にする
EXPOSE 8080

# ヘルスチェック (オプションだが推奨)
# Cloud Runはコンテナのヘルス状態を監視するためにこれを利用できる
# curlがイメージに存在しない場合、`RUN apk add --no-cache curl` などでbuilder/finalステージにインストールが必要
# HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
#   CMD curl -f http://localhost:8080/ || exit 1

# コンテナ起動時に実行されるデフォルトのコマンド
# package.json の "serve" スクリプト (`serve -s build -l tcp://0.0.0.0:${PORT:-8080}`) を実行する
CMD ["pnpm", "run", "serve"]