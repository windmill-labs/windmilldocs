import React from 'react';
import LandingSection from './LandingSection';
import {
	BarChart,
	Code,
	Code2,
	FormInput,
	Hand,
	LayoutDashboard,
	PieChart,
	Puzzle
} from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import FeatureCardTabs from './tabs/FeatureCardTabs';
import SectionExamples from './SectionExamples';

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
				description: 'Quickly start building complex apps using our 20 built-in components.',
				icon: Puzzle,
				caption: 'Quickly start building complex apps using our 20 built-in components.',
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
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts.',
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
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts.',
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
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts.',
				video: {
					videoSrc: '/videos/bi-charts.mp4',
					videoLength: '14'
				}
			}
		]
	}
];

/**
 *  Issue tracker
- CRM
- MongoDB Admin

 */

const examples = [
	{
		name: <span>Issue tracker</span>,
		description: (
			<>
				Create an Issue Tracker App with{' '}
				<a
					href="https://hub.windmill.dev/integrations/supabase"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-green-100 text-green-600 px-2 rounded font-semibold whitespace-nowrap">
						Supabase
					</mark>
				</a>{' '}
				in 15 Minutes
			</>
		),
		href: 'https://hub.windmill.dev/apps/7/issue-tracker'
	},
	{
		name: <span>Admin CRM</span>,
		description: (
			<>
				See all of your customers, statistics and send e-mails using Admin panel for the sample
				Customers dataset of{' '}
				<a
					href="https://hub.windmill.dev/integrations/gmail"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-red-100 hover:bg-red-200 px-2 rounded whitespace-nowrap  text-red-800 font-semibold">
						Gmail
					</mark>
				</a>{' '}
				directly from the app
			</>
		),
		href: 'https://hub.windmill.dev/apps/3/crm'
	},
	{
		name: <span>MongoDB Admin</span>,
		description: (
			<>
				Admin panel for the sample Customers dataset of{' '}
				<a
					href="https://hub.windmill.dev/integrations/mongodb"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-green-100 hover:bg-green-200 px-2 rounded whitespace-nowrap  text-green-800 font-semibold">
						MongoDB
					</mark>
				</a>{' '}
				Cloud
			</>
		),
		href: 'https://hub.windmill.dev/apps/5/mongodb-admin'
	}
];

export default function AppSection() {
	return (
		<LandingSection bgClass="bg-gradient-to-br from-white to-orange-50">
			<div className="flex flex-col w-full gap-4 justify-center" id="app-section">
				<div className="flex flex-col gap-2 justify-center">
					<div className="flex-row gap-4 flex items-center">
						<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-orange-600">
							Apps
						</h1>

						{/* <span className=" inline-flex items-center rounded-full bg-yellow-100 border-yellow-500 border px-3 py-0.5 text-sm font-medium text-yellow-800 mt-2">
							Alpha
						</span> */}
					</div>
					<h2 className="text-gray-600 text-2xl font-semibold max-w-3xl">
						Easy to use WYSIWYG app editor
					</h2>
				</div>

				<span className="text-lg text-gray-600 max-w-3xl">
					Build your own UI Simply drag and drop components, connect your data and deploy your app
					in minutes.
				</span>

				<FeatureCardTabs tabs={tabs} color="orange" />
				<SectionExamples examples={examples} />

				<div className="flex gap-4">
					<a
						type="button"
						href="https://hub.windmill.dev/apps"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 !no-underline hover:text-white"
					>
						Explore more apps on the Hub
						<ExternalLink className="ml-2 h-5" />
					</a>

					<a
						href="https://app.windmill.dev/apps/add?nodraft=true"
						type="button"
						target="_blank"
						className="inline-flex items-center rounded-md border border-transparent bg-orange-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 !no-underline hover:text-white"
						Try building apps
						<ExternalLink className="ml-2 h-5" />
					</a>
				</div>
			</div>
		</LandingSection>
	);
}
