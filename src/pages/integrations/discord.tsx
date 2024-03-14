import React from 'react';

import {
	SendHorizonal,
	Pencil,
	Delete,
	Eye,
	LayoutPanelLeftIcon,
	Command
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Discord() {
	const color = '#5566FB';
	const name = 'Discord';
	const website = 'https://discord.com/';

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
		logo: '/third_party_logos/discord.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is an instant messaging social platform.
				</p>
				<p>
					Connecting <a href="/">
						<strong>
							<span style={{ color: '##3b82f6' }}>Windmill</span>
						</strong>
					</a>{' '} to <span> {name}</span> takes a few seconds and lets you build
					internal tools from it and integrate with any other platform.
				</p>
				<p>
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from WindmillHub community library. Windmill supports scripts in TypeScript, Python, Go, Bash and SQL.`,
		hubIntegrations: [
            {
              title: 'Send a message using webhook',
              link: 'https://hub.windmill.dev/scripts/discord/1288/send-a-message-to-discord-using-webhook-discord',
              description: 'Send a message to a Discord channel using a Discord webhook.',
              icon: SendHorizonal
            },
            {
              title: 'Edit message',
              description: 'Edit a message from an id.',
              link: 'https://hub.windmill.dev/scripts/discord/1345/edit-message-discord',
              icon: Pencil
            },
            {
              title: 'Delete message',
              link: 'https://hub.windmill.dev/scripts/discord/113/delete-message-discord',
              description: 'Delete a message from an id.',
              icon: Delete
            },
            {
              title: 'Read last message sent to channel',
              link: 'https://hub.windmill.dev/scripts/discord/7110/read-last-message-sent-to-a-discord-channel-discord',
              description: 'Fetches the last message sent to a given Discord channel.',
              icon: Eye
            },
            {
              title: 'Send app report',
              link: 'https://hub.windmill.dev/scripts/discord/6941/send-app-report-discord',
              description: 'Send a Windmill App report to a Discord channel.',
              icon: LayoutPanelLeftIcon
            },
            {
              title: 'Receive Application Command Sample',
              link: 'https://hub.windmill.dev/scripts/discord/1586/receive-application-command-sample-discord',
              description: 'Handle commands for a Discord bot.',
              icon: Command
            }
          ]
          
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
