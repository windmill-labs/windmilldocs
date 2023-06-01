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

## Technical Details

Building your own custom Knowledge Base Discord Bot is a great way to provide your users with a more personalized experience. In this tutorial, we will be using Windmill, OpenAI, and Supabase to build a Discord Bot that can answer questions about Windmill documentation.

It involves 1 flow and a few scripts:

1. Create a scheduled flow that scrapes the Windmill documentation pre-processes the data and stores embeddings in Supabase using [pgvector](https://supabase.com/docs/guides/database/extensions/pgvector)

2. Create a script that will be triggered by a Discord command using the Interactions Endpoint URL.

3. Create a script that will fired the script above that will generate the answer and send it back to the Discord channel.

4. Create a script that actually create the answers using OpenAI and Supabase.

Basically, the entire stack will look like this:

- Once a month, the scheduled flow will scrape the Windmill documentation and store the data in Supabase.

- The scheduled flow will also pre-process the data and store the embeddings in Supabase using pgvector.

- When a user asks a question in Discord, the Discord command will trigger a script that will fire another script that will generate the answer using OpenAI and Supabase

- The answer will be sent back to the Discord channel.

The URL will be in the following format:

## Scheduled flow

![Audience Management Case Study](./flow.png 'Audience Management Case Study')

First, let's scrap the Windmill documentation from GitHub. We will use the Oktokit API to get the data.

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

We basically get the content of all `.md` and `.mdx` files in the Windmill documentation repository.

Next, we will add a loop that for each file content, will create the embeddings and store them in Supabase using pgvector.

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

We will now store the embeddings in Supabase:

```typescript
import { Resource } from 'https://deno.land/x/windmill@v1.85.0/mod.ts';
import { refreshAndRetryIfExpired } from 'https://deno.land/x/windmill_helpers@v1.1.1/mod.ts';

export async function main(
	auth: Resource<'supabase'>,
	embedding: any,
	document: string,
	token?: {
		access: string;
		refresh: string;
		expires_at?: number;
	}
) {
	return await refreshAndRetryIfExpired(auth, token, async (client) => {
		const query: any = await client.from('documents').insert({
			content: document,
			embedding
		});

		return query;
	});
}
```

## Bot handle script

```
{ROOT_URL}{SCRIPT_PATH}?include_header=X-Signature-Ed25519,X-Signature-Timestamp&raw=true&token={TOKEN}
```

- ROOT_URL: We need to use the sync webhook URL from Windmill.
- SCRIPT_PATH: The path to the script that will be triggered by the Discord command.
- TOKEN: The token that will be used to authenticate the request. We suggest you create a webhook-specific token for this purpose.

```typescript
import * as wmill from 'https://deno.land/x/windmill@v1.104.2/mod.ts';
import { InteractionResponseType, verifyKey } from 'npm:discord-interactions@3.4.0';

export async function main(
	x_signature_ed25519: string,
	x_signature_timestamp: string,
	raw_string: any
) {
	const discord_config = await wmill.getResource('YOUR_RESOURCE');

	const isVerified = verifyKey(
		raw_string,
		x_signature_ed25519,
		x_signature_timestamp,
		discord_config.public_key
	);

	if (!isVerified) {
		return { windmill_status_code: 401 };
	}

	const interaction = JSON.parse(raw_string);

	await wmill.JobService.runScriptByPath({
		workspace: 'YOUR_WORKSPACE',
		path: 'YOUR_PATH',
		requestBody: {
			interaction
		}
	});

	return { type: InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE };
}
```

Including `X-Signature-Ed25519` and `X-Signature-Timestamp` in the request URL as query parameters will pass those headers to the script as arguments.

Generating the answer might take some time, so we need to respond with `InteractionResponseType.DEFERRED_CHANNEL_MESSAGE_WITH_SOURCE` to let Discord know that we received the request and we are working on it. It will display a loading message in the channel.

Just before we return the response, we need to run a script that will generate the answer and send it back to the Discord channel.

We can use the JobService to run a script by path. We need to pass the workspace and the path to the script. We also need to pass the interaction object as a request body.

## Generate answer script

```typescript
import { main as createAnswer } from '/f/discordBot/createAnswer.ts';

export async function main(interaction: any) {
	const question = interaction?.data?.options?.[0]?.value;
	const answer = await createAnswer(question);

	const BOT_TOKEN = 'YOUR_BOT_TOKEN';
	const root = 'https://discord.com/api/v10';

	const url = `${root}/webhooks/${interaction.application_id}/${interaction.token}/messages/@original`;

	await fetch(url, {
		method: 'PATCH',
		headers: {
			Authorization: `Bot ${BOT_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			content: `## Question: ${question} ## Answer ${JSON.stringify(answer)}`
		})
	});
}
```

Here we are importing the `createAnswer` script that will generate the answer using OpenAI and Supabase using plain import syntax. It justs works!

Basically as soon as we get an answer, we need to send it back to the Discord channel. We can use the `PATCH` method to update the original message.

You can find the Discord documentation [here](https://discord.com/developers/docs/interactions/receiving-and-responding#edit-original-interaction-response).

## Create answer script

```typescript
import * as wmill from 'https://deno.land/x/windmill@v1.104.2/mod.ts';

import { refreshAndRetryIfExpired } from 'https://deno.land/x/windmill_helpers@v1.1.1/mod.ts';
import { Configuration, OpenAIApi } from 'npm:openai@3.1.0';
import { stripIndent } from 'https://esm.sh/common-tags@1.8.2';

export async function main(
	query: string,
	token?: {
		access: string;
		refresh: string;
		expires_at?: number;
	}
) {
	const auth = await wmill.getResource('YOUR_SUPABASE_AUTH_RESOURCE');
	const openAiAuth = await wmill.getResource('YOUR_OPENAI_AUTH_RESOURCE');

	let answer = '';

	await refreshAndRetryIfExpired(auth, token, async (client) => {
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
    You are a very enthusiastic Windmill representative who loves
    to help people! Given the following sections from the Windmill
    documentation, answer the question using only that information,
    outputted in markdown format. If you are unsure and the answer
    is not explicitly written in the documentation, say
    "Sorry, I don't know how to help with that.

    Context sections:
    ${contextText}

    Question: """
    ${query}
    """

    Answer as markdown (including related code snippets if available):
  `;

		const completionResponse = await openai.createCompletion({
			model: 'text-davinci-003',
			prompt,
			max_tokens: 512,
			temperature: 0
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

This script is a bit more complex. We are using the `refreshAndRetryIfExpired` helper to refresh the Supabase token if it is expired. We are also using the `stripIndent` helper to format the prompt.

## Final thoughts

This is just a simple example of what you can do with Windmill. You can use it to build any kind of Discord bot. You can also use it to build any kind of application that needs to interact with Discord.
