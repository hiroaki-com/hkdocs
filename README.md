# Hk Docs

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Git**: For cloning the repository.
*   **Node Version Manager (nvm)**: To manage Node.js versions. If not installed, follow the instructions [here](https://github.com/nvm-sh/nvm#install--update-script).
*   **Corepack**: Enabled in Node.js to manage package managers like pnpm. If not enabled, run `corepack enable pnpm` after installing Node.js (often `npm install -g corepack@latest` is recommended first).

## Setup

Follow these steps to set up the project locally:

1.  **Clone the repository:**
    Open your terminal and navigate to the directory where you want to place the project. Then, clone the repository:
    ```bash
    # Example: Navigate to your development folder
    mkdir -p ~/dev
    cd ~/dev

    git clone https://github.com/hiroaki-com/hkdocs.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd hkdocs
    ```

3.  **Apply the correct Node.js version:**
    This project uses a specific Node.js version defined in the `.nvmrc` file. Use nvm to apply it:
    ```bash
    nvm use
    # If the required version is not installed, nvm will prompt you to install it. Follow the instructions.
    ```
    *(Ensure nvm is correctly sourced in your shell profile, e.g., `~/.zshrc`)*

4.  **Install project dependencies:**
    This project uses pnpm as its package manager. With Corepack enabled and the correct Node.js version active, install the dependencies:
    ```bash
    pnpm install
    ```
    *(Corepack will automatically use the pnpm version specified in `package.json`)*

## Local Development

To start the local development server and preview the website:

```bash
pnpm start
```

This command starts a local development server (typically at `http://localhost:3000`) and opens up a browser window. Most changes you make to the files will be reflected live without having to restart the server.

## Build

To build the static website content for deployment:

```bash
pnpm build
```

This command generates static content into the `build` directory. The contents of this directory can be served using any static contents hosting service (e.g., Netlify, Vercel, GitHub Pages).

## Deployment

If you are using Docusaurus's built-in deployment script (often configured for GitHub Pages or similar services), you can use the following command. The exact command depends on your site's configuration (e.g., SSH vs HTTPS for Git push).

Using SSH:

```bash
USE_SSH=true pnpm deploy
```

Not using SSH (requires GitHub username):

```bash
GIT_USER=<Your GitHub username> pnpm deploy
```

