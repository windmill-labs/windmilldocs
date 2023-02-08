import React, { useEffect } from 'react';
import Hero from '../landing/Hero';
import ScriptSection from '../landing/ScriptSection';
import FlowSection from '../landing/FlowSection';
import AppSection from '../landing/AppSection';
import Footer from '../landing/Footer';
import IntergrationList from '../landing/IntergrationList';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import EntrepriseFeatures from '../landing/EntrepriseFeatures';

import HeroExample from '../landing/HeroExample';

function HomepageHeader() {
	useEffect(() => {
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	});

	return (
		<div>
			<Hero />
			<HeroExample />
			<div className="divide-y ">
				<ScriptSection />
				<FlowSection />
				<AppSection />
			</div>

			<IntergrationList />
			<EntrepriseFeatures />
			<LandingSection bgClass="bg-white">
				<CallToAction />
			</LandingSection>
			<Footer />
		</div>
	);
}

export default function Home() {
	return (
		<main>
			<HomepageHeader />
		</main>
	);
}
