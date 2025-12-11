import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
	{
		id: 1,
		company: 'Photoroom',
		logo: '/images/brands/logo-original-light-transparent.png',
		title: 'Scaling AI Image Processing Workflows with Windmill',
		description: 'How Photoroom processes millions of image transformations daily using Windmill\'s workflow engine, reducing processing time by 40% and improving reliability.',
		category: 'AI & Image Processing',
		author: {
			name: 'Eliot Andres',
			role: 'Co-Founder & CTO',
			image: '/contributors/eliot_andres.jpeg'
		},
		link: '/blog/photoroom-case-study'
	},
	{
		id: 2,
		company: 'Investing.com',
		logo: '/images/brands/Investing-Light.svg',
		title: 'Orchestrating AI Workflows for Financial Data Analysis',
		description: 'Investing.com uses Windmill to orchestrate complex AI workflows for automated stock analysis, content processing pipelines, and ETL processes.',
		category: 'Financial Services',
		author: {
			name: 'Yonathan Adest',
			role: 'Chief Technology Officer',
			image: '/contributors/yonathan_adest.jpeg'
		},
		link: '/blog/investing-case-study'
	},
	{
		id: 3,
		company: 'Qovery',
		logo: '/images/brands/Qovery-light.svg',
		title: 'Managing Complex Billing Engine with Workflow Orchestration',
		description: 'Qovery leverages Windmill to manage their entire playground and complex billing engine, covering all ETL and workflow orchestration needs.',
		category: 'DevOps & Infrastructure',
		author: {
			name: 'Romaric Philogène',
			role: 'Co-Founder & CEO',
			image: '/contributors/romaric_philogene.webp'
		},
		link: '/blog/qovery-case-study'
	}
];

function CaseStudyCard({ caseStudy }) {
	return (
		<Link
			to={caseStudy.link}
			className="group flex flex-col h-full rounded-2xl bg-gray-900 dark:bg-gray-950 border border-gray-800 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl !no-underline"
		>
			{/* Top section with logo and case study label */}
			<div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-950">
				<div className="flex items-start justify-between mb-4">
					<span className="text-xs font-semibold uppercase tracking-wider text-blue-400 dark:text-blue-500">
						Case Study
					</span>
				</div>
				<div className="flex items-center mb-4">
					<img
						src={caseStudy.logo}
						alt={`${caseStudy.company} logo`}
						className="h-12 max-w-[200px] object-contain filter brightness-0 invert dark:brightness-0 dark:invert"
					/>
				</div>
			</div>

			{/* Content section */}
			<div className="flex-1 px-6 pb-6 flex flex-col">
				<h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 dark:group-hover:text-blue-500 transition-colors">
					{caseStudy.title}
				</h3>
				<p className="text-gray-400 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-1">
					{caseStudy.description}
				</p>
				{/* Bottom section with category and link */}
				<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800 dark:border-gray-700">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
						{caseStudy.category}
					</span>
					<span className="text-sm font-medium text-blue-500 dark:text-blue-400 group-hover:text-blue-400 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
						Read the story
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</Link>
	);
}

export default function UseCasesPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Use Cases | Windmill</title>
					<meta name="title" content="Windmill Use Cases" />
					<meta
						name="description"
						content="Discover how Windmill can be used for various use cases and workflows."
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
							{/* Header section */}
							<div className="text-center mb-16">
								<h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
									Our customers deliver reliable products
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									From startups to public companies, our customers chose Windmill to power their products.
								</p>
							</div>

							{/* Case studies grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
								{caseStudies.map((caseStudy) => (
									<CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
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
