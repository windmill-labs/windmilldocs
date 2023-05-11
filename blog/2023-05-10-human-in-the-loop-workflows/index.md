---
slug: human-in-the-loop-in-workflows
title: 'Human-in-the-Loop Workflows: Bridging Automation and Human Insight'
authors: [henricourdent]
tags: [tutorial, automation, human-in-the-loop, workflows]
---

Automation is swiftly becoming a critical component in many business operations - all the more so with generative AI which allows to interpret results and make decisions at scale. However, there are tasks where human judgement and expertise remain irreplaceable.

<!--truncate-->

Whether you're an experienced developer or someone newly venturing into the realm of automation, understanding how to effectively incorporate Human-in-the-Loop steps into any workflow can greatly enhance its reliability and adaptability. Let's explore this further.

VIDEO

:::info TLDR

In this blog post, we will delve into how Windmill allows workflows to be paused for human intervention and then resumed with [approval steps](/docs/flows/flow_approval).

:::

## Approval steps

Windmill [workflows](/docs/getting_started/flows_quickstart) are basically a chain of scripts that take as input:
- arbitrary parameters (integer, number, string, boolean, object, array, any) given on trigger or pre-defined
- [connections to thid-party services](/docs/core_concepts/resources_and_types)
- outputs from previous steps

To put it simple, chained

### Feed them with conditional branches


## Use case