---
title: Implementing a Browser-Based Memo Feature in Docusaurus
sidebar_position: 6
last_update:
  date: 2025-06-15
tags: [Docusaurus, React, TypeScript, localStorage, browser-feature]
---

This article details the key specifications and technical aspects of implementing a simple, client-side browser memo feature on a Docusaurus site using React and TypeScript.

#### 1. Core Features and Purpose

The goal is to provide a feature that allows users to easily create and save text memos directly in their browser, with the content persisting across visits. The emphasis is on simplicity and responsiveness by ensuring all operations are handled on the client side, using the browser's `localStorage` without any server-side processing.

<!-- truncate -->

1.  **Memo Persistence**
    Entered memo content is automatically saved to the user's browser `localStorage`. This ensures that the content is restored even if the browser is reloaded or closed and reopened.

2.  **Multiple Memo Pads**
    A fixed number (five in this case) of independent memo input fields are provided. Each memo pad retains its content separately.

3.  **Auto-Resizing and Manual Minimization**
    Each memo input field automatically adjusts its height based on the amount of text. Users can also manually toggle the height to a fixed minimum.

4.  **Last Updated Timestamp**
    The date and time when each memo was last edited and saved are displayed.

5.  **Clear All Functionality**
    A function is provided to clear the content of all memo pads at once.

#### 2. Key Implementation Points

The feature is implemented as a single-file React component (`browser-memo.tsx`) located in the `src/pages` directory.

1.  **State Management (`useState`)**
    *   `memoItems`: An array of objects, where each object contains the memo's `text`, `lastUpdated` timestamp, and its manual minimization state (`isManuallyMinimized`).
        ```typescript
        interface MemoItem {
          text: string;
          lastUpdated: number | null;
          isManuallyMinimized: boolean;
        }
        const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
        ```
    *   `hoveredIndex`: The index of the minimize/auto-resize toggle area currently being hovered over by the mouse, used for UI feedback.

2.  **Side Effects (`useEffect`)**
    *   **Loading data from localStorage**: This runs once when the component mounts. It reads saved data from `localStorage` to initialize the `memoItems` state and includes data structure validation.
    *   **Saving data to localStorage**: This runs whenever the `memoItems` state changes. It serializes the current `memoItems` content to a JSON string and saves it to `localStorage`. Logic is included to prevent unnecessary writes on initial load.
    *   **Auto-adjusting textarea height**: This dynamically adjusts the height of each textarea whenever the `memoItems` state (specifically `text` or `isManuallyMinimized`) changes. It accesses textarea elements using `useRef` and utilizes the `scrollHeight` property.
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
    *   `handleUpdate`: Updates the `text` and `lastUpdated` timestamp of the corresponding memo when the textarea content changes, and resets `isManuallyMinimized` to `false`.
    *   `handleToggleMinimize`: Toggles the `isManuallyMinimized` state of the corresponding memo when the minimize/auto-height toggle area is clicked.
    *   `handleClearAllMemos`: Resets all memo items to their initial state when the "Clear All" button is clicked.

4.  **UI and Styling**
    *   Uses Docusaurus's `@theme/Layout` to maintain a consistent design with the rest of the site.
    *   Core styles are implemented using inline styles. It leverages Docusaurus theme variables (`var(--ifm-...)`) to support both light and dark themes.
    *   The bottom area of the textarea (containing the toggle and timestamp) is created with a `div` element. `border` and `backgroundColor` are styled to create a clickable UI that feels integrated with the textarea.

#### 3. Data Persistence and Security

1.  **Using `localStorage`**
    Memo data is saved to `localStorage` under a specific key (`STORAGE_KEY`). `JSON.stringify` and `JSON.parse` are used to convert between object and string formats.

2.  **Security Considerations**
    This feature operates entirely on the client side. No data entered by the user is ever sent to an external server. Data is stored only within the user's own browser, ensuring privacy. However, a note is displayed on the page advising caution when using the feature on a shared computer.

#### 4. UI/UX Highlights

1.  **Auto-Resizing Textarea**
    The height of the textarea changes automatically as the user types, reducing the need for scrolling. This is achieved by setting `resize: 'none'` and `overflowY: 'hidden'` in CSS and controlling the height with JavaScript.

2.  **Manual Minimize Option**
    Users can switch to a fixed minimum height, which is useful for temporarily collapsing long memos or for improving the visibility of other memos.

3.  **Interactive Footer**
    The background color of the bottom area of each memo pad changes on hover, visually indicating that it is clickable. The `title` attribute is also used to display a tooltip explaining the action.

#### Conclusion and Reflections

By combining Docusaurus's standard features with the flexibility of React, I was able to add a useful, client-side-only utility with relative ease.
While `localStorage` is convenient, it's important to be mindful of data structure versioning and error handling.
This project reaffirmed that fine-tuning UI/UX details (like the height adjustment logic and hover effects) has a significant impact on usability.
Future enhancements could include features like drag-and-drop reordering, Markdown support, or individual memo deletion, but for now, simplicity was the priority.
