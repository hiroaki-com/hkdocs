---
sidebar_position: 6
title: Professional Cloud DevOps Engineer
tags: [google cloud, certification, exam review]
---

**🏆 Passed: March 30, 2025**

---

### Exam Review

I took the exam on March 30, 2025, and passed successfully. It was a baptism by fire with a doubleheader, but I made it through.

```
## Exam Summary
- 50 questions. I finished the first pass in about 50 minutes and submitted after a 10-minute review.
- I estimate I scored around 90%.

## Exam Impressions
- Most questions were either directly from the Udemy course or could be answered immediately with a solid understanding of SRE principles.
- There might have been some superficial questions from the Architect or other exams, but most were foundational.
- The first half felt easy, but some parts in the second half made me a bit anxious, so it's possible I just got lucky with familiar questions.

## Topics Covered
- Agent Policies → This came up about twice, and I realized my understanding was lacking.
- Private pools
- Cloud Build (in general)
- Foundational SRE concepts
- A few questions on IAM and GKE service accounts
- Questions on defining SLOs with a margin (e.g., 50→60, 100→110...).
```

---

### Exam Information (March 30, 2025) → 🏆 Passed

-   **Exam Name:** Professional Cloud DevOps Engineer
-   **Date:** March 30, 2025
-   **Time:** 03:45 PM

---

#### Exam Day TODO (Best Practices from PSE / PNE / PDE / PCA Exams) ⭐

**The Day Before:**

-   [x] Get a good night's sleep.
    -   Set up eye mask, earplugs, and pillow.

**On the Day:**

-   [ ] Wake up by 9 AM (being well-rested is crucial).
    -   [x] → Woke up at 11 AM.
