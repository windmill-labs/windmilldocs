---
title: CLI Workspace Management
---

# Workspace Management

The wmill CLI is capable of handling working with many remotes & workspaces.
Each combination of remote & workspace is registered with together with a name
locally using `wmill workspace add`.

## List workspaces

`wmill workspace` will print a table of all the locally known workspaces, the
currently [selected workspace](#selected-workspace) is <ins>underlined</ins>.

## Adding a workspace

Either use the dialog using just `wmill workspace add`, or use
`wmill workspace add <name> <workspace_id> <remote_url>` or even provide a token
using `--token` to entirely skip the dialogue.

The new workspace will automatically be [switched](#switching-selection) to

## Selected Workspace

The currently selected workspace will be used for all operations. This workspace
is <ins>underlined</ins> in the [list of workspaces](#list-workspaces).

### Switching Selection

`wmill workspace switch <name>` can be used to switch the currently selected
workspace.

## Removing a workspace

`wmill remove <name>` can be used to delete a workspace from the list of
workspaces.
