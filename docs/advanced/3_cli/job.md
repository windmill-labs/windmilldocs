---
description: How do I list, inspect and debug jobs using the Windmill CLI?
---

# Jobs

The `wmill job` commands let you list, inspect, and manage jobs from the CLI. For flow jobs, `job get` shows a hierarchical step tree and `job logs` aggregates logs from all steps.

## Listing jobs

List recent jobs in the workspace.

```bash
wmill job list [options]
```

### Options

| Option              | Parameters    | Description                                                                 |
| ------------------- | ------------- | --------------------------------------------------------------------------- |
| `--json`            |               | Output as JSON (for piping to jq).                                          |
| `--script-path`     | `path`        | Filter by exact script or flow path.                                        |
| `--created-by`      | `username`    | Filter by creator username.                                                 |
| `--running`         |               | Show only running jobs.                                                     |
| `--failed`          |               | Show only failed jobs.                                                      |
| `--limit`           | `number`      | Number of jobs to return (default 30, max 100).                             |
| `--all`             |               | Include sub-jobs (flow steps). By default only top-level jobs are shown.    |
| `--parent`          | `id`          | Show only sub-jobs of a specific flow job.                                  |
| `--is-flow-step`    |               | Show only flow step jobs.                                                   |

### Examples

1. List recent failed jobs:

```bash
wmill job list --failed
```

2. List jobs for a specific flow:

```bash
wmill job list --script-path f/production/etl_pipeline
```

3. List sub-jobs of a flow run:

```bash
wmill job list --parent 019d447b-114f-a018-0b72-9e541fb77c02
```

## Getting job details

Get details about a specific job. For flow jobs, this displays a hierarchical step tree showing each module's status, label, duration, and sub-job ID.

```bash
wmill job get <id> [options]
```

### Options

| Option   | Description                      |
| -------- | -------------------------------- |
| `--json` | Output as JSON (for piping to jq). |

### Example

```bash
wmill job get 019d447b-114f-a018-0b72-9e541fb77c02
```

For a flow job, the output includes a step tree:

```
ID:       019d447b-114f-a018-0b72-9e541fb77c02
Type:     flow
Status:   success
...

Steps:
  ✓ a: Generate list    (019d447b-2a3f-...)  1.2s
  ✓ b: Process items    (019d447b-3b4c-...)  3.4s
    ✓ iteration 0       (019d447b-4c5d-...)  1.1s
    ✓ iteration 1       (019d447b-5d6e-...)  1.2s
    ✓ iteration 2       (019d447b-6e7f-...)  1.1s
  ✓ c: Aggregate        (019d447b-7f80-...)  0.8s
```

## Getting job results

Get the result of a completed job as JSON. Useful for scripting and piping to other commands.

```bash
wmill job result <id>
```

## Getting job logs

Get logs for a job. For flow jobs, this aggregates logs from all steps with labeled headers. For-loop iterations are shown individually.

```bash
wmill job logs <id>
```

### Example

For a flow job:

```bash
wmill job logs 019d447b-114f-a018-0b72-9e541fb77c02
```

```
====== a: Generate list ======
generating 3 items...

====== b: Process items (iteration 0) ======
processing item 1...

====== b: Process items (iteration 1) ======
processing item 2...

====== c: Aggregate ======
aggregating results...
```

For a specific step, use the sub-job ID from `job get`:

```bash
wmill job logs 019d447b-2a3f-...
```

## Cancelling a job

Cancel a running or queued job.

```bash
wmill job cancel <id> [options]
```

### Options

| Option     | Parameters | Description              |
| ---------- | ---------- | ------------------------ |
| `--reason` | `reason`   | Reason for cancellation. |

## Flow debugging workflow

A typical workflow for debugging a failed flow run:

```bash
# 1. Find the flow job
wmill job list --script-path f/production/etl_pipeline --failed

# 2. Inspect the step tree to see which step failed
wmill job get <flow-job-id>

# 3. See all step logs at once
wmill job logs <flow-job-id>

# 4. Or dive into a specific step's logs
wmill job logs <step-job-id>
```
