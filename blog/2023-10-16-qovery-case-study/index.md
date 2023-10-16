---
slug: qovery-case-study
authors: [romaricphilogene]
tags:
  [
    'Case Study',
    'Testimonial',
    'Airflow alternative',
    'Schedule',
    'Billing',
    'Qovery',
  ]
image: ./wm_qovery.png
description: "Blablabla"
---

# Windmill as an Airflow Alternative - Qovery Case Study

This is a testimonial written by [Romaric Philogène](https://www.linkedin.com/in/romaricphilogene/), CEO & Co-founder at Qovery.

<br/>

![Windmill Qovery!](./wm_qovery.png)

## What before Windmill?

[Qovery](https://www.qovery.com/) is a modern infrastructure automation platform that simplifies the process of managing cloud infrastructure for DevOps, Platform and Engineering teams. It provides a set of tools and features that automate the provisioning, configuration, and management of infrastructure resources.

As a tech company, many of our operations require taking into account a large set of data. As we started growing, our needs expanded beyond scripts that we could run bare on our servers. We needed both a stack that had extensive **observability** capabilities fit for production and the ability to turn our scripts into **workflows and ETLs**. We started with [Airflow](https://airflow.apache.org/) and had an extensive set of workflows in there but we started to hit the limit of Airflow (e.g. Developer Experience, testing, [XCOMs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html) is a hassle and running it in production is painful).

<!-- @Romaric, check if limit of Airflow is accurate for you -->

Windmill has been able to cover all those limitations. We use Windmill as a platform to build, [schedule](/docs/core_concepts/scheduling), and monitor all of our scripts & flows. They offer a clear DX for code editing, [permission management](/docs/core_concepts/roles_and_permissions) and [error handling](/docs/core_concepts/error_handling). Additionally, they have an active community and responsive team.

Below are some use cases that we have built on Windmill.

## Recycle expired users

Some databases are no longer used by clients, and maintaining them is inefficient and costly. Therefore, we created a simple yet devilishly effective trigger flow that regularly monitors the use of databases, and if and only if one of them meets certain criteria, it will be cleaned up.

The killer feature here was the ability to easily combine schedules with the conditional execution of a series of tasks, what Windmill calls Trigger Flows.

## Billing engine

Our billing engine is entirely calculated with Windmill. Specifically, at a given frequency, we have a Windmill flow that pings all of our clients to retrieve all of their metrics. This is a business-critical process and is quite complex since it requires managing numerous API calls.

Windmill has completely replaced Airflow for this use case.

Other use cases include:
- Synchronization of key users with Intercom

// Add use cases here

// Add video from Romaric