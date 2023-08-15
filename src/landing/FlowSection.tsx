import React from 'react';

import {
	List,
	Bug,
	Play,
	CalendarClock,
	FormInput,
	WebhookIcon,
	Terminal,
	RotateCcw,
	Webhook,
	CheckCircle2,
	Calendar
} from 'lucide-react';
import { GitBranch, Repeat, Verified } from 'lucide-react';

import Section from './Section';
import { useDeveloperMode } from '../pages';
import { SiVisualstudiocode } from 'react-icons/si';
import { BoltIcon } from '@heroicons/react/20/solid';

const tabs = [
	{
		label: 'Flow editor',
		icon: List,
		id: 'flow-editor',
		data: [
			{
				title: 'Sequence',
				description: 'Build complex Flows from atomic scripts.',
				icon: List,
				caption: <div>Sequence scripts from your workspace, the <a href="https://hub.windmill.dev/" target="_blank">Hub</a> or <a href="/docs/code_editor" target="_blank">write them</a> directly.</div>,
				video: {
					videoSrc: '/videos/flow-sequence.mp4',
					altText: 'Build flows from scripts',
					videoLength: '49'
				}
			},

			{
				title: 'Branching',
				description: 'Built-in branching logic to create complex workflows.',
				icon: GitBranch,
				caption: <div>Built-in <a href="/docs/flows/flow_branches" target="_blank">branching logic</a> to create complex workflows.</div>,

				video: {
					videoSrc: '/videos/flow-branch.mp4',
					altText: 'Branching logic',
					videoLength: '39'
				}
			},
			{
				title: 'For Loops',
				description: 'Create for loops to iterate over a list of items.',
				icon: Repeat,
				caption: <div>Create <a href="/docs/flows/flow_loops" target="_blank">for loops</a> to iterate over a list of items.</div>,
				video: {
					videoSrc: '/videos/flow-loop.mp4',
					altText: 'Flows for loops',
					videoLength: '18'
				}
			},
			{
				title: 'Error Handler',
				description:
					'Easily recover from errors and continue your flow or log the error on Slack, Discord, etc.',
				icon: Bug,
				caption: <div>Easily <a href="/docs/flows/error_handling" target="_blank">recover from errors</a>  and continue your flow or log the error on Slack, Discord, etc.</div>,
				video: {
					videoSrc: '/videos/error_handler.mp4',
					altText: 'Branching logic',
					videoLength: '33'
				}
			}
		]
	},
	{
		label: 'Suspend/Approval Step',
		icon: Verified,
		id: 'suspend-approval',
		data: [
			{
				title: 'Approval step',
				description:
					'Send request for approval by email, slack, anything and get a dedicate approval page',
				icon: Verified,
				caption: <div>Send <a href="/docs/flows/flow_approval" target="_blank">request for approval</a> by email, slack, anything and get a dedicate approval page.</div>,
				video: {
					videoSrc: '/videos/flow-approval.mp4',
					altText: 'Flows Approval Step',
					videoLength: '64'
				}
			},
			{
				title: 'Resume Workflows with secret webhooks',
				description:
					'Automatically resume workflows with secret webhooks. This is useful for resuming workflows after an approval step.',
				icon: Verified,
				caption: 'Resume Workflows with secret webhooks.',
				imageSrc: '/images/page_arguments.png.webp',
				altText: 'Resume with webhooks'
			}
		]
	},
	{
		label: 'Retries & Cache',
		icon: Repeat,
		id: 'retries',
		data: [
			{
				title: 'Customize number of retries for each individual step',
				description:
					'Automatically retry failed steps. Customize the number of retries for each individual step.',
				icon: Repeat,
				caption: <div>Easily <a href="/docs/flows/retries" target="_blank">retry</a> failed steps.</div>,
				video: {
					videoSrc: '/videos/retries_example.mp4',
					videoLength: '29',
					altText: 'Customize number of retries.'
				}
			},
			{
				title: 'Cache results of steps',
				description:
					'Cache the results of a step for a given time.',
				icon: Repeat,
				caption: <div><a href="/docs/flows/cache" target="_blank">Cache the results of a step</a> for a given time.</div>,
				video: {
					videoSrc: '/videos/cache_for_steps.mp4',
					videoLength: '15',
					altText: 'Customize number of retries'
				}
			}
		]
	},
	/*
	{
		label: 'Hub scripts',
		icon: Globe,
		id: 'hub-scripts',
		data: [
			{
				title: 'Short video of usig a script from the hub',
				description:
					'Automatically retry failed steps. Customize the number of retries for each individual step.',
				icon: Code,
				caption: '',
				imageSrc: ''
			}
		]
	},
	{
		label: 'ETL/Data processing',
		icon: Database,
		id: 'etl-data-processing',
		data: [
			{
				title: 'Shared folder between folders to write and read heavy data',
				description:
					'Automatically retry failed steps. Customize the number of retries for each individual step.',
				icon: Database,
				caption: '',
				imageSrc: ''
			}
		]
	},
	*/
	{
		label: 'Multiple Triggers',
		icon: Play,
		id: 'schedules-webhooks-ui-cli',
		data: [
			{
				title: 'Schedules',
				description:
					'Windmill allows you to define schedules for Scripts and Flows. Once a schedule is defined, it will automatically run the script at the set frequency.',
				icon: CalendarClock,
				caption: <div>Windmill allows you to define <a href="/docs/core_concepts/scheduling" target="_blank">schedules</a> for Scripts and Flows. Once a schedule is defined, it will automatically run the script at the set frequency.</div>,
				imageSrc: '/images/script-schedule.png',

			},

			{
				title: 'UI',
				description: 'You can directly trigger a script using the autogenerated UI.',
				icon: FormInput,
				caption: <div>You can directly trigger a flow using the <a href="/docs/core_concepts/auto_generated_uis" target="_blank">autogenerated UI</a>.</div>,
				video: {
					videoSrc: '/videos/auto_g_ui_flow.mp4',
					altText: 'Trigger with autogenerated UI',
					videoLength: '14'
				}
			},
			{
				title: 'Webhooks',
				description: 'You can trigger a flow using a webhook.',
				icon: WebhookIcon,
				caption: <div>Every flow has a sync and async <a href="/docs/core_concepts/webhooks" target="_blank">webhook</a>.</div>,
				imageSrc: '/images/flow-webhook.png',
				altText: 'Webhooks'
			},
			{
				title: 'CLI',
				description: 'Execute a flow using the CLI.',
				icon: Terminal,
				caption: <div>Execute a flow using the <a href="/docs/advanced/cli" target="_blank">CLI</a>.</div>,
				imageSrc: '/images/setup.gif',
				altText: 'Execute using CLI'
			},
		]
	}
];

