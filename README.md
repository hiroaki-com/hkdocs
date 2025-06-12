# Hk Docs

This website is built using [Docusaurus](https://docusaurus.io/), a static website generator.
The live production site can be viewed at [hkdocs.com](https://hkdocs.com/).

## Prerequisites

Ensure you have Git installed for cloning the repository.
Other dependencies depend on the setup method you choose (Traditional or Docker).

*   **Git**: For cloning the repository.

## Project Setup

1.  **Clone the repository:**
    Open your terminal, navigate to your desired directory, and clone the repository:
    ```bash
    # Example:
    # mkdir -p ~/dev
    # cd ~/dev
    git clone https://github.com/hiroaki-com/hkdocs.git
    cd hkdocs
    ```

Now, choose one of the following methods for setting up your local development environment:

### Method 1: Local Environment Setup (Traditional)

This method requires installing Node.js and pnpm directly on your machine.

**Prerequisites for Traditional Setup:**

*   **Node Version Manager (nvm)**: Recommended for managing Node.js versions. Install from [here](https://github.com/nvm-sh/nvm#install--update-script) if you don't have it.
*   **Node.js**: Version `22.16.0` (as specified in `.nvmrc`).
*   **pnpm**: Version `10.11.0` (as specified in `package.json`'s `packageManager` field). Corepack (usually bundled with Node.js >= 16.10) should be enabled.

**Setup Steps (Traditional):**

1.  **Set up Node.js version:**
    Navigate to the project directory (`hkdocs`) and use nvm:
    ```bash
    nvm use
    # If the required version is not installed, nvm will prompt you to install it.
    ```
    Ensure nvm is correctly sourced in your shell profile (e.g., `~/.bashrc`, `~/.zshrc`).

2.  **Enable Corepack (if not already enabled):**
    Corepack manages pnpm.
    ```bash
    corepack enable pnpm
    ```

3.  **Install project dependencies:**
    This project uses pnpm. Corepack will use the version specified in `package.json`.
    ```bash
    pnpm install --frozen-lockfile
    ```

### Method 2: Docker Compose Setup (Recommended)

This method uses Docker to create an isolated development environment.

**Prerequisites for Docker Compose Setup:**

*   **Docker Desktop** (or a compatible Docker environment): Install from [Docker's official website](https://www.docker.com/products/docker-desktop/).

**Setup Steps (Docker Compose):**

1.  Ensure Docker Desktop is running.
2.  Navigate to the project directory (`hkdocs`).
3.  Build the Docker image and start the development server:
    ```bash
    docker-compose up --build
    ```
    For subsequent starts (if `Dockerfile.dev` or `docker-compose.yml` haven't changed), you can simply run:
    ```bash
    docker-compose up
    ```

## Local Development Server

### For Traditional Setup:

Start the Docusaurus development server:
```bash
pnpm start
```
This typically opens the site at `http://localhost:3000`.

### For Docker Compose Setup:

The `docker-compose up` command already starts the development server.
Access the site in your browser at:
`http://localhost:3000`

Most changes to source files will be reflected live in the browser for both setup methods.

### Stopping the Development Server

*   **Traditional Setup**: Press `Ctrl+C` in the terminal where `pnpm start` is running.
*   **Docker Compose Setup**: Press `Ctrl+C` in the terminal where `docker-compose up` is running. Then, to stop and remove containers:
    ```bash
    docker-compose down
    ```

## Build

To generate the static website content for production:

### For Traditional Setup:

```bash
pnpm build
```

### For Docker Compose Setup:

Execute the build command inside the Docker container:
```bash
docker-compose exec app pnpm build
```

This command generates static content into the `build` directory. The contents of this directory can then be deployed to any static content hosting service.
