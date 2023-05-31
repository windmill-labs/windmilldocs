import React, { useEffect, useContext, createContext, useState } from 'react';
import Hero from '../landing/Hero';
import ScriptSection from '../landing/ScriptSection';
import FlowSection from '../landing/FlowSection';
import AppSection from '../landing/AppSection';
import Footer from '../landing/Footer';
import IntergrationList from '../landing/IntergrationList';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import EntrepriseFeatures from '../landing/EntrepriseFeatures';
import Head from '@docusaurus/Head';

import DevScriptSection from '../landing/DevScriptSection';
import DevFlowSection from '../landing/DevFlowSection';

import HeroExample from '../landing/HeroExample';

const DeveloperModeContext = createContext();

export function useDeveloperMode() {
	return useContext(DeveloperModeContext);
}

function HomepageHeader() {
	const [developerMode, setDeveloperMode] = useState(true);

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
				developerMode,
				setDeveloperMode
			}}
		>
			<div>
				<Hero />
				<HeroExample />
				{developerMode ? (
					<div className="divide-y ">
						<DevScriptSection />
						<DevFlowSection />
						<DevScriptSection />
					</div>
				) : (
					<div className="divide-y ">
						<ScriptSection />
						<FlowSection />
						<AppSection />
					</div>
				)}

				<IntergrationList />
				<EntrepriseFeatures />
				<LandingSection bgClass="bg-white">
					<CallToAction />
				</LandingSection>
				<Footer />
			</div>
		</DeveloperModeContext.Provider>
	);
}

export default function Home() {
	return (
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
	);
}
