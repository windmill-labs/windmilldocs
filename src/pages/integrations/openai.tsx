import React from 'react';

import {
	Play,
	MessageSquare,
	Image,
	Grid3x3,
	MessageCircleOff,
	AudioLines
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function OpenAI() {
	const color = '#00A67D';
	const name = 'OpenAI';
	const website = 'https://openai.com/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/openai.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
				    is an AI research lab that develops advanced AI technologies.
				</p>
				<p>
					Connecting <a href="/">
						<strong>
							<span style={{ color: '#3b82f6' }}>Windmill</span>
						</strong>
					</a>{' '} to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
                <p>
					Windmill also embeds OpenAI with <a href="/windmill_ai">
						<strong>
							<span style={{ color: '#9333ea' }}>Windmill AI</span>
						</strong>
					</a>{' '} to provide assitance in the creation of scripts, flows or apps.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from Windmill Hub community library. Windmill supports scripts in TypeScript, Python, Go, PHP, Bash and SQL.`,
		hubIntegrations: [
            {
              title: 'Create completion',
              link: 'https://hub.windmill.dev/scripts/openai/1452/create-completion-openai',
              description: 'Creates a completion for the provided prompt and parameters.',
              icon: Play
            },
            {
              title: 'Create chat completion',
              link: 'https://hub.windmill.dev/scripts/openai/1570/create-chat-completion-openai',
              description: 'Creates a model response for the given chat conversation.',
              icon: MessageSquare
            },
            {
              title: 'Generate image',
              link: 'https://hub.windmill.dev/scripts/openai/1451/generate-image-openai',
              description: 'Generates an image from the given prompt.',
              icon: Image
            },
            {
              title: 'Create embedding',
              link: 'https://hub.windmill.dev/scripts/openai/1454/create-embedding-openai',
              description: 'Creates an embedding vector representing the input text.',
              icon: Grid3x3
            },
            {
              title: 'Create moderation',
              link: 'https://hub.windmill.dev/scripts/openai/1453/create-moderation-openai',
              description: 'Classifies if text is potentially harmful.',
              icon: MessageCircleOff
            },
            {
              title: 'Create translation',
              link: 'https://hub.windmill.dev/scripts/openai/1571/create-translation-openai',
              description: 'Translates audio into English.',
              icon: AudioLines
            }
          ]
          
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
