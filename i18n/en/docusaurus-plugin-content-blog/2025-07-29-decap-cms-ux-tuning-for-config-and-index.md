---
title: Optimizing Decap CMS UX with config.yml and index.html Improvements
authors: [hk]
tags: [docusaurus, decap-cms, ux, css, javascript]
---

In a previous article, I explained [how to integrate Decap CMS into a Docusaurus site](i18n/en/docusaurus-plugin-content-blog/2025-07-27-docusaurus-decap-cms-with-cloud-run-and-netlify.md). While the integration established a foundation for content updates, I felt there was room for improvement in daily use, especially regarding mobile usability and the efficiency of routine data entry.

This article introduces the practical customizations I applied to [**`static/admin/config.yml`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/config.yml) and [**`static/admin/index.html`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/index.html) to address these challenges.

-   **Optimizing `config.yml`**: Settings to reduce manual input and prevent errors.
-   **Modifying `index.html`**: Adding CSS and JavaScript to improve mobile usability.

These tunings have created an environment where I can comfortably update articles not only from a PC but also from a smartphone. I hope this serves as a useful example of leveraging the high customizability of a Git-based CMS.

<!-- truncate -->

### **1. Improving Operational Efficiency with `config.yml`**

[**`config.yml`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/config.yml) is a flexible configuration file that allows you not only to define CMS fields and save locations but also to implement "tricks" to streamline daily operations.

#### Tweak 1: Automating Commit Messages to Comply with Conventional Commits

When content is updated via the CMS, a Git commit history is created. To make this history easy to review later, I configured it to automatically generate messages that follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.

In the `commit_messages` section, you can specify a message template for each action, such as `create` or `update`. Placeholders like `{{slug}}` and `{{path}}` can be used, making it clear at a glance which file was manipulated.

```yaml title="static/admin/config.yml"
backend:
  name: git-gateway
  branch: main
  # Customize commit messages to follow the convention
  commit_messages:
    create: 'docs(diary): add new entry "{{slug}}"'
    update: 'docs(diary): revise entry "{{slug}}"'
    delete: 'docs(diary): remove entry "{{slug}}"'
    uploadMedia: 'docs(assets): add media "{{path}}"'
    deleteMedia: 'docs(assets): remove media "{{path}}"'
```

This allows me to maintain a log quality comparable to manual commits, even for updates made via the CMS.

#### Tweak 2: Enhancing the Writing Experience by Automating Routine Tasks

For content like a daily diary, automating a few tasks can significantly improve the writing experience.

-   **Automatic file naming**: By specifying a date-based template (`{{year}}-{{month}}-{{day}}`) for the `slug`, I eliminated the need to manually name files and ensured a consistent naming convention.
-   **Writing template insertion**: By setting a `default` value for the `body` field with predefined headings, the template is automatically inserted when creating a new entry, allowing me to start writing immediately.
-   **Real-time preview activation**: Setting `editor: preview: true` allows me to see a real-time preview in an adjacent pane as I write Markdown.

```yaml title="static/admin/config.yml"
collections:
  - name: "diary"
    label: "Diary"
    folder: "diary"
    create: true
    slug: "{{year}}-{{month}}-{{day}}" # Automatically generate file names based on the date
    editor:
      preview: true  # Enable Markdown preview
    fields:
      # ... (omitted) ...
      - label: "Body"
        name: "body"
        widget: "markdown"
        # Template inserted automatically on new entry creation
        default: "### About the weather\n\n\n<!-- truncate -->\n\n\n### About my physical condition\n\n\n### About my work\n\n\n### Other\n\n"
```

These settings allow me to focus on the content itself without interrupting my train of thought.

#### Tweak 3: Automating Repetitive Input with Hidden Fields

Since I am always the author of my articles, entering it every time is inefficient. Such fixed values can be set automatically without being visible on the user's screen by combining `widget: "hidden"` and `default`.

