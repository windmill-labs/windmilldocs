---
title: CLI Syncing
---

# Syncing

:::caution

This page is currently WIP and is being updated.

:::

Syncronizing folders & git repositories to a Windmill instance is made easy
using the wmill CLI. Syncing operations are behind the `wmill sync` subcommand.

## Example Repos

We provide an example repo for syncing with Windmill:

- Syncing with a remote:
  [windmill-sync-example](https://github.com/windmill-labs/windmill-sync-example)

## Raw Syncing

Raw syncing is a one-off operation with no state maintained. It's best used for
making backups, cloning a complete workspace, and similar one-off operations.

Raw syncing is done using `wmill sync pull --raw` & `wmill sync push --raw`

### Pulling

`wmill sync pull --raw` will simply pull all files from the currently
[selected workspace](./workspace-management.md#selected-workspace) and store
them in the current folder. Overwrites will not prompt the user. Make sure you
are in the correct folder or you may loose data.

### Pushing

`wmill sync push --raw` will simply push all local files to the currently
[selected workspace](./workspace-management.md#selected-workspace), creating or
updating the remote equivalents.

### Operation

## Stateful Syncing

Stateful syncing is best used when you want to continuously syncronize a folder
or git(hub) repository with a windmill instance. The CLI will automatically
maintain state for you and ensure modifications that happen concurrently on the
remote and locally stay in sync.

### Pulling

Pulling with `wmill sync pull` will first update the internal state, and then
generate a diff between your local files and this state, only updating the
actually modified files. Possible conflicts will warn the user.

### Pushing

Pushing with `wmill sync push` will push all local files to the remote and then update the internal state to avoid being out-of-sync due to the push.
Using `sync push` without `--skip-pull` will start the push by doing a pull first to ensure the user is not
overriding changes made to the remote.
