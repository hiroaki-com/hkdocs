HkDocs Specification (As of 2025/07/27)
=======================================


I. Basic Information
--------------------
  1. Project Name: hkdocs
  2. Domain: `hkdocs.com`
  3. Project Objective: To build and publish a personal knowledge base that
     consolidates a tech blog, learning records (Docs), a diary (Diary),
     and a collection of news links.
  4. Project Owner: hiroaki-com
  5. Public Site URL: https://hkdocs.com/
  6. Source Code Repository: https://github.com/hiroaki-com/hkdocs


II. Technology Stack
--------------------
  * Framework: Docusaurus `v3.8.0`
    - Theme: `@docusaurus/preset-classic`
  * Language: TypeScript `~5.6.2`
  * UI Library: React `v19.0.0`
  * Node.js: `v22.16.0` (version specified in the `.nvmrc` file)
  * Package Manager: pnpm `v10.11.0` (managed via Corepack)
  * Containerization: Docker, Docker Compose
  * Source Code Management: GitHub
  * Hosting (Google Cloud)
    - Application Runtime: Cloud Run
    - Container Image Repository: Artifact Registry
  * CI/CD: GitHub Actions
    - GCP Authentication: using Workload Identity Federation
  * Search: Algolia DocSearch
  * Content Management (CMS)
    - CMS: Decap CMS (formerly Netlify CMS)
  * Analytics: Google Analytics (GA4)
  * Social Integration: Twitter API v2 (for automatic posting of new articles)
  * Development Environment Management:
    - Docker Compose (Recommended)
    - nvm (Alternative)


III. System Architecture
------------------------
  The system process begins with a developer pushing code to GitHub or an administrator
  updating content via the CMS. GitHub Actions detects this and automatically
  deploys to the staging or production environment depending on the branch.
  This process includes building a Docker image, pushing it to Artifact Registry,
  and deploying it to Cloud Run. End users access the site running on Cloud Run
  and can utilize the high-speed full-text search functionality provided by Algolia.


IV. Configuration Details: Source Code Management (GitHub)
----------------------------------------------------------
  * Objective:
    To manage source code versions and trigger CI/CD pipelines. This project
    adopts a simplified branching strategy based on the Git Flow philosophy for
    learning purposes, aiming to familiarize with practical development
    workflows suitable for future team collaboration, despite being a solo project.

  * Branching Strategy:
    - `main`: The stable branch deployed to the production environment. Direct
      commits are generally prohibited; it is updated only via Pull Requests
      from the `develop` branch. However, updates to diary content via Decap
      CMS are committed directly to this branch.
    - `develop`: The integration branch for all development work. This is the
      deployment target for the staging environment. Feature branches are
      merged into this branch upon completion.
    - Feature Branches (`feat/*`, `fix/*`, etc.): Working branches for individual
      feature development or bug fixes. They are created from the `develop`
      branch, and a Pull Request is created to merge back into `develop`
      upon completion.

  * Commit Messages:
    To improve readability and make history tracking easier, commit messages
    should refer to the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)
    specification. Commits made via the CMS use an auto-generated message
    based on the configuration file (`static/admin/config.yml`), such as
    `docs(diary): add new entry "..."`.

  * Pull Request (PR) Workflow:
    - Merging to `develop`: A Pull Request is created from a feature branch to
      `develop`. Code review and a successful CI build are required.
    - Merging to `main`: After verification in the staging environment, a Pull
      Request is created from `develop` to `main` for a final review before
      release.

  * Automation (GitHub Actions):
    - CI Workflow (`ci.yml`): Runs on Pull Requests targeting the `develop` branch.
      It performs build tests and type checking.
    - CD Workflow (`deploy_hkdocs_to_cloud_run.yml`): Triggered by a push to
      specific branches.
      - `main` branch: Deploys to the production Cloud Run service.
      - `develop` branch: Deploys to the staging Cloud Run service.
    - X Auto-Post Workflow (`post-to-x.yml`): Triggered by a successful
      production deployment, it automatically posts information about new
      articles to X.


V. Configuration Details: Containerization (Docker)
---------------------------------------------------
  * Objective:
    To ensure consistency between development and production environments
    and to improve portability.

  * `Dockerfile` (for Production):
    - Uses a multi-stage build to reduce the final image size.
      - `builder` stage: Based on `node:22.16.0-alpine`, it installs dependencies
        with `pnpm install` and builds the site with `pnpm build`.
        `pnpm prune --prod` removes packages unnecessary for production.
      - Final stage: Based on `node:22.16.0-alpine`, it copies only the build
        artifacts (`build` directory) and production `node_modules` from the
        `builder` stage.
    - Security: Runs the application as a non-root user (`node`).
    - Health Check: Uses the `HEALTHCHECK` instruction, allowing Cloud Run to
      monitor the container's health.
    - Start Command: `CMD ["pnpm", "run", "serve"]` (which executes
      `"serve": "http-server ./build --single"` from `package.json`).

  * `docker-compose.yml` (for Local Development):
    - The recommended development method as per `README.md`.
    - Uses `Dockerfile.dev` to start a container optimized for development.
    - Enables hot reloading by volume mounting the source code (`.:/app:cached`).
    - Port Mapping: `3000:3000`

  * `.dockerignore`:
    Excludes files and directories not needed in the build context, such as
    `node_modules`, `.git`, and `.docusaurus`, to improve build speed.


