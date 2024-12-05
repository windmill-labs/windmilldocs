---
slug: queue-metric-alerts
version: v1.406.0
title: Queue metric alerts
tags: ['Worker groups', 'Enterprise']
description: Critical alerts for jobs waiting in queue.
docs: /docs/core_concepts/worker_groups#queue-metric-alerts
features:
  [
    'Add functionality to monitor job queues and trigger alerts for waiting jobs, with UI for alert management in enterprise feature.',
    'The "cooldown" parameter determines the minimum duration between two consecutive alerts if the number of waiting jobs are fluctuating around the configured threshold.'
  ]
image: ./queue-metric-alerts.png
---