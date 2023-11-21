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
