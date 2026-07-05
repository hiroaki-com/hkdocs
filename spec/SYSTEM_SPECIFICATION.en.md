HkDocs Specification (As of 2026/07/05)
=======================================


I. Basic Information
--------------------
  1. Project Name: hkdocs
  2. Domain: `hkdocs.com`
  3. Project Objective: To build and publish a personal knowledge base and tool
     site that consolidates a tech blog, learning records (Docs), a diary (Diary),
     curated link collections (news and reference materials), and browser-only
     utilities (browser memo, darts score calculators).
  4. Project Owner: hiroaki-com
  5. Public Site URL: https://hkdocs.com/
  6. Source Code Repository: https://github.com/hiroaki-com/hkdocs


II. Technology Stack
--------------------
  * Framework: Docusaurus `v3.10.1`
    - Theme: `@docusaurus/preset-classic`
    - Diagrams: `@docusaurus/theme-mermaid` (Mermaid diagrams)
    - Forward compatibility: individual `future.v4` flags enabled to prepare for the
      migration to Docusaurus v4, except `fasterByDefault` (webpack retained; the
      Rspack/SWC switch is deferred to the v4 GA). Fully compliant with v4 behavior
      including `mdx1CompatDisabledByDefault` (all `<!-- -->` comments across `.md`/`.mdx`,
      the truncate marker included, migrated to `{/* */}`).
  * Language: TypeScript `~5.9.3`
  * UI Library: React `v19.2.7`
  * Key Libraries:
    - Math rendering: `remark-math` / `rehype-katex` (KaTeX stylesheet loaded from CDN)
    - Markdown extensions: `remark-gfm`, `react-markdown` (for the browser memo preview)
    - URL sharing / compression: `lz-string` (stores and restores browser memo state in the URL)
    - Social sharing: `react-share`
    - Icons: `lucide-react`
    - Styling: `github-markdown-css`, `clsx`
    - Syntax highlighting: `prism-react-renderer`
  * Node.js: `v22.22.2` (version specified in the `.nvmrc` file)
  * Package Manager: pnpm `v10.34.4` (managed via Corepack)
  * Containerization: Docker, Docker Compose
  * Source Code Management: GitHub
  * Hosting (Google Cloud)
    - Application Runtime: Cloud Run
    - Container Image Repository: Artifact Registry
  * CI/CD: GitHub Actions
    - GCP Authentication: using Workload Identity Federation
  * Search: Algolia DocSearch (contextual, locale-aware search)
  * Content Management (CMS): Decap CMS (formerly Netlify CMS)
  * Analytics: Google Analytics (GA4, via `gtag`)
  * Social Integration: X (formerly Twitter) API v2 (`twitter-api-v2`, for automatic
    posting of new articles)
  * Build Helpers:
    - `gray-matter` (frontmatter parsing)
    - Custom script `scripts/generate-video-showcase.js`
      (generates the video showcase data; runs as a prebuild/prestart hook)
  * Development Environment Management:
    - Docker Compose (Recommended)
    - nvm (Alternative)


