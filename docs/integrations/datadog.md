# Datadog Integration

To integrate [Datadog](https://www.datadoghq.com/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add Datadog Resource](../assets/integrations/add-datadog.png)

| Property | Type    | Description                             | Default | Required | Where to Find                                                                                     |
|----------|---------|-----------------------------------------|---------|----------|---------------------------------------------------------------------------------------------------|
| apiKey   | string  | Datadog API key for authentication      |         | true     | Datadog Dashboard > Integrations > APIs > API Keys                                               |
| appKey   | string  | Datadog APP key for specific access     |         | false    | Datadog Dashboard > Integrations > APIs > Application Keys                                       |
| apiBase  | string  | Base URL for the Datadog API            |         | false    | Datadog API documentation (default: `https://api.datadoghq.com` or region-specific API base URL) |

<br/><br/>

:::tip

Find some pre-set interactions with Datadog on the [Hub](https://hub.windmill.dev/integrations/datadog).

Feel free to create your own Datadog scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::