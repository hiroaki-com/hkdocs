---
title: "Detecting New Articles with GitHub Actions and Posting to X as a Twitter Card"
sidebar_position: 4
last_update:
  date: 2025-06-13
tags: [GitHub Actions, Twitter API, Twitter Card, Docusaurus]
---

This article documents the steps and troubleshooting process for implementing a feature that detects new articles via GitHub Actions and posts them to X (formerly Twitter) as a Twitter Card.

**Functionality:**
Detect new posts with GitHub Actions and post them to X as a Twitter Card.

<!-- truncate -->

**References:**
- X API v2: https://developer.x.com/en/docs/x-api
- Search Engine Optimization (SEO): https://docusaurus.io/docs/seo

## Implementation Log for X Auto-Post Feature

### 1. Prerequisites

1.  **X Developer App and Credentials:**
    *   An app has been created in the X Developer Portal.
    *   App permissions are set to "Read and Write."
    *   API Key, API Key Secret, Access Token, and Access Token Secret have been obtained.
2.  **GitHub Secrets:**
    The following have been registered in the repository under `Settings` > `Secrets and variables` > `Actions`.
    *   `X_API_KEY`
    *   `X_API_SECRET`
    *   `X_ACCESS_TOKEN`
    *   `X_ACCESS_TOKEN_SECRET`
    *   `SITE_URL` (e.g., `https://hkdocs.com/`)
    *   `BASE_URL` (e.g., `/`)

### 2. Local Development Environment and Dependency Setup

1.  **Clean Up Development Environment (if necessary):**
    *   Completely stop Docker containers:
        ```bash
        docker-compose down --volumes --remove-orphans
        ```
    *   On the host machine, delete `node_modules`, `pnpm-lock.yaml`, and `.pnpm-store` (if it exists).
    *   Run `pnpm install` on the host to regenerate `pnpm-lock.yaml`.
    *   Rebuild the Docker image:
        ```bash
        docker-compose build --no-cache app
        ```
2.  **Install Required Libraries (`gray-matter`, `twitter-api-v2`):**
    *   Execute the following command:
        ```bash
        docker-compose run --rm app sh -c "pnpm add -D gray-matter twitter-api-v2 --store-dir /root/.local/share/pnpm/store/v10 && echo 'Libraries added successfully.'"
        ```
    *   (Note: The `--store-dir` path is the pnpm global store path in the build environment. Adjust as necessary.)
3.  **Rebuild Docker Image:**
    *   Execute the following command:
        ```bash
        docker-compose build app
        ```

### 3. Implementing the GitHub Actions Auto-Post Feature

1.  **Create the Workflow File:**
    Create `.github/workflows/post-to-x.yml` with the following content.
    ```yaml
    # .github/workflows/post-to-x.yml
    name: Post New Articles to X

    on:
      push:
        branches:
          - main
        paths:
          - 'blog/**.md'
          - 'blog/**.mdx'
          - 'docs/**.md'
          - 'docs/**.mdx'
          - '!diary/**'

    jobs:
      post_to_x:
        runs-on: ubuntu-latest
        concurrency:
          group: ${{ github.workflow }}-${{ github.ref }}
          cancel-in-progress: true
        timeout-minutes: 10
        permissions:
          contents: read

        steps:
          - name: Checkout Repository
            uses: actions/checkout@v4
            with:
              fetch-depth: 0

          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: '22.16.0' # Adjust to your Node.js version

          - name: Enable Corepack and Set up PNPM
            run: |
              corepack enable
              corepack prepare pnpm@10.11.0 --activate # Adjust to your pnpm version
            shell: bash

          - name: Install Dependencies
            run: pnpm install --frozen-lockfile

          - name: Find New Posts and Post to X
            env:
              X_API_KEY: ${{ secrets.X_API_KEY }}
              X_API_SECRET: ${{ secrets.X_API_SECRET }}
              X_ACCESS_TOKEN: ${{ secrets.X_ACCESS_TOKEN }}
              X_ACCESS_TOKEN_SECRET: ${{ secrets.X_ACCESS_TOKEN_SECRET }}
              SITE_URL: ${{ secrets.SITE_URL }}
              BASE_URL: ${{ secrets.BASE_URL }}
            run: node ./.github/scripts/post-new-articles.js
    ```
