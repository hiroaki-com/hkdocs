---
title: Integrating Google Analytics (GA4) with Docusaurus
authors: [hk]
tags: [Docusaurus, Google Analytics, GA4, gtag]
---

This post outlines the setup procedure for integrating Google Analytics 4 (GA4) into our Docusaurus site for traffic analysis, serving as a technical memo.

**Features:**
*   Integrate Google Analytics 4 (GA4) with a Docusaurus site.
*   Enable site-wide traffic analysis.

<!-- truncate -->

**References:**
*   **Docusaurus Official Documentation (gtag):** [https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)
*   **Google Analytics:** [https://analytics.google.com/](https://analytics.google.com/)

---

### GA Integration Approach: Docusaurus vs. Standard HTML Sites

With Docusaurus, you can integrate GA by editing a single configuration file. This is because Docusaurus automatically injects the necessary tags into the HTML of all pages during the build process.

| Scenario | Standard HTML Site (Manual) | Docusaurus (Automated) |
| :--- | :--- | :--- |
| **When Adding the Tag** | Manually copy and paste the tracking code into the `<head>` tag of every page. | Simply add the configuration to one place in `docusaurus.config.ts`. |
| **Files to Modify** | **All HTML files**. | **Only `docusaurus.config.ts`**. |
| **When Changing the ID** | You need to modify all HTML files again, with a high risk of missing some. | Just **modify one line** in `docusaurus.config.ts` to apply the change site-wide. |
| **When Adding a New Page** | You **must add the GA tag** to the newly created HTML file. | **No action required**. The GA tag is automatically inserted during the build process. |

### GA4 Integration Steps

#### 1. Get the Measurement ID from Google Analytics

0.  This guide assumes you have already created a Google Analytics account.
1.  Go to [Google Analytics](https://analytics.google.com/).
2.  Click **[Admin]** in the bottom-left corner.
3.  In the target property, select **[Data Streams]**.
4.  Click on the target web stream and copy the **Measurement ID (an ID starting with `G-`)**.

#### 2. Edit the Docusaurus Configuration File

Set the obtained Measurement ID in `docusaurus.config.ts` at the project root.

##### ※ Prerequisite: About Docusaurus's GA4 Integration Plugins

Docusaurus has two Google Analytics-related plugins.

*   **Recommended: [`@docusaurus/plugin-google-gtag`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)**
    *   The current standard plugin that supports GA4 (IDs starting with `G-`).
*   **Deprecated: [`@docusaurus/plugin-google-analytics`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-analytics)**
    *   A plugin for the older Universal Analytics (IDs starting with `UA-`).
    *   The official documentation states, "This plugin is deprecated and became useless on July 1, 2023." As Universal Analytics itself was discontinued on July 1, 2023, this plugin is no longer usable.

**Since we are already using `@docusaurus/preset-classic`, there is no need to install `@docusaurus/plugin-google-gtag` separately.**
The `preset-classic` includes the gtag plugin internally, so you can integrate with GA4 simply by adding the `gtag` configuration within the preset options.

#### Editing the Docusaurus Configuration File
Docusaurus's GA integration feature is disabled in the local development environment (`pnpm start`) and is only enabled for production builds (`pnpm build`).

**`docusaurus.config.ts` Example:**
```typescript
// docusaurus.config.ts
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // ... (existing settings like title, url)
  presets: [
    [
      'classic',
      {
        // ▼▼▼ Add the gtag configuration here ▼▼▼
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // Replace with the Measurement ID from step 1
          anonymizeIP: true,
        },
        // ...
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Note: Do not write the gtag configuration here (this was the location for the deprecated version)
  },

  // ... (existing settings like plugins)
};

export default config;
```

#### 3. Verify the Setup

After deploying the changes, access your public site and verify the setup using one of the following methods.

1.  **Browser Developer Tools:**
    *   Open the [Network] tab and filter by `collect`.
    *   Confirm that a request to `google-analytics.com/g/collect?...` is made when you navigate between pages.
2.  **Google Analytics Realtime Report:**
    *   In GA, go to [Reports] > [Realtime].
    *   Check that your own visit is being tracked in real-time (it may take a few minutes to appear).
3.  **Google Tag Assistant Companion:**
    *   Install the "Tag Assistant Companion" Chrome extension.
    *   On the Tag Assistant website, enter the URL of the page you want to debug and check if the Gtag is correctly identified and firing.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
