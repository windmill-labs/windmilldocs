# How to setup OAuth

## Google login

Create Google OAuth keys

First, you need to create a Google OAuth Client:

- Go to https://console.developers.google.com/apis/credentials.
- Click Create Credentials, then click OAuth Client ID in the drop-down menu
- Enter the following:
    - Application Type: Web Application
    - Name: Windmill
    - Authorized Redirect URLs: https://YOUR_INSTANCE/login_callback/google
- Click Create
- Copy the Client ID and Client Secret from the ‘OAuth Client’ modal
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
