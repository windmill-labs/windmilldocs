---
slug: cli-workspaces-unification
title: Unified wmill.yaml workspaces config
tags: ['wmill CLI', 'Local development']
description: The CLI now uses a single `workspaces` key in `wmill.yaml` instead of `gitBranches`, `environments`, and `git_branches`. Workspace names are human-friendly, `gitBranch` and `workspaceId` default to the key name, and a new `--workspace` flag selects the target. Legacy configs still work — run `wmill config migrate` to convert.
features:
  [
    'Single `workspaces:` key replaces `gitBranches`, `environments`, and `git_branches` in `wmill.yaml`',
    'Workspace names are human-friendly identifiers — `gitBranch` and `workspaceId` default to the key when omitted',
    'New `--workspace` global flag resolves config → profile automatically via `baseUrl` + `workspaceId` matching',
    '`wmill config migrate` auto-converts legacy configs to the new format in one command',
    '`wmill workspace bind` / `unbind` interactively create and remove `workspaces:` entries from the active profile',
    '`wmill init` revamped: interactive workspace setup from existing profiles',
    'Fully backward compatible: old `gitBranches`/`environments`/`git_branches` configs keep working with a one-time deprecation warning',
  ]
docs: /docs/advanced/cli/sync#workspaces
---
