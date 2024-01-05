# GitHub / GitLab for Version Control

Windmill integration with Git repositories makes it possible to adopt a robust development process for you Windmill scripts, flows and apps. 

The process is as follow:
- Users iterates and make their changes in a "staging" Windmill workspace
- Every time a Windmill App, Flow or Script is deployed to that workspace (via Windmill's UI), Windmill automatically commits it to this repo and creates one branch per app/flow/script.
- On every commit from Windmill, PRs are automatically created via a Github action. Approved Github users can review and merge those PRs.
- Every time a PR is merged, another Github action automatically deploys the change to a "production" Windmill workspace

This gives the flexibility to fully test new Windmill scripts, flows and apps, while having them version controlled and deployed in an automated way to the production environment.

:::info

Windmill workspace sync to a Git repository is an Enterprise Edition only feature.

:::

:::tip

Check out the [windmill-sync-example repository](https://github.com/windmill-labs/windmill-sync-example) as an illustration of this process.

:::

## Setup

Note: this is the detailed setup steps for a Github repository. It will need to ba adapted for GitLab.

#### Github repository setup

First the Github repo needs to be setup and Windmill needs to be able to commit to it. 

1. Create a Github repository
1. Generate a [Github token with write permission](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) to this repository. This is necessary for Windmill to push commits to the repo every time a change is made to the staging workspace.
1. In the repository settings > Actions > General, tick the [Allow GitHub Actions to create and approve pull requests](https://docs.github.com/en/enterprise-server@3.10/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests). This is necessary for the Github action automatically creating PRs when Windmill commits a change
1. From Windmill, create a token under User settings > Token and [save it as a secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) named `WMILL_TOKEN` in the repo settings > "Secret and Variable" > "Actions". This is necessary for Windmill to push to the production workspace

#### Windmill setup

1. In Windmill, create a `git_repository` resource pointing to the Github repository and containing the token generated previously. You URL should be `https://[USERNAME]:[TOKEN]@github.com/[ORG|USER]/[REPO_NAME].git`. Note that you have the possibility to input a custom branch name and a subfolder in this resource. Given that we are going to request Windmill to create one branch per script/flow/app, setting a custom branch will have no effect. However, if you wish to persist the windmill workspace in a subfolder of your repository, you can set it here.
1. In Windmill workspace settings > Git sync tab, pick the `git_repository` resource and toggle ON "Create one branch per per deployed script/flow/app"

#### Github actions setup

Two actions are needed.

1. The first one to automatically create a PR when Windmill commits a change after a user deployed a script/flow/app in the staging workspace. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/open-pr-on-commit.yaml). All branches created by Windmill will have a `wm_deploy/` prefix, which is handy to trigger this action only when a branch matching this pattern is created.
1. The second one to automatically push the content of the repo to the Windmill production workspace when a PR is merged. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml). This action uses the [Github CLI](https://cli.github.com/) which is available by default on Github action workers.

## Alternatives

If you don't have and Enterprise Edition license, alternatives exists to achieve similar workflows.

#### Using Windmill's embedded promotion feature

Windmill provides an easy way to "promote" scripts, flow and apps from one workspace to another. From the workspace settings, you can defined a workspace to be the "production" version of your current workspace. When this is set, any script flow or app can be promoted to the production workspace by clicking the ... button at the right of the script / flow / app in the home menu, and then "Deploy to Staging/Prod".

#### Using Windmill CLI in Github actions

Finally, you can define your own github actions to pull Windmill workspace regularly from Github using Windmill CLI. To automatically deploy a PR to the Windmill workspace, the (push-on-merge.yaml)[https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml] mentioned above can be used.

And another Github action can be created to regularly pull Windmill workspace to the Github repo using Windmill CLI. This action can be run on a schedule to keep the repo and the workspace in sync.
