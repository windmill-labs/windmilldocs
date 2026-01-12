import React, { useState } from 'react';
import LandingSection from './LandingSection';
import { ArrowRight } from 'lucide-react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { BenchmarkVisualization } from '../components/BenchmarkVisualization';
import { useColorMode } from '@docusaurus/theme-common';
import classNames from 'classnames';
import { Switch } from '@headlessui/react';
// @ts-ignore
import polyGlott from '/illustrations/polyglot.json';
// @ts-ignore
import secrets from '/illustrations/secrets.json';
// @ts-ignore
import thirdparty from '/illustrations/thirdparty.json';

// Client-only component that renders a static frame of a Lottie animation
function StaticLottie({ animationData }: { animationData: unknown }) {
	const { useLottie } = require('lottie-react');
	const { View, goToAndStop, getDuration } = useLottie({
		animationData,
		loop: false,
		autoplay: false
	});

	React.useEffect(() => {
		// Go to 90% of the animation
		const totalFrames = getDuration(true);
		if (totalFrames > 0) {
			goToAndStop(Math.floor(totalFrames * 0.90), true);
		}
	}, [goToAndStop, getDuration]);

	return View;
}

interface FeatureCardProps {
	title: string;
	description: string;
	actionLink: string;
	actionUrl?: string;
	lottieData?: unknown;
}

function FeatureCard({ title, description, actionLink, actionUrl, lottieData }: FeatureCardProps) {
	return (
		<div className="flex flex-col h-full rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 group">
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
			{lottieData && (
				<div className="mt-auto bg-gray-100 dark:bg-gray-700/80 rounded-md p-4 min-h-[180px] flex items-center justify-center overflow-hidden">
					<div className="w-full h-full flex items-center justify-center rounded-md">
						<BrowserOnly fallback={<div className="w-full h-full" />}>
							{() => <StaticLottie animationData={lottieData} />}
						</BrowserOnly>
					</div>
				</div>
			)}
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
		<div className="flex flex-col rounded-lg bg-gray-50 dark:bg-gray-800/50 backdrop-blur-sm p-6 shadow-lg border border-gray-200 dark:border-gray-700/50 group">
			<div className="mb-4">
				<h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Best performance at any scale</h3>
				<p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
					We engineered Windmill to be the fastest orchestrator in the industry, ensuring your most demanding workloads never bottleneck. From a single-node VPS to 1,000-node K8s clusters, auto-scale on demand or isolate critical tasks with dedicated worker groups on Kubernetes and Docker.
				</p>
				<a
					href="https://www.windmill.dev/docs/misc/benchmarks/competitors"
					className="text-sm text-blue-600 dark:text-blue-400 flex flex-row items-center gap-2 group-hover:ml-2 transition-all mt-4 hover:text-blue-700 dark:hover:text-blue-300"
					target="_blank"
					rel="noopener noreferrer"
				>
					See benchmarks
					<ArrowRight size={24} />
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
						chart === 'short'
							? 'bg-blue-500 dark:bg-blue-900'
							: 'bg-gray-200 dark:bg-gray-800'
					} relative inline-flex h-[24px] w-[48px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
				>
					<span
						aria-hidden="true"
						className={`${chart === 'short' ? 'translate-x-6' : 'translate-x-0'} pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
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
										engines={['airflow', 'kestra', 'prefect', 'temporal', 'windmill', 'windmill_dedicated']}
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
										engines={['airflow', 'kestra', 'prefect', 'temporal', 'windmill', 'windmill_dedicated']}
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

export default function CorePrinciple() {
	return (
		<LandingSection bgClass="py-16">
			<div className="w-full">
				<div className="mb-12 text-left">
					<h1 className="tracking-tight leading-tight text-left font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600">
						Our core principles
					</h1>
					<span className="text-lg text-gray-700 max-w-3xl dark:text-gray-200">
						The foundational beliefs that guide how we build Windmill.
					</span>
				</div>

				{/* Full-width benchmark card */}
				<div className="mb-6 lg:mb-8">
					<BenchmarkCard />
				</div>

				{/* 3 cards in a row */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					<FeatureCard
						title="Avoid vendor lock-in"
						description="Open source and self-hostable. Your code, your data, your infrastructure. Deploy anywhere—cloud, on-premises, or air-gapped."
						actionLink="View on GitHub"
						actionUrl="https://github.com/windmill-labs/"
						lottieData={polyGlott}
					/>
					<FeatureCard
						title="Seamless enterprise integration"
						description="Connect to databases (PostgreSQL, MySQL, Snowflake), cloud platforms (AWS, Azure, GCP), message queues (Kafka, SQS, NATS), and 100+ APIs."
						actionLink="Explore integrations"
						actionUrl="https://www.windmill.dev/docs/integrations/integrations_on_windmill"
						lottieData={thirdparty}
					/>
					<FeatureCard
						title="Enterprise-grade security"
						description="Granular RBAC, SSO, Secret Management, and comprehensive Audit Logs. Deploy in regulated industries with air-gapped support."
						actionLink="Explore enterprise features"
						actionUrl="https://www.windmill.dev/docs/misc/enterprise_onboarding"
						lottieData={secrets}
					/>
				</div>
			</div>
		</LandingSection>
	);
}
