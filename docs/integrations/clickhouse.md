# Clickhouse Integration

To integrate [Clickhouse](https://clickhouse.com/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add Clickhouse Resource](../assets/integrations/add-clickhouse.png)

| Property | Type   | Description                         | Default | Required | Where to Find                                                                                |
| -------- | ------ | ----------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| host     | string | Hostname or IP of ClickHouse server |         | true     | Provided by your hosting provider or found in the ClickHouse config file (`config.xml`)      |
| username | string | Username for ClickHouse connection  |         | false    | Found in the ClickHouse users config file (`users.xml`) or provided by your hosting provider |
| password | string | Password for ClickHouse connection  |         | false    | Found in the ClickHouse users config file (`users.xml`) or provided by your hosting provider |

<br/><br/>

:::tip

Find some pre-set interactions with Clickhouse on the [Hub](https://hub.windmill.dev/integrations/clickhouse).

Feel free to create your own Clickhouse scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
