# ClickHouse Integration

[ClickHouse](https://clickhouse.com/) is an open-source column-oriented database management system.

To integrate ClickHouse to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add ClickHouse Resource](../assets/integrations/add-clickhouse.png.webp)

| Property | Type   | Description                         | Default | Required | Where to Find                                                                                |
| -------- | ------ | ----------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| host     | string | Hostname or IP of ClickHouse server |         | true     | Provided by your hosting provider or found in the ClickHouse config file (`config.xml`)      |
| username | string | Username for ClickHouse connection  |         | false    | Found in the ClickHouse users config file (`users.xml`) or provided by your hosting provider |
| password | string | Password for ClickHouse connection  |         | false    | Found in the ClickHouse users config file (`users.xml`) or provided by your hosting provider |

<br/><br/>

Your resource can be used [passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) or [directly fetched](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx) and [apps](../apps/0_app_editor/index.mdx).

<video
	className="border-2 rounded-lg object-cover w-full h-full dark:border-gray-800"
	controls
	src="/videos/add_resources_variables.mp4"
/>

<br/>

:::tip

Find some pre-set interactions with ClickHouse on the [Hub](https://hub.windmill.dev/integrations/clickhouse).

Feel free to create your own ClickHouse scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
