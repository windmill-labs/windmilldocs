# Deploy to staging/prod web UI

From a workspace in Windmill, you can deploy a script/flow/resource/variable and all its dependencies to another workspace. This is a natural way of implementing staging/prod. This feature is available for [Enterprise Edition](../../misc/7_upgrade/index.md#enterprise-edition) only.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    controls
    id="main-video"
    src="/videos/staging_prod.mp4"
/>

<br/>

:::tip Draft and Deploy

You might be interested by [Draft and Deploy](../0_draft_and_deploy/index.md) that allows a more lightweight way to to implement a staging and prod workflow, which might be sufficient in some cases.

:::

## How it works

For users with admin rights on the source workspace, in the `Workspace` menu, go to the "Dev/Staging/Prod" tab and pick a workspace for "Workspace to link to".

![Link to a workspace](./workspace_to_link_to.png 'Link to a workspace')

This workspace to link to can for example be:

- a Staging workspace to test scrips and flows
- a Prod workspace where you can deploy scripts and flows when ready.

Then, from the workspace, on the `⋮` menu of each [deployed](../0_draft_and_deploy/index.md#deployed-version) script or flow, pick "Deploy to staging/prod". This can be done also from the [Resources](../3_resources_and_types/index.md) and [Variables](../2_variables_and_secrets/index.md) menus or directly from a script or flow `Details` page.

This can be done by users with both View rights on the deployed-from workspace and edit rights on the deployed-to workspace.

You can deploy one by one flows, scripts (including each script within flow), variables and resources. Or toggle more than one and "Deploy all".

![Deploy to staging/prod](./deploy_to_staging_prod.png 'Deploy to staging/prod')

Items are called:

- "Missing" if not yet present in the deployed workspace.
- "New" if the item will be created with the deployment.
- "diff" if the item was already deployed previously. This opens a difference viewer tab where you can see differences with the previous version.

![Diff menu](./diff_menu.png 'Diff menu')

## Shareable page

A static page is created for each potential deployment to Staging/Prod.

This can be useful for non-admin (for example, operators) to share a page to properly-permissioned users to have them review or do the deployment.

![Shareable link](./shareable_link.png 'Shareable link')

> Even users who are not admin can see the "Deploy to staging/prod", from where they can get the link of the shareable page.

<br/>

![Shareable page](./shareable_page.png 'Shareable page')

> This page then allows users with the right permissions to deploy the given items.
