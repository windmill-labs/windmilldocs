# Scripts

## Listing scripts

The `wmill script` list command is used to list all scripts in the remote workspace.

```bash
wmill script
```

## Pushing a script

The wmill script push command is used to push a local script to the remote server, overriding any existing remote versions of the script. This command allows you to manage and synchronize your scripts across different environments.

This command support .ts, .js, .py, .go and .sh files.

```bash
wmill script push <path>
```

### Arguments

| Argument | Description                                                |
| -------- | ---------------------------------------------------------- |
| `path`   | The path to the local script file that needs to be pushed. |

### Examples

1. Push the script located at `/path/to/script.js`

```bash
wmill script push /path/to/script.js
```

## Showing a script

The wmill script show command is used to show the contents of a script on the remote server.

```bash
wmill script show <path>
```

### Arguments

| Argument | Description                                                |
| -------- | ---------------------------------------------------------- |
| `path`   | The path to the remote script file that needs to be shown. |

### Examples

1. Show the script located at `f/scripts/test`

```bash
wmill script show f/scripts/test
```

## Running a script

Running a script by its path s done using the `wmill script run` command.

```bash
wmill script run <remote_path> [options]
```

### Arguments

| Argument      | Description                       |
| ------------- | --------------------------------- |
| `remote_path` | The path of the script to be run. |

### Options

| Option         | Parameters | Description                                                                   |
| -------------- | ---------- | ----------------------------------------------------------------------------- |
| `-d, --data`   | `data`     | Inputs specified as a JSON string or a file using @filename or stdin using @- |
| `-s, --silent` |            | Do not ouput anything other then the final output. Useful for scripting.      |

## Remote path format

```js
<u|g|f>/<username|group|folder>/...
```
