# Deploy to prod using a Git Workflow

Windmill integration with Git repositories makes it possible to adopt a robust development process for your Windmill scripts, flows and apps.

:::tip Deploy to prod

For all details on Deployments to Prods, see [Deploy to Prod](../../advanced/12_deploy_to_prod/index.mdx).

:::

The process is as follows:
- Users iterate and make their changes in a "staging" Windmill workspace.
- Every time a Windmill App, Flow or Script is deployed to that workspace (via Windmill's UI), Windmill automatically commits it to this repo and creates one branch per app/flow/script.
- On every commit from Windmill, PRs are automatically created via a [GitHub Action](https://docs.github.com/en/actions). Approved GitHub users can review and merge those PRs.
- Every time a PR is merged, another GitHub Action automatically deploys the change to a "production" Windmill workspace.

This gives the flexibility to fully test new Windmill scripts, flows and apps, while having them [version-controlled](../13_version_control/index.mdx) and deployed in an automated way to the production environment.

:::info

Windmill workspace sync to a Git repository is a [Cloud and Self-Hosted Enterprise Edition](/pricing)-only feature.

:::

:::tip

Check out the [windmill-sync-example repository](https://github.com/windmill-labs/windmill-sync-example) as an illustration of this process.

:::

## Setup

Note: this is the detailed setup steps for a [GitHub](https://github.com/) repository. It will need to be adapted for [GitLab](https://about.gitlab.com/).

### GitHub repository setup

First, the GitHub repo needs to be set up and Windmill needs to be able to commit to it. 

1. Create a GitHub repository.
1. Generate a [GitHub token with write permission](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) to this repository. This is necessary for Windmill to push commits to the repo every time a change is made to the staging workspace.
1. In the repository Settings > Actions > General, tick the [Allow GitHub Actions to create and approve pull requests](https://docs.github.com/en/enterprise-server@3.10/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests). This is necessary for the GitHub Action automatically creating PRs when Windmill commits a change.
2. From Windmill, create a [token](../../core_concepts/4_webhooks/index.mdx#user-token) under User settings > Token and [save it as a secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) named `WMILL_TOKEN` in the repo Settings > "Secret and Variable" > "Actions". This is necessary for Windmill to push to the production workspace.

### Windmill setup

1. In Windmill, create a [git_repository](https://hub.windmill.dev/resource_types/135/git_repository) [resource](../../core_concepts/3_resources_and_types/index.mdx) pointing to the GitHub repository and containing the token generated previously. You URL should be `https://[USERNAME]:[TOKEN]@github.com/[ORG|USER]/[REPO_NAME].git`. Note that you have the possibility to input a custom branch name and a subfolder in this resource. Given that we are going to request Windmill to create one branch per script/flow/app, setting a custom branch will have no effect. However, if you wish to persist the Windmill workspace in a subfolder of your repository, you can set it here.
2. In Windmill workspace settings > Git sync tab, pick the `git_repository` resource and toggle On "Create one branch per deployed script/flow/app"

### GitHub Actions setup

Two actions are needed.

1. The first one to automatically create a PR when Windmill commits a change after a user deployed a script/flow/app in the staging workspace. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/open-pr-on-commit.yaml). All branches created by Windmill will have a `wm_deploy/` prefix, which is handy to trigger this action only when a branch matching this pattern is created.
1. The second one to automatically push the content of the repo to the Windmill production workspace when a PR is merged. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml). This action uses the [GitHub CLI](https://cli.github.com/) which is available by default on GitHub Action workers.