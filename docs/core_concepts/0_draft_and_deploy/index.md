# Draft and Deploy

Edit, Draft and Deploy allow for the creation, testing, and refinement of scripts, flows, and apps in a controlled environment before they are deployed, providing a structured approach to development within your workspace.

Each script, flow or app can be saved (sometimes concurrently) in 3 fashions, by your browser in `local storage`, by the backend as a `draft`, and `deployed`.

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    controls
    id="main-video"
    src="/videos/draft_and_deploy.mp4"
/>

## Local Edits

All changes on a runnable (script, flow or app) are only saved locally on your browser until validated "Draft" or "Deploy". Until then, they are only visible locally.

Local edits can be run and tested only from the editor (script, flow or app) with the `Test` button.

## Draft

Local edits can be saved as Draft as a staging state. A draft is visible from members of the workspace and can be edited. There is only one draft per runnable. The draft inherits the permission of the item it is attached to or at the path they are in for drafts non deployed items.

Drafts can be run and tested only from the editor (script, flow or app) with the `Test` button.

## Deployed Version

The deployed version is authoritative for a runnable. Once deployed, it is not only visible by workspace members but has its own [auto-generated UI](../6_auto_generated_uis/index.md), [webhooks](../4_webhooks/index.md), or can be called from flows and apps (for sripts and flows). It also means that local edits and drafts can be made in parallel of a Deployed version of a runnable but won't affect its behavior.

If you want to have several versions of the same runnable, just fork it with the `Fork`button on the drop down menu of `Deploy`.

### Special case: Deployed versions of scripts

> Apps and Flows only have one deployed version at a given path and doing a new deployment overwrite the previous one.

> <br/>

> Scripts are special since every deployment of a script create an immutable hash that will never be overwritten. The path of a script is merely a redirection to the last deployed hash, but all hash lives permanently forever. This make sure that if you refer to a script by its hash, its behavior is guaranteed to stay the same even if a new hash get redeployed at the same path.

<br/>

![Recap Draft and Deploy](./recap_draft_and_deploy.png)