III. System Architecture
------------------------
  The system is built as a static site (Docusaurus / SSG) that pre-generates all
  pages and serves them from a static file server (`http-server`) inside a Docker
  container. The process begins with a developer pushing code to GitHub or an
  administrator updating content via the CMS. On the `develop` branch, GitHub
  Actions runs CI (type checking and a build verification). A merge (push) to the
  `main` branch triggers building a Docker image, pushing it to Artifact Registry,
  and deploying it to Cloud Run to update the production environment. End users
  access the site running on Cloud Run and can utilize the high-speed full-text
  search functionality provided by Algolia. For SEO, each page emits meta
  information and structured data (JSON-LD) during SSR, and crawling is optimized
  via a sitemap and robots.txt.


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
    - `develop`: The integration branch for all development work. It is the
      target of CI build verification. Feature branches are merged into this
      branch upon completion.
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
    - Merging to `main`: After verification on the `develop` branch, a Pull
      Request is created from `develop` to `main` for a final review before
      release.

  * Automation (GitHub Actions):
    - CI Workflow (`ci.yml`): Runs on pushes to `develop` and on Pull Requests
      targeting `develop`. It performs type checking (`pnpm typecheck`) and build
      verification (`pnpm build --no-minify`), using the Docusaurus build cache to
      speed things up.
    - CD Workflow (`deploy_hkdocs_to_cloud_run.yml`): Triggered by a push to the
      `main` branch, it deploys to the production Cloud Run service.
      (Currently there is no dedicated staging Cloud Run deployment for `develop`;
       CI build verification and the local Docker environment serve that role.)
    - X Auto-Post Workflow (`post-to-x.yml`): Triggered by pushes of articles under
      `blog/` or `docs/` to `main` (excluding `diary/`). After waiting for the
      production deployment to complete, it automatically posts information about
      new articles to X (`.github/scripts/post-new-articles.js`).
    - X Post Test Workflow (`post-to-x-test.yml`): A manually triggered
      (`workflow_dispatch`) workflow for verifying X API connectivity and social
      card rendering using an arbitrary URL (`.github/scripts/test-post-to-x.js`).


V. Configuration Details: Containerization (Docker)
---------------------------------------------------
  * Objective:
    To ensure consistency between development and production environments
    and to improve portability.

  * `Dockerfile` (for Production):
    - Uses a multi-stage build to reduce the final image size.
      - `builder` stage: Based on `node:22.22.2-alpine`, it uses pnpm (enabled via
        Corepack) to install dependencies with `pnpm install --frozen-lockfile` and
        builds the site with `pnpm build`. `pnpm prune --prod` removes packages
        unnecessary for production.
      - Final stage: Based on `node:22.22.2-alpine`, it copies only the build
        artifacts (`build` directory), the production `node_modules`, and
        `package.json` from the `builder` stage.
    - Security: Runs the application as a non-root user (`node`).
    - Health Check: The Dockerfile defines no explicit `HEALTHCHECK` instruction;
      it relies on Cloud Run's built-in health checking (a startup probe on port 8080).
    - Start Command: `CMD ["pnpm", "run", "serve"]` (which executes
      `"serve": "http-server ./build --single"` from `package.json`, listening on
      port 8080).

  * `docker-compose.yml` (for Local Development):
    - The recommended development method as per `README.md`.
    - Uses `Dockerfile.dev` to start a container optimized for development.
    - Enables hot reloading by volume mounting the source code (`.:/app:cached`).
    - Port Mapping: `3000:3000`

  * `.dockerignore`:
    Excludes files and directories not needed in the build context, such as
    `node_modules`, `.git`, and `.docusaurus`, to improve build speed.
    (Because `.git` is excluded, Git-history-based last-updated times are
     unavailable in production builds. When needed, the Docs last-updated time is
     managed manually via the `last_update` frontmatter.)


VI. Configuration Details: Google Cloud (GCP)
---------------------------------------------
  * Objective:
    To provide scalable hosting for the application and secure management of
    container images. The `asia-northeast1` (Tokyo) region is used.

  * Artifact Registry:
    - Objective: To centrally store and manage Docker images built by the
      CI/CD pipeline.
    - Repository Name: `hkdocs-images` (image name: `hkdocs-app`)
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
      - Service Name: `hkdocs-service` (production; single-service setup).
      - Deployment Source: Specifies the image from Artifact Registry tagged
        with the Git commit hash (short SHA).
      - Scaling: Sets the minimum number of instances to 0 to reduce costs
        during periods of no traffic.
      - Port: Specifies port `8080`, which the container exposes.
      - Authentication: "Allow unauthenticated invocations" to make the site
        publicly accessible.


