# Dependency Management & Imports

Windmill's strength lies in its ability to run scripts without having to deal with separate dependency files. This is achieved by automatically parsing the imports and resolving the dependencies.

Windmill generates a lockfile to ensure that the same version of a script is always executed with the same versions of its dependencies. If no version is specified, the latest version is used. Windmill's workers cache dependencies to ensure fast performance without the need to pre-package dependencies - most jobs take under 100ms end-to-end.

On the [enterprise edition](../../misc/7_plans_details/index.mdx), Windmill's caches can be configured to sync their cache with a central s3 repository to distribute the cache across multiple workers as soon as a new dependency is used for the first time.

:::info

To import other scripts from your workpace, see [Sharing common logic](../5_sharing_common_logic/index.md).

:::

## Imports in Typescript

The dependencies and their versions are contained in the
script and hence there is no need for any additional steps. The resolution is done by [deno](https://deno.com/runtime).

e.g:

```
import { toWords } from "npm:number-to-words@1"
import * as wmill from "https://deno.land/x/windmill@v1.84.1/mod.ts"
```

### Private npm registry

If you are using a private artifactory, you can set the env variable `NPM_CONFIG_REGISTRY` for the worker to the url of your artifactory.

```dockerfile
windmill_worker:
  ...
  environment:
    ...
    - NPM_CONFIG_REGISTRY=https://registry.yarnpkg.com.
```

## Imports in Python

For Python, the imports are automatically parsed on saving of the script and a list of imports is generated. A dependency job is then
spawned to associate that list of PyPi packages with a lockfile, which will lock
the versions. This ensures that the same version of a Python script is always
executed with the same versions of its dependencies. It also avoids the hassle
of having to maintain a separate requirements file.

We use a simple heuristics to infer the package name: the import root name must be the package name. We also maintain a list of exceptions.
You can make a PR to add your dependency to the list of exceptions [here](https://github.com/windmill-labs/windmill/blob/main/backend/parsers/windmill-parser-py/src/lib.rs#L177)

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

In addition to that, environment variables can be set to customize `pip`'s
index-url and extra-index-url. This is useful for private repositories.

In a docker-compose file, you would add following lines:

```dockerfile
windmill_worker:
  ...
  environment:
    ...
    - PIP_INDEX_URL=https://pypi.org/simple
    - PIP_EXTRA_INDEX_URL=https://pypi.org/simple
    - PIP_TRUSTED_HOST=pypi.org
```

## Imports in Go

For Go, the dependencies and their versions are contained in the
script and hence there is no need for any additional steps.

e.g:

```
import (
	"rsc.io/quote"
    wmill "github.com/windmill-labs/windmill-go-client"
)
```
