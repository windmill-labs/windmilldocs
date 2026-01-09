import React from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import IntegrationsList from '../landing/IntegrationsList';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import EntrepriseFeatures from '../landing/EntrepriseFeatures';
import Head from '@docusaurus/Head';
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
import MobileTutorialSection from '../landing/MobileTutorialSection';
import DeveloperExperienceSection from '../landing/DeveloperExperienceSection';

function HomepageHeader() {
	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			{/* HeroExample /> */}
			<div className="hidden sm:block">
				<TutorialSection subIndex={undefined} />
			</div>
			<div className="block sm:hidden">
				<MobileTutorialSection />
			</div>
			<DeveloperExperienceSection />
			<CorePrinciple />
			<TestimonialsSection />
			{/* <IntegrationsList /> */}
			{/* <EntrepriseFeatures /> */}
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
				<Head>
					<title>Windmill | Open-source developer platform and workflow engine</title>
					<meta name="title" content="Open-source developer platform and workflow engine" />
					<meta
						name="description"
						content="Turn scripts into auto-generated UIs, APIs and cron jobs. Compose them as workflows or data pipelines. Build complex, data-intensive apps with ease. Write and deploy software 10x faster, and run it with the highest reliability and observability on the fastest self-hostable job orchestrator"
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<HomepageHeader />
			</main>
		</LayoutProvider>
	);
}
