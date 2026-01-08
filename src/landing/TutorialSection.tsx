import React from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight,
	ChevronRight,
	ChevronLeft,
	RotateCcw,
	Play,
	Pause,
	Monitor,
	Database
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
import CombinedAnimation from './CombinedAnimation';
// @ts-ignore
import performance from '/illustrations/performance.json';
// @ts-ignore
import thirdparty from '/illustrations/thirdparty.json';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
import ScriptAnimation from './ScriptAnimation';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import ProgressBars from './animations/ProgressBars';
import AnimationCarousel from './animations/AnimationCarousel';
import ScrollContext from './animations/ScrollContext';
import { useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { scriptScrollCount, flowScrollCount, appScrollCount } from './animations/useAnimateScroll';

export default function TutorialSection({ subIndex, children }) {
	const [chart, setChart] = React.useState<'short' | 'long'>(undefined);
	const [step, setStep] = React.useState(subIndex || 0);
	const containerRef = React.useRef<HTMLDivElement>(null);

	const oneStep = subIndex !== undefined;
	const maxHeight = oneStep ? 5000 : 15000;

	const items = [
		{
			key: 'scripts',
			content: (
				<div className="flex flex-row items-start">
					<ScriptAnimation active={true} />
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="flex flex-row items-start">
					<FlowAnimation active={true} only={oneStep} />
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className=" flex flex-row items-start">
					<AppAnimation active={true} only={oneStep} />
				</div>
			)
		}
	];

	const [px, setPx] = React.useState(0);

	useEffect(() => {
		setPx((maxHeight - window.innerHeight) / 3);
	}, []);

	function nextStep() {
		const top = containerRef.current.getBoundingClientRect().y * -1;

		const steps = {
			scripts: { total: px, steps: [20, 40, 50, 60, 70, 80] },
			flows: { total: px * 2, steps: [10, 20, 30, 40, 50, 60, 75, 80, 90] },
			apps: { total: px * 3, steps: [10, 15, 30, 45, 60, 72, 90, 99] }
		};

		if (subIndex !== undefined) {
			const stepKey = subIndex === 0 ? 'scripts' : subIndex === 1 ? 'flows' : 'apps';
			const section = steps[stepKey];

			if (!section) {
				return;
			}

			smoothScrollToNextStep(top, {
				total: px,
				steps: section.steps
			});
		} else {
			for (const section of Object.values(steps)) {
				if (top < section.total) {
					const res = smoothScrollToNextStep(top, section);
					if (res === 'next') {
						window.scrollBy({
							top: section.total - top + 50,
							behavior: 'smooth'
						});
					}
					break;
				}
			}
		}
	}

	function smoothScrollToNextStep(
		top: number,
		{ steps, total }: { total: number; steps: number[] }
	) {
		const percentage = (100 * (top % px)) / px + 1;
		const nextStepPercentage = steps.find((step: number) => step > percentage);

		if (nextStepPercentage === undefined) {
			return 'next';
		}

		const scrollAmount = (nextStepPercentage * px) / 100 + (total - px);

		window.scrollBy({
			top: scrollAmount - top,
			behavior: 'smooth'
		});

		return 'done';
	}

	function findHighestUnderX(arr: number[], x: number) {
		return arr.reduce((prev, curr) => (curr > prev && curr < x ? curr : prev), 0);
	}

	function smoothScrollToPreviousStep(
		top: number,
		{ steps, total }: { total: number; steps: number[] }
	) {
		const percentage = (100 * (top % px)) / px - 1;
		const nextStepPercentage = findHighestUnderX(steps, percentage);

		if (nextStepPercentage === 0) {
			return 'previous';
		}

		const scrollAmount = (nextStepPercentage * px) / 100 + (total - px);

		window.scrollBy({
			top: scrollAmount - top,
			behavior: 'smooth'
		});

		return 'done';
	}

	function prevStep() {
		const top = containerRef.current.getBoundingClientRect().y * -1;
		let foundSection = false;

		const steps = {
			scripts: { total: px, steps: [20, 40, 50, 60, 70, 80] },
			flows: { total: px * 2, steps: [10, 20, 30, 40, 50, 60, 75, 80, 90] },
			apps: { total: px * 3, steps: [10, 15, 30, 45, 60, 72, 90, 99] }
		};

		if (subIndex !== undefined) {
			const stepKey = subIndex === 0 ? 'scripts' : subIndex === 1 ? 'flows' : 'apps';
			const section = steps[stepKey];

			if (!section) {
				return;
			}

			smoothScrollToPreviousStep(top, {
				total: px,
				steps: section.steps
			});
		} else {
			for (const [sectionName, section] of Object.entries(steps)) {
				if (top <= section.total) {
					const res = smoothScrollToPreviousStep(top, section);

					if (res === 'previous' && sectionName !== 'scripts') {
						const previousSectionName =
							Object.keys(steps)[Object.keys(steps).indexOf(sectionName) - 1];
						const previousSection = steps[previousSectionName];

						if (!previousSection) {
							return;
						}

						const lastStepPercentage = previousSection.steps[previousSection.steps.length - 1];
						const scrollAmount = (lastStepPercentage * px) / 100 + (previousSection.total - px);

						window.scrollBy({
							top: scrollAmount - top,
							behavior: 'smooth'
						});
					}
					foundSection = true;
					break;
				}
			}
		}

		if (!foundSection) {
			// If we're at the very bottom, go to the last step of the last section
			const lastSectionName = Object.keys(steps)[Object.keys(steps).length - 1];
			const lastSection = steps[lastSectionName];
			const lastStepPercentage = lastSection.steps[lastSection.steps.length - 1];
			const scrollAmount = (lastStepPercentage * px) / 100 + (lastSection.total - px);

			window.scrollBy({
				top: scrollAmount - top,
				behavior: 'smooth'
			});
		}
	}

	useEffect(() => {
		setPx((maxHeight - window.innerHeight) / 3);

		const handleKeyDown = (event) => {
			if (event.key === 'ArrowRight') {
				nextStep();
			} else if (event.key === 'ArrowLeft') {
				prevStep();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [step, px]);

	useEffect(() => {
		setChart('short');
	}, []);

	const features = [
		{
			title: 'Build for production',
			description: 'Build mission-critical internal tools and data pipelines that integrates directly with your existing stack and resources.',
			icon: GitCompareArrows,
			href: '/docs/core_concepts/draft_and_deploy#diff-viewer',
			lottieData: devfriendly
		},
		{
			title: 'Collaborate with Git',
			description: 'Develop locally, sync changes bi-directionally, and maintain a strict audit trail with built-in diff viewing.',
			icon: GitCompareArrows,
			href: '/docs/advanced/git_sync',
			image: '/illustrations/diff.png',
			imageAlt: 'Review'
		},
		{
			title: 'Deploy at scale with confidence',
			description: 'Process 1,000+ jobs per second with linear horizontal scaling. Auto-scale capacity on demand or isolate critical workloads using dedicated worker groups on Kubernetes and Docker.',
			icon: Server,
			href: '/docs/misc/benchmarks/competitors',
			useBenchmark: true,
			actionText: 'See benchmarks'
		},
		{
			title: 'Monitor with ease and depth',
			description: 'Monitor jobs with real-time logs and built-in error handling to catch failures early. Seamlessly integrate with OTel and Prometheus for full-stack observability, or get instant visibility via Slack and email alerts.',
			icon: Activity,
			href: '/docs/core_concepts/monitor_past_and_future_runs',
			video: '/videos/your-observability-video.mp4', // Replace with your actual video filename
			image: '/illustrations/11.png', // Fallback image
			imageAlt: 'Monitor'
		}
	];

	const ArrowSeparator = () => (
							<div className="h-20 w-full flex justify-center my-2 py-2">
								<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
							</div>
	);

	const ProductionTabs = () => {
		const [selectedTab, setSelectedTab] = useState('backend');
		const [progress, setProgress] = useState(0);
		const videoRef = useRef<HTMLVideoElement>(null);

		const tabs = [
			{ id: 'backend', label: 'Scripts & Flows', icon: Server, description: 'Write scripts in 20+ languages (Python, TS, Go, Bash...) and orchestrate them into powerfuls flows.', video: '/videos/backendvideo.mp4' },
			{ id: 'frontend', label: 'Apps', icon: Monitor, description: 'Connect your scripts and flows to production-ready frontends with full code flexibility and AI assistance.', video: '/videos/frontendvideo.mp4' },
			{ id: 'datatables', label: 'Data', icon: Database, description: 'Store and query data with built-in PostgreSQL tables, Ducklake, DuckDB and S3 integrations.', video: '/videos/databasevideo.mp4' }
		];

		const currentTab = tabs.find(tab => tab.id === selectedTab) || tabs[0];

		// Track video progress using timeupdate event
		useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			const handleTimeUpdate = () => {
				if (video.duration > 0) {
					setProgress((video.currentTime / video.duration) * 100);
				}
			};

			const handleSeeked = () => {
				// When video loops, it seeks back to 0
				if (video.currentTime < 0.1) {
					setProgress(0);
				}
			};

			video.addEventListener('timeupdate', handleTimeUpdate);
			video.addEventListener('seeked', handleSeeked);

			return () => {
				video.removeEventListener('timeupdate', handleTimeUpdate);
				video.removeEventListener('seeked', handleSeeked);
			};
		}, [selectedTab]);

		// Reset progress when tab changes
		useEffect(() => {
			setProgress(0);
		}, [selectedTab]);

		const circumference = 2 * Math.PI * 16;

		return (
			<div className="w-full">
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
				<div className="relative">
					<video
						ref={videoRef}
						key={selectedTab}
						className="rounded-lg overflow-hidden w-full object-cover"
						autoPlay
						loop
						muted
						playsInline
					>
						<source src={currentTab.video} type="video/mp4" />
					</video>
					{/* Circular progress indicator */}
					<div className="absolute bottom-3 right-3">
						<svg className="w-10 h-10" viewBox="0 0 36 36">
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
								strokeDasharray={circumference}
								strokeDashoffset={circumference - (progress / 100) * circumference}
								strokeLinecap="round"
								style={{
									transform: 'rotate(-90deg)',
									transformOrigin: '50% 50%'
								}}
							/>
						</svg>
					</div>
				</div>
			</div>
		);
	};

	const FeatureCard = ({ feature, index, totalFeatures }) => {
		const { colorMode } = useColorMode();
		const ContentWrapper = feature.href ? 'a' : 'div';
		const isProductionUse = feature.title === 'Build for production';
		
		const wrapperProps = feature.href
			? {
					href: feature.href,
					target: '_blank',
					className: isProductionUse
						? 'group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer'
						: 'col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center'
				}
			: {
					className: isProductionUse
						? 'group text-black dark:text-white cursor-pointer'
						: 'col-span-2 group text-black dark:text-white cursor-pointer flex flex-col justify-center'
				};

		return (
			<>
				<div
					className={`dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl ${
						isProductionUse ? 'flex flex-col gap-6' : 'grid grid-cols-1 md:grid-cols-5 gap-8'
					} ${feature.mt || ''} ${index < totalFeatures - 1 ? 'mb-8' : ''}`}
				>
					<ContentWrapper {...wrapperProps}>
						<div className="font-medium text-3xl mb-4 group-hover:ml-2 transition-all">
							{feature.title}
						</div>
						<div className={`text-md mb-4 group-hover:ml-2 transition-all ${isProductionUse ? '' : 'max-w-sm'}`}>
							{feature.description}
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-0">
							{feature.actionText || 'Learn more'}
							<ArrowRight size={24} />
						</div>
					</ContentWrapper>
					<div className={isProductionUse ? 'w-full' : 'col-span-3'}>
						{feature.useBenchmark ? (
							<div className="flex flex-col w-full gap-4">
								<div className="flex flex-row gap-2 items-center transition-all">
									<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
										10 long running tasks
									</span>
									<Switch
										checked={chart === 'short'}
										title="Switch between short and long running tasks"
										onChange={() => {
											setChart(chart === 'long' ? 'short' : 'long');
										}}
										className={`${
											chart === 'short'
												? 'bg-blue-500 dark:bg-blue-900'
												: 'bg-gray-200 dark:bg-gray-800'
										}
          relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
									>
										<span
											aria-hidden="true"
											className={`${chart === 'short' ? 'translate-x-6' : 'translate-x-0'}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white  shadow-lg ring-0 transition duration-200 ease-in-out`}
										/>
									</Switch>
									<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
										40 lightweight tasks
									</span>
						</div>
						<div
									className={classNames(
										colorMode === 'dark' ? 'bg-black' : 'bg-gray-50',
										'w-full p-8 bg-opacity-40 rounded-xl benchmark-chart-container'
									)}
									data-theme={colorMode}
								>
									<div className="grid">
										{chart === 'short' ? (
											<div>
												<BenchmarkVisualization
													usecase="fibonacci_40_10"
													language="python"
													engines={[
														'airflow',
														'kestra',
														'prefect',
														'temporal',
														'windmill',
														'windmill_dedicated'
													]}
													workers={1}
													title="40 lightweight tasks comparison (animation time speed 20x)"
													maintainAspectRatio={false}
													shouldAnimate={true}
												/>
				</div>
										) : (
											<div>
												<BenchmarkVisualization
													usecase="fibonacci_10_33"
													language="python"
													engines={[
														'airflow',
														'kestra',
														'prefect',
														'temporal',
														'windmill',
														'windmill_dedicated'
													]}
													workers={1}
													title="10 long running tasks comparison (animation time speed 20x)"
													maintainAspectRatio={false}
													shouldAnimate={true}
												/>
				</div>
										)}
						</div>
						</div>
						</div>
						) : feature.title === 'Build for production' ? (
							<ProductionTabs />
						) : feature.lottieData ? (
							<Lottie lottieData={feature.lottieData} autoplay loop={true} />
						) : feature.video ? (
							<video
								className="rounded-lg overflow-hidden h-full w-full object-cover"
								autoPlay
								loop
								muted
								playsInline
								preload="metadata"
							>
								<source src={feature.video} type="video/mp4" />
							</video>
						) : (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
								<img src={feature.image} alt={feature.imageAlt || feature.title} />
						</div>
						)}
					</div>
				</div>
			</>
		);
	};


	// Animation section component - using the working wrapper from CorePrinciple
	const AnimationSection = () => {
		const scrollValue = useMotionValue(0);
		const previousValueRef = useRef(0);
		const intervalRef = useRef<NodeJS.Timeout | null>(null);
		const [step, setStep] = useState(0);
		const [isPlaying, setIsPlaying] = useState(true);
		
		// Section-specific speeds
		const sectionSpeeds = {
			scripts: 0.5,
			flows: 0.3,
			apps: 0.5
		};

		const handleClick = (newStep: number) => {
			if (newStep === 0) {
				previousValueRef.current = scrollValue.get();
				scrollValue.set(0);
				setStep(0);
			}
		};

		useEffect(() => {
			if (!isPlaying) return;

			// Auto-advance the animation through Script, Flow, and App sections
			// Speed multiplier varies by section
			let progress = scrollValue.get();
			const totalScroll = scriptScrollCount + flowScrollCount + appScrollCount;
			const baseIncrement = 50; // Base increment per 100ms
			
			intervalRef.current = setInterval(() => {
				// Determine current section and apply appropriate speed
				let currentSpeed;
				if (progress < scriptScrollCount) {
					currentSpeed = sectionSpeeds.scripts;
				} else if (progress < scriptScrollCount + flowScrollCount) {
					currentSpeed = sectionSpeeds.flows;
				} else {
					currentSpeed = sectionSpeeds.apps;
				}
				
				const increment = baseIncrement * currentSpeed;
				progress += increment;
				if (progress > totalScroll) {
					progress = 0; // Reset to loop
				}
				previousValueRef.current = scrollValue.get();
				scrollValue.set(progress);
			}, 100);

			return () => {
				if (intervalRef.current) {
					clearInterval(intervalRef.current);
				}
			};
		}, [scrollValue, isPlaying]);

		// Create a mock MotionValue with onChange method and getPrevious
		const mockMotionValue = {
			get: () => scrollValue.get(),
			getPrevious: () => previousValueRef.current,
			set: (value: number) => {
				previousValueRef.current = scrollValue.get();
				scrollValue.set(value);
			},
			onChange: (callback: (latest: number) => void) => {
				return scrollValue.on('change', callback);
			}
		} as any;

		const totalScroll = scriptScrollCount + flowScrollCount + appScrollCount;
		const scriptSteps = [0, 20, 40, 50, 60, 70, 80];
		const flowSteps = [0, 5, 30, 50, 60, 70, 90];
		const appSteps = [0, 10, 15, 30, 45, 60, 72, 90, 99];
		const [currentProgress, setCurrentProgress] = useState(0);
		const [activeSection, setActiveSection] = useState<'scripts' | 'flows' | 'apps'>('scripts');
		const [currentStepIndex, setCurrentStepIndex] = useState(0);

		const jumpToStep = (stepPercent: number, section: 'scripts' | 'flows' | 'apps') => {
			let targetProgress;
			if (section === 'scripts') {
				targetProgress = (stepPercent * scriptScrollCount) / 100;
			} else if (section === 'flows') {
				// Flow steps are relative to flowScrollCount, but we need to add scriptScrollCount offset
				targetProgress = scriptScrollCount + (stepPercent * flowScrollCount) / 100;
			} else {
				// App steps are relative to appScrollCount, but we need to add scriptScrollCount + flowScrollCount offset
				targetProgress = scriptScrollCount + flowScrollCount + (stepPercent * appScrollCount) / 100;
			}
			previousValueRef.current = scrollValue.get();
			scrollValue.set(targetProgress);
			setIsPlaying(false); // Pause when manually jumping
		};

		useEffect(() => {
			const unsubscribe = scrollValue.on('change', (latest) => {
				setCurrentProgress((latest / totalScroll) * 100);
				// Determine which section is active and current step
				if (latest < scriptScrollCount) {
					setActiveSection('scripts');
					// Find closest step index
					const progressPercent = (latest / scriptScrollCount) * 100;
					const closestIndex = scriptSteps.reduce((prev, curr, index) => {
						return Math.abs(curr - progressPercent) < Math.abs(scriptSteps[prev] - progressPercent) ? index : prev;
					}, 0);
					setCurrentStepIndex(closestIndex);
				} else if (latest < scriptScrollCount + flowScrollCount) {
					setActiveSection('flows');
					const flowProgress = latest - scriptScrollCount;
					const progressPercent = (flowProgress / flowScrollCount) * 100;
					const closestIndex = flowSteps.reduce((prev, curr, index) => {
						return Math.abs(curr - progressPercent) < Math.abs(flowSteps[prev] - progressPercent) ? index : prev;
					}, 0);
					setCurrentStepIndex(closestIndex);
				} else {
					setActiveSection('apps');
					const appProgress = latest - scriptScrollCount - flowScrollCount;
					const progressPercent = (appProgress / appScrollCount) * 100;
					const closestIndex = appSteps.reduce((prev, curr, index) => {
						return Math.abs(curr - progressPercent) < Math.abs(appSteps[prev] - progressPercent) ? index : prev;
					}, 0);
					setCurrentStepIndex(closestIndex);
				}
			});
			return () => unsubscribe();
		}, [scrollValue, totalScroll]);

		// Keyboard navigation
		useEffect(() => {
			const handleKeyPress = (e: KeyboardEvent) => {
				if (e.key === 'ArrowLeft') {
					e.preventDefault();
					// Go to previous step
					if (activeSection === 'scripts') {
						if (currentStepIndex > 0) {
							const prevStep = scriptSteps[currentStepIndex - 1];
							jumpToStep(prevStep, 'scripts');
						}
					} else if (activeSection === 'flows') {
						if (currentStepIndex > 0) {
							const prevStep = flowSteps[currentStepIndex - 1];
							jumpToStep(prevStep, 'flows');
						} else {
							// Go to last step of scripts
							const lastScriptStep = scriptSteps[scriptSteps.length - 1];
							jumpToStep(lastScriptStep, 'scripts');
						}
					} else {
						// apps
						if (currentStepIndex > 0) {
							const prevStep = appSteps[currentStepIndex - 1];
							jumpToStep(prevStep, 'apps');
						} else {
							// Go to last step of flows
							const lastFlowStep = flowSteps[flowSteps.length - 1];
							jumpToStep(lastFlowStep, 'flows');
						}
					}
				} else if (e.key === 'ArrowRight') {
					e.preventDefault();
					// Go to next step
					if (activeSection === 'scripts') {
						if (currentStepIndex < scriptSteps.length - 1) {
							const nextStep = scriptSteps[currentStepIndex + 1];
							jumpToStep(nextStep, 'scripts');
						} else {
							// Go to first step of flows
							const firstFlowStep = flowSteps[0];
							jumpToStep(firstFlowStep, 'flows');
						}
					} else if (activeSection === 'flows') {
						if (currentStepIndex < flowSteps.length - 1) {
							const nextStep = flowSteps[currentStepIndex + 1];
							jumpToStep(nextStep, 'flows');
						} else {
							// Go to first step of apps
							const firstAppStep = appSteps[0];
							jumpToStep(firstAppStep, 'apps');
						}
					} else {
						// apps
						if (currentStepIndex < appSteps.length - 1) {
							const nextStep = appSteps[currentStepIndex + 1];
							jumpToStep(nextStep, 'apps');
						}
					}
				}
			};

			window.addEventListener('keydown', handleKeyPress);
			return () => {
				window.removeEventListener('keydown', handleKeyPress);
			};
		}, [activeSection, currentStepIndex, scriptSteps, flowSteps, appSteps]);

		const scriptProgressPercent = (scriptScrollCount / totalScroll) * 100;
		const scriptCurrentProgress = activeSection === 'scripts' 
			? (scrollValue.get() / scriptScrollCount) * 100 
			: activeSection === 'flows' || activeSection === 'apps' ? 100 : 0;
		const flowCurrentProgress = activeSection === 'flows'
			? ((scrollValue.get() - scriptScrollCount) / flowScrollCount) * 100
			: activeSection === 'apps' ? 100 : 0;
		const appCurrentProgress = activeSection === 'apps'
			? ((scrollValue.get() - scriptScrollCount - flowScrollCount) / appScrollCount) * 100
			: 0;

		return (
			<ScrollContext.Provider value={mockMotionValue}>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl">
					<div className="flex flex-row justify-between items-center mb-4">
						<div className="font-medium text-3xl mb-4 max-w-2xl">
							Develop and iterate with instant feedback
						</div>
						<div className="flex items-center gap-2">
							<button
								onClick={() => setIsPlaying(!isPlaying)}
								className="p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
								title={isPlaying ? 'Pause' : 'Play'}
							>
								{isPlaying ? <Pause size={20} /> : <Play size={20} />}
							</button>
							<button
								onClick={() => {
									// Go to previous step
									if (activeSection === 'scripts') {
										if (currentStepIndex > 0) {
											const prevStep = scriptSteps[currentStepIndex - 1];
											jumpToStep(prevStep, 'scripts');
										}
									} else if (activeSection === 'flows') {
										if (currentStepIndex > 0) {
											const prevStep = flowSteps[currentStepIndex - 1];
											jumpToStep(prevStep, 'flows');
										} else {
											const lastScriptStep = scriptSteps[scriptSteps.length - 1];
											jumpToStep(lastScriptStep, 'scripts');
										}
									} else {
										// apps
										if (currentStepIndex > 0) {
											const prevStep = appSteps[currentStepIndex - 1];
											jumpToStep(prevStep, 'apps');
										} else {
											const lastFlowStep = flowSteps[flowSteps.length - 1];
											jumpToStep(lastFlowStep, 'flows');
										}
									}
								}}
								className="p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={
									activeSection === 'scripts' && currentStepIndex === 0
								}
								title="Previous step (←)"
							>
								<ChevronLeft size={20} />
							</button>
							<button
								onClick={() => {
									// Go to next step
									if (activeSection === 'scripts') {
										if (currentStepIndex < scriptSteps.length - 1) {
											const nextStep = scriptSteps[currentStepIndex + 1];
											jumpToStep(nextStep, 'scripts');
										} else {
											const firstFlowStep = flowSteps[0];
											jumpToStep(firstFlowStep, 'flows');
										}
									} else if (activeSection === 'flows') {
										if (currentStepIndex < flowSteps.length - 1) {
											const nextStep = flowSteps[currentStepIndex + 1];
											jumpToStep(nextStep, 'flows');
										} else {
											const firstAppStep = appSteps[0];
											jumpToStep(firstAppStep, 'apps');
										}
									} else {
										// apps
										if (currentStepIndex < appSteps.length - 1) {
											const nextStep = appSteps[currentStepIndex + 1];
											jumpToStep(nextStep, 'apps');
										}
									}
								}}
								className="p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
								disabled={
									activeSection === 'apps' && currentStepIndex === appSteps.length - 1
								}
								title="Next step (→)"
							>
								<ChevronRight size={20} />
							</button>
							<button
								onClick={() => {
									// Restart animation from the beginning
									jumpToStep(0, 'scripts');
								}}
								className="p-2 text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
								title="Restart animation"
							>
								<RotateCcw size={20} />
							</button>
						</div>
					</div>
					<div className="w-full">
						<div className="mb-4 flex flex-col gap-4">
							{/* Scripts, Flows, and Apps Progress Bars */}
							<div className="grid grid-cols-3 gap-4">
								{/* Scripts Progress Bar */}
								<div className="flex flex-col gap-1">
									<div className="text-sm font-normal text-gray-600 dark:text-gray-400">Scripts</div>
									<div className="relative w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
										<div
											className="absolute h-2 bg-blue-600 dark:bg-blue-400 rounded-lg transition-all"
											style={{
												width: `${Math.min(scriptCurrentProgress, 100)}%`
											}}
										/>
										{scriptSteps.map((percent) => (
											<button
												key={`script-${percent}`}
												onClick={() => jumpToStep(percent, 'scripts')}
												className="absolute h-2 w-1 bg-blue-700 dark:bg-blue-500 cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-400 transition-colors z-10"
												style={{ left: `calc(${percent}% - 2px)` }}
												title={`Jump to script step ${percent}%`}
											/>
										))}
									</div>
								</div>
								{/* Flows Progress Bar */}
								<div className="flex flex-col gap-1">
									<div className="text-sm font-normal text-gray-600 dark:text-gray-400">Flows</div>
									<div className="relative w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
										<div
											className="absolute h-2 bg-green-600 dark:bg-green-400 rounded-lg transition-all"
											style={{
												width: `${Math.min(flowCurrentProgress, 100)}%`
											}}
										/>
										{flowSteps.map((percent) => (
											<button
												key={`flow-${percent}`}
												onClick={() => jumpToStep(percent, 'flows')}
												className="absolute h-2 w-1 bg-green-700 dark:bg-green-500 cursor-pointer hover:bg-green-800 dark:hover:bg-green-400 transition-colors z-10"
												style={{ left: `calc(${percent}% - 2px)` }}
												title={`Jump to flow step ${percent}%`}
											/>
										))}
									</div>
								</div>
								{/* Apps Progress Bar */}
								<div className="flex flex-col gap-1">
									<div className="text-sm font-normal text-gray-600 dark:text-gray-400">Apps</div>
									<div className="relative w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
										<div
											className="absolute h-2 bg-orange-600 dark:bg-orange-400 rounded-lg transition-all"
											style={{
												width: `${Math.min(appCurrentProgress, 100)}%`
											}}
										/>
										{appSteps.map((percent) => (
											<button
												key={`app-${percent}`}
												onClick={() => jumpToStep(percent, 'apps')}
												className="absolute h-2 w-1 bg-orange-700 dark:bg-orange-500 cursor-pointer hover:bg-orange-800 dark:hover:bg-orange-400 transition-colors z-10"
												style={{ left: `calc(${percent}% - 2px)` }}
												title={`Jump to app step ${percent}%`}
											/>
										))}
									</div>
								</div>
							</div>
						</div>
						<div className="bg-gray-100 dark:bg-gray-700/80 rounded-md p-4 min-h-[550px] flex items-center justify-center overflow-hidden">
							<div className="relative w-full h-full">
								{activeSection === 'scripts' ? (
									<ScriptAnimation active={true} />
								) : activeSection === 'flows' ? (
									<FlowAnimation active={true} only={false} />
								) : (
									<AppAnimation active={true} only={false} />
								)}
							</div>
						</div>
					</div>
				</div>
			</ScrollContext.Provider>
		);
	};

	return (
		<div className="flex flex-col" ref={containerRef}>
			{/* FeatureCard Section */}
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col mb-24">
				{features.map((feature, index) => {
					// Replace the second feature (index 1) with the animation section
					// if (index === 1) {
					// 	return (
					// 		<React.Fragment key="animation-section">
					// 			<AnimationSection />
					// 			{index < features.length - 1 && <ArrowSeparator />}
					// 		</React.Fragment>
					// 	);
					// }
					
					return (
						<React.Fragment key={feature.title}>
							<FeatureCard feature={feature} index={index} totalFeatures={features.length} />
						</React.Fragment>
					);
				})}
			</div>
		</div>
	);
}
