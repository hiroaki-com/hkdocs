// .github/scripts/post-new-articles.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const { TwitterApi } = require('twitter-api-v2');

const MAX_POST_LENGTH = 280;
const ELLIPSIS = '...';
const ARTICLE_PREFIX = '【新規記事】';
const LOG_PREFIX = '[PostToX]';
const TARGET_DIRS = ['blog/', 'docs/'];
const TARGET_EXTS = ['.md', '.mdx'];

const {
  X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET,
  SITE_URL, BASE_URL, GITHUB_EVENT_BEFORE, GITHUB_SHA,
} = process.env;

let rwClient;

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

function getAddedFiles(shaBefore, shaAfter) {
  if (!shaBefore || shaBefore.startsWith('0000000')) {
    console.warn(`${LOG_PREFIX} shaBefore is '${shaBefore}'. Cannot determine added files reliably. Skipping X post.`);
    return [];
  }
  try {
    const diffOutput = execSync(`git diff --name-only --diff-filter=A ${shaBefore} ${shaAfter}`).toString();
    return diffOutput.split('\n').filter(file => file.trim() !== '');
  } catch (error)
{
    console.error(`${LOG_PREFIX} Error getting git diff:`, error);
    process.exit(1);
  }
}

function filterContentFiles(files) {
  return files.filter(file =>
    TARGET_DIRS.some(dir => file.startsWith(dir)) &&
    TARGET_EXTS.some(ext => file.endsWith(ext)) &&
    !path.basename(file).startsWith('_')
  );
}

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
    return null;
  }
  const fullRelativePath = (baseUrlPath + relativePath.replace(/\\/g, '/')).replace(/\/\//g, '/');
  return siteUrl + fullRelativePath;
}

function createPostText(title, articleUrl, frontmatter) {
  let text = `${ARTICLE_PREFIX}${title}\n${articleUrl}`;
  const hashtags = (frontmatter.tags && Array.isArray(frontmatter.tags))
    ? frontmatter.tags
        .map(tag => `#${tag.replace(/\s+/g, '').replace(/-/g, '_')}`)
        .filter(tag => (text + "\n" + tag).length <= MAX_POST_LENGTH)
        .join(' ')
    : '';
  if (hashtags) text += `\n${hashtags}`;

  if (text.length > MAX_POST_LENGTH) {
    const overhead = (ARTICLE_PREFIX + '\n' + articleUrl + (hashtags ? '\n' + hashtags : '') + ELLIPSIS).length;
    const maxTitleLength = MAX_POST_LENGTH - overhead;
    const truncatedTitle = title.length > maxTitleLength ? title.substring(0, maxTitleLength) + ELLIPSIS : title;
    text = `${ARTICLE_PREFIX}${truncatedTitle}\n${articleUrl}`;
    if (hashtags && (text + "\n" + hashtags).length <= MAX_POST_LENGTH) {
        text += `\n${hashtags}`;
    }
  }
  return text;
}

async function processArticleFile(filePath) {
  console.log(`${LOG_PREFIX} Processing file: ${filePath}`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter } = matter(fileContent);

    if (frontmatter.draft === true || frontmatter.unlisted === true) {
      console.log(`${LOG_PREFIX} Skipping draft/unlisted file: ${filePath}`);
      return;
    }
    if (!frontmatter.title) {
      console.warn(`${LOG_PREFIX} Skipping ${filePath}: 'title' not found in frontmatter.`);
      return;
    }

    const articleUrl = getArticleUrl(filePath, frontmatter);
    if (!articleUrl) {
      console.warn(`${LOG_PREFIX} Skipping ${filePath}: Could not determine URL.`);
      return;
    }

    const postText = createPostText(frontmatter.title, articleUrl, frontmatter);
    console.log(`${LOG_PREFIX} Attempting to post to X: "${postText}"`);

    const { data: createdPost } = await rwClient.v2.tweet({ text: postText });
    console.log(`${LOG_PREFIX} Successfully posted to X: ${frontmatter.title} (ID: ${createdPost.id}) URL: ${articleUrl}`);

  } catch (error) {
    console.error(`${LOG_PREFIX} Failed to process or post for file ${filePath}:`, error.message);
    if (error.data) {
      console.error(`${LOG_PREFIX} X API Error Details:`, JSON.stringify(error.data, null, 2));
    }
  }
}

async function main() {
  console.log(`${LOG_PREFIX} Starting to find new posts and post to X.`);
  initializeXClient();
  console.log(`${LOG_PREFIX} Commit range: ${GITHUB_EVENT_BEFORE} to ${GITHUB_SHA}`);

  const addedFiles = getAddedFiles(GITHUB_EVENT_BEFORE, GITHUB_SHA);
  if (!addedFiles.length && GITHUB_EVENT_BEFORE && !GITHUB_EVENT_BEFORE.startsWith('0000000')) {
    console.log(`${LOG_PREFIX} No files added in this push.`);
    return;
  }
  
  const newContentFiles = filterContentFiles(addedFiles);

  if (newContentFiles.length === 0) {
    console.log(`${LOG_PREFIX} No new markdown or mdx files found to post.`);
    return;
  }
  console.log(`${LOG_PREFIX} New content files to process:`, newContentFiles);

  for (const file of newContentFiles) {
    await processArticleFile(file);
  }
  console.log(`${LOG_PREFIX} Finished posting process.`);
}

main().catch(error => {
  console.error(`${LOG_PREFIX} Unhandled error in main function:`, error);
  process.exit(1);
});
