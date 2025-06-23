---
sidebar_position: 5
title: Professional Cloud Developer
last_update:
  date: 2025-06-10
tags: [google cloud, certification, exam review]
---

**🏆 Passed: February 27, 2025**

##### Post-Exam Notes

```
Impressions:
- Number of questions: 50
  - Confident answers: Approx. 35
  - Questions flagged for review: Approx. 15
- Finished the first pass in about 70/120 minutes. Used about 30 minutes for review and completed the exam in about 100/120 minutes.

My impression was that there were many questions I hadn't seen before.
There also seemed to be a significant number of questions from the Cloud Architect and Network Engineer exam domains, not just the Developer practice exams.
The overlap with Cloud Architect was particularly noticeable, so I recommend studying for both exams simultaneously.
The answer choices were often structured in a way that made it difficult to narrow them down without being certain of the correct answer.

Topic Trends:
- Connecting to Cloud SQL using Private Google Access.
- Network configuration for instances that need to use an external load balancer.
- Authentication and authorization issues during deployment.
- Questions about Cloud Build configurations and code (e.g., troubleshooting connection errors from code).
- Complex problems involving Pub/Sub triggers during deployment.
- Questions recommending Cloud Run specifications.
- Questions about the deployment procedure for vulnerability scanning using Artifact Registry.
- Questions about the configuration steps for Binary Authorization.
```

---

**Exam Overview:**

