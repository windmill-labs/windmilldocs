---
slug: debounce-node
title: Debounce node for flows
tags: ['Flow editor', 'Enterprise']
description: Add per-step debouncing to flow nodes to consolidate repeated executions of a specific step within a flow.
features:
  [
    'Per-step debounce node in the flow editor.',
    'Configurable delay, custom debounce key, and argument accumulation.',
    'Max debouncing time and max debounce count limits.',
  ]
docs: /docs/core_concepts/job_debouncing#flow-level-debounce-node
---

Flows can now include debounce nodes that consolidate repeated executions of a specific step. Unlike job-level debouncing (which batches triggers), the debounce node delays a step within a flow and supersedes it if another execution arrives within the window.

Configuration includes delay, custom debounce keys with `$workspace` and `$args[name]` interpolation, argument accumulation, and max time/count limits.
