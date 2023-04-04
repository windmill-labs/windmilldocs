# Amazon S3 Integration


To integrate [Amazon S3](https://aws.amazon.com/s3/) to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.md).

![Add RSS Resource](../assets/integrations/add-s3.png)

| Property   | Type    | Description                  | Default | Required | Where to Find                                      |
|------------|---------|------------------------------|---------|----------|----------------------------------------------------|
| endPoint   | string  | S3 endpoint                  |         | true     | AWS Management Console or Custom S3-compatible API |
| port       | number  | S3 port                      |         | false    | AWS Management Console or Custom S3-compatible API |
| useSSL     | boolean | Use SSL for connections      | true    | false    | AWS Management Console or Custom S3-compatible API |
| pathStyle  | boolean | Use path-style addressing    | false   | false    | AWS Management Console or Custom S3-compatible API |
| bucket     | string  | S3 bucket name               |         | true     | AWS Management Console                             |
| accessKey  | string  | AWS access key               |         | false    | AWS Management Console (IAM)                       |
| secretKey  | string  | AWS secret key               |         | false    | AWS Management Console (IAM)                       |
| region     | string  | AWS region for the S3 bucket |         | true     | AWS Management Console                             |



<br/><br/>

:::tip

Find some pre-set interactions with S3 on the [Hub](https://hub.windmill.dev/integrations/s3).

Feel free to create your own S3 scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.md).

:::