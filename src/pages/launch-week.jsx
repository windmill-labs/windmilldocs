import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroCTAButtons from '../components/products/HeroCTAButtons';

const fadeIn = {
	initial: { opacity: 0, y: 20 },
	whileInView: { opacity: 1, y: 0 },
	viewport: { once: true },
	transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = (delay = 0) => ({
	...fadeIn,
	transition: { duration: 0.6, delay, ease: 'easeOut' },
});

const days = [
	{
		day: 1,
		weekday: 'Monday',
		date: 'Mar 24',
		releaseDate: new Date('2026-03-24T00:00:00'),
		title: 'Data tables / Ducklake',
		description: 'Store and query relational data with managed SQL, powered by Ducklake.',
		href: '/platform/datatables',
	},
	{
		day: 2,
		weekday: 'Tuesday',
		date: 'Mar 25',
		releaseDate: new Date('2026-03-25T00:00:00'),
		title: 'Full code apps',
		description: 'Build complete applications with React and Svelte frontends connected to backend logic.',
		href: '/platform/app-builder',
	},
	{
		day: 3,
		weekday: 'Wednesday',
		date: 'Mar 26',
		releaseDate: new Date('2026-03-26T00:00:00'),
		title: 'Volumes, sandboxes, AI sandbox',
		description: 'Run Claude Code, Codex, or custom agents in isolated environments with persistent volumes.',
		href: '/platform/sandboxes',
	},
	{
		day: 4,
		weekday: 'Thursday',
		date: 'Mar 27',
		releaseDate: new Date('2026-03-27T00:00:00'),
		title: 'Git sync v2, deploy UI',
		description: 'Sync with Git, stage workspaces, and deploy via CI/CD with an improved deploy interface.',
		href: '/platform/deployment-versioning',
	},
	{
		day: 5,
		weekday: 'Friday',
		date: 'Mar 28',
		releaseDate: new Date('2026-03-28T00:00:00'),
		title: 'Workflow-as-code v2',
		description: 'Define complex workflows entirely in code with the next generation of our SDK.',
		href: '#',
	},
];

const cardVisuals = [
	// Day 1: Data tables - grid pattern
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
				</linearGradient>
			</defs>
			{Array.from({ length: 5 }, (_, i) =>
				Array.from({ length: 5 }, (_, j) => (
					<rect key={`${i}-${j}`} x={25 + j * 32} y={25 + i * 32} width="24" height="24" rx="4" fill="url(#g1)" />
				))
			)}
		</svg>
	),
	// Day 2: Full code apps - layered rectangles
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.15" />
				</linearGradient>
			</defs>
			<rect x="25" y="40" width="130" height="90" rx="10" fill="none" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<rect x="45" y="60" width="130" height="90" rx="10" fill="none" stroke="#3b82f6" strokeOpacity="0.4" strokeWidth="1.5" />
			<rect x="65" y="80" width="130" height="90" rx="10" fill="url(#g2)" />
		</svg>
	),
	// Day 3: Sandboxes - concentric circles
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<radialGradient id="g3" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
				</radialGradient>
			</defs>
			{[80, 60, 40, 20].map((r, i) => (
				<circle key={i} cx="100" cy="100" r={r} fill="none" stroke="#3b82f6" strokeOpacity={0.2 + i * 0.15} strokeWidth="1.5" />
			))}
			<circle cx="100" cy="100" r="10" fill="url(#g3)" />
		</svg>
	),
	// Day 4: Git sync - branching lines
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<path d="M100 20 L100 180" stroke="#3b82f6" strokeOpacity="0.5" strokeWidth="2" fill="none" />
			<path d="M100 60 Q135 60 145 95 L145 135" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
			<path d="M100 110 Q65 110 55 140 L55 170" stroke="#60a5fa" strokeOpacity="0.45" strokeWidth="1.5" fill="none" />
			<circle cx="100" cy="60" r="6" fill="#3b82f6" fillOpacity="0.5" />
			<circle cx="100" cy="110" r="6" fill="#3b82f6" fillOpacity="0.5" />
			<circle cx="145" cy="135" r="6" fill="#60a5fa" fillOpacity="0.4" />
			<circle cx="55" cy="170" r="6" fill="#60a5fa" fillOpacity="0.4" />
			<circle cx="100" cy="180" r="6" fill="#3b82f6" fillOpacity="0.3" />
		</svg>
	),
	// Day 5: Workflow-as-code - connected nodes
	() => (
		<svg viewBox="0 0 200 200" className="w-full h-full">
			<defs>
				<linearGradient id="g5" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
					<stop offset="100%" stopColor="#60a5fa" stopOpacity="0.25" />
				</linearGradient>
			</defs>
			<line x1="55" y1="45" x2="145" y2="45" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="145" y1="45" x2="145" y2="100" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="145" y1="100" x2="55" y2="100" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="55" y1="100" x2="55" y2="155" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			<line x1="55" y1="155" x2="145" y2="155" stroke="#3b82f6" strokeOpacity="0.3" strokeWidth="1.5" />
			{[[55, 45], [145, 45], [145, 100], [55, 100], [55, 155], [145, 155]].map(([x, y], i) => (
				<rect key={i} x={x - 10} y={y - 10} width="20" height="20" rx="4" fill="url(#g5)" />
			))}
		</svg>
	),
];

