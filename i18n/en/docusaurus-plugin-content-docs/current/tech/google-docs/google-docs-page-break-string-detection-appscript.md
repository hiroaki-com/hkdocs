---
sidebar_position: 4
title: AppScript for Page Breaks (by String Detection) in Google Docs
last_update:
  date: 2025-06-18
---

# AppScript for Page Breaks (by String Detection) in Google Docs

### Background
- While editing a very long document, I found that repeatedly using `⌘＋Enter` to insert page breaks was extremely time-consuming.
- Since I couldn't find a service, such as a [Chrome Extension](https://chromewebstore.google.com/category/extensions?hl=en), that offered the desired functionality, I created my own.

### Use Cases
- Increase efficiency when editing very long Google Docs, such as books.
- A script that inserts a page break before a paragraph starting with any of several specified strings (prefix match).

### How to Use
 1. In your Google Doc, simply paste the following AppScript and run it according to the comments provided.


 ```Javascript
 // How to use:
/**
 * @fileoverview This script inserts a page break before paragraphs that start with any of several specified strings.
 *
 * ## Prerequisites for Running the Function
 *
 * ・Important: When running a function, select > [ insertPageBreakAtPrefixMarkers ].
 *
 *
 * ## How to Configure the Marker Strings
 *
 * 1. Change the value of **PAGEBREAK_PREFIXES** to an **array** of **prefixes** (the beginning part of the string) that you want to use as markers for page breaks.
 *    - This system searches for text that matches the prefix.
 *    - The array is enclosed in square brackets `[]`, and each prefix string is enclosed in double `"` or single `'` quotes, separated by commas `,`.
 *    - **Number of Elements:** The array must contain **at least one** valid prefix string. You can set as many as you like.
 *    - **Valid Prefixes:**
 *        - Empty strings (`""`) and strings containing only whitespace characters (`" "`) are **ignored**. They will not be targeted for page breaks.
 *        - The match is case-sensitive.
 *
 * 2. **Configuration Examples:**
 *    - **For a single prefix:**
 *      Example: `const PAGEBREAK_PREFIXES = ["PAGEBREAK"];`
 *      With this setting, a page break will be inserted before paragraphs starting with "PAGEBREAK" (e.g., "PAGEBREAK" or "PAGEBREAK Section Title").
 *
 *    - **For two prefixes:**
 *      Example: `const PAGEBREAK_PREFIXES = ["Chapter ", "Appendix "];`
 *      With this setting, a page break will be inserted before paragraphs starting with "Chapter " (with a space after Chapter) or "Appendix " (with a space after Appendix), such as "Chapter 1 Introduction" or "Appendix A References".
 *
 *    - **For three or more prefixes:**
 *      Example: `const PAGEBREAK_PREFIXES = ["Figure-", "Table-", "List "];`
 *      With this setting, a page break will be inserted before paragraphs starting with "Figure-", "Table-", or "List " (with a space after List), such as "Figure-1 System Configuration", "Table-2 Parameter List", or "List 1 Procedure".
 *
 *    - **Key Points:**
 *      - Whether you include a space in the prefix affects what will be matched.
 *        For example: `"Chapter"` will match "ChapterEnd", but `"Chapter "` will not.
 *      - You can add as many strings as you need, separated by commas.
 *
 * 3. **Behavior:**
 *    - A page break will be inserted **immediately before** any paragraph whose text **starts with** one of the **valid prefixes** in this array.
 *    - It only checks the text of Paragraph elements.
 *
 * 4. After making changes, **be sure to save the script file** (click the floppy disk icon).
 */
const PAGEBREAK_PREFIXES = ["Problem Statement (Japan", "Chapter"]; // Example: ["Figure-", "Table-"] or ["MyMarker"]. Refer to the comments above for configuration instructions.
// --- End of Configuration Section ---


// --- Global Constants ---
const SCRIPT_NAME_MULTI_PREFIX = 'Custom Page Break (Multi-Prefix Match)';
const SCRIPT_ERROR_MENU_NAME_MULTI_PREFIX = `${SCRIPT_NAME_MULTI_PREFIX} (Configuration Error)`;

/**
 * Extracts only valid (non-empty and not just whitespace) strings from the configured prefix array.
 * @param {any} prefixes The configured PAGEBREAK_PREFIXES value
 * @returns {string[]} An array of valid prefix strings
 */
function getValidPrefixes(prefixes) {
  if (!Array.isArray(prefixes)) {
    return []; // Return an empty array if it's not an array
  }
  // Use filter to extract only strings that are not empty after trimming
  return prefixes.filter(prefix => typeof prefix === 'string' && prefix.trim().length > 0);
}

/**
 * Adds a custom menu when the document is opened.
 */
