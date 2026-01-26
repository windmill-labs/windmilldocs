import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'lucide-react';
import { caseStudies } from '../data/case-studies';
import { useColorMode } from '@docusaurus/theme-common';

function CaseStudyCard({ caseStudy }) {
	const { colorMode } = useColorMode();
	
	// Derive logo path based on color mode
	// In light mode, use dark logo (dark on light background)
	// In dark mode, use light logo (light on dark background)
	const getLogoPath = () => {
		if (colorMode === 'light') {
			// Light mode: use dark logo
			return caseStudy.logo.replace('-light.png', '-dark.png');
		} else {
			// Dark mode: use light logo
			return caseStudy.logo;
		}
	};
	return (
		<Link
			to={caseStudy.link}
			className="group flex flex-col h-full rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-500 dark:hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl !no-underline"
		>
			{/* Top section with logo and case study label */}
			<div className="relative px-6 pt-6 pb-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 min-h-[200px] flex flex-col">
				<div className="flex items-start justify-between mb-4">
					<span className="text-xs font-semibold uppercase tracking-wider text-blue-500 dark:text-blue-400">
						Case Study
					</span>
				</div>
				<div className="flex items-center justify-center w-full flex-1 min-h-[120px]">
					<img
						src={getLogoPath()}
						alt={`${caseStudy.company} logo`}
						className="h-28 w-full object-contain"
					/>
				</div>
			</div>

			{/* Content section */}
			<div className="flex-1 px-6 pt-6 pb-6 flex flex-col">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
					{caseStudy.title}
				</h3>
				<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-1">
					{caseStudy.description}
				</p>
				{/* Bottom section with category and link */}
				<div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
					<span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
						{caseStudy.category}
					</span>
					<span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 flex items-center gap-1 transition-colors">
						Read the story
						<ArrowRight className="w-4 h-4" />
					</span>
				</div>
			</div>
		</Link>
	);
}

export default function CaseStudiesPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Case Studies | Windmill</title>
					<meta name="title" content="Windmill Case Studies" />
					<meta
						name="description"
						content="Discover how companies use Windmill to power their products and workflows."
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
								    Trusted by teams building world-class internal software 
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									From startups to public companies, our customers choose Windmill to power their internal platforms and operations at scale.
								</p>
							</div>

							{/* Case studies grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
								{caseStudies
									.filter((caseStudy) => caseStudy.released)
									.map((caseStudy) => (
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
