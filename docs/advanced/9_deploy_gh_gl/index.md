import DocCard from '@site/src/components/DocCard';

# Deploy to Prod using a Git Workflow

The integration with git works in three-folds:

1. Github Action + CLI: upon any commit to a particular branch, the Github action will run the `wmill` CLI and push to a Windmill workspace this works using the CLI doing `wmill sync push --raw` (non-EE)
2. Git Sync (Workspace mode): Windmill automatically committing to a git repository upon any deploy to a workspace, this works using the CLI doing `wmill sync pull --raw` (EE). Having it commit back to windmill has 2 benefits:

- It ensures that any automatically created metadata files are wrote-back (in case you pushed a script without its metadata for instance)
- It ensures that any modification done in the UI is kept in sync with the git repository and guarantees a bi-sync between the repo and the UI

3. Git Sync (Item mode): Windmill automatically create a branch specific to that item (and whose name is derived from that item) that targets the branch set in the git sync settings, upon any change to any items, be it from the UI or from git (EE). This should be coupled with a Github action that automatically create a PR when a branch is created. This PR can then be reviewed and merged. Upon being merged to the prod branch, a Github action as described in 1. would then deploy it to the prod branch.

Once everything is setup, the process is as follows:

- Users iterate and make their changes in the "staging" Windmill workspace UI or in the git staging branch directly.
- Every time a Windmill App, Flow or Script is deployed to that workspace (via Windmill's UI or through the github action that deploys to staging upon any change), Windmill automatically sync it back to the repo on the "staging" branch (Git Sync - Workspace mode) and also create a branch that targets prod and keep it in sync with any new changes (Git Sync - Item mode)
- On every new branch created, PRs are automatically created via a [GitHub Action](https://docs.github.com/en/actions). Approved GitHub users can review and merge those PRs.
- Every time a PR is merged, another GitHub Action automatically deploys the change to a "production" Windmill workspace.

Note that although the CLI is used by both the GitHub Action and the Git Sync, the CLI does not need to be used directly by any users and everything happen behind the scene in an automated way.

This gives the flexibility to fully test new Windmill scripts, flows and apps, while having them [version-controlled](../13_version_control/index.mdx) and deployed in an automated way to the production environment.

:::tip

Check out the [windmill-sync-example repository](https://github.com/windmill-labs/windmill-sync-example) as an illustration of this process.

:::

This process can be used in particular for local development with a solid setup:

![Local Development Setup](../4_local_development/local_development_v0.png 'Local Development Setup')

More details at:

<div class="grid grid-cols-2 gap-6 mb-4">
	<DocCard
		title="Local Development"
		description="Develop from various environments such as your terminal, VS Code, and JetBrains IDEs."
		href="/docs/advanced/local_development"
	/>
</div>

## Git Sync

Deploying to a prod workspace using git requires the [Git Sync](../11_git_sync/index.mdx) feature, which is is a [Cloud and Self-Hosted Enterprise Edition](/pricing)-only feature.

From the workspace settings, you can set a [git_repository](../../integrations/git_repository.mdx) resource on which the workspace will automatically commit and push scripts, flows and apps to the repository on each [deploy](../../core_concepts/0_draft_and_deploy/index.mdx).

## Setup the full Git workflow

Note: this is the detailed setup steps for a [GitHub](https://github.com/) repository. It will need to be adapted for [GitLab](https://about.gitlab.com/).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/es8FUC2M73o?vq=hd1080"
	title="Deploy to a Prod Workspace using a Git Workflow"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

:::warning
If you are not using the EE version of Windmill, you can still follow the parts of this guide that do not involve Git Sync.
:::

:::tip

The guide covers a staging and prod setup. To add an additional dev environment, simply consider staging to be the target of the dev workspace and prod to be the target of the staging workspace..
:::

### GitHub repository setup

First, the GitHub repo needs to be set up and Windmill needs to be able to commit to it.

1. Create a GitHub repository.
1. Initialize it by pulling the content of your workspace:
   ```
   #first github-sync-example is the local name of the workspace (can be anything), second is the workspace id (need to be exact), third is the url of your instance
   wmill workspace add  github-sync-example-staging github-sync-example-staging https://app.windmill.dev/
   echo 'includes: ["f/**"]' > wmill.yaml
   wmill sync pull --raw --skip-variables --skip-secrets --skip-resources
   git add -A
   git commit -m 'Initial commit'
   git push
   ```
1. Create a branch named `staging` and push it to the repo.
1. Generate a [GitHub token with write permission](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens#creating-a-fine-grained-personal-access-token) to this repository. This is necessary for Windmill to push commits to the repo every time a change is made to the staging workspace.
1. In the repository Settings > Actions > General, tick the [Allow GitHub Actions to create and approve pull requests](https://docs.github.com/en/enterprise-server@3.10/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests). This is necessary for the GitHub Action automatically creating PRs when Windmill commits a change.
1. From Windmill, create a [token](../../core_concepts/4_webhooks/index.mdx#user-token) under User settings > Token and [save it as a secret](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository) named `WMILL_TOKEN` in the repo Settings > "Secret and Variable" > "Actions". This is necessary for Windmill to push to the production workspace.

#### GitHub Actions setup

3 actions are needed.

1. The first one to automatically create a PR when Windmill commits a change after a user deployed a script/flow/app in the staging workspace. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/open-pr-on-commit.yaml). All branches created by Windmill will have a `wm_deploy/` prefix, which is handy to trigger this action only when a branch matching this pattern is created.
1. The second one to automatically push the content of the repo to the Windmill prod workspace when a PR is merged. The workflow file is available in [the example repo](https://github.com/windmill-labs/windmill-sync-example/blob/main/.github/workflows/push-on-merge.yaml). This action uses the wmill itself with `wmill sync push --raw`.
   For this action to work, you need to set the following secrets in the repo Settings > "Secret and Variable" > "Actions":

   - `WMILL_TOKEN`: the token generated previously in Windmill

   2 other variables need to be set in the github action workflow file:

   - `WMILL_WORKSPACE`: the name of the workspace
   - `WMILL_URL`: the base URL of the Windmill instance (e.g. `https://app.windmill.dev/`)

1. Copy the previous github action/workflow file but now set the `WMILL_WORKSPACE` variable to the id of the staging workspace and the `WMILL_URL` variable to the base URL of the Windmill instance if different than the one for prod. Also changes the trigger to listen to the branches: 'staging'.

![Github Actions](gh_actions.png)

### Windmill Github Sync setup

1. **staging** workspace:

   1. In Windmill, create (by clicking on the + icon next to the resource picker) a [git_repository](https://hub.windmill.dev/resource_types/135/git_repository) [resource](../../core_concepts/3_resources_and_types/index.mdx) pointing to the GitHub repository and containing the token generated previously. You URL should be `https://[USERNAME]:[TOKEN]@github.com/[ORG|USER]/[REPO_NAME].git`. Set the branch to staging.
   1. Create a second [git_repository](https://hub.windmill.dev/resource_types/135/git_repository) resource pointing to the same GitHub repository but this time set branch to main
   1. Under the second git repository resource (the one pointing to prod), the one pointing to main, toggle: " Create one branch per deployed script/flow/app"

   ![Staging setup](staging.png)

2. **prod** workspace

   1. In Windmill, create a [git_repository](https://hub.windmill.dev/resource_types/135/git_repository) resource pointing to the GitHub repository and containing the token generated previously. You URL should be `https://[USERNAME]:[TOKEN]@github.com/[ORG|USER]/[REPO_NAME].git`. Set the branch to main

   ![Prod setup](prod.png)

### Testing

1. To verify that all is working correctly, push a change to your staging branch in git (for instance copy a script with a slightly different path)
1. Verify in the github action run that the sync push has been able to push the change to the staging workspace
1. Go to your staging workspace in Windmill, the new script should be there
1. go to the runs page, toggle the "Sync" kind of jobs. You should see at least 2 jobs, one to push back your change to the staging workspace (no-op), and one to create a branch that targets the main branch (the one that will be merged)
1. Now in your repo, you should see a new branch named `wm_deploy/[WORKSPACE_NAME]/[SCRIPT_PATH]` (for instance `wm_deploy/staging/f/example/script`)
1. Merge that branch, now the changes should trigger the "Deploy to prod" github action in the main branch

You can also test doing a change in the staging workspace directly in the UI. Since this setup is bidirectional, it will also trigger the github action to create a PR but also update your staging branch.
