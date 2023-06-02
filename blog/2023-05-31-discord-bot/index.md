---
slug: knowledge-base-discord-bot
title: Build a Powerful Discord Bot using Windmill, OpenAi, and Supabase for Product Documentation Assistance
authors: [fatonramadani]
tags:
  [
    'Discord bot',
    'Product documentation',
    'Windmill',
    'OpenAI',
    'Supabase',
    'Knowledge base',
    'Natural language processing',
    'AI-powered assistance',
    'Developer tools',
    'Documentation automation'
  ]
image: ./ai-bot.png
---

![AI BOT](./ai-bot.png 'AI BOT')
_**Midjourney prompt:** a blog cover about a discord bot that answers questions about technical documentations, surrended by books --aspect 3:2_

## Introduction

Windmill is a low-code platform that allows you to build powerful automation workflows. It is a great tool for building developer tools, automating your business processes, and building internal tools. Today, we will be using Windmill to build a Discord Bot that can answer questions about Windmill documentation.

## Create an application on Discord Developer Portal

1. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create a new application.
2. Give your application a name and click on the `Create` button.
3. Go to the `Bot` tab and click on the `Add Bot` button.

## Configure your Discord Bot command

To configure your Discord Bot command, you need to curl the command configuration to the Discord API.

See the Discord API documentation for more information: https://discord.com/developers/docs/interactions/slash-commands#registering-a-command

## Create a scheduled flow that scrapes the Windmill documentation

![Flow](./flow.png 'Create a scheduled flow that scrapes the Windmill documentation')

It is composed in the following way:

- Scrape the Windmill documentation from GitHub using the Oktokit API.

Then we use a for-loop to iterate over the results and run the following step for each result:

1. Create the embeddings using OpenAI
2. Store the embeddings in Supabase using pgvector

### Schedule the flow

We can schedule the flow to run every month.

1. Go the Settings
2. Click on the `Schedule` tab
3. Edit the Cron expression to run every month: `0 0 1 * *`
4. Enable the schedule

#### Learn more about Windmill

<div class="grid grid-cols-2 gap-2 mb-4">

  <a href="/docs/flows/flow_loops" className="windmill-documentation-card" target="_blank">
    <div className="text-lg font-semibold text-gray-900">For loops</div>
   	<div className="text-sm text-gray-500">For loops documentation</div>
  </a>
	<a href="/docs/core_concepts/scheduling" className="windmill-documentation-card" target="_blank">
    <div className="text-lg font-semibold text-gray-900">Schedule</div>
   	<div className="text-sm text-gray-500">Learn how you can schedule a flow</div>
  </a>
</div>

### Scraping the Windmill documentation

Using the Oktokit API, we can get the Windmill documentation from GitHub.

Notice that the script take a special parameter `gh_auth` which is a Windmill resource that contains the GitHub token.

#### Learn more about Windmill resources

<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/core_concepts/resources_and_types" className="windmill-documentation-card" target="_blank">
    <div className="text-lg font-semibold text-gray-900">Resources</div>
   	<div className="text-sm text-gray-500">Create and manager your resources</div>
  </a>
</div>

```typescript
import * as wmill from 'https://deno.land/x/windmill@v1.85.0/mod.ts';
import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';

/**
 * @param owner The account owner of the repository. The name is not case sensitive.
 *
 * @param repo The name of the repository. The name is not case sensitive.
 *
 * @param path The path to the file or directory.
 * If omitted, the contents of the repository's root directory will be returned.
 *
 * @param ref The name of the commit/branch/tag. Defaults to the default branch of the repository.
 *
 * @param result_format The kind of data to be returned. This controls how the result is structured.
 * Learn more at https://docs.github.com/en/rest/repos/contents#get-repository-content
 */
export async function main(
	gh_auth: wmill.Resource<'github'>,
	owner: string,
	repo: string,
	path?: string,
	ref?: string,
	result_format: 'github_object' | 'json' = 'github_object'
): Promise<string[]> {
	const octokit = new Octokit({ auth: gh_auth.token });

	const response = await octokit.request(
		`GET /repos/{owner}/{repo}/contents/${path}${ref ? '?ref=' + ref : ''}`,
		{
			owner,
			repo,
			headers: {
				'X-GitHub-Api-Version': '2022-11-28',
				Accept: `application/${result_format === 'json' ? 'vnd.github+json' : 'vnd.github.object'}`
			}
		}
	);

	const entries = response.data.entries;

	const fileContents: string[] = [];

	for (const entry of entries) {
		if (entry.type === 'file') {
			const isMarkdown = entry.name.endsWith('.md');
			const isMDX = entry.name.endsWith('.mdx');

			if (isMarkdown || isMDX) {
				const contentResponse = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
					owner,
					repo,
					path: entry.path,
					headers: {
						'X-GitHub-Api-Version': '2022-11-28',
						Accept: 'application/vnd.github.v3.raw' // Request raw content of the file
					}
				});

				const content = contentResponse.data as string;

				if (isMarkdown) {
					// Process markdown content
					fileContents.push(content);
				} else if (isMDX) {
					// Process MDX content
					// Convert MDX to markdown and add it to fileContents
					const mdxToMarkdown = await octokit.request('POST /markdown', {
						text: content,
						mode: 'markdown',
						headers: {
							'X-GitHub-Api-Version': '2022-11-28',
							Accept: 'application/vnd.github.v3+json'
						}
					});

					fileContents.push(mdxToMarkdown.data);
				}
			}
		} else if (entry.type === 'dir') {
			// Recursively process directories
			const dirContents = await main(gh_auth, owner, repo, entry.path, ref, result_format);
			fileContents.push(...dirContents);
		}
	}

	return fileContents;
}
```

