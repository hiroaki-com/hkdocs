// .github/scripts/post-new-articles.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const { TwitterApi } = require('twitter-api-v2');

// --- 設定と定数 ---
const MAX_POST_LENGTH = 280;
const ELLIPSIS = '...';
const ARTICLE_PREFIX = '【新規記事】';
const LOG_PREFIX = '[PostToX]';
const TARGET_DIRS = ['blog/', 'docs/']; // 監視対象ディレクトリ
const TARGET_EXTS = ['.md', '.mdx'];    // 監視対象の拡張子

// --- 環境変数 ---
const {
  X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET,
  SITE_URL, BASE_URL, GITHUB_EVENT_BEFORE, GITHUB_SHA, GITHUB_EVENT_NAME
} = process.env;

// --- APIクライアント初期化 ---
let rwClient;

/**
 * X APIクライアントを初期化し、必須環境変数を確認します。
 */
function initializeXClient() {
  const requiredEnvVars = {
    X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET,
    SITE_URL, BASE_URL, GITHUB_SHA
  };
  for (const [key, value] of Object.entries(requiredEnvVars)) {
    if (!value) {
      console.error(`${LOG_PREFIX} Error: Missing required environment variable: ${key}`);
      process.exit(1);
    }
  }
  const xClient = new TwitterApi({
    appKey: X_API_KEY, appSecret: X_API_SECRET,
    accessToken: X_ACCESS_TOKEN, accessSecret: X_ACCESS_TOKEN_SECRET,
  });
  rwClient = xClient.readWrite;
}

/**
 * 指定されたコミット範囲で「新規追加」されたファイルのリストを取得します。
 * @param {string} shaBefore プッシュ前のコミットSHA (GITHUB_EVENT_BEFORE)
 * @param {string} shaCurrent 現在のコミットSHA (GITHUB_SHA)
 * @param {string} eventName GitHubイベント名 (GITHUB_EVENT_NAME)
 * @returns {string[]} 新規追加されたファイルのパスの配列
 */
function getAddedFiles(shaBefore, shaCurrent, eventName) {
  let diffCommand;
  console.log(`${LOG_PREFIX} Determining diff strategy. Event: ${eventName}, shaBefore: ${shaBefore}, shaCurrent: ${shaCurrent}`);

  // 通常のプッシュイベントで、かつ shaBefore が有効な場合
  if (eventName === 'push' && shaBefore && !shaBefore.startsWith('0000000') && shaBefore !== 'undefined') {
    console.log(`${LOG_PREFIX} Using 'git diff' between ${shaBefore} and ${shaCurrent}`);
    diffCommand = `git diff --name-only --diff-filter=A ${shaBefore} ${shaCurrent}`;
  } else {
    // マージコミット、最初のプッシュ、強制プッシュ、または GITHUB_EVENT_BEFORE が利用できないその他のケース
    // 現在のコミット(shaCurrent)がマージコミットである可能性を考慮し、その親との差分から追加ファイルを取得
    console.warn(`${LOG_PREFIX} shaBefore is unreliable or event is not a simple push. Using 'git diff-tree' for commit ${shaCurrent}.`);
    // マージコミットの場合、複数の親がいる。ここでは1番目の親(通常はマージ先ブランチ)との差分を主に見るが、
    // マージによって新たに取り込まれたファイルは `git diff-tree -r --diff-filter=A HEAD^1 HEAD` では捉えきれないことがあるため、
    // マージコミット自体で追加されたファイル（マージコミットのツリーと親のツリーの差分）を見る `git show` や `git diff-tree` の方が適切。
    // `--diff-filter=A` は「追加された」ファイルのみを対象とする。
    // マージコミットの場合、`shaCurrent^1`は最初の親を指す。
    // `git diff-tree --no-commit-id --name-only -r --diff-filter=A ${shaCurrent}^1 ${shaCurrent}` は、
    // マージ先のブランチに直接コミットが追加されたような差分を見つけるのには有効だが、
    // マージされたブランチから来た新規ファイルは検出しにくい。
    // マージコミットによって「導入された」ファイル全体を見るには以下の方が良い。
    diffCommand = `git diff-tree --no-commit-id --name-only -r --diff-filter=A ${shaCurrent}^! ${shaCurrent}`;
    // `^!` は、そのコミット自身と全ての親を比較し、そのコミットで新たに追加されたファイルを示す。
    // ただし、単純なコミットの場合は `^!` は `^1` と同じ意味になる。
  }

  try {
    console.log(`${LOG_PREFIX} Executing diff command: ${diffCommand}`);
    const diffOutput = execSync(diffCommand).toString();
    const files = diffOutput.split('\n').filter(file => file.trim() !== '');
    console.log(`${LOG_PREFIX} Found ${files.length} changed files:`, files);
    return files;
  } catch (error) {
    console.error(`${LOG_PREFIX} Error getting git diff with command "${diffCommand}":`, error.message);
    // 差分取得に失敗した場合でも、フォールバックとして現在のコミットの内容を表示してみる（デバッグ用）
    // ただし、これは意図しない多数のファイルを処理する可能性があるため、慎重に扱う
    console.warn(`${LOG_PREFIX} Attempting fallback: listing all files in commit ${shaCurrent}`);
    try {
        const fallbackCommand = `git show --pretty="" --name-only --diff-filter=A ${shaCurrent}`;
        const fallbackOutput = execSync(fallbackCommand).toString();
        const fallbackFiles = fallbackOutput.split('\n').filter(file => file.trim() !== '');
        console.log(`${LOG_PREFIX} Fallback found ${fallbackFiles.length} files:`, fallbackFiles);
        // このフォールバックは「新規追加」の定義が曖昧になるため、通常は空を返す方が安全かもしれない
        // return fallbackFiles;
        return []; // エラー時は空を返すことで、意図しない大量投稿を防ぐ
    } catch (fallbackError) {
        console.error(`${LOG_PREFIX} Fallback diff command also failed:`, fallbackError.message);
        return []; // 致命的なエラーとして空を返す
    }
  }
}