-   [Professional Cloud Developer](https://cloud.google.com/learn/certification/cloud-developer)

### Exam Information (February 27, 2025)

-   **Exam Name:** **Google Cloud Certified - Professional Cloud Developer**
-   **Method:** Remote Proctored (at home)
-   **Date & Time:** Thursday, February 27, 2025, 12:15 (UTC+09:00)
-   🔥 Note: Due to a back strain, setting up the room might be difficult. I need to consider rescheduling early if necessary.

##### On Exam Day

-   Wait on the login page to start the exam preparation.
    -   Have my ID ready.
-   Review official documentation and weak topic areas until the exam begins.

##### Post-Exam TODO

-   🔥 EMERGENCY: The Udemy course was deleted.
-   [ ] Request refunds for each course after the exam.
-   [ ] Write down my reflections on the exam.

---

### 🔥 Study Strategy 🔥

-   Read the official reference materials:
    -   [GKE networking best practices](https://cloud.google.com/kubernetes-engine/docs/best-practices/networking?hl=en)
    -   [GKE Troubleshooting page](https://cloud.google.com/kubernetes-engine/docs/troubleshooting?hl=en)
    -   [Google Cloud whitepapers](https://cloud.google.com/whitepapers?hl=en)

##### Learning Strategy:

-   **Reference Materials:**
    -   Focus on completing practice question sets.
    -   [ ] [Practice Exams | Google Cloud Database Engineer (GCP)](https://www.udemy.com/course/practice-exams-google-professional-cloud-database-engineer/?couponCode=ST5MT020225BROW)

    -   **Whizlabs (Free Questions Only):**
        -   [ ] [Free Test](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-database-engineer/2556)

    -   **1st Round: Feb 8, 2025, approx. 50%**
        -   [x] Practice Test 1
        -   [x] Practice Test 2
        -   [x] Practice Test 3
        -   [x] Practice Test 4
        -   [x] Practice Test 5

    -   **2nd Round: Feb 25, 2025**
        -   [ ] Practice Test 1
        -   [ ] Practice Test 2
        -   [ ] Practice Test 3
        -   [ ] Practice Test 4
        -   [ ] Practice Test 5

    -   **Review incorrect answers:**
        -   [x] Practice Test 1
        -   [x] Practice Test 2
        -   [x] Practice Test 3
        -   [x] Practice Test 4
        -   [ ] Practice Test 5

    -   **Review questions flagged for review:**
        -   [x] Practice Test 1
        -   [x] Practice Test 2
        -   [x] Practice Test 3
        -   [x] Practice Test 4
        -   [ ] Practice Test 5

    -   **Official Practice Exam:**
        -   [Try the official practice exam](https://docs.google.com/forms/d/e/1FAIpQLSfFeB8zBNi2q-ar0V7iIguhk2e6P-UkrJ8OJfg6n0k6HcYLDQ/viewform)
        -   → Note: The topics are covered by other practice sets, so no further review is needed.
        -   76.92%: Feb 25, 2025
        -   [x] [Review](https://docs.google.com/forms/d/e/1FAIpQLSfFeB8zBNi2q-ar0V7iIguhk2e6P-UkrJ8OJfg6n0k6HcYLDQ/viewscore?viewscore=AE0zAgBxwR7F-30cJ0CMd9gR57e-JDoitkdkgtpGFDlYtrZRiVk_1gLk_jalLWASjsyBubI): Feb 25, 2025

    -   **Review weak topic areas:**
        -   [x] Feb 26, 2025

-   [ ] Read GCE articles from the Architecture Center.
    -   [Resources for application development](https://cloud.google.com/architecture/application-development?hl=en#canary_test_pattern)

---

##### Weak Areas

[**Cursors**, limits, and offsets](https://cloud.google.com/datastore/docs/concepts/queries?hl=en#cursors_limits_and_offsets) (Datastore)
> **Query cursors** let an application retrieve a query's results in convenient batches **without incurring the overhead** of a query offset.
>
> While Datastore mode databases support integer offsets, you should **avoid using them**. Instead, **use cursors**.
> -   ❌ `SELECT * FROM books LIMIT 10 OFFSET 20;`
> -   ⭕️ `SELECT * FROM books WHERE id > last_id ORDER BY id LIMIT 10;`

[Debugging issues using the serial console](https://cloud.google.com/compute/docs/troubleshooting/troubleshooting-ssh-errors?hl=en#debug_with_serial_console) (Compute Engine)
> We recommend that you **check the serial console logs for connection errors**. You can access the serial console as a **root user** from a browser on your local workstation. This approach is helpful **if you can't log in using SSH** or if the instance isn't connected to the network.

[Accessing private clusters with Cloud Shell](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters?hl=en#cloud_shell) (GKE & Cloud Shell)
> The private cluster created in the Using auto-generated subnets section, `private-cluster-1`, has a public endpoint and has authorized networks enabled. To access the cluster using Cloud Shell, you need to **add Cloud Shell's external IP address to the cluster's list of authorized networks**.

[Viewing image vulnerabilities](https://cloud.google.com/artifact-analysis/docs/scan-os-automatically?hl=en#view_the_image_vulnerabilities) (Artifact Registry)
> **Artifact Analysis** scans new images when they're uploaded to **Artifact Registry**. This scan extracts information about the system packages in the container. You can check for vulnerability occurrences for images in your registry using the Google Cloud console, the gcloud CLI, or the **Container Analysis API**. If an image has vulnerabilities, you can see the details.

[GKE Ingress for Application Load Balancers](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress?hl=en)
> This page explains what **External Application Load Balancers (HTTPS)** are and how they work. In Google Kubernetes Engine (GKE), you can use a built-in, managed Ingress controller called **GKE Ingress**. This controller implements **Ingress resources** as Google Cloud load balancers for **HTTP(S)** workloads in GKE.

[Setting up Cloud KMS in an individual project](https://cloud.google.com/kms/docs/separation-of-duties?hl=en#using_separate_project) (Separation of Duties - SoD)
> To enable **separation of duties**, you can run Cloud KMS in its **own project**, for example `your-key-project`. Depending on the strictness of your separation requirements, you can do one of the following:
> -   (Recommended) Create `your-key-project` with **no owner** at the project level, and designate an **organization administrator** granted at the **organization level**. Unlike an owner, an organization administrator cannot directly manage or use keys. They are limited to setting IAM policies that restrict who can manage and use keys. Using an organization-level node further restricts permissions on projects within the organization.

[Traffic management (Traffic Director)](https://cloud.google.com/service-mesh/docs/overview?hl=en#traffic_management) (Cloud Service Mesh)
> Cloud Service Mesh maintains a service registry of all the services in your mesh by name and their respective endpoints. The mesh uses this service registry to route traffic to the right endpoints, with proxies running alongside your services (Kubernetes Pod IP addresses, Compute Engine VM IP addresses in a managed instance group). Proxyless gRPC workloads can also be used in parallel with workloads that use Envoy proxies.

[Instance metadata server](https://cloud.google.com/run/docs/container-contract?hl=en#metadata-server) (Cloud Run)
> Cloud Run instances expose a metadata server that you can use to retrieve details about your container, such as the project ID, region, instance ID, or service accounts. You can also use the metadata server to generate **identity tokens for the service**. To access the metadata server's data, send an HTTP request to the `http://metadata.google.internal/` endpoint with the `Metadata-Flavor: Google` header.

[BigQuery Job User](https://cloud.google.com/bigquery/docs/access-control?hl=en#bigquery.jobUser)
> BigQuery Job User (`roles/bigquery.jobUser`)
> -   Provides permissions to run jobs, including **queries**, within the project.

[Changing the compute capacity](https://cloud.google.com/spanner/docs/compute-capacity?hl=en#change-compute-capacity) (Cloud Spanner)
> **After you create an instance, you can increase its compute capacity.** In most cases, the request completes within a few minutes. In rare cases, the scale-up can take up to an hour to complete...
>
> When you remove compute capacity, **monitor CPU utilization and request latency in Cloud Monitoring** to ensure that CPU utilization remains below 65% for regional instances and below 45% for each region in multi-region instances. During the removal of compute capacity, you might see a temporary increase in request latency.

[Using Cloud Trace and Zipkin](https://cloud.google.com/trace/docs/zipkin?hl=en#frequently_asked_questions)
> A Zipkin server is useful if your application is instrumented with Zipkin, but you don't want to run your own trace backend, or you want to **take advantage of the advanced analysis tools in Cloud Trace**.

[GKE: Best practices: Recommendations](https://cloud.google.com/blog/products/containers-kubernetes/best-practices-for-creating-a-highly-available-gke-cluster?hl=en)
> **Regional clusters** are composed of a **three-Kubernetes-control-plane quorum** that provides **higher availability** than what zonal clusters can offer for your cluster's control plane API. And while existing workloads running in nodes are not affected if the control plane becomes unavailable, some applications rely heavily on the availability of the cluster API. For these workloads, we recommend using the regional cluster topology.

[Initialization period (formerly cool down period)](https://cloud.google.com/compute/docs/autoscaler?hl=en#cool_down_period) (GCE)
> The initialization period (formerly known as the cool down period) is the length of time that it takes for applications to initialize on a VM instance. While an application is initializing on an instance, the instance's usage data might not reflect its normal circumstances.
>
> If you **set an initialization period value that is significantly longer** than the time it takes for an instance to initialize, your autoscaler might ignore legitimate utilization data, and it might **underestimate the required size of your group, causing a delay in scaling out**.

[Gateway API resources](https://cloud.google.com/kubernetes-engine/docs/concepts/gateway-api?hl=en#gateway_resources) (GKE Networking)
> The diagram is very informative.

[What is a Kubernetes Service?](https://cloud.google.com/kubernetes-engine/docs/concepts/service?hl=en#what-is-a-service)
> The purpose of a Service is to group a set of Pod endpoints into a single resource. You can configure various ways to access this group. By default, you get a stable cluster IP address that clients inside the cluster can use to contact Pods in the Service.

Cluster availability types (GKE)
> Best Practices:
> -   For **production** workloads, use **regional clusters**, which have higher availability than zonal clusters. For **development** environments, use a **regional cluster** with zonal node pools. The cost of a cluster with a regional control plane and zonal node pools is the same as a zonal cluster.

Network isolation options (GKE)
> Best Practices:
> -   Use **Cloud NAT** to allow **GKE Pods** to access resources with public IP addresses. With Cloud NAT, Pods are not directly exposed to the internet, but can still access resources that are, improving the overall security posture of your cluster.

[GKE cluster architecture](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture?hl=en)
> The diagram is very informative.

[Writing container logs](https://cloud.google.com/run/docs/logging?hl=en#container-logs) (Cloud Run Logs)
> When you write logs from your service or job, they are picked up automatically by Cloud Logging, as long as the logs are written to any of these locations:
> -   Standard output (**`stdout`**) or standard error (**`stderr`**) streams
> -   Any files under the `/var/log` directory
> -   syslog (`/dev/log`)
> -   Logs written with Cloud Logging client libraries, which are available for many popular languages.
>
> Most developers expect to write logs to **standard output** and **standard error**.

[Flame graphs](https://cloud.google.com/profiler/docs/concepts-flame?hl=en) (Cloud Profiler)
> Cloud Profiler displays profiling data using flame graphs. Flame graphs use screen space more efficiently than trees and other graphs, and present a large amount of information in a compact and readable format.
> The frames are labeled with the name of the **function**, and their width is relative to the **total CPU time measurement for that function**.

[Gradually increasing the request rate](https://cloud.google.com/storage/docs/request-rate?hl=en#ramp-up) (Cloud Storage)
> To ensure that Cloud Storage autoscaling always performs optimally, you should gradually ramp up the request rate for any bucket that hasn't had a high request rate for several days, or for any bucket that has a new range of object keys. If your request rate is less than 1,000 write requests or 5,000 read requests per second, no ramp-up is required. If you expect your request rate to go above these thresholds, start with a request rate below or near the threshold and ramp up gradually, making sure not to double the rate in less than 20 minutes.
> If you see issues, such as increased latency or error rates, pause the ramp-up or reduce the request rate to allow Cloud Storage more time to scale the bucket. You should [retry requests](https://cloud.google.com/storage/docs/retry-strategy?hl=en) with **exponential backoff** when:
> -   You receive errors with `408` and `429` response codes.
> -   You receive errors with `5xx` response codes.

[Uptime checks](https://cloud.google.com/monitoring/uptime-checks) (Cloud Monitoring)
> For HTTP and HTTPS, all URL redirects are followed, and the final response received by the uptime checker is used to evaluate success criteria. For HTTPS checks, the SSL certificate expiration is computed based on the server certificate received in the last response.

[Disaster recovery architecture](https://cloud.google.com/sql/docs/mysql/intro-to-cloud-sql-disaster-recovery?hl=en#dr-architecture) (Cloud SQL)
> (Diagram needs to be checked)
> Two instances of Cloud SQL (**primary** and **standby**) are in two **separate zones** within a **single region** (the primary region). The instances are kept in sync with a regional persistent disk.
>
> One instance of Cloud SQL (a cross-region **read replica**) is in a **second region** (the secondary region). In the case of DR, the cross-region read replica is configured to be kept in sync with the primary instance using read replica settings (using asynchronous replication).