function DayCard({ item, index }) {
	const Visual = cardVisuals[index];

	return (
		<motion.div className="flex" {...stagger(index * 0.08)}>
			<Link
				to={item.href}
				className="group flex flex-col w-full rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 !no-underline hover:text-current hover:border-gray-400 dark:hover:border-gray-600 transition-colors overflow-hidden"
			>
				<div className="flex-1 flex items-center justify-center p-8 aspect-square">
					<Visual />
				</div>
				<div className="p-5">
					<span className="text-sm text-gray-400 dark:text-gray-500 mb-2 block">
						{item.weekday}
					</span>
					<h3 className="text-base font-semibold leading-snug text-gray-900 dark:text-white">
						Introducing {item.title}
					</h3>
				</div>
			</Link>
		</motion.div>
	);
}

export default function LaunchWeekPage() {
	const eventSchema = {
		'@context': 'https://schema.org',
		'@type': 'Event',
		name: 'Windmill launch week',
		description:
			'Five major releases in one week: data tables, full code apps, AI sandboxes, Git sync v2, and workflow-as-code v2.',
		startDate: '2026-03-24',
		endDate: '2026-03-28',
		eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
		location: {
			'@type': 'VirtualLocation',
			url: 'https://www.windmill.dev/launch-week',
		},
		organizer: {
			'@type': 'Organization',
			name: 'Windmill',
			logo: {
				'@type': 'ImageObject',
				url: 'https://www.windmill.dev/img/windmill.svg',
			},
		},
	};

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Launch week | Windmill</title>
					<meta name="title" content="Launch week | Windmill" />
					<meta
						name="description"
						content="What is new in Windmill? Five major releases in one week: data tables, full code apps, AI sandboxes, Git sync v2, and workflow-as-code v2."
					/>
					<link rel="icon" href="/img/logo.svg" />
					<script type="application/ld+json">{JSON.stringify(eventSchema)}</script>
				</Head>

				<div className="pt-32">
					<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
						{/* Hero */}
						<motion.div className="mb-20" {...fadeIn}>
							<p className="text-sm text-gray-400 dark:text-gray-500 mb-6">
								March 24 to 28, 2026
							</p>
							<div className="font-bold tracking-tighter text-gray-900 dark:text-white" style={{ fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 0.9 }}>
								Launch week
							</div>
						</motion.div>

						{/* Main stage */}
						<motion.div className="mb-6" {...stagger(0.1)}>
							<div className="text-2xl font-bold text-gray-900 dark:text-white">
								Main stage
							</div>
						</motion.div>

						{/* Day cards */}
						<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
							{days.map((day, index) => (
								<DayCard key={day.day} item={day} index={index} />
							))}
						</div>

						{/* Build stage */}
						<motion.div className="mt-24" {...stagger(0.3)}>
							<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
								<div>
									<div className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
										Build stage
									</div>
									<p className="text-sm text-gray-400 dark:text-gray-500">
										A collection of recent releases and improvements.
									</p>
								</div>
								<div className="border-t border-gray-200 dark:border-gray-800">
									{[
										{ title: 'GitHub Enterprise app integration', href: '/changelog/github-enterprise-app' },
										{ title: 'Token expiration notifications', href: '/changelog/token-expiration-notifications' },
										{ title: 'Flow environment variables and resources', href: '/changelog/flow-env-variables-resources' },
										{ title: 'Private registries for npm, Maven and Cargo', href: '/changelog/private-registries-npm-maven-cargo' },
										{ title: 'Native mode', href: '/changelog/native-mode' },
										{ title: 'Native triggers', href: '/changelog/native-triggers' },
										{ title: 'Infrastructure as code', href: '/changelog/infrastructure-as-code' },
										{ title: 'Health endpoints', href: '/changelog/health-endpoints' },
									].map((item, i) => (
										<Link
											key={i}
											to={item.href}
											className="group flex items-center gap-3 py-4 border-b border-gray-200 dark:border-gray-800 !no-underline hover:text-current"
										>
											<span className="w-1.5 h-1.5 rounded-sm bg-gray-300 dark:bg-gray-600 shrink-0" />
											<span className="text-base text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
												{item.title}
											</span>
										</Link>
									))}
								</div>
							</div>
						</motion.div>

						{/* CTA */}
						<motion.div className="mt-24 text-center" {...stagger(0.6)}>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
								Try these features today
							</h2>
							<div className="flex justify-center">
								<HeroCTAButtons />
							</div>
						</motion.div>
					</div>
				</div>

				<Footer />
			</main>
		</LayoutProvider>
	);
}
