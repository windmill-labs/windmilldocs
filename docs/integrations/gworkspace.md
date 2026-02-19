---
description: How do I connect Google Workspace to Windmill? Manage users, groups, org units and security via the Google Admin Directory API.
---

# Google Workspace integration

[Google Workspace](https://workspace.google.com/) is Google's suite of cloud collaboration tools. The `gworkspace` resource type provides OAuth access to the Google Admin Directory API for managing users, groups, org units, and security settings.

The Google Workspace integration is done through OAuth. You just need to sign in from your Google account on your browser. The access will be automatically saved to the workspace as a [resource](../core_concepts/3_resources_and_types/index.mdx).

The default OAuth scopes are:

- `https://www.googleapis.com/auth/admin.directory.group`
- `https://www.googleapis.com/auth/admin.directory.user`
- `https://www.googleapis.com/auth/admin.directory.user.security`
- `https://www.googleapis.com/auth/admin.directory.orgunit`

On [self-hosted instances](../advanced/1_self_host/index.mdx), integrating an OAuth API will require [Setup OAuth and SSO](../misc/2_setup_oauth/index.mdx).

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

## Native triggers

The `gworkspace` resource type is also used by Google [native triggers](../core_concepts/52_native_triggers/index.mdx) to watch for changes in Google Drive and Google Calendar. When configured through the native triggers workspace integration, the resource is created with different scopes (`drive.readonly`, `calendar.readonly`, `calendar.events`) tailored to receiving push notifications.

:::tip

Find some pre-set interactions with Google Workspace on the [Hub](https://hub.windmill.dev/integrations/gworkspace).

Feel free to create your own Google Workspace scripts on [Windmill](../getting_started/00_how_to_use_windmill/index.mdx).

:::