function onOpen_MultiPrefix() {
  try {
    const validPrefixes = getValidPrefixes(PAGEBREAK_PREFIXES);

    // If there are no valid prefixes, display an error menu
    if (validPrefixes.length === 0) {
      Logger.log(`onOpen_MultiPrefix: No valid page break prefixes are set (${JSON.stringify(PAGEBREAK_PREFIXES)}). Displaying error menu.`);
      showConfigurationErrorMenu_MultiPrefix("No valid page break prefixes are set");
      return;
    }

    // Generate menu item text (adjusting the displayed prefixes)
    let menuItemText = `Page Break Before Prefixes (${validPrefixes.slice(0, 2).map(p => `"${p}"`).join(', ')}...)`;
    if (validPrefixes.length === 1) {
        menuItemText = `Page Break Before Prefix "${validPrefixes[0]}"`;
    } else if (validPrefixes.length === 2) {
        menuItemText = `Page Break Before Prefixes (${validPrefixes.map(p => `"${p}"`).join(', ')})`;
    }

    DocumentApp.getUi()
      .createMenu(SCRIPT_NAME_MULTI_PREFIX)
      .addItem(menuItemText, 'insertPageBreakAtPrefixMarkers')
      .addToUi();
    Logger.log(`onOpen_MultiPrefix: Menu added successfully (Valid target prefixes: ${JSON.stringify(validPrefixes)}).`);

  } catch (e) {
    Logger.log(`onOpen_MultiPrefix: Error while adding menu: ${e}\n${e.stack}`);
    showConfigurationErrorMenu_MultiPrefix("Error adding menu");
  }
}

/**
 * Adds a menu item indicating an error if there is a configuration problem.
 * @param {string} reason The reason for the error
 */
function showConfigurationErrorMenu_MultiPrefix(reason) {
  try {
    DocumentApp.getUi()
      .createMenu(SCRIPT_ERROR_MENU_NAME_MULTI_PREFIX)
      .addItem(`Check Settings (${reason})`, 'showConfigurationError_MultiPrefix')
      .addToUi();
  } catch (e) {
    Logger.log(`showConfigurationErrorMenu_MultiPrefix: Further error while displaying error menu: ${e}`);
  }
}

/**
 * Alert function to display on configuration error.
 */
function showConfigurationError_MultiPrefix() {
  let currentSetting = "Undefined or inaccessible";
  try {
    // Check if the setting is an array before trying JSON.stringify
    currentSetting = typeof PAGEBREAK_PREFIXES !== 'undefined'
      ? (Array.isArray(PAGEBREAK_PREFIXES) ? JSON.stringify(PAGEBREAK_PREFIXES) : `Invalid setting value (${PAGEBREAK_PREFIXES})`)
      : "Undefined";
  } catch(e) {
    currentSetting = "Error displaying setting value";
   }

  const message = `There is a problem with the script's settings.\n\n`
                + `Current setting value (PAGEBREAK_PREFIXES): ${currentSetting}\n\n`
                + `Please open the script editor, check and correct the "PAGEBREAK_PREFIXES" value at the top of the file, and **save the file**.\n\n`
                + `This value must be an **array** containing **at least one** **non-empty** prefix string to serve as a page break marker (e.g., ["PREFIX1", "PREFIX2"]).\n`
                + `Empty strings "" and strings with only whitespace " " are ignored.\n\n`
                + `(Example: const PAGEBREAK_PREFIXES = ["Chapter ", "Section ", "Figure-"];)` // More specific example
  DocumentApp.getUi().alert("Script Configuration Error", message, DocumentApp.getUi().ButtonSet.OK);
}


/**
 * Inserts a page break before any paragraph in the document that starts with one of the valid prefixes.
 */
