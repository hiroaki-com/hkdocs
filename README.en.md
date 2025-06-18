# HkDocs

[![Build Status](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml/badge.svg)](https://github.com/hiroaki-com/hkdocs/actions/workflows/deploy_hkdocs_to_cloud_run.yml)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-v3.8.0-blue?logo=docusaurus)](https://docusaurus.io/)
[![Node.js](https://img.shields.io/badge/Node.js-v22.16.0-green?logo=nodedotjs)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-v10.11.0-orange?logo=pnpm)](https://pnpm.io/)
[![Code License: MIT](https://img.shields.io/badge/Code%20License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Content License: CC BY-SA 4.0](https://img.shields.io/badge/Content-CC%20BY--SA%204.0-lightgrey.svg)](http://creativecommons.org/licenses/by-sa/4.0/)
[![GitHub](https://img.shields.io/badge/GitHub-hiroaki--com/hkdocs-blue?logo=github)](https://github.com/hiroaki-com/hkdocs)
[![𝕏 (Twitter)](https://img.shields.io/badge/Follow-%40hkdocs-1DA1F2?logo=x)](https://x.com/hkdocs)

HkDocs is a personal knowledge base site that aggregates technical blogs, documentation, diaries, and more.
It is built using [Docusaurus](https://docusaurus.io/) and is available at [hkdocs.com](https://hkdocs.com/).

[日本語版 (Japanese Version)](./README.md)

## 📚 Key Contents

*   **Blog**: Technical insights and development logs.
*   **Docs**: Documentation for specific technologies, exam preparation notes.
*   **Diary**: Daily records and wellness logs.
*   **Browser Memo**: A simple in-browser note-taking feature.

## 🛠️ Tech Stack

*   **Framework**: [Docusaurus](https://docusaurus.io/) v3.8.0
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **UI**: [React](https://reactjs.org/) v19
*   **Package Manager**: [pnpm](https://pnpm.io/) v10.11.0 (via Corepack)
*   **Container**: [Docker](https://www.docker.com/), [Docker Compose](https://docs.docker.com/compose/)
*   **Hosting**: [Google Cloud Run](https://cloud.google.com/run)
*   **CI/CD**: [GitHub Actions](https://github.com/features/actions)
*   **Search**: [Algolia DocSearch](https://docsearch.algolia.com/)

## 🚀 Setup and Development

You can set up a local development environment using either Docker Compose (recommended) or by installing dependencies locally.

### Common Steps

1.  Clone the repository:
    ```bash
    git clone https://github.com/hiroaki-com/hkdocs.git
    cd hkdocs
    ```

### Method 1: Docker Compose (Recommended)

This method uses Docker to create an isolated development environment.

**Prerequisites:**
*   [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Steps:**
```bash
# Build images and start the development server
docker-compose up --build

# For subsequent starts (if Dockerfile.dev or docker-compose.yml haven't changed)
docker-compose up
```
The development server will be accessible at `http://localhost:3000`.

To stop, press `Ctrl+C`, then run:
```bash
docker-compose down
```

### Method 2: Local Environment

Install Node.js and pnpm directly on your machine.

**Prerequisites:**
*   [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm#install--update-script)
*   Node.js v22.16.0 (see `.nvmrc` in the project root)
*   pnpm v10.11.0 (see `packageManager` in `package.json`)

**Steps:**
1.  Set up Node.js version:
    ```bash
    nvm use
    ```
2.  Enable Corepack (for pnpm management):
    ```bash
    corepack enable pnpm
    ```
3.  Install dependencies:
    ```bash
    pnpm install --frozen-lockfile
    ```
4.  Start the development server:
    ```bash
    pnpm start
    ```
    The development server will be accessible at `http://localhost:3000`. Press `Ctrl+C` to stop.

## 📦 Build

Generates static content into the `build` directory.

*   **With Docker Compose:**
    ```bash
    docker-compose exec app pnpm build
    ```
*   **With Local Environment:**
    ```bash
    pnpm build
    ```

## ☁️ Deployment

*   **Automated Deployment**: Pushing to the `main` branch triggers a GitHub Action (`.github/workflows/deploy_hkdocs_to_cloud_run.yml`) to automatically deploy the site to Google Cloud Run.
*   **Manual Deployment**: You can also deploy manually using the `deploy.sh` script. Refer to the comments within the script for details.
    ```bash
    ./deploy.sh
    ```

## ✨ Automated Tasks

*   **Automated X (formerly Twitter) Posts**: When new blog articles are merged into the `main` branch, a GitHub Action (`.github/workflows/post-to-x.yml`) posts article information to the X account ([@hkdocs](https://x.com/hkdocs)).

## 📂 Directory Structure Overview

```
.
├── .github/            # GitHub Actions workflows and scripts
├── blog/               # Blog posts
├── diary/              # Diary entries
├── docs/               # Documentation (tech notes, exam info, etc.)
├── src/                # Docusaurus custom components, CSS, pages
├── static/             # Static assets
├── docusaurus.config.ts # Docusaurus site configuration
├── docker-compose.yml  # Docker Compose configuration
├── Dockerfile          # Dockerfile for production
├── Dockerfile.dev      # Dockerfile for development
├── deploy.sh           # Manual deployment script
├── package.json        # Dependencies and scripts
└── README.md           # This file (Japanese)
└── README.en.md        # This file (English)
```

## 🤝 Contributing

Bug reports, feature requests, and pull requests are welcome. Please create an issue or submit a pull request.

## 📜 License

*   **Code**: [MIT License](./LICENSE)
*   **Content** (in `blog/`, `diary/`, `docs/` directories): [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
