import React, { useEffect } from 'react';
import Hero from '../landing/Hero';
import ScriptSection from '../landing/ScriptSection';
import FlowSection from '../landing/FlowSection';
import AppSection from '../landing/AppSection';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';

function HomepageHeader() {
	useEffect(() => {
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	});

	return (
		<div className="divide-y">
			<LandingHeader />
			<Hero />
			<ScriptSection />
			<FlowSection />
			<AppSection />
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
