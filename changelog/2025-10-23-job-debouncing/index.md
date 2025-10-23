---
slug: job-debouncing
version: v1.566.0
title: Job Debouncing
tags: ['Jobs', 'Performance', 'Debouncing']
description: Prevent redundant job executions by canceling duplicate jobs within a specified time window. Debouncing is enabled by default for dependency jobs.
features:
  [
    'Cancel pending jobs with identical characteristics when new ones arrive',
    'Configure custom debounce time windows',
    'Use custom debounce keys for fine-grained control',
    'Default debouncing enabled for dependency jobs',
  ]
docs: /docs/core_concepts/job_debouncing
---
