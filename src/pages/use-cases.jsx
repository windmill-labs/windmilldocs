import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import {
	WrenchScrewdriverIcon,
	ArrowPathIcon,
	CircleStackIcon,
	CodeBracketIcon,
	ClockIcon,
} from '@heroicons/react/24/outline';
import { Bot } from 'lucide-react';
import { useCases } from '../data/use-cases';

const iconMap = {
	WrenchScrewdriverIcon,
	ArrowPathIcon,
	CircleStackIcon,
	CodeBracketIcon,
	ClockIcon,
	Bot,
};

function UseCaseCard({ useCase }) {
	const Icon = iconMap[useCase.icon];
	return (
		<Link
			to={useCase.link}
			className="group flex flex-col h-full rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl !no-underline"
		>
			<div className="flex-1 px-6 pt-8 pb-6 flex flex-col">
				{Icon && (
					<div className="mb-4">
						<Icon className="w-10 h-10 text-blue-500" />
					</div>
				)}
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{useCase.headline}
				</h3>
				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-1">
					{useCase.description}
				</p>
				<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
						{useCase.name}
					</span>
					<span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
						Learn more
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</Link>
	);
}

export default function UseCasesPage() {
	const releasedUseCases = useCases.filter((uc) => uc.released);
	const itemListSchema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Windmill use cases',
		description: 'Discover what you can build with Windmill: internal tools, workflow automation, data pipelines, AI agents and more.',
		itemListElement: releasedUseCases.map((uc, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: uc.name,
			url: `https://www.windmill.dev${uc.link}`
		}))
	};

	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Use cases | Windmill</title>
					<meta name="title" content="Windmill use cases" />
					<meta
						name="description"
						content="Discover what you can build with Windmill: internal tools, workflow automation, data pipelines, scripts and endpoints, AI agents and scheduled tasks."
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
							{/* Header section */}
							<div className="text-center mb-16">
								<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
									What you can build with Windmill
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									From internal tools to data pipelines, Windmill is the open-source platform for turning scripts into production-grade workflows, UIs and APIs.
								</p>
							</div>

							{/* Use cases grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
								{releasedUseCases.map((useCase) => (
									<UseCaseCard key={useCase.slug} useCase={useCase} />
								))}
							</div>
						</div>
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
