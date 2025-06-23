---
title: "Editing Docusaurus Navigation Icons: Three Approaches"
sidebar_position: 5
tags: [Docusaurus, icon, CSS, SVG]
---

This article outlines three primary patterns for displaying icons or specific symbols in the Docusaurus navigation bar.

#### 1. Displaying with Text or Symbols

This is the most direct and simplest method for displaying icons or symbols in navigation items. It is achieved by directly writing the desired character in the `label` property within the Docusaurus configuration file.

<!-- truncate -->

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    In the `themeConfig.navbar.items` array, specify the text, emoji, or special symbol you want to display in the `label` property of the target item.

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
            label: '𝕏',     // A symbol resembling the X (Twitter) logo
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
    *   **Implementation**: Extremely easy. No additional CSS or file management is required.
    *   **Lightweight**: Minimal impact on site performance.
    *   **Design**: Limited to characters and symbols available in the text character set, offering low design flexibility. Accurately representing specific brand logos is difficult.

#### 2. Displaying Icons with CSS Pseudo-elements and Background Images

This method uses CSS `::before` or `::after` pseudo-elements and the `background-image` property (SVG Data URI format is recommended) to display icons without altering the HTML structure.

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    Add a `className` to the navigation item where you want to display an icon, which will be used to apply styles via CSS. The `label` can be left empty or contain text for screen readers that is visually hidden with CSS.

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            label: ' ', // Empty or visually hidden for CSS icon display
            className: 'header-github-link', // Class name to reference in CSS
            'aria-label': 'GitHub Repository', // Essential for accessibility
            position: 'right',
          },
    // ...
    ```

2.  **Edit Custom CSS** (`src/css/custom.css`)
    Target the element with the specified class name and use the `::before` pseudo-element to set the icon as a background image. Use the `html[data-theme='dark']` selector to display different icons for light and dark modes.

    ```css
    /* src/css/custom.css */
    .header-github-link {
      display: inline-block;
      width: 24px; /* Adjust to match the icon's width */
      height: 24px; /* Adjust to match the icon's height */
      font-size: 0; /* Hides any whitespace from the label */
      position: relative; /* Positioning context for ::before */
      vertical-align: middle; /* Aligns vertically with other text items */
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
    *   **HTML Structure**: The HTML structure of the navigation item itself remains unchanged.
    *   **Complexity**: Requires CSS knowledge and has a slightly higher management cost due to the need to convert SVGs to Data URIs, specify images for each theme, and hide the `label` text.

#### 3. Displaying Icons with Inline SVGs

This method involves using the `html` property of the Docusaurus navigation item configuration object to directly embed SVG code into the HTML.

1.  **Edit the Configuration File** (`docusaurus.config.ts`)
    Use the `html` property instead of the `label` property for the navigation item and provide the complete SVG code as a string. Setting the SVG's `fill` attribute to `currentColor` allows it to adapt to the theme's color.

    ```typescript
    // docusaurus.config.ts
    // ...
          {
            href: 'https://github.com/your-org/your-repo',
            position: 'right',
            html: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="navbar-icon" aria-hidden="true"><path d="M12 ... Z"/></svg>`, // Directly embed the SVG code
            'aria-label': 'GitHub Repository', // Essential for accessibility
          },
    // ...
    ```

2.  **Edit Custom CSS** (`src/css/custom.css`) - Optional
    If you specify `fill="currentColor"` in the SVG, basic theme support requires no extra CSS. You only need to write CSS for additional styles like hover effects or margin adjustments.

    ```css
    /* src/css/custom.css */
    .navbar-icon { /* Optional class assigned to the SVG */
      vertical-align: middle; /* Aligns vertically with other text items */
      margin-left: 0.25rem; /* Example: add a small left margin */
    }

    .navbar-icon:hover {
      opacity: 0.7; /* Change opacity on hover */
    }
    ```

3.  **Features and Considerations**
    *   **Theme Integration**: Using `fill="currentColor"` automatically adapts the icon's color to the light/dark theme's text color without extra CSS.
    *   **Self-Contained**: The icon definition is largely self-contained within `docusaurus.config.ts`, reducing reliance on external CSS.
    *   **Readability**: Embedding long SVG strings can decrease the overall readability of the configuration file.

#### Summary and Recommendation

The best method for displaying navigation icons depends on your project's requirements and personal preference.

*   **For Simplicity and Ease**: **Text or Symbols** is the best choice.
*   **For Fine-Grained CSS Control or Using Existing Image Assets**: **CSS Pseudo-elements and Background Images** is suitable, but consider the management overhead.
*   **For Easy Theme-Awareness and Direct SVG Control**: **Inline SVGs** is a modern and often recommended approach, but be mindful of configuration file bloat.

Ultimately, it is important to choose the optimal approach by weighing the ease of implementation, maintainability, design requirements, and performance impact.
