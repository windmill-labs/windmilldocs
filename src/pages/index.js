import React from 'react';
import Hero from '../landing/Hero';
import Footer from '../landing/Footer';
import IntegrationsList from '../landing/IntegrationsList';
import LandingSection from '../landing/LandingSection';
import CallToAction from '../landing/CallToAction';
import EntrepriseFeatures from '../landing/EntrepriseFeatures';
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

import MobileTutorialSection from '../landing/MobileTutorialSection';
import DeveloperExperienceSection from '../landing/DeveloperExperienceSection';

function HomepageHeader() {
	return (
		<>
			<LandingHeader />
			<Hero />
			<LogoClouds />
			<div className="hidden sm:block">
				<TutorialSection subIndex={undefined} />
			</div>
			<div className="block sm:hidden">
				<MobileTutorialSection />
			</div>
			<DeveloperExperienceSection />
			<CorePrinciple />
			<TestimonialsSection />
			<HeroExample />
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
				<SeoHead />
				<HomepageHeader />
			</main>
		</LayoutProvider>
	);
}
