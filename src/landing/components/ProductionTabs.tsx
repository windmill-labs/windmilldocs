import React, { useState, useRef, useEffect } from 'react';
import { Server, Monitor, Database, Play, Pause } from 'lucide-react';

// Icon mapping for tab configuration
const iconMap = {
	Server,
	Monitor,
	Database,
};

export interface TabConfig {
	id: string;
	label: string;
	icon: keyof typeof iconMap;
	description: string;
	video: string;
	youtubeUrl?: string;
}

export interface SubtitleConfig {
	time: number;
	text: string;
	duration: number;
}

export interface ProductionTabsProps {
	tabs: TabConfig[];
	subtitles?: Record<string, SubtitleConfig[]>;
	enableSubtitles?: boolean;
}

// Default tabs configuration
export const defaultTabs: TabConfig[] = [
	{ id: 'scripts', label: 'Scripts', icon: 'Server', description: 'Write scripts in 20+ languages (Python, TS, Go...) with full LSP support, auto-generated UI, managed dependencies and turn them into instant endpoints or hooks for pubsub events.', video: '/videos/landingscripts-ui.webm', youtubeUrl: 'https://www.youtube.com/watch?v=QRf8C8qF7CY' },
	{ id: 'flows', label: 'Flows', icon: 'Server', description: 'Orchestrate your scripts into high-performance flows with full code flexibility, AI assistance, and sub-20ms overhead.', video: '/videos/landingflows-ui.webm', youtubeUrl: 'https://www.youtube.com/watch?v=yE-eDNWTj3g' },
	{ id: 'apps', label: 'Apps', icon: 'Monitor', description: 'Build powerful full-stack apps using Windmill as a backend and any framework as frontend.', video: '/videos/landingapps-ui.webm', youtubeUrl: 'https://www.youtube.com/watch?v=CNtRLDXbfOE' },
];

// Default subtitles configuration
export const defaultSubtitles: Record<string, SubtitleConfig[]> = {
	scripts: [
        { time: 0.0, text: 'Code in 20+ languages (Python, TS, Go, Rust, Java, SQL, Bash, Ruby...)', duration: 3 },
        { time: 3.5, text: 'Import any package including your private repositories', duration: 2 },
        { time: 10.5, text: 'Auto-generate UIs from your script parameters', duration: 2.5 },
        { time: 16.0, text: 'Real-time logs and instant test results', duration: 2.5 },
        { time: 30.0, text: 'Trigger via webhooks, schedule, CLI, Slack, email and more', duration: 2.5 },
    ],
    flows: [
        { time: 0.0, text: 'Orchestrate scripts into high-performance workflows', duration: 2.5 },
        { time: 8.0, text: 'Link steps seamlessly using dynamic expressions', duration: 2 },
        { time: 17.0, text: 'Build complex flows faster with AI assistance', duration: 2 },
    ],
    apps: [
        { time: 0.0, text: 'Build frontends with full code and any framework', duration: 2 },
        { time: 2.5, text: 'Develop by hand or generate with AI', duration: 2 },
        { time: 26.0, text: 'Iterate rapidly with instant code previews', duration: 2 },
        { time: 32.0, text: 'Bind your UI to existing scripts and flows', duration: 3 },
    ]
};

