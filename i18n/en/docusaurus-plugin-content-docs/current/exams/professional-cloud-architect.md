---
sidebar_position: 2
title: Professional Cloud Architect
tags: [google cloud, certification, passed-exam]
---

**🏆 Passed: January 31, 2025**

**Exam Overview:**
- [Official Page: Professional Cloud Architect](https://cloud.google.com/learn/certification/cloud-architect)
- [List of Certifications](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

---

### Exam Details (January 31, 2025)
- **Exam Name:** Google Cloud Certified - Professional Cloud Architect (Japanese)
- **Date:** January 31, 2025
- **Time:** 01:45 PM
- **Location:** On-site Test Center

---

### Post-Exam Reflections 🌸

**Passed on January 31, 2025**


My overall impression was that the exam was interesting. However, it wasn't easy, and there were quite a few questions I had never seen before.

The exam consisted of 50 questions, and I finished with about 30 minutes to spare, which was just enough time for a complete review. I was a bit disappointed, as I had hoped to finish sooner. I estimate my score was around 75-80%.

I recognized some questions from a Udemy course I had taken a while ago. The proportion of complex, multi-topic questions (e.g., combining Authentication, Organization, and Services) had significantly increased. There were fewer simple questions asking about the purpose of a single service.

I also felt there was a slight emphasis on security-related topics. Questions about networking and data integration seemed particularly challenging. There were several advanced, application-focused questions about IAM design.

A few questions on machine learning were also included. I also encountered a question about VM migration that was new to me and I wasn't confident about my answer.


---

### 🔥 Exam Strategy 🔥
- Understand the four official case studies.
  - [Official Case Studies Guide (PDF)](https://services.google.com/fh/files/misc/professional_cloud_architect_exam_guide_english.pdf)
  - [Case Studies (My Notes)](/docs/exams/case-studies)

##### Exam Day To-Do List (Based on successful strategies from PSE/PNE exams) ⭐️
**The Day Before:**
- [x] Get a good night's sleep.
  - [x] Set up eye mask, earplugs, and pillow.

**On Exam Day:**
- [x] Wake up by 9:00 AM (crucial to be well-rested).
- [x] Do a final review at a coffee shop.
  - [x] Retake and review the [Official Practice Exam](https://docs.google.com/forms/d/e/1FAIpQLScpVCxsKSrqMBmqJ4fiYrJfCSlMhJVIFaW_v3MD4xEd6NW0Bw/viewform).
  - [x] Reread the case studies.
  - [x] Review weak areas (listed below).
  - [x] Do some final look-ups to solidify knowledge.
- [x] Print the exam confirmation email.
  - [x] Forward the email to a mobile app for easy access.
- [x] Take a 10-minute power nap before arriving at the venue to refresh my mind.
  - [x] Have a sugary snack for energy.
- [x] Arrive at the test center and complete check-in by 3:10 PM (30 minutes before the start time).
  - **Exam Tactics:** Read the answer choices first. Manage time to ensure a final review.

##### Study Plan:

- **Practice, Practice, Practice:**
  - Consistently work through practice questions.
  - Review incorrect answers:
    - [x] Practice Test 1
    - [x] Practice Test 2
    - [x] Practice Test 3
    - [x] Practice Test 4
  - Review questions marked for review:
    - [ ] Practice Test 1
    - [ ] Practice Test 2
    - [ ] Practice Test 3
    - [ ] Practice Test 4

- **Official Practice Exam Attempts:**
  - [x] Attempted the official practice exam multiple times:
    - 86% on 2025/01/12
    - 90% on 2025/01/13
    - 95% on 2025/01/31

- **Stay Current:**
  - [x] Check the latest service updates and product list.
    - [Product List Docs](https://cloud.google.com/products)
    - [My Console](https://console.cloud.google.com/products?inv=1&invt=AboG6g&project=pollman-x)

---

### Weak Areas for Review

- **Google Compute Engine (GCE)**
  - Managed Instance Groups (MIGs)
  - Instances
  - [What is Shielded VM?](https://cloud.google.com/compute/shielded-vm/docs/shielded-vm)

- **[Direct Peering Overview](https://cloud.google.com/network-connectivity/docs/direct-peering)**
  > Direct Peering exists outside of Google Cloud. Unless you need to access Google Workspace applications, the recommended way to access Google Cloud is through [Dedicated Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/dedicated-overview) or [Partner Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect/concepts/partner-overview).

- **[Cloud Shell Storage](https://cloud.google.com/shell/docs/how-cloud-shell-works#persistent_disk_storage)**
  > 5 GB of free, non-expandable persistent disk storage.

- **[About Service Perimeters](https://cloud.google.com/vpc-service-controls/docs/service-perimeters#about-perimeters)**
  > You can configure service perimeters at the **project level or VPC network level**.
  > ...
  > Additionally, you can use the VPC accessible services feature to restrict which services are accessible from within the perimeter, including **VMs in VPC networks hosted within the perimeter**.

- **[Available Storage Classes](https://cloud.google.com/storage/docs/storage-classes#classes)**
  > Remember the minimum storage duration for each class.

- **[What are Access Control Lists (ACLs)?](https://cloud.google.com/storage/docs/access-control/lists#acl-def)**
  > A mechanism you can use to define who has access to your buckets and objects, as well as what level of access they have. In Cloud Storage, you apply ACLs to individual buckets and **objects**.

- **[Disaster Recovery Scenarios for Data](https://cloud.google.com/architecture/dr-scenarios-for-data)**
  > A lengthy but good read if time permits.

- **[Federating Google Cloud with Active Directory](https://cloud.google.com/architecture/identity/federating-gcp-with-active-directory-introduction)**
  > Also a long read; I don't fully understand this topic yet.

- **[Default Encryption at Rest](https://cloud.google.com/docs/security/encryption/default-encryption#encryption_at_the_storage_device_layer)**
  > Google encrypts data at rest using the AES algorithm. All data at the storage layer is encrypted by default with a DEK using AES-256, with the exception of Persistent Disks created before 2015, which used AES-128. AES is widely used because both AES-256 and AES-128 are recommended by the National Institute of Standards and Technology (NIST) for long-term storage and are often part of customer compliance requirements.

- **[Node Taints for GPU Preemptible VMs](https://cloud.google.com/kubernetes-engine/docs/how-to/preemptible-vms#node_taints_for_gpu_preemptible_vms)**
  > The taint is `nvidia.com/gpu=present:NoSchedule`.

- **[Increasing the Size of a Persistent Disk](https://cloud.google.com/compute/docs/disks/resize-persistent-disk)**
  > If you're using `ext4`, run the `resize2fs` command.
  > You don't need to reboot the VM after this process. You can now use the additional disk space to store data.

- **[Monitoring an Instance with Cloud Monitoring (Spanner)](https://cloud.google.com/spanner/docs/monitoring-cloud#create-charts)**
  > You can see the correlation between a Spanner instance's **CPU utilization and its latency**. This might indicate that you need to add more compute capacity to the instance or that some queries have high CPU usage.

- **[Troubleshooting Using the Serial Console](https://cloud.google.com/compute/docs/troubleshooting/troubleshooting-using-serial-console)**
  > My takeaway: This allows you to view detailed logs from a VM, down to the kernel and BIOS level.

- **OS Login (Managing user access to VMs)**
  > The OS Login feature allows you to manage SSH access to your Linux instances using Compute Engine IAM roles. You can enhance security by enabling OS Login with a two-step verification process and manage access at an organizational level by setting organization policies.

- **Maximum Subnet Range for Custom VPCs**
  > If you expand the IPv4 range of a subnet that was automatically created in an auto mode VPC network (or a custom mode VPC network that was formerly an auto mode network), the widest prefix (subnet mask) you can use is **/16**.

- **[Connectivity works for some VMs but not for others (Traffic Selectors)](https://cloud.google.com/network-connectivity/docs/vpn/support/troubleshooting#connectivity_works_for_some_vms_but_not_for_others)**
  > Traffic selectors define a range of IP addresses for a VPN tunnel. Most VPN implementations not only use them for routing but also will only pass a packet through the tunnel if both of the following conditions are true:
  > - The packet's source is within the IP ranges specified in the local traffic selector.
  > - The packet's destination is within the IP ranges specified in the remote traffic selector.

- **[Creating a Private Cluster](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters)**
  > In a private cluster, nodes only have internal IP addresses, isolating them and their pods from the internet by default. Client access to the control plane can be disabled, restricted, or unrestricted.
  > A private cluster must be a VPC-native cluster. VPC-native clusters do not support legacy networks.

- **Challenging Topics (Legacy Notes):**
  - **Connectivity/Access:**
    - [Blog Post (Zenn)](https://zenn.dev/cloud_ace/articles/e483362103d7f6)
    - [Official Community Thread](https://www.googlecloudcommunity.com/gc/Infrastructure-Compute-Storage/private-service-access-vs-private-service-connect-vs-private/m-p/760591)

---

### Memos on Prompts for Self-Study Question Generation

**November 30, 2024**
- I have set up a dedicated prompt in GPTs. However, it's sometimes necessary to reinforce the prompt during a session. For example, to overcome the limitations of generative AI, I might need to reinforce the latter part of a long-generated text or start a new session for multiple prompts.

**Finalized working prompt:**
- In a worst-case scenario, I managed by including the question number and the question text directly in the instruction.
```
Regarding the questions in "Knowledge" from "Chapter 4: Building and Operating Data Pipelines (Questions 151-200)," please improve the next 5 questions starting from question 165 as instructed. Always "search" the "Knowledge" for confirmation to correctly understand the correspondence between the original and improved questions and the intent of the instructions (format and explanation improvements).
- Ensure the explanations are detailed and beneficial for Google Cloud beginners.
- For important Google Cloud service names appearing in the questions, write them in the format "Official Name (Japanese Translation)".

Reference information for searching the relevant question in "Knowledge":
Question 165
In Dataflow streaming processing, what is the most common concept used for state management?
```

##### Tips for Self-Study with GPTs

**Maximizing Effectiveness for Long Text Generation:**
- If the output becomes distorted, **create a new session** and prompt again.
  - This seems more effective than just refining the prompt, possibly because it reduces the system's load.

**Next Best Tactic for Long Text Generation:**
- **Split** the reference material into smaller chunks.
  - This is particularly effective for tasks that require adherence to the original material's order and content, such as format improvements.

**Magic Words for Contradictions (Prompt):**
- **"Always 'search' the 'Knowledge' for confirmation."**
  - Forcing the GPT to search the registered documents allows it to generate responses that are consistent with the format, content, order, and instructions of the reference material.

**Fundamental Best Practices:**
- Be specific and precise with prompts.
  - In GPTs, you can pre-register instructions, so aim for clarity from the start.
  - It's also important to supplement the pre-registered instructions with additional details in the prompt window during the session.

##### Tips for Generating Advanced Questions

**December 14, 2024**

**Improving Practice Exams:**
1. Copy the practice exam from the official site and save it as a text file.
2. Register it with GPTs and clean up the format.
3. Use Gemini (Studio) with a system prompt to progressively improve the questions.

**Improving Foundational Questions:**
1. Generate a set of foundational questions aligned with the exam scope using GPTs.
2. Use Gemini (Studio) with a system prompt to progressively develop them into more advanced, application-based questions.

