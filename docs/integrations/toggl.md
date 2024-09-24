# Toggl integration

[Toggl](https://toggl.com/) is a time tracking software.

To integrate Toggl to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add Toggl Resource](../assets/integrations/add-toggl.png.webp)

| Property | Type   | Description | Required | Where to find                                                |
| -------- | ------ | ----------- | -------- | ------------------------------------------------------------ |
| token    | string | API token   | true     | 1. Go to https://track.toggl.com/profile 2. Find "API Token" |

<br/><br/>

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

Feel free to create your own Toggl scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
