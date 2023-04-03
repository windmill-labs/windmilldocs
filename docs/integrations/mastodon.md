# Mastodon Integration


To integrate [Mastodon](https://mastodon.social/) on Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add Mastodon Resource](../assets/integrations/add-mastodon.png)

| Property | Type    | Description                                             | Default | Required | Where to Find                                                                                     |
|----------|---------|---------------------------------------------------------|---------|----------|---------------------------------------------------------------------------------------------------|
| baseUrl  | string  | The URL of the Mastodon instance (e.g., "https://mastodon.example.com") |         | true     | Provided by your Mastodon hosting provider or Mastodon instance URL for self-hosted instances     |
| token    | string  | An access token to act as a logged-in user               |         | false    | Mastodon > Preferences > Development > Your Applications > New Application > Generate access token |



<br/><br/>

:::tip

Find some pre-set interactions with Mastodon on the [Hub](https://hub.windmill.dev/integrations/mastodon).

Feel free to create your own Mastodon scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::