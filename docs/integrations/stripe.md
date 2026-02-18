---
description: How do I connect Stripe to Windmill? Manage payments, subscriptions and invoices from scripts and flows.
---

# Stripe integration

[Stripe](https://stripe.com/) is a payment processing platform.

To integrate Stripe to Windmill, you need to save the following elements as a [resource](../core_concepts/3_resources_and_types/index.mdx).

![Add Stripe Resource](../assets/integrations/add-stripe.png.webp "Add Stripe Resource")

| Property | Type   | Description | Required | Where to find                                            |
| -------- | ------ | ----------- | -------- | -------------------------------------------------------- |
| token    | string | API token   | true     | Stripe Dashboard -> Developers -> API keys -> Secret key |

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

Find some pre-set interactions with Stripe on the [Hub](https://hub.windmill.dev/integrations/stripe).

Feel free to create your own Stripe scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
