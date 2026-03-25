import React from 'react';
import Footer from '../../landing/Footer';
import LandingHeader from '../../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import {
	Code, GitFork, LayoutDashboard, Database, GitBranch, Terminal,
	Activity, ShieldCheck, Container, Cpu, Server, Zap,
} from 'lucide-react';

const platformCategories = [
	{
		title: 'Build',
		items: [
			{ name: 'Script editor', description: 'Write scripts in TypeScript, Python, Go, Bash or SQL.', href: '/platform/script-editor', icon: Code },
			{ name: 'Flow editor', description: 'Connect scripts into flows with no glue code.', href: '/platform/flow-editor', icon: GitFork },
			{ name: 'App builder', description: 'Connect backend logic to React & Svelte frontends.', href: '/platform/app-builder', icon: LayoutDashboard },
			{ name: 'Triggers', description: 'Schedules, webhooks, Kafka, Postgres CDC and more.', href: '/platform/triggers', icon: Zap },
			{ name: 'Data tables', description: 'Store and query relational data with managed SQL.', href: '/platform/datatables', icon: Database },
			{ name: 'Deployment & versioning', description: 'Sync with Git, stage workspaces and deploy via CI/CD.', href: '/platform/deployment-versioning', icon: GitBranch },
		],
	},
	{
		title: 'Run',
		items: [
			{ name: 'Local dev', description: 'Develop and test locally with the Windmill CLI.', href: '/platform/local-dev', icon: Terminal },
			{ name: 'Workers', description: 'Isolated workers that pull from a shared queue.', href: '/platform/workers', icon: Cpu },
			{ name: 'AI sandboxes', description: 'Run Claude Code, Codex, or custom agents in isolated environments.', href: '/platform/sandboxes', icon: Container },
			{ name: 'Observability', description: 'Monitor logs, metrics and alerts in real time.', href: '/platform/observability', icon: Activity },
			{ name: 'RBAC', description: 'Enforce role-based access, audit logs and secrets.', href: '/platform/rbac', icon: ShieldCheck },
			{ name: 'No-ops self-host', description: 'Deploy Windmill on your infra with zero maintenance.', href: '/platform/self-host', icon: Server },
		],
	},
];

function PlatformCard({ item }) {
	const Icon = item.icon;
	return (
		<Link
			to={item.href}
			className="group flex items-start gap-4 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 px-6 py-5 hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-md !no-underline"
		>
			<Icon className="w-6 h-6 text-blue-500 shrink-0 mt-0.5" />
			<div className="flex-1">
				<h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{item.name}
				</h3>
				<p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
					{item.description}
				</p>
			</div>
			<ArrowRight className="w-4 h-4 text-gray-300 dark:text-gray-600 shrink-0 mt-1 group-hover:text-blue-500 transition-colors" />
		</Link>
	);
}

export default function PlatformPage() {
	const allItems = platformCategories.flatMap((c) => c.items);
	const itemListSchema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Windmill platform',
		description: 'Explore the Windmill platform: script editor, flow editor, app builder, triggers, workers, observability and more.',
		itemListElement: allItems.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			url: `https://www.windmill.dev${item.href}`,
		})),
	};

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Platform | Windmill</title>
					<meta name="title" content="Windmill platform" />
					<meta
						name="description"
						content="Explore the Windmill platform: script editor, flow editor, app builder, triggers, workers, observability and more."
					/>
					<link rel="icon" href="/img/logo.svg" />
					<script type="application/ld+json">
						{JSON.stringify(itemListSchema)}
					</script>
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
							<div className="text-center mb-16">
								<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
									The Windmill platform
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									Everything you need to build, deploy and run scripts, workflows and internal tools at scale.
								</p>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{platformCategories.flatMap((category) =>
									category.items.map((item) => (
										<PlatformCard key={item.name} item={item} />
									))
								)}
							</div>
						</div>
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
