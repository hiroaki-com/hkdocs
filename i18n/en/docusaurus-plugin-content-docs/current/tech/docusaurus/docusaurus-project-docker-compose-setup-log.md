---
title: Setting Up Docker Compose for a Docusaurus Project
sidebar_position: 3
tags: [Docker, Docker Compose]
---

This article outlines the steps taken to introduce `Docker Compose` for local development of a Docusaurus project.

**Background:**

To standardize the local development environment and simplify setup, I integrated Docker Compose into my Docusaurus (`v3.8.0`) project. Previously, the development workflow required developers to directly install Node.js (`v22.16.0`) and pnpm (`v10.11`) on their local machines.

<!-- truncate -->

#### 1. Creating the Development Dockerfile (`Dockerfile.dev`)

To define a Docker image specifically for local development, I created `Dockerfile.dev` with the following steps.

1.  **File Creation**
    I created a file named `Dockerfile.dev` in the project root.

2.  **Base Image Specification**
    To maintain consistency with the production `Dockerfile`, I specified `node:22.16.0-alpine` as the base image.

3.  **Enabling pnpm and Installing Dependencies**
    After running `corepack enable pnpm`, I copied `package.json` and `pnpm-lock.yaml` into the container and installed all packages, including development dependencies, with `pnpm install --frozen-lockfile`.

4.  **Exposing Port and Setting Start Command**
    I exposed port `3000`, the default for Docusaurus development, and set the start command to `pnpm start --host 0.0.0.0 --no-open`. This allows access from outside the container while preventing the browser from opening automatically.

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

To define and manage the development service, I created `docker-compose.yml` as follows.

1.  **File Creation**
    I created a file named `docker-compose.yml` in the project root.

2.  **Service Definition**
    I defined a development service named `app` and set its container name to `hkdocs_dev_app`. The build context was set to the project root (`.`), and the Dockerfile was specified as `Dockerfile.dev`.

3.  **Port Mapping Configuration**
    I mapped the host's port `3000` to the container's port `3000`.

4.  **Volume Mount Configuration**
    For source code synchronization, I used `.:/app:cached`. To isolate `node_modules` and `.docusaurus` directories, I configured them as container-specific volumes: `/app/node_modules` and `/app/.docusaurus`.

5.  **Environment Variables and Other Settings**
    I set `NODE_ENV=development`. `CHOKIDAR_USEPOLLING=true` was prepared as a commented-out option for cases of unstable hot-reloading. For interactive execution, I set `tty: true` and `stdin_open: true`.

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

#### 3. Updating `.dockerignore` to Exclude Build Context

To optimize build efficiency and image size, I updated the `.dockerignore` file. The main exclusions include `.git`, `node_modules`, `build`, `.docusaurus`, Docker-related files, deployment scripts, environment-specific files, log files, OS-specific files, and IDE settings.

> **Note**: `pnpm-lock.yaml` is not included in `.dockerignore` because it is used by the `COPY` command in `Dockerfile.dev`.

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
    From the project root directory in the terminal, I start the environment using `docker-compose up --build` for the first time or after configuration changes, and `docker-compose up` for subsequent starts.

2.  **Verifying in the Browser**
    I access `http://localhost:3000` in a browser to confirm that the Docusaurus site is displayed correctly.

3.  **Testing Hot-Reloading**
    I edit and save a source code file on the host machine's editor to verify that the changes are immediately reflected in the browser (hot-reloading).

    > **Remark**: If hot-reloading is unstable, uncommenting `CHOKIDAR_USEPOLLING=true` in `docker-compose.yml` or adding the `--poll` option to the `CMD` in `Dockerfile.dev` and restarting with `docker-compose up --build` can resolve the issue.

4.  **Stopping the Development Environment**
    Pressing `Ctrl + C` in the terminal where the dev server is running stops the container. To completely remove the container and its related resources (like networks), I run the `docker-compose down` command.
