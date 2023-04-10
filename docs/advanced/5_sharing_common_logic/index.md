# Sharing common logic

It is common to want to share common logic between your scripts. This can be done easily using relative imports in both Python and Deno.

Note that in both the webeditor and with the CLI, your scripts do not necessarily need to have a main function. If they don't, they are asummed to be shared logic and not runnable scripts.

It works extremely well in combination with [Developing scripts locally](../4_local_development/index.md) and you can easily sync your scripts with the [CLI](../3_cli/index.md).

### Python relative imports for sharing common logic

It is possible to import directly from other Python scripts. One can simply
follow the path layout. For instance,
`import foo from f.<foldername>.script_name`. A more complete example below:

```python
# u/user/common_logic

def foo():
  print('Common logic!')
```

And in another Script:

```python
# u/user/custom_script

from u.user.common_logic import foo

def main():
  return foo()
```

It works with Scripts contained in folders, and for scripts contained in
user-spaces, e.g: `f.<foldername>.script_path` or `u.<username>.script_path`.

You can also do relative imports to the current script. For instance.

```python
# if common_logic is a script in the same folder or user-space
from .common_logic import foo
# otherwise if you need to access the folder 'folder'
from ..folder.common_logic import foo
```

Beware that you can only import scripts that you have view rights on on at time of execution.
Furthermore, if you make any imports in the common logic, you will need to add
the same imports in the Script that is being imported, otherwise the automatic
dependency management will not work.

The folder layout is identical with the one that works with the CLI for syncing
scripts locally and on Windmill. See [Developing scripts locally](../4_local_development/index.md)

### Deno relative imports for sharing common logic

Similarly to Python, it is possible to import directly from other TypeScript
Scripts. One can simply follow the path layout. For instance,
`import { foo } from "/f/<foldername>/script_name.ts"`. A more verbose example
below:

```typescript
import { main as foo, util } from '/f/common/my_script_path.ts';

export async function main() {
	await foo();
	util();
}
```

You may also use simple relative imports:

```typescript
import { main as foo, util } from '../my_script_path.ts';
```

Note that path in windmill can have as many depth as needed, so you can have paths like this `f/folder/subfolder/my_script_path.ts` and relative imports will work at any level. Hence, it will work exactly the same as on local.
