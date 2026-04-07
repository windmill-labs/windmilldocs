import React from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import ProductCTA from '../components/products/ProductCTA';
import SeoHead from '../components/SeoHead';
import HeroExample from '../landing/HeroExample';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';


import LogoClouds from '../landing/LogoClouds';
import TestimonialsSection from '../landing/TestimonialsSection';
import CorePrinciple from '../landing/CorePrinciple';
import ScriptLightSection from '../landing/ScriptLightSection';
import AppLightSection from '../landing/AppLightSection';
import FlowLightSection from '../landing/FlowLightSection';
import TutorialSection from '../landing/TutorialSection';
import Head from '@docusaurus/Head';


import MobileTutorialSection from '../landing/MobileTutorialSection';
import WhatYouCanBuild from '../landing/WhatYouCanBuild';
import WorkspaceSection from '../landing/WorkspaceSection';
import ObservabilitySection from '../landing/ObservabilitySection';
import { BenchmarkCard } from '../landing/DeveloperExperienceSection';


const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Windmill',
	url: 'https://www.windmill.dev',
	logo: 'https://www.windmill.dev/img/windmill.svg',
	description:
		'Open-source platform to build, deploy and monitor internal tools from scripts. Turn scripts into auto-generated UIs, APIs and cron jobs. Compose them as workflows or data pipelines.',
	sameAs: [
		'https://github.com/windmill-labs/windmill',
		'https://discord.com/invite/V7PM2YHsPB',
		'https://twitter.com/WindmillDev',
		'https://www.youtube.com/@windaborern',
		'https://www.linkedin.com/company/windmill-dev'
	],
	address: {
		'@type': 'PostalAddress',
		addressLocality: 'Dover',
		addressRegion: 'DE',
		addressCountry: 'US'
	}
};

function HomepageHeader() {
	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			<WhatYouCanBuild />
			<WorkspaceSection />
			<ObservabilitySection />
			<div className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
				<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
					Run at any scale with best performance
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
					We engineered Windmill to be the fastest orchestrator in the industry. From a single-node VPS to 1,000-node K8s clusters, auto-scale on demand with dedicated worker groups.
				</p>
				<BenchmarkCard />
			</div>
			<CorePrinciple />
			<TestimonialsSection />
			<HeroExample />
			<ProductCTA />
			<Footer />
		</>
	);
}

export default function Home() {
	return (
		<LayoutProvider>
			<main>
				<SeoHead />
				<Head>
					<script type="application/ld+json">
						{JSON.stringify(organizationSchema)}
					</script>
				</Head>
				<HomepageHeader />
			</main>
		</LayoutProvider>
	);
}
