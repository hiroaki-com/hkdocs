---
sidebar_position: 3
title: AppScript for Page Breaks (by Heading Level) in Google Docs
---

# AppScript for Inserting Page Breaks by Heading Level in Google Docs

### Background
- While editing a very long document, I was repeatedly using `⌘＋Enter` to insert page breaks, which was extremely time-consuming.
- Since I couldn't find a service, such as a [Chrome Extension](https://chromewebstore.google.com/category/extensions?hl=en), that offered the desired functionality, I decided to create my own.

### Use Cases
- Increase efficiency when editing very long Google Docs, such as books.
- Insert a page break before a specified heading level.

### How to Use
 1. In your Google Doc, simply paste the following AppScript and run it according to the comments provided.


 ```Javascript
 // --- Configuration Section ---
/**
 * @fileoverview This is a Google Apps Script that inserts a page break before a specified heading level.
 *
 * ## Prerequisites for Running the Function
 *
 * ・Important: When running a function, select > [ insertPageBreakBeforeHeading ].
 * 
 * ## How to Configure
 *
 * 1. Change the value of **TARGET_HEADING_LEVEL** to the level of the heading (an integer from 1 to 6) before which you want to insert a page break.
 *    - 1: Google Docs "Heading 1" style
 *    - 2: Google Docs "Heading 2" style
 *    - 3: Google Docs "Heading 3" style
 *    - 4: Google Docs "Heading 4" style
 *    - 5: Google Docs "Heading 5" style
 *    - 6: Google Docs "Heading 6" style
 *
 * 2. **Notes:**
 *    - This script recognizes the **standard heading styles** in Google Docs.
 *    - For the text of the heading where you want to insert a page break, you **must apply the corresponding "Heading X" style** from the menu: [Format] > [Paragraph styles].
 *    - (Simply changing the font size or weight will not be recognized as a heading.)
 *
 * 3. After making changes, **be sure to save the script file** (click the floppy disk icon).
 */
const TARGET_HEADING_LEVEL = 3; // Example: Inserts a page break before the "Heading 3" style.
// --- End of Configuration Section ---

// --- Following Script Code (No changes needed) ---
/** Global constant: Script name */
const SCRIPT_NAME = 'Custom Script';
/** Global constant: Menu name for configuration errors */
const SCRIPT_ERROR_MENU_NAME = `${SCRIPT_NAME} (Configuration Error)`;

/**
 * Adds a custom menu when the document is opened.
 */
function onOpen() {
  try {
    if (!isValidHeadingLevel(TARGET_HEADING_LEVEL)) {
      Logger.log(`onOpen: TARGET_HEADING_LEVEL (${TARGET_HEADING_LEVEL}) is invalid. Displaying error menu.`);
      showConfigurationErrorMenu("Invalid setting (integer 1-6)");
      return;
    }

    DocumentApp.getUi()
      .createMenu(SCRIPT_NAME)
      .addItem(`Insert Page Break Before "Heading ${TARGET_HEADING_LEVEL}"`, 'insertPageBreakBeforeHeading')
      .addToUi();
    Logger.log(`onOpen: Menu added successfully (Target: Heading ${TARGET_HEADING_LEVEL}).`);

  } catch (e) {
    Logger.log(`onOpen: Error while adding menu: ${e}\n${e.stack}`);
    showConfigurationErrorMenu("Error adding menu");
  }
}

/**
 * Adds a menu item indicating an error if there is a configuration problem.
 * @param {string} reason The reason for the error
 */
function showConfigurationErrorMenu(reason) {
  try {
    DocumentApp.getUi()
      .createMenu(SCRIPT_ERROR_MENU_NAME)
      .addItem(`Check Settings (${reason})`, 'showConfigurationError')
      .addToUi();
  } catch (e) {
    Logger.log(`showConfigurationErrorMenu: Further error while displaying error menu: ${e}`);
    // Log only, considering the UI might be unavailable
  }
}

/**
 * Alert function to display on configuration error.
 */
function showConfigurationError() {
  let currentSetting = "Undefined or inaccessible";
  try {
    currentSetting = (typeof TARGET_HEADING_LEVEL !== 'undefined') ? String(TARGET_HEADING_LEVEL) : "Undefined";
  } catch(e) { /* Ignore errors if inaccessible */ }

  const message = `There is a problem with the script's settings.\n\n`
                + `Current setting value: ${currentSetting}\n\n`
                + `Please open the script editor, check and correct the "TARGET_HEADING_LEVEL" value (an integer from 1 to 6) at the top of the file, and **save the file**.\n\n`
                + `(e.g., const TARGET_HEADING_LEVEL = 3;)`
  DocumentApp.getUi().alert("Script Configuration Error", message, DocumentApp.getUi().ButtonSet.OK);
}

