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
	{ id: 'scripts', label: 'Scripts', icon: 'Server', description: 'Write scripts in 20+ languages (Python, TS, Go...) with full LSP support, auto-generated UI, managed dependencies and turn them into instant endpoints or hooks for pubsub events.', video: '/videos/landingscripts-ui.webm' },
	{ id: 'flows', label: 'Flows', icon: 'Server', description: 'Orchestrate your scripts into high-performance flows with full code flexibility, AI assistance, and sub-20ms overhead.', video: '/videos/landingflows-ui.webm' },
	{ id: 'apps', label: 'Apps', icon: 'Monitor', description: 'Build powerful full-stack apps using Windmill as a backend and any framework as frontend.', video: '/videos/landingapps-ui.webm' },
];

// Default subtitles configuration
export const defaultSubtitles: Record<string, SubtitleConfig[]> = {
	scripts: [
        { time: 0.0, text: 'Code in 20+ languages (Python, TS, Go, Rust, Java, SQL, Bash, Ruby...)', duration: 3 },
        { time: 3.5, text: 'Import any package including your private repositories', duration: 2 },
        { time: 10.5, text: 'Auto-generate UIs from your script parameters', duration: 2.5 },
        { time: 16.0, text: 'Real-time logs and instant test results', duration: 2.5 },
        { time: 30.0, text: 'Trigger via Webhooks, Schedule, CLI, Slack, or Email', duration: 2.5 },
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

	const getCurrentVideo = () => videoRefs.current[selectedTab];

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
						<div className="relative group/video rounded-lg overflow-hidden">
							<video
								ref={(el) => { videoRefs.current[tab.id] = el; }}
								className="w-full object-cover"
								loop
								muted
								playsInline
							>
								<source src={tab.video} type="video/webm" />
							</video>
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
