import React, { useState } from 'react';
import { Code, List, LayoutDashboard, Monitor } from 'lucide-react';

const videoTabs = [
	{
		label: 'Script editor',
		icon: Code,
		id: 'script-editor',
		videoUrl: 'https://www.youtube.com/embed/QRf8C8qF7CY',
		duration: '11 min'
	},
	{
		label: 'Flow editor',
		icon: List,
		id: 'flow-editor',
		videoUrl: 'https://www.youtube.com/embed/yE-eDNWTj3g',
		duration: '17 min'
	},
	{
		label: 'App editor',
		icon: LayoutDashboard,
		id: 'app-editor',
		videoUrl: 'https://www.youtube.com/embed/CNtRLDXbfOE',
		duration: '6 min'
	},
	{
		label: 'Local development',
		icon: Monitor,
		id: 'local-development',
		videoUrl: 'https://www.youtube.com/embed/sxNW_6J4RG8',
		duration: '3 min'
	}
];

export default function VideoTour() {
	const [selectedVideoTab, setSelectedVideoTab] = useState(videoTabs[0].id);
	const [isLoading, setIsLoading] = useState(false);

	const handleVideoTabChange = (tabId: string) => {
		if (tabId === selectedVideoTab) return;
		
		setIsLoading(true);
		setSelectedVideoTab(tabId);
		
		// Reset loading state after a short delay to allow video to start loading
		setTimeout(() => {
			setIsLoading(false);
		}, 300);
	};

	const currentVideo = videoTabs.find(tab => tab.id === selectedVideoTab) || videoTabs[0];

	return (
		<div className="w-full">
			<div className="flex flex-col gap-4 mb-6">
				<h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
					Take a tour of Windmill
				</h2>
				<p className="text-lg text-gray-600 dark:text-gray-400">
					Explore our platform by watching these demos of our main features:
				</p>
			</div>
			
			<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
				<div className="flex flex-col gap-2">
					{videoTabs.map((tab, idx) => {
						const Icon = tab.icon;
						return (
							<button
								key={tab.id}
								onClick={() => handleVideoTabChange(tab.id)}
								className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left w-full ${
									selectedVideoTab === tab.id
										? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
										: 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
								}`}
							>
								<Icon size={18} />
								<span className="font-medium">{tab.label}</span>
								<span className="text-xs text-gray-500 dark:text-gray-400">({tab.duration})</span>
								<span className="ml-auto text-xs text-gray-400 dark:text-gray-500">{idx + 1}</span>
							</button>
						);
					})}
				</div>
				<div className="w-full relative" style={{ paddingBottom: '56.25%' }}>
					<iframe
						key={selectedVideoTab}
						src={currentVideo.videoUrl}
						title="YouTube video player"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowFullScreen={true}
						className={`rounded-xl absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${
							isLoading ? 'opacity-50' : 'opacity-100'
						}`}
					/>
					
					{/* Loading overlay */}
					{isLoading && (
						<div className="absolute inset-0 bg-gray-50 dark:bg-gray-900 rounded-xl flex items-center justify-center">
							<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
