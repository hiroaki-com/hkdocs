---
title: How to Enable Key Repeat on Mac by Disabling the Accent Menu
authors: [hk]
tags: [mac, accent-mark, accent-menu, productivity]
---

### Restore Comfortable Typing on Your Mac

When you're writing or coding on your Mac, have you ever held down a key like `a`, expecting it to repeat like `aaaaa...`, only to be interrupted by a menu of accented characters (like `à`)?

![Accent Menu](/img/accent_menu.png)

This is a handy macOS feature called "`Press and Hold`," but it can hinder your workflow, especially when you need to type the same character repeatedly for coding or writing.

This article provides a clear, step-by-step guide on how to disable this `accent menu` and enable traditional key repeat, even for those unfamiliar with macOS.

*This guide has been tested on the following environment:*
*   **Mac:** M1, 2020
*   **macOS:** Sonoma 15.1 (24B83)

<!-- truncate -->

### 1. Solution Overview

Unfortunately, this setting cannot be changed from the standard "System Settings" panel. You'll need to use the **Terminal**, a tool that lets you give direct commands to your Mac.

The process is very simple and only requires running a single command:

```bash
defaults write -g ApplePressAndHoldEnabled -bool false
```

### 2. Step-by-Step Instructions

Don't worry if you're not familiar with the Terminal. Just follow these steps.

#### Step 1: Open the Terminal

The Terminal is a standard application that comes with macOS. You can open it in one of the following ways:

*   **From Launchpad:** Open Launchpad, go to the "Other" folder, and click on "Terminal."
*   **From Finder:** Open Finder, navigate to "Applications" → "Utilities," and double-click "Terminal.app."
*   **With Spotlight Search:** Press `command (⌘)` + `space` to open Spotlight, type "terminal," and press Enter.

#### Step 2: Enter the Command

Once the Terminal is open, copy and paste the following command, then press the `Enter` key:

```bash
defaults write -g ApplePressAndHoldEnabled -bool false
```

You won't see any significant feedback on the screen, but the setting has now been changed.

#### Step 3: Restart Your Applications

For the change to take effect, you'll need to quit and restart the applications where you want to use key repeat (e.g., Visual Studio Code, TextEdit, your browser, etc.).

Now, when you press and hold a key, the character will repeat continuously.

### 3. How to Revert to the Original Setting (Re-enable the Accent Menu)

If you ever want to go back to the original behavior, open the Terminal again and run the same command, but change the final word from `false` to `true`:

```bash
defaults write -g ApplePressAndHoldEnabled -bool true
```

After running the command, restart your applications, and the accent menu will be enabled again.

### 4. (For Reference) What the Command Means

Here’s a brief explanation of what each part of the command does:

*   `defaults`
    A command to read and write macOS configuration settings (user defaults).
*   `write`
    The subcommand that tells `defaults` to "write" (or change) a setting.
*   `-g`
    A shorthand for `-globalDomain`, which means the change will apply to the "global domain"—affecting all applications.
*   `ApplePressAndHoldEnabled`
    This is the name of the setting key for the "press and hold for accent menu" feature.
*   `-bool false`
    This specifies the setting's type (`bool` = a true/false value) and sets it to `false` (disabled). In other words, it "disables the accent menu feature." Setting it to `true` would enable it.

### Conclusion

In this article, we showed you how to customize your Mac's key-press behavior with a single, simple command in the Terminal.

This tweak can significantly improve productivity, especially for developers who use editors like Vim or writers who frequently need to type repeating characters. Give it a try
