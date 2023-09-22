# Amazon S3 Integration

<video
    className="border-2 rounded-xl object-cover w-full h-full dark:border-gray-800"
    controls
    id="main-video"
    src="/videos/s3_objects_in_bucket.mp4"
/>

<br/>

:::info Self Host

If you're looking for a way to self-host Windmill using AWS, see [Self-Host Windmill](../advanced/1_self_host/index.mdx).

:::

[Amazon S3](https://aws.amazon.com/s3/)'s API follows the same schema as any S3 compatible API.

To integrate Amazon S3 to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

| Property  | Type    | Description                  | Default | Required        | Where to Find                                      | Additional Details                                                                                                                                                                                |
| --------- | ------- | ---------------------------- | ------- | --------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| bucket    | string  | S3 bucket name               |         | true            | AWS Management Console                             | Name of the S3 bucket to access                                                                                                                                                                   |
| region    | string  | AWS region for the S3 bucket |         | true            | AWS Management Console                             | Region where the S3 bucket is located. Can also be found by checking the endpoint URL for the bucket. In the form `eu-west-3`                                                                     |
| useSSL    | boolean | Use SSL for connections      | true    | false           | AWS Management Console or Custom S3-compatible API | SSL/TLS is required for Amazon S3                                                                                                                                                                 |
| endPoint  | string  | S3 endpoint                  |         | true            | AWS Management Console or Custom S3-compatible API | Endpoint URL will vary by region or custom API provider. Can be found in the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/s3.html) in the form `s3.eu-west-3.amazonaws.com`. |
| accessKey | string  | AWS access key               |         | true for Amazon | AWS Management Console (IAM)                       | Access key ID for AWS account owner. Can be found in the IAM section of the AWS Management Console under "My Security Credentials". Make sure the user has the right policies allocated.          |
| pathStyle | boolean | Use path-style addressing    | false   | true            | AWS Management Console or Custom S3-compatible API | Default is virtual-hosted-style URLs                                                                                                                                                              |
| secretKey | string  | AWS secret key               |         | true for Amazon | AWS Management Console (IAM)                       | Secret access key for AWS account owner. Can be found in the IAM section of the AWS Management Console under "My Security Credentials". Make sure the user has the right policies allocated.      |

<br/><br/>

:::tip

Find some pre-set interactions with S3 on the [Hub](https://hub.windmill.dev/integrations/s3).

Feel free to create your own S3 scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
