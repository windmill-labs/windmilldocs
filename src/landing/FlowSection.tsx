import React, { useEffect } from 'react';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';

import {
	Workflow,
	Bug,
	Play,
	CalendarClock,
	FormInput,
	WebhookIcon,
	Terminal,
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
	LucideWebhook,
	BookOpen,
	CylinderIcon,
	Sparkles,
	Code
} from 'lucide-react';
import { GitBranch, Repeat, Verified } from 'lucide-react';
import { useColorMode } from '@docusaurus/theme-common';

import Section from './Section';
import { useDeveloperMode } from '../components/GlobalContextProvider';
import { SiVisualstudiocode } from 'react-icons/si';
import { BoltIcon } from '@heroicons/react/20/solid';
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
				title: 'For loops',
				description: 'Create For loops to iterate over a list of items.',
				icon: Repeat,
				caption: (
					<div>
						Create{' '}
						<a href="/docs/flows/flow_loops" target="_blank">
							For loops
						</a>{' '}
						to iterate over a list of items.
					</div>
				),
				video: {
					videoSrc: '/videos/flow-loop.mp4',
					altText: 'Flows For loops',
					videoLength: '18'
				}
			},
			{
				title: 'Windmill AI',
				description: 'Generate flows from prompts.',
				icon: Sparkles,
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
			},
			{
				title: 'Workflows as code',
				description: 'Automate tasks and their flow with only code.',
				icon: Code,
				caption: (
					<div>
						For a developer-first approach, use{' '}
						<a href="/docs/core_concepts/workflows_as_code" target="_blank">
							Workflows as code
						</a>{' '}
						to automate tasks and their flow within a script.
					</div>
				),
				imageSrc: '/images/workflow_as_code.png'
			}
		]
	},
	{
		label: 'Approval Step',
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
		label: 'Error handling',
		icon: Bug,
		id: 'error-handling',
		data: [
			{
				title: 'Error handler',
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
				title: 'Early stop / Break',
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
					altText: 'Early stop / Break.'
				}
			},
			{
				title: 'Custom timeout for step',
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
					altText: 'Custom timeout for step'
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
				title: 'Step mocking / Pin result',
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
					videoSrc: 'https://www.youtube.com/embed/-cATEh8saqU',
					videoLength: '15',
					altText: 'Step mocking / Pin result'
				}
			},
			{
				title: 'Concurrency limits',
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
		label: 'Data pipelines',
		icon: CylinderIcon,
		id: 'data-pipelines',
		data: [
			{
				title: 'Windmill for data pipelines',
				description:
					'Link a Windmill workspace to an S3 bucket and use it as source and/or target of your processing steps seamlessly, without any boilerplate.',
				icon: CalendarClock,
				caption: (
					<div>
						<a href="/docs/core_concepts/data_pipelines" target="_blank">
							We have integrated
						</a>{' '}
						with Polars and DuckDB for in-memory data processing and S3 for external storage.
					</div>
				),
				video: {
					videoSrc: 'https://www.youtube.com/embed/I9owHiLUrKw',
					videoLength: '26',
					altText: 'Windmill for data pipelines'
				},
				altText: 'Windmill for data pipelines'
			}
		]
	},
	{
		label: 'Triggers',
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
					videoSrc: 'https://www.youtube.com/embed/TXtmLrToxoI',
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
		subtitle: "The fastest workflow engine (it's in Rust).",
		Icon: BoltIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/misc/benchmarks/competitors'
	},
	{
		title: 'Workflows as code',
		subtitle: 'Automate tasks and their flow within a script.',
		Icon: Code,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/core_concepts/workflows_as_code'
	},

	{
		title: 'Triggers',
		subtitle: 'Trigger flows from a webhook or schedule.',
		Icon: Webhook,
		gridArea: 'md:col-span-2 md:row-span-3',
		href: '/docs/getting_started/triggers',
		icons: [Calendar, Terminal]
	},

	{
		title: 'Suspend and resume',
		subtitle: 'Automatically resume workflows with secret webhooks.',
		Icon: CheckCircle2,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/flows/flow_approval'
	},

	{
		title: 'Data pipelines',
		subtitle: 'Integration with Polars, DuckDB and S3 for data pipelines.',
		Icon: CylinderIcon,
		gridArea: 'md:col-span-1 md:row-span-3',
		href: '/docs/core_concepts/data_pipelines'
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
				, use a for loop to translate each one with{' '}
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
	const [chart, setChart] = React.useState<'short' | 'long'>(undefined);
	const { colorMode } = useColorMode();

	useEffect(() => {
		setChart('short');
	}, []);

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
								title="Switch between short and long running tasks"
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
							'w-full p-8 bg-opacity-40 rounded-xl h-full'
						)}
					>
						<div className="grid">
							{chart === 'short' ? (
								<div>
									<BenchmarkVisualization
										usecase="fibonacci_40_10"
										language="python"
										engines={[
											'airflow',
											'kestra',
											'prefect',
											'temporal',
											'windmill',
											'windmill_dedicated'
										]}
										workers={1}
										title="40 lightweight tasks comparison (animation time speed 20x)"
										maintainAspectRatio={false}
										shouldAnimate={true}
									/>
								</div>
							) : (
								<div>
									<BenchmarkVisualization
										usecase="fibonacci_10_33"
										language="python"
										engines={[
										'airflow',
										'kestra',
										'prefect',
										'temporal',
										'windmill',
										'windmill_dedicated'
									]}
										workers={1}
										title="10 long running tasks comparison (animation time speed 20x)"
										maintainAspectRatio={false}
										shouldAnimate={true}
									/>
								</div>
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
