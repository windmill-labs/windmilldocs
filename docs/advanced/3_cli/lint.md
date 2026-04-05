---
description: How do I lint and validate Windmill YAML files using the Windmill CLI?
---

# Lint

The `wmill lint` command validates Windmill YAML files (flows, schedules, and triggers) against their schemas. It scans a directory tree, infers each file's type from its filename (`.flow.yaml`, `.schedule.yaml`, `.http_trigger.yaml`, etc.), and reports missing required fields, unknown properties, or invalid values.

## Usage

```bash
wmill lint [directory] [options]
```

If no directory is provided, the current directory is used. The command respects the `includes`/`excludes` patterns from your `wmill.yaml`.

## Options

| Option              | Description                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------ |
| `--json`            | Output machine-readable JSON instead of formatted text.                                          |
| `--fail-on-warn`    | Exit non-zero on warnings (e.g. skipped native triggers).                                        |
| `--locks-required`  | Fail if any script or inline script that needs a lock is missing one.                            |

Native triggers (triggers whose schema depends on a dynamic `service_config`) are skipped with a warning — no static schema is available for them.

## Examples

Lint every YAML file under the current directory:

```bash
wmill lint
```

Lint a specific folder and emit JSON for CI tooling:

```bash
wmill lint f/my_project --json
```

Fail the build if any script/flow/app inline script is missing its lockfile:

```bash
wmill lint --locks-required
```

## `--locks-required`

`--locks-required` checks standalone scripts, flow inline scripts, normal app inline scripts, and raw app backend scripts. It applies to languages that need a lock: `bun`, `python3`, `php`, `go`, `deno`, `rust`, and `ansible`.

The flag can also be enabled globally in `wmill.yaml`:

```yaml
locksRequired: true
```

When set, `wmill sync push` runs the same verification before pushing, failing fast if anything is missing.

## CI integration

A typical GitHub Actions step:

```yaml
- name: Validate Windmill YAML files
  run: |
    npm install -g windmill-cli
    wmill lint --fail-on-warn --locks-required
```

Pair `wmill lint` with [`wmill generate-metadata`](./generate-metadata.md) to (re)generate any missing lockfiles before linting.
