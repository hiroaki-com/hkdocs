---
title: "Solving Docusaurus i18n Routing and Deployment Issues"
sidebar_position: 8
tags: [Docusaurus, i18n, routing, deployment, Docker, Cloud Run]
---

This article documents the process of troubleshooting and resolving two challenging issues encountered after adding internationalization (i18n) to a Docusaurus v3 site: "**client-side routing collapse**" and "**container startup failure on Cloud Run**."

**Environment:**

*   **Site Generator:** Docusaurus v3
*   **Hosting:** Google Cloud Run
*   **Development & Deployment:** Docker, GitHub Actions
*   **Package Manager:** pnpm

<!-- truncate -->

### 1. The Problems Encountered

After configuring i18n, I faced the following two critical issues during local production build verification (`pnpm build` + `pnpm serve`) and after deploying to Cloud Run.

#### Problem 1: Client-Side Routing Collapse

When accessing the site and switching languages using the locale switcher, the following symptoms appeared:

*   **Incorrect URL Accumulation**: Every time the language was switched, the locale prefix was repeatedly added to the URL, resulting in paths like `/en/en/en/...`.
*   **React Hydration Errors**: The browser console was flooded with `Warning: Expected server HTML to contain a matching ...` errors. This is a severe error in SPAs, indicating a mismatch between the server-generated HTML and the client's DOM structure.
*   **Eventual 404**: The attempt to access the malformed URL ultimately led to the site's 404 page.

#### Problem 2: Container Startup Failure on Cloud Run

After applying a fix for Problem 1 and redeploying, a new issue emerged: the container itself would not start on Cloud Run.

*   **Container Startup Timeout**: The Cloud Run logs recorded the following error:
    > The user-provided container failed to start and listen on the port defined provided by the PORT=8080 environment variable.

    This meant that the deployed Docker container failed to start its web server correctly on the port specified by Cloud Run (8080).

### 2. Identifying the Causes and Implementing Solutions

I diagnosed each problem by isolating the layers of the application.

#### 2.1. Solving Problem 1 (Routing Collapse)

*   **Cause**:
    The root cause was the **local verification server's lack of support for Single-Page Applications (SPAs)**.
    The default configuration of the `serve` package I was using at the time could not properly handle Docusaurus's "pretty URLs" (like `/docs/intro/`). It failed to fall back requests to the root `index.html`. Consequently, the server returned a 404 error before the client-side React Router could interpret the URL, causing the entire routing system to collapse.

*   **Solution**:
    I switched the local verification server to `http-server`, which supports SPA mode out of the box.

    1.  **Install `http-server`**
        ```bash
        # Install as a development dependency
        pnpm add -D http-server
        ```

    2.  **Update the `serve` script in `package.json`**
        I added the `--single` option to ensure that any request for an unresolved path would fall back to the root `index.html`. This correctly delegates URL resolution to the client-side React Router.
        ```json:package.json
        "scripts": {
          "serve": "http-server ./build --single"
        }
        ```

#### 2.2. Solving Problem 2 (Container Startup Failure)

*   **Cause**:
    Ironically, `http-server`, which was introduced to fix Problem 1, was the direct cause of this new issue. The fundamental problem was an **improper classification of dependencies**.

    I had installed `http-server` as a `devDependency`. As a result, it was removed by the `pnpm prune --prod` command during the production Docker build. This meant `http-server` did not exist in the final production container, causing the `pnpm run serve` command to fail and the container to exit immediately.

*   **Solution**:
    I moved `http-server` to `dependencies` to make it available in the production environment.

    1.  **Reclassify the Dependency**
        ```bash
        # Remove from devDependencies
        pnpm remove -D http-server
        # Reinstall as a dependency
        pnpm add http-server
        ```
    2.  **Remove Unnecessary Packages**
        The old `serve` package was no longer needed, so I removed it from the project entirely.
        ```bash
        pnpm remove serve
        ```

With these fixes, the container started correctly on port 8080, and the deployment to Cloud Run completed successfully.

### 3. Improved Development and Deployment Workflow

Based on this experience, I standardized the development process as follows:

#### 3.1. Development Commands

*   **Daily Development (with Hot Reload)**:
    ```bash
    # Docker environment
    docker-compose up
    # Local environment
    pnpm start
    ```
*   **Developing for a Specific Language (e.g., English)**:
    ```bash
    # Docker environment
    docker-compose run --rm --service-ports app pnpm start --locale en --host 0.0.0.0
    # Local environment
    pnpm start --locale en
    ```

#### 3.2. Final Pre-Deployment Verification

Before any deployment, I **always** verify the production build artifacts using the following command flow:
```bash
# 1. Build the static files for production
pnpm build

# 2. Serve the build artifacts with an SPA-compatible server
pnpm serve
```

#### 3.3. Content Management

When adding a new page, I now ensure that its translated version is also placed in the appropriate location within the `i18n/[locale]/...` directory. Content synchronization is crucial, as a missing translation will result in a 404 error for that page in that language.

### 4. Conclusion

This series of issues was a compound problem stemming from a poor choice of local development server and a dependency management mistake in the Docker build process. By systematically isolating the cause at each layer and applying the right tools and configurations, I was able to re-establish a robust development and deployment foundation that reliably supports the i18n feature.