const cards = [
	{
		title: 'VSCode extension or any IDEs to edit any step of a flow',
		subtitle:
			'Develop flow steps locally with your favorite code editor, preview them locally and deploy them with the CLI.',
		Icon: SiVisualstudiocode,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/advanced/local_development'
	},
	{
		title: 'Blazing Fast',
		subtitle: "The fastest workflow engine (it's in Rust)",
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/misc/benchmarks'
	},
	{
		title: 'Retries and errors',
		subtitle: 'Retry failed steps, or handle errors',
		Icon: RotateCcw,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/flows/retries'
	},

	{
		title: 'Triggers',
		subtitle: 'Trigger flows from a webhook or schedule',
		Icon: Webhook,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/getting_started/trigger_flows',
		icons: [Calendar, Terminal]
	},

	{
		title: 'Suspend and resume',
		subtitle:
			'Automatically resume workflows with secret webhooks. This is useful for resuming workflows after an approval step.',
		Icon: CheckCircle2,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/flows/flow_approval'
	}
];

const examples = [
	{
		name: <span>Hacker News mentions</span>,
		description: (
			<>
				Whenever an{' '}
				<mark className="leading-none bg-orange-100 text-orange-600 px-2 rounded font-semibold whitespace-nowrap">
					Hacker News
				</mark>{' '}
				message contains a mention, publish it to{' '}
				<a
					href="https://hub.windmill.dev/integrations/slack"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-pink-100 hover:bg-pink-200 px-2 rounded whitespace-nowrap  text-[#611f69] font-semibold">
						Slack
					</mark>
				</a>{' '}
				with NLTK sentiment analysed.
			</>
		),
		href: 'https://hub.windmill.dev/flows/13'
	},
	{
		name: <span>Expense report internal workflow</span>,
		description: (
			<>
				When new expenses are uploaded to{' '}
				<a
					href="https://hub.windmill.dev/integrations/gdrive"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-sky-100 text-sky-600 px-2 rounded font-semibold whitespace-nowrap hover:bg-sky-200">
						Google Drive
					</mark>
				</a>
				, extract text using Tesseract and notify on{' '}
				<a
					href="https://hub.windmill.dev/integrations/slack"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-pink-100 hover:bg-pink-200 px-2 rounded whitespace-nowrap  text-[#611f69] font-semibold">
						Slack
					</mark>
				</a>
				.
			</>
		),
		href: 'https://hub.windmill.dev/flows/21'
	},
	{
		name: <span>Populate Contact Details from Simple Email</span>,
		description: (
			<>
				From a signup’s email, parse the email and make a Google search. Use{' '}
				<a
					href="https://hub.windmill.dev/integrations/openai"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 rounded font-semibold whitespace-nowrap">
						OpenAI
					</mark>
				</a>{' '}
				to make sense of the results and fill the contact details in an{' '}
				<a
					href="https://hub.windmill.dev/integrations/airtable"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-yellow-100 text-yellow-800 px-2 rounded font-semibold whitespace-nowrap hover:bg-yellow-200">
						Airtable
					</mark>
				</a>
				CRM.
			</>
		),
		href: 'https://www.windmill.dev/blog/automatically-populate-crm'
	}
];

export default function FlowSection() {
	const { developerMode } = useDeveloperMode();

	return (
		<Section
			title="Flows"
			caption={
				developerMode
					? 'Workflow engine on-par with Airflow/Temporal'
					: 'Build complex flows without complexity'
			}
			cards={cards}
			tabs={tabs}
			description={'Build complex Flows from atomic scripts, either from your workspace or the Hub.'}
			color="teal"
			key="flow-card"
			examples={examples}
			kind="flow"
		/>
	);
}
