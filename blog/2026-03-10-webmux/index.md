---
slug: webmux
authors: [farhadgoulamabasse]
tags: ['ai', 'developer-tools', 'open-source', 'agents']
description: 'Webmux is the web dashboard every engineer at Windmill uses to run parallel AI coding agents across git worktrees.'
title: 'Webmux: a web dashboard for parallel AI coding agents'
---

# Webmux: a web dashboard for parallel AI coding agents

Every engineer at Windmill runs multiple AI coding agents in parallel throughout the day. An agent implementing a new API endpoint, another fixing a frontend bug, a third refactoring a service — each in its own git worktree, each with its own dev servers, each producing PRs that need monitoring. Managing all of this across scattered terminal windows and browser tabs was painful.

So I built [**Webmux**](https://webmux.dev/), an open-source web dashboard that lets you create, monitor, and manage parallel AI agents from a single browser tab. It is directly inspired by [workmux](https://workmux.raine.dev/), the excellent terminal-first CLI tool by [Raine](https://github.com/raine). We loved the core idea, one worktree, one tmux session, one agent per task. We wanted to bring it to a web interface with richer visuals, embedded terminals, and integrated PR/CI monitoring.

Webmux is open source, check it out on [GitHub](https://github.com/windmill-labs/webmux) or visit [webmux.dev](https://webmux.dev/) to get started.

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

![Create and manage worktrees](https://github.com/user-attachments/assets/7f084d27-448c-47e4-aadf-8ab25154c096)

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

![PR, CI and comments](https://github.com/user-attachments/assets/395f8471-f9ff-412a-87e2-1347bfadb387)

- PR state (open, merged, closed).
- CI check status and details — click through to see failed test logs.
- Review comments displayed inline, so you can read code review feedback without leaving the dashboard.

### Service health

Each worktree can define services with allocated ports. Webmux periodically health-checks these ports and displays badges: green if the dev server is up, red if it crashed. At a glance, you know which worktrees have healthy environments and which need attention.

![Service health monitoring](https://github.com/user-attachments/assets/b2cf535a-0242-4c15-bdb9-344dfde5f75e)

### Linear integration

We use [Linear](https://linear.app/) for issue tracking at Windmill, and Webmux brings it right into the dashboard. Your assigned issues show up in a collapsible sidebar panel — browse your backlog, search by title, preview the full issue details, and hit **Implement** to spin up a worktree for it in one click. The branch name is derived from the Linear issue automatically, so everything stays consistent from issue to branch to PR.

![Linear integration](https://github.com/user-attachments/assets/3187fbe2-eeee-4a33-8780-c51c3575b72a)

## Architecture

The stack is intentionally simple:

- **Backend**: A single [Bun](https://bun.sh/) server that orchestrates git, tmux, Docker, and the GitHub CLI. Clean adapter/service/domain layering — adapters handle I/O (git commands, tmux sessions, Docker containers), services implement business logic (lifecycle management, PR monitoring, reconciliation), and the domain layer holds pure types and policies.
- **Frontend**: [Svelte 5](https://svelte.dev/) with xterm.js for terminal rendering.

No database. The only external services are GitHub (for PRs and CI) and optionally Linear (for issue tracking). The entire state is derived from git and tmux.

## How we use it at Windmill

Every engineer at Windmill uses Webmux daily. A typical session involves 3-5 worktrees running in parallel — each with its own agent, dev servers, and allocated ports. Pick issues from the Linear sidebar, let agents work, monitor PRs and CI inline, merge when ready, delete the worktree. The entire cycle from issue to merged PR happens in one tab.

Webmux is open source — check it out on [GitHub](https://github.com/windmill-labs/webmux) or visit [webmux.dev](https://webmux.dev/) to get started.