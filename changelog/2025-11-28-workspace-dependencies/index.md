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
    'CLI integration for managing workspace dependencies alongside scripts and flows.'
  ]
docs: /docs/core_concepts/workspace_dependencies
---

Workspace dependencies provide centralized dependency management at the workspace level. Instead of managing dependencies individually per script, you can now define shared dependency files that multiple scripts can reference.

## Key Features

**Centralized Storage**: All dependency files are stored under `/dependencies` in your workspace, replacing the previous path-based "raw requirements" system.

**Language Support**: Full support for Python (`.requirements.in`), TypeScript/Bun (`.package.json`), and PHP (`.composer.json`) with their respective annotation syntax.

**Flexible Dependency Modes**:
- **Requirements mode**: Use `# requirements: filename` to disable import inference and use only specified workspace dependencies
- **Extra mode**: Use `# extra_requirements: filename` to add workspace dependencies while keeping import inference enabled (hybrid approach)

**Versioning**: Dependency files are versioned by Windmill with full provenance tracking. Git sync support is coming soon.

**Admin Control**: Workspace dependency files can only be managed by workspace administrators, ensuring proper governance.

## Migration from Raw Requirements

This feature replaces the previous "raw requirements" system. Users need to manually:
1. Move existing dependency files to the workspace `/dependencies` directory
2. Update scripts to use the new annotation syntax
3. Upgrade to the latest Windmill CLI

See the [migration guide](/docs/core_concepts/workspace_dependencies/migration) for detailed instructions.

## Implementation Status

- ✅ Basic functionality with requirements mode
- ✅ Python, TypeScript (Bun), and PHP support  
- ✅ CLI integration
- ⏳ Git sync support (coming soon)
- ⏳ Extra requirements mode (planned for next release)
- ❌ Go support (not yet available)