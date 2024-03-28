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
---

# Windmill as an Airflow Alternative - Qovery Case Study

This is a testimonial written by [Romaric Philogène](https://www.linkedin.com/in/romaricphilogene/), CEO & Co-founder at Qovery.

> "Windmill has been able to cover all of our needs in terms of workflow orchestration and observability. We use Windmill to manage our [Playground](https://www.qovery.com/playground) and our complex billing engine. They made it simple to build, schedule, and monitor scripts & flows. The platform offers a clear DX for code editing, permission management and error handling."

<br/>

![Windmill Qovery!](./wm_qovery.png)

## What before Windmill?

[Qovery](https://www.qovery.com/) is a modern infrastructure automation platform that simplifies the process of managing cloud infrastructure for DevOps, Platform and Engineering teams. It provides a set of tools and features that automate the provisioning, configuration, and management of infrastructure resources.

Many of our operations require taking into account a large set of data. As we started growing, our needs expanded beyond scripts that we could run bare on our servers. We needed both a stack that had extensive **observability** capabilities fit for production and the ability to turn our scripts into **workflows and ETLs**. We started with [Airflow](https://airflow.apache.org/) and had an extensive set of workflows in there but we started to hit the limit of Airflow (e.g. Developer Experience, testing, [XCOMs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/xcoms.html) is a hassle and running it in production is painful).

Windmill has been able to cover all those limitations. We use Windmill as a platform to build, [schedule](/docs/core_concepts/scheduling), and monitor all of our scripts & flows. They offer a clear DX for code editing, [permission management](/docs/core_concepts/roles_and_permissions) and [error handling](/docs/core_concepts/error_handling).

At last, Windmill's [live debugger](/docs/core_concepts/instant_preview) helped us iterate very quickly and reduce the time to production. When something goes wrong with a script, we can quickly troubleshoot and fix it if needed.

## Use cases

Below are some use cases that we have built on Windmill.

@Romaric, would be cool to have one screenshot or video for at least one of those use cases.

### Billing engine

Windmill is the backend for all our billing. We rolled out all our customers on our new pricing structure, usage-based, and the computation is done with Windmill. Specifically, at a given frequency, we have a Windmill flow that pings all of our clients to retrieve all of their metrics. Then the data is sent into [Chargebee](https://www.chargebee.com/) from Windmill. This is a business-critical process and is quite complex since it requires managing numerous API calls.

Windmill has completely replaced Airflow for this use case.

### Synchronization of key users

We also use Windmill for marketing purposes alongside [Intercom](https://www.intercom.com/) to tag our users based on their engagement with our platform. This triggers tailored workflows, ensuring our marketing and customer success teams can effectively support our most active users. Additionally, this system helps us identify users who might be at risk of churning, allowing us to proactively address their concerns.

### Recycle Qovery Playground Users

Some resources are no longer used by clients (containers, databases), and maintaining them is inefficient and costly. Therefore, we created a simple yet devilishly effective trigger flow that regularly monitors the database and recycles user resources on the [Qovery Playground](https://www.qovery.com/playground) every 30 minutes. We allocate free resources per user for 7 days, then it recycles. Just for testing purposes.

The killer feature here was the ability to easily combine schedules with the conditional execution of a series of tasks, what Windmill calls [Trigger Flows](/docs/getting_started/trigger_flows#scheduling--trigger-scripts).