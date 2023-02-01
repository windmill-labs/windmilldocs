import React from 'react';
import LandingSection from '../landing/LandingSection';
import FeatureCardTabs from '../landing/tabs/FeatureCardTabs';
import { ExternalLink, List } from 'lucide-react';
import { GitBranch, Repeat, Verified } from 'lucide-react';
import { BoltIcon } from '@heroicons/react/24/outline';
import { Code } from 'lucide-react';

const data = [
	{
		title: 'Polyglott',
		description: 'Python, Typescript, Go, Bash scripts with any dependencies',
		icon: Code,
		caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
		video: {
			videoSrc: '/videos/languages.mp4',
			videoLength: 21
		}
	},

	{
		title: 'Scalable',
		description: 'Run them at scale on your infra or ours',
		icon: Code,
		caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
		video: {
			videoSrc: '/videos/languages.mp4',
			videoLength: 21
		}
	},
	{
		title: 'Open source',
		description:
			'Open-source alternative to Airplane, Superblocks, Retool. Simplified Temporal, Airflow.',
		icon: Code,
		caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
		video: {
			videoSrc: '/videos/languages.mp4',
			videoLength: 21
		}
	},
	{
		title: 'Schedules',
		description:
			'Trigger scripts and flows using cron-like schedules, or via an automatically generated webhook',
		icon: Code,
		caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
		video: {
			videoSrc: '/videos/languages.mp4',
			videoLength: 21
		}
	}
];

const tabs = [
	{
		label: 'Flow editor',
		icon: List,
		id: 'flow-editor',
		data
	},

	{
		label: 'For loops',
		icon: BoltIcon,
		id: 'trigger',
		data
	},
	{
		label: 'Branching',
		icon: Verified,
		id: 'approval',
		data
	},
	{
		label: 'Branches',
		icon: GitBranch,
		id: 'branches',
		data
	},
	{
		label: 'Loops',
		icon: Repeat,
		id: 'loops',
		data
	}
];

export default function FlowSection() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-white to-green-50">
			<div className="flex flex-col gap-8 justify-center w-full">
				<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-green-400 to-green-600">
					Flows
				</h1>
				<h2 className="text-gray-600 text-2xl font-semibold">
					Workflow engine on-par with Airflow/Temporal
				</h2>
				<span className="text-lg text-gray-600 max-w-3xl">
					Build complex Flows from atomic apps. Automatically trigger apps and Flow from webhooks, a
					schedule, watching for events, or slack.
				</span>

				<FeatureCardTabs tabs={tabs} initialTabId="flow-editor" color="green" />
				<div className="flex">
					<a
						href="https://hub.windmill.dev/flows"
						type="button"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
					>
						Explore flows on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
