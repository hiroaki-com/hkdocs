---
sidebar_position: 4
title: Professional Cloud Database Engineer
last_update:
  date: 2025-06-10
tags: [google cloud, certification, exam review]
---

**🏆 Passed: March 7, 2025**

##### Post-Exam Notes

```
Impressions:
- Number of questions: 50
- Finished the first pass in about 100/120 minutes, then completed the review in about 15 minutes and submitted.
  - Estimated score: 75% - 85%

- This was my first exam in English, but I managed it because I was able to concentrate better than with the Japanese exams. The timing also worked out, as I was able to understand the questions, and about half of them were short.
- I believe there were only one or two questions I couldn't solve due to not knowing specific English words.
- Many of the questions looked familiar. Also, the topics covered did not deviate from the scope of the Udemy practice exams, leading me to suspect that a relatively small set of questions is being reused.

Topic Trends:
- Spanner
- Cloud SQL
- Datastream / Dataproc
- Questions related to availability and performance tuning
- Authentication and Authorization
- CMEK
```

---

**Exam Overview:**

-   [Google Cloud Certified - Professional Cloud Database Engineer](https://cloud.google.com/learn/certification/cloud-database-engineer?hl=en)

### Exam Information (March 7, 2025)

-   **Exam Name:** Professional Cloud Database Engineer
-   **Location:** In-person exam, Kichiya Building, 7th Floor
-   **Date & Time:** March 7, 2025, 15:00 (JST)

---

### 🔥 Study Strategy 🔥

-   Read the official study guide:
    -   [Professional Cloud Database Engineer Exam Guide](https://cloud.google.com/learn/certification/cloud-database-engineer?hl=en)

##### Learning Strategy:

-   **Reference Materials:**
    -   Official:
        -   [Exam Guide (Japanese)](https://cloud.google.com/learn/certification/cloud-database-engineer?hl=ja)
        -   🔥 [How to prepare for the exam (English)](https://medium.com/google-cloud/how-to-prepare-for-the-google-cloud-professional-cloud-database-engineer-exam-2a69baa68b09)
    -   Blogs:
        -   [G-gen Blog (Japanese)](https://blog.g-gen.co.jp/entry/professional-cloud-database-engineer)

-   **Focus on Practice Questions:**
    -   March 1, 2025 → The Udemy course I was using was removed, so I switched to a different one (received a refund).
        -   OLD｜[Practice Exams | Google Cloud Database Engineer (GCP)](https://www.udemy.com/course/practice-exams-google-professional-cloud-database-engineer/?couponCode=ST5MT020225BROW)
        -   NEW｜[Google Professional Cloud Database Engineer - GCP - Exams](https://www.udemy.com/course/google-professional-cloud-database-engineer-exams/)
            -   [Refund link](https://www.udemy.com/dashboard/purchase-history/): Request a Refund

    -   **Whizlabs (Free Questions Only):**
        -   [Free Test](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-database-engineer/2556)
            -   3rd round: 73%

    -   **[x] Old Practice Exams:**
        -   1st Round: Feb 8, 2025, approx. 50%
            -   [x] Practice Test 1
            -   [x] Practice Test 2
            -   [x] Practice Test 3
        -   2nd Round: Feb 12, 2025, approx. 70%
            -   [x] Practice Test 1
            -   [x] Practice Test 2
            -   [x] Practice Test 3

    -   **[x] New Practice Exams:**
        -   1st Round:
            -   [x] Practice Test 1｜50%
            -   [x] Practice Test 2｜50%
            -   [x] Practice Test 3｜60%
            -   [x] Practice Test 4｜76% (Mar 6, 2025)
            -   [x] Practice Test 5｜75% (Mar 6, 2025)
            -   [x] Practice Test 6｜70% (Mar 5, 2025)
        -   Review: Mar 7, 2025
            -   [x] Practice Test 1
            -   [x] Practice Test 2
            -   [x] Practice Test 3
            -   [x] Practice Test 4
            -   [x] Practice Test 5
            -   [x] Practice Test 6

    -   **Official Practice Exam:**
        -   [Try the official practice exam](https://docs.google.com/forms/d/e/1FAIpQLSe55cAg8a3NzgV_QCJ2_F75NAyE44Z-XuVB6oPJXaWnI5UBIQ/viewform?hl=en)
            -   → Note: The topics are covered by other practice sets, so no further review is needed.
            -   100%: Feb 13, 2025
            -   95%: Mar 2, 2025

-   [ ] Read articles from the Architecture Center
    -   [Google Cloud Database Architectures](https://cloud.google.com/architecture/databases?hl=en)
        -   [x] Feb 13, 2025

---

##### Weak Areas

[Cloud SQL Read Replicas](https://cloud.google.com/sql/docs/mysql/replication?hl=en#read-replicas)
> You can offload work from a Cloud SQL instance by using read replicas. A read replica is an **exact copy of the primary instance**. Data and other changes on the primary instance are updated on the read replica in **near real time**.
> **Read replicas are read-only**; you cannot write to them. They handle queries, read requests, and analytics traffic, **reducing the load on the primary instance.**

[Filter by query tags](https://cloud.google.com/sql/docs/postgres/using-query-insights?hl=en#filter_by_query_tags) (Cloud SQL)
> To troubleshoot an application, you must first [add tags to your SQL queries](https://cloud.google.com/sql/docs/postgres/using-query-insights?hl=en#adding-tags-to-sql-queries).

[Protecting databases: Terraform on Google Cloud](https://cloud.google.com/docs/terraform/best-practices/general-style-structure?hl=en#stateful-resources)
> For stateful resources such as databases, make sure that deletion protection (**`deletion_protection`**) is enabled. For example: `resource "google_sql_database_instance" "default" { ... deletion_protection = true }`

[Cloud SQL instance Recommender](https://cloud.google.com/sql/docs/mysql/recommender-sql-overprovisioned?hl=en)
> The Recommender for overprovisioned Cloud SQL instances analyzes usage metrics for primary instances that are more than 30 days old. For each instance, the Recommender analyzes **CPU and memory utilization** based on specific metric values over the last 30 days. The Recommender does not analyze read replicas.

[What is MongoDB Atlas?](https://www.mongodb.com/docs/atlas/#what-is-service-fullname-)
> MongoDB Atlas is a **multi-cloud database** service by the people who build MongoDB. It simplifies deploying and managing your databases while offering the versatility you need to build resilient and performant global applications on the cloud provider of your choice.

Check the status of a current (**in-progress**) operation (Cloud SQL)
> The Google Cloud console only shows success or failure upon operation completion. It is not designed to show warnings or other information.
> To check all operations for a specific Cloud SQL instance, run the [**`gcloud sql operations list`** command](https://cloud.google.com/sdk/gcloud/reference/sql/operations/list?hl=en).

[Database Migration Service (Source Configuration Requirements)](https://cloud.google.com/database-migration/docs/postgres/configure-source-database?hl=en#configure-your-source-instance-postgres)
> Install the **`pglogical`** package on your source instance and ensure that it's included in the [`shared_preload_libraries`](https://www.postgresql.org/docs/current/runtime-config-client.html) variable.

[Configure the default leader region](https://cloud.google.com/spanner/docs/instance-configurations?hl=en#configure-leader-region) (Spanner)
> You can **reduce application latency** by changing the location of the database's default leader region to be closer to your connecting clients.

[Export a database from Spanner to Avro](https://cloud.google.com/spanner/docs/export?hl=en)
> The export process uses **Dataflow** to write data to a folder in a Cloud Storage bucket. The resulting folder contains a set of **Avro files** and a JSON manifest file.

[Enable automatic storage increase](https://cloud.google.com/sql/docs/mysql/instance-settings?hl=en#automatic-storage-increase-2ndgen) (Cloud SQL)
> If you enable this setting, Cloud SQL checks your available **storage every 30 seconds**. If the available storage falls below a threshold size, it automatically adds more storage capacity. If the available storage repeatedly falls below the threshold, Cloud SQL continues to add storage until it reaches the **maximum of 64 TB**.

[Firestore Overview](https://cloud.google.com/firestore/docs/overview?hl=en)
> Firestore is a flexible, scalable database for mobile, web, and server development from Firebase and Google Cloud. It keeps your data in sync across client apps through real-time listeners and offers **offline support** for mobile and web so you can build responsive apps that **work regardless of network latency or internet connectivity**.

[Migrate to Google Cloud: Transferring your large datasets](https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets?hl=en)
> A summary article worth reading if you have time, covering data transfer times and major patterns.

[About High Availability](https://cloud.google.com/sql/docs/mysql/high-availability?hl=en) (Cloud SQL: Easy/Optimal Availability)
> An HA configuration provides data redundancy. A Cloud SQL instance configured for HA is also called a regional instance and is located in a primary and secondary zone within the configured **region**. A regional instance is comprised of a primary instance and a standby instance. Through [synchronous replication](https://cloud.google.com/compute/docs/disks?hl=en#repds) to each zone's persistent disk, all writes to the primary instance are replicated to disks in both zones before the transaction is reported as committed. In the case of an instance or zone failure, the standby instance becomes the new primary instance. Users are rerouted to the new primary. This process is called a **failover**.

Minimizing performance impact for exports (Cloud SQL)
> 1.  Take the **export from a read replica**. If you export **frequently** (daily or more often) and the amount of data being exported is **small**, this can be a good option.
> 2.  Use **serverless exports**. If you are creating a **one-time export** of a **large** database, this is the right choice.

[Google Cloud VMware Engine](https://cloud.google.com/vmware-engine/docs/overview?hl=en)
> Google Cloud VMware Engine is a fully managed service that lets you run the VMware platform in Google Cloud. VMware Engine provides continuity of your VMware operations to realize the benefits of a cloud consumption model and lower your total cost of ownership.

[Default maintenance windows](https://cloud.google.com/sql/docs/mysql/maintenance?hl=en#default-windows) (Cloud SQL)
> You want maintenance to occur at a time when your instance handles the least amount of traffic, which for you is around midnight on Sundays. You also need to avoid maintenance during the busy end-of-year holiday season. In this case, you would set the maintenance settings on your production instances as follows...
> → **It's possible to configure maintenance windows in Cloud SQL.**

[CMEK and CSEK](https://qiita.com/atsumjp/items/b872744d69686a1fc783)
> Customer-Managed Encryption Keys (CMEK) allow users to manage keys using Cloud KMS.
> Customer-Supplied Encryption Keys (CSEK) require users to create and manage their own keys.
> - **CMEK**: Customer-Managed Encryption Keys
> - **CSEK**: Customer-Supplied Encryption Keys

[Query Insights](https://cloud.google.com/sql/docs/mysql/using-query-insights?hl=en#introduction) (Cloud SQL)
> Query Insights helps you detect, diagnose, and prevent **query performance** problems for Cloud SQL databases. It provides self-service, intuitive monitoring, and diagnostic information that helps you go beyond detection to find the root cause of performance problems.

[Spanner: LIKE is deprecated](https://cloud.google.com/spanner/docs/sql-best-practices?hl=en#param-like)
> Because Spanner does not evaluate a parameterized LIKE pattern until runtime, it **must read all rows and evaluate them against the LIKE expression to filter out rows that don't match**.
> If your LIKE pattern has the form `foo%` (for example, it starts with a fixed string and ends with a single wildcard percent), use **STARTS_WITH instead of LIKE**. This option lets Spanner optimize the query execution plan more effectively.

[Configuring parallel replication](https://cloud.google.com/sql/docs/mysql/replication/manage-replicas?hl=en#configuring-parallel-replication) (Cloud SQL)
> Replication lag happens when the read replica falls behind the primary instance. In this section, you can **enable parallel replication to reduce replication lag**.

[Enable or disable high availability](https://cloud.google.com/sql/docs/mysql/configure-ha?hl=en#ha-existing) (Cloud SQL)
> You can configure an instance for high availability when you create it, or you can **enable it for an existing instance**. `gcloud sql instances patch INSTANCE_NAME ...`

[Switching between SSD and HDD storage](https://cloud.google.com/sql/docs/mysql/choosing-ssd-hdd?hl=en#switching) (Cloud SQL)
> After you create a Cloud SQL instance, the choice of SSD or HDD storage for that instance is **not changeable**.
> If you need to change an existing HDD instance to SSD (or vice versa), you can **export the data** from the existing instance and **import it into a new instance**. Migrating an entire instance takes time.

[HDD storage use cases](https://cloud.google.com/sql/docs/mysql/choosing-ssd-hdd?hl=en#when-in-doubt-ssd) (Cloud SQL)
> You plan to store 10 TB of data or more.
> ※ The cost savings of HDD are minimal unless you are storing large amounts of data. You **don't need to consider using HDD storage unless** you plan to store **more than 10 TB** of data.

[Rotate server CA certificates](https://cloud.google.com/sql/docs/mysql/manage-ssl-instance#rotate) (Cloud SQL)
> -   Create a new server certificate.
> -   Download the new server CA certificate information.
> -   Update your clients to use the new server CA certificate information.
> -   Complete the rotation, which moves the active certificate that was in the `Previous` slot to the active certificate.

[How to Achieve PostgreSQL High Availability with pgBouncer](https://severalnines.com/blog/how-achieve-postgresql-high-availability-pgbouncer/)
> Using pgBouncer for database connection pooling is a great choice to evenly distribute application load between Cloud SQL primary and read replica instances, optimizing database performance and resource utilization.

[Best practices for multi-region configuration performance](https://cloud.google.com/spanner/docs/instance-configurations?hl=en#multi-region-best-practices) (Spanner)
> For optimal write latency, locate compute resources for write-heavy workloads in or near the default leader region.

[Exporting a database from Spanner to Avro](https://cloud.google.com/spanner/docs/export?hl=en)
> To export a Spanner database by using the REST API or the Google Cloud CLI, complete the steps in Before you begin on this page, and then see the detailed instructions at Spanner to Cloud Storage Avro in the Dataflow documentation. The export process uses **Dataflow** to write data to a folder in a Cloud Storage bucket. The resulting folder contains a set of **Avro files** and a JSON manifest file.

[Export data from Cloud SQL with no performance overhead](https://cloud.google.com/blog/products/databases/introducing-cloud-sql-serverless-exports?hl=en)
> We are launching a new capability for [Cloud SQL](https://cloud.google.com/sql/): [Serverless Exports](https://cloud.google.com/sql/docs/mysql/import-export/exporting#standard-offload). With Serverless Exports, you can export data from your MySQL and PostgreSQL database instances without impacting performance or risking availability.

[Resizing a file system and partitions](https://cloud.google.com/compute/docs/disks/resize-persistent-disk?hl=en#resize_partitions) (GCE)
> To resize a file system on a non-boot data disk.
> If you are using **ext4**, use the **`resize2fs`** command to expand the file system: `sudo resize2fs /dev/DEVICE_NAME`

[Automatic failovers](https://cloud.google.com/bigtable/docs/failovers?hl=en#automatic) (Bigtable)
> If your app profile uses multi-cluster routing, Bigtable handles failovers for you automatically. If the closest cluster cannot handle a request, Bigtable routes the traffic to the closest cluster that can.

[Configure the source instance](https://cloud.google.com/database-migration/docs/postgres/configure-source-database?hl=en#configure-your-source-instance-postgres) (Database Migration Service > PostgreSQL)
> Install the pglogical package on your source instance and ensure that it's included in the shared_preload_libraries variable. See Install the pglogical package on your source instance in your environment.

[Minimize the impact of maintenance](https://cloud.google.com/sql/docs/mysql/maintenance?hl=en#impact) (Cloud SQL)
> To minimize the impact from connection disruption, you can use [connection pools](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=en#pools). The connections between the pooler and the database are dropped during maintenance, but the connections between the application and the pooler are preserved. This makes the connection re-establishment transparent to the application and offloads it to the connection pooler.
> You can reduce transaction failures by limiting the number of long-running transactions. Rewriting queries to be smaller and more efficient not only reduces maintenance downtime, but also improves database performance and reliability.
> To recover gracefully from connection disruption and transaction errors, [manage database connections](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=en) efficiently. You can build connection and query retry logic into your applications and connection poolers with [exponential backoff](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=en#backoff). If a query fails or a connection is dropped, the system sets a waiting period before retry. The waiting period increases for each subsequent retry. For example, the system might wait only a few seconds for the first retry, but up to a minute for the fourth retry. By following this pattern, you ensure that these issues are corrected without overloading the service.

[Performance of schema updates](https://cloud.google.com/spanner/docs/schema-updates?hl=ja#performance) (Cloud Spanner)
> **Schema updates** in Spanner **do not require downtime**. When you issue a batch of DDL statements to a Spanner database, you can continue to write and read from the database without interruption while Spanner applies the update as a [long-running operation](https://cloud.google.com/spanner/docs/manage-long-running-operations?hl=ja).

[Cross-region replicas](https://cloud.google.com/sql/docs/mysql/replication/cross-region-replicas?hl=en#regional_migration) (Cloud SQL | Data Migration)
> You can migrate a database to a different region with minimal downtime using cross-region replicas. You create a replica in a different region, wait for replication to complete, promote the replica, and then redirect your clients to the newly promoted instance.

[Google Distributed Cloud for bare metal](https://cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/concepts/about-bare-metal?hl=en#how_it_works) (GDC for bare metal)
> Anthos clusters on bare metal is now Google Distributed Cloud (software only) for bare metal. To learn more, see the product overview.
> Google Distributed Cloud is Google's solution for extending Google Cloud's **infrastructure** and services to your data centers (**on-premises**). Google Distributed Cloud is available in both connected and air-gapped configurations running on Google-provided hardware.

[Migrating data to an external server](https://cloud.google.com/sql/docs/mysql/migrate-data?hl=en#migrating-to-external) (Cloud SQL Data Migration)
> To migrate the primary copy of your data from Cloud SQL to an **external server** with minimal downtime, set up the **external server as an external replica**, and then demote the Cloud SQL instance to be a replica of that external server.

[Using point-in-time recovery](https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr?hl=en#log-storage-for-pitr) (PITR) (Cloud SQL)
> Cloud SQL uses **binary logs** for PITR.
> On August 11, 2023, Google began storing transaction logs for PITR on Cloud Storage. With this launch, the following conditions apply...

[Cloud Spanner Node Count](https://lp.cloudplatformonline.com/rs/808-GJW-314/images/Database_OnAir_q2_0409_Session.pdf) (Node Count Configuration)
> Simply change the node count from the edit screen to complete the configuration change.
> Changes can be made with no downtime.

[Exactly-once streaming](https://cloud.google.com/dataflow/docs/concepts/exactly-once?hl=en#processing) (Dataflow | Transactional Processing)
> To make non-deterministic processing effectively **deterministic**, use **checkpointing**. With checkpointing, each output from a transform is checkpointed to stable storage with a unique ID before it is delivered to the next stage. Retries of the Dataflow shuffle delivery will relay the checkpointed output. Even if your code is run multiple times, Dataflow ensures that the output from only one of those runs is stored. **Dataflow uses a consistency store** to ensure that writes to stable storage are not duplicated.

[Dual-region quorum availability](https://cloud.google.com/spanner/docs/monitoring-console?hl=en#charts-metrics) (Cloud Spanner)
> Dual-region **quorum** availability (`instance/dual_region_quorum_availability`) is only available for **dual-region** instance configurations. It displays a timeline of the health of the three quorums: the dual-region quorum and the single-region quorums for each region.
> The chart has a quorum availability dropdown that lets you see which regions are in normal mode or interrupted mode. You can use this chart, along with error rate and latency metrics, to **decide when to initiate a self-managed failover in case of a regional failure**.

[Connecting from Google Kubernetes Engine](https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine?hl=en) (GKE / Cloud SQL)
> We recommend running the **Cloud SQL Auth Proxy** in the **sidecar pattern** (as an additional container sharing a pod with your application). We recommend this over running it as a separate service for several reasons:
> > Prevents your SQL traffic from being exposed locally. The Cloud SQL Auth Proxy encrypts outgoing connections but you need to limit incoming connections.

[Replication configuration examples](https://cloud.google.com/bigtable/docs/replication-settings?hl=en) (Bigtable)
> This page explains common use cases for Bigtable replication and shows you the settings you can use to support these use cases.
> - [Isolate batch analytics workloads from other applications](https://cloud.google.com/bigtable/docs/replication-settings?hl=en#batch-vs-serve)
> - [Create high availability (HA)](https://cloud.google.com/bigtable/docs/replication-settings?hl=en#high-availability)
> - [Provide a near real-time backup](https://cloud.google.com/bigtable/docs/replication-settings?hl=en#backup)
> - [Maintain high availability and regional resilience](https://cloud.google.com/bigtable/docs/replication-settings?hl=en#regional-failover)
> - [Serve data near your users](https://cloud.google.com/bigtable/docs/replication-settings?hl=en#near-users)

##### Summary of Common Cloud SQL HTTP Status Errors

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

#### Exam Day TODO (Best Practices from PSE / PNE / PDE / PCA Exams) ⭐

**The Day Before:**

-   [x] Get a good night's sleep.
    -   Set up eye mask, earplugs, and pillow.

**On the Day:**

-   Wake up by 9 AM (being well-rested is crucial).
-   [x] Final review at a cafe.
    -   [x] Doutor Odori store (for the mood).
    -   Review incorrect answers from the [Official Practice Exam](https://docs.google.com/forms/d/e/1FAIpQLSe55cAg8a3NzgV_QCJ2_F75NAyE44Z-XuVB6oPJXaWnI5UBIQ/viewform?hl=en).
    -   [x] Review weak topic areas.
    -   Review incorrect answers from practice question sets.
    -   Read through other important articles.

-   [x] Leave the cafe at 14:00.

-   Print the exam confirmation email.
    -   [x] Forward the email to my phone app.

-   Take a 10-minute nap before arriving at the venue to refresh my brain.
    -   Also, consume enough sugar.

-   Arrive at the venue by 14:30 (30 minutes before the test starts) and complete check-in.
    -   [x] Remember to read the options first.
    -   [x] Remember to save time for review.
