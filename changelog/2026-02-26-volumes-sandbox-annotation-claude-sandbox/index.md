---
slug: volumes-sandbox-annotation-ai-sandbox
title: Volumes, sandbox annotation, and AI sandbox
tags: ['Script editor', 'Enterprise', 'Security']
description: Persistent volumes for scripts via code annotations, per-script sandbox annotation for Python and TypeScript, and AI sandbox for running coding agents with isolation and persistent state.
features:
  - 'Volumes: persistent file storage attached to scripts via comment annotations, synced to workspace object storage.'
  - 'Dynamic volume names with $workspace and $args[...] interpolation.'
  - 'Per-worker LRU volume cache (10 GB) with exclusive leasing for concurrency safety.'
  - 'Per-script sandbox annotation (#sandbox / //sandbox) now supported for Python and TypeScript in addition to Bash.'
  - 'AI sandbox: sandboxing + volumes pattern for running AI coding agents (Claude Code, Codex, OpenCode) with persistent state.'
  - 'Built-in Claude Code template using the Claude Agent SDK with volume-backed session persistence.'
  - 'Volumes UI in the Assets page for browsing, exploring, and deleting volumes.'
  - 'Community Edition volume limits: max 20 volumes per workspace, 50 MB per file.'
docs: /docs/core_concepts/ai_sandbox
---
