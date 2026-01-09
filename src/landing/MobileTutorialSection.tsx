import React, { useState, useRef, useEffect } from 'react';
import {
	Server,
	ArrowRight,
	Monitor,
	Database,
	Play,
	Pause
} from 'lucide-react';

export default function TutorialSection() {
	const ProductionTabs = () => {
		const [selectedTab, setSelectedTab] = useState('scripts');
		const [progress, setProgress] = useState(0);
		const [isPlaying, setIsPlaying] = useState(false);
		const [duration, setDuration] = useState(0);
		const videoRef = useRef<HTMLVideoElement>(null);
		const progressBarRef = useRef<HTMLDivElement>(null);
		const containerRef = useRef<HTMLDivElement>(null);
		const [hasBeenVisible, setHasBeenVisible] = useState(false);

		const tabs = [
			{ id: 'scripts', label: 'Scripts', icon: Server, description: 'Write scripts in 20+ languages (Python, TS, Go...) with full LSP support, auto-generated UI, managed dependencies and turn them into instant endpoints or hooks for pubsub events.', video: '/videos/scriptsvideo.mp4' },
			{ id: 'backend', label: 'Flows', icon: Server, description: 'Orchestrate your scripts into high-performance flows with full code flexibility, AI assistance, and sub-20ms overhead.', video: '/videos/backendvideo.mp4' },
			{ id: 'frontend', label: 'Apps', icon: Monitor, description: 'Connect your scripts and flows to production-ready frontends with full code flexibility, AI assistance and built-in datatables.', video: '/videos/frontendvideo.mp4' },
			{ id: 'datatables', label: 'Data', icon: Database, description: 'Store and query data with built-in PostgreSQL datatables, Ducklake, DuckDB and S3 integrations.', video: '/videos/databasevideo.mp4' }
		];

		const currentTab = tabs.find(tab => tab.id === selectedTab) || tabs[0];

		// Detect when component is visible in viewport (80% threshold)
		useEffect(() => {
			const container = containerRef.current;
			if (!container) return;

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0].isIntersecting && !hasBeenVisible) {
						setHasBeenVisible(true);
					}
				},
				{ threshold: 0.8 }
			);

			observer.observe(container);
			return () => observer.disconnect();
		}, [hasBeenVisible]);

		// Play video: Scripts tab plays when visible, others play when tab is clicked
		useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			if (selectedTab === 'scripts') {
				if (hasBeenVisible) {
					video.play();
				}
			} else {
				video.play();
			}
		}, [selectedTab, hasBeenVisible]);

		// Track video progress
		useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			const handleTimeUpdate = () => {
				if (video.duration > 0) {
					setProgress((video.currentTime / video.duration) * 100);
					setDuration(video.duration);
				}
			};

			const handlePlay = () => setIsPlaying(true);
			const handlePause = () => setIsPlaying(false);
			const handleLoadedMetadata = () => setDuration(video.duration);

			video.addEventListener('timeupdate', handleTimeUpdate);
			video.addEventListener('play', handlePlay);
			video.addEventListener('pause', handlePause);
			video.addEventListener('loadedmetadata', handleLoadedMetadata);

			return () => {
				video.removeEventListener('timeupdate', handleTimeUpdate);
				video.removeEventListener('play', handlePlay);
				video.removeEventListener('pause', handlePause);
				video.removeEventListener('loadedmetadata', handleLoadedMetadata);
			};
		}, [selectedTab]);

		// Reset progress when tab changes
		useEffect(() => {
			setProgress(0);
			setIsPlaying(false);
		}, [selectedTab]);

		const togglePlayPause = () => {
			const video = videoRef.current;
			if (!video) return;
			if (video.paused) {
				video.play();
			} else {
				video.pause();
			}
		};

		const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
			const video = videoRef.current;
			const progressBar = progressBarRef.current;
			if (!video || !progressBar) return;

			const rect = progressBar.getBoundingClientRect();
			const clickPosition = (e.clientX - rect.left) / rect.width;
			video.currentTime = clickPosition * video.duration;
		};

		const formatTime = (seconds: number) => {
			const mins = Math.floor(seconds / 60);
			const secs = Math.floor(seconds % 60);
			return `${mins}:${secs.toString().padStart(2, '0')}`;
		};

		const currentTime = duration > 0 ? (progress / 100) * duration : 0;

		return (
			<div className="w-full" ref={containerRef}>
				{/* Tab buttons */}
				<div className="flex w-full mb-4 border-b border-gray-200 dark:border-gray-700">
					{tabs.map((tab) => (
						<button
							key={tab.id}
							onClick={() => setSelectedTab(tab.id)}
							className={`flex-1 px-4 py-2 font-medium text-sm transition-colors border-b-2 text-center text-gray-900 dark:text-white ${
								selectedTab === tab.id
									? 'border-blue-500'
									: 'border-transparent hover:text-gray-700 dark:hover:text-white/80'
							}`}
						>
							{tab.label}
						</button>
					))}
				</div>
				{/* Description */}
				<p className="text-gray-900 dark:text-white mb-4">
					{currentTab.description}
				</p>
				{/* Video */}
				<div className="relative group/video rounded-lg overflow-hidden">
					<video
						ref={videoRef}
						key={selectedTab}
						className="w-full object-cover"
						loop
						muted
						playsInline
					>
						<source src={currentTab.video} type="video/mp4" />
					</video>
					{/* Circular progress indicator */}
					<div className="absolute bottom-3 right-3 group-hover/video:opacity-0 transition-opacity">
						<svg className="w-8 h-8" viewBox="0 0 36 36">
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								stroke="rgba(255, 255, 255, 0.3)"
								strokeWidth="2"
							/>
							<circle
								cx="18"
								cy="18"
								r="16"
								fill="none"
								stroke="rgba(59, 130, 246, 0.9)"
								strokeWidth="2"
								strokeDasharray={2 * Math.PI * 16}
								strokeDashoffset={2 * Math.PI * 16 * (1 - progress / 100)}
								strokeLinecap="round"
								style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
							/>
						</svg>
					</div>
					{/* Control bar - appears on hover */}
					<div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 bg-black/50 backdrop-blur-sm px-3 py-2 opacity-0 group-hover/video:opacity-100 transition-opacity">
						<button
							onClick={togglePlayPause}
							className="text-white/80 hover:text-white transition-colors"
							title={isPlaying ? 'Pause' : 'Play'}
						>
							{isPlaying ? <Pause size={16} /> : <Play size={16} />}
						</button>
						<div
							ref={progressBarRef}
							onClick={handleProgressBarClick}
							className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer"
						>
							<div
								className="h-full bg-white/90 rounded-full"
								style={{ width: `${progress}%` }}
							/>
						</div>
						<span className="text-white/70 text-xs font-mono">
							{formatTime(currentTime)} / {formatTime(duration)}
						</span>
					</div>
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{/* Build for production */}
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-4 rounded-xl flex flex-col gap-6">
					<a
						href="/docs/intro"
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
			</div>
		</div>
	);
}


