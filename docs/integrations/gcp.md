---
description: How do I connect Google Cloud Platform to Windmill? Use GCP services from scripts and flows.
---

# Google Cloud Platform integration

[GCP](https://cloud.google.com/gcp) is a suite of cloud computing services for building and deploying applications.

To integrate GCP to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add Google Cloud Platform Resource](../assets/integrations/add-gcp.png.webp)

:::info Self-host

If you're looking for a way to self-host Windmill using GCP, see [Self-Host Windmill](../advanced/1_self_host/index.mdx).

:::

| Property                    | Type   | Description                                          | Default | Required | Where to Find                                                                                     |
| --------------------------- | ------ | ---------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------- |
| type                        | string | Type of credentials object                           |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| project_id                  | string | Google Cloud Platform project ID                     |         | false    | Google Cloud Console > Home > Project ID                                                          |
| private_key_id              | string | Private key ID for the service account               |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| private_key                 | string | Private key for the service account                  |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| client_email                | string | Email address associated with the service account    |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| client_id                   | string | Client ID for the service account                    |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| auth_uri                    | string | Authentication URI for the service account           |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| token_uri                   | string | Token URI for the service account                    |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| auth_provider_x509_cert_url | string | Auth provider X.509 cert URL for the service account |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |
| client_x509_cert_url        | string | Client X.509 cert URL for the service account        |         | false    | Google Cloud Console > APIs & Services > Credentials > Create service account key > JSON key file |

<br/><br/>

Your resource can be used [passed as parameters](../core_concepts/3_resources_and_types/index.mdx#passing-resources-as-parameters-to-scripts-preferred) or [directly fetched](../core_concepts/3_resources_and_types/index.mdx#fetching-them-from-within-a-script-by-using-the-wmill-client-in-the-respective-language) within [scripts](../script_editor/index.mdx), [flows](../flows/1_flow_editor.mdx), [low-code apps](../apps/0_app_editor/index.mdx) and [full-code apps](../full_code_apps/index.mdx).

<iframe
	style={{ aspectRatio: '16/9' }}
	src="https://www.youtube.com/embed/ggJQtzvqaqA"
	title="YouTube video player"
	frameBorder="0"
	allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
	allowFullScreen
	className="border-2 rounded-lg object-cover w-full dark:border-gray-800"
></iframe>

<br/>

> Example of a Supabase resource being used in two different manners from a script in Windmill.
<br/>

:::tip

Feel free to create your own Google Cloud Platform scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
