---
title: Send image to slack
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/send_slack_image.py)

## Description

Send a base64 image to a slack channel or user. Choose one of user or channel but not both.

## Code

```python
import os
from slack_sdk.web.client import WebClient
from datetime import date, datetime


slack_client = WebClient(token=os.environ.get("G_ALL_SLACK_TOKEN"))


def main(
    img_data: bytes,
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

    tmp_image = "image.png"
    with open(tmp_image, "wb") as fh:
        fh.write(img_data)
    slack_client.files_upload(
        file=tmp_image, initial_comment="Weekly report", channels=channel
    )
    
    now = datetime.now()
    current_time = now.strftime("%H:%M")
    today = date.today()
    print("Sent to slack successfully on", today, current_time)
    
    

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
        "img_data": {
            "contentEncoding": "base64",
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
        "img_data"
    ],
    "type": "object"
}
```

