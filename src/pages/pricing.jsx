import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import Pricing from '../components/Pricing';
import LayoutProvider from '@theme/Layout/Provider';

export default function PricingPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Pricing | Windmill</title>
					<meta name="title" content="Windmill Pricing" />
					<meta
						name="description"
						content="Windmill is free to use. Price of paying offer depends of Self-hosted vs. Cloud, and of features between Team and Enterprise offers. "
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<Pricing />
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
