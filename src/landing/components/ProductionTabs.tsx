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
	localDevVideo: string;
	youtubeUrl?: string;
}

export interface SubtitleConfig {
	time: number;
	text: string;
	duration: number;
	type?: 'overlay' | 'inline'; // overlay pauses video, inline shows subtitle without interruption
}

export interface ProductionTabsProps {
	tabs: TabConfig[];
	subtitles?: Record<string, SubtitleConfig[]>;
	localDevSubtitles?: Record<string, SubtitleConfig[]>;
	enableSubtitles?: boolean;
}

// Default tabs configuration
export const defaultTabs: TabConfig[] = [
	{ id: 'scripts', label: 'Scripts', icon: 'Server', description: 'Write scripts in 20+ languages (Python, TS, Go...) with full LSP support, auto-generated UI, managed dependencies and turn them into instant endpoints or hooks for pubsub events.', video: '/videos/landingscripts-ui.webm', localDevVideo: '/videos/landingscripts-local.webm', youtubeUrl: 'https://www.youtube.com/watch?v=QRf8C8qF7CY' },
	{ id: 'flows', label: 'Flows', icon: 'Server', description: 'Orchestrate your scripts into high-performance flows with full code flexibility, AI assistance, and sub-20ms overhead.', video: '/videos/landingflows-ui.webm', localDevVideo: '/videos/landingflows-local.webm', youtubeUrl: 'https://www.youtube.com/watch?v=yE-eDNWTj3g' },
	{ id: 'apps', label: 'Apps', icon: 'Monitor', description: 'Build powerful full-stack apps using Windmill as a backend and any framework as frontend.', video: '/videos/landingapps-ui.webm', localDevVideo: '/videos/landingapps-local.webm', youtubeUrl: 'https://www.youtube.com/watch?v=CNtRLDXbfOE' },
];

