import React from 'react';
import LandingSection from './LandingSection';
import {
	BarChart,
	Code,
	Code2,
	Database,
	FormInput,
	Github,
	Hand,
	Key,
	KeyIcon,
	LayoutDashboard,
	PieChart,
	Puzzle,
	Server,
	WebhookIcon
} from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import FeatureCardTabs from './tabs/FeatureCardTabs';

const tabs = [
	{
		label: 'App editor',
		icon: Code,
		id: 'app-editor',
		data: [
			{
				title: 'Drag and drop',
				description:
					'Build complex apps from atomic components. Automatically trigger apps and flows from webhooks, a schedule, watching for events, or slack.',
				icon: Hand,
				caption:
					'Simply drag and drop components, connect your data and deploy your app in minutes.',
				video: {
					videoSrc: '/videos/dnd.mp4',
					videoLength: '21'
				}
			},
			{
				title: 'Building blocks',
				description: 'Quickly start building complex apps using our 20 built-in components',
				icon: Puzzle,
				caption: 'Quickly start building complex apps using our 20 built-in components',
				video: {
					videoSrc: '/videos/components.mp4',
					videoLength: '19'
				}
			},
			{
				title: 'Run any script and flow',
				description:
					'Run any script or flow from the app editor. In Python, Go, Bash or Typescript.',
				icon: Code2,
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
				video: {
					videoSrc: '/videos/app-scripts.mp4',
					videoLength: '16'
				}
			}
		]
	},
	{
		label: 'Admin Panel',
		icon: LayoutDashboard,
		id: 'admin-panel',
		data: [
			{
				title: 'Build complex admin panel with table, action',
				description: 'Build complex apps from atomic components.',
				icon: FormInput,
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
				video: {
					videoSrc: '/videos/admin-crm.mp4',
					videoLength: '21'
				}
			}
		]
	},
	{
		label: 'BI/Charts',
		icon: PieChart,
		id: 'bi-charts',
		data: [
			{
				title: 'Build BI dashboards with charts',
				description: 'Build complex apps from atomic components.',
				icon: BarChart,
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts',
				video: {
					videoSrc: '/videos/bi-charts.mp4',
					videoLength: '14'
				}
			}
		]
	}
];

export default function ScriptSection() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-white to-orange-50">
			<div className="flex flex-col gap-4 justify-center">
				<div className="flex flex-col gap-8 justify-center">
					<div className="flex-row gap-4 flex items-center">
						<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600">
							Apps
						</h1>

						<span className=" inline-flex items-center rounded-full bg-yellow-100 border-yellow-500 border px-3 py-0.5 text-sm font-medium text-yellow-800 mt-2">
							Alpha
						</span>
					</div>
					<h2 className="text-gray-600 text-2xl font-semibold max-w-3xl">
						Easy to use wisiwig app editor
					</h2>
				</div>

				<span className="text-lg text-gray-600 max-w-3xl">
					Build your own UI Simply drag and drop components, connect your data and deploy your app
					in minutes.
				</span>

				<FeatureCardTabs tabs={tabs} color="orange" />

				<div className="flex">
					<a
						type="button"
						href="https://hub.windmill.dev/apps"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-orange-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 !no-underline hover:text-white"
					>
						Explore more apps on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
