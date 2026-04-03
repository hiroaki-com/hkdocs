/**
 * X (Twitter) 投稿機能テストスクリプト
 *
 * 目的:
 *   1. X API 認証情報（Secrets）が正しく機能することを確認する
 *   2. 新規記事を作成せずに実際のXへのPOSTテストを行う
 *   3. 指定したURLのソーシャルカードが適切に展開されることを確認する
 *
 * 使用方法:
 *   GitHub Actions の "[Test] Post to X" ワークフローを手動実行する
 *   （Actions タブ → "[Test] Post to X" → "Run workflow"）
 *
 * 本番スクリプト (post-new-articles.js) との違い:
 *   - git diff によるファイル検出を行わない
 *   - URL到達確認は警告のみで投稿をブロックしない
 *   - 投稿テキストに [TEST] プレフィックスを付与する
 *   - GitHub Actions のジョブサマリーに結果を出力する
 */

"use strict";

const fs = require("fs");
const https = require("https");
const http = require("http");
const { TwitterApi } = require("twitter-api-v2");

// ── 定数 ────────────────────────────────────────────────────────────────────
const LOG_PREFIX = "[PostToX:Test]";
const TEST_PREFIX = "[TEST] ";
const MAX_POST_LENGTH = 280;
const ELLIPSIS = "...";

// ── 環境変数 ─────────────────────────────────────────────────────────────────
const {
  X_API_KEY,
  X_API_SECRET,
  X_ACCESS_TOKEN,
  X_ACCESS_TOKEN_SECRET,
  TEST_POST_URL,
  TEST_CUSTOM_MESSAGE,
  GITHUB_STEP_SUMMARY,
} = process.env;

// ── GitHub Actions アノテーション出力ヘルパー ─────────────────────────────────
function ghError(message) {
  console.error(`::error::${message}`);
}

function ghNotice(message) {
  console.log(`::notice::${message}`);
}

function ghWarning(message) {
  console.warn(`::warning::${message}`);
}

// ── ジョブサマリー出力 ────────────────────────────────────────────────────────
function writeStepSummary(content) {
  if (!GITHUB_STEP_SUMMARY) return;
  try {
    fs.appendFileSync(GITHUB_STEP_SUMMARY, content + "\n");
  } catch (e) {
    console.warn(`${LOG_PREFIX} Could not write to GITHUB_STEP_SUMMARY: ${e.message}`);
  }
}

// ── 環境変数バリデーション ────────────────────────────────────────────────────
function validateEnvVars() {
  const required = {
    X_API_KEY,
    X_API_SECRET,
    X_ACCESS_TOKEN,
    X_ACCESS_TOKEN_SECRET,
  };

  const missing = Object.entries(required)
    .filter(([, v]) => !v)
    .map(([k]) => k);

  if (missing.length > 0) {
    const msg =
      `Missing required secrets: ${missing.join(", ")}. ` +
      `Set them at: Repository → Settings → Secrets and variables → Actions`;
    ghError(msg);
    writeStepSummary(`## ❌ Test Failed\n\n**原因:** ${msg}`);
    process.exit(1);
  }

  console.log(`${LOG_PREFIX} ✅ All required environment variables are present.`);
}

// ── 投稿テキスト生成 ──────────────────────────────────────────────────────────
function buildPostText(url, customMessage) {
  // JSTで読みやすいタイムスタンプを生成
  const jstTimestamp = new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  const message =
    customMessage && customMessage.trim()
      ? customMessage.trim() + "\n"
      : "X API & ソーシャルカード 表示テスト\n";

  // フル版: プレフィックス + メッセージ + URL + タイムスタンプ
  const fullText = `${TEST_PREFIX}${message}${url}\n(${jstTimestamp} JST)`;

  if (fullText.length <= MAX_POST_LENGTH) {
    return fullText;
  }

  // タイムスタンプを省略した短縮版
  const shortText = `${TEST_PREFIX}${message}${url}`;

  if (shortText.length <= MAX_POST_LENGTH) {
    return shortText;
  }

  // それでも超過する場合はメッセージを切り詰める
  const fixedPart = `${TEST_PREFIX}${url}`;
  const maxMessageLen = MAX_POST_LENGTH - fixedPart.length - ELLIPSIS.length - 1;
  if (maxMessageLen > 0) {
    return `${TEST_PREFIX}${message.substring(0, maxMessageLen)}${ELLIPSIS}\n${url}`;
  }

  // URLのみ（極端なケース）
  return url.substring(0, MAX_POST_LENGTH);
}

