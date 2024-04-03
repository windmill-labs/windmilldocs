import React from 'react';
import AppLightSection from '../landing/AppLightSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import CallToAction from '../landing/CallToAction';
import LogoClouds from '../landing/LogoClouds';
import RadialBlur from '../landing/RadialBlur';

export default function AppsPage() {
	return (
		<LayoutProvider>
			<main>
				<Head>
					<title>Apps | Windmill</title>
					<meta name="title" content="Build complex flows without complexity" />
					<meta
						name="description"
						content="Build complex Flows from atomic scripts, either from your workspace or the Hub."
					/>
				</Head>
				<RadialBlur color="orange" />
				<LandingHeader />
				<div className="mt-16">
					<AppLightSection />
				</div>
				<LogoClouds />
				<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full ">
					<CallToAction />
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
