---
slug: trigger-error-handlers
version: v1.505.0
title: Trigger error handlers
tags: ['Error handling', 'Triggers', 'Workspace']
description: Trigger error handlers now allow you to configure specific error handling for individual triggers. Override workspace error handlers with custom, Slack, Teams, or email notifications per trigger.
features:
  [
    'Configure error handlers for individual triggers (HTTP routes, Webhooks, Kafka, SQS, WebSocket, Postgres, NATS, MQTT, GCP, Email)',
    'Override workspace error handlers with trigger-specific handling',
    'Support for custom scripts, Slack, Teams, and email error handlers',
    'Additional arguments and retry configuration for custom error handlers',
    'Works with scripts only (not flows)'
  ]
docs: /docs/core_concepts/error_handling#trigger-error-handlers
---