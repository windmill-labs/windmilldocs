---
slug: webmux
authors: [farhadgoulamabasse]
tags: ['ai', 'developer-tools', 'open-source', 'agents']
description: 'Webmux is the web dashboard every engineer at Windmill uses to run parallel AI coding agents across git worktrees.'
title: 'Webmux: a web dashboard for parallel AI coding agents'
---

# Webmux: a web dashboard for parallel AI coding agents

Every engineer at Windmill runs multiple AI coding agents in parallel throughout the day. An agent implementing a new API endpoint, another fixing a frontend bug, a third refactoring a service — each in its own git worktree, each with its own dev servers, each producing PRs that need monitoring. Managing all of this across scattered terminal windows and browser tabs was painful.

So we built **Webmux**, a web dashboard that lets you create, monitor, and manage parallel AI agents from a single browser tab. It is directly inspired by [workmux](https://workmux.raine.dev/), the excellent terminal-first CLI tool by [Raine](https://github.com/raine) that pioneered the git-worktree-per-agent workflow. We loved the core idea — one worktree, one tmux session, one agent per task — and wanted to bring it to a web interface with richer visuals, embedded terminals, and integrated PR/CI monitoring.

<!--truncate-->

## Why a web UI

Workmux gets the fundamentals right. Each task gets an isolated git worktree, a dedicated tmux session, automatic lifecycle management, and optional sandboxing. It's a great tool if you live in the terminal.

But as the number of parallel agents grew, we kept running into the same friction points:

- **Switching context** between tmux windows to check agent progress.
- **Opening GitHub** in a separate tab to see if a PR was opened, if CI passed, if there were review comments.
- **Checking service health** manually — did the dev server in worktree #3 crash again?
- **Losing track** of which agent was doing what across 5+ concurrent worktrees.

Webmux solves this by putting everything in one browser tab: live terminals, PR status, CI results, service health, and notifications.

## How it works

### One-click worktree creation

Pick a profile, name a branch, write a prompt. Webmux handles the rest:

1. Creates a git worktree.
2. Allocates ports for dev servers (backend, frontend, etc.).
3. Spins up a tmux session with the configured pane layout.
4. Starts the AI agent (Claude, Codex, or others) with the prompt and environment variables.
5. Runs any `postCreate` lifecycle hook (install dependencies, seed data, etc.).

All of this is driven by a single `.webmux.yaml` config file at the root of your project:

```yaml
services:
  - name: BE
    portEnv: BACKEND_PORT
    portStart: 5111
    portStep: 10
  - name: FE
    portEnv: PORT
    portStart: 5112
    portStep: 10

profiles:
  full:
    runtime: host
    panes:
      - id: agent
        kind: agent
        focus: true
      - id: backend
        kind: command
        split: right
        command: cd backend && bun install && bun run dev
      - id: frontend
        kind: command
        split: bottom
        command: cd frontend && bun install && bun run dev
  sandbox:
    runtime: docker
    image: workmux-sandbox
    panes:
      - id: agent
        kind: agent
        focus: true
```

Profiles let you define different setups. The `full` profile runs everything on the host with three panes (agent + backend + frontend). The `sandbox` profile runs the agent inside a Docker container for isolation — useful when you want to give an agent more autonomy without risking your host environment.

### Live terminals in the browser

Each worktree gets an embedded terminal rendered with xterm.js, streaming output over WebSocket in real time. You watch the agent write code, run tests, and iterate — without opening tmux. You can also type into the terminal directly from the browser.

Switching between panes (agent, backend, frontend) is a single click. Scrollback is preserved (up to 1 MB per worktree), so you can scroll through the agent's full session history.

### PR and CI monitoring

Webmux polls GitHub via the `gh` CLI to track PRs for each worktree's branch. When an agent opens a PR, you see it immediately in the dashboard with:

- PR state (open, merged, closed).
- CI check status and details — click through to see failed test logs.
- Review comments displayed inline, so you can read code review feedback without leaving the dashboard.

Results are cached with ETags to avoid hitting GitHub's rate limits.

### Service health

Each worktree can define services with allocated ports. Webmux periodically health-checks these ports and displays badges: green if the dev server is up, red if it crashed. At a glance, you know which worktrees have healthy environments and which need attention.

## Architecture

The stack is intentionally simple:

- **Backend**: A single [Bun](https://bun.sh/) server that orchestrates git, tmux, Docker, and the GitHub CLI. Clean adapter/service/domain layering — adapters handle I/O (git commands, tmux sessions, Docker containers), services implement business logic (lifecycle management, PR monitoring, reconciliation), and the domain layer holds pure types and policies.
- **Frontend**: [Svelte 5](https://svelte.dev/) with xterm.js for terminal rendering.
- **State**: A reconciliation service periodically scans git worktrees and tmux sessions, syncing the in-memory state with reality. If you delete a worktree from the command line, the dashboard reflects it on the next poll.

No database. No external services beyond GitHub. The entire state is derived from git and tmux.

## How we use it at Windmill

Every engineer at Windmill uses Webmux daily. A typical workflow:

1. Open the dashboard, create 3-5 worktrees for different tasks.
2. Each worktree gets a `full` profile: agent pane + backend dev server + frontend dev server, all on auto-allocated ports.
3. Write a prompt describing the task, hit create. The agent starts working.
4. Monitor progress across all agents from a single tab. When an agent opens a PR, review the CI status and comments inline.
5. For experimental or potentially destructive work, use the `sandbox` profile — the agent runs in a Docker container with only the environment variables it needs.
6. When a task is done, merge and delete the worktree. Lifecycle hooks handle cleanup.

We also integrate with [Linear](https://linear.app/) for issue tracking. Webmux can list your assigned issues and auto-generate branch names from them, closing the loop from issue to worktree to PR.

## Credit where it's due

Webmux would not exist without [workmux](https://workmux.raine.dev/). The core insight — that git worktrees are the natural isolation boundary for parallel AI agents, and that tmux is the right abstraction for managing their terminal sessions — comes directly from workmux. We added a web layer on top, but the foundation is theirs.

If you prefer a terminal-first workflow, use workmux. If you want a browser dashboard with embedded terminals and GitHub integration, give Webmux a try.