function insertPageBreakAtPrefixMarkers() {
  const startTime = new Date();
  let doc;

  // --- 1. Initialization and Validation ---
  try {
    doc = DocumentApp.getActiveDocument();
    if (!doc) throw new Error("Could not get the active document.");
    doc.getName(); // Permission check
  } catch (e) {
    handleExecutionError_MultiPrefix("Document Access Error", e);
    return;
  }

  // Get only valid prefixes from the settings
  const validPrefixes = getValidPrefixes(PAGEBREAK_PREFIXES);

  // If there are no valid prefixes, stop processing and display an error message
  if (validPrefixes.length === 0) {
      Logger.log(`insertPageBreakAtPrefixMarkers: Check before processing revealed no valid page break prefixes are set.`);
      showConfigurationError_MultiPrefix("No valid page break prefixes are set");
      return;
  }

  Logger.log(`--- Starting Page Break Insertion (Multi-Prefix Match) ---`);
  Logger.log(`Document: ${doc.getName()}`);
  Logger.log(`Valid target prefixes (actually used for search): ${JSON.stringify(validPrefixes)}`); // Log the list actually being used

  // --- 2. Element Traversal and Page Break Insertion ---
  const body = doc.getBody();
  const numChildren = body.getNumChildren();
  let pageBreakInsertedCount = 0;
  let foundMarkersCount = 0;

  Logger.log(`Number of elements: ${numChildren}. Traversing in reverse order...`);

  for (let i = numChildren - 1; i >= 0; i--) {
    const element = body.getChild(i);

    if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      const paragraph = element.asParagraph();
      let paragraphText;
      try {
        paragraphText = paragraph.getText();

        // Check if the text starts with any of the valid prefixes in 'validPrefixes'
        if (validPrefixes.some(prefix => paragraphText.startsWith(prefix))) {
          foundMarkersCount++;
          // Logger.log(`  Found: Index ${i}, Text: "${paragraphText}", Prefix: ${validPrefixes.find(p => paragraphText.startsWith(p))}`);

          if (i > 0 && body.getChild(i - 1).getType() !== DocumentApp.ElementType.PAGE_BREAK) {
            try {
              body.insertPageBreak(i);
              pageBreakInsertedCount++;
              // Logger.log(`    -> Inserting page break (Index ${i})`);

              // Optional: If you want to delete the marker paragraph itself
              // try {
              //   paragraph.removeFromParent();
              //   Logger.log(`    -> Deleted the prefix-matched paragraph (original Index ${i+1}).`);
              // } catch (removeError) {
              //   Logger.log(`! Error while deleting marker paragraph at Index ${i+1}: ${removeError}`);
              // }

            } catch (insertError) {
              Logger.log(`! Error while inserting page break at Index ${i}: ${insertError}`);
            }
          } // else: skip (already page break or beginning of doc)
        }
      } catch (elementError) {
        Logger.log(`! Error processing Index ${i} (Type: PARAGRAPH): ${elementError}. Skipping.`);
      }
    }
  }

  // --- 3. Report Results ---
  const endTime = new Date();
  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  Logger.log(`--- Traversal Complete ---`);
  Logger.log(`Processing time: ${duration.toFixed(2)} seconds`);
  Logger.log(`Paragraphs starting with specified prefixes (${JSON.stringify(validPrefixes)}) found: ${foundMarkersCount}`);
  Logger.log(`Inserted page breaks: ${pageBreakInsertedCount}`);

  const resultMessage = buildResultMessage_MultiPrefix(pageBreakInsertedCount, foundMarkersCount, validPrefixes, duration);
  DocumentApp.getUi().alert("Processing Complete", resultMessage, DocumentApp.getUi().ButtonSet.OK);

  Logger.log(`--- Page Break Insertion (Multi-Prefix Match) Complete ---`);
}

/**
 * Handles runtime errors and notifies the user.
 * (handleExecutionError_MultiPrefix function is unchanged)
 * @param {string} context The context in which the error occurred
 * @param {Error} error The error object that occurred
 */
function handleExecutionError_MultiPrefix(context, error) {
    Logger.log(`Runtime error (${context}): ${error}\n${error.stack}`);
    let userMessage = `An error occurred while running the script.\n\nContext: ${context}`;
    if (error.message) {
        if (error.message.includes("Authorization required")) {
            userMessage = "The necessary permissions to run the script have not been approved.\n\nPlease reload the document or run the script again, and grant permission on the authorization screen.";
        } else {
            userMessage += `\nDetails: ${error.message}`;
        }
    }
    DocumentApp.getUi().alert("Script Error", userMessage, DocumentApp.getUi().ButtonSet.OK);
}

/**
 * Generates a message for the user based on the processing results.
 * (buildResultMessage_MultiPrefix function is unchanged, displays only valid prefixes)
 * @param {number} insertedCount The number of page breaks inserted
 * @param {number} foundCount The number of paragraphs found with a matching prefix
 * @param {string[]} validPrefixes An array of valid prefixes
 * @param {number} duration Processing time in seconds
 * @returns {string} The message for the alert dialog
 */
function buildResultMessage_MultiPrefix(insertedCount, foundCount, validPrefixes, duration) {
    // Limit the displayed prefixes to a maximum of 3 and enclose them in quotes
    const displayPrefixes = validPrefixes.slice(0, 3).map(p => `"${p}"`);
    const prefixDescription = `paragraphs starting with the specified prefixes (${displayPrefixes.join(', ')}${validPrefixes.length > 3 ? '...' : ''})`;

    if (insertedCount > 0) {
        return `Inserted page breaks before ${insertedCount} ${prefixDescription}.\n\nProcessing time: ${duration.toFixed(2)} seconds`;
    } else if (foundCount > 0) {
        return `${foundCount} ${prefixDescription.replace('paragraphs', 'paragraph(s)')} were found, but no page breaks were inserted.\n(This may be because the paragraph is at the beginning of the document or a page break already exists.)\n\nProcessing time: ${duration.toFixed(2)} seconds`;
    } else {
        return `No ${prefixDescription} were found.\n\nPlease check the following:\n`
             + `1. Are valid prefixes set in "PAGEBREAK_PREFIXES" at the top of the script? (Current valid settings: ${JSON.stringify(validPrefixes)})\n`
             + `2. Does the document contain any paragraphs that start with one of these prefixes? (The match is case-sensitive.)\n`
             + `3. Have the script permissions been approved?`;
    }
}
 ```