---
title: A Simple Way to Display 'Last Updated' on Docusaurus Docs Articles
last_update:
  date: '2025-06-23'
tags: [docusaurus, frontmatter]
---

This post outlines a simple implementation for displaying a "Last Updated" date on our Docusaurus documentation articles to indicate the freshness of the information.
Unlike the `Blog` folder, the `Docs` folder does not display creation dates by default, so we decided to add this feature.
We opted for a method using Front Matter, which doesn't rely on Git history and requires no changes to our CI/CD setup.

**References:**
- https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-docs#last_update

<!-- truncate -->

**Prerequisites:**

*   **Site Generator:** Docusaurus v3
*   **Requirement:** Display a last updated date to improve the reliability of documentation articles.
*   **Approach:** Choose a method that is easy to implement and does not affect the CI/CD pipeline.


### 1. Considering Implementation Methods

There are two main ways to display the last updated date in Docusaurus.

#### Method 1: Using Git Commit History (Standard Feature)

This is a standard Docusaurus feature that automatically fetches and displays the last updated time and author from the Git commit history.

*   **Pros:** Very easy to maintain, as a one-time setup automatically updates the date on each Git commit.
*   **Cons:**
    *   It requires an additional setting in the CI/CD environment (e.g., GitHub Actions) to fetch the full repository history (`fetch-depth: 0`).
    *   The displayed date is strictly dependent on the commit date.

#### Method 2: Specifying the Date in Front Matter (Our Chosen Method)

This method involves directly writing the date with a specific key in the Front Matter of each Markdown file.

*   **Pros:**
    *   **No CI/CD configuration changes are needed**, making it very easy to introduce.
    *   The entire process is completed with a simple change to `docusaurus.config.ts` and an addition to the Markdown files.
    *   You have full control over the displayed date, independent of the commit time.
*   **Cons:**
    *   When updating an article, the date in the Front Matter must also be **updated manually**. Forgetting to do so can lead to a mismatch between the content and the displayed date.

This time, we prioritized a method that is easy to implement without affecting our existing deployment workflow, so we chose **Method 2**.

### 2. Updating the Docusaurus Configuration File

Enable the option in Docusaurus to display the last updated date.

1.  Open the `docusaurus.config.ts` file located in the project root.
2.  In the configuration for `presets` -> `'classic'` -> `docs`, add `showLastUpdateTime: true`. Optionally, you can also add `showLastUpdateAuthor: true` to display the author of the update.

    ```typescript:docusaurus.config.ts
    // docusaurus.config.ts
    const config: Config = {
      // ...
      presets: [
        [
          'classic',
          {
            // ...
            docs: {
              sidebarPath: './sidebars.ts',
              editUrl: 'https://github.com/hiroaki-com/hkdocs',
              // --- Add the following lines ---
              showLastUpdateTime: true,
              showLastUpdateAuthor: true, // optional
            },
            // ...
          } satisfies Preset.Options,
        ],
      ],
      // ...
    };
    ```

### 3. Adding Front Matter to Markdown Files

In the Markdown files of the documents where you want to display the last updated date, write the date using a special key that Docusaurus recognizes.

1.  Open the target `.md` file.
2.  In the Front Matter at the top of the file (the part enclosed by `---`), add the `last_update` key, and specify `date` and `author` under it.

    ```markdown:Example: docs/intro.md
    ---
    title: Introduction
    tags: [getting-started]
    # --- Add the following block ---
    last_update:
      date: '2025-06-26'
      author: 'author name'
    ---
    
    This document is...
    ```

If the `last_update` key exists, Docusaurus will prioritize it over the Git commit history for display.

### Conclusion

By simply configuring `docusaurus.config.ts` and adding to the Front Matter of each article, you can easily display a "Last Updated" date on your Docs articles. A major advantage of this method is that it's very easy to implement because it doesn't require any changes to your CI/CD setup.

However, since the date is managed manually, you must be careful not to forget to update the Front Matter when the article content is changed. It's important to weigh the accuracy of information against the ease of maintenance and choose the method that best suits your project.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
