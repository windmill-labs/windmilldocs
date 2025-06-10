---
slug: ssh-repl-for-worker-host
version: v1.495.0
title: SSH REPL to access the worker host
tags: ['ssh', 'repl', 'debugging', 'bash', 'workers']
description: Windmill now includes an interactive SSH-like REPL console for each worker, allowing you to run bash commands on the machine where the worker is hosted. This enables seamless on-the-fly debugging, filesystem exploration, and command execution directly from the UI.
features:
  - Open a bash REPL session per worker.
  - Execute and interact with commands in real time through a terminal UI.
  - Supports working directory navigation (`cd`) and multi-command scripts.
  - Live job output rendered using a full-featured xterm.js-based interface.
  - Cancel running commands (jobs) with keyboard interrupts or UI controls.
  - View and inspect code pending executions.
  - Auto-handling of common terminal behaviors (input prompt, history).
image: ./ssh-repl.png
docs: /docs/core_concepts/worker_groups#interactive-ssh-repl-for-worker-host
---
