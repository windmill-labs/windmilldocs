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

## Remote path format

```js
<u|g|f>/<username|group|folder>/...
```
