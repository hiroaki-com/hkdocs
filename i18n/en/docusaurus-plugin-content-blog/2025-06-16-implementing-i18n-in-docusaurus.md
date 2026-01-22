---
title: Procedure for Implementing Multi-language (i18n) Support on a Docusaurus Site
authors: [hk]
tags: [docusaurus, i18n]
---

This article organizes the steps I took to implement multi-language support (i18n) on a Docusaurus site, enabling content switching between Japanese (default) and English.

Based on the official documentation, this guide also includes practical tips for real-world scenarios, such as commands for a Docker environment and reliable methods for verifying functionality before deployment.

**Prerequisites:**

*   **Site Generator:** Docusaurus (project already set up)
*   **Development Environment:** Docker (local environment commands are also provided)
*   **Goal:** To support two languages: Japanese (`ja`) and English (`en`)

<!-- truncate -->

### 1. Update the Docusaurus Configuration File (`docusaurus.config.ts`)

First, enable the multi-language feature in Docusaurus and configure the basic site settings.

1.  Open the `docusaurus.config.ts` (or `.js`) file in your project root.
2.  Add an `i18n` object to define the default language and the languages you support. It is also recommended to set `trailingSlash: true` for URL normalization. This ensures stable routing that doesn't depend on the server environment.

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    import type {Config} from '@docusaurus/types';

    const config: Config = {
      // ...

      // Force a trailing slash at the end of URLs for stable routing
      trailingSlash: true,

      i18n: {
        // The site's default language
        defaultLocale: 'ja',
        // A list of languages supported by the site
        locales: ['ja', 'en'],
        // Detailed settings for each language (labels for the language switcher and the HTML lang attribute)
        localeConfigs: {
          ja: {
            label: '日本語',
            htmlLang: 'ja-JP',
          },
          en: {
            label: 'English',
            htmlLang: 'en-US',
          },
        },
      },

      // ...
    };
    ```

3.  Add `type: 'localeDropdown'` to `themeConfig.navbar.items` to display a language switcher in the header, allowing users to switch languages on the site.

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    // ...
    themeConfig: {
      navbar: {
        items: [
          // ... (existing navigation items)

          // Add the language switcher
          {
            type: 'localeDropdown',
            position: 'right', // or 'left'
          },
        ],
      },
      // ...
    },
    // ...
    ```

### 2. Generate and Translate UI Files

Next, create translation files for common UI elements used throughout the site (e.g., "Previous Page", "Next Page" buttons).

1.  **Run the command to generate translation files**
    In your terminal, run the following command to generate translation templates (JSON files) for the additional language (in this case, English: `en`) in the `i18n/en/` directory.
    ```bash
    # For Docker environments
    docker-compose run --rm app pnpm write-translations --locale en

    # For local environments
    pnpm docusaurus write-translations --locale en
    ```

2.  **Translate the UI text**
    Open the generated JSON files, such as `i18n/en/docusaurus-theme-classic/code.json`, and edit the values corresponding to the `"message"` keys with the appropriate English translations.

### 3. Place Translated Content (The Most Important Step)

This is the most critical step in the internationalization process. Place your translated Markdown files according to the directory structure that Docusaurus recognizes.

1.  **Create directories for translated content**
    It's convenient to create all the directories for your additional language (English) at once from your host machine's terminal.
    ```bash
    # Create directories for English content in docs, blog, and pages
    mkdir -p i18n/en/docusaurus-plugin-content-docs/current \
             i18n/en/docusaurus-plugin-content-blog \
             i18n/en/docusaurus-plugin-content-pages
    ```
    *※ If you are using multiple blog instances, create directories for each (e.g., `docusaurus-plugin-content-blog-diary`)*

2.  **Copy and translate the content**
    > **Advice:** It is strongly recommended to translate just **one page** at first to quickly confirm that the i18n feature is working correctly.

    **Example: Translating `intro.md` in Docs to English**

    1.  **Copy the file:** Copy the default language file `docs/intro.md` to the English directory you just created.
        ```bash
        cp docs/intro.md i18n/en/docusaurus-plugin-content-docs/current/intro.md
        ```
    2.  **Translate the content:** Open the copied file (`i18n/en/.../intro.md`) and rewrite all the Markdown content in English.

    Repeat this process for all other content you want to translate (blog posts, custom pages, etc.).

### 4. Verifying the Setup

Check that your settings have been applied correctly. It's important to use two different methods: a real-time check during development and a final check before deployment.

#### 4.1. Real-time Check During Development

Use this method when you want to check the display of a specific language with hot reloading enabled, such as during translation work.

> **Note:** The development server (`start` command) can only run one language at a time. Also, the `--host 0.0.0.0` option is mandatory to access it from outside a Docker environment.

```bash
# [To develop with the English site]
# Docker environment:
docker-compose run --rm --service-ports app pnpm start --locale en --host 0.0.0.0
# Local environment:
pnpm start --locale en

# [To develop with the Japanese site (default)]
# Docker environment:
docker-compose run --rm --service-ports app pnpm start --host 0.0.0.0
# Local environment:
pnpm start
```

#### 4.2. Final Check Before Deployment

To prevent issues after deployment, perform a final check in your local environment using the same build artifacts as production.

1.  **Install an SPA-compatible server (one-time setup)**
    To replicate production routing issues locally, add `http-server` to your project.
    ```bash
    pnpm add -D http-server
    ```
2.  **Configure the `serve` script (one-time setup)**
    In `package.json`, add a command to the `scripts` section to serve the build artifacts in SPA mode (`--single`).
    ```json:package.json
    "scripts": {
      // ...
      "build": "docusaurus build",
      "serve": "http-server ./build --single"
    }
    ```
3.  **Run the build and preview**
    This procedure is the most reliable final check before deployment.
    ```bash
    # 1. Build the content for all languages
    pnpm build

    # 2. Preview with a production-like server
    pnpm serve
    ```
4.  **Verify in the browser**
    Open your browser and go to `http://localhost:8080` (or the address shown in your terminal). Thoroughly check that the language switcher works correctly across the entire site and that there are no broken URLs or white screens when navigating between pages.

### 5. Deployment

Once the final local check is complete, deploy the generated `build` directory to your production hosting environment (e.g., Google Cloud Run, Vercel, Netlify). If you are using a CI/CD pipeline like GitHub Actions for automatic deployment, commit all your changes up to this point and merge them into the branch that triggers deployment (e.g., `main`).


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
