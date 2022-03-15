import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';

import FAQ from '../components/FAQ';
// import VideoPlayer from '../components/VideoPlayer';
// import BrowserOnly from '@docusaurus/BrowserOnly';


function HomepageHeader()
{

	return (
		<div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-5" style={{ "min-height": "600px" }}>
			<div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
				<div>
					<div className="mt-20 lg:mt-40">
						<div className="mt-6 sm:max-w-xl">
							<h1 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-4xl font-mono">
								<span className="block xl:inline">Company-wide <span className="block text-blue-600 xl:inline">apps</span> and <span className="block text-blue-600 xl:inline">automations</span>{' '}from minimal python <span className="block text-blue-600 xl:inline">scripts</span></span>
							</h1>
						</div>
						<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center lg:mt-20">
							<div className="shadow">
								<a
									href="https://alpha.windmill.dev/user/login"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
								>
									Sign up
								</a>
							</div>
							<div className="mt-3 shadow sm:mt-0 sm:ml-10">
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
								className="mx-20 shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-white hover:bg-gray-50 "
							>
								Get a demo
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="sm:mx-auto sm:max-w-3xl sm:px-6">
				<div className="pb-12 sm:relative sm:mt-12 sm:pb-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
				>
					<div className="hidden sm:block">
						<div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
						<svg
							className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
							width={404}
							height={392}
							fill="none"
							viewBox="0 0 404 392"
						>
							<defs>
								<pattern
									id="837c3e70-6c3a-44e6-8854-cc48c737b659"
									x={0}
									y={0}
									width={20}
									height={20}
									patternUnits="userSpaceOnUse"
								>
									<rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
								</pattern>
							</defs>
							<rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
						</svg>
					</div>
					<div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12"
					>
						<img
							className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
							src="/img/editor.png"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div >

	);
	{/* // <div className="md:grid md:grid-cols-3 -mt-14 pt-14">
		// 	<div className="flex bottom-0 bg-blue-500 text-white text-center py-6 md:col-span-1">
		// 		<div className="flex flex-col items-center m-auto px-6">
		// 			<p className="text-md text-gray-100  text-left mb-5">
		// 				Turn scripts into a production-grade internal apps that all the team can use.
		// 			</p>
		// 			<div className="flex flex-row items-center m-auto mt-6 ">
		// 				<a
		// 					className="button button--secondary  mx-2 px-2"
		// 					href="https://alpha.windmill.dev"
		// 				>
		// 					Try the open alpha
		// 				</a>
		// 				<a
		// 					className="button button--secondary px-2"
		// 					href="mailto:alpha@windmill.dev?subject=Request%20demo%20access"
		// 				>
		// 					Contact us
		// 				</a>
		// 				<BrowserOnly>
		// 					{() => 
		// 					<VideoPlayer>
		// 						<button class="button text-white hover:text-white hover:underline px-2 mx-3">
		// 							Watch demo
		// 						</button>
		// 					</VideoPlayer>
		// 					}
		// 				</BrowserOnly>

		// 			</div>
		// 		</div>
		// 	</div>
		// 	<div className="flex pt-4 md:col-span-2 px-1 sm:px-3 h-full">
		// 		<div className="rounded-3xl m-auto object-fit py-10 w-full md:w-10/12">
		// 			<Slideshow />
		// 		</div>
		// 	</div>
		// </div> */}

}

const roadmapItems = [
	{ title: "Slack Approval flows", description: "Ask approval to a user or group through Slack or email before a script is ran", when: "End of March" },

	{
		title: "Self-hostable workers", description: `Self-hostable workers will allow to host the workers on-prem. 
		The secrets being encrypted assymetrically, this will allow even sensitive environments to run windmill`, when: "End of April"
	},
	{
		title: "Embeddable Apps", description: `Make embeddable the apps/scripts as a Javascript Widget or IFrame to be integrated into external frontends.
	 The widget/iframe would have 2 modes. One to be executable without sign-in as a static user and one other allowing the user to sign in directly from the widget if not already signed-in`, when: "End of March"
	},

	{
		title: "(Work)Flows", description: `(Work)Flows will enable anyone, even less technical users to compose and chain scripts together. 
		An output to input transform tool will have a dedicated UI in-between scripts to keep scripts as modular as possible`, when: "End of March"
	},
	{
		title: "Advanced Slack integration", description: `It is currently possible to trigger one script per workspace from Slack. 
	An advanced integration will allow for any script to be chosen directly from slack, and the input to be set directly from slack using the block UI API.`, when: "Enf of Q2"
	},
	{
		title: "Advanced Google workspace/gmail/drive/docs/spreadsheet integration", description: `A dedicated oauth integration will allow to connect a workspace to a Google Workspace as easily as it is currently possible for a Slack workspace. The wmill integrated python client will
	integrate some utility function to make working with gmail/drive/docs/spreadsheet in a convenience fashion.`, when: "End of Q2"
	},
	{ title: "Advanced Airtable integration", description: `Same as the "Advanced Google workspace integration" but for Airtable`, when: "End of Q2" },
	{ title: "Advanced Notion integration", description: `Same as the "Advanced Google workspace integration" but for Notion`, when: "End of Q2" },
	{ title: "Support Javascript/Typescript", description: "Support other programming languages than Python", when: "End of Q2 and based on feedback" }

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

