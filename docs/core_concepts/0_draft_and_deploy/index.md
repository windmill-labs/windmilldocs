# Draft and Deploy

Draft, test, and deploy scripts, flows, and apps Windmill to iterate and save safely.

Each script, flow or app can be saved (sometimes concurrently) in 3 fashions, by your browser in `local storage`, by the backend as a `draft`, and `deployed`.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    controls
    id="main-video"
    src="/videos/draft_and_deploy.mp4"
/>

<br/>

:::tip Deploy to Staging or Prod

If you are looking for complete isolation between staging and prod, you might be interested by [Deploy to Staging or Prod](../12_staging_prod/index.md) that allows deploying scripts, flows, variables and resources to another workspace, typically staging or prod workspaces.

:::

## Local Edits

Changes made to a script, flow, or app are saved locally in your browser until they are validated as either a 'Draft' or 'Deployed' version.

Local edits can be run and tested only from the editor (script, flow or app) with the `Test` button.

## Draft

Local edits can be saved as a draft for staging purposes. A draft is visible from members of the workspace and can be edited. There is only one draft per runnable. The draft inherits the permission of the item it is attached to or at the path they are in for drafts non deployed items.

Drafts can be run and tested only from the editor (script, flow or app) with the `Test` button.

## Deployed Version

The deployed version is the authoritative version of a runnable. Once deployed, it is not only visible by workspace members but has its own [auto-generated UI](../6_auto_generated_uis/index.md), [webhooks](../4_webhooks/index.md), or can be called from flows and apps (for sripts and flows). This also means that local edits and drafts can be made in parallel to a deployed version of a runnable without affecting its behavior.

If you want to have several versions of the same runnable, just fork it with the `Fork` button on the drop down menu of `Deploy`.

### Special case: Deployed versions of scripts

> Apps and Flows only have one deployed version at a given path and doing a new deployment overwrite the previous one.

> <br/>

> Scripts are special because each deployment of a script creates an immutable hash that will never be overwritten. The path of a script serves as a redirection to the last deployed hash, but all hashes live permanently forever. This ensures that if you refer to a script by its hash, its behavior is guaranteed to remain the same even if a new hash is deployed at the same path.

<br/>

![Recap Draft and Deploy](./recap_draft_and_deploy.png)