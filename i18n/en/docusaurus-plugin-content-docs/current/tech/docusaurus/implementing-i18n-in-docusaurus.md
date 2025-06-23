---
title: How to Implement Multilingual Support (i18n) in a Docusaurus Site
sidebar_position: 7
tags: [Docusaurus, i18n]
---

This article provides a comprehensive guide on implementing multilingual support (i18n) in a Docusaurus site, focusing on setting up Japanese (default) and English content that can be toggled by the user.

Based on the official documentation, this guide also includes practical tips for using Docker commands and performing robust pre-deployment verification.

**Prerequisites:**

*   **Site Generator:** Docusaurus (project already set up)
*   **Development Environment:** Docker (local environment commands are also provided)
*   **Goal:** To support two languages: Japanese (`ja`) and English (`en`)

<!-- truncate -->

### 1. Update the Docusaurus Configuration File (`docusaurus.config.ts`)

First, enable the i18n feature in Docusaurus and configure the basic site settings.

1.  Open the `docusaurus.config.ts` (or `.js`) file in your project root.
2.  Add an `i18n` object to define the default locale and the list of supported locales. It is also recommended to set `trailingSlash: true` for URL normalization. This ensures stable routing that is independent of the server environment.

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    import type {Config} from '@docusaurus/types';

    const config: Config = {
      // ...

      // Enforce a trailing slash to stabilize routing
      trailingSlash: true,

      i18n: {
        // The default language of the site
        defaultLocale: 'ja',
        // The list of languages the site supports
        locales: ['ja', 'en'],
        // Detailed configuration for each language (e.g., labels for the language switcher, HTML lang attribute)
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
            position: 'right', // 'left' is also an option
          },
        ],
      },
      // ...
    },
    // ...
    ```

### 2. Generate and Translate UI Files

Next, create translation files for common UI elements used across the site (e.g., "Previous Page", "Next Page" buttons).

1.  **Run the Translation File Generation Command**
    Execute the following command in your terminal to generate translation templates (JSON files) for the additional language (in this case, English: `en`) in the `i18n/en/` directory.
    ```bash
    # For Docker environments
    docker-compose run --rm app pnpm write-translations --locale en

    # For local environments
    pnpm docusaurus write-translations --locale en
    ```

2.  **Translate UI Text**
    Open the generated JSON files, such as `i18n/en/docusaurus-theme-classic/code.json`, and edit the values corresponding to the `"message"` key with the appropriate English translations.

### 3. Place Translated Content (Most Critical Step)

This is the most crucial step in the i18n process. Place your translated Markdown files in the correct directory structure so Docusaurus can recognize them.

1.  **Create Directories for Translated Content**
    It's convenient to create the directories for the additional language's content all at once from your host machine's terminal.
    ```bash
    # Create directories for English content for docs, blog, and pages
    mkdir -p i18n/en/docusaurus-plugin-content-docs/current \
             i18n/en/docusaurus-plugin-content-blog \
             i18n/en/docusaurus-plugin-content-pages
    ```
    *Note: If you are using multiple blog instances, create directories for each (e.g., `docusaurus-plugin-content-blog-diary`)*.

2.  **Copy and Translate Content**
    > **Advice:** It is strongly recommended to start by translating just **one page** to quickly verify that the i18n feature is working correctly.

    **Example: Translating `docs/intro.md` to English**

    1.  **Copy the file:** Copy the default language file `docs/intro.md` to the English content directory you just created.
        ```bash
        cp docs/intro.md i18n/en/docusaurus-plugin-content-docs/current/intro.md
        ```
    2.  **Translate the content:** Open the copied file (`i18n/en/.../intro.md`) and translate all of its Markdown content into English.

    Repeat this process for all other content you wish to translate, including blog posts and custom pages.

### 4. Verify Your Setup

Confirm that your settings have been applied correctly. It's important to use two different methods for verification: real-time checks during development and a final check before deployment.

#### 4.1. Real-Time Verification During Development

Use this method when you are actively translating and want to see your changes with hot-reloading for a specific language.

> **Note:** The development server (`start` command) can only run one language at a time. The `--host 0.0.0.0` option is required for external access in a Docker environment.

```bash
# [To develop with the English site]
# Docker environment:
docker-compose run --rm --service-ports app pnpm start --locale en --host 0.0.0.0
# Local environment:
pnpm start --locale en

# [To develop with the Japanese (default) site]
# Docker environment:
docker-compose run --rm --service-ports app pnpm start --host 0.0.0.0
# Local environment:
pnpm start
```

#### 4.2. Final Verification Before Deployment

To prevent issues after deployment, perform a final check locally using the same build artifacts as your production environment.

1.  **Install an SPA-Compatible Server (First Time Only)**
    To replicate production routing behavior locally, add `http-server` to your project.
    ```bash
    pnpm add -D http-server
    ```
2.  **Configure the `serve` Script (First Time Only)**
    Add a command to your `package.json` `scripts` to serve the build artifacts in SPA mode (`--single`).
    ```json:package.json
    "scripts": {
      // ...
      "build": "docusaurus build",
      "serve": "http-server ./build --single"
    }
    ```
3.  **Build and Run the Preview**
    This is the most reliable final check before deployment.
    ```bash
    # 1. Build the content for all languages
    pnpm build

    # 2. Preview with a production-like server
    pnpm serve
    ```
4.  **Verify in the Browser**
    Access `http://localhost:8080` (or the address shown in your terminal). Thoroughly check that the language switcher works correctly across the entire site and that there are no routing issues or blank screens when navigating.

### 5. Deploy

Once the final local verification is complete, deploy the generated `build` directory to your production hosting environment (e.g., Google Cloud Run, Vercel, Netlify). If you are using automated deployment with GitHub Actions, commit all your changes and merge them into the branch that triggers deployment (e.g., `main`).
