---
title: How to Internationalize the Docusaurus Navbar and Footer
authors: [hk]
tags: [docusaurus, i18n, react, typescript, workflow]
---

This post is a memo organizing the process of internationalizing (i18n) the main UI components of a Docusaurus site: the `navbar` and `footer`.

#### 1. Purpose

The Docusaurus i18n feature is a mechanism for making site text multi-lingual. This time, I'll explain the process of adding new items to the `navbar` and `footer` and translating them from Japanese (the default) to English.

<!-- truncate -->

1.  Centralized Management of Original Text
    All original text for translation is managed within the `docusaurus.config.ts` file. This allows for a single point of reference for the site's structure and wording.

2.  Automatic Generation of Translation Files
    Using Docusaurus's CLI commands, text that needs translation is automatically extracted, generating language-specific translation files (in JSON format).

3.  Simple Translation Workflow
    The translation is completed simply by editing a specific field (`message`) in the generated JSON files.

#### 2. Internationalization Workflow

As an example, I'll explain the steps to add a new link called "Portfolio" to the navbar and footer and translate it into English.

##### Step 1: Edit the Original Text (Japanese)

Add the new item to the site's master configuration file, `docusaurus.config.ts`.

1.  Open `docusaurus.config.ts`.
2.  Add an item to the navbar. In the `themeConfig.navbar.items` array, write a new link object.

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

3.  Add an item to the footer. Similarly, write a link in the `themeConfig.footer.links` array.

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

##### Step 2: Update Translation Files

Reflect the changes from `docusaurus.config.ts` in the translation files.

1.  Run the CLI command. In the terminal, execute the following command to extract the newly added text for translation.

    ```bash
    docker-compose run --rm app pnpm write-translations --locale en
    ```

2.  Update the translation files. Upon successful command execution, new translation keys will be automatically added to `navbar.json` and `footer.json` under `i18n/en/docusaurus-theme-classic/`.

##### Step 3: Translate into English

Write the English translation for the newly added keys.

1.  Translate the navbar. Open `navbar.json` and rewrite the `message` for `item.label.ポートフォリオ` in English.

    ```json:title=i18n/en/docusaurus-theme-classic/navbar.json
    "item.label.ポートフォリオ": {
      "message": "Portfolio", // ← Edit this
      "description": "Navbar item with label ポートフォリオ"
    }
    ```

2.  Translate the footer. Open `footer.json` and edit the `message` for `link.item.label.ポートフォリ`.

    ```json:title=i18n/en/docusaurus-theme-classic/footer.json
    "link.item.label.ポートフォリオ": {
      "message": "Portfolio", // ← Edit this
      "description": "The label of footer link with label=ポートフォリオ linking to /portfolio"
    }
    ```

##### Step 4: Verify the Translation

Create a production build to check if the edited translations are displayed correctly on the site.

1.  Build the site. Generate the static files for all languages with the following command.

    ```bash
    docker-compose run --rm app pnpm build
    ```

2.  Start the preview server. Serve the generated `build` directory.

    ```bash
    docker-compose run --rm --service-ports app pnpm exec http-server build --single --port 3000 --host 0.0.0.0
    ```

3.  Verify in the browser.
    *   Access `http://localhost:3000/en/`.
    *   Confirm that the "Portfolio" link is displayed in the navbar and footer.
    *   Use the language switcher in the top-right corner of the site to switch between languages and check that both displays are as intended.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
