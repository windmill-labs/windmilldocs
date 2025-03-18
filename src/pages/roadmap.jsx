import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';
import Roadmap from '../components/roadmap';
export default function PricingPage() {
	return (
		<LayoutProvider>
			<main>
				<LandingHeader />
				<Head>
					<title>Roadmap | Windmill</title>
					<meta name="title" content="Windmill Roadmap" />
					<meta name="description" content="Windmill roadmap" />
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<h1 className="text-center pt-32 text-2xl font-bold">Roadmap</h1>
					<div className="pt-20">
						<Roadmap />
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
