import React from 'react';
import { ArrowRight } from 'lucide-react';
import ProductionTabs, { defaultTabs } from './components/ProductionTabs';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';

export default function MobileTutorialSection() {
	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Section Header */}
				<div className="w-full mb-6 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Build for production
					</h1>
					<span className="text-lg text-gray-700 dark:text-gray-200">
						Build mission-critical internal tools and data pipelines that integrate directly with your existing stack and resources.
					</span>
				</div>

				{/* Build for production card */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl flex flex-col gap-6 mb-6">
					<div className="w-full">
						<ProductionTabs
							tabs={defaultTabs}
							enableSubtitles={true}
						/>
					</div>
				</div>

				{/* Develop locally card */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl">
					<a
						href="/docs/advanced/local_development"
						target="_blank"
						className="group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-2xl mb-4 group-hover:ml-2 transition-all">
							Full local dev experience
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all">
							Develop in our cloud editor or locally via our CLI and VS Code extension. Leverage AI-assisted rules for Cursor and Claude, and deploy through automated Git-sync pipelines across staging and production.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-4">
							Set up local dev
							<ArrowRight size={24} />
						</div>
					</a>
					<Lottie lottieData={devfriendly} autoplay loop={true} />
					<div className="flex justify-end mt-3">
						<a
							href="https://www.youtube.com/watch?v=sxNW_6J4RG8"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors group/yt"
						>
							<svg
								className="w-5 h-5 text-red-600 dark:text-red-500"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
							</svg>
							<span className="group-hover/yt:underline">Learn more about local development</span>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
