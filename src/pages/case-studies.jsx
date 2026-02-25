import React, { useState } from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import { caseStudies } from '../data/case-studies';
import CaseStudyCard from '../components/use-cases/CaseStudyCard';

const INDUSTRY_FILTERS = ['All', 'Enterprise Software', 'IT Infrastructure', 'Cybersecurity', 'Financial Services'];

export default function CaseStudiesPage() {
	const [activeFilter, setActiveFilter] = useState('All');
	const releasedStudies = caseStudies.filter((cs) => cs.released);
	const filteredStudies = activeFilter === 'All'
		? releasedStudies
		: releasedStudies.filter((cs) => cs.category === activeFilter);
	const itemListSchema = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: 'Windmill Case Studies',
		description: 'How companies use Windmill to power production workflows, internal platforms, and automation at scale.',
		itemListElement: releasedStudies.map((cs, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: cs.title,
			url: `https://www.windmill.dev${cs.link}`
		}))
	};

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
								    Trusted by teams building world-class internal software 
								</h1>
								<p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
									From startups to public companies, our customers choose Windmill to power their internal platforms and operations at scale.
								</p>

								{/* Industry filters */}
								<div className="flex flex-wrap justify-center gap-2 mt-8">
									{INDUSTRY_FILTERS.map((filter) => (
										<button
											key={filter}
											onClick={() => setActiveFilter(filter)}
											className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
												activeFilter === filter
													? 'bg-blue-600 text-white'
													: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
											}`}
										>
											{filter}
										</button>
									))}
								</div>
							</div>

							{/* Case studies grid */}
							<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
								{filteredStudies.map((caseStudy) => (
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
