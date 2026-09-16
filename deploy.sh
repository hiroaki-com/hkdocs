#!/bin/bash

# --- 設定項目 (環境に合わせて変更してください) ---
GCLOUD_CONFIGURATION="hkdocs"    # gcloud構成名。グローバルのactive構成に依存せず常にこれを使う
GCP_PROJECT_ID_OVERRIDE=""   # 通常は上記gcloud構成から取得。固定したい場合はここに設定
GCP_REGION="asia-northeast1"     # GCPリソースのリージョン
AR_REPO_NAME="hkdocs-images"    # Artifact Registryリポジトリ名
IMAGE_BASE_NAME="hkdocs-app"     # Dockerイメージのベース名
CR_SERVICE_NAME="hkdocs-service" # Cloud Runサービス名
CR_RUNTIME_SA_NAME="hkdocs-run-runtime" # 静的配信のみのため権限を一切持たせないランタイムSA
# --- 設定項目ここまで ---

set -e # エラー発生時にスクリプトを終了

# gcloudは常に指定の構成で呼び出す (グローバル設定を書き換えず、別プロジェクトへの誤デプロイを防ぐ)
GCLOUD=(gcloud --configuration="${GCLOUD_CONFIGURATION}")
# docker pushが呼ぶ認証ヘルパー(docker-credential-gcloud)は別プロセスのため--configurationが届かない。
# この環境変数でヘルパー側の構成も揃える (このプロセス内のみ。gcloud configの永続設定は変更しない)
export CLOUDSDK_ACTIVE_CONFIG_NAME="${GCLOUD_CONFIGURATION}"

echo "🚀 デプロイプロセスを開始します..."
SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
cd "$SCRIPT_DIR"
echo "現在の作業ディレクトリ: $(pwd)"

# 1. GCPプロジェクトIDの取得
if [ -n "$GCP_PROJECT_ID_OVERRIDE" ]; then
    PROJECT_ID="$GCP_PROJECT_ID_OVERRIDE"
else
    PROJECT_ID=$("${GCLOUD[@]}" config get-value project 2>/dev/null)
fi
if [ -z "$PROJECT_ID" ]; then
    echo "❌ エラー: GCPプロジェクトIDが設定されていません。"
    echo "   gcloud構成 '${GCLOUD_CONFIGURATION}' が存在するか、"
    echo "   または GCP_PROJECT_ID_OVERRIDE=hkdocs-461605 を指定して実行してください。"
    exit 1
fi
echo "GCPプロジェクトID: $PROJECT_ID"

# 2. イメージタグの決定 (現在のGitコミットハッシュを使用)
GIT_COMMIT_SHA=$(git rev-parse --short HEAD)
if [ -z "$GIT_COMMIT_SHA" ]; then
    echo "❌ エラー: Gitコミットハッシュの取得に失敗。"
    exit 1
fi
echo "使用するバージョンタグ (Gitコミットハッシュ): $GIT_COMMIT_SHA"

FULL_IMAGE_TAG="${GCP_REGION}-docker.pkg.dev/${PROJECT_ID}/${AR_REPO_NAME}/${IMAGE_BASE_NAME}:${GIT_COMMIT_SHA}"
# (オプション) LATEST_IMAGE_TAG="${GCP_REGION}-docker.pkg.dev/${PROJECT_ID}/${AR_REPO_NAME}/${IMAGE_BASE_NAME}:latest"

# 3. Dockerイメージのビルド (ARMマシンからのクロスプラットフォームビルド対応)
echo "🐳 Dockerイメージをビルド中 (linux/amd64): ${IMAGE_BASE_NAME}:local-amd64 ..."
if ! docker build --platform linux/amd64 -t "${IMAGE_BASE_NAME}:local-amd64" .; then
    echo "❌ エラー: Dockerイメージのビルドに失敗しました。"
    exit 1
fi
echo "✅ Dockerイメージビルド完了。"

# 4. ローカルイメージへのタグ付け
echo "🏷️  Artifact Registry用タグを付与中: ${FULL_IMAGE_TAG}..."
docker tag "${IMAGE_BASE_NAME}:local-amd64" "${FULL_IMAGE_TAG}"
# (オプション) docker tag "${IMAGE_BASE_NAME}:local-amd64" "${LATEST_IMAGE_TAG}"
echo "✅ タグ付与完了。"

# 5. Artifact RegistryへのDocker認証
echo "🔑 Docker認証をArtifact Registry (${GCP_REGION}) に対して設定中..."
if ! "${GCLOUD[@]}" auth configure-docker "${GCP_REGION}-docker.pkg.dev" --quiet; then
    echo "❌ エラー: Docker認証の設定に失敗。"
    exit 1
fi
echo "✅ Docker認証設定完了。"

# 6. DockerイメージをArtifact Registryにプッシュ
echo "⏫ DockerイメージをArtifact Registryにプッシュ中..."
echo "   プッシュするイメージ: ${FULL_IMAGE_TAG}"
docker push "${FULL_IMAGE_TAG}"
# (オプション) echo "   プッシュするイメージ (latest): ${LATEST_IMAGE_TAG}"
# (オプション) docker push "${LATEST_IMAGE_TAG}" # タグの不変性に注意
echo "✅ Dockerイメージプッシュ完了。"

# 7. Cloud Runサービスへデプロイ (または更新)
echo "☁️  Cloud Runサービス (${CR_SERVICE_NAME}) をデプロイ/更新中..."
# CPU/メモリ/同時実行数は既定値のまま (実測: CPU使用率 p99 1.5%, メモリ p99 28.9%)。
# 既定値と異なる設定のみ明示し、コンソール操作由来のドリフトを防ぐ。
"${GCLOUD[@]}" run deploy "${CR_SERVICE_NAME}" \
    --image="${FULL_IMAGE_TAG}" \
    --platform=managed \
    --region="${GCP_REGION}" \
    --port=8080 \
    --service-account="${CR_RUNTIME_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
    --max-instances=3 \
    --cpu-boost \
    --no-invoker-iam-check \
    --quiet

SERVICE_URL=$("${GCLOUD[@]}" run services describe "${CR_SERVICE_NAME}" --platform=managed --region="${GCP_REGION}" --format='value(status.url)')
echo "✅ Cloud Runサービスデプロイ/更新完了！"
echo "🌐 サービスURL: ${SERVICE_URL}"

echo "🎉 全てのデプロイプロセスが正常に完了しました。"