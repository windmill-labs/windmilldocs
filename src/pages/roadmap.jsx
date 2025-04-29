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
					<h1 className="text-center pt-32 text-2xl font-bold text-blue-500">Roadmap</h1>
					<div className="text-center mx-auto max-w-3xl px-4 pb-8">
						<p className="text-secondary mt-4">
							This roadmap sets out the main features we want to release at the moment. 
							To see the latest releases, check our <a href="/changelog" className="text-blue-400 hover:text-blue-300">Changelog</a> and 
							to see all feature requests, visit our <a href="https://github.com/windmill-labs/windmill/issues" className="text-blue-400 hover:text-blue-300">GitHub</a>.
						</p>
					</div>
					<div className="pt-20">
						<Roadmap />
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
