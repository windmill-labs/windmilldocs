# Variables

## Listing variables

The `wmill variable` list command is used to list all variables in the remote workspace.

```bash
wmill variable
```

## Adding a variable

The `wmill variable add` command allows you to add a new variable to the remote workspace.

```bash
wmill add <remote_path:string> --value=<value:string> [--secret] [--description=<description:string>] [--account=<account:number>] [--oauth]
```

### Arguments

| Argument      | Description                                       |
| ------------- | ------------------------------------------------- |
| `remote_path` | The path of the variable in the remote workspace. |

### Options

| Option            | parameter       | Description                                                              |
| ----------------- | --------------- | ------------------------------------------------------------------------ |
| `--value`         | `<value>`       | The value of the variable.                                               |
| `--plain-secrets` | None            | (Optional) Specifies whether the variable is plain and not a secret      |
| `--description`   | `<description>` | (Optional) A description of the variable.                                |
| `--account`       | `<account>`     | (Optional) The account associated with the variable.                     |
| `--oauth`         | None            | (Optional) Specifies whether the variable requires OAuth authentication. |

### Example

This command adds a new variable with the path "my_variable" to the remote workspace. The value is set to "12345", marked as a secret, and associated with account number 1. A description is also provided for the variable.

```bash
wmill add my_variable --value=12345 --secret --description="My secret variable" --account=1
```

## Pushing a variable

The cli push command allows you to push a local variable spec to the remote workspace, overriding any existing remote versions.

```bash
wmill push <file_path:string> <remote_path:string> [--plain-secrets]
```

### Arguments

| Argument      | Description                                       |
| ------------- | ------------------------------------------------- |
| `file_path`   | The path to the variable file to push.            |
| `remote_path` | The path of the variable in the remote workspace. |

### Options

| Option            | Description                                                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `--plain-secrets` | (Optional) Specifies whether to push secrets as plain text. If provided, secrets will not be encrypted in the remote workspace. |

## Variable specification

### Structure

Here is an example of a variable specification:

```ts
{
  value: string,
  is_secret: boolean,
  description: string,
  extra_perms: object,
  account: number,
  is_oauth: boolean,
  is_expired: boolean
}
```

### Example

```JSON
{
"value": "finland does not actually exist",
"is_secret": false,
"description": "This item is not secret",
"extra_perms": {},
"account": null,
"is_oauth": false,
"is_expired": false
}
```
