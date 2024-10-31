---
slug: stantt-case-study
title: Windmill for Backend Batch Processing - Stantt Case Study
authors: [jeffknorr]
tags: [case study, testimonial, backend, windmill, stantt, ecommerce, python, scripts]
image: ./0-header.png
---

This is a testimonial written by [Jeffrey Knorr](https://www.linkedin.com/in/jeffreyknorr), Director of Technology at [Stantt](https://stantt.com/).

<!--truncate-->

> “Windmill helped us get visibility into our backend batch processing, leveraging the same custom Python scripts with their complex dependencies and requirements used before.”

<br/>

![Stantt Windmill use case](./0-header.png 'Stantt Windmill testimonial')

## What before Windmill?

**[Stantt][stantt]** is a menswear brand based in New York City and is currently in over 350 retail locations. We focus on finding the perfect fit for shirts, pants, suits etc, with 99 unique sizes and the ability to make and deliver custom fit and styled garments in only 7-10 days.

To help track operations, it is necessary to **synchronize production details from our factory to our main database**. This is accomplished via background jobs scheduled by CRON every 2 hours using custom python libraries and logic.

We previously had little monitoring, nor visibility on previous runs, and it was complex to change the logic or schedule.

## How did Windmill help?

We chose to self-host Windmill and use it for our backend batch processing. It allowed us to **keep working with essentially the same Python scripts and set-up we used before**, but with more visibility on [scheduled jobs](/docs/core_concepts/scheduling), [error conditions](/docs/core_concepts/error_handling), and [script versioning](/docs/core_concepts/versioning). The platform also enables easier access, by more team members, through the web based UI versus a linux terminal.

Our usage of Windmill is quite simple, but it is powerful and **mission critical**. We look forward to leveraging the [Flows](/docs/getting_started/flows_quickstart) and [Apps](/docs/getting_started/apps_quickstart) features of the platform in the future as well. The Windmill Team has been outstanding to work with and incredibly responsive to feature requests.

## How to use Windmill?

You can **[self-host](/docs/advanced/self_host/#deployment)** it using a docker compose up, our go with the **[cloud app](https://app.windmill.dev/user/login)**.

<!-- Links -->

[jrk-linkedin]: https://www.linkedin.com/in/jeffreyknorr
[stantt]: https://stantt.com/