export default function ProductionTabs({
	tabs = defaultTabs,
	subtitles = defaultSubtitles,
	enableSubtitles = true,
}: ProductionTabsProps) {
	const [selectedTab, setSelectedTab] = useState(tabs[0]?.id || 'scripts');
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
	const progressBarRef = useRef<HTMLDivElement>(null);

	// Subtitle state
	const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
	const shownSubtitlesRef = useRef<Set<string>>(new Set());
	const subtitleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);

	// Lazy loading state - track which tabs have been visited
	const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set([tabs[0]?.id || 'scripts']));
	// Loading state per video
	const [loadingState, setLoadingState] = useState<Record<string, { loading: boolean; progress: number }>>({});

	const getCurrentVideo = () => videoRefs.current[selectedTab];

	// Mark tab as visited when selected
	const handleTabSelect = (tabId: string) => {
		setSelectedTab(tabId);
		setVisitedTabs(prev => new Set([...prev, tabId]));
	};

	// Detect when component is visible in viewport
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

	// Track video loading progress
	useEffect(() => {
		const video = videoRefs.current[selectedTab];
		if (!video || !visitedTabs.has(selectedTab)) return;

		const handleLoadStart = () => {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { loading: true, progress: 0 }
			}));
		};

		const handleProgress = () => {
			if (video.buffered.length > 0 && video.duration > 0) {
				const bufferedEnd = video.buffered.end(video.buffered.length - 1);
				const progressPercent = (bufferedEnd / video.duration) * 100;
				setLoadingState(prev => ({
					...prev,
					[selectedTab]: { loading: progressPercent < 100, progress: progressPercent }
				}));
			}
		};

		const handleCanPlayThrough = () => {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { loading: false, progress: 100 }
			}));
		};

		const handleWaiting = () => {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { ...prev[selectedTab], loading: true }
			}));
		};

		const handlePlaying = () => {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { ...prev[selectedTab], loading: false }
			}));
		};

		video.addEventListener('loadstart', handleLoadStart);
		video.addEventListener('progress', handleProgress);
		video.addEventListener('canplaythrough', handleCanPlayThrough);
		video.addEventListener('waiting', handleWaiting);
		video.addEventListener('playing', handlePlaying);

		// Check initial state
		if (video.readyState >= 4) {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { loading: false, progress: 100 }
			}));
		} else if (video.readyState < 3) {
			setLoadingState(prev => ({
				...prev,
				[selectedTab]: { loading: true, progress: 0 }
			}));
		}

		return () => {
			video.removeEventListener('loadstart', handleLoadStart);
			video.removeEventListener('progress', handleProgress);
			video.removeEventListener('canplaythrough', handleCanPlayThrough);
			video.removeEventListener('waiting', handleWaiting);
			video.removeEventListener('playing', handlePlaying);
		};
	}, [selectedTab, visitedTabs]);

	// Play/pause videos when tab changes
	useEffect(() => {
		// Pause all videos first
		Object.values(videoRefs.current).forEach(video => {
			if (video) video.pause();
		});

		const video = getCurrentVideo();
		if (!video) return;

		// Reset to beginning and play
		video.currentTime = 0;

		if (selectedTab === tabs[0]?.id) {
			if (hasBeenVisible) {
				video.play();
			}
		} else {
			video.play();
		}
	}, [selectedTab, hasBeenVisible, tabs]);

	// Track video progress and handle subtitle detection
	useEffect(() => {
		const video = getCurrentVideo();
		if (!video) return;

		const handleTimeUpdate = () => {
			if (video.duration > 0) {
				setProgress((video.currentTime / video.duration) * 100);
				setDuration(video.duration);

				// Check for subtitle triggers (only if enabled)
				if (enableSubtitles) {
					const tabSubtitles = subtitles[selectedTab] || [];
					const currentTime = video.currentTime;

					for (const subtitle of tabSubtitles) {
						const subtitleKey = `${selectedTab}-${subtitle.time}`;
						// Check if we're within 0.2s of the subtitle timestamp and haven't shown it yet
						if (
							Math.abs(currentTime - subtitle.time) < 0.2 &&
							!shownSubtitlesRef.current.has(subtitleKey)
						) {
							// Mark as shown
							shownSubtitlesRef.current.add(subtitleKey);

							// Pause video and show subtitle
							video.pause();
							setCurrentSubtitle(subtitle.text);

							// Clear any existing timeout
							if (subtitleTimeoutRef.current) {
								clearTimeout(subtitleTimeoutRef.current);
							}

							// Resume after duration
							subtitleTimeoutRef.current = setTimeout(() => {
								setCurrentSubtitle(null);
								video.play();
							}, subtitle.duration * 1000);

							break; // Only trigger one subtitle at a time
						}
					}
				}
			}
		};

		const handlePlay = () => setIsPlaying(true);
		const handlePause = () => setIsPlaying(false);

		const handleLoadedMetadata = () => {
			setDuration(video.duration);
		};

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
	}, [selectedTab, enableSubtitles, subtitles]);

	// Reset progress and subtitles when tab changes
	useEffect(() => {
		setProgress(0);
		setIsPlaying(false);
		setCurrentSubtitle(null);
		shownSubtitlesRef.current.clear();
		if (subtitleTimeoutRef.current) {
			clearTimeout(subtitleTimeoutRef.current);
		}
	}, [selectedTab]);

	// Cleanup timeout on unmount
	useEffect(() => {
		return () => {
			if (subtitleTimeoutRef.current) {
				clearTimeout(subtitleTimeoutRef.current);
			}
		};
	}, []);

	const togglePlayPause = () => {
		const video = getCurrentVideo();
		if (!video) return;
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	};

	const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const video = getCurrentVideo();
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

	const skipSubtitle = () => {
		const video = getCurrentVideo();
		if (subtitleTimeoutRef.current) {
			clearTimeout(subtitleTimeoutRef.current);
		}
		setCurrentSubtitle(null);
		if (video) {
			video.play();
		}
	};

	return (
		<div className="w-full" ref={containerRef}>
			{/* Tab buttons */}
			<div className="flex w-full mb-4 border-b border-gray-200 dark:border-gray-700">
				{tabs.map((tab) => (
					<button
						key={tab.id}
						onClick={() => handleTabSelect(tab.id)}
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
			{/* Tab content container */}
			<div id="tab-content" className="relative">
				{tabs.map((tab) => (
					<div
						key={tab.id}
						className={selectedTab === tab.id ? 'block' : 'hidden'}
					>
						{/* Description */}
						<p className="text-gray-900 dark:text-white mb-4">
							{tab.description}
						</p>
						{/* Video */}
						<div className="relative group/video rounded-lg overflow-hidden bg-gray-900">
							{visitedTabs.has(tab.id) ? (
								<video
									ref={(el) => { videoRefs.current[tab.id] = el; }}
									className="w-full object-cover"
									loop
									muted
									playsInline
									preload="auto"
								>
									<source src={tab.video} type="video/webm" />
								</video>
							) : (
								<div className="w-full aspect-video" />
							)}
							{/* Loading overlay with progress */}
							{selectedTab === tab.id && loadingState[tab.id]?.loading && (
								<div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 backdrop-blur-sm">
									<div className="w-16 h-16 mb-4 relative">
										<svg className="w-full h-full" viewBox="0 0 50 50">
											<circle
												cx="25"
												cy="25"
												r="20"
												fill="none"
												stroke="rgba(255, 255, 255, 0.2)"
												strokeWidth="4"
											/>
											<circle
												cx="25"
												cy="25"
												r="20"
												fill="none"
												stroke="rgba(59, 130, 246, 0.9)"
												strokeWidth="4"
												strokeDasharray={2 * Math.PI * 20}
												strokeDashoffset={2 * Math.PI * 20 * (1 - (loadingState[tab.id]?.progress || 0) / 100)}
												strokeLinecap="round"
												className="transition-all duration-300"
												style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
											/>
										</svg>
										<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
											{Math.round(loadingState[tab.id]?.progress || 0)}%
										</span>
									</div>
									<p className="text-white/70 text-sm">Loading video...</p>
								</div>
							)}
							{/* Subtitle overlay */}
							{enableSubtitles && selectedTab === tab.id && currentSubtitle && !loadingState[tab.id]?.loading && (
								<div
									className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer"
									onClick={skipSubtitle}
								>
									<div className="text-white px-6 py-4 max-w-md text-center">
										<p className="text-lg font-medium">{currentSubtitle}</p>
									</div>
								</div>
							)}
							{/* Circular progress indicator - only show for active tab */}
							{selectedTab === tab.id && (
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
							)}
							{/* Control bar - appears on hover, only for active tab */}
							{selectedTab === tab.id && (
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
							)}
						</div>
						{/* YouTube CTA */}
						{tab.youtubeUrl && (
							<div className="flex justify-end mt-3">
								<a
									href={tab.youtubeUrl}
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
									<span className="group-hover/yt:underline">Learn more about {tab.label.toLowerCase()}</span>
								</a>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}
