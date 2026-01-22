---
title: Creating a Multilingual News Links Page in Docusaurus
authors: [hk]
tags: [docusaurus, react, typescript, i18n, css-modules, ui/ux]
---

This article outlines the key considerations and technical details involved in implementing a "News Page" on a Docusaurus site, designed to list domestic and international news sources.

#### 1. Page Purpose and Key Features

The primary goal was to build a personal information hub for quick access to reliable news sources. The page is built as a static site, emphasizing fast performance, usability, and maintainability.

<!-- truncate -->

1.  **Systematic Categorization**
    News sites are categorized into sections like "General & Economy" and "Technology." HTML's `<details>` tag is used to allow each category to be collapsed, ensuring a clean and organized view.

2.  **Multilingual Support (i18n)**
    Leveraging Docusaurus's internationalization features, all text on the page—including headings and descriptions—can be switched between Japanese and English.

3.  **Direct Section Linking**
    Anchor links are placed on each category heading, enabling users to share URLs that link directly to a specific section.

4.  **Responsive Card Layout**
    A CSS Grid layout is employed to ensure an optimal viewing experience across various screen sizes, from desktops to smartphones.

#### 2. Key Implementation Points

The page is implemented as a React component in `src/pages/news.tsx`, with styling managed by CSS Modules (`news.module.css`).

##### 1. Multilingual Support (i18n)

The implementation makes full use of Docusaurus's `<Translate>` component and `translate` API, which separates markup from content and improves maintainability.

*   **Using the `<Translate>` Component**
    This component is used for translating static text within JSX. It automatically fetches the corresponding translation from `code.json` using the `id` as a key.

    ```tsx
    // src/pages/news.tsx
    import Translate from '@docusaurus/Translate';

    <h1>
      <Translate id="news.page.heading">ニュース</Translate>
    </h1>
    // This is replaced with 'News' in English and 'ニュース' in Japanese.
    ```

*   **Using the `translate` API**
    This function is used for translating strings outside of JSX tags, such as in component props. It's particularly useful for passing translated text to the `Layout` component's `title` and `description` props.

    ```tsx
    // src/pages/news.tsx
    import { translate } from '@docusaurus/Translate';

    <Layout
      title={translate({
        id: 'news.page.title',
        message: 'ニュース一覧', // Default text if translation is not found
      })}
    >
      {/* ... */}
    </Layout>
    ```
    With this approach, translation data is consolidated in `i18n/{locale}/code.json`, centralizing text management and translation efforts.

##### 2. Component Design

The page's elements are modularized into components to enhance reusability and readability.

*   **`NewsSiteCard` Component**
    A reusable card component that accepts a site's "title," "description," and "URL" as props. This makes it easy to add or modify news sites by simply reusing the component.

    ```tsx
    // Usage in news.tsx
    <NewsSiteCard
      href="https://www.nikkei.com/"
      title={<Translate id="news.site.jp.ge.nikkei.title">日本経済新聞</Translate>}
      description={<Translate id="news.site.jp.ge.nikkei.desc">...</Translate>}
    />
    ```

*   **`SectionHeading` Component**
    A custom heading component that maintains semantic correctness while standardizing the UI. The `as` prop allows for dynamically setting the heading level (e.g., `h2`, `h3`).

    ```tsx
    // src/pages/news.tsx
    const SectionHeading = ({ as: Component, id, className, children }) => {
      return (
        // The 'h2' or 'h3' passed via the 'as' prop is rendered as the Component
        <Component id={id} className={`${className} ${styles.sectionHeading}`}>
          <a
            className={styles.anchorLink}
            href={`#${id}`}
            aria-label="Permanent link to this heading"
          >
            #
          </a>
          {children}
        </Component>
      );
    };

    // Example usage
    <SectionHeading as="h2" id="japan" ... >
      Japan
    </SectionHeading>
    ```
    This implementation allows the same "anchor-linked" behavior to be reused across different heading levels.

##### 3. Styling (CSS Modules & Grid Layout)

CSS Modules are used to manage styles on a per-component basis, preventing global CSS pollution.

*   **Scoped CSS**
    Class names defined in `news.module.css` are transformed into unique names at build time (e.g., `[filename]_[classname]__[hash]`), completely avoiding unintended style conflicts with other components.

*   **Responsive Grid Layout**
    The card list layout is powered by CSS Grid. The key is the `repeat(auto-fill, minmax(300px, 1fr))` declaration.
    ```css
    /* src/pages/news.module.css */
    .cardGrid {
      display: grid;
      /* Sets a minimum column width of 300px and auto-adjusts the number of columns */
      /* 'auto-fill' packs as many columns as possible, and '1fr' distributes remaining space evenly */
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }
    ```
    This single line achieves a flexible, responsive design without complex media queries.

#### 3. UI/UX Enhancements

A lightweight and accessible UI is constructed by maximizing the use of standard HTML features and CSS.

1.  **Accordion UI with `<details>` Tag**
    The expand/collapse functionality for categories is implemented using the standard HTML `<details>` and `<summary>` tags.
    *   **No JavaScript Required**: It works natively in browsers without any additional JS code, making it lightweight.
    *   **Accessibility**: It is accessible by default, supporting keyboard navigation (e.g., opening/closing with the Enter key).
    *   **Initial State Control**: The `open` attribute can be used to set the initial state to "expanded."

2.  **Hover-to-Reveal Anchor Links**
    The `#` link within the `SectionHeading` component is hidden by default (`opacity: 0`). It becomes visible when the user hovers over the parent element, thanks to a simple CSS transition.
    ```css
    .sectionHeading .anchorLink {
      opacity: 0;
      transition: opacity 0.2s ease;
    }

    .sectionHeading:hover .anchorLink {
      opacity: 1;
    }
    ```
    This keeps the UI clean while providing functionality to users when they need it.

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
