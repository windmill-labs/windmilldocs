---
description: How do I generate metadata and lockfiles for scripts, flows and apps using the Windmill CLI?
---

# Generate metadata

The `wmill generate-metadata` command generates metadata (locks, schemas) for all scripts, flows and apps. It replaces the previous separate commands (`wmill script generate-metadata`, `wmill flow generate-locks`, `wmill app generate-locks`).

## Usage

```bash
wmill generate-metadata [folder] [options]
```

## Options

| Option | Description |
| ------ | ----------- |
| `--yes` | Skip confirmation prompt |
| `--dry-run` | Show what would be updated without making changes |
| `--lock-only` | Regenerate only lock files |
| `--schema-only` | Regenerate only script schemas (skips flows and apps) |
| `--skip-scripts` | Skip processing scripts |
| `--skip-flows` | Skip processing flows |
| `--skip-apps` | Skip processing apps |
| `--strict-folder-boundaries` | Only update items inside the specified folder (requires folder argument) |
| `-i, --includes <patterns>` | Comma-separated patterns to specify which files to include |
| `-e, --excludes <patterns>` | Comma-separated patterns to specify which files to exclude |

## Arguments

| Argument | Description |
| -------- | ----------- |
| `folder` | Optional folder path to filter metadata generation |

## Examples

### Generate metadata for entire workspace

```bash
wmill generate-metadata
```

### Preview changes without applying

```bash
wmill generate-metadata --dry-run
```

### Auto-confirm all updates

```bash
wmill generate-metadata --yes
```

### Generate only for a specific folder

```bash
wmill generate-metadata f/my_folder
```

### Strict folder boundaries

```bash
wmill generate-metadata f/my_folder --strict-folder-boundaries
```

### Only update lockfiles

```bash
wmill generate-metadata --lock-only
```

### Only update schemas

```bash
wmill generate-metadata --schema-only
```

### Include specific patterns

```bash
wmill generate-metadata -i "f/production/*,f/shared/*"
```

### Exclude specific patterns

```bash
wmill generate-metadata -e "f/test/*,f/drafts/*"
```

## Migration from legacy commands

The following commands are now deprecated:

| Deprecated command | Replacement |
| ------------------ | ----------- |
| `wmill script generate-metadata` | `wmill generate-metadata --skip-flows --skip-apps` |
| `wmill flow generate-locks` | `wmill generate-metadata --skip-scripts --skip-apps` |
| `wmill app generate-locks` | `wmill generate-metadata --skip-scripts --skip-flows` |

The legacy commands will show deprecation warnings but continue to work.

For centralized dependency management, see [workspace dependencies](../../core_concepts/55_workspace_dependencies/index.mdx).
