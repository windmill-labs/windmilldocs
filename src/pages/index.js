import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';

import { SiGnubash, SiGo, SiPython, SiTypescript } from 'react-icons/si/index';
import TabsW from '../components/Tabs';
import LandingSection from '../landing/LandingSection';
import FeatureCard from '../landing/FeatureCard';
import Hero from '../landing/Hero';
import Banner from '../landing/Banner';
import WindmillFeatures from '../landing/WindmillFeatures';
import ScriptSection from '../landing/ScriptSection';
import FlowSection from '../landing/FlowSection';
import AppSection from '../landing/AppSection';

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
			<Banner />
			<Hero />
			<ScriptSection />
			<FlowSection />
			<AppSection />
			<WindmillFeatures />
		</div>
	);
}

export default function Home() {
	return (
		<Layout title="Home">
			<main>
				<HomepageHeader />
				<div className="mx-auto max-w-7xl homepage">
					<Pricing />
				</div>
				<div className="mb-40"></div>
			</main>
		</Layout>
	);
}
