---
slug: newsroom-case-study
title: Trigger Workflows from Slack - Newsroom Case Study
authors: [atelier]
tags: [case study, testimonial, slack commands, non-technical users, monitoring, scheduling]
image: ./0-header.jpg
---

This is a testimonial written by Wei Chih, Independent Journalist for a newsroom in Singapore.

<!--truncate-->

> “Windmill provides an amazing open-sourced platform that we can try and error at a very low cost, and we are able to trigger the command from Slack, which is a big plus to our reporters.”

<br/>

![Newsroom Case Study](./0-header.jpg 'Newsroom Case Study')

## What before Windmill?

We are a local newsroom in Singapore looking for leveraging technologies to empower our business. However, as a small team, we don’t have dedicated development resources, the best we can do is to find libraries on Github and assemble them into something that fits our need.

As a result, those libraries are often **provided in different languages**. We need Python to run scrapers, and need JavaScript to connect to certain SDKs, so it’s hard for us to use platforms such as n8n.io.

Also, **our colleagues are not super tech-savvy**, it would be hard to ask them to trigger web hooks or maintain the flows by themselves.

## How did Windmill help?

Windmill provides an amazing open-sourced platform that we can try and error at a very low cost, and we are able to [trigger the command from Slack](../2023-03-20-handler-slack-commands/index.md), which is a big plus to our reporters.

We use Windmill for:

1. **Media monitoring**: We are maintaining a large collection of RSS feeds and use some NLP libraries to analyse what is happening around the world.
2. **Scheduling posts**: We use Windmill to automatically update posts to multiple platforms.
3. In the near future, we'll **link audio and video processing**.

## How to use Windmill?

You can **[self-host](/docs/advanced/self_host/#deployment)** it using a docker compose up, our go with the **<a href="https://app.windmill.dev/" rel="nofollow">cloud app</a>**.

[Building a Slackbot on Windmill](../2023-03-20-handler-slack-commands/index.md) is done in less than 10 minutes, try now!
