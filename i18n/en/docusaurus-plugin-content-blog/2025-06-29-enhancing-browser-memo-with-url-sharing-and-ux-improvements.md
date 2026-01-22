---
title: "Browser Memo Feature: A Log of URL Sharing and UX Improvements"
authors: [hk]
tags: [docusaurus, react, typescript, performance, ux, lz-string]
---

### Browser Memo Feature: A Log of URL Sharing and UI/UX Improvements

#### Introduction

Regarding the previously implemented [Browser Memo](/browser-memo) feature.

Based on user experience and analysis of competing services, I have implemented significant feature enhancements.

This article outlines the key technical points of **implementing a URL-based memo sharing feature** and the **UI/UX improvements** made in the process.

Related:
- [Previous Post:A Record of Implementing an In-Site Browser Memo Feature in Docusaurus](/i18n/en/docusaurus-plugin-content-blog/2025-06-15-implementing-browser-memo-feature-in-docusaurus.md)

<!-- truncate -->

#### 1. Overview of New Features and Improvements

Building on the basic features of the initial implementation (such as persistence with `localStorage`, multiple memo pads, etc.), I have extended and improved the following key areas.

**URL-based Sharing for All Memos**
Added a feature to generate a single URL that captures the current state of all memos, allowing them to be fully restored on other browsers or PCs.

**UI/UX Enhancements**
In addition to real-time height adjustment based on input, a scrollbar was added to view content when a memo is minimized. The layout was also optimized to maximize the writing area.

**Performance and Maintainability Improvements**
The logic for memo input and display was separated into a child component, improving the overall application performance and code maintainability.

#### 2. Key Implementation Points

##### Implementing URL Sharing and Overcoming URL Length Limits

To share the memo state in a serverless manner, all data must be included in the URL. However, a significant problem exists: when the memo content is long, it can exceed the browser's URL length limit, causing the link to break.

To solve this challenge, I adopted a method combining the **`lz-string`** data compression library with the URL's **`#` (hash)** fragment.

First, the text and position of all memos are serialized into a JSON string and then compressed using `lz-string`'s `compressToEncodedURIComponent` method. This reduces the original data size.

Next, the compressed data is stored in the hash part of the URL (after the `#`). This fragment is not sent to the server, allowing the processing to be handled entirely within the browser. It also eliminates unnecessary keys like `?memos=`, resulting in the shortest possible URL.

```javascript
// Logic to generate the shareable URL
const handleShareAll = async () => {
  // Select and format the data to be shared
  const memosToShare = memoItems
    .map((item, index) => ({ i: index, t: item.text }))
    .filter(item => item.t.trim() !== '');

  const jsonString = JSON.stringify(memosToShare);
  // Compress the data
  const compressed = LZString.compressToEncodedURIComponent(jsonString);
  // Combine it as a URL hash
  const shareUrl = `${window.location.origin}${window.location.pathname}#${compressed}`;
  
  await navigator.clipboard.writeText(shareUrl);
};
```

Furthermore, for cases where the URL is still very long even after compression, a feature was implemented using `window.confirm` to warn the user and let them choose whether to proceed.

##### UI Optimization: Separating Responsibilities with Child Components

In the initial implementation, all logic for height adjustment, data saving, and more was concentrated in the parent component, raising concerns about poor code readability.

To solve this, the `textarea` was extracted into an independent child component (`MemoTextarea`), optimized with **`React.memo`**.

This component division yielded the following benefits:

*   **Logic Encapsulation**:
    Complex UI logic such as height adjustment, scrollbar display on minimization, and debounced saving is completely contained within `MemoTextarea`, keeping the parent component simple and improving maintainability.

*   **Performance Improvement**:
    `React.memo` prevents other memos from being unnecessarily re-rendered while one is being edited, which improves the overall performance of the application.

```tsx
// Example of the child component
const MemoTextarea = React.memo(({ initialText, onSave, isMinimized, ... }) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Dynamically adjust height based on changes in text or isMinimized state
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    if (isMinimized) {
      textarea.style.height = `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`;
      textarea.style.overflowY = 'auto'; // Show scrollbar when minimized
    } else {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.max(textarea.scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT)}px`;
      textarea.style.overflowY = 'hidden';
    }
  }, [text, isMinimized]);

  // ...
});
```

##### Optimization for the Docusaurus Environment

Since the feature depends on browser-only APIs like `localStorage`, the entire component was wrapped with the `<BrowserOnly>` component provided by Docusaurus. This prevents errors during server-side builds and ensures stability.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
