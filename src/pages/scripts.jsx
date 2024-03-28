import React from 'react';
import ScriptSection from '../landing/ScriptSection';
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
					<ScriptSection />
				</GlobalContextProvider>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
