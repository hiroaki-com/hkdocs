# HkDocs

[![Build Status](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml/badge.svg)](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-v3.8.0-blue?logo=docusaurus)](https://docusaurus.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-green?logo=nodedotjs)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-v10.11.0-orange?logo=pnpm)](https://pnpm.io/)
[![Code License: MIT](https://img.shields.io/badge/Code%20License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)
[![GitHub](https://img.shields.io/badge/GitHub-hiroaki--com/hkdocs-blue?logo=github)](https://github.com/hiroaki-com/hkdocs)
[![𝕏 (Twitter)](https://img.shields.io/badge/Follow-%40hkdocs-1DA1F2?logo=x)](https://x.com/hkdocs)

HkDocs is a personal knowledge base that consolidates technical blogs, documents, diaries, and more.
It is built with [Docusaurus](https://docusaurus.io/) and is published at [hkdocs.com](https://hkdocs.com/). The entire site supports both Japanese and English.

[README.md (Japanese Version)](./README.md)

## 📚 Main Content

*   **Blog**: Technical insights and development logs.
*   **Docs**: Documentation for specific technologies and exam prep notes.
*   **Diary**: Daily records and wellness logs.
*   **Browser Memo**: A simple memo feature that runs in the browser.

## 🛠️ Tech Stack

*   **Framework**: [Docusaurus](https://docusaurus.io/) v3.8.0
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://reactjs.org/) v19
*   **Package Manager**: [pnpm](https://pnpm.io/) v10.11.0 (via Corepack)
*   **Internationalization (i18n)**: [Docusaurus i18n](https://docusaurus.io/docs/i18n/introduction)
*   **Container**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
*   **Hosting**: [Google Cloud Run](https://cloud.google.com/run)
*   **CI/CD**: [GitHub Actions](https://github.com/features/actions)
*   **Search**: [Algolia DocSearch](https://docsearch.algolia.com/)

## 🚀 Setup and Development

You can set up a local development environment using either Docker Compose (recommended) or a direct local installation.

### Common Prerequisites

1.  Clone the repository.
    ```bash
    git clone https://github.com/hiroaki-com/hkdocs.git
    cd hkdocs
    ```

---

### Method 1: Docker Compose (Recommended)

Build an isolated development environment using Docker.

**Prerequisites**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Steps**

1.  **Start the Development Server**

    Start the development server with the default language (Japanese).
    ```bash
    # First time, or if Dockerfile.dev has changed:
    docker-compose up --build

    # Subsequent starts:
    docker-compose up
    ```
    The development server is accessible at `http://localhost:3000`.

2.  **i18n Development (Specifying a Locale)**

    To start the development server for a specific locale, use the following commands:

    *   **For the English site:**
        ```bash
        docker-compose run --rm --service-ports app pnpm start --locale en
        ```
    *   **For the Japanese site:**
        ```bash
        docker-compose run --rm --service-ports app pnpm start --locale ja
        ```

3.  **Stopping the Server**

    If you started with `docker-compose up`, press `Ctrl+C` and then run:
    ```bash
    docker-compose down
    ```

---

### Method 2: Local Environment

Develop by installing Node.js and pnpm directly on your machine.

**Prerequisites**
*   [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#install--update-script)
*   Node.js v22.16.0 (see `.nvmrc`)
*   pnpm v10.11.0 (see `packageManager` in `package.json`)

**Steps**
1.  **Environment Setup**
    ```bash
    # 1. Use the Node.js version specified in the project
    nvm use

    # 2. Enable Corepack (to manage the pnpm version)
    corepack enable pnpm

    # 3. Install dependencies
    pnpm install --frozen-lockfile
    ```

2.  **Start the Development Server**
    *   **Start with the default locale (Japanese):**
        ```bash
        pnpm start
        ```
    *   **Start with the English locale:**
        ```bash
        pnpm start --locale en
        ```
    The development server is accessible at `http://localhost:3000`. To stop, press `Ctrl+C`.

## 📦 Build and Preview

### Build

This generates the static content for all locales into the `build` directory.

*   **With Docker Compose:**
    ```bash
    # `app` is the service name defined in docker-compose.yml
    docker-compose run --rm app pnpm build
    ```
*   **In a local environment:**
    ```bash
    pnpm build
    ```

### Preview

Preview the built site in a production-like environment.

*   **With Docker Compose:**

    Start the preview server, specifying port `3000`, which is exposed in `docker-compose.yml`.
    ```bash
    docker-compose run --rm --service-ports app pnpm serve -- --port 3000 --host 0.0.0.0
    ```
    The server is accessible at `http://localhost:3000`.

*   **In a local environment:**

    Preview using `http-server`. By default, it starts at `http://localhost:8080`.
    ```bash
    pnpm serve
    ```
    To change the port, specify it as an argument:
    ```bash
    # Example: Start on port 3000
    pnpm serve -- --port 3000
    ```

## ☁️ Deployment

*   **Automatic Deployment**: Pushing to the `main` branch triggers a GitHub Actions workflow (`.github/workflows/deploy_hkdocs_to_cloud_run.yml`) that automatically builds and deploys the site to Google Cloud Run.
*   **Manual Deployment**: You can also deploy manually using the `deploy.sh` script. Refer to the comments within the script for details.
    ```bash
    ./deploy.sh
    ```

## ✨ Automation

*   **Automated Posts to X (formerly Twitter)**: When a new blog article is merged into the `main` branch, a GitHub Actions workflow (`.github/workflows/post-to-x.yml`) posts the article information to the X account ([@hkdocs](https://x.com/hkdocs)).

## 📂 Directory Structure Overview

```plaintext
.
├── .github/              # GitHub Actions workflows and scripts
├── blog/                 # Blog posts (Japanese)
├── docs/                 # Documents (tech notes, exam info, etc.)
├── diary/                # Diary entries (Japanese)
├── i18n/                 # Internationalization (i18n) files (en: English translations)
├── src/                  # Docusaurus custom components, CSS, and pages
├── static/               # Static assets (images, etc.)
├── Dockerfile            # Production Dockerfile
├── Dockerfile.dev        # Development Dockerfile
├── LICENSE               # Project license
├── README.md             # Japanese README
├── README.en.md          # This file (English)
├── deploy.sh             # Manual deployment script
├── docusaurus.config.ts  # Docusaurus site configuration
├── docker-compose.yml    # Docker Compose configuration
├── package.json          # Dependencies and scripts
├── pnpm-lock.yaml        # pnpm lock file
├── sidebars.ts           # Document sidebar configuration
└── tsconfig.json         # TypeScript configuration
```

## 📜 License

*   **Code**: [MIT License](./LICENSE)
*   **Content** (under `blog/`, `diary/`, `docs/`, `i18n/`): [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
