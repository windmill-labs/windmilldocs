# GitHub / GitLab for Version Control

Learn how to integrate GitHub / GitLab repositories with your Windmill workspace for effective version control.

Check out the [windmill-sync-example repository](https://github.com/windmill-labs/windmill-sync-example) as an illustrative guide on utilizing GitHub / GitLab repositories as the version control source for your Windmill workspace.

Users of this repo can commit changes to the main branches and have it deployed to their Windmill workspace thanks to a GitHub / GitLab action that will simply use the [Windmill CLI's](https://github.com/windmill-labs/windmill/tree/main/cli) `wmill sync push` under the hood.

This repo is used to sync with the example folder in the demo workspace.

## Setup

Write access to the workspace is required. This is done using an access token.
To generate a new token log into your Windmill instance
(<a href="https://app.windmill.dev/" rel="nofollow">https://app.windmill.dev/</a> for cloud hosted instances) and navigate to the
account settings, which contains a "[Tokens](../../core_concepts/4_webhooks/index.md#user-token)" section, use the relevant button
there to generate a new token. Note that you will only be able to copy this
token once!

![Account settings](../../assets/deploy_gh_gl/account-settings.png) ![Tokens](../../assets/deploy_gh_gl/tokens.png)

Add an environment "windmill" to the repository via the settings. You may name
this anything, but will need to adjust the workflow accordingly. Then add a
secret "WMILL_TOKEN" to this environment.

![GH environment](../../assets/deploy_gh_gl/gh-environment-light.png)

Edit the workflows:

- [.github/workflows/push-on-merge.yaml](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml) to push on merge to main, usually you'll
  only need to fill out the `env` variables, then activate GitHub actions by
  navigating to the "Actions" tab in GitHub. You may want to run the action once
  manually to see that everything works.

- [.github/workflows/pull-workspace.yaml](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/pull-workspace.yaml) to sync back any changes made in Windmill UI to this repo under the form of either a Pull Request or a commit to main directly.

![Configuration](../../assets/deploy_gh_gl/configure-light.png)

### Security

We recommend creating and using a separate account in Windmill from which to use the token of. This will allow better tracking of the use of the token.

It may additionally be useful to restrict the GitHub environment.
[The GitHub help article](https://docs.github.com/en/actions/deployment/targeting-different-environments/using-environments-for-deployment)
goes into detail of all the options.

## .wmillignore

Use the .wmillignore file to filter the contents to sync (like only the content of some folders), it supports the .gitignore syntax.
