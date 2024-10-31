# Discord integration

[Discord](https://discord.com/) is a voice, video, and text communication platform.

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_discord_resource.mp4"
/>
<br/>

To integrate Discord to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

| Property    | Type   | Description             | Default | Required | Where to Find                                                                               |
| ----------- | ------ | ----------------------- | ------- | -------- | ------------------------------------------------------------------------------------------- |
| webhook_url | string | The Discord webhook URL |         | true     | Discord Server > Server Settings > Integrations > Webhooks > Create Webhook or Edit Webhook |

<br/>

Windmill also defined a [resource type](https://hub.windmill.dev/resource_types/104/discord_bot_configuration) for Discord bots. An example is given by our [Documentation Discord bot using Supabase and OpenAI's GPT to help support teams](/blog/knowledge-base-discord-bot) tutorial.


:::tip Windmill Discord

Windmill has its own Discord server for its community, questions and collaborations.

Join following [this link](https://discord.com/invite/V7PM2YHsPB).

:::

<br/>

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

Find some pre-set interactions with Discord on the [Hub](https://hub.windmill.dev/integrations/discord).

Feel free to create your own Discord scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