// ── URL到達確認（警告のみ・ブロックしない）────────────────────────────────────
function checkUrlAccessibility(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith("https") ? https : http;

    const req = protocol.request(url, { method: "HEAD" }, (res) => {
      if (res.statusCode >= 200 && res.statusCode < 400) {
        console.log(
          `${LOG_PREFIX} ✅ URL is accessible (HTTP ${res.statusCode}): ${url}`
        );
      } else {
        ghWarning(
          `URL returned HTTP ${res.statusCode}. ` +
          `The page may not be accessible yet, but proceeding with the post.`
        );
      }
      resolve();
    });

    req.on("error", (err) => {
      ghWarning(
        `Could not reach URL: ${err.message}. ` +
        `Proceeding with the post anyway. URL: ${url}`
      );
      resolve();
    });

    req.setTimeout(5000, () => {
      req.destroy();
      ghWarning(
        `URL check timed out after 5s. Proceeding with the post. URL: ${url}`
      );
      resolve();
    });

    req.end();
  });
}

// ── メイン処理 ────────────────────────────────────────────────────────────────
async function main() {
  console.log(`${LOG_PREFIX} ====== Starting X Post Test ======`);

  // 1. 環境変数チェック
  validateEnvVars();

  // 2. 入力パラメータ確認
  const postUrl = (TEST_POST_URL && TEST_POST_URL.trim()) || "https://hkdocs.com/blog/";
  const customMessage = TEST_CUSTOM_MESSAGE || "";

  console.log(`${LOG_PREFIX} Target URL : ${postUrl}`);
  console.log(`${LOG_PREFIX} Custom msg : ${customMessage || "(none, using default)"}`);

  // 3. URL到達確認（警告のみ）
  await checkUrlAccessibility(postUrl);

  // 4. 投稿テキスト生成
  const postText = buildPostText(postUrl, customMessage);
  const charCount = postText.length;

  console.log(`${LOG_PREFIX} Post content (${charCount}/${MAX_POST_LENGTH} chars):`);
  console.log("---");
  console.log(postText);
  console.log("---");

  if (charCount > MAX_POST_LENGTH) {
    ghError(`Post text exceeds ${MAX_POST_LENGTH} chars (${charCount} chars). Aborting.`);
    process.exit(1);
  }

  // 5. X クライアント初期化 & 投稿
  const xClient = new TwitterApi({
    appKey: X_API_KEY,
    appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN,
    accessSecret: X_ACCESS_TOKEN_SECRET,
  });

  try {
    const { data } = await xClient.readWrite.v2.tweet({ text: postText });
    const tweetUrl = `https://x.com/i/web/status/${data.id}`;

    console.log(`${LOG_PREFIX} ✅ Successfully posted to X.`);
    console.log(`${LOG_PREFIX}    Tweet ID : ${data.id}`);
    console.log(`${LOG_PREFIX}    View at  : ${tweetUrl}`);

    ghNotice(`Test post succeeded. View at: ${tweetUrl}`);

    // ジョブサマリーに結果を書き出す
    writeStepSummary(
      `## ✅ X 投稿テスト 成功\n\n` +
      `| 項目 | 値 |\n` +
      `|---|---|\n` +
      `| Tweet ID | \`${data.id}\` |\n` +
      `| ツイートURL | [${tweetUrl}](${tweetUrl}) |\n` +
      `| 投稿URL (ソーシャルカード) | [${postUrl}](${postUrl}) |\n` +
      `| 文字数 | ${charCount} / ${MAX_POST_LENGTH} |\n\n` +
      `> ⚠️ テスト投稿のため、確認後に手動で削除してください。`
    );
  } catch (error) {
    const detail = error.data ? JSON.stringify(error.data, null, 2) : "(no detail)";
    ghError(`Failed to post to X: ${error.message}`);
    console.error(`${LOG_PREFIX} X API Error Details:\n${detail}`);

    writeStepSummary(
      `## ❌ X 投稿テスト 失敗\n\n` +
      `**エラー:** ${error.message}\n\n` +
      `\`\`\`json\n${detail}\n\`\`\``
    );
    process.exit(1);
  }

  console.log(`${LOG_PREFIX} ====== Test Completed ======`);
}

main().catch((error) => {
  ghError(`Unhandled error: ${error.message}`);
  writeStepSummary(`## ❌ X 投稿テスト 失敗\n\n**予期せぬエラー:** ${error.message}`);
  process.exit(1);
});
