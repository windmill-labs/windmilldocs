# Import a script file from another script

This is only possible in Typescript but one can refer to other scripts that he
has visibility on using the following imports:

```
import * as my_other_script from "https://app.windmill.dev/api/w/demo/scripts/raw/p/u/bot/my_other_script.ts"`
```

The format for the import url is:

By path:

```
https://<instance>/api/w/<workspace>/scripts/raw/p/<path>.ts"
```

By hash:

```
https://<instance>/api/w/<workspace>/scripts/raw/h/<hash>.ts"
```
