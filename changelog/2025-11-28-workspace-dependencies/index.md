---
slug: workspace-dependencies
version: v1.586.0
title: Workspace Dependencies
tags: ['Core concepts', 'Dependencies', 'Script editor']
description: Centralized dependency management at the workspace level for shared dependency files across scripts.
image: ./workspace-dependencies.png
features:
  [
    'Centralized dependency management with shared dependency files stored in /dependencies directory.',
    'Support for Python, TypeScript (Bun), and PHP with language-specific annotations.',
    'Two dependency modes: requirements mode (explicit) and extra mode (hybrid with inference).',
    'Dependency file versioning and provenance tracking with Git sync support coming soon.',
    'CLI integration for managing workspace dependencies alongside scripts and flows.',
    'Creation of workspace defaults will redeploy all existing runnables for given language!'
  ]
docs: /docs/core_concepts/workspace_dependencies
