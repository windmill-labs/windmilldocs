# Running Services with Perpetual Scripts

Perpetual scripts restart upon ending unless canceled.

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/5uw3JWiIFp0?vq=hd1080"
	title="Perpetual Scripts"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-xl object-cover w-full dark:border-gray-800"
></iframe>

## How to Enable Perpetual Scripts

In the script's [Settings](./settings.mdx), go to the Runtime tab and enable "Perpetual Script", then [Deploy](../core_concepts/0_draft_and_deploy/index.mdx) the script.

## How to Disable Perpetual Scripts

Canceling one [job](../core_concepts/20_jobs/index.mdx) from a perpetual script is enough to disable it. You can do it from "Cancel" button.

![Cancel perpetual script](../assets/script_editor/cancel.png "Cancel perpetual script")

You can also click on "Scale down to zero" in the "Current runs" tab.

![Scale down to zero](../assets/script_editor/scale_down_to_zero.png "Scale down to zero")