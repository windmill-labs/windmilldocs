import React, { useEffect, useRef, useState } from 'react';
import LandingSection from './LandingSection';
import { ArrowRight, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useLottie } from 'lottie-react';
import { Lottie } from './LightFeatureCard';
import { useMotionValue } from 'framer-motion';
import ScriptAnimation from './ScriptAnimation';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import ScrollContext from './animations/ScrollContext';
import { scriptScrollCount, flowScrollCount, appScrollCount } from './animations/useAnimateScroll';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';
// @ts-ignore
import polyGlott from '/illustrations/polyglot.json';
// @ts-ignore
import smartIde from '/illustrations/smart_ide.json';
// @ts-ignore
import secrets from '/illustrations/secrets.json';
// @ts-ignore
import thirdparty from '/illustrations/thirdparty.json';

// Wrapper component to provide ScrollContext for ScriptAnimation with controls
function ScriptAnimationWrapper({ children }: { children: React.ReactNode }) {
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
		// For ScriptAnimation, clicking the progress bar should jump to that section
		// Since we only have Scripts (subIndex=0), handleClick(0) means jump to start
		// We'll let users click on step markers directly via ProgressBars
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
			<div className="w-full">
				<div className="mb-4 flex flex-col gap-4">
					<div className="flex items-center gap-2">
						<button
							onClick={() => setIsPlaying(!isPlaying)}
							className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
						>
							{isPlaying ? 'Pause' : 'Play'}
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
		</ScrollContext.Provider>
	);
}

interface FeatureCardProps {
	title: string;
	description: string;
	actionLink: string;
	actionUrl?: string;
	imageSrc?: string;
	imageAlt?: string;
	lottieData?: unknown;
	fullWidth?: boolean;
	animationComponent?: React.ReactNode;
}

function FeatureCard({ title, description, actionLink, actionUrl, imageSrc, imageAlt = '', lottieData, fullWidth = false, animationComponent }: FeatureCardProps) {
	const lottieOptions = lottieData
		? {
				animationData: lottieData,
				loop: true,
				autoplay: true
		  }
		: null;
	const { View, play } = lottieOptions ? useLottie(lottieOptions) : { View: null, play: () => {} };

	return (
		<div
			className={`flex flex-col h-full rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 group ${fullWidth ? 'w-full' : ''}`}
			onMouseOver={() => {
				if (lottieData) play();
			}}
		>
			<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
			<p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow text-base leading-relaxed">
				{description}
			</p>
			<a
				href={actionUrl || '#'}
				className="text-sm text-blue-600 dark:text-blue-400 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mb-4 hover:text-blue-700 dark:hover:text-blue-300"
				target={actionUrl && actionUrl.startsWith('http') ? '_blank' : undefined}
				rel={actionUrl && actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
			>
				{actionLink}
				<ArrowRight size={24} />
			</a>
			{animationComponent ? (
				<div className="mt-auto">
					{animationComponent}
				</div>
			) : (
				<div className={`mt-auto bg-gray-100 dark:bg-gray-700/80 rounded-md p-4 ${lottieData ? 'min-h-[220px]' : 'min-h-[220px]'} flex items-center justify-center overflow-hidden`}>
					{lottieData ? (
						<div className="w-full h-full flex items-center justify-center rounded-md">
							{View}
						</div>
					) : (
						<img
							src={imageSrc}
							alt={imageAlt}
							className="w-full h-auto object-contain rounded-md"
							loading="lazy"
						/>
					)}
				</div>
			)}
		</div>
	);
}

export default function CorePrinciple() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Our core principles
					</h1>
					<p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"></p>
					<span className="text-lg text-gray-700 max-w-3xl dark:text-gray-200">
						The foundational beliefs that guide how we build Windmill.
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
					<FeatureCard
						title="Developer experience first"
						description="Windmill give developers the tools they love without the platform engineering overhead: full LSP support, AI assistance, Git sync, CLI and VS Code extension."
						actionLink="Read our philosophy"
						actionUrl="https://www.windmill.dev/docs/misc/note_of_intent"
						lottieData={devfriendly}
					/>
					<FeatureCard
						title="Avoid vendor lock-in"
						description="Open source and self-hostable. Your code, your data, your infrastructure. Deploy anywhere—cloud, on-premises, or air-gapped. Full control without proprietary constraints."
						actionLink="View on GitHub"
						actionUrl="https://github.com/windmill-labs/"
						lottieData={polyGlott}
					/>
					<FeatureCard
						title="Seamless enterprise integration"
						description="Connect seamlessly to your infrastructure: databases (PostgreSQL, MySQL, Snowflake), cloud platforms (AWS, Azure, GCP), message queues (Kafka, SQS, NATS), and 100+ APIs. Interact with your existing codebase and workflows without friction."
						actionLink="Explore integrations"
						actionUrl="https://www.windmill.dev/docs/integrations"
						lottieData={thirdparty}
					/>
					<FeatureCard
						title="Enterprise-grade security"
						description="Designed for the strictest compliance requirements. From granular RBAC, SSO, and Secret Management to comprehensive Audit Logs. Deploy comfortably in regulated industries with horizontal scaling and air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						lottieData={secrets}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
