---
title: Return Table
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/return_table.py)

## Description

An example of a script that return a table that can get rendered

## Code

```python
import numpy as np
import pandas as pd

def main(
    seed = 123
):
    np.random.seed(seed)
    df = pd.DataFrame(np.random.randint(0,100,size=(100, 4)), columns=list('ABCD'))
    print(df)
    print("See the result tab to see it rendered as a ta")
    return [df.columns.values.tolist()] + df.values.tolist()

```

## Schema

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "properties": {
        "seed": {
            "default": 123,
            "description": ""
        }
    },
    "required": [],
    "type": "object"
}
```

