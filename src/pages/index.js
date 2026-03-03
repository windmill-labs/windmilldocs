import React, { useState } from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import SeoHead from '../components/SeoHead';
import HeroExample from '../landing/HeroExample';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import BrowserOnly from '@docusaurus/BrowserOnly';
import LogoClouds from '../landing/LogoClouds';
import TestimonialsSection from '../landing/TestimonialsSection';
import CorePrinciple from '../landing/CorePrinciple';
import ScriptLightSection from '../landing/ScriptLightSection';
import AppLightSection from '../landing/AppLightSection';
import FlowLightSection from '../landing/FlowLightSection';
import TutorialSection from '../landing/TutorialSection';
import Head from '@docusaurus/Head';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { platformLayers } from '../landing/platformLayers';

import MobileTutorialSection from '../landing/MobileTutorialSection';
import DeveloperExperienceSection from '../landing/DeveloperExperienceSection';
import ProductionTabs, { defaultTabs } from '../landing/components/ProductionTabs';

const steps = [
	{ num: 1, label: 'Write your business logic' },
	{ num: 2, label: 'Push it to Windmill' },
	{ num: 3, label: 'Get a complete platform out of the box' },
];


function StepsRow({ activeStep = 0 }) {
	return (
		<div className="flex items-center w-full">
			{steps.map((step, i) => {
				const isActive = step.num === activeStep;
				return (
					<React.Fragment key={step.num}>
						<div className={`flex items-center gap-2.5 flex-1 justify-center py-3 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
							<span className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 transition-colors duration-300 ${
								isActive
									? 'border-2 border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
									: 'border-2 border-gray-400 text-gray-400 dark:border-gray-600 dark:text-gray-600'
							}`}>
								{step.num}
							</span>
							<span className={`text-sm transition-colors duration-300 ${
								isActive ? 'text-gray-900 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-500'
							}`}>{step.label}</span>
						</div>
						{i < steps.length - 1 && (
							<ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
}

function PlatformLayersPanel() {
	const [openLayer, setOpenLayer] = useState(null);
	return (
		<div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 overflow-hidden h-fit">
			<div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
				<img src="/img/windmill.svg" alt="Windmill" className="w-5 h-5" />
				<span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Built-in platform layers</span>
			</div>
			<div className="p-4 flex flex-col gap-2">
				{platformLayers.map((layer, i) => {
					const Icon = layer.icon;
					const isOpen = openLayer === i;
					return (
						<div key={layer.label} className="rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-hidden">
							<button
								onClick={() => setOpenLayer(isOpen ? null : i)}
								className={`flex items-center gap-3 px-3 py-2.5 w-full text-left transition-colors ${isOpen ? '' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}
							>
								<div className="w-1 h-6 rounded-full bg-emerald-500 shrink-0" />
								<Icon className="w-4 h-4 text-blue-500 shrink-0" />
								<div className="flex-1 min-w-0">
									<span className="text-sm font-medium text-gray-900 dark:text-white">{layer.label}</span>
									<span className="text-xs text-gray-500 dark:text-gray-400 ml-2 hidden sm:inline">{layer.detail}</span>
								</div>
								<ChevronRight className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
							</button>
							{isOpen && (
								<div className="px-3 pb-3 pt-0 ml-[44px]">
									<p className="text-sm text-gray-600 dark:text-gray-300">{layer.expanded}</p>
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

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

const phaseToStep = {
	waiting: 0,
	typing: 1,
	connect: 1,
	usecases: 2,
	ready: 2,
	pushing: 2,
	deploying: 2,
	monitoring: 3,
};

function HomepageHeader() {
	const [activeStep, setActiveStep] = useState(0);
	const handlePhaseChange = React.useCallback((phase) => {
		setActiveStep(phaseToStep[phase] || 0);
	}, []);

	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			<div className="max-w-7xl mx-auto px-8 py-16 mt-0">
				<div className="mb-8">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						You write the logic, Windmill runs it
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						Windmill turns your scripts into a production-grade platform. Backend, frontend, orchestration, monitoring, all built in. Self-host or use Windmill Cloud.
					</p>
				</div>

				<div className="mb-8">
					<StepsRow activeStep={activeStep} />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<BrowserOnly>
						{() => {
							const CompleteAnimation = require('../landing/CompleteAnimation').default;
							return <CompleteAnimation onPhaseChange={handlePhaseChange} />;
						}}
					</BrowserOnly>
					<PlatformLayersPanel />
				</div>

			</div>
			<div className="max-w-7xl mx-auto px-8 py-16">
				<div className="mb-8">
					<h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
						Build
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-300">
						Build mission-critical internal tools and data pipelines that integrate directly with your existing stack and resources using code with a powerful WebIDE or locally using our CLI and your favorite editor and AI agent.
					</p>
				</div>
				<ProductionTabs tabs={defaultTabs} enableSubtitles={true} />
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
