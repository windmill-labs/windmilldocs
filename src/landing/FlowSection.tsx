import React from 'react';

import {
	Workflow,
	Bug,
	Play,
	CalendarClock,
	FormInput,
	WebhookIcon,
	Terminal,
	RotateCcw,
	Webhook,
	OctagonIcon,
	CheckCircle2,
	TimerOffIcon,
	Unplug,
	Database,
	InfinityIcon,
	Voicemail,
	BedIcon,
	Calendar,
	Bot,
	LucideWebhook,
	BookOpen
} from 'lucide-react';
import { GitBranch, Repeat, Verified } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

import Section from './Section';
import { useDeveloperMode } from '../pages';
import { SiVisualstudiocode } from 'react-icons/si';
import { BoltIcon } from '@heroicons/react/20/solid';
import TaskDurationBarChart from '../components/TaskDurationBarChart';
import LandingSectionWrapper from './LandingSectionWrapper';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';

const tabs = [
	{
		label: 'Flow editor',
		icon: Workflow,
		id: 'flow-editor',
		data: [
			{
				title: 'Sequence',
				description: 'Build complex Flows from atomic scripts.',
				icon: Workflow,
				caption: (
					<div>
						Sequence scripts from your workspace, the{' '}
						<a href="https://hub.windmill.dev/" target="_blank">
							Hub
						</a>{' '}
						or{' '}
						<a href="/docs/code_editor" target="_blank">
							write them
						</a>{' '}
						directly.
					</div>
				),
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
				caption: (
					<div>
						Built-in{' '}
						<a href="/docs/flows/flow_branches" target="_blank">
							branching logic
						</a>{' '}
						to create complex workflows.
					</div>
				),

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
				caption: (
					<div>
						Create{' '}
						<a href="/docs/flows/flow_loops" target="_blank">
							for loops
						</a>{' '}
						to iterate over a list of items.
					</div>
				),
				video: {
					videoSrc: '/videos/flow-loop.mp4',
					altText: 'Flows for loops',
					videoLength: '18'
				}
			},
			{
				title: 'Windmill AI',
				description: 'Generate flows from prompts.',
				icon: Bot,
				caption: (
					<div>
						Generate flows from prompts with{' '}
						<a href="/docs/core_concepts/ai_generation" target="_blank">
							Windmill AI
						</a>
						.
					</div>
				),
				video: {
					videoSrc: '/videos/flow_ai.mp4',
					altText: 'Windmill AI for flows'
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
				caption: (
					<div>
						Send{' '}
						<a href="/docs/flows/flow_approval" target="_blank">
							request for approval
						</a>{' '}
						by email, slack, anything and get a dedicate approval page.
					</div>
				),
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
				icon: LucideWebhook,
				caption: 'Resume Workflows with secret webhooks.',
				imageSrc: '/images/page_arguments.png.webp',
				altText: 'Resume with webhooks'
			},
			{
				title: 'Sleeps / Delays',
				description: 'Executions within a flow can be suspended for a given time.',
				icon: BedIcon,
				caption: (
					<div>
						Executions within a flow can be{' '}
						<a href="/docs/flows/sleep" target="_blank">
							suspended
						</a>{' '}
						for a given time.
					</div>
				),
				video: {
					videoSrc: '/videos/sleep_step.mp4',
					altText: 'Sleep / Delay'
				}
			}
		]
	},
	{
		label: 'Error Handling',
		icon: Bug,
		id: 'error-handling',
		data: [
			{
				title: 'Error Handler',
				description:
					'Easily recover from errors and continue your flow or log the error on Slack, Discord, etc.',
				icon: Bug,
				caption: (
					<div>
						Easily{' '}
						<a href="/docs/flows/error_handling" target="_blank">
							recover from errors
						</a>{' '}
						and continue your flow or log the error on Slack, Discord, etc.
					</div>
				),
				video: {
					videoSrc: '/videos/error_handler.mp4',
					altText: 'Branching logic'
				}
			},
			{
				title: 'Retry',
				description:
					'Automatically retry failed steps. Customize the number of retries for each individual step.',
				icon: Repeat,
				caption: (
					<div>
						Easily{' '}
						<a href="/docs/flows/retries" target="_blank">
							retry
						</a>{' '}
						failed steps.
					</div>
				),
				video: {
					videoSrc: '/videos/retries_example.mp4',
					altText: 'Customize number of retries.'
				}
			},
			{
				title: 'Early Stop / Break',
				description:
					'Define a predicate expression that determines whether the flow should stop early at the end of a step.',
				icon: OctagonIcon,
				caption: (
					<div>
						Define a predicate expression that determines whether the flow should{' '}
						<a href="/docs/flows/early_stop" target="_blank">
							stop early
						</a>{' '}
						at the end of a step.
					</div>
				),
				video: {
					videoSrc: '/videos/early_stop.mp4',
					altText: 'Early Stop / Break.'
				}
			},
			{
				title: 'Custom Timeout for Step',
				description:
					'For each step can be defined a timeout. If the execution takes longer than the time limit, the execution of the step will be interrupted.',
				icon: TimerOffIcon,
				caption: (
					<div>
						For each step can be defined a{' '}
						<a href="/docs/flows/custom_timeout" target="_blank">
							timeout
						</a>
						. If the execution takes longer than the time limit, the execution of the step will be
						interrupted.
					</div>
				),
				video: {
					videoSrc: '/videos/custom_timeout.mp4',
					altText: 'Custom Timeout for Step'
				}
			}
		]
	},
	{
		label: 'Integrations',
		icon: Unplug,
		id: 'retries',
		data: [
			{
				title: 'Connect third-party services',
				description: 'Connect data providers & external APIs together.',
				icon: Unplug,
				caption: (
					<div>
						Connect data providers &{' '}
						<a href="/docs/integrations/integrations_on_windmill" target="_blank">
							external APIs
						</a>{' '}
						together.
					</div>
				),
				video: {
					videoSrc: '/videos/flow_integrations.mp4',
					videoLength: '29',
					altText: 'Connect third-party services.'
				}
			},
			{
				title: 'Cache results of steps',
				description:
					'Cache the results of a step for a given time to limit useless calls to external APIs.',
				icon: Database,
				caption: (
					<div>
						<a href="/docs/flows/cache" target="_blank">
							Cache the results of a step
						</a>{' '}
						for a given time.
					</div>
				),
				video: {
					videoSrc: '/videos/cache_for_steps.mp4',
					videoLength: '15',
					altText: 'Cache results of steps'
				}
			},
			{
				title: 'Step Mocking',
				description:
					'When a step is mocked, it will immediately return the mocked value without performing any computation.',
				icon: Voicemail,
				caption: (
					<div>
						When a step is{' '}
						<a href="/docs/flows/step_mocking" target="_blank">
							mocked
						</a>
						, it will immediately return the mocked value without performing any computation.
					</div>
				),
				video: {
					videoSrc: '/videos/step_mocking.mp4',
					videoLength: '15',
					altText: 'Step Mocking'
				}
			},
			{
				title: 'Concurrency Limits',
				description:
					'Define concurrency limits for inline scripts to prevent exceeding the API Limit of the targeted API.',
				icon: InfinityIcon,
				caption: (
					<div>
						Define{' '}
						<a href="/docs/flows/concurrency_limit" target="_blank">
							concurrency limits
						</a>{' '}
						for inline scripts to prevent exceeding the API Limit of the targeted API.
					</div>
				),
				imageSrc: '/images/concurrency_limit_flow.png'
			}
		]
	},
	{
		label: 'Schedules & Triggers',
		icon: Play,
		id: 'schedules-webhooks-ui-cli',
		data: [
			{
				title: 'Schedules',
				description:
					'Windmill allows you to define schedules for Scripts and Flows. Once a schedule is defined, it will automatically run the script at the set frequency.',
				icon: CalendarClock,
				caption: (
					<div>
						Windmill allows you to define{' '}
						<a href="/docs/core_concepts/scheduling" target="_blank">
							schedules
						</a>{' '}
						for Scripts and Flows. Once a schedule is defined, it will automatically run the script
						at the set frequency.
					</div>
				),
				imageSrc: '/images/script-schedule.png'
			},

			{
				title: 'UI',
				description: 'You can directly trigger a flow using the autogenerated UI or Windmill Apps.',
				icon: FormInput,
				caption: (
					<div>
						You can directly trigger a flow using the{' '}
						<a href="/docs/core_concepts/auto_generated_uis" target="_blank">
							autogenerated UI
						</a>{' '}
						or{' '}
						<a href="/docs/getting_started/apps_quickstart" target="_blank">
							Windmill Apps
						</a>
						.
					</div>
				),
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
				caption: (
					<div>
						Every flow has a sync and async{' '}
						<a href="/docs/core_concepts/webhooks" target="_blank">
							webhook
						</a>
						.
					</div>
				),
				imageSrc: '/images/flow-webhook.png',
				altText: 'Webhooks'
			},
			{
				title: 'CLI',
				description: 'Execute a flow using the CLI.',
				icon: Terminal,
				caption: (
					<div>
						Execute a flow using the{' '}
						<a href="/docs/advanced/cli" target="_blank">
							CLI
						</a>
						.
					</div>
				),
				video: {
					videoSrc: 'https://www.youtube.com/embed/w2HVTlR2QDI?vq=hd1080',
					videoLength: '26',
					altText: 'Execute using CLI'
				},
				altText: 'Execute using CLI'
			}
		]
	}
];

const cards = [
	{
		title: 'VS Code extension or any IDEs to edit any flow',
		subtitle:
			'Develop flow steps locally with your favorite code editor, preview them locally and deploy them with the CLI.',
		Icon: SiVisualstudiocode,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/cli_local_dev/vscode-extension'
	},
	{
		title: 'Blazing Fast',
		subtitle: "The fastest workflow engine (it's in Rust)",
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/misc/benchmarks/competitors'
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
		name: <span>Fetch, translate and upload articles</span>,
		description: (
			<>
				Retrieve articles from{' '}
				<a
					href="https://hub.windmill.dev/integrations/zendesk"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-gray-100 text-gray-700 hover:bg-gray-300 px-2 rounded font-semibold whitespace-nowrap">
						Zendesk
					</mark>
				</a>{' '}
				, use a for lopp to translate each one with{' '}
				<a
					href="https://hub.windmill.dev/integrations/openai"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 rounded font-semibold whitespace-nowrap">
						OpenAI
					</mark>
				</a>{' '}
				and store the embeddings in a{' '}
				<a
					href="https://hub.windmill.dev/integrations/airtable"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-emerald-100 text-emerald-800 px-2 rounded font-semibold whitespace-nowrap hover:bg-emerald-200">
						Airtable
					</mark>
				</a>
				database.
			</>
		),
		href: 'https://hub.windmill.dev/flows/47/insert-zendesk-articles-into-supabase-with-openaiembedings'
	}
];

export default function FlowSection() {
	const { developerMode } = useDeveloperMode();
	const [chart, setChart] = React.useState('short');
	const { colorMode } = useColorMode();

	return (
		<>
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
					'Build complex Flows from atomic scripts, either from your workspace or the Hub.'
				}
				color="teal"
				key="flow-card"
				examples={examples}
				kind="flow"
			/>
			<LandingSectionWrapper color="teal">
				<div className="flex flex-col w-full gap-4 justify-center items-start">
					<div className="flex flex-col gap-2 ">
						<div className="flex justify-between items-center w-full">
							<h1
								className={classNames(
									'font-bold leading-8',
									colorMode === 'dark' ? 'text-white' : 'text-gray-900'
								)}
							>
								The fastest workflow engine
							</h1>
						</div>
						<div className="my-4 flex flex-row gap-2 items-center transition-all">
							<span className={classNames('font-bold text-md text-gray-900 dark:text-white')}>
								10 long running tasks
							</span>
							<Switch
								checked={chart === 'short'}
								onChange={() => {
									setChart(chart === 'long' ? 'short' : 'long');
								}}
								className={`${
									chart === 'short'
										? 'bg-teal-500 dark:bg-teal-900'
										: 'bg-gray-200 dark:bg-gray-800'
								}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
							>
								<span
									aria-hidden="true"
									className={`${chart === 'short' ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white  shadow-lg ring-0 transition duration-200 ease-in-out`}
								/>
							</Switch>
							<span className={classNames('font-bold text-md text-gray-900 dark:text-white')}>
								40 lightweight tasks
							</span>
						</div>
					</div>
					<div
						className={classNames(
							colorMode === 'dark' ? 'bg-black' : 'bg-gray-50',
							'w-full p-8 bg-opacity-40 rounded-xl '
						)}
					>
						<div className="grid">
							{chart === 'short' ? (
								<div>
									<TaskDurationBarChart
										title="40 lightweight tasks"
										labels={[
											['Airflow'],
											['Prefect'],
											['Temporal'],
											['Windmill', 'Normal'],
											['Windmill', 'Dedicated Worker']
										]}
										rawData={[
											[
												[
													4.335, 3.959, 2.194, 2.192, 1.68, 1.965, 2.377, 2.259, 2.39, 2.6, 2.401,
													4.888, 5.118, 1.64, 2.396, 2.196, 2.488, 1.853, 1.513, 2.575, 2.218,
													2.316, 1.933, 2.176, 2.976, 5.192, 1.684, 2.361, 2.218, 1.409, 2.591,
													2.192, 2.328, 2.464, 2.88, 2.394, 2.046, 1.537, 4.988, 2.784
												],
												[
													0.417, 0.213, 0.203, 0.22, 0.209, 0.262, 0.205, 0.268, 0.209, 0.477,
													0.322, 0.817, 0.207, 0.253, 0.201, 0.226, 0.212, 0.199, 0.207, 0.435,
													0.355, 0.408, 0.431, 0.247, 0.461, 0.717, 0.237, 0.246, 0.194, 0.205,
													0.421, 0.312, 0.421, 0.25, 0.251, 0.206, 0.352, 0.21, 0.604, 0.223
												]
											],
											[
												[
													1.213, 0.064, 0.061, 0.059, 0.054, 0.053, 0.053, 0.054, 0.055, 0.056,
													0.057, 0.064, 0.052, 0.056, 0.056, 0.058, 0.052, 0.051, 0.054, 0.053,
													0.053, 0.055, 0.052, 0.054, 0.062, 0.051, 0.051, 0.052, 0.051, 0.048,
													0.055, 0.057, 0.049, 0.048, 0.055, 0.05, 0.051, 0.05, 0.053, 0.054
												],
												[
													0.044, 0.041, 0.04, 0.036, 0.035, 0.038, 0.037, 0.061, 0.039, 0.038, 0.04,
													0.038, 0.038, 0.041, 0.039, 0.043, 0.035, 0.035, 0.035, 0.038, 0.037,
													0.036, 0.036, 0.038, 0.039, 0.034, 0.035, 0.037, 0.034, 0.083, 0.035,
													0.034, 0.033, 0.034, 0.038, 0.034, 0.034, 0.035, 0.035, 0.034
												]
											],
											[
												[
													0.009, 0.028, 0.027, 0.029, 0.029, 0.029, 0.03, 0.03, 0.032, 0.028, 0.028,
													0.028, 0.029, 0.041, 0.029, 0.029, 0.077, 0.09, 0.091, 0.093, 0.092, 0.09,
													0.092, 0.091, 0.091, 0.091, 0.091, 0.09, 0.091, 0.093, 0.09, 0.093, 0.092,
													0.091, 0.09, 0.092, 0.091, 0.091, 0.091, 0.092
												],
												[
													0.007, 0.008, 0.008, 0.008, 0.007, 0.008, 0.008, 0.008, 0.008, 0.008,
													0.008, 0.008, 0.008, 0.008, 0.009, 0.009, 0.009, 0.009, 0.008, 0.008,
													0.009, 0.008, 0.009, 0.009, 0.009, 0.009, 0.009, 0.008, 0.009, 0.009,
													0.008, 0.009, 0.009, 0.009, 0.009, 0.009, 0.009, 0.009, 0.008, 0.008
												]
											],
											[
												[
													0.004, 0.063, 0.061, 0.062, 0.061, 0.061, 0.061, 0.061, 0.062, 0.062,
													0.061, 0.061, 0.065, 0.063, 0.06, 0.064, 0.062, 0.061, 0.062, 0.062, 0.06,
													0.062, 0.06, 0.062, 0.06, 0.063, 0.062, 0.061, 0.061, 0.06, 0.061, 0.06,
													0.061, 0.061, 0.061, 0.062, 0.06, 0.062, 0.06, 0.062
												],
												[
													0.048, 0.048, 0.048, 0.048, 0.047, 0.047, 0.047, 0.046, 0.05, 0.049,
													0.047, 0.047, 0.056, 0.052, 0.047, 0.045, 0.046, 0.047, 0.047, 0.05, 0.05,
													0.047, 0.046, 0.046, 0.046, 0.046, 0.046, 0.047, 0.046, 0.046, 0.047,
													0.046, 0.046, 0.046, 0.046, 0.048, 0.049, 0.049, 0.047, 0.048
												]
											],
											[
												[
													0.003, 0.06, 0.059, 0.06, 0.061, 0.061, 0.06, 0.059, 0.061, 0.061, 0.06,
													0.06, 0.061, 0.061, 0.062, 0.059, 0.06, 0.06, 0.06, 0.058, 0.06, 0.059,
													0.06, 0.059, 0.06, 0.059, 0.061, 0.061, 0.061, 0.06, 0.059, 0.061, 0.06,
													0.06, 0.06, 0.06, 0.059, 0.061, 0.061, 0.059
												],
												[
													0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
													0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.004, 0.002,
													0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
													0.002, 0.002, 0.002, 0.002, 0.002, 0.003, 0.002, 0.002, 0.002, 0.002
												]
											]
										]}
										shouldAnimate={true}
									/>
								</div>
							) : (
								<TaskDurationBarChart
									title="10 long running tasks"
									labels={[
										['Airflow'],
										['Prefect'],
										['Temporal'],
										['Windmill', 'Normal'],
										['Windmill', 'Dedicated Worker']
									]}
									rawData={[
										[
											[4.347, 2.78, 1.975, 1.708, 1.832, 2.202, 2.641, 2.44, 2.179, 4.292],
											[2.564, 6.696, 1.715, 1.702, 2.144, 2.689, 2.503, 1.815, 1.954, 4.489]
										],
										[
											[1.27, 0.074, 0.062, 0.059, 0.063, 0.064, 0.058, 0.06, 0.062, 0.059],
											[1.359, 1.356, 1.354, 1.382, 1.358, 1.415, 1.379, 1.362, 1.333, 1.36]
										],
										[
											[0.012, 0.031, 0.032, 0.031, 0.032, 0.031, 0.033, 0.032, 0.034, 0.034],
											[1.345, 1.309, 1.305, 1.306, 1.307, 1.308, 1.305, 1.319, 1.313, 1.314]
										],
										[
											[0.004, 0.063, 0.065, 0.063, 0.063, 0.062, 0.062, 0.063, 0.062, 0.063],
											[0.785, 0.778, 0.821, 0.77, 0.767, 0.767, 0.782, 0.77, 0.772, 0.769]
										],
										[
											[0.004, 0.071, 0.062, 0.062, 0.067, 0.04, 0.03, 0.059, 0.063, 0.058],
											[0.734, 0.734, 0.729, 0.728, 0.754, 0.759, 0.732, 0.726, 0.728, 0.745]
										]
									]}
									shouldAnimate={true}
								/>
							)}
						</div>
					</div>
					<div>
						<a
							type="button"
							target="_blank"
							href="/docs/misc/benchmarks/competitors"
							className="cursor-pointer transition-all bg-teal-500 hover:bg-teal-700 flex flex-start !text-white items-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2  focus:ring-offset-2 !no-underline "
						>
							See all benchmarks
							<BookOpen className="ml-2 h-4" />
						</a>
					</div>
				</div>
			</LandingSectionWrapper>
		</>
	);
}
