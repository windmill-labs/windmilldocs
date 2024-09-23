---
title: 'Contributor guide'
---

# Contributor guide

As an open-source platform, Windmill relies on the developer community for enhancements and support. Your work, from coding to writing docs, directly improves our platform. This guide outlines how you can get involved.

Here are some ways you can contribute to our platform:

- **Share Your Work**: [Upload your Scripts, Flows, Apps, and Resource Types](../1_share_on_hub/index.md) to Windmill Hub. Approved high-quality submissions are accessible for community use.
- **Code Contributions**: Enhance the [Windmill codebase](https://github.com/windmill-labs/windmill) by submitting pull requests (PRs) on GitHub. Bug reports and feature requests are valuable—please file an issue to start the conversation.
- **Community Engagement**: Join our [Discord community](https://discord.com/invite/V7PM2YHsPB) to offer suggestions, assist others, or discuss your ideas.

## Security Bounty Program

We are committed to rewarding white hat hackers who help us by identifying and reporting significant security vulnerabilities.

**Eligibility and Rewards**:
We offer rewards of up to $2,500 for the discovery and reporting of severe security flaws that could potentially impact the integrity, confidentiality, or availability of our services.
The reward amount is determined by the severity and impact of the vulnerability.

**Reporting Process**:
To report a vulnerability, please send a detailed description, including steps to reproduce it, to security@windmill.dev.
Our team will work with you to assess the report and, if validated, make the necessary fixes.

**Guidelines**:
We ask that you act responsibly, not disclose the vulnerability publicly or to third parties before it is fixed, and give us at least 48 hours to address the issue.

Thank you for helping us keep Windmill secure.

## Expanding Windmill's Integrations: Adding New OAuth Providers

To enhance Windmill's connectivity and integration capabilities, we welcome contributions that add new OAuth providers. This not only broadens the range of services Windmill can interact with but also directly impacts the platform's functionality and user experience.

**How to Contribute a New OAuth Provider**:
Submit a Pull Request: Add your new OAuth provider configuration to the [backend/oauth_connect.json](https://github.com/windmill-labs/windmill/blob/main/backend/oauth_connect.json) file with the following format:

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
