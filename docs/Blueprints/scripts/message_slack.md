---
title: Send a slack message
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/message_slack.py)

## Description

Send a message to a channel or person in the connected slack workspace

## Code

```python
import os
import wmill
from slack_sdk.web.client import WebClient


slack_client = WebClient(token=os.environ.get("G_ALL_SLACK_TOKEN"))


def main(
    text: str,
    channel: str = None,
    user: str = None,
):
    if channel == "":
        channel = None
    if user == "":
        user = None
        
    if channel is None and user is None or (channel is not None and user is not None):
        raise Exception("one and only one of channel or user need to be set")

    if user is not None:
        channel = "@{}".format(user)    
    slack_client.chat_postMessage(channel=channel, text=text)
```

## Schema

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "properties": {
        "channel": {
            "default": null,
            "description": "",
            "type": "string"
        },
        "text": {
            "default": null,
            "description": "",
            "type": "string"
        },
        "user": {
            "default": null,
            "description": "",
            "type": "string"
        }
    },
    "required": [
        "text"
    ],
    "type": "object"
}
```

