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
import DeveloperExperienceSection from '../landing/DeveloperExperienceSection';
import ProductionTabs, { defaultTabs } from '../landing/components/ProductionTabs';
import { Lottie } from '../landing/LightFeatureCard';
import devfriendly from '/illustrations/devfriendly.json';


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
				<a href="/docs/advanced/local_development" className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl mt-8 grid grid-cols-1 md:grid-cols-5 gap-8 group !no-underline hover:text-current cursor-pointer">
					<div className="col-span-2 flex flex-col justify-center">
						<div className="font-medium text-2xl mb-4 text-gray-900 dark:text-white group-hover:ml-2 transition-all">
							Full local dev experience
						</div>
						<div className="text-md mb-4 text-gray-700 dark:text-gray-300 group-hover:ml-2 transition-all max-w-sm">
							Use Windmill locally via our CLI and VS Code extension. Leverage AI-assisted rules for Cursor and Claude, and deploy through automated Git-sync pipelines across staging and production.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Set up local dev
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
						</div>
					</div>
					<div className="col-span-3">
						<Lottie lottieData={devfriendly} autoplay loop={true} />
					</div>
				</a>
			</div>
			<DeveloperExperienceSection />
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