2.  **Create the Posting Script:**
    Create `.github/scripts/post-new-articles.js` with the following content.
    ```javascript
    // .github/scripts/post-new-articles.js
    const fs = require('fs');
    const path = require('path');
    const { execSync } = require('child_process');
    const matter = require('gray-matter');
    const { TwitterApi } = require('twitter-api-v2');

    const MAX_POST_LENGTH = 280;
    const ELLIPSIS = '...';
    const ARTICLE_PREFIX = '【New Article】';
    const LOG_PREFIX = '[PostToX]';
    const TARGET_DIRS = ['blog/', 'docs/'];
    const TARGET_EXTS = ['.md', '.mdx'];

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
      let relativePath;
      const siteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
      let baseUrlPath = BASE_URL;
      if (!baseUrlPath.startsWith('/')) baseUrlPath = '/' + baseUrlPath;
      if (!baseUrlPath.endsWith('/')) baseUrlPath += '/';
      if (baseUrlPath === '//') baseUrlPath = '/';

      const ext = path.extname(filePath);
      const baseFilename = path.basename(filePath, ext);

      if (filePath.startsWith('blog/')) {
        let slug = frontmatter.slug || baseFilename;
        const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-/);

        if (dateMatch) {
          const year = dateMatch[1];
          const month = dateMatch[2];
          const day = dateMatch[3];
          const actualSlug = slug.substring(dateMatch[0].length);
          relativePath = path.join('blog', year, month, day, actualSlug);
        } else {
          relativePath = path.join('blog', slug);
        }
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
        const baseLength = (ARTICLE_PREFIX + '\n' + articleUrl + (hashtags ? '\n' + hashtags : '') + ELLIPSIS).length;
        const maxTitleLength = MAX_POST_LENGTH - baseLength;
        const truncatedTitle = title.length > maxTitleLength ? title.substring(0, Math.max(0, maxTitleLength)) + ELLIPSIS : title;
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
      console.log(`${LOG_PREFIX} Starting script.`);
      initializeXClient();

      const addedFiles = getAddedFiles(GITHUB_EVENT_BEFORE, GITHUB_SHA, GITHUB_EVENT_NAME);
      const newContentFiles = filterContentFiles(addedFiles);

      if (newContentFiles.length === 0) {
        console.log(`${LOG_PREFIX} No new content files found to post.`);
        return;
      }
      console.log(`${LOG_PREFIX} Found ${newContentFiles.length} new content file(s) to process:`, newContentFiles);

      for (const file of newContentFiles) {
        await processArticleFile(file);
      }
      console.log(`${LOG_PREFIX} Finished processing all new content files.`);
    }

    main().catch(error => {
      console.error(`${LOG_PREFIX} Unhandled error in main function:`, error);
      process.exit(1);
    });
    ```

### 4. Docusaurus Configuration (X Card Optimization)

1.  **Verify `docusaurus.config.ts`:**
    *   Ensure that `url`, `baseUrl`, and `themeConfig.image` (e.g., `img/default-social-card.jpg`) are appropriately set for X Card display.
2.  **Verify Article Front Matter:**
    *   For articles intended for posting, ensure `title`, `description`, `image` (optional), and `tags` are properly configured.
3.  **Verify with the X Card Validator:**
    *   After deploying the site, test an article's URL with the [X Card Validator](https://cards-dev.twitter.com/validator).

### 5. Functional Testing

1.  Save changes to the local repository (Git commit).
2.  Push changes to the remote repository.
3.  Add a new test article file to the workflow's trigger branch (either by direct push or merge).
4.  Check the GitHub Actions execution logs.
5.  Verify the post and its X Card display on your X account.
6.  If issues arise, refer to the "Troubleshooting Guide" in section 6.

### 6. Troubleshooting Guide

1.  **Local Development Errors (`docusaurus: not found`, type errors, etc.):**
    *   **Solution:** Perform a full cleanup of Docker containers, host-side `node_modules`/lockfiles/pnpm store, then run `pnpm install` on the host, and rebuild the Docker image with the `--no-cache` option. Restart your IDE/editor.
2.  **`ERR_PNPM_UNEXPECTED_STORE` during pnpm library addition:**
    *   **Solution:** When running `docker-compose run ... pnpm add ...`, specify the build-time store path with `--store-dir <path>`.
3.  **`Resource busy` (`rm -rf node_modules` fails) during pnpm library addition:**
    *   **Solution:** Stop any processes running inside the container (like the dev server). If that doesn't work, stop the container with `docker-compose stop app` before retrying, or delete the target directory/file on the host while the container is stopped.
4.  **`pnpm: command not found` in GitHub Actions:**
    *   **Solution:** Ensure that your workflow file is using `corepack enable` and `corepack prepare pnpm@<version> --activate`.
5.  **Articles not detected in GitHub Actions (`shaBefore is 'undefined'`)**:
    *   **Solution:** In the Node.js script's `getAddedFiles` function, verify the logic that uses `git diff --name-only --diff-filter=A ${GITHUB_SHA}^1 ${GITHUB_SHA}` when `GITHUB_EVENT_BEFORE` is unreliable. Also, ensure the `actions/checkout` step has `fetch-depth: 0` specified.
6.  **Failed to post to X (authentication errors, etc.):**
    *   **Solution:** Verify your GitHub Secrets settings. Confirm that your app's permissions and API keys/tokens are valid in the X Developer Portal. Also, check your X API plan and usage limits. Review the detailed error information from the X API in the script's logs.
7.  **Incorrect X Card display:**
    *   **Solution:** Check the `url`, `baseUrl`, and `themeConfig.image` settings in `docusaurus.config.ts`. Ensure the article's front matter has the `title`, `description`, and `image` fields set correctly. Test with the [X Card Validator](https://cards-dev.twitter.com/validator). Inspect the generated HTML source for the OGP meta tags (`og:title`, `og:description`, `og:image`, etc.).
8.  **Type resolution errors in VS Code (`Cannot find module ...`, etc.):**
    *   **Solution:** Completely restart VS Code. Run `TypeScript: Restart TS server` from the command palette (Ctrl+Shift+P or Cmd+Shift+P).
