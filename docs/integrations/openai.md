---
description: How do I connect OpenAI to Windmill? Use OpenAI APIs for text generation and AI tasks from scripts and flows.
---

# OpenAI integration

[OpenAI](https://openai.com/) is an Artificial Inteligence service provider.

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

To integrate OpenAI to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

| Property        | Type   | Description                                                                                                   | Default | Required | Where to Find                                                         |
| --------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------------- |
| api_key         | string | API key for OpenAI                                                                                            |         | true     | OpenAI Dashboard > API Keys > Create new key or view existing keys    |
| organization_id | string | Only needed for users who belong to multiple organizations and want to use an organization other than default |         | false    | OpenAI Dashboard > Account Settings > Organizations > Organization ID |

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

Find some pre-set interactions with OpenAI on the [Hub](https://hub.windmill.dev/integrations/openai).

Feel free to create your own OpenAI scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
