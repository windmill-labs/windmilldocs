---
title: Send an email (smtp and gmail)
---

[See on Github](https://github.com/windmill-labs/windmill/blob/main/starter/scripts/u/bot/send_email_gmail.py)

## Description

Send an email using smtplib and in particular with a gmail account set with a [secure app password](https://support.google.com/accounts/answer/185833?hl=en).

For gmail the following smtp configuration set in resource would work:
```json
{
    "host": "smtp.gmail.com",
    "password": "$VAR:U_YOU_YOUR_SECURE_PASSWORD",
    "port": 587,
    "user": "youremail@gmail.com"
}
```
where you have set the variable `u/you/your_secure_password` as a variable containing the app password.

## Code

```python
import wmill
import smtplib

client = wmill.Client()

def main(to: str, subject: str, body: str):
    smtp_config = client.get_resource("<g/all/my_smtp_resource>")
    server = smtplib.SMTP(host=smtp_config["host"], port=smtp_config["port"])
    server.ehlo()
    server.starttls()
    server.login(smtp_config["user"], smtp_config["password"])

    server.sendmail(
    smtp_config["user"],
    to,
    f"""Subject: {subject}

{body}
    """)



```

## Schema

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "properties": {
        "body": {
            "default": null,
            "description": "",
            "type": "string"
        },
        "subject": {
            "default": null,
            "description": "",
            "type": "string"
        },
        "to": {
            "default": null,
            "description": "",
            "type": "string"
        }
    },
    "required": [
        "to",
        "subject",
        "body"
    ],
    "type": "object"
}
```

