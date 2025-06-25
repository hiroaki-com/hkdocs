---
title: 'Editing Docusaurus Navigation Icons: Three Approaches'
authors: [hk]
tags: [docusaurus, icon, css, svg]
---

This article outlines three main patterns for displaying icons or specific symbols in the navigation bar of a Docusaurus site.

#### 1. Displaying with Text and Symbols

This is the most direct and simple method for displaying icons or symbols in navigation items. It is achieved by writing directly into the `label` property within the Docusaurus configuration file.

<!-- truncate -->

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    In the `themeConfig.navbar.items` array, specify the desired text, emoji, or special symbol in the `label` property of the target item.

    ```typescript
    // docusaurus.config.ts
    // ...
    themeConfig: {
      // ...
      navbar: {
        // ...
        items: [
          {
            href: 'https://github.com/your-org/your-repo',
            label: 'GitHub', // or '🐙', 'Project Repository', etc.
            position: 'right',
          },
          {
            href: 'https://x.com/your-account',
            label: '𝕏',     // A symbol styled like the X (Twitter) logo
            position: 'right',
          },
          // ... other navigation items ...
        ],
      },
      // ...
    },
    // ...
    ```

2.  **Features and Considerations**
    *   **Implementation**: Very easy. No additional CSS or file management is required.
    *   **Lightweight**: Minimal impact on site performance.
    *   **Design**: Limited to characters and symbols within the text character set, offering low design flexibility. Accurately representing specific brand logos is difficult.

#### 2. Displaying Icons with CSS Pseudo-elements and Background Images

This method uses CSS `::before` or `::after` pseudo-elements and the `background-image` property (recommending the SVG Data URI format) to display icons without altering the HTML structure.

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    Add a `className` to the navigation item where you want to display an icon, which you will use to apply styles via CSS. The `label` can be left empty, or it can contain text for screen readers, assuming it will be visually hidden with CSS.

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            label: ' ', // Leave empty or visually hide for CSS icon display
            className: 'header-github-link', // Class name for CSS reference
            'aria-label': 'GitHub Repository', // Required for accessibility
            position: 'right',
          },
    // ...
    ```

2.  **Edit Custom CSS** (`src/css/custom.css`)
    For the element with the specified class name, use the `::before` pseudo-element to set the icon as a background image. To display different icons for light and dark modes, use the `html[data-theme='dark']` selector.

    ```css
    /* src/css/custom.css */
    .header-github-link {
      display: inline-block;
      width: 24px; /* Adjust to match the icon's width */
      height: 24px; /* Adjust to match the icon's height */
      font-size: 0; /* Hides any text characters in the label */
      position: relative; /* Positioning context for ::before */
      vertical-align: middle; /* Vertical alignment with other text items */
    }

    .header-github-link::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      /* Light mode SVG icon (Data URI format) */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 ... Z'/%3E%3C/svg%3E");
    }

    /* Dark mode support */
    html[data-theme="dark"] .header-github-link::before {
      /* Dark mode SVG icon (Data URI format, e.g., with fill='white') */
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='white' d='M12 ... Z'/%3E%3C/svg%3E");
    }
    ```

3.  **Features and Considerations**
    *   **Flexibility**: Allows for pixel-perfect positioning and adding effects with CSS.
    *   **HTML Structure**: The HTML structure of the navigation item itself is not changed.
    *   **Complexity**: Requires some CSS knowledge and has a slightly higher management cost due to converting SVGs to Data URIs, specifying images per theme, and hiding the `label` text.

#### 3. Displaying Icons with Inline SVG

This method involves embedding SVG code directly into the HTML using the `html` property of the Docusaurus navigation item configuration object.

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    Instead of the `label` property, use the `html` property for the navigation item and provide the complete SVG code as its string value. By setting the SVG's `fill` attribute to `currentColor`, the icon can follow the theme's color.

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            position: 'right',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="navbar-icon" aria-hidden="true"><path d="M12 ... Z"/></svg>`, // Write the SVG code directly
            'aria-label': 'GitHub Repository', // Required for accessibility
          },
    // ...
    ```

2.  **Edit Custom CSS** (`src/css/custom.css`) - Optional
    If you specify `fill="currentColor"` in the SVG itself, basic theme support requires no CSS. You can add CSS for extra styling like hover effects or margin adjustments.

    ```css
    /* src/css/custom.css */
    .navbar-icon { /* Class added to the SVG (optional) */
      vertical-align: middle; /* Vertical alignment with other text items */
      margin-left: 0.25rem; /* Add a small left margin if needed */
    }

    .navbar-icon:hover {
      opacity: 0.7; /* Change opacity on hover */
    }
    ```

3.  **Features and Considerations**
    *   **Theme Adherence**: By using `fill="currentColor"`, the icon's color automatically adapts to the light/dark theme's text color without extra CSS.
    *   **Self-Contained**: The icon definition is largely self-contained within `docusaurus.config.ts` (low dependency on external CSS).
    *   **Readability**: Including long SVG code in the configuration file can potentially reduce the overall readability of the file.

#### Summary and Recommendation

The method you choose for displaying navigation icons can be selected based on your project's requirements and developer preference.

*   **For ease of use and simplicity**: **Text and Symbols** is the best choice.
*   **For fine-grained control with CSS or leveraging existing image assets**: **CSS Pseudo-elements and Background Images** is suitable, but consider the management cost.
*   **For easy theme integration and direct control over the SVG**: **Inline SVG** is a modern and often recommended approach, but be mindful of bloating the configuration file.

Ultimately, it is important to compare factors like ease of implementation, maintainability, design requirements, and performance impact to select the most suitable approach.

