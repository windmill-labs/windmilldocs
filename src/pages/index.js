import React from 'react';
import Layout from '@theme/Layout';
import HomepageFeatures from '../components/HomepageFeatures';
import Pricing from '../components/Pricing';
import Slideshow from '../components/Slideshow';
import FAQ from '../components/FAQ';
// import VideoPlayer from '../components/VideoPlayer';
import 'react-slideshow-image/dist/styles.css';
// import BrowserOnly from '@docusaurus/BrowserOnly';
// import { ChevronRightIcon, StarIcon } from '@heroicons/react/solid'



function HomepageHeader() {

	return (
		<div className="text-center">
			<h1 className="text-3xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl font-mono">
				<span className="block xl:inline">Generate all your internal <span className="block text-blue-600 xl:inline">apps</span> and <span className="block text-blue-600 xl:inline">automations</span>{' '}from your python <span className="block text-blue-600 xl:inline">scripts</span></span>
			</h1>
			<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
				
			</p>
			<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
				<div className="shadow">
					<a
						href="https://alpha.windmill.dev/user/login"
						className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
					>
						Sign up, it's free
					</a>
				</div>
				<div className="mt-3 shadow sm:mt-0 sm:ml-10">
					<a
						href="/docs/intro"
						className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
					>
						Get started
					</a>
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

export default function Home() {
	return (
		<Layout
			title="windmill.dev landing page"
		>
			<main className="pt-16">
				<div className='mx-auto max-w-screen-lg homepage'>
					<HomepageHeader />
				</div>

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