/**
 * ファイルリストから、監視対象ディレクトリ・拡張子に合致するファイルをフィルタリングします。
 * @param {string[]} files ファイルパスの配列
 * @returns {string[]} フィルタリングされたファイルパスの配列
 */
function filterContentFiles(files) {
  return files.filter(file =>
    TARGET_DIRS.some(dir => file.startsWith(dir)) &&
    TARGET_EXTS.some(ext => file.endsWith(ext)) &&
    !path.basename(file).startsWith('_') // 例: _category_.json や _partial.mdx を除外
  );
}

/**
 * Docusaurusのファイルパスとフロントマターから記事の完全なURLを生成します。
 * @param {string} filePath リポジトリルートからのファイルパス
 * @param {object} frontmatter Markdown/MDXファイルのフロントマター
 * @returns {string|null} 記事の完全なURL、または生成できない場合はnull
 */
function getArticleUrl(filePath, frontmatter) {
  let relativePath;
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  let baseUrlPath = BASE_URL;
  if (!baseUrlPath.startsWith('/')) baseUrlPath = '/' + baseUrlPath;
  if (!baseUrlPath.endsWith('/')) baseUrlPath += '/';
  if (baseUrlPath === '//') baseUrlPath = '/';

  const ext = path.extname(filePath);
  const baseFilename = path.basename(filePath, ext);

  if (filePath.startsWith('blog/')) {
    const slug = frontmatter.slug || baseFilename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
    relativePath = path.join('blog', slug);
  } else if (filePath.startsWith('docs/')) {
    const dir = path.dirname(filePath);
    const relativeDir = dir.startsWith('docs/') ? dir.substring('docs/'.length) : dir;
    let id = frontmatter.id || frontmatter.slug || baseFilename;
    if (id.toLowerCase() === 'index' || (relativeDir && id.toLowerCase() === path.basename(relativeDir).toLowerCase())) {
        relativePath = path.join('docs', relativeDir);
    } else {
        relativePath = path.join('docs', relativeDir, id);
    }
  } else {
    return null; // 監視対象外ディレクトリ
  }
  const fullRelativePath = (baseUrlPath + relativePath.replace(/\\/g, '/')).replace(/\/\//g, '/');
  return siteUrl + fullRelativePath;
}

/**
 * Xへの投稿本文を生成します。
 * @param {string} title 記事タイトル
 * @param {string} articleUrl 記事の完全なURL
 * @param {object} frontmatter 記事のフロントマター
 * @returns {string} 生成された投稿本文
 */
function createPostText(title, articleUrl, frontmatter) {
  let text = `${ARTICLE_PREFIX}${title}\n${articleUrl}`;
  const hashtags = (frontmatter.tags && Array.isArray(frontmatter.tags))
    ? frontmatter.tags
        .map(tag => `#${tag.replace(/\s+/g, '').replace(/-/g, '_')}`) // タグを整形
        .filter(tag => (text + "\n" + tag).length <= MAX_POST_LENGTH) // 文字数制限を超えないタグのみ
        .join(' ')
    : '';
  if (hashtags) {
    text += `\n${hashtags}`;
  }

  // 文字数制限を超える場合はタイトルを短縮
  if (text.length > MAX_POST_LENGTH) {
    const baseLength = (ARTICLE_PREFIX + '\n' + articleUrl + (hashtags ? '\n' + hashtags : '') + ELLIPSIS).length;
    const maxTitleLength = MAX_POST_LENGTH - baseLength;
    if (maxTitleLength < 5) { // タイトルがほとんど入らない場合
        console.warn(`${LOG_PREFIX} Title too long to fit even after shortening. URL: ${articleUrl}`);
        // ここではURLのみ、または非常に短い固定メッセージとURLを投稿するなどの戦略も考えられる
        // 今回は、可能な限り短縮したタイトルとURL、ハッシュタグ（入れば）で試みる
    }
    const truncatedTitle = title.length > maxTitleLength ? title.substring(0, Math.max(0, maxTitleLength)) + ELLIPSIS : title;
    text = `${ARTICLE_PREFIX}${truncatedTitle}\n${articleUrl}`;
    if (hashtags && (text + "\n" + hashtags).length <= MAX_POST_LENGTH) {
        text += `\n${hashtags}`;
    }
  }
  return text;
}

/**
 * 個々の記事ファイルを処理し、Xに投稿します。
 * @param {string} filePath 処理対象のファイルパス
 */
async function processArticleFile(filePath) {
  console.log(`${LOG_PREFIX} Processing file: ${filePath}`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent); // Frontmatterの解析

    // 下書きや未リスト記事はスキップ
    if (frontmatter.draft === true || frontmatter.unlisted === true) {
      console.log(`${LOG_PREFIX} Skipping draft/unlisted file: ${filePath}`);
      return;
    }
    // タイトルがなければスキップ
    if (!frontmatter.title) {
      console.warn(`${LOG_PREFIX} Skipping ${filePath}: 'title' not found in frontmatter.`);
      return;
    }

    const articleUrl = getArticleUrl(filePath, frontmatter);
    if (!articleUrl) {
      console.warn(`${LOG_PREFIX} Skipping ${filePath}: Could not determine URL.`);
      return;
    }

    const postText = createPostText(frontmatter.title, articleUrl, frontmatter); // 投稿フォーマット
    console.log(`${LOG_PREFIX} Attempting to post to X: "${postText}"`);

    const { data: createdPost } = await rwClient.v2.tweet({ text: postText });
    console.log(`${LOG_PREFIX} Successfully posted to X: ${frontmatter.title} (ID: ${createdPost.id}) URL: ${articleUrl}`);

  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to process or post for file ${filePath}:`, error.message);
    if (error.data) { // X APIからの詳細エラー
      console.error(`${LOG_PREFIX} X API Error Details:`, JSON.stringify(error.data, null, 2));
    }
    // エラーが発生しても、このファイルの処理はここで終了し、次のファイルの処理に進む
  }
}

// --- メイン処理 ---
async function main() {
  console.log(`${LOG_PREFIX} Starting script.`);
  initializeXClient(); // APIクライアントと環境変数チェック

  // 新規記事の判定ロジック
  const addedFiles = getAddedFiles(GITHUB_EVENT_BEFORE, GITHUB_SHA, GITHUB_EVENT_NAME);
  
  const newContentFiles = filterContentFiles(addedFiles); // 監視対象ファイルのみフィルタリング

  if (newContentFiles.length === 0) {
    console.log(`${LOG_PREFIX} No new content files found to post.`);
    return;
  }
  console.log(`${LOG_PREFIX} Found ${newContentFiles.length} new content file(s) to process:`, newContentFiles);

  // 複数記事の同時追加に対応
  for (const file of newContentFiles) {
    await processArticleFile(file); // 各ファイルを個別に処理
  }
  console.log(`${LOG_PREFIX} Finished processing all new content files.`);
}

main().catch(error => {
  console.error(`${LOG_PREFIX} Unhandled error in main function:`, error);
  process.exit(1); // 致命的なエラーでスクリプトを終了
});
