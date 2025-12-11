import React from 'react';
import Footer from '../landing/Footer';
import LandingHeader from '../landing/LandingHeader';
import Head from '@docusaurus/Head';
import RadialBlur from '../landing/RadialBlur';
import LayoutProvider from '@theme/Layout/Provider';

export default function UseCasesPage() {
	return (
		<LayoutProvider>
			<main className="relative min-h-screen w-full overflow-x-hidden">
				<LandingHeader />
				<Head>
					<title>Use Cases | Windmill</title>
					<meta name="title" content="Windmill Use Cases" />
					<meta
						name="description"
						content="Discover how Windmill can be used for various use cases and workflows."
					/>
					<link rel="icon" href="/img/logo.svg" />
				</Head>
				<>
					<RadialBlur />
					<div className="pt-32 max-w-full">
						<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
							{/* Empty page for now */}
						</div>
					</div>
				</>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
