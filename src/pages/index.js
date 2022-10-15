import React, { useEffect } from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';

import FAQ from '../components/FAQ';
import VideoPlayer from '../components/VideoPlayer';
import BrowserOnly from '@docusaurus/BrowserOnly';

import { SparklesIcon } from '@heroicons/react/outline';
import TabsW from '../components/Tabs';

function HomepageHeader() {
	useEffect(() => {
		window.plausible =
			window.plausible ||
			function () {
				(window.plausible.q = window.plausible.q || []).push(arguments);
			};
	});

	return (
		<main className="mx-auto max-w-7xl px-4 sm:mt-4 sm:px-6">
			<div className="lg:grid lg:grid-cols-12 lg:gap-20">
				<div className="md:max-w-2xl md:mx-auto lg:col-span-6">
					<div>
						<div className="mt-10 sm:max-w-xl">
							<h1 className="text-sm tracking-tight font-bold text-gray-900  font-mono">
								<span className="block xl:inline">
									<SparklesIcon className="h-6 w-6 inline mr-2" aria-hidden="true" />
									Truly{' '}
									<a
										onClick={() => window.plausible('github-tagline')}
										data-analytics='"github-tagline"'
										target="_blank"
										href="https://github.com/windmill-labs/windmill"
									>
										open-source
									</a>{' '}
									and <a href="/docs/how-tos/self_host">self-hostable</a>{' '}
									<a
										className="inline-block -mb-1"
										target="_blank"
										href="https://github.com/windmill-labs/windmill"
										data-analytics='"github-stars"'
									>
										<img src="https://img.shields.io/github/stars/windmill-labs/windmill?style=social"></img>
									</a>
								</span>
							</h1>
						</div>
						<div className="mt-10 sm:max-w-xl">
							<h1 className="text-3xl tracking-tight font-bold text-blue-600 sm:text-4xl md:text-4xl font-mono">
								<span className="block xl:inline">
									Developer platform to turn scripts into internal UIs and workflows
								</span>
							</h1>
							<h2 className="mt-6 tracking-tight text-gray-900 text-base font-medium ">
								{/* <p className="mb-3">
									Instantly turn scripts into endpoints, build powerful low-code workflows and
									internal UIs, and run them at scale.
								</p>
								<p className="block ">Open-source alternative to Airplane, Superblocks, Retool.</p> */}
								<ul className="mb-3 ml-6 list-disc">
									<li>
										Instantly turn any Python, Typescript and Go scripts into endpoints, UIs and
										workflow modules
									</li>
									<li>Build powerful low-code workflows and internal UIs</li>
									<li>Run them at scale on your infra or ours</li>
									<li>Open-source alternative to Airplane, Superblocks, Retool</li>
								</ul>
							</h2>
						</div>
						<div className="w-full">
							<div className="mt-20 grid grid-cols-2 gap-8 max-w-md mx-auto">
								<div className="w-full col-span-1 flex flex-col">
									<div>
										<a
											href="https://app.windmill.dev/user/login"
											className="w-full whitespace-nowrap rounded flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 hover:bg-blue-700 hover:text-white md:py-4 md:text-lg md:px-10"
											onClick={() => window.plausible('try-cloud')}
											data-analytics='"try-cloud"'
										>
											Try the cloud app
										</a>
									</div>
									<div className=" text-center text-sm">
										or{' '}
										<a
											onClick={() => window.plausible('read-docs')}
											className="hover:underline"
											href="/docs/intro"
										>
											read the docs
										</a>
									</div>
								</div>
								<div className="w-full col-span-1">
									<a
										href="https://cal.com/team/windmill/demo"
										data-analytics='"schedule-demo"'
										onClick={() => window.plausible('schedule-demo')}
										className="w-full whitespace-nowrap rounded flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-gray-50 hover:underline md:py-4 md:text-lg md:px-10"
									>
										Schedule a demo
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
					<svg
						className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
						width="640"
						height="784"
						fill="none"
						viewBox="0 0 640 784"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
								x="118"
								y="0"
								width="20"
								height="20"
								patternUnits="userSpaceOnUse"
							>
								<rect
									x="0"
									y="0"
									width="4"
									height="4"
									className="text-gray-200"
									fill="currentColor"
								/>
							</pattern>
						</defs>
					</svg>
					<div className="mt-20 relative mx-auto w-full lg:max-w-2xl">
						<div className="rounded-lg shadow-lg">
							<BrowserOnly>
								{() => (
									<VideoPlayer>
										<button
											type="button"
											className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
										>
											<span className="sr-only">Windmill demo</span>
											<img className="w-full" src="/img/flows.png" alt="" />
											<div
												className="absolute inset-0 w-full h-full flex items-center justify-center"
												aria-hidden="true"
											>
												<svg
													className="h-20 w-20 text-blue-600"
													fill="currentColor"
													viewBox="0 0 84 84"
												>
													<circle opacity="0.5" cx="42" cy="42" r="42" fill="gray" />
													<path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
												</svg>
											</div>
										</button>
									</VideoPlayer>
								)}
							</BrowserOnly>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full text-center py-16">
				<div className="text-gray-600 font-md my-12 2xl:mt-44 mx-auto">
					Backed by <img className="inline ml-2" src="ycombinator.svg"></img>
				</div>
			</div>
			<div className="w-full flex items-center flex-col text-center">
				<h1 class="section-title">
					What can you build with{' '}
					<span class="text-transparent bg-clip-text bg-gradient-to-r to-blue-600 from-blue-500">
						Windmill
					</span>
					?
				</h1>

				<p class="mb-6 text-md font-normal text-gray-500 lg:text-lg sm:px-16 xl:px-48">
					Simple scripts or complex workflows. Get started with WindmillHub, our curated community
					library.
				</p>

				<form action="https://hub.windmill.dev">
					<button
						type="submit"
						class="mb-8 py-2 px-3 text-sm font-medium text-center text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg mr-2 "
					>
						View all examples on WindmillHub
					</button>
				</form>
				<TabsW></TabsW>
			</div>
		</main>
	);
}

function OSS() {
	return (
		<div id="oss" className="max-w-7xl mx-auto pt-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto ">
				<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
					Committed to open source
				</h2>
				<p className="text-center text-gray-500 text-sm my-2">
					We take open-source seriously. Our full roadmap is{' '}
					<a href="https://github.com/orgs/windmill-labs/projects/2">public on GitHub</a>. Join us
					on <a href="https://discord.com/invite/V7PM2YHsPB">Discord</a>!
				</p>
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<Layout title="Home">
			<main>
				<HomepageHeader />
				<HomepageFeatures />
				<div className="mx-auto max-w-screen-lg homepage">
					<Pricing />
					<FAQ />
					<OSS />
				</div>
				<div className="mb-40"></div>
			</main>
		</Layout>
	);
}
