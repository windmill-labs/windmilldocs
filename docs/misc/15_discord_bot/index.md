# Discord Bot

When creating a Discord bot, you might encounter the following problems:

## Deferring an interaction

Discord requires you to respond to an interaction within 3 seconds. If you need more time to process the interaction, you can defer the interaction. This will show a loading state to the user for 15 minutes.

You can create a script that defers the interaction and then runs a flow or a script to process the interaction.

```ts
import { REST } from 'npm:@discordjs/rest@1.7.1';
import { API, MessageFlags } from 'npm:@discordjs/core@0.6.0';
import { JobService } from 'https://deno.land/x/windmill@v1.147.3/mod.ts';

import {
	InteractionResponseType,
	InteractionType,
	verifyKey
} from 'npm:discord-interactions@3.4.0';

type DiscordInteraction = {
	id: string;
	token: string;
	type: InteractionType;
};

export async function main(
	x_signature_ed25519: string,
	x_signature_timestamp: string,
	raw_string: string
) {
	const token = 'YOUR_TOKEN';
	const public_key = 'YOUR_PUBLIC_KEY';

	const rest = new REST({ version: '10' }).setToken(token);
	const api = new API(rest);
	const interaction: DiscordInteraction = JSON.parse(raw_string);

	// We'll need the http request body as a string and the two headers to verify the request signature
	// https://discord.com/developers/docs/interactions/receiving-and-responding#security-and-authorization
	const isVerified = verifyKey(raw_string, x_signature_ed25519, x_signature_timestamp, public_key);

	if (!isVerified) {
		throw new Error('The request signature is not valid');
	}

	// If we get a PING, we need to respond with a PONG
	const type = interaction.type as InteractionType;
	if (type === InteractionType.PING) {
		return { type: InteractionResponseType.PONG };
	}

	// Run a script or a flow with the interaction data
	await JobService.runFlowByPath({
		workspace: 'YOUR_WORKSPACE',
		path: 'YOUR_FLOW_PATH',
		requestBody: {
			interaction: JSON.parse(raw_string)
		}
	});

	await api.interactions.defer(interaction.id, interaction.token);
}
```

Now we can deploy this script to Windmill and register a sync webhook as the Interactions Endpoint URL in the Discord Developer Portal.
We will seed to include the raw body, pipe the signature headers and add our token as a query parameter.
{DEPLOYED_SCRIPT_SYNC_WEBHOOK}?include_header=X-Signature-Ed25519,X-Signature-Timestamp&raw=true&token={YOUR_TOKEN}