// Default subtitles configuration for Windmill UI videos
export const defaultSubtitles: Record<string, SubtitleConfig[]> = {
	scripts: [
        { time: 0.5, text: 'Code in 20+ languages (Python, TS, Go, Rust, Java, SQL, Bash, Ruby...)', duration: 3 },
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

// Default subtitles configuration for Local Dev videos
export const defaultLocalDevSubtitles: Record<string, SubtitleConfig[]> = {
	scripts: [
		{ time: 0.5, text: 'Pull scripts from your workspace via the Windmill CLI', duration: 3 },
        { time: 12.0, text: 'Auto-generate script UIs with the VS Code extension', duration: 2.5 },
        { time: 19.0, text: 'Edit code in your local editor with instant sync', duration: 2.5 },
        { time: 26.0, text: 'Test locally with immediate feedback loops', duration: 2.5 },
        { time: 31.0, text: 'Refine your logic with your favorite AI assistant', duration: 2.5 },
        { time: 51.0, text: 'Push changes back to your workspace', duration: 2.5 },
        { time: 57.0, text: 'Deployment complete. Changes are live in the Windmill UI', duration: 2.5 },
    ],
	flows: [
        { time: 0.5, text: 'Draft your flow using your favorite AI assistant', duration: 2.5 },
        { time: 10.0, text: 'Windmill generates a YAML definition for your flow', duration: 2.5 },
        { time: 17.0, text: 'The VS Code extension renders an instant flow preview', duration: 2.5 },
        { time: 24.0, text: 'Test your flow with full observability and tracing', duration: 2.5 },
		{ time: 33.4, text: 'Each inline script of your flow has its own file you can iterate on', duration: 2.5 },
        { time: 49.3, text: 'Add new steps directly from the visual preview', duration: 2.5 },
        { time: 53.5, text: 'Bidirectional sync between your YAML and the preview', duration: 2.5 },
        { time: 59.5, text: 'Push your flow to the workspace via the CLI', duration: 2.5 },
        { time: 67.5, text: 'Deployment complete. Run your flow live in the UI', duration: 2.5 },
    ],
    apps: [
        //{ time: 0.5, text: 'Build full-stack apps using your favorite AI assistant', duration: 2.5 },
        { time: 15.0, text: 'Create backend runnables with total code flexibility', duration: 2.5 },
        { time: 24.0, text: 'Debug and test runnables via the VS Code extension', duration: 2.5 },
        { time: 32.0, text: 'Runnables are auto-typed into a global backend object', duration: 2.5 },
        { time: 42.0, text: 'Call backend logic directly from your frontend with zero boilerplate', duration: 3.5 },
        { time: 49.0, text: 'Preview and test your full-stack app on a local server', duration: 2.5 },
        { time: 53.0, text: 'Build complete. Your app is ready to test locally', duration: 2.5 },
		{ time: 55.0, text: 'On mount, triggers the get_failed_payments runnable', duration: 3, type: 'inline' },
        { time: 58.5, text: 'On click, triggers the generate_email runnable', duration: 3, type: 'inline' },
		{ time: 65.0, text: 'On click, triggers the send_email runnable', duration: 3, type: 'inline' },
    ],
};

export type VideoMode = 'ui' | 'localDev';

export default function ProductionTabs({
	tabs = defaultTabs,
	subtitles = defaultSubtitles,
	localDevSubtitles = defaultLocalDevSubtitles,
	enableSubtitles = true,
}: ProductionTabsProps) {
	const [selectedTab, setSelectedTab] = useState(tabs[0]?.id || 'scripts');
	const [progress, setProgress] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [duration, setDuration] = useState(0);
	const [videoMode, setVideoMode] = useState<VideoMode>('ui');
	const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});
	const progressBarRef = useRef<HTMLDivElement>(null);

	// Subtitle state (overlay - pauses video)
	const [currentSubtitle, setCurrentSubtitle] = useState<string | null>(null);
	const lastSubtitleTimeRef = useRef<number>(-1);
	const isShowingSubtitleRef = useRef<boolean>(false);
	const subtitleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	// Inline subtitle state (non-interrupting)
	const [inlineSubtitle, setInlineSubtitle] = useState<string | null>(null);
	const lastInlineSubtitleTimeRef = useRef<number>(-1);
	const inlineSubtitleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);

	// Lazy loading state - track which tabs have been visited
	const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set([tabs[0]?.id || 'scripts']));
	// Loading state per video
	const [loadingState, setLoadingState] = useState<Record<string, { loading: boolean; progress: number }>>({});

	const getVideoKey = (tabId: string) => `${tabId}-${videoMode}`;
	const getCurrentVideo = () => videoRefs.current[getVideoKey(selectedTab)];

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
		const videoKey = getVideoKey(selectedTab);
		const video = videoRefs.current[videoKey];
		if (!video || !visitedTabs.has(selectedTab)) return;

		const handleLoadStart = () => {
			setLoadingState(prev => ({
				...prev,
				[videoKey]: { loading: true, progress: 0 }
			}));
		};

		const handleProgress = () => {
			if (video.buffered.length > 0 && video.duration > 0) {
				const bufferedEnd = video.buffered.end(video.buffered.length - 1);
				const progressPercent = (bufferedEnd / video.duration) * 100;
				setLoadingState(prev => ({
					...prev,
					[videoKey]: { loading: progressPercent < 100, progress: progressPercent }
				}));
			}
		};

		const handleCanPlayThrough = () => {
			setLoadingState(prev => ({
				...prev,
				[videoKey]: { loading: false, progress: 100 }
			}));
		};

		const handleWaiting = () => {
			setLoadingState(prev => ({
				...prev,
				[videoKey]: { ...prev[videoKey], loading: true }
			}));
		};

		const handlePlaying = () => {
			setLoadingState(prev => ({
				...prev,
				[videoKey]: { ...prev[videoKey], loading: false }
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
				[videoKey]: { loading: false, progress: 100 }
			}));
		} else if (video.readyState < 3) {
			setLoadingState(prev => ({
				...prev,
				[videoKey]: { loading: true, progress: 0 }
			}));
		}

		return () => {
			video.removeEventListener('loadstart', handleLoadStart);
			video.removeEventListener('progress', handleProgress);
			video.removeEventListener('canplaythrough', handleCanPlayThrough);
			video.removeEventListener('waiting', handleWaiting);
			video.removeEventListener('playing', handlePlaying);
		};
	}, [selectedTab, visitedTabs, videoMode]);

	// Play/pause videos when tab or video mode changes
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
	}, [selectedTab, hasBeenVisible, tabs, videoMode]);

	// Track video progress and handle subtitle detection
	useEffect(() => {
		const video = getCurrentVideo();
		if (!video) return;

		// Reset subtitle tracking when this effect runs (on tab/mode change)
		lastSubtitleTimeRef.current = -1;
		isShowingSubtitleRef.current = false;

		const handleTimeUpdate = () => {
			if (video.duration > 0) {
				setProgress((video.currentTime / video.duration) * 100);
				setDuration(video.duration);

				// Check for subtitle triggers
				if (enableSubtitles) {
					const activeSubtitles = videoMode === 'ui' ? subtitles : localDevSubtitles;
					const tabSubtitles = activeSubtitles[selectedTab] || [];
					const currentTime = video.currentTime;

					// Reset tracking if video looped (currentTime went backwards significantly)
					if (currentTime < lastSubtitleTimeRef.current - 1) {
						lastSubtitleTimeRef.current = -1;
					}
					if (currentTime < lastInlineSubtitleTimeRef.current - 1) {
						lastInlineSubtitleTimeRef.current = -1;
					}

					for (const subtitle of tabSubtitles) {
						const isInline = subtitle.type === 'inline';
						const lastTimeRef = isInline ? lastInlineSubtitleTimeRef : lastSubtitleTimeRef;

						// Skip overlay subtitles if one is currently showing
						if (!isInline && isShowingSubtitleRef.current) continue;

						// Check if we're within 0.2s of the subtitle timestamp
						// and this subtitle time is after the last one we triggered
						if (
							Math.abs(currentTime - subtitle.time) < 0.2 &&
							subtitle.time > lastTimeRef.current
						) {
							if (isInline) {
								// Inline subtitle: show without pausing
								lastInlineSubtitleTimeRef.current = subtitle.time;
								setInlineSubtitle(subtitle.text);

								// Clear any existing inline timeout
								if (inlineSubtitleTimeoutRef.current) {
									clearTimeout(inlineSubtitleTimeoutRef.current);
								}

								// Hide after duration
								inlineSubtitleTimeoutRef.current = setTimeout(() => {
									setInlineSubtitle(null);
								}, subtitle.duration * 1000);
							} else {
								// Overlay subtitle: pause video and show
								lastSubtitleTimeRef.current = subtitle.time;
								isShowingSubtitleRef.current = true;

								video.pause();
								setCurrentSubtitle(subtitle.text);

								// Clear any existing timeout
								if (subtitleTimeoutRef.current) {
									clearTimeout(subtitleTimeoutRef.current);
								}

								// Resume after duration
								subtitleTimeoutRef.current = setTimeout(() => {
									setCurrentSubtitle(null);
									isShowingSubtitleRef.current = false;
									video.play();
								}, subtitle.duration * 1000);

								break; // Only trigger one overlay subtitle at a time
							}
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
	}, [selectedTab, enableSubtitles, subtitles, localDevSubtitles, videoMode]);

	// Reset progress and subtitles when tab changes
	useEffect(() => {
		setProgress(0);
		setIsPlaying(false);
		setCurrentSubtitle(null);
		setInlineSubtitle(null);
		lastSubtitleTimeRef.current = -1;
		lastInlineSubtitleTimeRef.current = -1;
		isShowingSubtitleRef.current = false;
		if (subtitleTimeoutRef.current) {
			clearTimeout(subtitleTimeoutRef.current);
		}
		if (inlineSubtitleTimeoutRef.current) {
			clearTimeout(inlineSubtitleTimeoutRef.current);
		}
	}, [selectedTab]);

	// Reset and replay when video mode changes
	useEffect(() => {
		setProgress(0);
		setIsPlaying(false);
		setCurrentSubtitle(null);
		setInlineSubtitle(null);
		lastSubtitleTimeRef.current = -1;
		lastInlineSubtitleTimeRef.current = -1;
		isShowingSubtitleRef.current = false;
		setLoadingState({});
		if (subtitleTimeoutRef.current) {
			clearTimeout(subtitleTimeoutRef.current);
		}
		if (inlineSubtitleTimeoutRef.current) {
			clearTimeout(inlineSubtitleTimeoutRef.current);
		}
	}, [videoMode]);

	// Cleanup timeouts on unmount
	useEffect(() => {
		return () => {
			if (subtitleTimeoutRef.current) {
				clearTimeout(subtitleTimeoutRef.current);
			}
			if (inlineSubtitleTimeoutRef.current) {
				clearTimeout(inlineSubtitleTimeoutRef.current);
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
		isShowingSubtitleRef.current = false;
		if (video) {
			video.play();
		}
	};

	const getVideoSrc = (tab: TabConfig) => {
		return videoMode === 'ui' ? tab.video : tab.localDevVideo;
	};

	const getCurrentSubtitles = () => {
		return videoMode === 'ui' ? subtitles : localDevSubtitles;
	};

	return (
		<div className="w-full" ref={containerRef}>
			{/* Video mode switch */}
			<div className="flex justify-center mb-4">
				<div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
					<button
						onClick={() => setVideoMode('ui')}
						className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
							videoMode === 'ui'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Windmill UI
					</button>
					<button
						onClick={() => setVideoMode('localDev')}
						className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
							videoMode === 'localDev'
								? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
								: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
						}`}
					>
						Local Dev
					</button>
				</div>
			</div>
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
									key={`${tab.id}-${videoMode}`}
									ref={(el) => { videoRefs.current[`${tab.id}-${videoMode}`] = el; }}
									className="w-full object-cover"
									loop
									muted
									playsInline
									preload="auto"
								>
									<source
										src={getVideoSrc(tab)}
										type={getVideoSrc(tab).endsWith('.mov') ? 'video/quicktime' : getVideoSrc(tab).endsWith('.mp4') ? 'video/mp4' : 'video/webm'}
									/>
								</video>
							) : (
								<div className="w-full aspect-video" />
							)}
							{/* Loading overlay with progress */}
							{selectedTab === tab.id && loadingState[getVideoKey(tab.id)]?.loading && !isPlaying && !isShowingSubtitleRef.current && (
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
												strokeDashoffset={2 * Math.PI * 20 * (1 - (loadingState[getVideoKey(tab.id)]?.progress || 0) / 100)}
												strokeLinecap="round"
												className="transition-all duration-300"
												style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
											/>
										</svg>
										<span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
											{Math.round(loadingState[getVideoKey(tab.id)]?.progress || 0)}%
										</span>
									</div>
									<p className="text-white/70 text-sm">Loading video...</p>
								</div>
							)}
							{/* Subtitle overlay */}
							{enableSubtitles && selectedTab === tab.id && currentSubtitle && (
								<div
									className="absolute inset-0 flex items-center justify-center bg-gray-900/80 backdrop-blur-[2px] transition-opacity duration-300 cursor-pointer"
									onClick={skipSubtitle}
								>
									<div className="text-white px-6 py-4 max-w-md text-center">
										<p className="text-lg font-medium">{currentSubtitle}</p>
									</div>
								</div>
							)}
							{/* Inline subtitle - non-interrupting caption at bottom */}
							{enableSubtitles && selectedTab === tab.id && inlineSubtitle && (
								<div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-none">
									<div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium animate-fade-in">
										{inlineSubtitle}
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
					</div>
				))}
			</div>
		</div>
	);
}
