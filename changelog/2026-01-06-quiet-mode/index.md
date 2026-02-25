---
slug: quiet-mode
title: Quiet mode for workers
tags: ['Workers', 'Self-hosting']
description: Set <code>QUIET=true</code> on workers to suppress verbose per-job logs (fetched job, started handling, job finished) and reduce periodic log frequency by 10x. Useful for reducing log noise in production.
features:
  - QUIET environment variable to reduce worker log verbosity
  - Suppresses per-job lifecycle logs
  - Reduces periodic "still running" and memory snapshot log frequency by 10x
docs: /docs/core_concepts/worker_groups#quiet-mode
---
