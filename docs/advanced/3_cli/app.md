---
description: How do I list and push apps using the Windmill CLI?
---

import DocCard from '@site/src/components/DocCard';

# Apps

## Listing apps

The `wmill app` list command is used to list all apps in the remote workspace.

```bash
wmill app
```

## Pushing an app

Pushing an app to a Windmill instance is done using the `wmill app push` command.

```bash
wmill app push <file_path>
```

### Arguments

| Argument    | Description                       |
| ----------- | --------------------------------- |
| `file_path` | The path to the app file to push. |

### Examples

1. Push the app located at `./my_app.json`.

```bash
wmill app push ./my_app.json
```

## Full-code app commands

The CLI provides additional commands for [full-code apps](/docs/full_code_apps):

### Create a new full-code app

```bash
wmill app new
```

Interactive wizard to scaffold a full-code app with React, Svelte or Vue.

### Start the dev server

```bash
wmill app dev [path_to_app_folder]
```

Starts a local development server with hot reload and WebSocket backend. Options: `--port`, `--host`, `--entry`, `--no-open`.

### Generate lock files

```bash
wmill app generate-locks
```

Generates `.lock` files for backend runnables with dependencies. Options: `--yes`, `--dry-run`, `--default-ts`.

### Generate agent documentation

```bash
wmill app generate-agents [path_to_app_folder]
```

Generates `AGENTS.md` and `DATATABLES.md` for AI coding agent context.

<div className="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Full-code app CLI workflow"
		description="Complete guide to developing full-code apps with the CLI."
		href="/docs/full_code_apps/cli_workflow"
		color="orange"
	/>
</div>

## Remote path format

```js
<u|g|f>/<username|group|folder>/...
```