/**
 * Determines if the specified heading level is valid (an integer from 1 to 6).
 * @param {any} level The value to check
 * @return {boolean} True if valid
 */
function isValidHeadingLevel(level) {
    return typeof level === 'number' && Number.isInteger(level) && level >= 1 && level <= 6;
}

/**
 * Returns the ParagraphHeading constant corresponding to the specified numeric heading level.
 * @param {number} level The heading level (integer from 1-6)
 * @return {DocumentApp.ParagraphHeading | null} The corresponding constant, or null if invalid
 */
function getHeadingConstant(level) {
  // Assumes this is already checked by isValidHeadingLevel, but checking again just in case
  if (!isValidHeadingLevel(level)) {
    Logger.log(`getHeadingConstant: Invalid level: ${level}`);
    return null;
  }
  // Use an object lookup for brevity
  const headingMap = {
    1: DocumentApp.ParagraphHeading.HEADING1,
    2: DocumentApp.ParagraphHeading.HEADING2,
    3: DocumentApp.ParagraphHeading.HEADING3,
    4: DocumentApp.ParagraphHeading.HEADING4,
    5: DocumentApp.ParagraphHeading.HEADING5,
    6: DocumentApp.ParagraphHeading.HEADING6,
  };
  return headingMap[level] || null; // Return null if no corresponding value for level
}

/**
 * Gets the name of a ParagraphHeading Enum value.
 * @param {DocumentApp.ParagraphHeading | any} enumValue The ParagraphHeading Enum value
 * @return {string} The name of the Enum (e.g., 'HEADING3'), or 'UNKNOWN' if not found
 */
function getHeadingEnumName(enumValue) {
    if (enumValue === null || typeof enumValue === 'undefined') {
        return 'NULL_OR_UNDEFINED';
    }
    // Use a cache for efficiency (full scan only on first run)
    if (!this.headingEnumNameCache) {
        this.headingEnumNameCache = {};
        for (const key in DocumentApp.ParagraphHeading) {
            // Avoid properties on the prototype chain
            if (Object.prototype.hasOwnProperty.call(DocumentApp.ParagraphHeading, key)) {
                 this.headingEnumNameCache[DocumentApp.ParagraphHeading[key]] = key;
            }
        }
    }
    return this.headingEnumNameCache[enumValue] || `UNKNOWN_STYLE (${String(enumValue)})`;
}


/**
 * Inserts a page break immediately before elements with the specified heading level in the document.
 */
