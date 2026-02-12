import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import Pricing from '../components/Pricing';
import LayoutProvider from '@theme/Layout/Provider';

const softwareApplicationSchema = {
	'@context': 'https://schema.org',
	'@type': 'SoftwareApplication',
	name: 'Windmill',
	description: 'How much does Windmill cost? Transparent pricing based on compute units, from free Community Edition to Team and Enterprise plans.',
	applicationCategory: 'DeveloperApplication',
	operatingSystem: 'Web',
	url: 'https://www.windmill.dev',
	offers: [
		{
			'@type': 'Offer',
			name: 'Community Edition',
			price: '0',
			priceCurrency: 'USD'
		},
		{
			'@type': 'Offer',
			name: 'Team',
			price: '10',
			priceCurrency: 'USD',
			unitText: 'per seat/month'
		},
		{
			'@type': 'Offer',
			name: 'Enterprise',
			priceSpecification: {
				'@type': 'PriceSpecification',
				priceCurrency: 'USD',
				description: 'Custom pricing based on seats and compute units'
			}
		}
	]
};

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
					<script type="application/ld+json">
						{JSON.stringify(softwareApplicationSchema)}
					</script>
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
