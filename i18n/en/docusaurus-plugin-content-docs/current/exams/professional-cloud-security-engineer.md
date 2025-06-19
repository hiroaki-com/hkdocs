---
sidebar_position: 8
title: Professional Cloud Security Engineer
tags: [google cloud, certification, exam review]
---

**🏆 Passed: January 17, 2025**

**Exam Overview:**

-   [Official Exam Guide](https://cloud.google.com/learn/certification/cloud-security-engineer?hl=en)
-   [List of Certifications](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

### Post-Exam Reflections

**Impressions:**

```
It was difficult.
The questions were fundamentally based on documentation, but they were definitely more applied than the practice exam.
I don't think there were many questions similar to those in the (Indian) practice sets.
Many questions required logical reasoning and using test-taking techniques for multiple-choice questions.
There also seemed to be many questions related to network architecture and general cloud architecture.

Objective Notes:
- Number of questions: 40, which was fewer than expected and added to the pressure.
- Time: I completed the first pass in about 70/120 minutes and was able to review everything.
```

##### Topic Trends:

```
**Cryptomining Detection:**

-   Google Cloud provides best practices for detecting and preventing cryptocurrency mining. This includes monitoring for unusual CPU usage and network traffic, configuring resource autoscaling, and strengthening IAM policies.
-   Reference: [Best practices for cryptomining detection on Google Cloud](https://cloud.google.com/security-command-center/docs/cryptomining-detection-best-practices?hl=en)

---

**Time-based IAM Control:**

-   You can use Cloud Scheduler to issue HTTP requests at specified times or intervals to automatically invoke Cloud Run or Cloud Functions. This allows for time-based access control, such as granting access permissions only during specific hours.
-   Key Points:
    -   Cloud Scheduler's retry settings make it easy to control retries upon execution failure.
    -   You can programmatically manage access rights, such as granting or revoking IAM roles.

---

**External Key Management Questions:**

-   Identifying Regional or Project Causes:
    -   Beyond external keys, regional requirements are crucial. For example, Cloud KMS keys are tied to a specific region, and their use in other regions may be restricted.
    -   Reference: [Cloud KMS Locations documentation](https://cloud.google.com/kms/docs/locations?hl=en)
-   DLP Data De-identification Methods:
    -   Hashing is a one-way transformation that makes data non-reversible, preventing the original data from being recovered.
    -   Note: Deterministic encryption, which always produces the same output for the same input, is decryptable and different from hashing.

---

**Container Registry (Artifact Registry) Features:**

-   Artifact Registry, the successor to Container Registry, provides management for container images and other packages. It integrates vulnerability scanning and monitoring features.
-   Key Points:
    -   Vulnerability scanning can be performed with Artifact Analysis in Artifact Registry.
    -   Monitoring is implemented using Cloud Security Command Center (SCC) or Google Cloud Monitoring.

---

**Cloud Security Command Center (SCC) Use Cases:**

-   SCC is an integrated platform for visualizing the security posture of your Google Cloud environment and managing risks.
-   Use Cases:
    -   **Vulnerability Detection:** Discover and remediate resource misconfigurations, publicly exposed credentials, and known risks.
    -   **Threat Detection and Mitigation:** Detect and respond to active threats like malware, cryptomining, container runtime attacks, and DDoS attacks.
    -   **Posture and Policy Management:** Define and deploy security postures, and monitor and fix configuration drifts.
    -   **Data Management:** Ensure data residency by restricting the storage and processing of Security Command Center data to a specific region.
    -   **Integration:** Connect with external security systems through exports to BigQuery and Pub/Sub.
-   Reference: [Security Command Center overview](https://cloud.google.com/security-command-center/docs/security-command-center-overview)

---

**Example from Practice Exam:**

-   **Question:** A retail company is migrating its e-commerce site, including its point-of-sale (POS) application, to Google Cloud. Which compliance standard must they adhere to?
    -   A. FedRAMP High
    -   B. HIPAA
    -   C. SOX
    -   D. PCI DSS (Correct Answer)

-   Other topics that appeared:
    -   Security Command Center
    -   Cloud NGFW
    -   Shielded VM, Confidential VM, Binary Authorization
    -   Cloud Certificate Authority Service
```

---

### Exam Information (January 17, 2025)

**Exam Name:** Google Cloud Certified - Professional Cloud Security Engineer (Japanese)
**Date & Time:** January 17, 2025, 15:30
**Location:** 4F Kita 7-jo Yoshiya Building, Kita 7-jo Nishi 5-chome, Kita-ku

**Preparation:**

-   Government-issued driver's license
-   Credit card

### 🔥 Study Strategy 🔥

-   Master [whizlabs.com](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-cloud-security-engineer/301)
    -   1st round complete: Jan 14, 2025
    -   2nd round complete: Jan 17, 2025
-   Take the [official practice exam](https://docs.google.com/forms/d/e/1FAIpQLSf4ADmZr8WnDZjIK6dWvRTel2VmsP0fJtONy6UOFjWZHe-MpQ/viewform?hl=en)
    -   91%: Jan 14, 2025
-   Read as many web articles as possible
    -   [Cloud Architecture Center](https://cloud.google.com/architecture?hl=en)
-   Familiarize myself with the Google Cloud console.

### Weak Areas

**New Topics Encountered:**

-   [What is Assured Workloads?](https://cloud.google.com/assured-workloads/docs/overview?hl=en)
-   [Defining an SSL policy](https://cloud.google.com/load-balancing/docs/ssl-policies-concepts?hl=en#defining_an_ssl_policy)
-   [Connecting to Google APIs](https://cloud.google.com/vpc/docs/private-access-options?hl=en#connect-google-apis)
-   [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation?hl=en)
-   [Firewall rule priority](https://cloud.google.com/firewall/docs/firewalls?hl=en#priority_order_for_firewall_rules) - Default priority: 1000
-   VPC Flow Logs are applied at the VPC level (better than subnet).

---

### Memos for Creating Practice Questions with Prompts

##### Tips for Generating Applied Questions

**December 14, 2024**

**Improving Practice Exams:**

Copy the official practice exam and save it as a text file.
→ Upload it to GPTs and clean up the formatting.
→ Set a system prompt in Gemini (Studio) and progressively improve the questions.

**Improving Foundational Questions:**

Generate a set of basic questions based on the exam guide using GPTs.
→ Set a system prompt in Gemini (Studio) and progressively develop them into more applied, scenario-based questions.
