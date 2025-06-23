---
title: Integrating Google Analytics (GA4) with Docusaurus
sidebar_position: 10
last_update:
  date: 2025-06-22
tags: [Docusaurus, Google Analytics, GA4, gtag]
---

This guide provides a step-by-step walkthrough for integrating Google Analytics 4 (GA4) into a Docusaurus site to enable access analytics.

**Features:**
*   Integrate Google Analytics 4 (GA4) with your Docusaurus site.
*   Enable site-wide access analytics.

<!-- truncate -->

**References:**
*   **Docusaurus Official Docs (gtag):** [https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)
*   **Google Analytics:** [https://analytics.google.com/](https://analytics.google.com/)

---

### GA Integration Approach: Docusaurus vs. Standard HTML Sites

Docusaurus simplifies GA integration by requiring an edit in just one configuration file. This is because Docusaurus automatically injects the necessary tracking tags into the HTML of every page during the build process.

| Scenario | Standard HTML Site (Manual) | Docusaurus (Automated) |
| :--- | :--- | :--- |
| **Initial Tag Setup** | Manually copy and paste the tracking code into the `<head>` tag of every page. | Simply add the configuration to a single location in `docusaurus.config.ts`. |
| **Files to Edit** | **All HTML files**. | **Only `docusaurus.config.ts`**. |
| **Updating the Tracking ID** | You must modify all HTML files again, which carries a high risk of errors or omissions. | Update **a single line** in `docusaurus.config.ts` to apply the change across the entire site. |
| **Adding New Pages** | The **GA tag must be added** to every new HTML file. | **No action required**. The GA tag is automatically inserted during the build process. |

### GA4 Integration Steps

#### 1. Obtain the Measurement ID from Google Analytics

0.  This guide assumes you have already created a Google Analytics account.
1.  Go to [Google Analytics](https://analytics.google.com/).
2.  Click **[Admin]** in the bottom-left corner.
3.  In the property column, select **[Data Streams]**.
4.  Click on your web stream and copy the **Measurement ID** (which starts with `G-`).

#### 2. Edit the Docusaurus Configuration File

Add the Measurement ID you obtained to the `docusaurus.config.ts` file in your project root.

##### ※ Prerequisite: About Docusaurus's GA4 Plugins

Docusaurus offers two plugins related to Google Analytics.

*   **Recommended: [`@docusaurus/plugin-google-gtag`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)**
    *   The current standard plugin that supports GA4 (IDs starting with `G-`).
*   **Deprecated: [`@docusaurus/plugin-google-analytics`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-analytics)**
    *   An older plugin for the legacy Universal Analytics (IDs starting with `UA-`).
    *   The official documentation states, "This plugin is deprecated and became useless on July 1, 2023." As Universal Analytics was sunset on that date, this plugin is no longer functional.

**Since we are already using `@docusaurus/preset-classic`, there is no need to install `@docusaurus/plugin-google-gtag` separately.**
The classic preset includes the gtag plugin internally, so you can enable GA4 integration just by adding the configuration to `themeConfig`.

#### Editing the Configuration File
The Docusaurus GA integration is disabled in the local development environment (`pnpm start`) and is only enabled for production builds (`pnpm build`).

**`docusaurus.config.ts` Example:**
```typescript
// docusaurus.config.ts
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // ... (existing settings like title, url, etc.)
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
    // Note: Do not place the gtag configuration here (this was the location for the deprecated plugin)
  },

  // ... (existing settings like plugins, etc.)
};

export default config;
```

#### 3. Verify the Integration

After deploying the configuration changes, access your live site and verify the setup using one of the following methods:

1.  **Browser Developer Tools:**
    *   Open the [Network] tab and filter for `collect`.
    *   Confirm that a request to `google-analytics.com/g/collect?...` is made when you navigate between pages.
2.  **Google Analytics Realtime Report:**
    *   In GA, go to [Reports] > [Realtime].
    *   Check if your visit is being tracked in real-time (it may take a few minutes to appear).
3.  **Google Tag Assistant Companion:**
    *   Install the "Tag Assistant Companion" Chrome extension.
    *   Use the Tag Assistant site to analyze your page URL and confirm that the Gtag is correctly identified and firing.
