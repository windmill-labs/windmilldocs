import React, { useState, useRef, useEffect } from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import performance from '/illustrations/performance.json';

export default function TutorialSection() {
	const ProductionTabs = () => {
		const [selectedTab, setSelectedTab] = useState('backend');
		const [currentTime, setCurrentTime] = useState(0);
		const [duration, setDuration] = useState(0);
		const [isResetting, setIsResetting] = useState(false);
		const videoRef = useRef<HTMLVideoElement>(null);

		const tabs = [
			{
				id: 'backend',
				label: 'Backend',
				video: '/videos/backendvideo.mp4'
			},
			{
				id: 'frontend',
				label: 'Frontend',
				video: '/videos/frontendvideo.mp4'
			},
			{
				id: 'storage',
				label: 'Storage',
				video: '/videos/productintro.mp4'
			}
		];

		const currentTab = tabs.find(tab => tab.id === selectedTab) || tabs[0];

		// Reset progress when tab changes
		useEffect(() => {
			setCurrentTime(0);
			setDuration(0);
		}, [selectedTab]);

		// Handle video time updates with smooth animation
		useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			const handleLoadedMetadata = () => {
				setDuration(video.duration);
			};

			video.addEventListener('loadedmetadata', handleLoadedMetadata);

			// Track previous time to detect loops
			let previousTime = 0;

			// Use requestAnimationFrame for smooth progress updates
			let animationFrameId: number;
			const updateProgress = () => {
				if (video && !video.paused && !video.ended) {
					const currentTime = video.currentTime;
					
					// Detect loop: if currentTime is less than previous time (and not just starting), it looped
					if (currentTime < previousTime && previousTime > 0.5) {
						// Video looped - reset instantly without transition
						setIsResetting(true);
						setCurrentTime(0);
						previousTime = 0;
						// Re-enable transition after a brief moment
						setTimeout(() => setIsResetting(false), 50);
					} else {
						setCurrentTime(currentTime);
						previousTime = currentTime;
					}
					
					animationFrameId = requestAnimationFrame(updateProgress);
				}
			};

			// Start the animation loop when video is playing
			const handlePlay = () => {
				previousTime = video.currentTime;
				updateProgress();
			};

			const handlePause = () => {
				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
				}
			};

			video.addEventListener('play', handlePlay);
			video.addEventListener('pause', handlePause);
			video.addEventListener('ended', handlePause);

			// Start immediately if video is already playing
			if (!video.paused && !video.ended) {
				previousTime = video.currentTime;
				updateProgress();
			}

			return () => {
				video.removeEventListener('loadedmetadata', handleLoadedMetadata);
				video.removeEventListener('play', handlePlay);
				video.removeEventListener('pause', handlePause);
				video.removeEventListener('ended', handlePause);
				if (animationFrameId) {
					cancelAnimationFrame(animationFrameId);
				}
			};
		}, [selectedTab]);

		const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

		return (
			<div className="w-full">
				{/* Tab buttons */}
				<div className="flex w-full mb-4 border-b border-gray-200 dark:border-gray-700">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setSelectedTab(tab.id)}
							className={`flex-1 px-4 py-2 font-medium text-sm transition-colors border-b-2 text-center ${
								selectedTab === tab.id
									? 'border-blue-500 text-blue-600 dark:text-blue-400'
									: 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				{/* Video */}
				<div className="relative">
					<video
						ref={videoRef}
						key={selectedTab}
						className="rounded-lg overflow-hidden w-full object-cover"
						autoPlay
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src={currentTab.video} type="video/mp4" />
					</video>
					{/* Circular progress indicator */}
					<div className="absolute bottom-3 right-3">
						<svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
							{/* Background circle */}
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								stroke="rgba(255, 255, 255, 0.3)"
								strokeWidth="2"
							/>
							{/* Progress circle */}
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								stroke="rgba(59, 130, 246, 0.9)"
								strokeWidth="2"
								strokeDasharray={`${2 * Math.PI * 16}`}
								strokeDashoffset={`${2 * Math.PI * 16 * (1 - progress / 100)}`}
								strokeLinecap="round"
								className={isResetting ? '' : 'transition-all duration-150'}
							/>
						</svg>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Build for production */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl flex flex-col gap-6 mb-8">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Build for production
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all">
							Build mission-critical internal tools and data pipelines that integrates directly with your existing stack and resources.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-0">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="w-full">
						<ProductionTabs />
					</div>
				</div>

				{/* Collaborate with Git */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
					<a
						href="/docs/advanced/git_sync"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Collaborate with Git
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Develop locally, sync changes bi-directionally, and maintain a strict audit trail with built-in diff viewing.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src="/illustrations/diff.png" alt="Review" />
						</div>
					</div>
				</div>

				{/* Deploy at scale with confidence */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
					<a
						href="/docs/misc/benchmarks/competitors"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Deploy at scale with confidence
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Process 1,000+ jobs per second with linear horizontal scaling. Auto-scale capacity on demand or isolate critical workloads using dedicated worker groups on Kubernetes and Docker.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							See benchmarks
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={performance} autoplay loop />
					</div>
				</div>

				{/* Monitor at job granularity */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/core_concepts/monitor_past_and_future_runs"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
					>
						<div className="font-medium text-xl mb-4 group-hover:ml-2 transition-all">
							Monitor with ease and depth
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							Track every job execution with real-time logs and I/O. Get instant Slack or email alerts for failures, or export metrics to OpenTelemetry and Prometheus to monitor your entire stack.
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src="/illustrations/11.png" alt="Monitor" />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}


