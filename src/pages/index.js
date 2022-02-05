import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';
import Slideshow from '../components/Slideshow';
import FAQ from '../components/FAQ';
import VideoPlayer from '../components/VideoPlayer';
import 'react-slideshow-image/dist/styles.css';
import BrowserOnly from '@docusaurus/BrowserOnly';

function HomepageHeader() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<div className=" md:grid md:grid-cols-3 -mt-14 pt-14">
			<div className="flex bottom-0 bg-blue-500 text-white text-center py-6 md:col-span-1">
				<div className="flex flex-col items-center m-auto px-6">
					<p className="text-5xl font-bold text-gray-100 text-left mb-4">{siteConfig.tagline}</p>
					<p className="text-md text-gray-100  text-left mb-5">
						Turn API calls, database queries and quick and dirty python scripts into
						production-grade apps{' '}
					</p>
					<div className="flex flex-col md:flex-row items-center m-auto ">
						<a
							className="button button--secondary button--md self-end mt-6 px-2"
							href="mailto:alpha@windmill.dev?subject=Request%20demo%20access"
						>
							Contact us
						</a>
						<a
							className="button button--secondary button--md self-end mt-6 mx-2 px-2"
							href="https://alpha.windmill.dev"
						>
							Try the open alpha
						</a>
						<BrowserOnly>
							{() => 
							<VideoPlayer>
								<button class="button text-white hover:text-white hover:underline mt-6 px-2 mx-3">
									Watch demo
								</button>
							</VideoPlayer>
							}
						</BrowserOnly>

					</div>
				</div>
			</div>
			<div className="flex pt-4 md:col-span-2 px-1 sm:px-3 h-full">
				<div className="rounded-3xl m-auto object-fit py-10 w-full md:w-10/12">
					<Slideshow />
				</div>
			</div>
		</div>
	);
}

export default function Home() {
	const { siteConfig } = useDocusaurusContext();
	return (
		<Layout
			title={`${siteConfig.title}`}
			description="Turn scripts into a production-grade internal apps that all the team can use."
		>
			<main>
				<HomepageHeader />
				<HomepageFeatures />
				<Pricing />
				<FAQ />
			</main>
		</Layout>
	);
}