function insertPageBreakBeforeHeading() {
  const startTime = new Date();
  let doc;

  // --- 1. Initialization and Validation ---
  try {
    doc = DocumentApp.getActiveDocument();
    if (!doc) throw new Error("Could not get the active document.");
    doc.getName(); // Also serves as a permission check
  } catch (e) {
    handleExecutionError("Document Access Error", e);
    return;
  }

  if (!isValidHeadingLevel(TARGET_HEADING_LEVEL)) {
    Logger.log(`insertPageBreakBeforeHeading: Invalid setting (${TARGET_HEADING_LEVEL}).`);
    showConfigurationError(); // Display details of the configuration error
    return;
  }

  const targetHeadingConstant = getHeadingConstant(TARGET_HEADING_LEVEL);
  if (!targetHeadingConstant) {
    // This error should not normally occur (already checked by isValidHeadingLevel)
    Logger.log(`insertPageBreakBeforeHeading: Failed to get heading constant (level: ${TARGET_HEADING_LEVEL}).`);
    DocumentApp.getUi().alert(`Internal script error: Could not get the heading style constant for the setting (${TARGET_HEADING_LEVEL}).`);
    return;
  }
  const targetHeadingName = getHeadingEnumName(targetHeadingConstant);

  Logger.log(`--- Starting Page Break Insertion Process ---`);
  Logger.log(`Document: ${doc.getName()}, Target Heading: ${TARGET_HEADING_LEVEL} (${targetHeadingName})`);

  // --- 2. Element Traversal and Page Break Insertion ---
  const body = doc.getBody();
  const numChildren = body.getNumChildren();
  let pageBreakInsertedCount = 0;
  let foundTargetHeadings = 0;

  Logger.log(`Number of elements: ${numChildren}. Traversing in reverse order...`);

  for (let i = numChildren - 1; i >= 0; i--) {
    const element = body.getChild(i);
    const elementType = element.getType();
    let headingStyle = null;

    try {
      // Only check element types that can have heading styles
      if (elementType === DocumentApp.ElementType.PARAGRAPH) {
        headingStyle = element.asParagraph().getHeading();
      } else if (elementType === DocumentApp.ElementType.LIST_ITEM) {
        headingStyle = element.asListItem().getHeading();
      } else {
        continue; // Skip irrelevant elements
      }

      // Determine if it is the target heading style
      if (headingStyle === targetHeadingConstant) {
        foundTargetHeadings++;
        // Logger.log(`  Found: Index ${i}, Type: ${elementType}`); // Uncomment if needed

        // Insert if it's not the start of the document and not preceded by a page break
        if (i > 0 && body.getChild(i - 1).getType() !== DocumentApp.ElementType.PAGE_BREAK) {
          try {
            body.insertPageBreak(i);
            pageBreakInsertedCount++;
            // Logger.log(`    -> Inserting page break (Index ${i})`); // Uncomment if needed
          } catch (insertError) {
            Logger.log(`! Error while inserting page break at Index ${i}: ${insertError}`);
            // Continue processing even if an error occurs, but only log it (don't notify user)
          }
        } else if (i > 0) {
          // Logger.log(`    -> Skipped (preceded by a page break)`); // Uncomment if needed
        } else {
          // Logger.log(`    -> Skipped (start of document)`); // Uncomment if needed
        }
      }
    } catch (elementError) {
      // Log unexpected errors during element processing and continue
      Logger.log(`! Error processing Index ${i} (Type: ${elementType}): ${elementError}. Skipping.`);
    }
  }

  // --- 3. Report Results ---
  const endTime = new Date();
  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  Logger.log(`--- Traversal Complete ---`);
  Logger.log(`Processing time: ${duration.toFixed(2)} seconds`);
  Logger.log(`Detected target headings (${targetHeadingName}): ${foundTargetHeadings}`);
  Logger.log(`Inserted page breaks: ${pageBreakInsertedCount}`);

  const resultMessage = buildResultMessage(pageBreakInsertedCount, foundTargetHeadings, targetHeadingName, duration);
  DocumentApp.getUi().alert("Processing Complete", resultMessage, DocumentApp.getUi().ButtonSet.OK);

  Logger.log(`--- Page Break Insertion Process Complete ---`);
}

/**
 * Handles runtime errors and notifies the user.
 * @param {string} context The context in which the error occurred
 * @param {Error} error The error object that occurred
 */
function handleExecutionError(context, error) {
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
 * @param {number} insertedCount The number of page breaks inserted
 * @param {number} foundCount The number of target headings found
 * @param {string} headingName The name of the target heading style
 * @param {number} duration The processing time in seconds
 * @returns {string} The message to be displayed in the alert
 */
function buildResultMessage(insertedCount, foundCount, headingName, duration) {
    const headingLevelName = `"${headingName}" style (Heading ${TARGET_HEADING_LEVEL})`;

    if (insertedCount > 0) {
        return `Inserted page breaks before ${insertedCount} instances of ${headingLevelName}.\n\nProcessing time: ${duration.toFixed(2)} seconds`;
    } else if (foundCount > 0) {
        return `${headingLevelName} was found in ${foundCount} places, but no page breaks were inserted.\n(This may be because the heading is at the beginning of the document or a page break already exists.)\n\nProcessing time: ${duration.toFixed(2)} seconds`;
    } else {
        return `No elements with the ${headingLevelName} style applied were found.\n\nPlease check the following:\n`
             + `1. Is the setting value (${TARGET_HEADING_LEVEL}) correct?\n`
             + `2. Has the correct heading style been applied to the target text from [Format] > [Paragraph styles]?\n`
             + `3. Have the script permissions been approved?`;
    }
}
 ```
 