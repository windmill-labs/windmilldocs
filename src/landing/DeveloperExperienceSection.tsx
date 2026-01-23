import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import LandingSection from './LandingSection';
import { Lottie } from './LightFeatureCard';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';

interface FeatureCardProps {
	title: string;
	description: string;
	href: string;
	actionText?: string;
	image?: string;
	imageAlt?: string;
	video?: string;
	lottieData?: unknown;
}

function FeatureCard({
	title,
	description,
	href,
	actionText = 'Learn more',
	image,
	imageAlt,
	video,
	lottieData
}: FeatureCardProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const [hasBeenVisible, setHasBeenVisible] = useState(false);

	// Start video when 80% visible
	useEffect(() => {
		if (!video) return;
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasBeenVisible) {
					setHasBeenVisible(true);
					videoRef.current?.play();
				}
			},
			{ threshold: 0.8 }
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, [hasBeenVisible, video]);

	return (
		<div
			ref={containerRef}
			className="dark:bg-gray-900 bg-gray-50 w-full p-6 rounded-xl grid grid-cols-1 md:grid-cols-5 gap-8"
		>
			<a
				href={href}
				target="_blank"
				className="col-span-2 group text-black dark:text-white !no-underline hover:text-black hover:dark:text-white cursor-pointer flex flex-col justify-center"
			>
				<div className="font-medium text-2xl mb-4 group-hover:ml-2 transition-all">{title}</div>
				<div className="text-md mb-4 group-hover:ml-2 transition-all max-w-sm">{description}</div>
				<div className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 group-hover:ml-2 transition-all">
					{actionText}
					<ArrowRight size={20} />
				</div>
			</a>
			<div className="col-span-3">
				{lottieData ? (
					<Lottie lottieData={lottieData} autoplay loop />
				) : video ? (
					<video
						ref={videoRef}
						className="rounded-lg overflow-hidden h-full w-full object-cover"
						loop
						muted
						playsInline
						preload="metadata"
					>
						<source src={video} type="video/webm" />
					</video>
				) : image ? (
					<div className="rounded-lg overflow-hidden h-full w-full flex flex-col justify-end">
						<img src={image} alt={imageAlt || title} className="w-full" />
					</div>
				) : null}
			</div>
		</div>
	);
}

function BenchmarkCard() {
	const { colorMode } = useColorMode();
	const [chart, setChart] = useState<'short' | 'long' | undefined>(undefined);

	// Initialize chart after mount to trigger animation
	React.useEffect(() => {
		setChart('short');
	}, []);

	return (
		<div className="dark:bg-gray-900 bg-gray-50 w-full p-6 rounded-xl">
			<div className="mb-4">
				<h3 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
					Run at any scale with best performance
				</h3>
				<p className="text-md text-gray-600 dark:text-gray-300 mb-4">
					We engineered Windmill to be the fastest orchestrator in the industry, ensuring your most
					demanding workloads never bottleneck. From a single-node VPS to 1,000-node K8s clusters,
					auto-scale on demand or isolate critical tasks with dedicated worker groups on Kubernetes
					and Docker.
				</p>
				<a
					href="https://www.windmill.dev/docs/misc/benchmarks/competitors"
					className="text-sm text-blue-500 dark:text-blue-300 flex flex-row items-center gap-2 hover:ml-2 transition-all"
					target="_blank"
					rel="noopener noreferrer"
				>
					See benchmarks
					<ArrowRight size={20} />
				</a>
			</div>
			<div className="flex flex-row gap-2 items-center justify-end mb-4">
				<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
					10 long tasks
				</span>
				<Switch
					checked={chart === 'short'}
					title="Switch between short and long running tasks"
					onChange={() => setChart(chart === 'long' ? 'short' : 'long')}
					className={`${
						chart === 'short' ? 'bg-blue-500 dark:bg-blue-900' : 'bg-gray-200 dark:bg-gray-800'
					} relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
				>
					<span
						aria-hidden="true"
						className={`${
							chart === 'short' ? 'translate-x-6' : 'translate-x-0'
						} pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
					/>
				</Switch>
				<span className={classNames('font-light text-sm text-gray-900 dark:text-white')}>
					40 lightweight tasks
				</span>
			</div>
			<div
				className={classNames(
					colorMode === 'dark' ? 'bg-black' : 'bg-gray-100',
					'w-full p-4 md:p-8 bg-opacity-40 rounded-xl benchmark-chart-container'
				)}
				data-theme={colorMode}
			>
				<BrowserOnly fallback={<div className="h-64" />}>
					{() => (
						<div className="grid">
							{chart === 'short' ? (
								<div key="short">
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
										title="40 lightweight tasks comparison"
										maintainAspectRatio={false}
										shouldAnimate={true}
									/>
								</div>
							) : chart === 'long' ? (
								<div key="long">
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
										title="10 long running tasks comparison"
										maintainAspectRatio={false}
										shouldAnimate={true}
									/>
								</div>
							) : (
								<div className="h-64" />
							)}
						</div>
					)}
				</BrowserOnly>
			</div>
		</div>
	);
}

export default function DeveloperExperienceSection() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Run in production
					</h1>
					<span className="text-lg text-gray-700 dark:text-gray-200">
						Review, deploy and run on the most scalable and reliable infra with workers managed by
						Windmill, and all observability, alerting and error handling built-in (+ export to OTel).
					</span>
				</div>
				<div className="flex flex-col gap-6">
					<FeatureCard
						title="Collaborate with full Git flexibility"
						description="Enable parallel teamwork with workspace forks that sync to Git branches. Review changes with built-in diffs and maintain a strict audit trail before merging to production."
						href="/docs/advanced/git_sync"
						image="/illustrations/diff.png"
						imageAlt="Git integration"
					/>
					<BenchmarkCard />
					<FeatureCard
						title="Monitor with ease and depth"
						description="Track every job execution with real-time logs and I/O. Get instant Slack or email alerts for failures, or export metrics to OpenTelemetry and Prometheus."
						href="/docs/core_concepts/monitor_past_and_future_runs"
						video="/videos/your-observability-video.webm"
					/>
				</div>
			</div>
		</LandingSection>
	);
}
