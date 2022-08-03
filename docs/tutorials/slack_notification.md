---
sidebar_position: 3
title: Send a notification to slack
---

### Step 1: Connect your workspace to slack

[How to: Connect your workspace](/docs/how-tos/connect_to_slack)

### Step 2: Use the send slack message template

Use the shared template `u/bot/message_slack` copied below for convenience:

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