-   [x] Final review at a cafe.
    -   Doutor Odori store (for the mood).
    -   [ ] Review incorrect answers from the [Official Practice Exam](https://docs.google.com/forms/d/e/1FAIpQLSdpk564uiDvdnqqyPoVjgpBp0TEtgScSFuDV7YQvRSumwUyoQ/viewform).
    -   Review weak topic areas.
    -   [x] Review incorrect answers from practice question sets.
    -   [x] Read through other important articles.

-   Leave the cafe at 14:00.

-   [x] Print the exam confirmation email.
    -   Forward the email to my phone app.

-   [x] Take a 10-minute nap before arriving at the venue to refresh my brain.
    -   [x] Also, consume enough sugar.

-   [x] Arrive at the venue by 15:00 (30 minutes before the test starts) and complete check-in.
    -   Remember to read the options first.
    -   Remember to save time for review.

---

### 🔥 Study Strategy 🔥

-   **Read the official reference materials:**
    -   [List of Certifications](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

##### Learning Strategy:

-   **Important Materials:**
    -   [Official Exam Guide](https://cloud.google.com/learn/certification/cloud-devops-engineer/)
    -   💡 [SRE Book Updates, by Topic](https://sre.google/resources/book-update/) | This is a must-read as it's a free summary of three Google SRE books.
        -   [sre.google/books](http://sre.google/books) | Read the three books online for free.
    -   [Best practices for speeding up builds](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=en#caching_directories_with_google_cloud_storage)

-   **Practice Questions:**
    -   **Whizlabs** (Free Questions Only):
        -   [ ] 1st Round: Mar 24, 2025 | 73%
        -   [ ] 2nd Round:

    -   **Udemy Practice Exams:**
        -   [Link to course](https://www.udemy.com/course/google-professional-cloud-devops-engineer-practice-exam-test/)
        -   **1st Round:**
            -   [x] Practice Test 1 | Mar 23, 2025 | 52%
            -   [x] Practice Test 2 | Mar 27, 2025 | 53%
            -   [x] Practice Test 3 | Mar 25, 2025 | 43%
        -   **Review:**
            -   [ ] Practice Test 1
            -   [ ] Practice Test 2
            -   [ ] Practice Test 3
        -   **2nd Round:**
            -   [x] Practice Test 1 | Mar 28, 2025 | 73%
            -   [x] Practice Test 2 | Mar 29, 2025 | 81%
            -   [x] Practice Test 3 | Mar 29, 2025 | 72%

    -   **Official Practice Exam:**
        -   [Link](https://docs.google.com/forms/d/e/1FAIpQLSdpk564uiDvdnqqyPoVjgpBp0TEtgScSFuDV7YQvRSumwUyoQ/viewform)
        -   [ ] Mar 24, 2025 | 70%
            -   Question 12 - The answer in the practice set might differ from the official practice exam.
        -   [ ] | |

-   If time permits, read Google SRE articles:
    -   [ ] [SRE Book Updates, by Topic](https://sre.google/resources/book-update/)

---

##### Weak Areas

[Overview of private pools](https://cloud.google.com/build/docs/private-pools/private-pools-overview?hl=en#overview_of_default_pools_and_private_pools) (Cloud Build)
> **Private pools** are private, dedicated pools of workers that offer greater customization over the build environment, including the ability to **access resources in a private network**. Like default pools, private pools are hosted and fully managed by Cloud Build, and can scale up to and down to zero with no infrastructure to set up, upgrade, or scale. Because private pools are customer-specific resources, you can configure them in more ways.

[Using a cached Docker image](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=en#using_a_cached_docker_image) (Cloud Build)
> The simplest way to speed up a Docker image build is to specify a cached image that can be used for subsequent builds. You can specify the cached image by adding the **`--cache-from`** argument in your build config file, which will instruct Docker to build using that image as a cache source.

[Caching directories with Google Cloud Storage](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=en#caching_directories_with_google_cloud_storage) (Cloud Build)
> To increase the speed of your build, you can reuse the results from a previous build. You can do this by **copying the results from a previous build to a Google Cloud Storage bucket, making calculations from those results, and then copying the new results back to the bucket**. Use this method when your build takes a long time, and produces a small number of files that do not take long to copy to and from Google Cloud Storage.
>
> Unlike the Docker-specific **`--cache-from`**, Google Cloud Storage caching can be used for any builder [supported by Cloud Build](https://github.com/GoogleCloudPlatform/cloud-builders).

[Use a separate organization for experimenting](https://cloud.google.com/architecture/identity/best-practices-for-planning?hl=en#use_a_separate_organization_for_experimenting) (Organizations)
> For experimental activities, use a **separate organization as a sandbox environment**. Using a separate organization allows you to work without being constrained by the policies, configurations, and automation that you use in your production organization.
>
> **Do not use** a [staging organization](https://cloud.google.com/architecture/identity/best-practices-for-planning?hl=en#use_a_separate_staging_organization) for testing. A staging environment must use similar IAM policies and organization policies as your production organization. Therefore, a staging environment might have the same limitations as your production environment. At the same time, loosening policies to allow for testing would defeat the purpose of the staging organization.

[images](https://cloud.google.com/build/docs/build-config-file-schema?hl=en#images) (Cloud Build)
> The **`images` field** in the build config file specifies one or more Linux **Docker images** that Cloud Build will push to Artifact Registry or Container Registry. You might have a build that runs tasks without producing a Linux Docker image; however, if you do not build and push an image to a registry, the image is discarded upon build completion. If any of the specified images are not produced at build time, the build will fail. For more information on storing images, see [Storing artifacts in Artifact Registry](https://cloud.google.com/build/docs/building/store-artifacts-in-artifact-registry?hl=en).

[artifacts](https://cloud.google.com/build/docs/build-config-file-schema?hl=en#artifacts) (Cloud Build)
> The **`artifacts` field** in the build config file specifies one or more **non-container** artifacts to store in Cloud Storage. For more information on storing non-container artifacts, see [Storing build artifacts in Cloud Storage](https://cloud.google.com/build/docs/building/store-artifacts-in-cloud-storage?hl=en).

[Log sampling rate](https://cloud.google.com/vpc/docs/flow-logs?hl=en#log-sampling) (VPC Flow Logs)
> - For VMs, **50% of the log entries are kept by default**. You can set this parameter from **`1.0` (100%, keep all log entries) to `0.0` (0%, keep no logs)**.
> - For VLAN attachments and Cloud VPN tunnels, 100% of the log entries are kept by default. You can set this parameter from `1.0` to a value greater than `0.0`.

[Agent policies](https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/managing-agent-policies?hl=en) (Google Cloud CLI)
> You can create and manage agent policies by using the gcloud beta compute instances ops-agents policies command group in the **Google Cloud CLI** or by using the agent-policy Terraform module. Agent policies **manage OS policies** by using the Compute Engine VM Manager tool suite. These policies automate the deployment and maintenance of software configurations, such as the Google Cloud Observability agents (the Ops Agent, the legacy Monitoring agent, and the legacy Logging agent).

[Configure Terraform to store state in a Cloud Storage bucket](https://cloud.google.com/docs/terraform/resource-management/managing-infrastructure-as-code?hl=en#configuring_terraform_to_store_state_in_a_cloud_storage_bucket) (Terraform)
> By default, Terraform stores state locally in a file named `terraform.tfstate`. This default configuration can make Terraform difficult for teams to use, especially when many users run Terraform at the same time and each machine has its own understanding of the current infrastructure.
>
> To help you avoid these issues, this section shows you how to **configure a remote state that points to a Cloud Storage bucket**. Remote state is a feature of backends, and in this tutorial, is configured in the `backend.tf` file. For example: ...

[IAM Conditions overview](https://cloud.google.com/iam/docs/conditions-overview?hl=en#example-date-time) (IAM Conditions)
> Example date/time expression
> When you use the following condition expression in a role binding, it grants access until midnight on January 1, 2021.

[Building VM images with Packer](https://cloud.google.com/build/docs/building/build-vm-images-with-packer?hl=en#yaml) (Cloud Build)
> Packer is an open-source tool for creating identical machine images for **multiple platforms** from a single source configuration. This page shows you how to create a VM image to be used in Compute Engine by Packer and Cloud Build.

[Triggering on Pub/Sub Messages](https://spinnaker.io/docs/guides/user/pipeline/triggers/pubsub/) (Spinnaker)
> Important to recognize the integration between Pub/Sub and Spinnaker.

[create_before_destroy](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#create_before_destroy) (Terraform)
> `create_before_destroy` (bool) - By default, when Terraform must change a resource argument that cannot be updated in-place due to remote API limitations, Terraform will destroy the existing object and then create a new replacement object with the new configured arguments.
>
> The `create_before_destroy` meta-argument changes this behavior so that the replacement object is created first, and the original object is destroyed after.

---

##### Summary of Common HTTP Status Errors

| **HTTP Status Code** | **Error Message**       | **Context/Cause**                                                                    |
| -------------------- | ----------------------- | ------------------------------------------------------------------------------------ |
| **400**              | `Bad Request`           | The request format is invalid (e.g., missing parameters, invalid values).             |
| **401**              | `Unauthorized`          | Invalid authentication credentials or insufficient access permissions.                |
| **403**              | `Forbidden`             | Access is denied, often due to insufficient IAM permissions.                         |
| **404**              | `Not Found`             | The specified resource does not exist (e.g., incorrect resource ID).                 |
| **409**              | `Conflict`              | Resource conflict, such as trying to create an instance with a name that already exists. |
| **429**              | `Too Many Requests`     | The API request rate limit has been exceeded.                                        |
| **500**              | `Internal Server Error` | An unexpected error occurred on the server side.                                     |
| **502**              | `Bad Gateway`           | An error occurred at a gateway or proxy server.                                      |
| **503**              | `Service Unavailable`   | The service is down for maintenance or is temporarily unavailable.                     |
| **504**              | `Gateway Timeout`       | The request timed out (e.g., after waiting a long time for a response).                |

---

---
Reported invalid URLs in Udemy on March 29, 2025.

Practice Test 2:
Still Invalid URLs References
```
You oversee an application operating within Google Kubernetes Engine (GKE) and employing the blue/green deployment approach. Portions of the Kubernetes manifests are provided below: ...
```

Practice Test 2:
The following correct answer choice is wrong:
```
Your organization aims to elevate the availability target of an application from 99.9% to 99.99% with a $2,000 investment. ...
```
