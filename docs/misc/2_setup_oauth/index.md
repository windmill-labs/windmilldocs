# How to setup OAuth

The oauth.json need to be mounted from your windmill server instances. On the docker-compose.yml, this would correspond to uncommenting thoese [2 lines](https://github.com/windmill-labs/windmill/blob/main/docker-compose.yml#L41-L42) and have an oauth.json file in the same folder as the docker-compose.yml.

The oauth.json has the following structure:
```json
{
  "<integration>": {
    "id": "...",
    "secret": "..."
  },
  ....
}
```

## Google login

**Create Google OAuth keys**

First, you need to create a Google OAuth Client:

- Go to https://console.developers.google.com/apis/credentials and create a project if you did not have one.
- Click "Create Credentials", then click "OAuth Client ID" in the drop-down menu.
- Enter the following:
  - Application Type: Web Application
  - Name: Windmill
  - Authorized Redirect URLs: https://<YOUR_INSTANCE>/login_callback/google
- Click Create.
- Copy the **Client ID** and **Client Secret** from the "OAuth Client" modal.
- Edit your `oauth.json` to look like:

```json
{
  "google": {
    "id": "<CLIENT_ID>",
    "secret": "<CLIENT_SECRET>",
    "allowed_domains": ["windmill.dev"] //restrict a client OAuth login to some domains
  }
}
```

## Slack

1. Create a new slack app at <https://api.slack.com/apps?new_app=1>

Your app manifest shoud look like this, replacing `<YOUR INSTANCE URL>` in 2 places.

```yaml
display_information:
  name: Windmill
  description: windmill.dev slackbot and oauth integration
  background_color: "#3b82f6"
  long_description: The Windmill app allows to use command to run jobs inside Windmill as well as receiving message as the Windmill app. The windmill app pairs a slack workspace with a windmill workspace. It must be installed from within the settings of a windmill workspace.
features:
  app_home:
    home_tab_enabled: true
    messages_tab_enabled: true
    messages_tab_read_only_enabled: true
  bot_user:
    display_name: Windmill
    always_online: true
  slash_commands:
    - command: /windmill
      url: <YOUR INSTANCE URL>/api/oauth/slack_command
      description: Trigger the script set in your workspace settings for slack
      usage_hint: the text that will be passed to the script
      should_escape: false
oauth_config:
  redirect_urls:
    - <YOUR INSTANCE URL>
  scopes:
    user:
      - chat:write
      - admin
      - channels:write
    bot:
      - chat:write
      - chat:write.public
      - channels:join
      - commands
settings:
  org_deploy_enabled: false
  socket_mode_enabled: false
  token_rotation_enabled: false
```

1. 
```json
{
  ...
  "slack": {
    "id": "<CLIENT_ID>",
    "secret": "<CLIENT_SECRET>"
  }
}
```



## Keycloak

Setup your realm in Keycload then add the following to your `oauth.json`:

```
{
    "keycloak_<realm>": {
        "id": "...",
        "secret": "...",
        "connect_config": {
            "auth_url": "https://.../realms/<realm>/protocol/openid-connect/auth",
            "token_url": "https://.../realms/<realm>/protocol/openid-connect/token",
            "scopes": ["openid", "offline_access"]
        }
    }
}
```
