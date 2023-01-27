import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import LandingSection from '../landing/LandingSection';

import Pricing from '../components/Pricing';

export default function PricingPage() {
	return (
		<main className="divide-y">
			<LandingHeader />
			<LandingSection bgClass="bg-white">
				<Pricing />
			</LandingSection>
			<Footer />
		</main>
	);
}