### Create the embeddings

Using the OpenAI API, we can create embeddings for each of the documents.

```typescript
import type { Resource } from 'https://deno.land/x/windmill@v1.85.0/mod.ts';
import { Configuration, OpenAIApi } from 'npm:openai@3.1.0';

export async function main(
	auth: Resource<'openai'>,
	prompt: string,
	model: string = 'text-embedding-ada-002'
) {
	const configuration = new Configuration({
		apiKey: auth.api_key,
		organization: auth.organization_id
	});
	const openai = new OpenAIApi(configuration);

	const response = await openai.createEmbedding({
		model,
		input: prompt
	});

	const [{ embedding }] = response.data.data;
	return embedding;
}
```

Notice about leverages Deno to import the OpenAI API client.

### Store the embeddings on Supabase

Finally, we can store the embeddings in Supabase using the [pgvector](https://supabase.com/docs/guides/database/extensions/pgvector) extension.

```typescript
import { Resource } from 'https://deno.land/x/windmill@v1.85.0/mod.ts';

export async function main(auth: Resource<'supabase'>, embedding: any, document: string) {
	const query: any = await client.from('documents').insert({
		content: document,
		embedding
	});

	return query;
}
```

## Create the Discord Interaction endpoint

Every Windmill scripts or flows exposes a webhook endpoint that can be used to trigger the script or flow.

We can create a new flow that will be triggered by the Discord Interaction endpoint.

The flow input consists of the following parameters:

- `x_signature_ed25519`: The `X-Signature-Ed25519` header from the Discord request
- `x_signature_timestamp`: The `X-Signature-Timestamp` header from the Discord request
- `raw_string`: The stringified interaction payload from the Discord request

#### Learn more about Webhooks

<div class="grid grid-cols-2 gap-2 mb-4">
  <a href="/docs/core_concepts/webhooks" className="windmill-documentation-card" target="_blank">
    <div className="text-lg font-semibold text-gray-900">Webhooks</div>
   	<div className="text-sm text-gray-500">Interact with Flows using Webhooks</div>
  </a>
</div>

### Building the URL for the Discord Interaction endpoint

1. Go into the Webhooks section of the flow details page
2. Copy the `Result/Sync` webhook URL
3. Create a webhook-specific token

Windmill supports a special query parameter `?include_header=<header1>,<header2>` that can be used to pipe headers from the request to the script or flow parameters.

We will need to include the `X-Signature-Ed25519` and `X-Signature-Timestamp` headers in the request to verfiy the Discord request.

The URL should look like this:

```
{Result/Sync URL}?include_header=X-Signature-Ed25519,X-Signature-Timestamp&raw=true&token={Webhook-specific token}
```

Copy and paste this URL into the Discord Interaction endpoint.

![Building the URL for the Discord Interaction endpoint](./discord-interactions-endpoint.png 'Building the URL for the Discord Interaction endpoint')

### Verifying the Discord request and Defer

```typescript
import { REST } from 'npm:@discordjs/rest@1.7.1';
import { API } from 'npm:@discordjs/core@0.6.0';
import { Resource } from 'https://deno.land/x/windmill@v1.108.0/mod.ts';
import { JobService } from 'https://deno.land/x/windmill@v1.104.2/mod.ts';

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
	raw_string: string,
	token: string,
	discord_config: Resource<'c_discord_bot'>,
	workspace: string,
	discordAnswerFlowPath: string
) {
	const rest = new REST({ version: '10' }).setToken(token);
	const api = new API(rest);

	const interaction: DiscordInteraction = JSON.parse(raw_string);

	const isVerified = verifyKey(
		raw_string,
		x_signature_ed25519,
		x_signature_timestamp,
		discord_config.public_key
	);

	if (!isVerified) {
		throw new Error('Bot token is not valid');
	}

	// If we get a PING, we need to respond with a PONG
	const type = interaction.type as InteractionType;
	if (type === InteractionType.PING) {
		return { type: InteractionResponseType.PONG };
	}

	// https://discord.js.org/docs/packages/core/0.6.0/InteractionsAPI:Class#defer
	await api.interactions.defer(interaction.id, interaction.token);

	await JobService.runFlowByPath({
		workspace,
		path: discordAnswerFlowPath,
		requestBody: {
			interaction
		}
	});
}
```

After verifying the request, we can defer the request to Discord using the `api.interactions.defer` method.
Now we can run the `discordAnswerFlowPath` flow that will generate the answer and send it back to Discord.

## Create the Discord Answer flow

![Create the Discord Answer flow](./answer-flow.png 'Create the Discord Answer flow')

This flow will generate the answer and send it back to Discord. It is composed of the following steps:

1. Extract the question from the Discord request
2. Create the answer using the question and the embeddings and OpenAI
3. Send the answer back to Discord

### Extract the question from the Discord request

```typescript
export async function main(interaction: any) {
	return interaction?.data?.options?.[0]?.value ?? 'No question asked';
}
```

### Create the answer using the question and the embeddings and OpenAI

```typescript
import * as wmill from 'https://deno.land/x/windmill@v1.104.2/mod.ts';

import { refreshAndRetryIfExpired } from 'https://deno.land/x/windmill_helpers@v1.1.1/mod.ts';
import { Configuration, OpenAIApi } from 'npm:openai@3.1.0';
import { stripIndent } from 'https://esm.sh/common-tags@1.8.2';

export async function main(
	query: string,
	supabaseAuth: wmill.Resource<'supabase'>,
	openAiAuth: wmill.Resource<'openai'>,
	token?: {
		access: string;
		refresh: string;
		expires_at?: number;
	}
) {
	let answer = '';

	await refreshAndRetryIfExpired(supabaseAuth, token, async (client) => {
		// OpenAI recommends replacing newlines with spaces for best results
		const input = query.replace(/\n/g, ' ');

		const configuration = new Configuration({
			apiKey: openAiAuth.api_key,
			organization: openAiAuth.organization_id
		});
		const openai = new OpenAIApi(configuration);

		// Generate a one-time embedding for the query itself
		const embeddingResponse = await openai.createEmbedding({
			model: 'text-embedding-ada-002',
			input
		});

		const [{ embedding }] = embeddingResponse.data.data;

		// Fetching whole documents for this simple example.
		//
		// Ideally for context injection, documents are chunked into
		// smaller sections at earlier pre-processing/embedding step.
		const { data: documents } = await client.rpc('match_documents', {
			query_embedding: embedding,
			match_threshold: 0.78, // Choose an appropriate threshold for your data
			match_count: 10 // Choose the number of matches
		});

		let contextText = '';

		// Concat matched documents
		for (let i = 0; i < documents.length; i++) {
			const document = documents[i];
			const content = document.content;
			contextText += `${content.trim()}\n---\n`;
		}

		const prompt = stripIndent`
		You're a super enthusiastic Windmill representative who absolutely 
		loves helping people! Using the sections given from the Windmill 
		documentation, answer the question using only that information, 
		formatted in markdown. If you're not sure and the answer isn't 
		explicitly mentioned in the documentation,
		just say "Sorry, I don't know how to help with that."

    Context sections:
    ${contextText}

    Question: """
    ${query}
    """

    Answer as markdown (including related code snippets if available):
  `;

		// In production we should handle possible errors
		const completionResponse = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt,
			max_tokens: 512, // Choose the max allowed tokens in completion
			temperature: 0 // Set to 0 for deterministic results
		});

		const {
			id,
			choices: [{ text }]
		} = completionResponse.data;

		answer = text;
	});

	return answer.replaceAll('\n', '');
}
```

### Send the answer back to Discord

```typescript
import { REST } from 'npm:@discordjs/rest@1.7.1';
import { API } from 'npm:@discordjs/core@0.6.0';

type DiscordInteraction = {
	application_id: string;
	token: string;
};

export async function main(
	interaction: DiscordInteraction,
	question: string,
	answer: string,
	token: string
) {
	const rest = new REST({
		version: '10'
	}).setToken(token);
	const api = new API(rest);

	await api.interactions.editReply(interaction.application_id, interaction.token, {
		content: `## Question:\n ${question}\n ## Answer:\n ${JSON.stringify(answer)}`
	});
}
```

## Demo

On Discord, you can now ask questions to the bot and get answers from the Windmill documentation.

```
/windmill-help question: How can I Run Docker Containers?
```

![Demo](./demo.png 'Demo')

## Going further

This tutorial is just a simple example of what you can do with Windmill. You can go further by:

- Formatting the answer in a better way

## Conclusion

I hope you enjoyed this tutorial. If you have any questions, feel free to reach out to me on the [Windmill Discord](https://discord.com/invite/V7PM2YHsPB).
