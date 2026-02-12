---
title: 'Contributor guide'
description: How do I contribute to the Windmill open-source project?
---

# Contributor guide

As an open-source platform, Windmill relies on the developer community for enhancements and support. Your work, from coding to writing docs, directly improves our platform. This guide outlines how you can get involved.

Here are some ways you can contribute to our platform:

- **Share Your Work**: [Upload your Scripts, Flows, Apps, and Resource types](../1_share_on_hub/index.md) to Windmill Hub. Approved high-quality submissions are accessible for community use.
- **Code Contributions**: Enhance the [Windmill codebase](https://github.com/windmill-labs/windmill) by submitting pull requests (PRs) on GitHub. Bug reports and feature requests are valuable—please file an issue to start the conversation.
- **Community Engagement**: Join our [Discord community](https://discord.com/invite/V7PM2YHsPB) to offer suggestions, assist others, or discuss your ideas.

## Security bounty program

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

## Expanding Windmill's integrations: adding new OAuth providers

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

## Mapping python imports

Python can automatically [infer requirements from imports](../../advanced/15_dependencies_in_python/index.mdx).
However it is not always accurate because import can missmatch with the requirement.
To handle this case, there is [import map](https://github.com/windmill-labs/windmill/blob/main/backend/parsers/windmill-parser-py-imports/src/mapping.rs).
You can help us and others by adding new entries there and opening PR.

Let's take a look at simple example

**1. Find problematic import**

```python
import git

def main():
  ...
```

It will fail with error indicates either `git` cannot be resolved or `git` module cannot be imported.

**2. Pin it**

Use one of the [pinning methods](../../advanced/15_dependencies_in_python/index.mdx#pinning-dependencies-and-requirements) to override requirement

```python
import git # pin: GitPython

def main():
  ...
```

**3. Add entry to global map**

Navigate to [mappings](https://github.com/windmill-labs/windmill/blob/main/backend/parsers/windmill-parser-py-imports/src/mapping.rs) and add new entry to the `SHORT_IMPORTS_MAP`

```rust
pub static SHORT_IMPORTS_MAP: PyMap = phf_map! {
    ...
    "git" => "GitPython",
};
```

**4. Open PR**

We appreciate every contribution to Windmill!

**Special cases**

Sometimes dependencies require to be imported separated by `.`

Let's take a look at one of those on [azure-storage-blob](https://pypi.org/project/azure-storage-blob/) example

```python
import azure.storage.blob # pin: azure-storage-blob
```

As you can see this entire import needs to be mapped and not just `azure` part of it.

To finalize map for everyone, add this entry in the [mappings](https://github.com/windmill-labs/windmill/blob/main/backend/parsers/windmill-parser-py-imports/src/mapping.rs).
But this time add it to `FULL_IMPORTS_MAP` 
```rust
pub static FULL_IMPORTS_MAP: PyMap = phf_map! {
    ...
    "azure.storage.blob" => "azure-storage-blob",
};
```
