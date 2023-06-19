import React from 'react';

import {
	List,
	Bug,
	Play,
	CalendarClock,
	FormInput,
	WebhookIcon,
	Terminal,
	Code2,
	FastForward,
	RotateCcw,
	Webhook,
	CheckCircle2
} from 'lucide-react';
import { GitBranch, Repeat, Verified } from 'lucide-react';
import CodeSvg from './cards/svgs/CodeSvg';
import FastSvg from './cards/svgs/FastSvg';

import RetriesSvg from './cards/svgs/RetriesSvg';
import CheckSvg from './cards/svgs/CheckSvg';
import TriggersSvg from './cards/svgs/TriggersSvg';
import Section from './Section';
import { useDeveloperMode } from '../pages';

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
				caption: 'Write scripts in Typescript, Python, Go and Bash or use scripts from the hub',
				video: {
					videoSrc: '/videos/flow-sequence.mp4',
					altText: 'Build flows from scripts',
					videoLength: '28'
				}
			},

			{
				title: 'Branching',
				description: 'Built-in branching logic to create complex workflows.',
				icon: GitBranch,
				caption: 'Built-in branching logic to create complex workflows',
				video: {
					videoSrc: '/videos/flow-branch.mp4',
					altText: 'Branching logic',
					videoLength: '28'
				}
			},
			{
				title: 'For Loops',
				description: 'Create for loops to iterate over a list of items.',
				icon: Repeat,
				caption: 'Create for loops to iterate over a list of items',
				video: {
					videoSrc: '/videos/flow-loop.mp4',
					altText: 'Flows for loops',
					videoLength: '28'
				}
			},
			{
				title: 'Error Handler',
				description:
					'Easily recover from errors and continue your flow or log the error on Slack, Discord, etc.',
				icon: Bug,
				caption:
					'Easily recover from errors and continue your flow or log the error on Slack, Discord, etc.',
				imageSrc: '/images/error-handler.png',
				imageAlt: 'Error Handler icon'
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
				caption:
					'Send request for approval by email, slack, anything and get a dedicate approval page',
				video: {
					videoSrc: '/videos/flow-approval.mp4',
					altText: 'Flows Approval Step',
					videoLength: '47'
				}
			},
			{
				title: 'Resume Workflows with secret webhooks',
				description:
					'Automatically resume workflows with secret webhooks. This is useful for resuming workflows after an approval step.',
				icon: Verified,
				caption: 'Resume Workflows with secret webhooks',
				imageSrc: '/images/resume-workflow.png',
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
				caption: 'Easily retry failed steps',
				video: {
					videoSrc: '/videos/flow-retries.mp4',
					videoLength: '15',
					altText: 'Customize number of retries'
				}
			},
			{
				title: 'Cache results of steps',
				description:
					'Cache results of steps to avoid re-running steps that have already been executed.',
				icon: Repeat,
				caption: 'Easily retry failed steps',
				video: {
					videoSrc: '/videos/flow-retries.mp4',
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
				caption:
					'Windmill allows you to define schedules for Scripts and Flows. Once a schedule is defined, it will automatically run the script at the set frequency.',
				video: {
					videoSrc: '/videos/flow-schedule.mp4',
					videoLength: '15',
					altText: 'Schedules'
				}
			},

			{
				title: 'UI',
				description: 'You can directly trigger a script using the autogenerated UI.',
				icon: FormInput,
				caption: 'You can directly trigger a script using the autogenerated UI.',
				video: {
					videoSrc: '/videos/flow-ui.mp4',
					altText: 'Trigger with autogenerated UI',
					videoLength: '14'
				}
			},
			{
				title: 'Webhooks',
				icon: WebhookIcon,
				caption: '',
				imageSrc: ''
			},
			{
				title: 'CLI',
				icon: Terminal,
				caption: 'Execute a flow from the CLI',
				imageSrc: '/images/setup.gif',
				altText: 'Execute from the CLI'
			}
		]
	}
];

const cards = [
	{
		title: 'VSCode extension or any IDEs to edit any step of a flow',
		subtitle:
			'Develop flow steps locally with your favorite code editor, preview them locally and deploy them with the CLI.',
		Icon: Code2,
		gridArea: 'md:col-span-2 md:row-span-6',
		svg: <CodeSvg />,
		href: '/docs/advanced/local_development'
	},
	{
		title: 'Blazing Fast',
		subtitle: "The fastest workflow engine (it's in Rust)",
		Icon: FastForward,
		gridArea: 'md:col-span-1 md:row-span-3',
		svg: <FastSvg />,
		href: '/docs/misc/benchmarks'
	},
	{
		title: 'Retries and errors',
		subtitle: 'Retry failed steps, or handle errors',
		Icon: RotateCcw,
		gridArea: 'md:col-span-1 md:row-span-3',
		svg: <RetriesSvg />,
		href: '/docs/flows/retries'
	},

	{
		title: 'Triggers',
		subtitle: 'Trigger flows from a webhook or schedule',
		Icon: Webhook,
		gridArea: 'md:col-span-1 md:row-span-3',
		svg: <TriggersSvg />,
		href: '/docs/flows/flow_trigger'
	},

	{
		title: 'Suspend and resume',
		subtitle: 'Supend a flow is',
		Icon: CheckCircle2,
		gridArea: 'md:col-span-1 md:row-span-3',
		svg: <CheckSvg />,
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
			description={
				'Run long-running heavy background jobs, script with complex dependencies, endpoints with high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the auto-generated UI and monitor them easily.'
			}
			color="teal"
			key="flow-card"
			examples={examples}
			kind="flow"
		/>
	);
}
