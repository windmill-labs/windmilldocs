import React from 'react';

import {
	HashIcon,
	MessageSquare,
	FileClock,
	XCircle,
    LayoutPanelLeft,
	Command
} from 'lucide-react';
import Solution from '../../components/Solutions';

export default function Content() {
	const color = '#821984';
	const name = 'Slack';
	const website = "https://slack.com/";

	const data = {
		title: `APIs, workflows and UIs with ${name}`,
		subtitle: `Create workflows, data pipelines, endpoints or admin panels that interact with ${name}.`,
        logo: '/third_party_logos/slack.svg',
		description: (
			<div className="flex flex-col gap-4">
				<p>
					<a href={website} target="_blank">
						<strong>
							<span style={{ color }}>{name}</span>
						</strong>
					</a>{' '}
					is a cloud-based team communication platform.
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
					From scripts supported in multiple languages, build UIs and flows that you can monitor and
					trigger on demand, by schedule or webhooks.
				</p>
			</div>
		),
		integrations_sub_title: `Write any script, flow or app targeting ${name} API, or pick them from Windmill Hub community library. Windmill supports scripts in TypeScript, Python, Go, PHP, Bash and SQL.`,
		hubIntegrations: [
			{
				title: 'Send Message to Channel',
				link: 'https://hub.windmill.dev/scripts/slack/1284/send-message-to-channel-slack',
				description: 'Send a message in a given Slack channel.',
				icon: HashIcon
			},
			{
				title: 'Send Direct Message',
				description: 'Send a direct Slack message to a user from email.',
				link: 'https://hub.windmill.dev/scripts/slack/1432/send-direct-message-slack',
				icon: MessageSquare
			},
			{
				title: 'List Conversation History',
				link: 'https://hub.windmill.dev/scripts/slack/1199/list-conversation-history-slack',
				description: 'List conversation history in a given channel.',
				icon: FileClock
			},
			{
				title: 'Send Error to Slack Channel',
				link: 'https://hub.windmill.dev/scripts/slack/1525/send-error-to-slack-channel-slack',
				description: 'Send a message on Slack when error in a Windmill workspace.',
				icon: XCircle
			},
			{
				title: 'Send App Report',
				link: 'https://hub.windmill.dev/scripts/slack/6940/send-app-report-slack',
				description: 'Send screenshot of a given Windmill App to Slack.',
				icon: LayoutPanelLeft
			},
			{
				title: 'Respond to a Slack command',
				link: 'https://hub.windmill.dev/scripts/slack/1405/example-of-responding-to-a-slack-command-slack',
				description: 'Build a Slackbot answering to /windmill command.',
				icon: Command
			}
		]
	};

	return <Solution data={data} name={name} color={color} website={website}  />;
}
