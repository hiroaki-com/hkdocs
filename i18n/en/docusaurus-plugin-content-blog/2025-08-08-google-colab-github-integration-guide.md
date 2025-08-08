---
title: Guide to Integrating Google Colab with GitHub
authors: [hk]
tags: [google-colab, github, vscode, git, python, development]
---

This guide provides practical steps for transitioning Python code created in Google Colab to a full-scale development workflow using MacBook VSCode and GitHub. For those who have been developing exclusively on Colab, this tutorial introduces specific steps to build version control with GitHub and a comfortable editing environment with local VSCode, establishing a more efficient development system.

- **Repository Setup**: Building the receiving environment on GitHub
- **Initial Integration**: Safe code migration from Colab to GitHub
- **Local Environment**: VSCode editing environment setup
- **Operational Workflow**: Establishing daily development cycles

<!-- truncate -->

## Current Situation and Goals

**Current Situation**
- Code exists only on Google Colab (.ipynb files)
- Private repository is already prepared on GitHub
- No code exists in local environment
- Version control with Git has not been implemented

**Goals**
- Manage code change history with GitHub
- Comfortable editing environment on MacBook/VSCode
- Smooth operation verification on Google Colab

## 1. GitHub Repository Setup

Create a main branch in the repository to accept saves from Colab.

1. Open your GitHub repository
2. Create a README file
   - Click "Create a new file" or "Add a README file"
   - Creating README.md will automatically generate the main branch

## 2. Initial Save from Colab to GitHub

1. Open your notebook in Colab
2. Select **File > Save a copy in GitHub**
3. Configure the save destination
   - **Repository**: Select your-username/your-repository-name
   - **Branch**: Select main
   - **Commit message**: "Initial commit of notebook from Colab" or similar
4. Execute save with OK button

## 3. Local Development Environment Setup

### Repository Cloning

1. Click the green "Code▼" button on GitHub
2. Copy the HTTPS URL
3. Execute the following in terminal

```bash
git clone [copied repository URL]
```

### VSCode Configuration

1. Open the cloned folder in VSCode
2. Install necessary extensions
   - Python
   - Jupyter
3. Configure to open .ipynb files as text
   - Right-click file > "Open with..." > "Text Editor"
   - Displays in JSON format, making Git management easier

## 4. Daily Development Workflow

### From Editing to GitHub Save

1. **Code editing in VSCode**
   - Freely implement ideas locally

2. **Save changes to GitHub**
   ```bash
   git add .
   git commit -m "Feature addition: Improved user authentication logic"
   git push origin main
   ```

3. **Operation verification in Colab**
   - **File > Open notebook** > **GitHub** tab
   - Search by repository URL: `https://github.com/your-username/your-repository-name`
   - Open and run the latest version of the notebook

---

## Important Operational Rules

### 1. Sync Confirmation Before Starting Work
**Regardless of where you edit, always check for the latest version before starting work**

**When working locally**
```bash
git pull origin main
```

**When working in Colab**
- File > Open notebook > Open latest version from GitHub tab

### 2. Save Upon Completion of Editing
**Always save to GitHub when editing is complete**

**When editing locally**
```bash
git add .
git commit -m "Description of changes"
git push origin main
```

**When editing in Colab**
- Execute File > Save a copy in GitHub
- Include change details in commit message

### 3. Avoid Simultaneous Editing in Multiple Locations
**Do not edit the same file simultaneously in multiple environments**
- Start work in another environment only after completing one task and saving to GitHub
- If work is in progress in another environment, complete that work first

### 4. Handling Conflicts
**If conflicts occur**
- Check `git status` locally
- Use `git stash` for temporary storage if necessary
- Get latest version with `git pull origin main`
- Merge manually or utilize VSCode's diff display feature

## Summary

This procedure enables the construction of an efficient development environment where Google Colab, GitHub, and local VSCode work together.

- **GitHub**: Reliable version control and code history retention
- **Local VSCode**: Comfortable and feature-rich editing environment
- **Google Colab**: Execution environment leveraging powerful GPU/TPU

By leveraging the characteristics of each environment, you can realize a flexible and safe development workflow. By following proper operational rules, you can avoid conflicts while efficiently advancing development from anywhere.

import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />

##### References

- [Google Colab | GitHub Integration](https://colab.research.google.com/github/)
- [GitHub Docs | Cloning a Repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Visual Studio Code | Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
