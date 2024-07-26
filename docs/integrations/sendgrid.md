# SendGrid Integration

[SendGrid](https://sendgrid.com/) is an email API and delivery service.

To integrate SendGrid to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add SendGrid Resource](../assets/integrations/add-sendgrid.png.webp)

| Property | Type   | Description | Required | Where to find                                                                      |
| -------- | ------ | ----------- | -------- | ---------------------------------------------------------------------------------- |
| token    | string | API token   | true     | 1. https://app.sendgrid.com/settings/api_keys 2.Create an API key 3. Copy your key |

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

Find some pre-set interactions with SendGrid on the [Hub](https://hub.windmill.dev/integrations/sendgrid).

Feel free to create your own SendGrid scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
