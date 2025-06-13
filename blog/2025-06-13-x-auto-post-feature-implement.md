---
title: Github Actions 新規の記事を検知し、TwitterカードとしてXへPOSTする実装の記録
authors: [hk]
tags: [Github Actions, Twitter API, Twiter Card, Docuzaurus]
---

この記事では、Github Actions 新規の記事を検知し、TwitterカードとしてXへPOSTする実装した際の手順とトラブルシューティングの記録を整理します。

機能：
Github Actions で新規投稿を検知し、TwitterカードとしてXへPOSTする

<!-- truncate -->

参考：
Twitter API v2
https://developer.x.com/ja/docs/x-api

Search engine optimization (SEO)
https://docusaurus.io/docs/seo



## X自動投稿機能の実装記録

### 1. 事前準備

1.  **Xデベロッパーアプリと認証情報:**
    *   X Developer Portalでアプリ作成済み。
    *   アプリ権限: 「Read and Write」設定済み。
    *   API Key, API Key Secret, Access Token, Access Token Secret 取得済み。
2.  **GitHub Secrets:**
    リポジトリ `Settings` > `Secrets and variables` > `Actions` に以下を登録済み。
    *   `X_API_KEY`
    *   `X_API_SECRET`
    *   `X_ACCESS_TOKEN`
    *   `X_ACCESS_TOKEN_SECRET`
    *   `SITE_URL` (例: `https://hkdocs.com/`)
    *   `BASE_URL` (例: `/`)

### 2. ローカル開発環境と依存関係の設定

1.  **開発環境クリーンアップ (必要な場合):**
    *   Dockerコンテナ完全停止:
        ```bash
        docker-compose down --volumes --remove-orphans
        ```
    *   ホスト側 `node_modules`, `pnpm-lock.yaml`, `.pnpm-store` (存在すれば) 削除。
    *   ホスト側で `pnpm install` 実行 (これにより `pnpm-lock.yaml` 再生成)。
    *   Dockerイメージ再ビルド:
        ```bash
        docker-compose build --no-cache app
        ```
2.  **必要ライブラリ (`gray-matter`, `twitter-api-v2`) インストール:**
    *   以下のコマンドを実行:
        ```bash
        docker-compose run --rm app sh -c "pnpm add -D gray-matter twitter-api-v2 --store-dir /root/.local/share/pnpm/store/v10 && echo 'Libraries added successfully.'"
        ```
    *   (注: `--store-dir` のパスはビルド環境のpnpmグローバルストアパスです。必要に応じて調整してください。)
3.  **Dockerイメージ再ビルド:**
    *   以下のコマンドを実行:
        ```bash
        docker-compose build app
        ```

### 3. GitHub Actions自動投稿機能の実装

1.  **ワークフローファイル作成:**
    `.github/workflows/post-to-x.yml` を以下の内容で作成。
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
              node-version: '22.16.0' # 使用するNode.jsのバージョンに合わせてください

          - name: Enable Corepack and Set up PNPM
            run: |
              corepack enable
              corepack prepare pnpm@10.11.0 --activate # 使用するpnpmのバージョンに合わせてください
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
2.  **投稿処理スクリプト作成:**
    `.github/scripts/post-new-articles.js` を以下の内容で作成。
    ```javascript
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

### 4. Docusaurus設定 (Xカード最適化)

1.  **`docusaurus.config.ts` 確認:**
    *   `url`, `baseUrl`, `themeConfig.image` (例: `img/default-social-card.jpg`) 等がXカード表示に適しているか確認。
2.  **記事フロントマター確認:**
    *   投稿対象記事ファイルで `title`, `description`, `image` (任意), `tags` を適切に設定。
3.  **X Card Validatorでの確認:**
    *   サイトデプロイ後、記事URLを [X Card Validator](https://cards-dev.twitter.com/validator) でテスト。

### 5. 動作テスト

1.  ローカルリポジトリに変更を保存 (Gitコミット)。
2.  変更をリモートリポジトリへプッシュ。
3.  テスト用新規記事ファイルをワークフローのトリガーブランチへ追加 (直接プッシュまたはマージ)。
4.  GitHub Actions実行ログ確認。
5.  Xアカウントで投稿内容とXカード表示確認。
6.  問題発生時は「6. トラブルシューティングガイド」参照。



### 6. トラブルシューティングの記録

1.  **ローカル開発環境エラー (`docusaurus: not found`, 型エラー等):**
    *   **解決策:** Dockerコンテナ、ホスト側 `node_modules`/ロックファイル/pnpmストアの完全クリーンアップ後、ホストで `pnpm install` を実行し、Dockerイメージを `--no-cache` オプション付きで再ビルドします。IDE/エディタを再起動してください。
2.  **pnpmライブラリ追加時 `ERR_PNPM_UNEXPECTED_STORE`:**
    *   **解決策:** `docker-compose run ... pnpm add ...` 実行時に `--store-dir <path>` でビルド時のストアパスを指定します。
3.  **pnpmライブラリ追加時 `Resource busy` (`rm -rf node_modules` 失敗):**
    *   **解決策:** コンテナ内のプロセス (開発サーバー等) を停止します。それでも解決しない場合は、`docker-compose stop app` コマンドでコンテナを停止後に再試行するか、コンテナ停止中にホスト側で対象ディレクトリ/ファイルを削除します。
4.  **GitHub Actionsで `pnpm: command not found`:**
    *   **解決策:** ワークフローファイルで `corepack enable` と `corepack prepare pnpm@<version> --activate` を使用しているか確認してください。
5.  **GitHub Actionsで記事未検知 (`shaBefore is 'undefined'`)**:
    *   **解決策:** Node.jsスクリプトの `getAddedFiles` 関数で、`GITHUB_EVENT_BEFORE` が信頼できない場合に `git diff --name-only --diff-filter=A ${GITHUB_SHA}^1 ${GITHUB_SHA}` を使用するロジックを確認してください。また、`actions/checkout` ステップで `fetch-depth: 0` が指定されているか確認してください。
6.  **Xへの投稿失敗 (認証エラー等):**
    *   **解決策:** GitHub Secretsの設定内容を確認してください。X Developer Portalでアプリの権限設定とAPIキー/トークンが有効であるか確認してください。X APIのプランと利用制限も確認してください。スクリプトのログに出力されるX APIからのエラー詳細情報を確認してください。
7.  **Xカード表示不正:**
    *   **解決策:** `docusaurus.config.ts` の `url`, `baseUrl`, `themeConfig.image` 設定を確認してください。記事のフロントマターで `title`, `description`, `image` が適切に設定されているか確認してください。[X Card Validator](https://cards-dev.twitter.com/validator) でテストしてください。生成されたHTMLソースのOGPメタタグ (`og:title`, `og:description`, `og:image` 等) を確認してください。
8.  **VS Codeでの型解決エラー (`Cannot find module ...` 等):**
    *   **解決策:** VS Codeを完全に再起動してください。コマンドパレット (Ctrl+Shift+P または Cmd+Shift+P) から `TypeScript: Restart TS server` を実行してください。

