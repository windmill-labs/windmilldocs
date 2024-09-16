# Users management

## Adding a user

The `wmill user add` command is used to add a new user to the remote server.

```bash
wmill user add <email:string> [password:string] [--superadmin] [--company <company:string>] [--name <name:string>]
```

### Arguments

| Argument   | Description                                    |
| ---------- | ---------------------------------------------- |
| `email`    | The email address of the user to be added.     |
| `password` | The password of the user to be added. Optional |

### Options

| Option         | Parameters | Description                                 |
| -------------- | ---------- | ------------------------------------------- |
| `--superadmin` |            | Specify to make the new user superadmin.    |
| `--company`    | `company`  | Specify to set the company of the new user. |
| `--name`       | `name`     | Specify to set the company of the new user. |

### Examples

1. Create a new user with the email "example@example.com" and automatically generate a password:

```bash
wmill user add example@example.com
```

2. Create a new user with the email "example@example.com" and specify a password:

```bash
wmill user add example@example.com mypassword123
```

3. Create a new superadmin user with the email "example@example.com", a specified password, and additional information:

```bash
wmill user add example@example.com mypassword123 --superadmin --company "Acme Inc." --name "John Doe"
```

## Removing a user

The `wmill user remove` command is used to remove a user from the remote server.

```bash
wmill user remove <email:string>
```

### Arguments

| Argument | Description                                  |
| -------- | -------------------------------------------- |
| `email`  | The email address of the user to be removed. |

### Examples

1. Remove the user with the email "example@example.com"

```bash
wmill user remove example@example.com
```

## Creating a token

The wmill user create-token command allows you to create an authentication token for a user. This token can be used for subsequent authenticated requests to the API server.

```bash
wmill user create-token [--email <email:string> --password <password:string>]
```

There are two ways to create a token:

- Option 1: Specify email and password for authentication:
  Use the --email option to specify the email address of the user.
  Use the --password option to specify the password of the user.
  The command will exchange the provided credentials for a token with the API server and display the generated token.

- Option 2: Already logged in:
  If you are already logged in, you can run the command without providing email and password.
  The command will use your existing authentication credentials to create a token and display it.

The command will display the generated token, which can be used for subsequent authenticated requests. Note that the token is not stored locally.
