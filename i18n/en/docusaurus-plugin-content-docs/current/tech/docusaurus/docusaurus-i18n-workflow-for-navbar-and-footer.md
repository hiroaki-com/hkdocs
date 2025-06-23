---
title: How to Internationalize (i18n) the Navbar and Footer in Docusaurus
sidebar_position: 9
tags: [Docusaurus, i18n, React, TypeScript, workflow]
---

This guide documents the process for internationalizing (i18n) the main UI components of a Docusaurus site: the `Navbar` and `Footer`.

#### 1. Objective

Docusaurus's i18n feature allows you to adapt your site's text for multiple languages. This guide explains the workflow for adding a new item to the `Navbar` and `Footer` and translating it from the default language (Japanese) to English.

<!-- truncate -->

1.  **Centralized Source of Truth**
    All source text for translation is managed within the `docusaurus.config.ts` file. This provides a single place to view the site's structure and wording.

2.  **Automated Translation File Generation**
    The Docusaurus CLI automatically extracts text that needs translation and generates language-specific JSON files.

3.  **Simplified Translation Process**
    Translation is completed by simply editing a specific field (`message`) in the generated JSON files.

#### 2. Internationalization Workflow

As an example, we will walk through the steps to add a new "Portfolio" link to the navbar and footer and then translate it into English.

##### Step 1: Edit the Source Text (Japanese)

First, add the new item to the master configuration file, `docusaurus.config.ts`.

1.  Open `docusaurus.config.ts`.
2.  Add the new item to the navbar. In the `themeConfig.navbar.items` array, add a new link object.

    ```typescript:title=docusaurus.config.ts
    // ...
    navbar: {
      // ...
      items: [
        // ...existing items...
        { to: '/blog', label: 'ブログ', position: 'left' },
        { to: '/portfolio', label: 'ポートフォリオ', position: 'left' }, // ← Add this line
        { to: '/diary', label: '日記', position: 'left' },
        // ...
      ],
    },
    // ...
    ```

3.  Add the item to the footer. Similarly, add the link to the `themeConfig.footer.links` array.

    ```typescript:title=docusaurus.config.ts
    // ...
    footer: {
      // ...
      links: [
        {
          title: 'コンテンツ',
          items: [
            // ...existing items...
            {
              label: 'ポートフォリオ', // ← Add this object
              to: '/portfolio',
            },
            // ...
          ],
        },
        // ...
      ],
    },
    // ...
    ```

##### Step 2: Update the Translation Files

Reflect the changes from `docusaurus.config.ts` into the translation files.

1.  Run the CLI command. In your terminal, execute the following command to extract the newly added text for translation.

    ```bash
    docker-compose run --rm app pnpm write-translations --locale en
    ```

2.  Check the updated files. Upon successful execution, new translation keys will be automatically added to `navbar.json` and `footer.json` located in the `i18n/en/docusaurus-theme-classic/` directory.

##### Step 3: Translate into English

Provide the English translation for the newly added keys.

1.  Translate the navbar item. Open `navbar.json` and change the `message` for `item.label.ポートフォリオ` to its English equivalent.

    ```json:title=i18n/en/docusaurus-theme-classic/navbar.json
    "item.label.ポートフォリオ": {
      "message": "Portfolio", // ← Edit this line
      "description": "Navbar item with label ポートフォリオ"
    }
    ```

2.  Translate the footer item. Open `footer.json` and edit the `message` for `link.item.label.ポートフォリオ`.

    ```json:title=i18n/en/docusaurus-theme-classic/footer.json
    "link.item.label.ポートフォリオ": {
      "message": "Portfolio", // ← Edit this line
      "description": "The label of footer link with label=ポートフォリオ linking to /portfolio"
    }
    ```

##### Step 4: Verify the Translation

Confirm that the translated text appears correctly on the site by creating a production build.

1.  Build the site. Generate the static files for all languages with the following command.

    ```bash
    docker-compose run --rm app pnpm build
    ```

2.  Start the preview server. Serve the generated `build` directory.

    ```bash
    docker-compose run --rm --service-ports app pnpm exec http-server build --single --port 3000 --host 0.0.0.0
    ```

3.  Check in the browser.
    *   Navigate to `http://localhost:3000/en/`.
    *   Confirm that the "Portfolio" link is visible in the navbar and footer.
    *   Use the language switcher in the top-right corner to toggle between languages and ensure both versions display as intended.

