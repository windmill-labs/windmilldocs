---
description: How do I manage folders using the Windmill CLI?
---

# Folder

## Listing folders

The `wmill folder` list command is used to list all folders in the remote workspace.

```bash
wmill folder
```

## Push

The `wmill folder push` command is used to push a local folder specification to a remote location, overriding any existing remote versions.

```bash
wmill folder push <folder_path:string> <remote_path:string>
```

### Arguments

| Argument      | Description                                                      |
| ------------- | ---------------------------------------------------------------- |
| `folder_path` | The path to the local folder.                                    |
| `remote_path` | The path to the remote location where the folder will be pushed. |

## Adding missing folders

When you create scripts, flows, or apps under `f/<folder>/` without a corresponding `f/<folder>/folder.meta.yaml` file, `wmill sync push` will either warn (admins) or fail (non-admins, due to RLS) because the remote folder does not exist.

The `wmill folder add-missing` command scans every `f/<folder>/` subdirectory and creates a default `folder.meta.yaml` for any that are missing one.

```bash
wmill folder add-missing [-y]
```

### Options

| Option | Description                        |
| ------ | ---------------------------------- |
| `-y`   | Skip the confirmation prompt.      |

### Example

```bash
# Dry scan, then create the missing files after confirmation
wmill folder add-missing

# Non-interactive (useful in scripts)
wmill folder add-missing -y
```

`wmill sync push` runs the same detection automatically and suggests `wmill folder add-missing` when folders are missing.

## Stale script detection

`wmill generate-metadata` builds a dependency tree across scripts, flows, apps, and [workspace dependencies](../../core_concepts/55_workspace_dependencies/index.mdx), then propagates staleness along that graph. This means if script `C` changes, any scripts `A` and `B` that transitively import `C` (including via relative imports like `./helper` or `../shared/utils`) are correctly detected as stale and regenerated.

When you run `wmill generate-metadata f/lib`, scripts **outside** `f/lib` that import from it are included in the run by default. Use `--strict-folder-boundaries` to restrict the run to items physically inside the folder — excluded items that would otherwise have been regenerated are printed as warnings.

See [`wmill generate-metadata`](./generate-metadata.md) for the full option list.
