# Deploy to Prod using the UI

From a workspace in Windmill, you can deploy a script/flow/resource/variable and all its dependencies to another workspace. This is a natural way of implementing staging/prod. This feature is available for [Cloud plans and Self-Hosted Enterprise Edition](/pricing) only.

:::tip Deploy to prod

For all details on Deployments to Prods, see [Deploy to Prod](../../advanced/12_deploy_to_prod/index.mdx).

:::

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/staging_prod.mp4"
/>

<br/>

:::tip Draft and Deploy

The [Draft and Deploy](../0_draft_and_deploy/index.mdx) is another feature that offers a lightweight solution for implementing a staging and production workflow, suitable for various scenarios.

:::

## How it works

For users with admin rights on the source workspace, in the `Workspace` menu, go to the "Dev/Staging/Prod" tab and pick a workspace for "Workspace to link to".

![Link to a workspace](./workspace_to_link_to.png.webp 'Link to a workspace')

This workspace to link to can for example be:

- a Staging workspace to test scrips and flows
- a Prod workspace where you can deploy scripts and flows when ready.

Then, from the workspace, on the `⋮` menu of each [deployed](../0_draft_and_deploy/index.mdx#deployed-version) script or flow, pick "Deploy to staging/prod". This can be done also from the [Resources](../3_resources_and_types/index.mdx) and [Variables](../2_variables_and_secrets/index.mdx) menus or directly from a script or flow `Details` page.

This can be done by users with both View rights on the deployed-from workspace and edit rights on the deployed-to workspace.

You can deploy one by one flows, scripts (including each script within flow), variables and resources. Or toggle more than one and "Deploy all".

![Deploy to staging/prod](./deploy_to_staging_prod.png.webp 'Deploy to staging/prod')

Items are called:

- "Missing" if not yet present in the deployed workspace.
- "New" if the item will be created with the deployment.
- "diff" if the item was already deployed previously. This opens a difference viewer tab where you can see differences with the previous version.

![Diff menu](./diff_menu.png.webp 'Diff menu')

## Shareable page

A static page is created for each potential deployment to Staging/Prod.

This can be useful for non-admin (for example, operators) to share a page to properly-permissioned users to have them review or do the deployment.

![Shareable link](./shareable_link.png.webp 'Shareable link')

> Even users who are not admin can see the "Deploy to staging/prod", from where they can get the link of the shareable page.

<br/>

![Shareable page](./shareable_page.png.webp 'Shareable page')

> This page then allows users with the right permissions to deploy the given items.
