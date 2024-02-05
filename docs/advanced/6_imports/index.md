# Dependency Management & Imports

Windmill's strength lies in its ability to run scripts without having to deal with separate dependency files. This is achieved by automatically parsing the imports and resolving the dependencies.

Windmill generates a lockfile to ensure that the same version of a script is always executed with the same versions of its dependencies. If no version is specified, the latest version is used. Windmill's workers cache dependencies to ensure fast performance without the need to pre-package dependencies - most jobs take under 100ms end-to-end.

On the [enterprise edition](/pricing), Windmill's caches can be configured to sync their cache with a central s3 repository to distribute the cache across multiple workers as soon as a new dependency is used for the first time.

:::info

To import other scripts from your workspace, see [Sharing common logic](../5_sharing_common_logic/index.md).

:::

## Imports in Typescript

There are two options for runtimes in TypeScript:

- [Deno](#deno)
- [Bun](#bun) (compatible 1:1 with Node.js)

### Deno

The dependencies and their versions are contained in the script and hence there is no need for any additional steps. The resolution is done by [deno](https://deno.com/runtime).

e.g:

```ts
import { toWords } from 'npm:number-to-words@1';
import * as wmill from 'https://deno.land/x/windmill@v1.84.1/mod.ts';
```

### Bun

The dependencies and their versions are contained in the script and hence there is no need for any additional steps. The TypeScript runtime is Bun, which is 100% compatible with Node.js without any code modifications.

e.g:

```ts
import { toWords } from 'number-to-words@1';
import { getVariable } from 'windmill-client@1.147.3';
```

### Private npm registry & Private npm packages

![Private NPM registry](private_registry.png)

On EE, go to `Instance settings -> Core -> NPM Config Registry`.

Set the registry URL: `https://npm.pkg.github.com/OWNER` (replace `OWNER` with your GitHub username or organization name).

#### Private NPM packages requiring token

:::caution

Currently, deno does not support private npm packages requiring tokens (but support private npm registries). Bun however does.

:::

If a token is required, append `:_authToken=<your url>` to the URL.

Combining the two, you can import private packages from npm

```
https://registry.npmjs.org/:_authToken=npm_bKZp1kOKzWsNPUvx2LpyUzIJqi2uaw23eqw
```

If the private registry is exposing custom certificates,`DENO_CERT` and `DENO_TLS_CA_STORE` env variables can be used as well (see [Deno documentaion](https://docs.deno.com/runtime/manual/getting_started/setup_your_environment#environment-variables) for more info on those options).

```dockerfile
windmill_worker:
  ...
  environment:
    ...
    - DENO_CERT=/custom-certs/root-ca.crt
```

## Imports in Python

For Python, the imports are automatically parsed on saving of the script and a list of imports is generated. A dependency job is then
spawned to associate that list of PyPi packages with a lockfile, which will lock
the versions. This ensures that the same version of a Python script is always
executed with the same versions of its dependencies. It also avoids the hassle
of having to maintain a separate requirements file.

We use a simple heuristics to infer the package name: the import root name must be the package name. We also maintain a list of exceptions.
You can make a PR to add your dependency to the list of exceptions [here](https://github.com/windmill-labs/windmill/blob/baac93f40140ee37548a273885c028a8e6500b6d/backend/parsers/windmill-parser-py-imports/src/lib.rs#L48)

## Pinning dependencies

If the imports are not properly analyzed, there exists an escape hatch to
override the inferred imports. One needs to head the Script with the following comment:

```python
#requirements:
#dependency
#version_pinned_dependency==0.4

import dependency

def main(...):
  ...
```

To combine both the inference of windmill and being able to pin dependencies, use `extra_requirements`:

```python
#extra_requirements:
#dependency==0.4

import pandas
import dependency

def main(...):
  ...
```

### Private PyPi repository

In addition to that, environment variables can be set to customize `pip`'s index-url and extra-index-url and certificate.
This is useful for private repositories.

In a docker-compose file, you would add following lines:

```dockerfile
windmill_worker:
  ...
  environment:
    ...
    - PIP_INDEX_URL=https://pypi.org/simple
    - PIP_EXTRA_INDEX_URL=https://pypi.org/simple
    - PIP_TRUSTED_HOST=pypi.org
    - PIP_INDEX_CERT=/custom-certs/root-ca.crt
```

## Imports in Go

For Go, the dependencies and their versions are contained in the
script and hence there is no need for any additional steps.

e.g:

```go
import (
	"rsc.io/quote"
    wmill "github.com/windmill-labs/windmill-go-client"
)
```

## Imports in PowerShell

For PowerShell, imports are parsed when the script is run and modules are automatically installed if they are not found in the cache.

e.g.:

```powershell
Import-Module -Name MyModule
```
