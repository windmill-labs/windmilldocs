# Appwrite Integration

To integrate [Appwrite](https://appwrite.io/) on Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add Appwrite Resource](../assets/integrations/add-apprite.png)


| Property     | Type    | Description                                                | Default | Required | Where to find                                          |
|--------------|---------|------------------------------------------------------------|---------|----------|--------------------------------------------------------|
| endpoint     | string  | url of your appwrite server                                | https:// | true     | Your Appwrite server's URL                             |
| project      | string  | ID of your appwrite project                                |         | true     | Appwrite Dashboard > Your Project > Settings > ID      |
| key          | string  | API key of your appwrite project                           |         | true     | Appwrite Dashboard > Your Project > API Keys           |
| self_signed  | boolean | use self signed certificates on server (only for development) |         | false    | (This is a configuration option, not found on Appwrite)|

<br/><br/>

:::tip

Feel free to create your own Appwrite scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::