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
		<div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-5">
			<div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
				<div>
					<div>
						<img
							className="w-auto mx-auto md:m-0"
							style={{ height: "120px" }}
							src="/img/windmill_withtext.svg"
							alt="Workflow"
						/>
					</div>
					<div className="mt-5">
						<div className="mt-6 sm:max-w-xl">
							<h1 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl font-mono">
								<span className="block xl:inline">Generate all your internal <span className="block text-blue-600 xl:inline">apps</span> and <span className="block text-blue-600 xl:inline">automations</span>{' '}from your python <span className="block text-blue-600 xl:inline">scripts</span></span>
							</h1>
						</div>
						<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
							<div className="shadow">
								<a
									href="https://alpha.windmill.dev/user/login"
									className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
								>
									Try it, it's free
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
						<div className="my-8 max-w-md mx-auto">
							<a
								target='_blank'
								href="https://forms.gle/9ANRUru75nqrKT6C9"
								className="w-full shadow flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
							>
								Get a demo
							</a>
						</div>
					</div>
				</div>
			</div>

			<div className="sm:mx-auto sm:max-w-3xl sm:px-6">
				<div className="pb-12 sm:relative sm:mt-12 sm:pb-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
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
					<div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
						<img
							className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
							src="/img/editor.png"
							alt=""
						/>
					</div>
				</div>
			</div>
		</div>

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

export default function Home()
{
	return (
		<Layout
			title="windmill.dev landing page"
		>
			<main>
				<HomepageHeader />

				<HomepageFeatures />
				<div className='mx-auto max-w-screen-lg homepage'>
					<Pricing />
					<FAQ />
				</div>
				<div className='mb-40'></div>
			</main>
		</Layout>
	);
}

