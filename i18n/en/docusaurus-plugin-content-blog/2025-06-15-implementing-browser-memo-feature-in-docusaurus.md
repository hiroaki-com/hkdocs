---
title: A Record of Implementing an In-Site Browser Memo Feature in Docusaurus
authors: [hk]
tags: [docusaurus, react, typescript, localStorage, browser-feature]
---

This article organizes the main specifications and technical points from when I implemented a simple, client-side browser memo feature on a Docusaurus site using React and TypeScript.

#### 1. Basic Features and Purpose

To provide a feature that allows users to easily create and save text memos in their browser, with the content persisting on subsequent visits.
The focus is on ease of use and responsiveness by having everything run entirely on the client-side (using the browser's localStorage) without any server-side processing.

<!-- truncate -->

1.  **Memo Persistence**
    The entered memo content is automatically saved to the user's browser `localStorage`. This allows the previous content to be restored even if the browser is reloaded or closed and reopened.

2.  **Multiple Memo Fields**
    Provides a fixed number (five in this case) of independent memo input fields. Each memo retains its content individually.

3.  **Automatic Height Adjustment and Manual Minimization**
    Each memo input field automatically adjusts its height based on the amount of text entered. Users can also manually toggle the height to a minimum (fixed value).

4.  **Display of Last Updated Timestamp**
    Displays the date and time each memo was last edited and saved.

5.  **Clear All Functionality**
    Provides a function to clear the content of all memos at once.

#### 2. Key Implementation Points

The feature was implemented as a React component in a single file (`browser-memo.tsx`) under `src/pages`.

1.  **State Management (`useState`)**
    *   `memoItems`: An array of objects containing the memo's `text`, `lastUpdated` timestamp, and `isManuallyMinimized` state.
        ```typescript
        interface MemoItem {
          text: string;
          lastUpdated: number | null;
          isManuallyMinimized: boolean;
        }
        const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
        ```
    *   `hoveredIndex`: The index of the minimize/auto-adjust toggle area that is currently being hovered over, used for UI feedback.

2.  **Side Effect Handling (`useEffect`)**
    *   **Loading data from localStorage**: Runs only once when the component mounts. It loads saved data from `localStorage` and initializes the `memoItems` state. It also includes validation of the data structure.
    *   **Saving data to localStorage**: Runs whenever the `memoItems` state changes. It saves the current content of `memoItems` to `localStorage` as a JSON string. It also includes logic to prevent unnecessary saves on the initial state.
    *   **Automatic textarea height adjustment**: Dynamically adjusts the height of each textarea when the `memoItems` state (specifically `text` or `isManuallyMinimized`) changes. It accesses the textarea elements using `useRef` and utilizes `scrollHeight`.
        ```typescript
        const adjustTextareaHeight = useCallback((index: number) => {
          const textarea = textareaRefs.current[index];
          if (textarea) {
            const itemIsManuallyMinimized = memoItems[index].isManuallyMinimized;
            if (itemIsManuallyMinimized) {
              textarea.style.height = `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`;
            } else {
              textarea.style.height = 'auto';
              const scrollHeight = textarea.scrollHeight;
              textarea.style.height = `${Math.max(scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT)}px`;
            }
          }
        }, [memoItems]);
        ```

3.  **Event Handlers (`useCallback`)**
    *   `handleUpdate`: When the textarea content changes, it updates the corresponding memo's `text` and `lastUpdated`, and resets `isManuallyMinimized` to `false`.
    *   `handleToggleMinimize`: When the minimize/auto-height toggle area is clicked, it flips the `isManuallyMinimized` state of the corresponding memo.
    *   `handleClearAllMemos`: When the "Clear All" button is clicked, it resets all memo items to their initial state.

4.  **UI and Styling**
    *   Uses Docusaurus's `@theme/Layout` to maintain consistency with the overall site design.
    *   Major styles are written as inline styles. It utilizes Docusaurus theme variables (`var(--ifm-...)`) to support light/dark themes.
    *   The bottom area of the textarea (containing the minimize/auto-adjust toggle and the last updated timestamp) is created with a `div` element. The `border` and `backgroundColor` are styled to create a clickable UI that feels integrated with the textarea.

#### 3. Data Persistence and Security

1.  **Using `localStorage`**
    Memo data is saved to `localStorage` using a specified key (`STORAGE_KEY`). `JSON.stringify` and `JSON.parse` are used to convert between objects and strings.

2.  **Security Considerations**
    This feature runs entirely on the client-side. The entered data is never sent to an external server. Since the data is stored only within the user's own browser, privacy is protected. However, users should be cautious when using it on a shared computer. A note to this effect is included on the page.

#### 4. UI/UX Points

1.  **Automatic Height Adjustment**
    The height of the textarea changes automatically as text is entered, reducing the need for scrolling. This is controlled with JavaScript, with `resize: 'none'` and `overflowY: 'hidden'` set in the CSS.

2.  **Manual Minimization Option**
    Users can switch the height to a fixed minimum value when they want to temporarily make a long memo more compact or improve the overview of multiple memos.

3.  **Interactive Footer**
    When the mouse hovers over the bottom area of each memo, the background color changes to visually indicate that it is clickable. A `title` attribute also displays a tooltip explaining the action.

#### Summary and Impressions

By combining Docusaurus's standard features with the flexibility of React, I was able to add a useful, client-side-only feature with relative ease.
Using `localStorage` is convenient, but care must be taken with data structure versioning and error handling.
I was reminded that small UI/UX adjustments (like the height adjustment logic and hover effects) have a significant impact on usability.
Future enhancements could include sorting memos, Markdown support, or deleting individual memos, but for now, simplicity was the priority.