```yaml title="static/admin/config.yml"
# ...
fields:
  - label: "Authors"
    name: "authors"
    widget: "hidden" # Hide from the UI
    default: ["hk"]   # Set a default value
```

This allows the user to attach necessary metadata without even thinking about it.

---

### **2. Improving Mobile UX with `index.html`**

The default UI of Decap CMS is primarily designed for PC use, and its usability on smartphones had room for improvement. To solve this problem, I improved the mobile experience by directly writing custom CSS and JavaScript in [**`index.html`**](https://github.com/hiroaki-com/hkdocs/blob/main/static/admin/index.html).

#### Tweak 1: Overall UI Optimization with Custom CSS

Inside the `<style>` tag of `index.html`, I've added styles for smartphones using a media query (`@media (max-width:799px)`). In addition to responsive design, I've made several detailed adjustments.

-   **Layout adjustments**: I adjusted the size of buttons and input forms and hid unnecessary UI elements to maximize screen space.
-   **Preventing auto-zoom on iOS**: By setting the `font-size` of `input` and `textarea` to `16px` or more, I suppressed the behavior where the screen automatically zooms in when a form is selected.
-   **Standardizing the layout model**: Applying `box-sizing: border-box;` globally prevents unintended layout shifts caused by CSS customizations.
-   **Font optimization**: By specifying system fonts (`-apple-system`, `Roboto`, etc.), I achieved a natural and readable display on each OS.

```html title="Snippet from static/admin/index.html"
<style>
  @media (max-width:799px){
    /* ...Layout adjustment CSS... */
    [data-slate-editor="true"], input, textarea {
      font-size: 16px !important;
    }
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans JP', 'Yu Gothic UI', Roboto, sans-serif;
  }
</style>
```

#### Tweak 2: Improving Interaction with JavaScript

I've also used JavaScript to make improvements related to usability, not just appearance.

-   **Disabling "Pull-to-Refresh"**: This prevents the page from reloading when accidentally swiping down while editing on a mobile browser, which could cause data loss. It monitors `touchstart` and `touchmove` events to cancel only downward swipes at the very top of the page.
-   **Automatic redirect after logout**: After the logout process is complete, it automatically redirects the user to the login page (`/admin/`). This eliminates any confusion about the next action to take.

```html title="Snippet from static/admin/index.html"
<script>
  (function() {
    function preventPullToRefresh() {
      // ... Pull-to-refresh prevention logic ...
    }
    
    if (window.netlifyIdentity) {
      // Redirect to login page on logout
      window.netlifyIdentity.on("logout", () => { document.location.href = "/admin/"; });
    }
    
    window.addEventListener('load', preventPullToRefresh);
  })();
</script>
```

These scripts effectively reduce the stress caused by accidental operations without interfering with intended scroll actions.

### **Conclusion**

By making a few changes to two files, `config.yml` and `index.html`, you can significantly improve the usability of Decap CMS.

-   **`config.yml`**: Enhance **operational efficiency** by automating input using `slug` and `default` values.
-   **`index.html`**: Improve **mobile UX** by adjusting the UI and interactions with custom CSS and JavaScript.

The ability to flexibly customize a Git-based CMS to fit your own workflow is a major advantage. I hope this article provides some helpful hints for making your own CMS environment more comfortable.

import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />

##### Refs

-   [Decap CMS | Configuration Options](https://decapcms.org/docs/configuration-options/)
-   [Decap CMS | Collections](https://decapcms.org/docs/collection-folder/)
-   [Decap CMS | Widgets](https://decapcms.org/docs/widgets/)
-   [Decap CMS | Git Gateway Backend](https://decapcms.org/docs/git-gateway-backend/)
-   [Netlify | Netlify Identity widget](https://github.com/netlify/netlify-identity-widget)
-   [MDN Web Docs | overscroll-behavior](https://developer.mozilla.org/ja/docs/Web/CSS/overscroll-behavior)
