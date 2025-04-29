# AWS integration

[AWS](https://aws.amazon.com/) is a cloud computing platform offering various services like computing, storage and databases.

To integrate AWS with Windmill, you can configure either a classic **AWS resource** using access keys, or a more secure **AWS OIDC resource**, which assumes IAM roles via OpenID Connect.

These should be saved as a [resource](../core_concepts/3_resources_and_types/index.mdx).

:::info Self-host

If you're looking for a way to self-host Windmill using AWS, see [Self-Host Windmill](../advanced/1_self_host/index.mdx).

:::

---

## AWS Resource

| Property           | Type   | Description                        | Default | Required | Where to Find                                                             |
| ------------------ | ------ | ---------------------------------- | ------- | -------- | ------------------------------------------------------------------------- |
| awsAccessKeyId     | string | AWS Access Key ID for your account |         | true     | AWS Management Console > IAM > Users > [Your User] > Security Credentials |
| awsSecretAccessKey | string | AWS Secret Access Key for account  |         | true     | AWS Management Console > IAM > Users > [Your User] > Security Credentials |
| region             | string | AWS Region for your resources      |         | false    | AWS Management Console > Top Right Corner (e.g., "N. Virginia")           |

---

## AWS OIDC Resource

| Property | Type   | Description                                         | Default | Required | Where to Find / Define                                                                 |
|----------|--------|-----------------------------------------------------|---------|----------|-----------------------------------------------------------------------------------------|
| roleArn  | string | ARN of the IAM role to assume using OIDC            |         | true     | AWS Management Console > IAM > Roles > [Your Role] > ARN                               |
| region   | string | AWS Region for your resources                       |         | false    | AWS Management Console > Top Right Corner (e.g., "us-west-2")                          |

> ℹ️ Ensure the IAM role trusts Windmill's OIDC provider and has sufficient permissions for the services you intend to use.

---

## Usage

Your AWS or AWS OIDC resource can be:

- [Passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) to scripts
- [Fetched programmatically](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx), or [apps](../apps/0_app_editor/index.mdx)

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/ggJQtzvqaqA"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br />
> Example of a Supabase resource being used in two different manners from a script in Windmill.
<br />

---

:::tip

Find some pre-set interactions with AWS on the [Hub](https://hub.windmill.dev/integrations/aws_ecr).

Feel free to create your own AWS scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
