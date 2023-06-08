---
slug: audience-management-case-study
title: Handle Complex and Branchy Workflows - Audience Management Case Study
authors: [saidhasyim]
tags: [case study, testimonial, audience management, branches, workflows]
image: ./windmill-books.png
---

This is a testimonial written by [Said Hasyim](https://saidhasyim.com/), Author of productivity books.

<!--truncate-->

> "Within a few weeks of usage, Windmill replaced all my previous workflows and automation tools, consolidating my flows into a single, efficient platform."

<br/>

![Audience Management Case Study](./0-header.jpg 'Audience Management Case Study')

## What before Windmill?

As an independent author, I am always on the lookout for ways to optimize my workflows and simplify processes to focus on my core job: writing content. The key challenges are around managing subscriptions, purchases and keeping my internal databases up to date.

Before transitioning to Windmill, I had been using Meta API (code-based automation), followed by Amazon Lambda to help me manage my workflows.

## How did Windmill help?

I use Windmill to build workflows meant to be **automatically triggered** (either [scheduled](/docs/core_concepts/scheduling) or [by external events](/docs/getting_started/trigger_flows)). I only use a few workflows - 2 or 3 on a daily basis - but they are **business critical**.

Within a few weeks of usage, **Windmill replaced all my previous workflows and automation tools**, consolidating my flows into a single, efficient platform.

In particular, I use Windmill for:

#### Automatically managing purchases and redemptions

This workflow handles a multi-code redemption process, allowing users to choose between redeeming one or two codes which will determine the result of the redemption.

![Process Purchase Redemption](./process_purchase_redemption.jpg 'Process Purchase Redemption')

#### Prepare data to scrape ...

![Prepare data to scrape](./prepare_data_to_scrape.jpg 'Prepare data to scrape')

#### ... and process scraped data

![Process Scraped Data](./process_scraped_data.png 'Process Scraped Data')

The goal here is not to detail these workflows as I made them unique to my own stakes. As you can see, **Windmill can handle even the most intricate branchy flows seamlessly**. To build them, I used [Hub scripts](https://hub.windmill.dev/), my few skills in programming (I am not a developer) and Windmill's attentive support.

I also use Windmill for:

- updating my CRM with customer information
- monitoring book reviews
- segmenting blog subscriptions

What you need to know is that all those workflows are **fully automated** and **interact with internal databases**.

Now you have the context. I would like to highlight a few reasons why Windmill has replaced all my pre-existing automation tools.

### User Interface

While AWS Lambda lets you write scripts in a traditional way, Windmill lets you write and design them with a beautiful graph-based interface. This makes the process of designing flows for complex projects quicker and more error free because you can **visualize the logic** while building them.

### Approval Steps

I was amazed by its “[flow approval](/docs/flows/flow_approval)” function that allows you to set up an approval flow. That feature led me to streamline some of my processes and is now an **integral part of my operations**. I no longer need to do the laborious tasks of accessing a system, validate the transaction, data patch, and rerun a script. All I need now is to receive an approval request email in real time, review on the go, hit approve/reject, and my flow will resume/abandon.

### Interconnectivity

Like Retool, you can design your admin console and [connect it to your database](/docs/integrations/integrations_on_windmill). **Windmill allows you to connect to your existing scripts and flows** that you have already designed inside Windmill i.e. you can reuse them, which saves a lot of time.

### Clear Visualization

Its job runs panel is intuitive. Each job [run’s audit is shown graphically](/docs/getting_started/flows_quickstart). You can **track the progress visually in real-time** when a transaction is triggered. It is easy to tell the exact flow your logic traversed in each run, making AWS CloudWatch logging look basic in comparison.

:::tip About the team

At last, I want to talk about its team and founder, Ruben. In a few weeks of using Windmill, **significant changes and updates were made**. All these changes improved my experience with the product. Windmill welcomes feedback and deploys extremely quickly for improvements.

:::

## How to use Windmill?

You can **[self-host](https://docs.windmill.dev/docs/advanced/self_host/#deployment)** it using a docker compose up, our go with the **<a href="https://app.windmill.dev/" rel="nofollow">cloud app</a>**.
