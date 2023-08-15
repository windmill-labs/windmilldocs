---
title: 'Contributor Guide'
---

# Contributor Guide

## Getting started

**First, thank you for showing interest in contributing to Windmill**.

You can contribute to Windmill in three ways:

- [Sharing Scripts, Flows, Apps and Resource Types](../1_share_on_hub/index.md)
  on [Windmill Hub](https://hub.windmill.dev/).
- Contributing to the
  [Windmill codebase](https://github.com/windmill-labs/windmill).
- Join our [Discord](https://discord.com/invite/V7PM2YHsPB) to make suggestions or even help other users.

The best way to share what you created on Windmill with the community, is to
submit it on [Windmill Hub](https://hub.windmill.dev/). If the submission meets our quality
standards, they get approved, and become available for anyone to use directly
from their instance of Windmill. For this use case, please refer to the
[Share on Windmill Hub](../1_share_on_hub/index.md) guide.

If you want to contribute to the Windmill codebase itself, you can do so by
opening a PR on our [GitHub](https://github.com/windmill-labs/windmill). If you
have a bug to report or want to request a feature, you can always
[create a new issue](https://github.com/windmill-labs/windmill/issues/new/choose).

In case you found a typo, something incorrect or just unclear in the
documentation, please
[create a new issue](https://github.com/windmill-labs/windmilldocs/issues/new)
in the
[Windmill Docs repository](https://github.com/windmill-labs/windmilldocs). PRs
are also welcome!

## Add new OAuth provider

To add a new OAuth provider, open a Pull Request to add a new item to:
[backend/oauth_connect.json](https://github.com/windmill-labs/windmill/blob/main/backend/oauth_connect.json).

The format is as follows:

```json
"<name_of_resource_type_for_integration>": {
     "auth_url": "<auth_url>",
     "token_url": "<token_url>",
     "scopes": <the list of default scopes to suggest by default>,
     "extra_params": {
         "<key>": "<val>",
     }
 },
```

Where `extra_params` is an escape hatch to deal with OAuth provider that need
some extra fields to be passed along to the authorization URL.

You can iterate without requiring a dev setup. The item accepts an extra optional field: `connect_config` or `login_config` of type OAuthConfig:

```
interface OAuthConfig {
    auth_url: string,
    token_url: string,
    userinfo_url?: string,
    scopes?: string[],
    extra_params?: Record<string, string>,
    extra_params_callback?: Record<string, string>,
    req_body_auth?: bool
}
```

`connect_config` is used for resources, and `login_config` for SSO.
