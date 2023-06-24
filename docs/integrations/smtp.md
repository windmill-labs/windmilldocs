# SMTP Integration

To integrate SMTP to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add SMTP Resource](../assets/integrations/add-smtp.png)

| Property | Type   | Description            | Required | Where to find                                           |
| -------- | ------ | ---------------------- | -------- | ------------------------------------------------------- |
| host     | string | SMTP host address      | true     | Provided by your SMTP service or email hosting provider |
| port     | number | Port number to connect | false    | Provided by your SMTP service or email hosting provider |
| user     | string | SMTP username          | false    | Provided by your SMTP service or email hosting provider |
| password | string | SMTP password          | false    | Provided by your SMTP service or email hosting provider |

<br/><br/>

:::tip

Find some pre-set interactions with SMTP on the [Hub](https://hub.windmill.dev/integrations/smtp).

Feel free to create your own SMTP scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
