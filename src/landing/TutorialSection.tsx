import React, { useEffect } from 'react';
import ScriptAnimation from './ScriptAnimation';
import AnimationCarousel from './animations/AnimationCarousel';
import FlowAnimation from './FlowAnimation';
import AppAnimation from './AppAnimation';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight,
	ChevronRight,
	ChevronLeft,
	SkipForward,
	RotateCcw,
	Play
} from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import ProgressBars from './animations/ProgressBars';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import deployAtScale from '/illustrations/deploy_at_scale.json';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import { twMerge } from 'tailwind-merge';
// @ts-ignore
import BrowserOnly from '@docusaurus/BrowserOnly';

export default function TutorialSection({ subIndex, children }) {
	const [step, setStep] = React.useState(subIndex || 0);
	const containerRef = React.useRef<HTMLDivElement>(null);
	const [animationEnabled, setAnimationEnabled] = React.useState(
		// enabled on desktop, disabled on mobile
		typeof window !== 'undefined' ? window.innerWidth > 768 : false
	);

	const oneStep = subIndex !== undefined;
	const maxHeight = oneStep ? 5000 : 15000;

	const items = [
		{
			key: 'scripts',
			content: (
				<div className="flex flex-row items-start">
					<ScriptAnimation active={step === 0 || oneStep} />
				</div>
			)
		},
		{
			key: 'flows',
			content: (
				<div className="flex flex-row items-start">
					<FlowAnimation active={step === 1 || oneStep} only={oneStep} />
				</div>
			)
		},
		{
			key: 'apps',
			content: (
				<div className=" flex flex-row items-start">
					<AppAnimation active={step === 2 || oneStep} only={oneStep} />
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

			console.log(px, section);

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

	return (
		<div className="flex flex-col" ref={containerRef}>
			<BrowserOnly>
				{() => (
					<SmoothScroll
						onReachEnd={() => {
							setAnimationEnabled(false);
						}}
						animationEnabled={animationEnabled}
						count={oneStep ? 1 : 3}
					>
						<div className="relative">
							<div className="absolute -top-24 left-0">{children}</div>
							<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl">
								<div className="flex flex-row justify-between items-center">
									<div className="font-light text-4xl mb-4 max-w-2xl">
										{subIndex === undefined ? 'Develop and iterate with instant feedback' : ''}
									</div>
									<div className="flex flex-row items-center gap-2">
										{animationEnabled ? (
											<>
												<button
													onClick={() => {
														containerRef.current.scrollIntoView({ behavior: 'smooth' });
													}}
													className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md hover:bg-opacity-50 flex flex-row gap-2 items-center"
												>
													<RotateCcw size={14} />
													Restart
												</button>
												<button
													onClick={() => {
														containerRef.current.scrollIntoView({ behavior: 'instant' });

														const delta = 250;

														window.scrollBy({
															top: px * 3 + delta,
															behavior: 'smooth'
														});
													}}
													className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md hover:bg-opacity-50 flex flex-row gap-2 items-center"
												>
													Skip animation
													<SkipForward size={14} />
												</button>
											</>
										) : (
											<button
												onClick={() => {
													setAnimationEnabled(true);
													containerRef.current.scrollIntoView({ behavior: 'smooth' });
												}}
												className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md hover:bg-opacity-50 flex flex-row gap-2 items-center"
											>
												Enable animation
												<SkipForward size={14} />
											</button>
										)}
									</div>
								</div>

								<div className="relative">
									{animationEnabled === false && (
										<div className="absolute top-0 left-0 w-full h-full flex flex-row items-center justify-center z-50">
											<div className="text-xl text-gray-900 bg-gray-50 p-8 dark:bg-gray-900 dark:text-white rounded-md flex flex-col gap-2 items-center">
												Animation disabled
												<button
													onClick={() => {
														setAnimationEnabled(true);
														containerRef.current.scrollIntoView({ behavior: 'smooth' });
													}}
													className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-md hover:bg-opacity-50 flex flex-row gap-2 items-center"
												>
													Enable animation
													<Play size={14} />
												</button>
											</div>
										</div>
									)}
									<div
										className={twMerge(
											animationEnabled === false
												? 'opacity-10 cursor-not-allowed pointer-events-none z-40'
												: 'opacity-100'
										)}
									>
										<ProgressBars
											setStep={setStep}
											handleClick={(i: number) => {
												containerRef.current.scrollIntoView({ behavior: 'instant' });

												window.scrollBy({
													top: i * px + 50,
													behavior: 'instant'
												});
											}}
											subIndex={subIndex}
										/>

										<AnimationCarousel
											items={oneStep ? [items[subIndex]] : items}
											currentIndex={oneStep ? 0 : step}
										/>

										<div className="flex flex-row items-center justify-end gap-4 mt-8">
											<div className=" text-md">Scroll or use the arrow keys to navigate</div>
											<div className="flex flex-row items-center gap-1">
												<button
													className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded-md hover:bg-opacity-50 flex flex-row items-center gap-1"
													onClick={() => prevStep()}
												>
													<ChevronLeft size={20} />
												</button>
												<button
													className="text-xs bg-gray-100 dark:bg-gray-800 p-1 rounded-md hover:bg-opacity-50 flex flex-row items-center gap-1"
													onClick={() => nextStep()}
												>
													<ChevronRight size={20} />
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="h-20 w-full flex justify-center my-2 py-2">
								<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
							</div>
						</div>
					</SmoothScroll>
				)}
			</BrowserOnly>

			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 mt-24">
					<a
						href="/docs/core_concepts/draft_and_deploy#diff-viewer"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer "
					>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2 ">
							<GitCompareArrows size={20} />
							Review
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{'Use the built-in diff viewer, GitHub PRs or GitLab MRs to review changes.'}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={'/illustrations/diff.png'} alt={'Review'} />
						</div>
					</div>
				</div>
				<div className="h-20 w-full flex justify-center my-2 py-2">
					<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
				</div>

				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a
						href="/docs/advanced/deploy_to_prod"
						target="_blank"
						className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer"
					>
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Server size={20} />
							Deploy at scale
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{
								'Deploy with ease on our infrastructure or your own infrastructure, on bare VMs with docker-compose, ecs, or large Kubernetes clusters with up to 1000 workers and even remote agents.'
							}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<Lottie lottieData={deployAtScale} autoplay loop />
					</div>
				</div>
				<div className="h-20 w-full flex justify-center my-2 py-2">
					<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
				</div>
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8">
					<a className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer">
						<div className="font-medium text-xl mb-6 group-hover:ml-2 transition-all flex flex-row items-center gap-2">
							<Activity size={20} />
							Monitor
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{'Keep track of your scripts, flows, and apps with detailed logs and metrics.'}
						</div>
						<div
							className={`text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all`}
						>
							Learn more
							<ArrowRight size={24} />
						</div>
					</a>
					<div className="col-span-3">
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
							<img src={'/illustrations/11.png'} alt={'Review'} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
