---
sidebar_position: 7
title: Professional Cloud Network Engineer
last_update:
  date: 2025-06-10
tags: [google cloud, certification, exam review]
---

**🏆 Passed: January 25, 2025**

### Networking Exam Notes

It was difficult, but I passed. I think I scored around 70-80%.

I had about 10 minutes for review, so time was tight. There were 50 questions.

There were some questions I had no idea how to answer.

**Difficult Questions I Couldn't Solve:**

-   There was a challenging question similar to one from my previous attempt.
    -   Something about checking the consistency of network information between peerings in a table format.
-   There were many complex configuration questions related to VPC Network Peering.
-   I don't recall any questions about NGFW (Next-Generation Firewall).
-   There were about three questions on hub-and-spoke models that were impossible to solve without prior knowledge.
-   There were about two questions on the restricted VIP, which I didn't know because they weren't in the practice material.
    -   [Restricted VIP Services](https://cloud.google.com/vpc-service-controls/docs/restricted-vip-services?hl=en)

Although I don't remember the specifics, the overall impression was that many questions required visualizing more complex configurations than those in the practice exams. It felt like the exam was designed to test applied problem-solving skills, assuming a solid foundation of basic knowledge.

I don't recall seeing any questions directly from the official practice exam.

**Questions I Could Solve:**

-   Questions about Cloud NAT.
-   Questions about Shared VPC (though they were more complex, and there was only about one).
-   About two questions on IP range calculations (my calculations matched the options exactly).

---

[List of Certifications](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

🥳 **Support Inquiry Resolved (Nov 21, 2024)** 🥳

-   **Contact Info:**
    -   ❌ Doesn't work: `https://support.google.com/cloud-certification/gethelp`
    -   ❌ Doesn't work: `https://cloud.google.com/contact/form?hl=ja`
    -   ⭕️ Works: `https://support.google.com/a/contact/certification?hl=en` (Found via the exam FAQ. Support is in English.)

##### Retake Scheduled

-   **Exam Name:** Google Cloud Certified - Professional Cloud Network Engineer (Japanese)
-   **Date & Time:** January 25, 2025, 15:45 Asia/Tokyo
-   **Location:** 4F Kita 7-jo Yoshiya Building, Kita 7-jo Nishi 5-chome, Kita-ku

##### Exam Day TODO (Best Practices from PSE Exam) ⭐

**The Day Before:**

-   [x] Get a good night's sleep.
    -   [x] Set up eye mask, earplugs, and pillow.

**On the Day:**

-   [x] Wake up by 11 AM (being well-rested is crucial).
-   Final review at a cafe:
    -   [x] St. Marc Cafe in Le Trois (for the mood).
    -   [x] Sapporo Library and Information Hall was the second choice.
    -   [x] Retake and review the practice exam.
        -   If I need a change of scenery, Tully's Coffee in the Nissay building.
-   [x] Print the exam confirmation email.
    -   [x] Forward the email to my phone app.
-   [ ] Take a 10-minute nap before arriving at the venue to refresh my brain.
    -   Also, consume enough sugar.
-   [ ] Arrive at the venue by 15:10 (30 minutes before the test starts) and complete check-in.
    -   Remember to read the options first.
    -   Remember to save time for review.

### Pre-Exam Study Strategy

-   [ ] Understand the official documentation.
    -   Use cases for custom firewall rules: Understanding this will level up my skills.
        -   [Firewall rules use cases](https://cloud.google.com/firewall/docs/firewalls?hl=en#gcp_firewall_use_cases)
        -   ※ With default firewall rules, instances within the same VPC can communicate with each other.

-   [x] Review the [official practice exam](https://docs.google.com/forms/d/e/1FAIpQLServ0tNGkr-dYAfmez_Gdk74dmVypZjzUKrkVFtFcArzhmPow/viewform?hl=en) and related materials.
    -   Final score: 90%
    -   Weak questions:
        -   [x] Q6, Q13, Q18, Q19

-   ⭐ Study the Whizlabs practice questions.
    -   Conclusion: All need review. It's a small set, so I should do it.
    -   Weak areas: Basically everything → I'll take the test once I score over 90%.
        -   [x] Practice Test 1
        -   [x] Practice Test 2
        -   [x] Practice Test 3
        -   [x] Practice Test 4
    -   [x] Take the final test (within Whizlabs).
        -   78%

🐸 **Challenging Topics** 🐸

-   [GKE authorized networks and control plane](https://cloud.google.com/kubernetes-engine/docs/how-to/authorized-networks?hl=en#overview)
-   [Pods per node and IP ranges (GKE)](https://cloud.google.com/kubernetes-engine/docs/how-to/routes-based-cluster?hl=en#pods_per_node)
-   [Cloud VPN network bandwidth](https://cloud.google.com/network-connectivity/docs/vpn/concepts/overview?hl=en#network-bandwidth)
-   [Changing the MTU of a VPC network](https://cloud.google.com/vpc/docs/mtu?hl=en#change-network-mtu)

-   [ ] Understand "Mastering TCP/IP".
-   [ ] Improve/review my custom question set.
    -   Continuously improve it based on Whizlabs questions and memories from the exam.
    -   Professional Cloud Network Engineer Practice Questions [Advanced]: 150 questions
    -   Professional Cloud Network Engineer Practice Questions [Basic]: 300-question speed run
-   [ ] [Review the Best Practices collection](https://docs.google.com/document/d/1cK7JblQmwkPkOWOpGpKdBcqfTQ8aTeAZWYLl2oTN0ME/edit?tab=t.0#heading=h.ouqoru4yl4wt)
    -   Use summarization features to deepen understanding efficiently.
-   Understand high-quality articles:
    -   [x] [G-gen Blog: VPC Explained Basics (Japanese)](https://blog.g-gen.co.jp/entry/vpc-explained-basics)
    -   [x] [G-gen Blog: VPC Explained Advanced (Japanese)](https://blog.g-gen.co.jp/entry/vpc-explained-advanced)

### Exam Information (December 8, 2024)

Note: The date can be changed, so I should check regularly.

-   **Exam Name:** Google Cloud Certified - Professional Cloud Network Engineer (Japanese)
-   **Date:** December 8, 2024
-   **Time:** 03:00 PM
-   **What to bring:** Confirmation email and ID
    -   Driver's license + Credit card

### Exam Diary (December 8, 2024 - Failed)

```
Time:
I ran out of time. I finished one pass-through but had to submit with about 10 questions still flagged for review.

Venue:
This was my first time taking an exam at an official offline test center. The desks had sufficient space between test-takers, and I wasn't distracted. People started at different times, so the sound of others leaving was a minor distraction, but it was tolerable.

The Exam:
Below are the areas where I felt my knowledge was insufficient, based on my recollection of the exam.

- Questions testing the understanding of different use cases for BGP, routers, and various load balancing features.
- Complex networking configuration problems involving GKE.
- Numerous complex problems regarding hybrid configurations between on-premises and Google Cloud.
- Questions requiring an understanding of the specific use cases for Private Service Connect, Direct Peering, and Interconnect.
- Applied questions on reading and understanding IP addresses and CIDR notation.
- An impression that there were many questions on modern Google Cloud services like hub-and-spoke network models.
- Many questions that required a solid understanding of the roles of routers, tunnels, gateways, and DNS forwarding directions in VPN connections.
- Questions about the correct application of firewall rule priorities (e.g., 1000 vs. 100, lower vs. higher).
- I feel like there were also questions that were unsolvable without knowing default IP addresses, CIDRs, or ASN numbers for BGP routers or firewalls.
- Questions that required memorizing specific numerical thresholds for choosing between services (e.g., the threshold for choosing a dedicated line, a partner interconnect, or a VPN).
```

**Next Steps After Failing:**

-   Thoroughly review and understand the topics I failed on, using the official documentation and GPT.
-   Create high-quality practice questions based on these topics and add them to my study set.

---

### Working Prompts

**Prerequisites:**

-   Using GPTs.
-   The GPT's "Knowledge" is pre-loaded with a question set template and the exam guide.
-   The base prompt is also pre-registered in the GPT.

```
"Please continue by generating 3 high-quality, long-form, and difficult questions.
Start the question numbering from 101.
You must 'search' the 'Knowledge Base' to ensure you adhere to all instructions (such as formatting with <br> and providing detailed explanations).

Targeted Exam Section:
5.4 Monitor, manage, and troubleshoot latency and traffic flow."
```

For random question generation (continuation from Dec 3):

```
"Please generate 3 high-quality, long-form, and difficult questions.
Start the question numbering from 113.
You must 'search' the 'Knowledge Base' to ensure you adhere to all instructions (such as formatting with <br> and providing detailed explanations).

Targeted Exam Section:
- Randomly from the exam guide registered in the 'Knowledge Base'."
```

```
Practical Use Cases: Learn how to combine various network services to address network design and operational challenges.
Troubleshooting: Develop skills to identify the causes of network performance degradation or failures and repair them quickly.
Advanced Design: Learn how to design network architectures considering scalability and cost-efficiency.
```

---

### Professional Cloud Network Engineer Prerequisite Knowledge Memo

#### Powers of 2 Table (up to 2^16)

-   Since calculators are not allowed during the exam, it's necessary to memorize the following common powers of 2.

| Power (n)       | Subnet Range (Formula) | Network Size |
| :-------------- | :--------------------- | :----------- |
| 2^0 = 1         | /32 = (32 - 0)         | 1            |
| 2^1 = 2         | /31 = (32 - 1)         | 2            |
| 2^2 = 4         | /30 = (32 - 2)         | 4            |
| 2^3 = 8         | /29 = (32 - 3)         | 8            |
| 2^4 = 16        | /28 = (32 - 4)         | 16           |
| **2^5 = 32**    | **/27 = (32 - 5)**     | **32**       |
| 2^6 = 64        | /26 = (32 - 6)         | 64           |
| 2^7 = 128       | /25 = (32 - 7)         | 128          |
| 2^8 = 256       | /24 = (32 - 8)         | 256          |
| 2^9 = 512       | /23 = (32 - 9)         | 512          |
| **2^10 = 1024** | **/22 = (32 - 10)**    | **1024**     |
| 2^11 = 2048     | /21 = (32 - 11)        | 2048         |
| 2^12 = 4096     | /20 = (32 - 12)        | 4096         |
| 2^13 = 8192     | /19 = (32 - 13)        | 8192         |
| 2^14 = 16384    | /18 = (32 - 14)        | 16384        |
| 2^15 = 32768    | /17 = (32 - 15)        | 32768        |
| **2^16 = 65536**| **/16 = (32 - 16)**    | **65536**    |
