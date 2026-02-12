---
description: How do I connect Gmail to Windmill? Send and read emails via the Gmail API from scripts and flows.
---

# Gmail integration

[Gmail](https://mail.google.com/mail/) is a free email service provided by Google.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_gmail_resource.mp4"
/>

<br/>

The Gmail integration is done through OAuth. You just need to sign in from your Google account on your browser. The access will be automatically saved to the workspace as a [resource](../core_concepts/3_resources_and_types/index.mdx).

On [self-hosted instances](../advanced/1_self_host/index.mdx), integrating an OAuth API will require [Setup OAuth and SSO](../misc/2_setup_oauth/index.mdx).

Your resource can be used [passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) or [directly fetched](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx) and [apps](../apps/0_app_editor/index.mdx).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/ggJQtzvqaqA"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br/>

> Example of a Supabase resource being used in two different manners from a script in Windmill.
<br/>

:::tip

Find some pre-set interactions with Gmail on the [Hub](https://hub.windmill.dev/integrations/gmail).

Feel free to create your own Gmail scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
