# How to setup OAuth login

## Google

Create Google OAuth keys

First, you need to create a Google OAuth Client:

- Go to https://console.developers.google.com/apis/credentials.
- Click Create Credentials, then click OAuth Client ID in the drop-down menu
- Enter the following:
    - Application Type: Web Application
    - Name: Windmill
    - Authorized Redirect URLs: <instance>/login_callback/google
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


