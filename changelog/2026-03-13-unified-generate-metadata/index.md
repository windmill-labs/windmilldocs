---
slug: unified-generate-metadata
title: Unified generate-metadata CLI command
tags: ['CLI']
description: The new `wmill generate-metadata` command consolidates metadata and lockfile generation for scripts, flows, and apps into a single unified command.
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

## Migration guide

The following commands are now deprecated and will show deprecation warnings:

| Deprecated command | Replacement |
| ------------------ | ----------- |
| `wmill script generate-metadata` | `wmill generate-metadata` |
| `wmill flow generate-locks` | `wmill generate-metadata` |
| `wmill app generate-locks` | `wmill generate-metadata` |

The legacy commands continue to work but users should migrate to the unified command.

## Usage

```bash
# Generate metadata for all scripts, flows, and apps
wmill generate-metadata

# Preview changes without applying
wmill generate-metadata --dry-run

# Auto-confirm all updates
wmill generate-metadata --yes

# Only process scripts
wmill generate-metadata --skip-flows --skip-apps

# Only update lockfiles
wmill generate-metadata --lock-only

# Filter by patterns
wmill generate-metadata -i "f/production/*"

# Strict folder boundaries
wmill generate-metadata f/my_folder --strict-folder-boundaries
```
