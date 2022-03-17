---
title: Do a simple HTTP post request
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/http_request.py)

## Description

This example pass a value as JSON data and use a secret as bearer token

## Code

```python
import requests
import os

def main(
    my_value: str
):
    headers={'Authorization': "Bearer: {}".format(os.environ.get("WM_TOKEN"))}
    r = requests.post('https://httpbin.org/post', data={'key': my_value})
    return r.text

```

## Schema

```python
None
```

