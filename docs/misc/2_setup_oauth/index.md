# How to setup OAuth

The oauth.json need to be mounted from your windmill server instances. On the docker-compose.yml, this would correspond to uncommenting these [2 lines](https://github.com/windmill-labs/windmill/blob/v1.103.0/docker-compose.yml#L38-L39) and have an oauth.json file in the same folder as the docker-compose.yml.

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

> `<integration>` code must match with the code that is setup in [oauth_connect.json](https://github.com/windmill-labs/windmill/blob/main/backend/oauth_connect.json)

For environments that do not support mounting files or if not practical, you may also pass it base64 as env variable to the server: `OAUTH_JSON_AS_BASE64=$(base64 oauth.json | tr -d '\n')`

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
  background_color: '#3b82f6'
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

## Google Sheet

**Create GSheet OAuth keys**

- Create a Google OAuth account by going to https://console.developers.google.com/apis/credentials and create a project if you did not have one.
- Click "Enable APIs and Services"
  - Search "Google Sheets API"
  - Enable this API
- Click "Create Credentials", then click "OAuth 2.0 Client IDs" in the drop-down menu.
- Enter the following:
  - Application Type: Web Application
  - Name: Windmill
  - Authorized Redirect URLs: https://<YOUR_INSTANCE>/oauth/callback/gsheets
- Click Create.
- Copy the **Client ID** and **Client Secret** from the "OAuth Client" modal.
- Edit your `oauth.json` to look like:

```json
{
    "gsheets": {
        "id": "<CLIENT_ID>",
        "secret": "<CLIENT_SECRET>"
    }
}
```

The same steps apply to enable more APIs (**gmail**, **gdrive**, etc) on your Google Account to set up the resources in WindMill.

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

## Okta

Setup your `oauth.json` (e.g. via the `oauthConfig` in the values.yaml when using helm), using `okta` as the realm name, though
you can provide whatever realm name you want here, if you know what you're doing. This is configured as though helm is being
used for the deployment.

```
      {
        "okta": {
          "id": "<client credential from the client ID section of the okta service configuration>",
          "secret": "<from the CLIENT SECRETS section of the okta service configuration>",
          "login_config": {
            "auth_url": "https://<your org>.okta.com/oauth2/v1/authorize",
            "token_url": "https://<your org>.okta.com/oauth2/v1/token",
            "userinfo_url": "https://<your org>.okta.com/oauth2/v1/userinfo",
            "scopes": ["openid", "profile", "email"]
          },
          "connect_config": {
            "auth_url": "https://<your org>.okta.com/oauth2/v1/authorize",
            "token_url": "https://<your org>.okta.com/oauth2/v1/token",
            "scopes": ["openid", "profile", "email"]
          }
        }
      }

```

From your Admin page, setup windmill using the service flow

1. `Create a new app integration`
  a. For "sign-in method" select "OIDC - Open ID Connect"
  b. For "application type" select "Web Appliction"
2. Select all of the following options for Grant type of "Client acting on behalf of a user"
  - Authorization Code
  - Refresh Token
  - Implicit (hybrid)
  - Allow ID Token with implicit grant type
  - Allow Access Token with implicit grant type
3. For Refresh Token, select "Rotate token after every use"
4. Under "LOGIN", set the following:
  - "Sign-in redirect URIs" `https://<your windmill's public hostname as configured in values.yaml>/user/login_callback/okta/`
  - "Sign-out redirect URIs" `https://<your windmill's public hostname as configured in values.yaml>`
  - "Login initiated by" `App Only`
  - "Initiate login URI" `https://<your windmill's public hostname as configured in values.yaml>/user/login`
