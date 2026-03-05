import React from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
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
import DeveloperExperienceSection from '../landing/DeveloperExperienceSection';
import ProductionTabs, { defaultTabs } from '../landing/components/ProductionTabs';


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
			<div className="max-w-7xl mx-auto px-8 py-16">
				<div className="mb-8">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Build with code, without the overhead
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						Build mission-critical internal tools and data pipelines that integrate directly with your existing stack and resources. Use Windmill's WebIDE or work locally with your favorite editor, CLI and AI agent.
					</p>
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl">
					<ProductionTabs tabs={defaultTabs} enableSubtitles={true} />
				</div>
			</div>
			<DeveloperExperienceSection />
			<CorePrinciple />
			<TestimonialsSection />
			{/* <div className="hidden sm:block">
				<TutorialSection subIndex={undefined} />
			</div>
			<div className="block sm:hidden">
				<MobileTutorialSection />
			</div> */}
			<HeroExample />
			<LandingSection bgClass="py-0">
				<CallToAction />
			</LandingSection>
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
