# Discord Integration

<video
    className="border-2 rounded-xl object-cover w-full h-full"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_discord_resource.mp4"
/>
<br/>

To integrate [Discord](https://discord.com/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

| Property   | Type    | Description             | Default | Required | Where to Find                                                                                |
|------------|---------|-------------------------|---------|----------|----------------------------------------------------------------------------------------------|
| webhook_url| string  | The Discord webhook URL |         | true    | Discord Server > Server Settings > Integrations > Webhooks > Create Webhook or Edit Webhook |

<br/><br/>

:::tip

Find some pre-set interactions with Discord on the [Hub](https://hub.windmill.dev/integrations/discord).

Feel free to create your own Discord scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::