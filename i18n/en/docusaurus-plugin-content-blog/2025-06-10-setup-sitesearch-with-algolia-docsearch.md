---
title: How to Integrate Algolia DocSearch with Docusaurus
authors: [hk]
tags: [docusaurus]
---

This article organizes the steps and troubleshooting process I went through when setting up a site search feature using Algolia DocSearch.

### A Record of Implementing Algolia DocSearch in Docusaurus

References:
- https://docusaurus.io/docs/search
- https://docsearch.algolia.com/docs/api/#indexname

Service Used:
- [Algolia DocSearch](https://docsearch.algolia.com/)

<!-- truncate -->

#### 1. Applying for Algolia DocSearch

1.  **Access the Official DocSearch Website**
    Go to the [official Algolia DocSearch website](https://docsearch.algolia.com/).

2.  **Submit the Application Form**
    Follow the site's instructions to apply, entering your site's URL and repository information.

3.  **Receive Key Information**
    After your application is approved, you will receive the following three pieces of information from Algolia:
    *   `appId` (Application ID)
    *   `apiKey` (Search-Only API Key)
    *   `indexName` (Index Name)

#### 2. Update `docusaurus.config.ts`

1.  **Add `algolia` Configuration to the Config File**
    Open `docusaurus.config.ts` in your project root and add the `algolia` property within the `themeConfig` object.

2.  **Configuration Details**
    Set the key information you received for each item.

    ```typescript
    // docusaurus.config.ts
    // ...
    themeConfig: {
      // ...other settings...

      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',

        // Public API key: it is safe to commit it
        apiKey: 'YOUR_SEARCH_API_KEY',

        // The index name for your site
        indexName: 'YOUR_INDEX_NAME',

        // Recommended: enable contextual search
        contextualSearch: true,

        // Optional: path for the search page (defaults to 'search')
        searchPagePath: 'search',
      },
    },
    // ...
    ```

#### 3. Index Creation by the Algolia Crawler

1.  **Initial Crawl**
    After the DocSearch team completes the crawler setup, your site's content will be initially indexed by Algolia.

2.  **Check Crawler Settings**
    If necessary, you can check the URLs to be crawled, exclusion settings, and more from the Algolia dashboard.

3.  **Automatic Content Updates**
    After you update your site, the DocSearch crawler will periodically detect changes and automatically update the search index.

    > **Note**: The search function will not work until the crawl is complete and data is registered in the index.

#### 4. Verify Operation

1.  **Start the Local Development Server**
    Start your development server with a command like `pnpm start`.

2.  **Check Search UI Display**
    Confirm that the search box is displayed in your site's navigation bar.

3.  **Test the Search Functionality**
    Enter keywords and test whether the search results are displayed correctly.

4.  **Build and Deploy**
    After confirming locally, build your site with a command like `pnpm build` and deploy it to your production environment. Re-verify that it works after deployment.

---

### Addendum: Search Malfunction and Resolution

#### 1. The Issue That Occurred

*   **Symptom**
    The search box appeared, but entering keywords only returned the site title. The content of articles and individual pages was not being searched.
*   **Attempts**
    Manually triggering crawls from the Algolia dashboard and modifying the CSS selectors in the crawler configuration did not fix the issue.
*   **Error**
    The crawler logs showed a `Too many missing records` error. Because the new crawl fetched 0 records, a safety mechanism blocked the index update.

#### 2. Cause

**The Algolia crawler was crawling the site without executing JavaScript.**

Docusaurus v3 is an SPA (Single Page Application) that renders content dynamically using JavaScript. The default crawler setting (`renderJavaScript: false`) was reading the initial HTML (which is empty) before JavaScript execution, so there was no text content to be indexed.

#### 3. Solution

**Change the Algolia crawler settings.**

1.  Open the settings editor for the relevant crawler in your Algolia dashboard.
2.  Change the `renderJavaScript: false` setting to `true`.

    ```javascript
    // Algolia crawler configuration file
    new Crawler({
      // ...
      renderJavaScript: true,
      // ...
    });
    ```

This change forces the crawler to load the fully rendered HTML after JavaScript has executed, allowing the CSS selectors to correctly extract the body content.

#### 4. Lessons Learned

*   When applying Algolia to SPAs like Docusaurus v2+, React, or Vue, the `renderJavaScript: true` setting is likely mandatory.
*   If your selectors are correct but no data is being extracted, first check the crawler's JavaScript rendering setting.
*   Using the crawler's "Run a test" feature to inspect the raw HTML it fetches is extremely useful for troubleshooting and isolating the problem.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
