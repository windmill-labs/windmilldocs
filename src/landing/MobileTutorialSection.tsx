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
						Build
					</h1>
					<span className="text-lg text-gray-700 dark:text-gray-200">
						Build mission-critical internal tools and data pipelines that integrate directly with
						your existing stack and resources using code with a powerful WebIDE or locally using our
						CLI and your favorite editor and AI agent.
					</span>
				</div>

				{/* Build for production card */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl flex flex-col gap-6 mb-6">
					<div className="w-full">
						<ProductionTabs tabs={defaultTabs} enableSubtitles={true} />
					</div>
				</div>
			</div>
		</div>
	);
}
