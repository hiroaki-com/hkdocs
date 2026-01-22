---
title: A Record of Introducing Docker Compose to a Docusaurus Project
authors: [hk]
tags: [docker, docker-compose]
---

This article organizes the steps I took to introduce `Docker Compose` for the local development environment of a Docusaurus project.

Background:

To standardize the local development environment and simplify setup, I introduced Docker Compose to my Docusaurus (`v3.8.0`) project. Before this, I was running Node.js (`v22.16.0`) and pnpm (`v10.11`) by installing them directly on each developer's local machine.

<!-- truncate -->

#### 1. Creating the Development Dockerfile (`Dockerfile.dev`)

To define a Docker image specifically for local development, I created `Dockerfile.dev` following these steps.

1.  **File Creation**
    I created a file named `Dockerfile.dev` in the project root.

2.  **Specify Base Image**
    For consistency with the production `Dockerfile`, I specified `node:22.16.0-alpine` as the base image.

3.  **Enable pnpm and Install Dependencies**
    After running `corepack enable pnpm`, I copied `package.json` and `pnpm-lock.yaml` into the container and installed all packages, including development dependencies, with `pnpm install --frozen-lockfile`.

4.  **Expose Port and Set Start Command**
    I exposed Docusaurus's default development port `3000` and set the startup command to `pnpm start --host 0.0.0.0 --no-open`. This allows access from outside the container while suppressing the unnecessary automatic opening of a browser.

    ```dockerfile
    # syntax=docker/dockerfile:1
    FROM node:22.16.0-alpine AS development

    WORKDIR /app

    RUN corepack enable pnpm

    COPY package.json pnpm-lock.yaml ./
    RUN pnpm install --frozen-lockfile

    EXPOSE 3000
    CMD ["pnpm", "start", "--host", "0.0.0.0", "--no-open"]
    ```

#### 2. Creating the Docker Compose Configuration File (`docker-compose.yml`)

To define and manage the development service, I created `docker-compose.yml` with the following steps.

1.  **File Creation**
    I created a file named `docker-compose.yml` in the project root.

2.  **Service Definition**
    I defined a development service named `app` and set the container name to `hkdocs_dev_app`. The build context was set to the project root (`.`), and the Dockerfile to use was specified as `Dockerfile.dev`.

3.  **Port Mapping Configuration**
    I mapped the host's port `3000` to the container's port `3000`.

4.  **Volume Mount Configuration**
    I set `.:/app:cached` for source code synchronization, and `/app/node_modules` and `/app/.docusaurus` as container-only volumes to isolate the `node_modules` and `.docusaurus` directories.

5.  **Environment Variables and Other Settings**
    I set `NODE_ENV=development`. I prepared `CHOKIDAR_USEPOLLING=true` (commented out) for potential hot-reloading instability. For interactive execution, I set `tty: true` and `stdin_open: true`.

    ```yaml
    version: '3.8'

    services:
      app:
        build:
          context: .
          dockerfile: Dockerfile.dev
        container_name: hkdocs_dev_app
        ports:
          - "3000:3000"
        volumes:
          - .:/app:cached
          - /app/node_modules
          - /app/.docusaurus
        environment:
          - NODE_ENV=development
          # CHOKIDAR_USEPOLLING=true
        tty: true
        stdin_open: true
    ```

#### 3. Updating the Docker Build Context Exclusion File (`.dockerignore`)

To optimize Docker image build efficiency and size, I updated the `.dockerignore` file. The main items to exclude are `.git`, `node_modules`, `build`, `.docusaurus`, the Docker files themselves, deployment scripts, environment-specific files, log files, OS-specific files, and IDE configuration files.

> **Note**: `pnpm-lock.yaml` is used by the `COPY` command in `Dockerfile.dev`, so it should not be included in the `.dockerignore` file.

```.dockerignore
# Git
.git
.gitignore

# Node.js
node_modules

# Docusaurus build output and cache
build
.docusaurus

# Docker related files
Dockerfile
Dockerfile.dev
docker-compose.yml
docker-compose.*.yml

# Deployment scripts & environment specific files
deploy.sh
.env
*.local

# Logs
*.log
pnpm-debug.log*

# IDE/Editor specific
.DS_Store
.vscode/
.idea/
```

#### 4. Using and Verifying the Development Environment

1.  **Starting the Development Environment**
    From the terminal in the project root directory, run `docker-compose up --build` for the first time or when configuration files have changed. For subsequent starts, use `docker-compose up`.

2.  **Verifying in the Browser**
    Access `http://localhost:3000` in a browser to confirm that the Docusaurus site is displayed.

3.  **Testing Hot Reloading**
    Edit and save a source code file in an editor on the host machine and confirm that the changes are immediately reflected in the browser (hot reload).

    > **Note**: If hot reloading is unstable, you can address it by uncommenting `CHOKIDAR_USEPOLLING=true` in `docker-compose.yml` or by adding the `--poll` option to the `CMD` in `Dockerfile.dev` and restarting with `docker-compose up --build`.

4.  **Stopping the Development Environment**
    Press `Ctrl + C` in the terminal where the development server is running to stop the container. To completely remove the container and its associated resources (like networks), run the `docker-compose down` command.


import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
