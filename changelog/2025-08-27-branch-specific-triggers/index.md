---
slug: branch-specific-items
version: v1.535.1
title: Branch-specific items
tags: ['CLI', 'Git sync']
video: https://asciinema.org/a/VVRLx41ul5MP1UF2ubNC0KDBt
description: Maintain workspace specific configurations for variables, resources, and triggers per Git branch with automatic file path transformation and clean workspace management.
features:
  [
    'Branch-specific variables, resources, and triggers with automatic file naming based on Git branch.',
    'Pattern-based configuration using glob syntax to specify which items should be branch-specific.',
    'Automatic path transformation between local branch-specific files and clean workspace paths.',
    'Support for commonSpecificItems (all branches) and per-branch specificItems configurations.',
    'Branch name sanitization for filesystem safety with collision warnings.',
    'Support for all trigger types (kafka, http, websocket, nats, postgres, mqtt, sqs, gcp) and resource files.',
    'Seamless integration with Git sync for environment-specific deployments.',
  ]
docs: /docs/advanced/cli/branch-specific-items
---
