import React from 'react';
import Hero from '../landing/Hero';
import FlowSection from '../landing/FlowSection';
import AppSection from '../landing/AppSection';
import CoreSection from '../landing/CoreSection';
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
import BrowserOnly from '@docusaurus/BrowserOnly';
import GlobalContextProvider from '../components/GlobalContextProvider';
import TestimonialsSection from '../landing/TestimonialsSection';

function HomepageHeader() {
	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			<HeroExample />
			<FlowSection />
			<AppSection />
			<CoreSection
				title="Scripts"
				caption="No overhead, scalable, self-hostable FaaS"
				cards={[]}
				description={
					'Run long-running heavy background jobs, script with complex dependencies, endpoints with high rpm or simple one-off tasks without any overhead. Trigger them from a webhook or the auto-generated UI and monitor them easily.'
				}
				color="blue"
				key="script-card"
				kind="script"
			/>
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
					<title>Windmill | Open source platform to build internal tools with scripts</title>
					<meta name="title" content="Internal tools with scripts." />
					<meta
						name="description"
						content="Open source low code framework to turn scripts into workflows and internal apps with auto-generated UIs in minutes"
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>

				<BrowserOnly fallback={<div>Loading...</div>}>
					{() => (
						<GlobalContextProvider>
							<HomepageHeader />
						</GlobalContextProvider>
					)}
				</BrowserOnly>
			</main>
		</LayoutProvider>
	);
}
