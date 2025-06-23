---
title: How to Integrate Algolia DocSearch into Docusaurus
sidebar_position: 2
last_update:
  date: 2025-06-10
tags: [Docusaurus, Algolia, DocSearch, search]
---

This article outlines the steps and troubleshooting process for setting up a site-wide search feature using Algolia DocSearch.

### A Record of Implementing Algolia DocSearch in Docusaurus

**References:**
- https://docusaurus.io/docs/search
- https://docsearch.algolia.com/docs/api/#indexname

**Service Used:**
- [Algolia DocSearch](https://docsearch.algolia.com/)

<!-- truncate -->

#### 1. Apply for Algolia DocSearch

1.  **Visit the DocSearch Website**
    Navigate to the [official Algolia DocSearch website](https://docsearch.algolia.com/).

2.  **Submit the Application Form**
    Follow the instructions on the site to submit your application, providing your site's URL and repository information.

3.  **Obtain Your Credentials**
    After your application is approved, you will receive the following three pieces of information from Algolia:
    *   `appId` (Application ID)
    *   `apiKey` (Search-Only API Key)
    *   `indexName` (Index Name)

#### 2. Update `docusaurus.config.ts`

1.  **Add Algolia Configuration to the Config File**
    Open the `docusaurus.config.ts` file in your project root and add an `algolia` property within the `themeConfig` object.

2.  **Configure the Settings**
    Set the credentials you obtained in the respective fields.

    ```typescript
    // docusaurus.config.ts
    // ...
    themeConfig: {
      // ...other settings...

      algolia: {
        // The application ID provided by Algolia
        appId: 'YOUR_APP_ID',

        // Public API key: it is safe to commit this
        apiKey: 'YOUR_SEARCH_API_KEY',

        // The name of the Algolia index
        indexName: 'YOUR_INDEX_NAME',

        // Recommended: enable contextual search
        contextualSearch: true,

        // Optional: path for the search page (defaults to 'search')
        searchPagePath: 'search',
      },
    },
    // ...
    ```

#### 3. Indexing by the Algolia Crawler

1.  **Initial Crawl**
    After the DocSearch team completes the crawler setup, your site's content will be indexed for the first time.

2.  **Verify Crawler Configuration**
    If necessary, you can check the crawl target URLs and exclusion settings in the Algolia dashboard.

3.  **Automatic Content Updates**
    After your site is updated, the DocSearch crawler will periodically detect changes and automatically update the search index.

    > **Note**: The search function will not work until the crawl is complete and the data is registered in the index.

#### 4. Verify Functionality

1.  **Start the Local Development Server**
    Run a command like `pnpm start` to start the development server.

2.  **Check the Search UI**
    Confirm that a search box is displayed in the site's navigation bar.

3.  **Test the Search Functionality**
    Enter a keyword and test whether the search results are displayed correctly.

4.  **Build and Deploy**
    After local verification, build the site with `pnpm build` or a similar command and deploy it to your production environment. Re-verify the functionality after deployment.

---

### Addendum: Troubleshooting a Failing Search Function

#### 1. The Issue Encountered

*   **Symptom**
    The search box was visible, but entering a keyword only returned the site title. The content of articles and individual pages was not being indexed or searched.
*   **Attempted Fixes**
    Manually triggering crawls from the Algolia dashboard and modifying the CSS selectors in the crawler configuration did not resolve the issue.
*   **Error**
    The crawler log showed a `Too many missing records` error. The index update was being blocked by a safety mechanism because the new crawl retrieved zero records.

#### 2. The Cause

**The Algolia crawler was navigating the site without executing JavaScript.**

Docusaurus v3 is a Single-Page Application (SPA) that renders content dynamically using JavaScript. The default crawler configuration (`renderJavaScript: false`) was only reading the initial HTML (which is an empty shell), meaning there was no text content available to be indexed.

#### 3. The Solution

**Modify the Algolia crawler configuration.**

1.  Open the configuration editor for the target crawler in the Algolia dashboard.
2.  Change the `renderJavaScript: false` setting to `true`.

    ```javascript
    // Algolia crawler configuration file
    new Crawler({
      // ...
      renderJavaScript: true,
      // ...
    });
    ```

This change enabled the crawler to read the fully rendered HTML after JavaScript execution, allowing the CSS selectors to correctly extract the body content.

#### 4. Lessons Learned

*   When applying Algolia to SPAs like Docusaurus v2+, React, or Vue, setting `renderJavaScript: true` is likely mandatory.
*   If your selectors are correct but no data is being extracted, the first thing to check is the crawler's JavaScript rendering setting.
*   Using the crawler's test run feature ("Run a test") to inspect the raw HTML it retrieves is extremely effective for diagnosing the problem.
