---
slug: azure-event-grid-triggers
title: Azure Event Grid triggers
tags: ['Triggers', 'Enterprise']
description: Trigger scripts and flows in response to Azure Event Grid events from custom topics, system topics, domains, and Event Grid Namespaces.
features:
  [
    "Subscribe to Azure Event Grid basic topics, system topics and domains (basic_push mode).",
    "Subscribe to Event Grid Namespace topics with CloudEvents 1.0 push or pull delivery.",
    "Service Principal authentication with tenant_id, client_id, client_secret and default subscription_id.",
    "Auto-discovery of topics and namespaces the service principal can access via ARM.",
    "Server-managed shared-secret authentication on inbound push webhooks.",
    "Lock-token ack/reject on namespace pull, enabling dead-lettering and batched consumption.",
    "Optional event-type filters per trigger.",
    "Capture mode uses an isolated -wm-capture subscription so tests never clobber the deployed trigger."
  ]
docs: /docs/core_concepts/azure_triggers
---
