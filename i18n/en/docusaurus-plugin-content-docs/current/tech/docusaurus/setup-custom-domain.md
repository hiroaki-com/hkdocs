---
title: How to Set Up a Custom Domain on Cloud Run with Value Domain for a Docusaurus Site
sidebar_position: 1
last_update:
  date: 2025-06-09
tags: [Docusaurus, Cloud Run, custom domain, DNS]
---

This article provides a step-by-step guide for configuring a custom domain, `hkdocs.com`, acquired from Value Domain, for a Docusaurus site hosted on Google Cloud Run.

**Prerequisites:**

*   **Domain:** `hkdocs.com` (already acquired from [Value Domain](https://www.value-domain.com/))
*   **Hosting:** Google Cloud Run
*   **Site Generator:** Docusaurus

<!-- truncate -->

### 1. Update the Docusaurus Configuration File

First, update your Docusaurus configuration file to ensure the site recognizes the new domain, `hkdocs.com`.

1.  Open the `docusaurus.config.ts` (or `.js`) file in your Docusaurus project.
2.  Change the `url` property to `https://hkdocs.com/`.
    ```typescript
    // docusaurus.config.ts
    const config: Config = {
      // ...
      url: 'https://hkdocs.com/', // Change this to your actual domain
      baseUrl: '/',
      // Ensure organizationName and projectName are set appropriately
      // ...
    };
    ```
3.  Verify that `organizationName` (e.g., `hiroaki-com`) and `projectName` (e.g., `hkdocs`) are correctly configured to align with the `editUrl` of your GitHub repository.
4.  Save the file.

### 2. Initiate Custom Domain Mapping in Cloud Run

Next, begin the process of linking `hkdocs.com` to your Cloud Run service in the Google Cloud Console.

1.  Log in to the **Google Cloud Console** and select the **Cloud Run service** that will host `hkdocs.com`.
2.  Select "**Map custom domain**" (or a similar menu item) and click "Add mapping".
3.  In the "Enter domain" field, type `hkdocs.com` and click "Continue".
4.  Cloud Run will provide a **TXT record** to verify your domain ownership. Make a precise note of this value.
    *   Example: Hostname `@` (or `hkdocs.com.`), Value `google-site-verification=some-random-string`

### 3. Configure DNS Records in Value Domain (TXT Record)

In the Value Domain control panel, set the TXT record as instructed by Cloud Run.

1.  Log in to the **Value Domain Control Panel**.
2.  Navigate to the "Change DNS Records / URL Forwarding" screen (or the DNS settings page) for your domain, `hkdocs.com`.
3.  In the DNS record entry area, add the TXT record information you noted in Step 2.
    *   Enter the information according to Value Domain's format.
    *   **Example entry:**
        ```dns
        # TXT record for domain ownership verification
        txt @ google-site-verification=some-random-string
        ```
        *(Use the actual value provided for `google-site-verification=`)*
4.  Save the DNS settings. It may take several minutes to a few hours for the DNS changes to propagate across the internet.

### 4. Verify Ownership and Obtain A/AAAA Records in Cloud Run

Once Cloud Run recognizes the TXT record, it will display the A and AAAA records that need to be configured next.

1.  Return to the Cloud Run custom domain mapping screen in the **Google Cloud Console**.
2.  After ownership verification is complete, Cloud Run will display the **A records (IPv4 addresses) and AAAA records (IPv6 addresses)** required to direct traffic to your service. Accurately note all of these IP addresses.
    *   **Example A records (dummy):** `198.51.100.10`, `198.51.100.11`, `198.51.100.12`, `198.51.100.13`
    *   **Example AAAA records (dummy):** `2001:db8:2::1a`, `2001:db8:2::1b`, `2001:db8:2::1c`, `2001:db8:2::1d`
    *(These IP addresses are examples only. You must use the unique IP addresses provided by Cloud Run.)*

### 5. Configure DNS Records in Value Domain (A/AAAA Records)

Return to the Value Domain DNS settings screen to configure the A and AAAA records you obtained.

1.  Open the DNS settings screen for `hkdocs.com` in **Value Domain**.
2.  **Important:** If there are any existing A, AAAA, or website-related CNAME records for `hkdocs.com` (hostname `@`), delete them or comment them out by adding a `#` at the beginning of the line. This is to prevent conflicts with the Cloud Run settings. Do not modify mail-related records like MX.
3.  Add the A and AAAA records you noted in Step 4, following Value Domain's format.
    *   **Example entry (replace the dummy IP addresses with the actual values from Step 4):**
        ```dns
        # Point hkdocs.com to Cloud Run
        # A Records (IPv4)
        a @ 198.51.100.10
        a @ 198.51.100.11
        a @ 198.51.100.12
        a @ 198.51.100.13

        # AAAA Records (IPv6)
        aaaa @ 2001:db8:2::1a
        aaaa @ 2001:db8:2::1b
        aaaa @ 2001:db8:2::1c
        aaaa @ 2001:db8:2::1d
        ```
4.  Save the DNS settings and wait for the changes to propagate.

### 6. Final Verification and SSL Certificate Issuance in Cloud Run

Confirm that Cloud Run has recognized the new DNS settings and issued an SSL certificate.

1.  In the **Google Cloud Console**, on the Cloud Run custom domain mapping screen, verify that the status for `hkdocs.com` is "Active" and an SSL certificate has been issued. This may take some time.

### 7. Rebuild and Deploy the Docusaurus Site

To apply the Docusaurus configuration changes, rebuild your site and deploy it to Cloud Run.

1.  In your local terminal, navigate to the root directory of your Docusaurus project.
2.  Run the build command (e.g., `pnpm build`, `npm run build`, `yarn build`).
3.  Deploy the built static files to your Cloud Run service.

### 8. Final Confirmation

Finally, verify that your site is correctly displayed at the custom domain `https://hkdocs.com/`.

1.  In a web browser, navigate to `https://hkdocs.com/`.
2.  Confirm that the site loads and that the HTTPS connection is secure (check for the lock icon in the address bar).
3.  Test the site's links and features to ensure they work as intended.
4.  If applicable, check SEO-related files like `https://hkdocs.com/sitemap.xml`.
