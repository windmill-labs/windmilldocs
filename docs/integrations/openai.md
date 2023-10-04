# OpenAI Integration

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    autoPlay
    loop
    controls
    id="main-video"
    src="/videos/adding_openai_resource.mp4"
/>

<br/>

:::info AI-based programming

If you're interested in AI-based programming check [Windmill AI](../code_editor/ai_generation.mdx).

:::

To integrate [OpenAI](https://openai.com/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

| Property        | Type   | Description                                                                                                   | Default | Required | Where to Find                                                         |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------- |
| api_key         | string | API key for OpenAI                                                                                            |         | true     | OpenAI Dashboard > API Keys > Create new key or view existing keys    |
| organization_id | string | Only needed for users who belong to multiple organizations and want to use an organization other than default |         | false    | OpenAI Dashboard > Account Settings > Organizations > Organization ID |

<br/><br/>

:::tip

Find some pre-set interactions with OpenAI on the [Hub](https://hub.windmill.dev/integrations/openai).

Feel free to create your own OpenAI scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
