import React from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import IntergrationList from '../landing/IntergrationList';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import EntrepriseFeatures from '../landing/EntrepriseFeatures';
import Head from '@docusaurus/Head';
import HeroExample from '../landing/HeroExample';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import LogoClouds from '../landing/LogoClouds';
import TestimonialsSection from '../landing/TestimonialsSection';
import ScriptLightSection from '../landing/ScriptLightSection';
import AppLightSection from '../landing/AppLightSection';
import FlowLightSection from '../landing/FlowLightSection';
import TutorialSection from '../landing/TutorialSection';

function HomepageHeader() {
	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			<HeroExample />

			<TutorialSection />

			<ScriptLightSection />
			<FlowLightSection />
			<AppLightSection />
			<IntergrationList />
			<EntrepriseFeatures />
			<TestimonialsSection />
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
					<meta name="title" content="Internal tools with scripts." />
					<meta
						name="description"
						content="Open source low code framework to turn scripts into workflows and internal apps with auto-generated UIs in minutes"
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<HomepageHeader />
			</main>
		</LayoutProvider>
	);
}
