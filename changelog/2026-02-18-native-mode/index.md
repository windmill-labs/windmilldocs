---
slug: native-mode
title: Native mode for workers
version: v1.637.0
tags: ['Workers']
description: New <code>NATIVE_MODE</code> environment variable to simplify native worker configuration. When enabled, it automatically spawns 8 subworkers and restricts the worker to only accept native jobs (bunnative, nativets, SQL queries, GraphQL) and flow handling. Can be set on any worker group and toggled from the UI.
features:
  [
    'NATIVE_MODE env variable automatically configures workers for native jobs.',
    'Spawns 8 subworkers and restricts to native jobs + flow handling.',
    'Can be enabled on any worker group, not just the native group.',
    'Toggleable from the Windmill UI.'
  ]
docs: /docs/core_concepts/worker_groups#native-worker-group
---
