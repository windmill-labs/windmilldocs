# Matrix Integration

To integrate [Matrix](https://matrix.org/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add Matrix Resource](../assets/integrations/add-matrix.png)

| Property | Type   | Description                                                     | Default | Required | Where to Find                                                                             |
| -------- | ------ | --------------------------------------------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------- |
| baseUrl  | string | The URL of a Matrix server (e.g., "https://matrix.example.com") |         | true     | Provided by your Matrix hosting provider or Matrix instance URL for self-hosted instances |
| token    | string | An access token to act as a logged-in user                      |         | false    | Matrix > Settings > Security & Privacy > Access Token > Reveal Access Token               |

<br/><br/>

:::tip

Find some pre-set interactions with Matrix on the [Hub](https://hub.windmill.dev/integrations/matrix).

Feel free to create your own Matrix scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
