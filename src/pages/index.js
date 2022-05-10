import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';

import FAQ from '../components/FAQ';
import VideoPlayer from '../components/VideoPlayer';
import BrowserOnly from '@docusaurus/BrowserOnly';


import
{
	SparklesIcon
} from '@heroicons/react/outline'

function HomepageHeader()
{

	return (
		<main class="mx-auto max-w-7xl px-4 sm:mt-20 sm:px-6 ">
			<div class="lg:grid lg:grid-cols-12 lg:gap-8">
				<div class="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
					<div >
						<div className="mt-10 sm:max-w-xl">
							<h1 className="text-xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-xl font-mono">
								<span className="block xl:inline"><SparklesIcon className="h-6 w-6 inline mr-2" aria-hidden="true" />
									Fully <a target="_blank" href="https://github.com/windmill-labs/windmill">OSS</a> and self-hostable <a className="inline-block" target="_blank" href="https://github.com/windmill-labs/windmill"><img src="https://img.shields.io/github/stars/windmill-labs/windmill?style=flat"></img></a></span>
							</h1>
						</div>
						<div className="mt-10 sm:max-w-xl">
							<h1 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-4xl font-mono">
								<span className="block xl:inline">Company-wide <span className="block text-blue-600 xl:inline">apps</span> and <span className="block text-blue-600 xl:inline">automations</span>{' '}from minimal python <span className="block text-blue-600 xl:inline">scripts</span></span>
							</h1>
						</div>
						<div className="mt-5  max-w-md mx-auto sm:flex sm:justify-center lg:mt-10">
							<div className="shadow">
								<a
									href="https://app.windmill.dev/user/login"
									className="w-full rounded flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
								>
									Windmill Cloud
								</a>
							</div>
							<div className="mt-3 shadow sm:mt-0 rounded sm:ml-10">
								<a
									href="/docs/intro"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
								>
									Quickstart
								</a>
							</div>
						</div>
						<div className="my-8 max-w-sm mx-auto">
							<a
								target='_blank'
								href="https://forms.gle/9ANRUru75nqrKT6C9"
								className="mx-20 shadow flex items-center rounded justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-white hover:bg-gray-50 "
							>
								Get a demo
							</a>
						</div>
					</div>
				</div>
				<div class="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
					<svg class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden" width="640" height="784" fill="none" viewBox="0 0 640 784" aria-hidden="true">
						<defs>
							<pattern id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
								<rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
							</pattern>
						</defs>
						<rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
						<rect x="118" width="404" height="784" fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)" />
					</svg>
					<div class="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-2xl">
						<BrowserOnly>{() =>
							<VideoPlayer>
								<button type="button" class="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									<span class="sr-only">Watch our video to learn more</span>
									<img class="w-full" src="/img/editor.png" alt="" />
									<div class="absolute inset-0 w-full h-full flex items-center justify-center" aria-hidden="true">
										<svg class="h-20 w-20 text-blue-600" fill="currentColor" viewBox="0 0 84 84">
											<circle opacity="0.5" cx="42" cy="42" r="42" fill="gray" />
											<path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
										</svg>
									</div>
								</button>
							</VideoPlayer>
						}
						</BrowserOnly>
					</div>
				</div>
			</div>
		</main>

	);
}



// <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-5" style={{ "min-height": "600px" }}>
// 	<div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
// 		<div>

// 		</div>
// 	</div>

// 	<div className="sm:mx-auto sm:max-w-3xl sm:px-6">
// 		<div className="pb-12 sm:relative sm:mt-12 sm:pb-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
// 		>
// 			<div className="hidden sm:block">
// 				<div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
// 				<svg
// 					className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
// 					width={404}
// 					height={392}
// 					fill="none"
// 					viewBox="0 0 404 392"
// 				>
// 					<defs>
// 						<pattern
// 							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
// 							x={0}
// 							y={0}
// 							width={20}
// 							height={20}
// 							patternUnits="userSpaceOnUse"
// 						>
// 							<rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
// 						</pattern>
// 					</defs>
// 					<rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
// 				</svg>
// 			</div>

// 			<div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12"
// 			>

// 				<BrowserOnly>
// 					{() =>
// 						<VideoPlayer>
// 							<img
// 								className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
// 								src="/img/editor.png"
// 								alt=""
// 							/>
// 						</VideoPlayer>
// 					}
// 				</BrowserOnly>
// 			</div>
// 		</div>
// 	</div>
// </div >


const roadmapItems = [
	{ title: "Support Javascript/Typescript", description: "Javascript is now supported for dynamic inputs of flows. Full support of Typescript (with deno) for scripts is coming Mid May", when: "Mid May" },
	{
		title: "Open-sourcing of Windmill under AGPLv3", description: `Windmill will be fully open-sourced under AGPLv3 and self-hostable`, when: "Mid May"
	},
	{ title: "Slack Approval module for flows", description: "Ask approval to a user or group through Slack or email as a blocking step of a flow", when: "End of May" },
	{
		title: "Embeddable Apps", description: `Make embeddable the apps/scripts as a Javascript Widget or IFrame to be integrated into external frontends.
	 The widget/iframe would have 2 modes. One to be executable without sign-in as a static user and one other allowing the user to sign in directly from the widget if not already signed-in`, when: "End of Q2"
	},
	{
		title: "Advanced Slack integration", description: `It is currently possible to trigger one script per workspace from Slack. 
	An advanced integration will allow for any script to be chosen directly from slack, and the input to be set directly from slack using the block UI API.`, when: "End of Q2"
	},
	{
		title: "Advanced Google workspace/gmail/drive/docs/spreadsheet integration", description: `A dedicated oauth integration will allow to connect a workspace to a Google Workspace as easily as it is currently possible for a Slack workspace. The wmill integrated python client will
	integrate some utility function to make working with gmail/drive/docs/spreadsheet in a convenience fashion.`, when: "End of Q2"
	},
	{ title: "Advanced Airtable integration", description: `Same as the "Advanced Google workspace integration" but for Airtable`, when: "End of Q2" },
	{ title: "Advanced Notion integration", description: `Same as the "Advanced Google workspace integration" but for Notion`, when: "End of Q2" },
]

function Roadmap()
{

	return (
		<div id="roadmap" className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
				<h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">Roadmap</h2>
				<ul role="list" class="mt-6 divide-y divide-gray-200">
					{roadmapItems.map((x) =>
						<li class="relative bg-white py-5 px-4 hover:bg-gray-50 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
							<div class="flex justify-between space-x-3">
								<div class="min-w-0 flex-1">
									<span class="absolute inset-0" aria-hidden="true"></span>
									<p class="text-sm font-medium text-gray-900 truncate">{x.title}</p>
								</div>
								<span class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">{x.when}</span>
							</div>
							<div class="mt-1">
								<p class="line-clamp-2 text-sm text-gray-600">{x.description}</p>
							</div>
						</li>
					)}

				</ul>
			</div>
		</div>


	);
}

export default function Home()
{
	return (
		<Layout
			title="Home"
		>
			<main>
				<HomepageHeader />

				<HomepageFeatures />
				<div className='mx-auto max-w-screen-lg homepage'>
					<Pricing />
					<FAQ />
					<Roadmap />
				</div>
				<div className='mb-40'></div>
			</main>
		</Layout>
	);
}

