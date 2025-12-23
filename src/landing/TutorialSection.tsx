import React, { useEffect } from 'react';
import {
	Activity,
	GitCompareArrows,
	Server,
	ArrowRight,
	Plus,
	Minus
} from 'lucide-react';
import { Lottie } from './LightFeatureCard';
// @ts-ignore
import devfriendly from '/illustrations/devfriendly.json';
// @ts-ignore
import performance from '/illustrations/performance.json';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';
import { ArrowLongDownIcon } from '@heroicons/react/20/solid';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';

export default function TutorialSection() {
	const [chart, setChart] = React.useState<'short' | 'long'>(undefined);

	useEffect(() => {
		setChart('short');
	}, []);
	const features = [
		{
			title: 'Workflows engine for developers',
			description: 'Write logic in 20+ languages (Python, TS, Go, Bash) using your local IDE or our web editor. Build complex orchestrations and custom UIs with full code flexibility, avoiding the constraints of rigid low-code platforms.',
			icon: GitCompareArrows,
			href: '/docs/core_concepts/draft_and_deploy#diff-viewer',
			lottieData: devfriendly,
			mt: 'mt-24'
		},
		{
			title: 'Collaborate with Git',
			description: 'Sync projects with GitHub or GitLab and manage versions via Pull Requests. Use the built-in diff viewer to prevent regressions and maintain a strict audit trail of every change.',
			icon: GitCompareArrows,
			href: '/docs/advanced/git_sync',
			image: '/illustrations/diff.png',
			imageAlt: 'Review'
		},
		{
			title: 'Deploy at scale',
			description: 'Powered by a lightweight Rust executor, Windmill minimizes latency and resource overhead. Scale from a single Docker container to Kubernetes clusters with 1,000+ workers to handle high throughput effortlessly.',
			icon: Server,
			href: '/docs/misc/benchmarks/competitors',
			useBenchmark: true
		},
		{
			title: 'Monitor with highest precision',
			description: 'Track every run with real-time logs and structured metrics. Spot bottlenecks instantly on the visual timeline and debug failures with full execution context.',
			icon: Activity,
			href: '/docs/core_concepts/monitor_past_and_future_runs',
			image: '/illustrations/11.png',
			imageAlt: 'Monitor'
		}
	];

	const ArrowSeparator = () => (
							<div className="h-20 w-full flex justify-center my-2 py-2">
								<ArrowLongDownIcon className="text-gray-200 dark:text-gray-700" />
							</div>
	);

	const FeatureCard = ({ feature, index }) => {
		const { colorMode } = useColorMode();
		const ContentWrapper = feature.href ? 'a' : 'div';
		const wrapperProps = feature.href
			? {
					href: feature.href,
					target: '_blank',
					className:
						'col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center'
				}
			: {
					className: 'col-span-2 group text-black dark:text-white cursor-pointer flex flex-col justify-center'
				};

		return (
			<>
				<div
					className={`dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8 ${feature.mt || ''}`}
				>
					<ContentWrapper {...wrapperProps}>
						<div className="font-medium text-3xl mb-4 group-hover:ml-2 transition-all">
							{feature.title}
						</div>
						<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">
							{feature.description}
						</div>
						<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
							Learn more
							<ArrowRight size={24} />
						</div>
					</ContentWrapper>
					<div className="col-span-3">
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
						) : feature.lottieData ? (
							<Lottie lottieData={feature.lottieData} autoplay loop />
						) : (
						<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
								<img src={feature.image} alt={feature.imageAlt || feature.title} />
						</div>
						)}
					</div>
				</div>
				{index < features.length - 1 && <ArrowSeparator />}
			</>
		);
	};

	const accordionFeatures = features.map((feature) => {
		let type = 'image';
		if (feature.useBenchmark) {
			type = 'lottie';
		} else if (feature.lottieData) {
			type = 'lottie';
		}

		return {
			title: feature.title,
			description: feature.description,
			href: feature.href,
			lottieData: feature.useBenchmark ? performance : feature.lottieData,
			image: feature.image,
			imageAlt: feature.imageAlt,
			type: type
		};
	});

	const [activeFeatureIndex, setActiveFeatureIndex] = React.useState(0);
	const [openIndex, setOpenIndex] = React.useState<number | null>(0);
	const { colorMode } = useColorMode();

	const renderActiveFeatureVisual = () => {
		const activeFeature = accordionFeatures[activeFeatureIndex];

		if (activeFeature.type === 'lottie') {
			return <Lottie lottieData={activeFeature.lottieData} autoplay loop />;
		} else {
			return (
				<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
					<img src={activeFeature.image} alt={activeFeature.imageAlt || activeFeature.title} />
				</div>
			);
		}
	};

	return (
		<div className="flex flex-col">
			<div className="max-w-7xl px-4 lg:px-8 mx-auto flex justify-center items-center h-full flex-col">
				{features.map((feature, index) => (
					<FeatureCard key={feature.title} feature={feature} index={index} />
				))}
			</div>

			{/* Accordion Component */}
			<div className="max-w-7xl px-4 lg:px-8 mx-auto mt-24 mb-24">
				<div className="dark:bg-gray-900 bg-gray-50 w-full p-8 rounded-xl grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-center min-h-[600px]">
					{/* Left side - Accordion */}
					<div className="flex flex-col">
						<h2 className="text-3xl font-bold mb-8 px-4 text-black dark:text-white">
							The product
						</h2>
						<div className="space-y-2">
							{accordionFeatures.map((feature, index) => {
								const isOpen = openIndex === index;
								const isFirst = index === 0;
								const isLast = index === accordionFeatures.length - 1;
								const canClose = !isFirst && !isLast;
								
								return (
									<div key={feature.title} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
										<button
											onClick={() => {
												if (isOpen) {
													// Prevent closing if this is the only open dropdown
													// This ensures at least one dropdown is always open
													return;
												} else {
													setOpenIndex(index);
													setActiveFeatureIndex(index);
												}
											}}
											className="flex w-full items-center justify-between text-left py-4 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
										>
											<span className="text-xl font-semibold text-black dark:text-white">
												{feature.title}
											</span>
											<span className="ml-4 flex h-6 items-center">
												{isOpen ? (
													<Minus className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
												) : (
													<Plus className="h-5 w-5 text-gray-600 dark:text-gray-400" aria-hidden="true" />
												)}
											</span>
										</button>
										{isOpen && (
											<div className="px-4 pb-4">
												<p className="text-md text-gray-700 dark:text-gray-300 mb-4">
													{feature.description}
												</p>
												{feature.href && (
													<a
														href={feature.href}
														target="_blank"
														className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 hover:gap-3 transition-all"
													>
														Learn more
														<ArrowRight size={20} />
													</a>
												)}
											</div>
										)}
									</div>
								);
							})}
						</div>
					</div>

					{/* Right side - Animation */}
					<div className="flex items-center justify-center w-full">
						<div className="w-full">
							{renderActiveFeatureVisual()}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
