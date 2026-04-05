---
description: How do I preview scripts and flows locally using the Windmill CLI?
---

# Dev & Preview

The CLI can run scripts and flows against a remote workspace without deploying them, which is useful for iterating on local files, validating codebase scripts, or testing flow changes with local inline script modifications.

## `wmill script preview`

Preview a local script file against the remote workspace. Supports both regular scripts and [codebase](../../core_concepts/33_codebases_and_bundles/index.mdx) scripts (which are bundled before running).

```bash
wmill script preview <path> [options]
```

### Options

| Option             | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `-d, --data <data>`| Inputs as a JSON string, `@filename`, or `@-` for stdin.          |
| `-s, --silent`     | Only output the final result (no logs, useful for scripting).     |

### Examples

```bash
# Regular script
wmill script preview u/admin/my_script.ts --data '{"x": 5}'

# Codebase script (bundled before preview)
wmill script preview f/codebase_test/my_script.ts --data '{"x": 7}'

# Silent mode for piping
wmill script preview f/scripts/hello.ts -d '{"n":3}' --silent | jq
```

## `wmill flow preview`

Preview a local flow against the remote workspace. The flow definition is read from the local `.flow` / `__flow` folder — any changes to inline scripts are picked up without deploying.

```bash
wmill flow preview <path> [options]
```

### Options

Same `-d, --data` and `-s, --silent` options as `script preview`.

### Example

```bash
wmill flow preview f/my_flows/etl__flow --data '{"date":"2026-01-01"}'
```

## `wmill flow dev`

`wmill flow dev` starts a local dev loop for a flow: it watches the flow's local files, and on each change pushes the flow so you can test it interactively from the Windmill UI with fast feedback.

```bash
wmill flow dev <path>
```

Run `wmill flow dev --help` to see the full set of flags. Use this when iterating on flow YAML / inline scripts and testing via the UI; use `wmill flow preview` when you want a one-shot run with a specific payload.
