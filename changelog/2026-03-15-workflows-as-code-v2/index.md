---
slug: workflows-as-code-v2
title: Workflows as code v2
tags: ['Script editor', 'Flow editor']
description: Workflows as code v2 introduces checkpoint-based orchestration with <code>workflow()</code>, <code>task()</code>, <code>step()</code>, <code>sleep()</code>, <code>waitForApproval()</code>, and <code>parallel()</code> primitives. The workflow fully suspends between tasks, releasing its worker slot, eliminating deadlocks and enabling unlimited parallelism on any number of workers. Also adds script modules (<code>__mod/</code> folders), CLI sync support, and a timeline UI for visualizing task execution.
features:
  [
    'Checkpoint/replay orchestration: workflows suspend between tasks, releasing worker slots entirely — zero worker waste during sleeps, approvals, or child task execution.',
    'task() dispatches functions as separate child jobs with own logs and timeline.',
    'step() persists lightweight inline results for replay determinism (timestamps, random IDs).',
    'sleep() and waitForApproval() for server-side delays and human-in-the-loop approvals — the worker is fully released until the event fires.',
    'parallel() utility with optional concurrency control for batched processing.',
    'taskScript() and taskFlow() to dispatch to existing Windmill scripts and flows by path.',
    'Script modules: companion files in __mod/ folders with per-module dependency tracking and separate lockfiles.',
    'Full CLI sync support with per-module hash tracking and selective lock regeneration.',
    'Task options: timeout, tag, cache_ttl, priority, concurrency_limit, concurrency_key.',
    'Workflow timeline UI showing each task as a separate entry with duration bars.',
    'Error propagation with TaskError for structured try/catch error handling.',
  ]
docs: /docs/core_concepts/workflows_as_code
---

Workflows as code v2 is a complete rewrite of the WAC engine. Workflows now use a checkpoint/replay model where the parent job fully suspends between tasks, releasing its worker slot entirely. This eliminates the deadlock issues of v1 and means a single worker pool can handle unlimited workflow parallelism.

## What changed from v1

In v1, workflows ran as a single long-lived process that dispatched HTTP calls to the Windmill API. The parent process stayed alive for the entire duration, holding a worker slot.

In v2, the parent workflow runs only during the brief moments between checkpoints. When it hits a `task()`, the parent saves its state, exits, and creates child jobs. The worker slot is freed. When all children complete, the parent is automatically re-queued, replays completed steps from the checkpoint, and continues.

This means `sleep(86400)` (24 hours) uses zero worker time. `waitForApproval()` with a week-long timeout uses zero worker time. 100 parallel tasks need only worker slots for the tasks themselves, not for the orchestrator.

## Script modules

Scripts can now have companion module files stored in `__mod/` folders. This lets you split task logic into separate files while keeping them part of the same script. Each module has its own lockfile, and the CLI only regenerates locks for modules that changed.

```
f/my_folder/
├── my_workflow.ts
└── my_workflow__mod/
    ├── extract.ts
    └── transform.ts
```

Modules are referenced via `taskScript('./extract.ts')` in the workflow code and run as separate child jobs with their own dependencies.
