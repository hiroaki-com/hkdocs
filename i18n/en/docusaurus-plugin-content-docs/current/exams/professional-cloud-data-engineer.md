---
sidebar_position: 3
title: Professional Cloud Data Engineer
last_update:
  date: 2025-06-10
tags: [google cloud, certification, exam review]
---

**🏆 Passed: December 28, 2024**

**Related:**

-   [List of Certifications](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

### Exam Information (December 28, 2024)

**Reason for taking:** My exam voucher was expiring on this date. I chose this exam as I had the most knowledge in this area and the best chance of passing. I opted for the remote proctored exam due to a tight schedule.

-   **Exam Name:** Google Cloud Certified - Professional Data Engineer (Japanese)
-   **Date:** December 28, 2024
-   **Time:** 09:15 AM
-   **Method:** Remote Proctored Online Exam

**Preparation:**

-   Prepared to take the exam in my kitchen. Decided it was best to hang a sheet on the wall to create a clear background.
-   Download the secure browser (to be done at home).
-   ID needed: Driver's license, insurance card, credit card.


### Exam Notes (Passed on December 28, 2024)

This section contains notes and resources I found important either during or immediately after the exam.

#### Key Topics & Resources Reviewed

Here are links to the official documentation for topics that were prominent in the exam.

-   **Cloud Data Fusion:** [Use Cases](https://cloud.google.com/data-fusion?hl=ja#use-cases)
-   **Dataflow:** [Programming Languages](https://cloud.google.com/dataflow/docs/overview?hl=ja#portable)
-   **Cloud Composer:** [Programming Languages](https://cloud.google.com/composer/docs/concepts/overview?hl=ja)
-   **Dataplex:** [Overview](https://cloud.google.com/dataplex/docs/introduction?hl=ja)
-   **Datastream:** [Use Cases for Analytics](https://cloud.google.com/datastream/docs/implementing-datastream-dataflow-analytics?hl=ja)
-   **BigLake:** [Use Cases](https://www.topgate.co.jp/blog/google-service/23159)
-   **Cloud Storage:**
    -   [Storage Classes (Retention)](https://cloud.google.com/storage/docs/storage-classes?hl=ja#classes)
    -   [Bucket Lock (Retention Policy)](https://cloud.google.com/storage/docs/bucket-lock?hl=ja#retention-policy)
    -   [Autoclass](https://cloud.google.com/storage/docs/autoclass?hl=ja)
-   **BigQuery:** [Time Travel](https://cloud.google.com/bigquery/docs/time-travel?hl=ja)

#### Exam Impressions & Key Takeaways

-   The corporate case study questions have been removed from the exam format.
-   There were numerous applied questions related to **windowing functions**.
-   Many questions focused on the **system architecture of Dataproc**.
-   Topics like networking, deployment automation, and security were frequently integrated with data service questions.

#### Post-Exam Clarification

-   **Question:** In Dataproc, are intermediate datasets stored on HDFS or in memory?
-   **Answer:** It's recommended to use **HDFS** for intermediate datasets to ensure persistence.
    -   **Reference:** [Dataproc Best Practices Guide](https://cloud.google.com/blog/ja/topics/developers-practitioners/dataproc-best-practices-guide)


### 🔥 Study Strategy 🔥

After failing the networking exam:

-   Master the practice exams (review multiple times) — by Dec 15
    -   [x] Dec 9: Score was approx. 59.26% (16/27).
-   Research the exam guide, study my custom-made question sets, and review official documentation — by Dec 15
    -   It might be a good idea to refine the question sets based on the topics from the practice exam, focusing on my weak areas.
-   If other practice exams seem necessary after getting a feel for the official one, purchase and complete them — by Dec 21
    -   Study 50 free questions on the following site (all links are in Japanese):
        -   [Google Cloud Professional Data Engineer Practice Questions 1-10](https://it-concepts-japan.com/qsm_quiz/google-cloud-professional-data-engineer-1-10)
            -   [x] 1st round complete
        -   [Google Cloud Professional Data Engineer Practice Questions 11-20](https://it-concepts-japan.com/qsm_quiz/google-cloud-professional-data-engineer-11-20)
            -   [x] 1st round complete
        -   [Google Cloud Professional Data Engineer Practice Questions 21-30](https://it-concepts-japan.com/qsm_quiz/google-cloud-professional-data-engineer-21-30)
            -   [x] 1st round complete
        -   [Google Cloud Professional Data Engineer Practice Questions 41-50](https://it-concepts-japan.com/qsm_quiz/google-cloud-professional-data-engineer-41-50)
            -   [x] 1st round complete
        -   [x] [Google Cloud Professional Data Engineer Practice Questions 51-60](https://it-concepts-japan.com/qsm_quiz/google-cloud-professional-data-engineer-51-60)
            -   [x] 1st round complete
-   Conquer the Udemy course:
    -   https://www.udemy.com/course/google-cloud-professional-data-engineer-s/learn/quiz/5452330/test#overview

---

### Self-Study: Memos for Creating Practice Questions with Prompts

**November 30, 2024**

-   I have configured a custom GPT for this. However, during use, I find it necessary to reinforce the prompt as needed. For instance, the quality can degrade in longer outputs, and it's often better to start a new chat for subsequent prompts. These are AI weaknesses that need to be managed.

**Self-Study: Final Working Prompt**

-   As a last resort, I sometimes had to include the specific question number and text in the prompt to get the desired output.

```
"Regarding the questions in the 'Knowledge Base' document, under 'Chapter 4: Building and Operating Data Pipelines (Questions 151-200)', please improve the next five questions starting from question 165 as instructed. You must 'search' the 'Knowledge Base' for confirmation to correctly understand the correspondence between the original and improved questions and the intent of the instructions (e.g., format and explanation improvements).
- The explanations should be detailed and helpful for a Google Cloud beginner.
- In the explanation section, for any important Google Cloud service names that appear, write them in the format 'Official Name (e.g., Japanese Translation if applicable)'."

---
Reference information for searching within the 'Knowledge Base':
Question 165
What is the most common concept used for state management in streaming processing in Dataflow?
```

##### Self-Study: GPTs Tips

**Most Effective Method for Long Text Generation**

-   When the output becomes erratic, create a new chat and prompt again.
    -   → This seems more effective than refining the prompt, possibly because it reduces the system's context load.

**Second Best Method for Long Text Generation**

-   Split the source material into smaller chunks before uploading it to the knowledge base.
    -   → I suspect this is particularly effective for modification and formatting tasks that need to follow the order and content of the original material.

**The "Magic Words" (Prompt) for Contradictions:**

-   **"You must 'search' the 'Knowledge Base' for confirmation."**
    -   → By forcing the GPT to search the registered documents, it's possible to generate output that better adheres to the format, content, order, and instructions of the reference material.

**Fundamental Strategy**

-   Make prompts specific and precise.
    -   → In GPTs, you can pre-register instructions, so it's best to create clear instructions from the start.
    -   → It's also important to supplement the registered instructions in the prompt window during the task.

##### Self-Study: Tips for Generating Applied Questions

**December 14, 2024**

**Improving Practice Exams:**

Copy the official practice exam and save it as a text file.
→ Upload it to GPTs and clean up the formatting.
→ Set a system prompt in Gemini (Studio) and progressively improve the questions.

**Improving Foundational Questions:**

Generate a set of basic questions based on the exam guide using GPTs.
→ Set a system prompt in Gemini (Studio) and progressively develop them into more applied, scenario-based questions.
