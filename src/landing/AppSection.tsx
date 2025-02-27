import React from 'react';
import {
	BarChart,
	Code,
	Code2,
	FormInput,
	Hand,
	LayoutDashboard,
	PieChart,
	Puzzle,
	Palette,
	ToyBrick,
	Brush,
	Database
} from 'lucide-react';
import { useDeveloperMode } from '../components/GlobalContextProvider';

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
				caption: (
					<div>
						Simply{' '}
						<a href="/docs/getting_started/apps_quickstart" target="_blank">
							drag and drop components
						</a>
						, connect your data and deploy your app in minutes.
					</div>
				),
				video: {
					videoSrc: '/videos/dnd.mp4',
					altText: 'Drag and drop',
					videoLength: '21'
				}
			},
			{
				title: 'Building blocks',
				description: 'Quickly start building complex apps using our 50 built-in components.',
				icon: Puzzle,
				caption: (
					<div>
						Quickly start building complex apps using our{' '}
						<a href="/docs/apps/app_configuration_settings/app_component_library" target="_blank">
							60+ built-in components
						</a>
						.
					</div>
				),
				video: {
					videoSrc: '/videos/components.mp4',
					altText: 'Building blocks',
					videoLength: '19'
				}
			},
			{
				title: 'Run any script and flow',
				description:
					'Run any script or flow from the app editor. In Python, Go, PHP, Bash, C#, SQL or TypeScript.',
				icon: Code2,
				caption: (
					<div>
						Windmill supports TypeScript, Python, Go, PHP, Bash and SQL{' '}
						<a href="/docs/getting_started/scripts_quickstart" target="_blank">
							scripts
						</a>
						.
					</div>
				),
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
				caption: (
					<div>
						Example of an{' '}
						<a href="/docs/apps/app_e-commerce" target="_blank">
							E-commerce CRM app
						</a>
						.
					</div>
				),
				video: {
					videoSrc: '/videos/app-performance.mp4',
					altText: 'Build super performant apps',
					videoLength: '35'
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
				title: 'Database Studio',
				description:
					'From a SQL resource, display, edit, add rows, delete rows ... and connect to other components.',
				icon: Database,
				caption: (
					<div>
						<a href="/docs/apps/app_configuration_settings/database_studio" target="_blank">
							From a SQL resource
						</a>
						, display, edit, add rows, delete rows ... and connect to other components.
					</div>
				),
				video: {
					videoSrc: '/videos/db_studio.mp4',
					altText: 'Database Studio'
				}
			},
			{
				title: 'Build complex admin panel with table & actions',
				description: 'Build complex apps from atomic components.',
				icon: FormInput,
				caption: (
					<div>
						Example of an{' '}
						<a href="/docs/apps/app_e-commerce" target="_blank">
							E-commerce CRM app
						</a>
						.
					</div>
				),
				video: {
					videoSrc: '/videos/app-performance.mp4',
					altText: 'Build super performant apps',
					videoLength: '35'
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
				caption: (
					<div>
						Windmill embeds several{' '}
						<a
							href="/docs/apps/app_configuration_settings/app_component_library#charts"
							target="_blank"
						>
							charts components
						</a>{' '}
						with unlimited customization possibilities.
					</div>
				),
				video: {
					videoSrc: '/videos/bi-charts.mp4',
					altText: 'BI charts',
					videoLength: '14'
				}
			}
		]
	},
	{
		label: 'Styling',
		icon: Palette,
		id: 'styling',
		data: [
			{
				title: 'Give style to each component',
				description:
					'Configure the style of each component with pre-set options, CSS, or Tailwind Classes.',
				icon: ToyBrick,
				caption: (
					<div>
						Configure the{' '}
						<a
							href="/docs/apps/app_configuration_settings/app_styling#component-level"
							target="_blank"
						>
							style of each component
						</a>{' '}
						with pre-set options, CSS, or Tailwind Classes.
					</div>
				),
				video: {
					videoSrc: '/videos/styling_component.mp4',
					altText: 'Component styling'
				}
			},
			{
				title: 'Define global themes',
				description:
					'Apply global themes to reuse across your applications based on their purposes.',
				icon: Brush,
				caption: (
					<div>
						Apply{' '}
						<a
							href="/docs/apps/app_configuration_settings/app_styling#global-styling"
							target="_blank"
						>
							global themes
						</a>{' '}
						to reuse across your applications based on their purposes.
					</div>
				),
				video: {
					videoSrc: '/videos/global_styling.mp4',
					altText: 'Global styling'
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
		href: '/docs/apps/app_e-commerce'
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
		subtitle: 'Build apps or components with Vite locally and deploy them on Windmill.',

		Icon: FaReact,
		gridArea: 'md:col-span-2 md:row-span-4',
		href: '/docs/react_vue_svelte_apps/react',
		icons: [SiSvelte, SiVuedotjs]
	},
	{
		title: 'Inline scripts',
		subtitle:
			'Write your low-code app logic in Python, TypeScript, SQL, Go, PHP, Bash or any supported language on Windmill.',
		Icon: SiTypescript,
		gridArea: 'md:col-span-2 md:row-span-4',
		icons: [SiPython, SiGo, SiPostgresql],
		href: '/docs/apps/app-runnable-panel#inline-scripts'
	}
];

export default function AppSection() {
	const { developerMode } = useDeveloperMode();

	return (
		<Section
			title="Apps"
			caption={
				developerMode
					? 'Build your apps with code '
					: 'Build super fast and powerful apps using drag-and-drop'
			}
			cards={cards}
			tabs={tabs}
			description={
				developerMode
					? 'Either build your app locally with Vite and your favorite frontend framework or use our drag-and-drop editor and use any TypeScript, Python, Go, PHP, Bash or SQL.'
					: 'Build your own UI. Simply drag and drop components, connect your data and deploy your app in minutes.'
			}
			color="orange"
			key="app-card"
			examples={examples}
			kind="app"
		/>
	);
}