VI. Configuration Details: Google Cloud (GCP)
---------------------------------------------
  * Objective:
    To provide scalable hosting for the application and secure management of
    container images.

  * Artifact Registry:
    - Objective: To centrally store and manage Docker images built by the
      CI/CD pipeline.
    - Repository Name: `hkdocs-images`
    - Cleanup Policy (Cost Saving):
      Configuration: This is achieved by combining the following two policies
      (the keep policy takes precedence).
      1. Deletion Policy: Marks all images for deletion.
         - Policy Type: `Conditional deletion`
         - Condition (Tag state): `Any tag state`
      2. Keep Policy: Excludes the 10 most recent versions from deletion.
         - Policy Type: `Keep most recent versions`
         - Number to keep: `10`

  * Cloud Run:
    - Objective: To run and expose the containerized Docusaurus application
      in a serverless manner.
    - Configuration:
      - Service Name: `hkdocs-service` (for production).
      - Deployment Source: Specifies the image from Artifact Registry tagged
        with the Git commit hash.
      - Scaling: Sets the minimum number of instances to 0 to reduce costs
        during periods of no traffic.
      - Port: Specifies port `8080`, which the container exposes.
      - Authentication: "Allow unauthenticated invocations" to make the site
        publicly accessible.


VII. Site Structure (Content) - Docusaurus
------------------------------------------
  * Homepage (`src/pages/index.tsx`):
    Serves as the site's entry point, providing navigation to major
    content sections.
  * Tech Notes (Docs): Stored in the `docs/` directory.
    Systematically organizes technical knowledge and study records for
    certification exams.
  * Blog: Stored in the `blog/` directory.
    Posts technical discussions and development logs in chronological order.
  * Diary: Stored in the `diary/` directory.
    Functions as a separate blog for personal daily records. It is integrated
    with Decap CMS, allowing content to be created and updated from a
    web-based admin interface (`/admin/`).
  * Custom Pages:
    - News (`src/pages/news.tsx`): A page that categorizes and lists links
      to major domestic and international news sites for daily information
      gathering.
    - Browser Memo (`src/pages/browser-memo.tsx`): A simple, browser-only
      memo tool page.
    - Profile (`src/pages/profile.mdx`): A self-introduction page.
  * Multilingual Support (i18n): Managed in the `i18n/en` directory.
    Supports Japanese (default) and English, providing UI text and
    translation files for each piece of content.


VIII. System Flow
-----------------
  1. Local Development:
     - A developer creates a feature branch from the `develop` branch.
     - They run `docker-compose up --build` to start the local development
       environment.
     - They edit the source code and verify the changes at `http://localhost:3000`.
     - After development is complete, they commit the changes and create a
       Pull Request to the `develop` branch.

  2. CI/CD (Automated Deployment):
     - When a PR targeting `develop` is created, build tests run automatically.
     - A Pull Request is manually created from `develop` to `main`.
     - When the PR is merged into `main`, deployment to the production
       environment is automatically triggered.
     - After production deployment is complete, if there are new articles,
       their information is automatically posted to X.

  3. Manual Deployment:
     - If necessary, manual build, push, and production deployment can be
       performed by running the `./deploy.sh` script from the local environment.

  4. User Access:
     - Users access `https://hkdocs.com/`, and requests are handled by Cloud Run.
     - Users can search content quickly using the Algolia search form on the site.
     - Users can switch between Japanese and English displays using the
       language switcher.

  5. Diary Update via CMS:
     - An administrator accesses `/admin/` and authenticates.
     - They create, edit, and save a diary entry through the Decap CMS UI.
     - The save operation commits the changes directly to the `main` branch.
     - This commit to the `main` branch triggers an automatic deployment to the
       production environment.


IX. Security and Operations
---------------------------
  * Access Control:
    Sets up branch protection rules on `main` and `develop`, making a passed
    Pull Request and CI check mandatory conditions for merging.
  * Dependency Vulnerability Management:
    Enables Dependabot to automate dependency updates. Vulnerability scanning
    in CI will also be considered.
  * Infrastructure Security:
    - Uses Workload Identity Federation for GCP authentication to eliminate the
      risk of leaking service account keys.
    - Applies the principle of least privilege for access to GCP resources
      via IAM.
    - Stores sensitive information (e.g., API keys) in GitHub Secrets for
      secure use within workflows.
  * Monitoring and Cost Management:
    - Monitors Cloud Run performance and logs with Cloud Logging and
      Cloud Monitoring.
    - Analyzes user traffic trends with Google Analytics.
    - Performs continuous cost optimization by leveraging features like
      Artifact Registry's cleanup policy.
