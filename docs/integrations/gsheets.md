# Google Sheets Integration

[Google Sheets](https://www.google.com/sheets/about/) is an online spreadsheet application.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_gsheets_resource.mp4"
/>

<br/>

The Google Sheets integration is done through OAuth. You just need to sign in from your Google account on your browser. The access will be automatically saved to the workspace as a [resource](../core_concepts/3_resources_and_types/index.mdx).

On [self-hosted instances](../advanced/1_self_host/index.mdx), integrating an OAuth API will require [Setup OAuth and SSO](../misc/2_setup_oauth/index.mdx).

Your resource can be used [passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) or [directly fetched](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx) and [apps](../apps/0_app_editor/index.mdx).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/add_resources_variables.mp4"
/>

<br/>

:::tip

Find some pre-set interactions with Google Sheets on the [Hub](https://hub.windmill.dev/integrations/gsheets).

Feel free to create your own Google Sheets scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
