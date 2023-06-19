import React from 'react';
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
import { useDeveloperMode } from '../pages';

import Section from './Section';

import { FaBolt, FaReact } from 'react-icons/fa';
import { SiGo, SiPostgresql, SiPython, SiSvelte, SiTypescript, SiVuedotjs } from 'react-icons/si';

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
					altText: 'Drag and drop',
					videoLength: '21'
				}
			},
			{
				title: 'Building blocks',
				description: 'Quickly start building complex apps using our 40 built-in components.',
				icon: Puzzle,
				caption: 'Quickly start building complex apps using our 40 built-in components.',
				video: {
					videoSrc: '/videos/components.mp4',
					altText: 'Building blocks',
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
					altText: 'Run any script and flow',
					videoLength: '16'
				}
			},
			{
				title: 'Build super performant apps',
				description:
					'Our reactive engine ensures your app is always super performant, even when running complex apps.',
				icon: FaBolt,
				caption: 'Windmill supports Typescript, Python, Go and Bash scripts.',
				video: {
					videoSrc: '/videos/app-performance.mp4',
					altText: 'Build super performant apps',
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
					altText: 'Admin crm',
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
					altText: 'BI charts',
					videoLength: '14'
				}
			}
		]
	}
];

const examples = [
	{
		name: <span>E-Commerce Back-Office</span>,
		description: (
			<>
				Build a comprehensive CRM to monitor your products, customers and orders data hosted on{' '}
				<a
					href="https://hub.windmill.dev/integrations/supabase"
					target="_blank"
					className="!no-underline"
				>
					<mark className="leading-none bg-green-100 text-green-600 px-2 rounded font-semibold whitespace-nowrap">
						Supabase
					</mark>
				</a>{' '}
				.
			</>
		),
		href: 'https://docs.windmill.dev/docs/apps/app_e-commerce'
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
					<mark className="leading-none bg-red-100 hover:bg-red-200 px-2 rounded whitespace-nowrap  text-red-800 font-semibold">
						MongoDB
					</mark>
				</a>{' '}
				Cloud
			</>
		),
		href: 'https://hub.windmill.dev/apps/5/mongodb-admin'
	},
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
	}
];

const cards = [
	{
		title: 'Support for React, Vue, Svelte and vanilla JS',
		subtitle: 'Build them with Vite locally and deploy them on Windmill',

		Icon: FaReact,
		gridArea: 'md:col-span-2 md:row-span-4',
		href: '/docs/react_vue_svelte_apps/react',
		icons: [SiSvelte, SiVuedotjs]
	},
	{
		title: 'Inline scripts',
		subtitle: 'Wrote your low-code app logic in Python, TypeScript, Go or Bash.',
		Icon: SiTypescript,
		gridArea: 'md:col-span-2 md:row-span-4',
		icons: [SiPython, SiGo, SiPostgresql],
		href: '/docs/apps/app-runnable-panel#inline-scripts'
	}
];

export default function AppSection() {
	const { developerMode, setDeveloperMode } = useDeveloperMode();

	return (
		<Section
			title="Apps"
			caption={
				developerMode
					? 'Build your apps with code '
					: 'Build super fast and powerful apps using DnD'
			}
			cards={cards}
			tabs={tabs}
			description={
				developerMode
					? 'Either build your app locally with Vite and your favorite frontend framework or use our drag-and-drop editor and use any Typescript, Python, Go or Bash.'
					: 'Build your own UI. Simply drag and drop components, connect your data and deploy your app in minutes.'
			}
			color="orange"
			key="app-card"
			examples={examples}
			kind="app"
		/>
	);
}
