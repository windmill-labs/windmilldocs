import React from 'react';
import AppLightSection from '../landing/AppLightSection';
import Footer from '../landing/Footer';
import Head from '@docusaurus/Head';
import LandingHeader from '../landing/LandingHeader';
import LayoutProvider from '@theme/Layout/Provider';
import CallToAction from '../landing/CallToAction';
import LogoClouds from '../landing/LogoClouds';
import RadialBlur from '../landing/RadialBlur';
import Window from '../landing/animations/Window';

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
				<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center h-full mt-20 flex-col gap-8">
					<div
						className={`text-orange-900 dark:text-orange-300 text-5xl text-left font-normal tracking-tight leading-12 mb-2  pt-8`}
					>
						{'Develop and iterate with instant feedback'}
					</div>
					<div className="bg-gradient-to-br from-orange-200 to-orange-400 dark:from-orange-700 dark:to-orange-600 w-full rounded-lg p-6 shadow-inner overflow-hidden  h-[550px]">
						<Window
							shouldRender={true}
							name="Apps | Windmill"
							icon="/third_party_logos/firefox.svg"
						>
							<img
								src="/images/app_example.png"
								alt="Apps"
								className="w-full object-cover object-left-top"
							/>
						</Window>
					</div>
				</div>
				<div className="mt-16">
					<AppLightSection />
				</div>
				<LogoClouds />
				<div className="max-w-7xl px-6 lg:px-8 mx-auto flex justify-center items-center h-full ">
					<CallToAction color="orange" />
				</div>
				<Footer />
			</main>
		</LayoutProvider>
	);
}
