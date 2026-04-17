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
import Head from '@docusaurus/Head';
import WhatYouCanBuild from '../landing/WhatYouCanBuild';
import CodeFirstSection from '../landing/CodeFirstSection';
import HowYouBuild from '../landing/HowYouBuild';

import WorkspaceSection from '../landing/WorkspaceSection';
import ObservabilitySection from '../landing/ObservabilitySection';
import PerformanceSection from '../landing/PerformanceSection';
import CorePrinciple from '../landing/CorePrinciple';


const organizationSchema = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Windmill',
	url: 'https://www.windmill.dev',
	logo: 'https://www.windmill.dev/img/windmill.svg',
	description:
		'Open-source platform to build, orchestrate, and monitor internal tools from scripts. Turn scripts into auto-generated UIs, APIs and cron jobs. Compose them as workflows or data pipelines.',
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
			<HowYouBuild />
			<CodeFirstSection />
			<WorkspaceSection />
			<ObservabilitySection />
			<PerformanceSection />
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
