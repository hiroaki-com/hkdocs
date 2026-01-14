// .github/scripts/post-new-articles.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const matter = require('gray-matter');
const { TwitterApi } = require('twitter-api-v2');

const MAX_POST_LENGTH = 280;
const ELLIPSIS = '...';
const ARTICLE_PREFIX = '‼️📝: ';
const LOG_PREFIX = '[PostToX]';
const TARGET_DIRS = ['blog/', 'docs/'];
const TARGET_EXTS = ['.md', '.mdx'];
const DEPLOYMENT_WAIT_MS = 180000;
const URL_VERIFICATION_RETRY_COUNT = 5;
const URL_VERIFICATION_RETRY_DELAY_MS = 30000;

const {
  X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_TOKEN_SECRET,
  SITE_URL, BASE_URL, GITHUB_EVENT_BEFORE, GITHUB_SHA, GITHUB_EVENT_NAME
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

function getAddedFiles(shaBefore, shaCurrent, eventName) {
  let diffCommand;
  console.log(`${LOG_PREFIX} Determining diff strategy. Event: ${eventName}, shaBefore: ${shaBefore}, shaCurrent: ${shaCurrent}`);

  if (eventName === 'push' && shaBefore && !shaBefore.startsWith('0000000') && shaBefore !== 'undefined' && shaBefore !== null) {
    console.log(`${LOG_PREFIX} Using 'git diff' between ${shaBefore} and ${shaCurrent} (standard push).`);
    diffCommand = `git diff --name-only --diff-filter=A ${shaBefore} ${shaCurrent}`;
  } else {
    console.warn(`${LOG_PREFIX} shaBefore is unreliable ('${shaBefore}'). Assuming merge commit or similar. Diffing ${shaCurrent} with its first parent.`);
    diffCommand = `git diff --name-only --diff-filter=A ${shaCurrent}^1 ${shaCurrent}`;
  }

  try {
    console.log(`${LOG_PREFIX} Executing diff command: ${diffCommand}`);
    const diffOutput = execSync(diffCommand, { encoding: 'utf-8' }).toString();
    const files = diffOutput.split('\n').filter(file => file.trim() !== '');
    console.log(`${LOG_PREFIX} Found ${files.length} files added:`, files);
    return files;
  } catch (error) {
    console.error(`${LOG_PREFIX} Error getting git diff with command "${diffCommand}":`, error.message);
    if (error.message.toLowerCase().includes('unknown revision or path not in the working tree') || 
        error.message.toLowerCase().includes('bad revision')) {
      console.warn(`${LOG_PREFIX} Diff with parent failed. Attempting to list files in the commit ${shaCurrent} itself.`);
      try {
        const fallbackCommand = `git show --pretty="" --name-only --diff-filter=A ${shaCurrent}`;
        console.log(`${LOG_PREFIX} Executing fallback diff command: ${fallbackCommand}`);
        const fallbackOutput = execSync(fallbackCommand, { encoding: 'utf-8' }).toString();
        const fallbackFiles = fallbackOutput.split('\n').filter(file => file.trim() !== '');
        console.log(`${LOG_PREFIX} Fallback (files in commit ${shaCurrent}) found ${fallbackFiles.length} files:`, fallbackFiles);
        return fallbackFiles;
      } catch (fallbackError) {
        console.error(`${LOG_PREFIX} Fallback diff command also failed:`, fallbackError.message);
      }
    }
    return [];
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
  const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
  let baseUrlPath = BASE_URL || '';
  
  if (baseUrlPath && !baseUrlPath.startsWith('/')) baseUrlPath = '/' + baseUrlPath;
  if (baseUrlPath && !baseUrlPath.endsWith('/')) baseUrlPath += '/';
  if (baseUrlPath === '//') baseUrlPath = '/';

  const ext = path.extname(filePath);
  const baseFilename = path.basename(filePath, ext);
  let relativePath;

  if (filePath.startsWith('blog/')) {
    const slug = frontmatter.slug || baseFilename;
    const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-/);

    if (dateMatch) {
      const [year, month, day] = [dateMatch[1], dateMatch[2], dateMatch[3]];
      const actualSlug = slug.substring(dateMatch[0].length);
      relativePath = path.posix.join('blog', year, month, day, actualSlug);
    } else {
      relativePath = path.posix.join('blog', slug);
    }
  } else if (filePath.startsWith('docs/')) {
    const dir = path.dirname(filePath);
    const relativeDir = dir.startsWith('docs/') ? dir.substring('docs/'.length) : dir;
    const id = frontmatter.id || frontmatter.slug || baseFilename;
    
    if (id.toLowerCase() === 'index' || (relativeDir && id.toLowerCase() === path.basename(relativeDir).toLowerCase())) {
      relativePath = path.posix.join('docs', relativeDir);
    } else {
      relativePath = path.posix.join('docs', relativeDir, id);
    }
  } else {
    return null;
  }

  const fullPath = (baseUrlPath + relativePath).replace(/\/+/g, '/');
  return siteUrl + fullPath;
}

async function verifyUrlAccessible(url, retries = URL_VERIFICATION_RETRY_COUNT) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`${LOG_PREFIX} Verifying URL accessibility (attempt ${attempt}/${retries}): ${url}`);
      
      const response = await fetch(url, {
        method: 'HEAD',
        redirect: 'follow',
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; BlogPostVerifier/1.0)'
        }
      });

      if (response.ok) {
        console.log(`${LOG_PREFIX} URL verified accessible: ${url} (status: ${response.status})`);
        return true;
      }

      console.warn(`${LOG_PREFIX} URL returned non-OK status: ${response.status}`);
      
      if (attempt < retries) {
        console.log(`${LOG_PREFIX} Waiting ${URL_VERIFICATION_RETRY_DELAY_MS / 1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, URL_VERIFICATION_RETRY_DELAY_MS));
      }
    } catch (error) {
      console.error(`${LOG_PREFIX} Error verifying URL (attempt ${attempt}/${retries}):`, error.message);
      
      if (attempt < retries) {
        console.log(`${LOG_PREFIX} Waiting ${URL_VERIFICATION_RETRY_DELAY_MS / 1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, URL_VERIFICATION_RETRY_DELAY_MS));
      }
    }
  }

  console.error(`${LOG_PREFIX} URL verification failed after ${retries} attempts: ${url}`);
  return false;
}

