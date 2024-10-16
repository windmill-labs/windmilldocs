import React from 'react';
import AppLightSection from '../landing/AppLightSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import CallToAction from '../landing/CallToAction';
import LogoClouds from '../landing/LogoClouds';
import RadialBlur from '../landing/RadialBlur';
import TutorialSection from '../landing/TutorialSection';

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
				<RadialBlur color="orange" fullWidth />
				<LandingHeader />

				<TutorialSection subIndex={2}>
					<div
						className={`text-orange-900 dark:text-orange-300 text-5xl text-left font-normal tracking-tight leading-12 `}
					>
						{'Develop and iterate with instant feedback'}
					</div>
				</TutorialSection>

				<div className="mt-16">
					<AppLightSection />
				</div>
				<LogoClouds />
				<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full ">
					<CallToAction color="orange" />
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
