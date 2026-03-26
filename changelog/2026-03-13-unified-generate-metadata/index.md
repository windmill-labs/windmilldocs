---
slug: unified-generate-metadata
title: Unified generate-metadata CLI command
tags: ['CLI']
description: The new `wmill generate-metadata` command consolidates metadata and lockfile generation for scripts, flows, and apps into a single unified command. The previous commands `wmill script generate-metadata`, `wmill flow generate-locks`, and `wmill app generate-locks` are now deprecated.
features:
  [
    'Unified `wmill generate-metadata` command that handles scripts, flows, and apps in a single pass',
    'Selective processing with `--skip-scripts`, `--skip-flows`, and `--skip-apps` flags',
    'Pattern-based filtering with `-i/--includes` and `-e/--excludes` options',
    'Strict folder boundaries mode with `--strict-folder-boundaries` flag',
    'Schema-only and lock-only modes for fine-grained control',
  ]
docs: /docs/advanced/cli/generate-metadata
---
