import React, { useEffect, useContext, createContext, useState } from 'react';
import Hero from '../landing/Hero';
import ScriptSection from '../landing/ScriptSection';
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
const DeveloperModeContext = createContext();
import LayoutProvider from '@theme/Layout/Provider';

export function useDeveloperMode() {
	return useContext(DeveloperModeContext);
}

function HomepageHeader() {
	const [developerMode, setDeveloperMode] = useState(false);

	useEffect(() => {
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	});

	return (
		<DeveloperModeContext.Provider
			value={{
				developerMode: developerMode,
				setDeveloperMode: setDeveloperMode
			}}
		>
			<LandingHeader />
			<Hero />
			<HeroExample />

			<ScriptSection />
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
			<LandingSection bgClass="py-0">
				<CallToAction />
			</LandingSection>
			<Footer />
		</DeveloperModeContext.Provider>
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
				</Head>
				<HomepageHeader />
			</main>
		</LayoutProvider>
	);
}
