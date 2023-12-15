import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import LandingSection from '../landing/LandingSection';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import Pricing from '../components/Pricing';
import LayoutProvider from '@theme/Layout/Provider';

export default function PricingPage() {
	return (
		<LayoutProvider>
			<main>
				<LandingHeader />
				<Head>
					<title>Pricing | Windmill</title>
					<meta name="title" content="Windmill Pricing." />
					<meta
						name="description"
						content="Windmill is free to use. Price of paying offer depends of Self-hosted vs. Cloud, and of features between Team and Enterprise offers. "
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<LandingSection bgClass="relative">
					<>
						<RadialBlur />
						<div className="pt-32">
							<Pricing />
						</div>
					</>
				</LandingSection>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
