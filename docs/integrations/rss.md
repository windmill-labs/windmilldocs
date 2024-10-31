# RSS integration

[RSS](https://rss.com/) is a web feed that allows users and applications to access updates to websites.

To integrate RSS to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add RSS Resource](../assets/integrations/add-rss.png.webp)

| Property | Type   | Description | Default | Required | Where to Find                           |
| -------- | ------ | ----------- | ------- | -------- | --------------------------------------- |
| url      | string | Feed URL    |         | true     | Provided by the RSS feed source website |

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

Find some pre-set interactions with RSS on the [Hub](https://hub.windmill.dev/integrations/RSS).

Feel free to create your own RSS scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
