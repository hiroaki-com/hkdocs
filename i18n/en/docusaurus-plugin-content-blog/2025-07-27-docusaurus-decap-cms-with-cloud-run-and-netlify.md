---
title: A Record of Integrating Decap CMS with a Docusaurus Site on Cloud Run
authors: [hk]
tags: [docusaurus, decap-cms, netlify, cloud-run, ci/cd]
---

To streamline content management for this site, I integrated the headless CMS, Decap CMS (formerly Netlify CMS). This article documents the implementation process, the technical decisions made, and the solutions to problems I encountered.

Ultimately, I settled on a slightly unusual hybrid architecture: the CMS admin panel is managed by Netlify, while the public-facing site is operated on Google Cloud Run.

-   **CMS Admin Environment (Netlify)**
    -   URL: `https://[your-site].netlify.app/admin/`
    -   Role: Provides the Decap CMS admin interface and handles authentication via Netlify Identity.

-   **Public Site Environment (Google Cloud Run)**
    -   URL: `https://[your-custom-domain].com/`
    -   Role: Hosts the static site, maintaining the existing CI/CD pipeline.

I hope this article will be helpful for anyone considering a similar setup.

<!-- truncate -->

#### References

I referred to the following documents during this implementation.

-   [Decap CMS | Git Gateway Backend](https://decapcms.org/docs/git-gateway-backend/)
-   [Decap CMS | Docusaurus Integration](https://decapcms.org/docs/docusaurus/)
-   [Netlify Docs](https://docs.netlify.com/)
-   [Netlify Docs | Git Gateway](https://docs.netlify.com/manage/security/secure-access-to-sites/git-gateway/)
-   [Netlify Docs | Auth0 Setup Guide](https://docs.netlify.com/extend/install-and-use/setup-guides/auth0/)


### **1. Background of the Architecture Selection**

Arriving at the final hybrid architecture involved several technical considerations and some trial and error.

#### Abandoning the Auth0 Integration Plan

Initially, I considered using Auth0 as the authentication provider. However, I found that securely implementing the OAuth 2.0 authorization flow would require a separate server-side authentication proxy.

While Netlify hosting provides this proxy functionality internally, I would have had to build and operate it myself in the Google Cloud Run environment, which would complicate the architecture. To maintain the project's simplicity, I decided against this plan.

#### Redirection Issue with GitHub Integration

Next, I tried integrating with GitHub using the server-side-less Implicit Grant flow. However, despite specifying GitHub in the configuration file (`config.yml`), I encountered an issue where logging in would forcibly redirect to Netlify's authentication screen (`https://api.netlify.com/auth`).

After investigation, I discovered that this was due to a design specification in Decap CMS: when it detects that it's running on a Netlify domain (`.netlify.app`), it prioritizes using Netlify Identity over the settings in the configuration file.

#### Deciding on the Hybrid Architecture

I decided to turn this specification from a problem into an advantage. It allows me to use Netlify's robust authentication infrastructure (Netlify Identity) for free, elegantly solving the initial authentication challenge. Thus, I ultimately adopted a hybrid architecture where only the CMS management functions are handled by Netlify.

---

### **2. Detailed Implementation Steps**

From here, I will explain the specific configuration steps to achieve the final hybrid architecture.

#### Step 1: Netlify-Side Configuration

1.  **Enable Identity**: Open the `Identity` tab in your Netlify project and click `Enable Identity`.
2.  **Configure authentication providers**: Under `Identity` > `Authentication providers`, enable `GitHub`.
3.  **Enable Git Gateway**: Under `Identity` > `Services`, click `Enable Git Gateway`. This is crucial for integrating with your repository.
4.  **Invite admin users**: From the `Identity` tab, use `Invite users` to send an invitation to the email address associated with your GitHub account, and then accept it.
5.  **Remove custom domains**: Open `Domain management` and remove any custom domains that are not directly hosted by this Netlify project.

#### Step 2: Repository-Side Configuration

1.  **Create directories and files**: Run the following commands at the root of your project to create the necessary directories and files for the CMS.
    ```bash
    mkdir -p static/admin
    touch static/admin/index.html static/admin/config.yml
    ```

2.  **Configure `static/admin/index.html`**: This file is the entry point for the Decap CMS admin panel. The following two script imports are the core of the system:
    -   `netlify-identity-widget.js`: A script to enable Netlify's authentication functionality.
    -   `decap-cms.js`: The main Decap CMS script that loads and builds the admin UI.

    Add the following content to `static/admin/index.html`.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=3.0, user-scalable=yes" />
      <title>Content Manager</title>
      <style>
        @media (max-width:799px){ body { padding: 0 !important; } .app-header { display: none !important; } .css-1hvr85l-App-Styles-AppMainView-AppMainView { padding: 0 10px !important; } }
        body { margin: 0; padding: 0 15px; background-color: #f9f9f9; }
      </style>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
    </head>
    <body>
      <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
      <script>
        (function() {
          function preventPullToRefresh() {
            let startY = 0;
            document.body.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; }, { passive: true });
            document.body.addEventListener('touchmove', (e) => {
              const y = e.touches[0].clientY;
              if (document.scrollingElement.scrollTop === 0 && y > startY && document.body.scrollHeight === document.body.clientHeight) {
                e.preventDefault();
              }
            }, { passive: false });
          }
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("logout", () => { document.location.href = "/admin/"; });
          }
          window.addEventListener('load', preventPullToRefresh);
        })();
      </script>
    </body>
    </html>
    ```

3.  **Configure `static/admin/config.yml`**: This is the most crucial configuration file that defines how Decap CMS operates. It specifies 'what' to save, 'where' to save it, and 'how' to save it.
    -   `backend`: Defines the authentication method and repository connection info. Here you specify the `git-gateway` method, which is the core of this setup, and the target branch.
    -   `media_folder`: The path within the repository where media files like images will be uploaded.
    -   `collections`: Defines the sets of content to be managed (e.g., types of articles).
        -   `folder`: The directory where article files will be saved.
        -   `fields`: The most important part, defining the input forms (title, body, tags, etc.) displayed on the CMS editor screen.

    Add the following content to `static/admin/config.yml`.

    ```yaml
    backend:
      name: git-gateway
      branch: main
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'
        update: 'docs(diary): revise entry "{{slug}}"'
        delete: 'docs(diary): remove entry "{{slug}}"'
        uploadMedia: 'docs(assets): add media "{{path}}"'
        deleteMedia: 'docs(assets): remove media "{{path}}"'

    media_folder: "static/img/uploads/diary"
    public_folder: "/img/uploads/diary"

    collections:
      - name: "diary"
        label: "Diary"
        folder: "diary"
        create: true
        slug: "{{year}}-{{month}}-{{day}}"
        editor:
          preview: true
        fields:
          - { label: "Title", name: "title", widget: "string" }
          - { label: "Authors", name: "authors", widget: "hidden", default: ["hk"] }
          - { label: "Hide Table of Contents", name: "hide_table_of_contents", widget: "boolean", default: false }
          - { label: "Tags", name: "tags", widget: "list", default: [] }
          - { label: "Body", name: "body", widget: "markdown" }
    ```

#### Step 3: Deployment and Usage

1.  Commit and push the files you created and edited to your Git repository.
2.  A deployment will automatically start on Netlify.
3.  After the deployment is complete, access the CMS admin panel in your browser:
    `https://[your-site-name].netlify.app/admin/`

    *Note: After changing the settings, the page may not display correctly due to browser cache. Try a hard refresh (`Cmd/Ctrl + Shift + R`).*

---

### **3. Troubleshooting During Implementation**

Finally, I'll summarize the problems I actually faced during this implementation process and their solutions as a personal memo.

#### Problem 1: Blank Screen (`appendChild` error)

-   **Symptom**: Accessing the CMS admin panel (`/admin/`) resulted in a blank white screen, and the console showed `Uncaught TypeError: Cannot read properties of null (reading 'appendChild')`.
-   **Cause**: The JavaScript was trying to render the DOM before the target `<body>` element had been constructed.
-   **Solution**: I moved the `<script>` tag inside `static/admin/index.html` from the `<head>` to just before the closing `</body>` tag.

    ```html title="Example fix for static/admin/index.html"
    <!-- Before -->
    <head>
      ...
      <script src=".../decap-cms.js"></script>
    </head>
    <body>
    </body>

    <!-- After -->
    <head>
      ...
    </head>
    <body>
      <!-- Move the script tag to the end of the body -->
      <script src=".../decap-cms.js"></script>
    </body>
    </html>
    ```

#### Problem 2: Unexpected Email/Password Form Appears

-   **Symptom**: Instead of the expected `Login with GitHub` button, the standard Netlify Identity Email/Password form was displayed.
-   **Cause**: While Netlify Identity was enabled, the `Git Gateway` service, which is required to connect with the GitHub repository, was not.
-   **Solution**: In the Netlify dashboard, I went to `Identity` > `Services` and clicked `Enable Git Gateway`.

#### Problem 3: Redirected to the Wrong Domain After Authentication

-   **Symptom**: After authenticating with GitHub, I was redirected to the public site's domain (`https://[your-custom-domain].com/...`) instead of back to the CMS admin panel (`netlify.app`).
-   **Cause**: Netlify Identity prioritizes the primary domain set under `Domain management` as the redirect target after authentication. The public site's domain was configured there.
-   **Solution**: I completely removed the custom domain settings for the site not directly hosted by this Netlify project from the project's `Domain management` settings.

#### Problem 4: `reference does not exist` Error on Save

-   **Symptom**: When trying to save content in the CMS, I received the error `Failed to persist entry: API_Error: reference does not exist`.
-   **Cause**: The repository's default branch was `main`, but Decap CMS was trying to write to `master`, the older default branch name.
-   **Solution**: I explicitly set the branch in the `backend` section of `static/admin/config.yml` by adding `branch: main`.

    ```yaml title="Example fix for static/admin/config.yml"
    backend:
      name: git-gateway
      # Add this line to match the repository's default branch
      branch: main
    ```

#### Problem 5: Custom Commit Messages Not Applied

-   **Symptom**: The custom `commit_messages` set in `config.yml` were not being applied, and the default commit messages were used instead.
-   **Cause**: The old `summary` setting and the new `commit_messages` setting coexisted in the file. Decap CMS is designed to ignore both if there is a configuration conflict, as a safety measure.
-   **Solution**: I completely removed the old `summary` line from the file and consolidated the configuration into `commit_messages`.

    ```yaml title="Example fix for static/admin/config.yml"
    # Before: The old setting (summary) remains
    backend:
      name: git-gateway
      branch: main
      summary: "{{filename}}" # <- This old setting causes commit_messages to be ignored
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'

    # After: Remove the old setting
    backend:
      name: git-gateway
      branch: main
      commit_messages:
        create: 'docs(diary): add new entry "{{slug}}"'
    ```

import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />
