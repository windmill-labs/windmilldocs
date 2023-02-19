---
title: CLI Syncing
---

# Syncing

Syncronizing folders & git repositories to a windmill instance is made easy
using the wmill CLI. Syncing operations are behind the `wmill sync` subcommand.

## Example Repos

We provide example repos for various use cases:

- Mirroring/Backup of a remote:
  [windmill-backup-example](https://github.com/windmill-labs/windmill-backup-example)
- Pushing to a remote only:
  [windmill-push-example](https://github.com/windmill-labs/windmill-push-example)
- Syncing with a remote:
  [windmill-backup-example](https://github.com/windmill-labs/windmill-sync-example)

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

### Initializing

To get started, run `wmill sync init` this will initialize the current folder
with a `.wmill` folder, where internal state will be stored, and a
`.wmillignore`, which you can use to ignore some files.

:::caution

`wmill sync init` will store the
[selected workspace](./workspace-management.md#selected-workspace) as part of
the state. Make sure to select the correct workspace.

:::

### Pulling

Pulling with `wmill sync pull` will first update the internal state, and then
generate a diff between your local files and this state, only updating the
actually modified files. Possible conflicts will warn the user.

### Pushing

Pushing with `wmill sync push` will first update the internal state, and then
generate a diff between your local files and this state, only sending the
relevant local updates to the remote server.

:::tip

Run `wmill sync pull` right after `push` if you intend to keep updating the
folder. This will ensure your folder stays in sync.

:::