function createPostText(title, articleUrl) {
  const text = `${ARTICLE_PREFIX}${title}\n${articleUrl}`;
  
  if (text.length <= MAX_POST_LENGTH) {
    return text;
  }

  const baseLength = ARTICLE_PREFIX.length + articleUrl.length + 1 + ELLIPSIS.length;
  const maxTitleLength = MAX_POST_LENGTH - baseLength;
  
  if (maxTitleLength <= 0) {
    console.warn(`${LOG_PREFIX} Warning: URL is too long to fit with any title text.`);
    const fallbackText = `${ARTICLE_PREFIX}${ELLIPSIS}\n${articleUrl}`;
    
    if (fallbackText.length > MAX_POST_LENGTH) {
      console.error(`${LOG_PREFIX} Error: URL itself exceeds character limit. Truncating URL.`);
      const maxUrlLength = MAX_POST_LENGTH - ARTICLE_PREFIX.length - ELLIPSIS.length - 1;
      const truncatedUrl = articleUrl.substring(0, maxUrlLength - ELLIPSIS.length) + ELLIPSIS;
      return `${ARTICLE_PREFIX}${ELLIPSIS}\n${truncatedUrl}`;
    }
    
    return fallbackText;
  }

  const truncatedTitle = title.substring(0, maxTitleLength) + ELLIPSIS;
  return `${ARTICLE_PREFIX}${truncatedTitle}\n${articleUrl}`;
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

    const isAccessible = await verifyUrlAccessible(articleUrl);
    if (!isAccessible) {
      console.error(`${LOG_PREFIX} Skipping ${filePath}: URL is not accessible after verification: ${articleUrl}`);
      return;
    }

    const postText = createPostText(frontmatter.title, articleUrl);
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
  console.log(`${LOG_PREFIX} Starting script.`);
  initializeXClient();

  const addedFiles = getAddedFiles(GITHUB_EVENT_BEFORE, GITHUB_SHA, GITHUB_EVENT_NAME);
  const newContentFiles = filterContentFiles(addedFiles);

  if (newContentFiles.length === 0) {
    console.log(`${LOG_PREFIX} No new content files found to post.`);
    return;
  }
  
  console.log(`${LOG_PREFIX} Found ${newContentFiles.length} new content file(s) to process:`, newContentFiles);
  console.log(`${LOG_PREFIX} Waiting ${DEPLOYMENT_WAIT_MS / 1000}s for deployment to complete...`);
  await new Promise(resolve => setTimeout(resolve, DEPLOYMENT_WAIT_MS));

  for (const file of newContentFiles) {
    await processArticleFile(file);
  }
  
  console.log(`${LOG_PREFIX} Finished processing all new content files.`);
}

main().catch(error => {
  console.error(`${LOG_PREFIX} Unhandled error in main function:`, error);
  process.exit(1);
});
