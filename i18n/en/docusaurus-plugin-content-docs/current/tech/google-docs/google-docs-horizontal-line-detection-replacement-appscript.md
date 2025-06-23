---
sidebar_position: 5
title: AppScript for Detecting/Replacing Horizontal Lines in Google Docs
---

# AppScript for Detecting/Replacing Horizontal Lines in Google Docs

### Background
- It became necessary to bulk-change horizontal lines, which were used as dividers in a document, to a specific text notation (e.g., "Replaced Text").
- These horizontal lines (---) were generated when converting a Markdown file to a Google Doc, but they could not be detected using the standard find and replace functions (`⌘＋F` / `⌘＋H`).
- Manual, visual inspection was inefficient, highlighting the need to streamline this routine task.
- This script was created to automate such routine replacement tasks and improve editing efficiency.

### Use Cases
- Bulk-replace all horizontal lines in a document with a specified fixed string (in this script, "Replaced Text").
- For example, it can be used to convert temporary dividers (horizontal lines) into formal section headings or annotations.
- Efficiently format the handling of horizontal lines consistently across a large number of documents.

### How to Use
1.  Open a Google Docs document.
2.  From the menu bar, select "Extensions" > "Apps Script" to open the script editor.
3.  Copy and paste the entire script below into the script editor that appears.
    If other scripts already exist, either create a new script file ("File" > "New" > "Script file") and paste the code there, or append it to the end of the existing code.
4.  Click the floppy disk icon ("Save project") at the top of the script editor to save the script.
5.  At the top of the script editor, select `replaceHorizontalRules` as the function to run. (Usually, if there's only one function, it will be selected automatically.)
6.  Click the run button (the play icon labeled "Run") to execute the script.
    On the first run, an "Authorization required" dialog will appear. Follow the instructions to authorize the script's execution.
7.  After execution, all horizontal lines in the document will be replaced with the text "Replaced Text".

```javascript
function replaceHorizontalRules() {
  const body = DocumentApp.getActiveDocument().getBody();
  const hrArray = [];

  // 1) Collect all horizontal lines
  // Search for horizontal rule (HORIZONTAL_RULE) elements in the document body.
  let res = body.findElement(DocumentApp.ElementType.HORIZONTAL_RULE);
  while (res) {
    // Add the found horizontal rule element to the hrArray.
    // Since findElement returns a RangeElement, use getElement() to get the actual Element.
    hrArray.push(res.getElement());
    // Find the next horizontal rule, using the current result (res) as the starting point.
    res = body.findElement(DocumentApp.ElementType.HORIZONTAL_RULE, res);
  }

  // 2) Replace from the end of the array
  // Processing from the end of the array is done to avoid issues with
  // changing indices of preceding elements during deletion/insertion.
  for (let i = hrArray.length - 1; i >= 0; i--) {
    const hr = hrArray[i];                       // Get the horizontal rule element from the array
    const para = hr.getParent();                 // Get the parent paragraph element containing the horizontal rule
    const parentBody = para.getParent();         // Get the parent of that paragraph (usually the document body)
    const index = parentBody.getChildIndex(para); // Get the position (index) of the paragraph within the body

    // Remove the entire paragraph containing the horizontal rule.
    // This is because a horizontal rule is typically treated as its own paragraph.
    parentBody.removeChild(para);
    // Insert a new paragraph with the text "Replaced Text" at the original paragraph's location.
    parentBody.insertParagraph(index, 'Replaced Text');
  }
}
```
