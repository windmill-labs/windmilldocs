---
title: Developing scripts locally
---

# Developing scripts locally

## Deno

Windmill deno scripts can be run like normal deno scripts. To add testing or
debugging code, add this snippet to your file:

```ts
if (import.meta.main) {
	// Add your testing & debugging code here.
}
```

You can then use your script like normal (for example,
`deno run -A --watch my_script.ts`), and even write tests inside.

If you'd like to tweak the client settings more directly, use:

```ts
wmill.setClient(<TOKEN>, <API BASE URL>)
```

On import, the wmill client does the following:

```ts
setClient(
	Deno.env.get('WM_TOKEN') ?? 'no_token',
	Deno.env.get('BASE_INTERNAL_URL') ?? Deno.env.get('BASE_URL') ?? 'http://localhost:8000'
);
```

which is why we recommend setting those environment variables in the sections below.

For more information on deno development in general,
[see the official docs](https://deno.land/manual@v1.30.3/getting_started)

## Python

Windmill python scripts can be run like normal python scripts. To add testing or
debbug code, add this snippet to your file:

```py
if __name__ == 'main':
    # Add your testing & debugging code here.
    pass
```

You can then run your script: `python -m f/folder/my_script` and even write tests inside.

For more information on python development in general,
[see the official docs](https://www.python.org/doc/)

## Interacting with Windmill locally

Often you will need to test a script locally that also interacts with windmill.
For example to retrieve resources.

To do so you will need to fill out the context variables that will otherwise be
filled out by the windmill runtime for you. The most important ones are
`WM_TOKEN`, `WM_WORKSPACE` and `BASE_INTERNAL_URL`. Set `BASE_INTERNAL_URL` to the URL of you windmill instance,
for example `https://app.windmill.dev`, note that you can never include a
trailing `/`, or the client will fail to connect. Then set `WM_TOKEN` to a
token, either create this in the UI, or use [wmill, the CLI](../3_cli/index.md)
using `wmill user create-token`. And then `WM_WORKSPACE` corresponds to your workspace id.
Below are some examples on how to do this in various environments.

### State

to use the `getState` and `setState` functions, you will have to set `WM_STATE_PATH`. We recommend using your script path name as the state path, for example:

```ts
let fullUrl = import.meta.url;
let pathS = fullUrl.substring(8, fullUrl.length - 3).split('/');
const path = pathS.slice(pathS.length - 3, pathS.length).join('/');
Deno.env.set('WM_STATE_PATH', path);
```

### Terminal

On UNIX platforms you can simply do
`BASE_INTERNAL_URL=https://app.windmill.dev WM_TOKEN=ThisIsAToken deno run -A my_script.ts`
with the relevant info provided, the same will work for python.

On windows this is not possible, you will have to use
[set](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/set_1).
For example:

```cmd
set "BASE_INTERNAL_URL=https://app.windmill.dev"
set "WM_TOKEN=ThisIsAToken"
set "WM_WORKSPACE=workspace_id"
```

then simply run the relevant command for your language.

### VSCode

The easiest way to do this is using a launch.json. See how to create one for
[python](https://code.visualstudio.com/docs/python/debugging) and
[deno](https://deno.land/manual@v1.9.2/getting_started/debugging_your_code#vscode)

Then add environment files using the "env" section in your configuration.

:::caution

Make sure you are not checking your Token into git.

To easily manage your secrets it may be easier to use a .env file, and add it to
.gitignore, this is also done below.

:::

For example, for deno:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Deno",
      "type": "pwa-node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "deno",
      "runtimeArgs": ["run", "--inspect-brk", "-A", "${file}"],
      "env" {
        "BASE_INTERNAL_URL": "https://app.windmill.dev",
        "WM_TOKEN": "ThisIsAToken",
        "WM_WORKSPACE": "workspace_id"
      },
      "envFile": ".env"
    }
  ]
}
```

The same `env` & `envFile` options are also supported by python.

### JetBrains IDEs

Especially for python you may prefer using a JetBrains IDE. Simply navigate to
your
[run config](https://www.jetbrains.com/help/idea/run-debug-configuration-python.html#1)
and add two lines

```
BASE_INTERNAL_URL = https://app.windmill.dev
WM_TOKEN = ThisIsAToken
WM_WORKSPACE= workspace_id
```

:::caution

Make sure you are not checking your Token into git.

:::

## Pushing your scripts to Windmill

Once you are done developing your script, you can push it to Windmill using the CLI!

Be sure to add wmill to your path after installing.

```
deno install --unstable -A https://deno.land/x/wmill/main.ts
wmill workspace add
wmill sync push
```
