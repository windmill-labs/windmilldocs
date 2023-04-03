# Mailchimp Integration


To integrate [Mailchimp](https://mailchimp.com/) on Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add Mailchimp Resource](../assets/integrations/add-mailchimp.png)

| Property | Type    | Description                                        | Default | Required | Where to Find                                                 |
|----------|---------|----------------------------------------------------|---------|----------|---------------------------------------------------------------|
| api_key  | string  | Mailchimp API key                                  |         | false    | Mailchimp > Account > Extras > API keys > Create A Key        |
| server   | string  | The data center for your Mailchimp account (e.g., us12) |         | false    | Found in your API key (e.g., "us12" in "123abc-us12")         |



<br/><br/>

:::tip

Find some pre-set interactions with Mailchimp on the [Hub](https://hub.windmill.dev/integrations/mailchimp).

Feel free to create your own Mailchimp scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::