VII. Site Structure (Content) - Docusaurus
------------------------------------------
  * Homepage (`src/pages/index.tsx`):
    Serves as the site's entry point, providing navigation to major content
    sections. It renders `HomepageFeatures` and a list of video works
    (`VideoShowcase`) auto-generated from blog/docs frontmatter.
  * Tech Notes (Docs): Stored in the `docs/` directory.
    - `intro.md`: Overview of the Tech section.
    - `tech/`: Technical knowledge and notes (categories such as `docusaurus`,
      `google-colab`, `google-docs`).
    - `exams/`: Study records for GCP (Professional) certification exams and case studies.
    - Last-updated times (`showLastUpdateTime`) are managed via the `last_update` frontmatter.
  * Blog: Stored in the `blog/` directory.
    Posts technical discussions, development logs, and tool release announcements
    in chronological order. Emits RSS/Atom feeds.
  * Diary: Stored in the `diary/` directory (defined as a second blog).
    Functions as a separate blog for personal daily records. It is integrated
    with Decap CMS, allowing content to be created and updated from a
    web-based admin interface (`/admin/`).
  * Custom Pages (`src/pages/`):
    - News (`news.tsx`): Categorizes and lists links to major domestic and
      international news sites.
    - Reference Materials (`links.tsx`): A categorized directory of external
      links such as technical documentation (with CSV export).
    - AI Tools (`ai-tools.tsx`): A directory of generative-AI tools organized by
      use case (with CSV export).
    - Browser Memo (`browser-memo.tsx`): A browser-only memo tool. Supports
      Markdown/Mermaid preview and URL sharing via `lz-string` (state stored in the URL).
    - Darts Calculators (`darts/`): Install-free, browser-only score calculators.
      Provides three modes — 01 (Zero-One), Cricket, and Count-Up — each carrying
      `SoftwareApplication` structured data (JSON-LD).
    - Profile (`profile.mdx`): A self-introduction page.
    - Legal Pages (`legal/`): Privacy Policy (`privacy-policy.mdx`) and the
      Japanese "Act on Specified Commercial Transactions" notice
      (`tokusho.mdx`, Japanese only).
  * Shared Components (`src/components/`):
    - `ShareButtons` (social sharing), `GitHubStarLink` / `SupportButton`
      (star and support prompts), `LinksCard` / `SectionHeading` (shared link-list UI),
      `HomepageFeatures`, `VideoShowcase`, and others.
    - `src/lib/csv.ts`: CSV export utility used by the Reference Materials and AI Tools pages.
  * Multilingual Support (i18n): Managed in the `i18n/en` directory.
    Supports Japanese (default) and English, providing UI text and translation
    files for each piece of content. Locale-aware rendering is applied to items
    such as the announcement bar and footer legal links.
  * SEO / Structured Data:
    - Each page emits meta information and JSON-LD structured data during SSR
      (URLs are built from the locale-specific build `baseUrl` to avoid duplicating
      the locale prefix).
    - Sitemap: Adds `lastmod` and excludes thin pages (tags/authors/pagination/search)
      and the search-excluded diary via `ignorePatterns`. Output per locale.
    - `static/robots.txt`: Disallows `/admin/` and `/diary/` (ja/en) and explicitly
      lists the per-locale sitemaps.


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
     - On pushes/PRs to `develop`, type checking and build verification run automatically.
     - A Pull Request is manually created from `develop` to `main`.
     - When the PR is merged into `main`, the video showcase data is regenerated
       during the build, a Docker image is built, and deployment to the production
       environment is automatically triggered.
     - After production deployment is complete, if there are new articles,
       their information is automatically posted to X.

  3. Manual Deployment:
     - If necessary, manual build (linux/amd64), push, and production deployment
       can be performed by running the `./deploy.sh` script from the local environment.

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
  * SEO / Crawl Management:
    - Controls crawlable targets via `robots.txt` and per-locale sitemaps.
    - Aids search-engine interpretation with structured data (JSON-LD) and
      normalized per-locale URLs.
  * Monitoring and Cost Management:
    - Monitors Cloud Run performance and logs with Cloud Logging and
      Cloud Monitoring.
    - Analyzes user traffic trends with Google Analytics (GA4).
    - Performs continuous cost optimization by leveraging features such as
      Cloud Run's minimum instance count of 0 and Artifact Registry's cleanup policy.
