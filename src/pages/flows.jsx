import React from 'react';
import FlowSection from '../landing/FlowSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import GlobalContextProvider from '../components/GlobalContextProvider';

export default function CustomPage() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Custom Page | Windmill</title>
					<meta name="title" content="Custom Page Title" />
					<meta name="description" content="Custom page description." />
				</Head>
				<GlobalContextProvider>
					<LandingHeader />
					<FlowSection />
				</GlobalContextProvider>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
